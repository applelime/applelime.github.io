---
layout: post
title: REST API
sitemap: true
hide_last_modified: false
categories:
  - develop
  - backend
---

# REST API
`API(Application Programming Interface)`는 `응용 프로그램이나 디바이스가 서로 간에 통신하는 방법을 정의한 것`{:.block-blue} 이다.

`REST API`는 `REST(REpresentational State Transfer)를 기반으로 만들어진 API`{:.block-blue}로 `RESTful API`{:.block-green}라고 부르기도 한다.

## REST 구성
- `자원 (Resource)` - URI
- `행위 (Verb)` - HTTP Method
- `표현 (Representations)` - JSON, XML, ...

## REST 특징
1. `Uniform (유니폼 인터페이스)`  
Uniform Interface는 URI(Uniform Resource Identifier)로 지정한 리소스에 대한 조작을 통일되고 한정적인 인터페이스로 수행하는 아키텍처 스타일을 말한다.

2. `Stateless (무상태성)`  
REST는 HTTP의 특성을 이용하므로 무상태성을 갖는다.  
어떤 작업을 위한 상태정보를 기억하지 않으므로 API 서버는 들어오는 요청만 처리하면 된다.

3. `Cacheable (캐시 처리 기능)`  
HTTP 프로토콜 표준에서 사용하는 Last-Modified나 E-Tag를 이용하여 캐싱 구현이 가능.  
캐시 사용을 통해 응답시간이 빨라진다.

4. `Self-descriptiveness (자체 표현 구조)`  
REST API 메세지만 보고도 요청이 어떤 행위를 하는지 알 수 있다.

5. `Client-Sever 구조`  
서버는 REST API를 제공하고 비즈니스 로직을 처리한다.  
클라이언트는 사용자 인증이나 세션, 로그인 정보 등을 직접 관리하고 책임진다.  
서로간 의존성이 줄어든다.

6. `계층형 구조`  
REST 서버는 다중 계층으로 구성될 수 있으며 프록시 서버, 암호화 계층 등의 중간매체를 사용할 수 있다.

## REST API 디자인 가이드
1. **`URI`는 정보의 `자원을 표현`{:.block-blue}해야 한다.**  
    - URI는 동사보다는 `명사를 사용`{:.block-green}한다.
    - URI `마지막에 슬래시(/)를 사용하지 않는다.`{:.block-green}
    - `슬래시(/)로 계층 관계`{:.block-green}를 나타낸다.
    - 특별한 경우를 제외하고 `대문자는 사용하지 않는다.`{:.block-green}
    - 하이픈(-)은 사용 가능하나, `언더바(_)는 사용하지 않는다.`{:.block-green}
    - delete, show 같은 `행위에 대한 표현을 사용하지 않는다.`{:.block-green}

2. **`자원에 대한 행위`는 `HTTP Method (GET, POST, PUT, DELETE)로 표현`{:.block-blue}한다.**

| CRUD | Method | Path |
| -- | -- | -- |
| resource들의 목록을 표시 | GET | /resource |
| resource 하나의 내용을 표시 | GET | /resource/:id |
| resource를 생성 | POST | /resource |
| resource를 수정 | PUT | /resource/:id |
| resource를 삭제 | DELETE | /resource/:id |

## Rest 관련 Annotation
- `@RequestBody`  
Request로 넘어오는 JSON 데이터를 원하는 타입으로 바인딩할 때 사용한다.
```java
  @PostMapping("/user")
  public List<MemberDto> userRegister(@RequestBody MemberDto memberDto) throws Exception {
    memberService.registerMember(memberDto);
    return memberService.listMember();
  }
```

- `@PathVariable`  
Path에 있는 값을 파라미터로 추출한다.
```java
  @DeleteMapping("/user/{userid}")
  public List<MemberDto> userDelete(@PathVariable("userid") String userid) throws Exception {
    memberService.deleteMember(userid);
    return memberService.listMember();
  }
```

- `@ResponseBody`  
Spring에서 기존 Return값은 View의 이름 또는 ModelAndView를 사용하여 View로 전달하였는데  
REST API에서는 데이터 자체를 JSON으로 전달하므로 리턴값을 HTTP Response body에 담는다.
```java
  @GetMapping("/user")
  @ResponseBody
  public List<MemberDto> userList() throws Exception {
    return memberService.listMember();
  }
```

- `@RestController`  
해당 컨트롤러가 REST 방식을 처리하기 위한 것을 명시하고 모든 메소드에 @ResponseBody를 붙여준다.  
- `@CrossOrigin`  
크로스 도메인 문제를 해결하기 위해 사용하여 외부 도메인에서 접근을 허용해줄 수 있다.
```java
@RequestMapping("/admin")
@CrossOrigin("*")
public class AdminController {
  ...
}
```

## Jackson 라이브러리 사용하기
Jackson 라이브러리는 `Java Object의 값을 Json 형태로 만들어` 보낼 때 사용하는 라이브러리이다.  

사실 Jackson 라이브러리를 사용하지 않는다면 위의 예시처럼 Java Object로 리턴했을 때 문제가 발생하고,  
JSON 오브젝트를 만들어서 Key와 Value값을 일일이 담아서 리턴해야한다.

Jackson을 사용하면 리턴 방식이 @RequestBody일 경우 Controller가 리턴하는 객체를 후킹하여 JSON 객체로 변환하여 데이터를 리턴해주는 것이다.

Maven 기준으로 pom.xml에 `jackson-databind` dependency를 추가해주자.
```xml
<dependency>
  <groupId>com.fasterxml.jackson.core</groupId>
  <artifactId>jackson-databind</artifactId>
  <version>${jackson-databind-version}</version>
</dependency>
```