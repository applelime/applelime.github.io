---
layout: post
title: Spring File Upload / Download
sitemap: true
hide_last_modified: false
categories:
  - develop
  - backend
---

# Spring File Upload / Download
* toc
{:toc .large-only}

## File Upload
`Apache Commons FileUpload` 라이브러리를 이용해 파일 업로드를 구현해보려고 한다.

### Dependency 추가
maven 기준 pom.xml에 의존성을 추가하자.
```xml
<dependency>
    <groupId>commons-fileupload</groupId>
    <artifactId>commons-fileupload</artifactId>
    <version>1.3.3</version>
</dependency>
```

### File Upload 설정
servlet-context.xml에 `MultiPartResolver`를 추가하고 설정을 세팅한다.  

| **defaultEncoding** | 기본 인코딩 설정 |
| **maxUploadSize** | 한 요청당 업로드 허용하는 최대 바이트 크기<br> 기본값은 -1(무제한) |
| **maxUploadSizePerFile** | 한 파일당 업로드 허용하는 최대 바이트 크기<br> 기본값은 -1(무제한) |
| **maxInMemorySize** | 디스크에 저장하지 않고 메모리에 유지하도록 허용하는 최대 바이트 크기<br>기본값은 10240바이트 (10Kb) |
| **uploadTempDir** | 업로드된 파일이 저장되는 임시 디렉토리 설정 |

```xml
<!-- fileUpload -->
<beans:bean id="multipartResolver" class="org.springframework.web.multipart.commons.CommonsMultipartResolver">
  <beans:property name="defaultEncoding" value="UTF-8"/>
  <beans:property name="maxUploadSize" value="52428800"/> <!-- 50MB -->
  <beans:property name="maxInMemorySize" value="1048576"/> <!-- 1MB -->
</beans:bean>
```

### File 전송
form에서 `input type` `file`{:.block-blue}로 파일을 보낸다.  
이 때 `form의 enctype`은 `multipart/form-data`{:.block-blue} 로 설정한다.

```html
<form id="writeform" method="post" enctype="multipart/form-data">
  <div class="form-group" align="left">
    <label for="upfile">파일:</label>
    <input type="file" class="form-control-file border" name="upfile" multiple="multiple">
  </div>
  ...
</form>
```

### File Upload
Controller에서 `MultipartFile`로 file을 받아 처리한다.

```java
@PostMapping("/register")
public String register(GuestBookDto guestBookDto, 
@RequestParam("upfile") MultipartFile[] files)
  throws Exception {

  // FileUpload 관련 설정.
  if (!files[0].isEmpty()) {
    String realPath = servletContext.getRealPath("/upload");
    String today = new SimpleDateFormat("yyMMdd").format(new Date());
    String saveFolder = realPath + File.separator + today;
    File folder = new File(saveFolder);
    if (!folder.exists())
      folder.mkdirs();
    
    List<FileInfoDto> fileInfos = new ArrayList<FileInfoDto>();
    for (MultipartFile mfile : files) {
      FileInfoDto fileInfoDto = new FileInfoDto();
      String originalFileName = mfile.getOriginalFilename();
      if (!originalFileName.isEmpty()) {
        String saveFileName = UUID.randomUUID().toString()
            + originalFileName.substring(originalFileName.lastIndexOf('.'));
        fileInfoDto.setSaveFolder(today);
        fileInfoDto.setOriginFile(originalFileName);
        fileInfoDto.setSaveFile(saveFileName);
        mfile.transferTo(new File(folder, saveFileName));
      }
      fileInfos.add(fileInfoDto);
    }
    guestBookDto.setFileInfos(fileInfos);
  }
  guestBookService.registerArticle(guestBookDto);
  return "redirect:/guestbook/list?pg=1&key=&word=";
}
```
1. 실제 `파일을 저장할 위치를 설정`한다.  
2. `파일명 중복 방지`{:.block-blue}를 위해 `UUID를 이용`{:.block-green}하여 `파일명을 결정`한다.  
3. `MultipartFile.transferTo`{:.block-blue} 또는 `FileCopyUtils.copy`{:.block-blue}를 이용하여 실제 서버에 `파일을 저장`한다.  
4. `저장경로와 파일명을 DB에 저장`한다.

## File Download

### File Download 설정
servlet-context.xml에 관련 부분을 설정한다.

`fileDownLoadView`{:.block-blue}라는 `Bean을 생성`하고,  
`BeanNameViewResolver`를 이용하여 `ViewName이 Bean의 id와 같은 경우 해당 View를 이용하도록 설정`{:.block-green}한다.
```xml
<!-- fileDownload -->
<beans:bean id="fileDownLoadView" class="com.guestbook.view.FileDownLoadView"/>
<beans:bean id="fileViewResolver" class="org.springframework.web.servlet.view.BeanNameViewResolver">
  <beans:property name="order" value="0" />
</beans:bean> 
```

### File Download
download 요청이 오면 생성한 `커스텀 뷰인 fileDownLoadView로 넘긴다.`
```java
@GetMapping(value = "/download")
public ModelAndView downloadFile(
  @RequestParam("sfolder") String sfolder, 
  @RequestParam("ofile") String ofile,
  @RequestParam("sfile") String sfile, 
  HttpSession session) {

  MemberDto memberDto = (MemberDto) session.getAttribute("userinfo");
  if (memberDto != null) {
    Map<String, Object> fileInfo = new HashMap<String, Object>();
    fileInfo.put("sfolder", sfolder);
    fileInfo.put("ofile", ofile);
    fileInfo.put("sfile", sfile);

    return new ModelAndView("fileDownLoadView", "downloadFile", fileInfo);
  } else {
    return new ModelAndView("redirect:/");
  }
}
```

`FileDownLoadView 클래스`는 `AbstractView를 상속받아 Download용 Custom View를 만든다.`{:.block-blue}  
View를 이용하기 위해서는 `renderMergedOutputModel 메소드를 구현`{:.block-green}해야한다.
```java
public class FileDownLoadView extends AbstractView {
  public FileDownLoadView() {
    setContentType("apllication/download; charset=UTF-8");
  }

  @Override
  protected void renderMergedOutputModel(
    Map<String, Object> model, 
    HttpServletRequest request, 
    HttpServletResponse response) throws Exception {

    ServletContext ctx = getServletContext();
    String realPath = ctx.getRealPath("/upload");
    
    Map<String, Object> fileInfo = (Map<String, Object>) model.get("downloadFile");
    
    String saveFolder = (String) fileInfo.get("sfolder");
    String originalFile = (String) fileInfo.get("ofile");
    String saveFile = (String) fileInfo.get("sfile");
    File file = new File(realPath + File.separator  + saveFolder, saveFile);

    response.setContentType(getContentType());
    response.setContentLength((int) file.length());
    
    String header = request.getHeader("User-Agent");
    boolean isIE = header.indexOf("MSIE") > -1 || header.indexOf("Trident") > -1;
    String fileName = null;

    if (isIE) { // IE 예외처리
      fileName = URLEncoder.encode(originalFile, "UTF-8").replaceAll("\\+", "%20");
    } else {
        fileName = new String(originalFile.getBytes("UTF-8"), "ISO-8859-1");
    }

    response.setHeader("Content-Disposition", "attachment; filename=\"" + fileName + "\";");
    response.setHeader("Content-Transfer-Encoding", "binary");
    
    OutputStream out = response.getOutputStream();
    FileInputStream fis = null;
    try {
      fis = new FileInputStream(file);
      FileCopyUtils.copy(fis, out);
    } catch (Exception e) {
      e.printStackTrace();
    } finally {
      if(fis != null) {
        try { 
          fis.close(); 
        }catch (IOException e) {
          e.printStackTrace();
        }
      }
    }
    out.flush();
  }
}
```
1. `실제 upload된 경로`{:.block-blue}에서 `file을 받아온다.`
2. `response`에 `ContentType과 Header 등을 설정`한다.
3. `해당 file`{:.block-blue}을 `response의 OutputStream으로 전달`한다.
4. `flush 메소드`{:.block-blue}를 통해 `클라이언트에 파일을 전달`한다.

## File 저장위치
파일은 `실제 구동중인 서버 내부에 저장`된다.  

Tomcat을 구동할 경우 아래 경로에 저장되게 되며  
`getRealPath("/upload")`{:.block-blue}를 통해 접근하는 폴더는 여기이다.
```
$workspace\.metadata\.plugins\org.eclipse.wst.server.core\tmp0\wtpwebapps\project폴더\upload
```