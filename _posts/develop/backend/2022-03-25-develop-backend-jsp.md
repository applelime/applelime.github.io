---
layout: post
title: JSP(Java Server Pages) 정리
sitemap: true
hide_last_modified: false
categories:
  - develop
  - backend
---

# JSP(Java Server Pages) 정리

## JSP(Java Server Pages) 이란?
JSP(Java Server Pages)는 `HTML 내에 자바 코드를 삽입하여 동적 웹 페이지를 생성하는 언어`이다.  
JSP는 `실행 되면 서블릿(Servlet)으로 변환되어 동작`{:.block-blue}한다.

## JSP를 사용하는 이유?
비즈니스 로직과 프레젠테이션의 분리가 가능하다.  
즉. `디자인과 동작을 분리`할 수 있다는 것.

## JSP 문법
- **표현식 (Expression)**  
`<%= expression %>`  
`데이터 출력을 위해 사용`{:.block-blue}한다.  
out.print(expression)과 동일하며 세미콜론(;)은 붙이지 않는다.

- **스크립틀릿 (Scriptlet)**  
`<% java code %>`  
`자바 코드 기술을 위한 영역`{:.block-blue}이다.  
서블릿으로 변환 시 service() 메소드에 해당되는 영역이다.

- **선언 (Declaration)**  
`<%! declaration %>`  
`메소드나 멤버 변수 선언`{:.block-blue} 할 때 사용된다.  
여기에 선언한 변수는 전역으로 선언된다고 보면 된다.

- **주석 (Comment)**  
`<%-- comment --%>`  
다른 언어의 주석과 동일하다.

- **지시자 (Directive)**  
`<%@ directive %>`  
`웹 컨테이너에게 특정한 정보를 전달`{:.block-blue}하는 역할을 한다.  

  - page 지시자  
  컨테이너에게 현재 jsp페이지를 어떻게 처리할 것인지 정보를 제공한다.  
  `<%@ page language="java" contentType="text/html; charset=UTF-8">`

  - include 지시자  
  해당 파일을 본문에 포함하는 지시자이다.  
  내용이 크게 변하지않고 재사용해야할 때 header, footer 등을 삽입할 때 자주 사용  
  `<%@ include file="/template/header.jsp" %>`

- **액션 (action)**  
JSP 태그라고도 부른다. `특정 동작을 실행할 때 사용`{:.block-blue}한다.  
useBean, setProperty, getProperty 등등이 있다..
  - `<jsp:forward>`  
  request 객체를 넘겨주면서 다른 페이지로 제어를 이동시킨다.
  - `<jsp:include>`  
  현재 JSP페이지에 동적으로 다른 리소스를 포함시킨다.


## JSP 기본 객체
`request, response, pageContext, session, application, out, config, page, exception`  
선언하지 않아도 기본적으로 존재하므로 사용할 수 있다.  

이 중 out은 PrintWriter가 아니라 JspWriter를 사용하고,  
exception 객체는 isErrorPage 속성을 true로 설정해야만 사용가능하다.

## JSP 기본 객체의 영역 (scope)
- `PageContext`  
현재 페이지 내에서 객체를 공유하는 영역이다.  
페이지 영역에서 저장한 값은 페이지를 벗어나면 사라진다.
- `request`  
웹 브라우저에서 요청할 때마다 새로운 request 객체가 생성된다.  
request에 저장한 속성은 요청에 대한 응답이 완료되면 사라진다.
- `session`  
한 브라우저당 1개의 session 객체가 생성되고,  
같은 브라우저에서 요청되는 페이지는 session을 공유한다.  
- `application`  
하나의 어플리케이션당 1개의 객체가 생성되고,  웹 어플리케이션이 종료되면 사라진다. 

## JSP의 구조
```jsp
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8" %>
<%@ include file="/template/header.jsp" %>
  <div align="center">
    <h3>방명록</h3>
<c:if test="${empty userInfo}">
    <a href="${root}/user?act=mvregister">회원가입</a>
    <a href="${root}/user?act=mvlogin">로그인</a>
</c:if>
<c:if test="${!empty userInfo}">
    <strong>${userInfo.userName}(${userInfo.userId})</strong>님 안녕하세요
    <a href="${root}/user?act=logout">로그아웃</a>
    <br>
    <a href="${root}/article?act=list&pg=1&key=&word=">글목록</a>
</c:if>
  </div>
<%@ include file="/template/footer.jsp" %>
```
JSP는 HTML 내에 자바 코드를 삽입하는 방식으로 위와 같은 형태가 된다.  
위에서는 JSTL과 EL이 사용되었는데 해당 부분은 [여기](/develop/backend/2022-03-26-develop-backend-el-jstl/)를 참고하자.

## 페이지 이동방식
- `forward`  
forward는 이름 그대로 `건네주는`{:.block-blue} 방식이다.  
`기존의 request와 response 객체를 그대로 전달`{:.block-blue}하여 페이지 이동 후에도 해당 객체를 사용할 수 있다.  
URL도 `기존 URL을 그대로 넘겨주어`{:.block-blue} 변경되지 않는다.

- `redirect`  
redirect도 이름 그대로 해당 페이지로 `다시 이동`{:.block-blue}시키는 방식이다.  
`새로운 request와 response 객체가 생성`{:.block-blue}된다.  
새로 이동하므로 `URL도 이동하는 페이지로 변경`{:.block-blue}된다.

|          | **forward** | **redirect** |
| **객체** | 기존의 request, response가 그대로 전달 | 새로운 request와 response가 생성 |
| **URL** | 기존 URL 유지 (실제 이동 주소 확인 불가) | 이동하는 Page로 변경 |
| **이동 범위** | 같은 서버 내 경로 | 동일 서버 포함 타 URL 상관없음 |
| **속도** | 비교적 빠름 | forward에 비해 느림 |
| **데이터 유지** | request의 setAttribute 사용 | session이나 cookie를 이용 |
| **사용 방법** | RequestDispatcher dispatcher<br>= request.getRequestDispatcher(path)<br>dispatcher.forward(request, response); | response.sendRedirect(path); |

## HTML 주석 vs JSP 주석
- **HTML 주석** `<!-- -->`  
클라이언트로 전달되기 때문에 `소스보기로 주석내용을 확인`{:.block-blue}할 수 있다.

- **JSP 주석** `<%-- --%>`  
서버에서 JSP 처리 시 주석 처리 되므로 `아예 실행 처리를 하지 않는다.`{:.block-blue}  

## include 지시문 vs include 액션
- **include 지시문** `<%@ include %>`  
런타임에 내용이 변경되지 않는 `정적인 내용을 포함`{:.block-blue}할 때 사용.  
단순히 소스의 내용이 텍스트로 포함되어 `복사되어 컴파일`{:.block-blue}되는 효과.  
다수의 jsp페이지에서 `공통으로 사용되는 코드나 문장을 포함`{:.block-blue}할 때 사용

- **include 액션** `<jsp:include>`  
런타임에 컨텐츠가 변경될 수 있는 `동적 컨텐츠를 포함`{:.block-blue}할 때 사용  
페이지의 `처리결과를 포함`{:.block-blue}하므로 마지막 결과만 포함되게 됨.  
화면 `레이아웃 일부분을 모듈화`{:.block-blue}할 때 사용