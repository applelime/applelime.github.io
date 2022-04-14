---
layout: post
title: EL, JSTL
sitemap: true
hide_last_modified: false
categories:
  - develop
  - backend
---

# EL, JSTL

* toc
{:toc .large-only}

EL과 JSTL은 `JSP 사용의 불편함을 감소시키고 가독성을 증가`시키기 위해 사용하는 언어/라이브러리 이다.

## EL (Expression Language)
EL은 `데이터를 표현하기 위한 언어`로 JSP 2.0에 추가된 기능이다. 

### EL 구문
EL 구문은 `${...}` 내에 표현식으로 표현한다.  
[] 연산자나 .을 이용하여 객체 프로퍼티에 접근할 수 있다. 
```jsp
${userinfo["name"]}
${userinfo.name}
```
실제 동작은 pageContext의 findAttribute() 메소드와 동일한데 `가까운 scope부터 탐색`한다.  
`page -> request -> session -> application`{:.block-blue}  

기존 JSP 표현식과 비교하자면 아래와 같다.  
```jsp
<%-- 기존 표현식 --%>
<%= request.getParameter("num") %>
<%= request.getAttribute("userinfo").getZipDto().getAddress() %>

<%-- EL 표현식 --%>
${param.num}
${userinfo.zipDto.address}
```

### EL 연산자
기존의 Java 연산자와 크게 다르지 않다.  

| **산술 연산자** | +, -, *, / (div), % (mod) |
| **관계 연산자** | ==(eq), !=(ne), <(lt), >(gt), <=(le), >=(ge) |
| **논리 연산자** | &&(and), \|\|(or), !(not) |
| **3항 연산자** | 조건? 값1 : 값2 |
| **empty 연산자** | 값이 null이거나, 문자열/배열/Map/Collection 비어있으면 true |

```jsp
${10 + 20}
${10 mod 20}
${10 > 11}
${10 lt 11}
${a || b}
${!a}
${empty userinfo}
${not empty param.name}
```

### EL 내장객체

| JSP | **pageContext** | pageContext 객체를 참조할 때 | 
| scope | **pageScope** | page scope에 저장된 객체에 접근 |
| | **requestScope** | request scope에 저장된 객체에 접근 |
| | **sessionScope** | session scope에 저장된 객체에 접근 |
| | **applicationScope** | application scope에 저장된 객체에 접근 |
| 요청 매개변수 | **param** | getParameter()를 통해 파라미터값 반환 |
| | **paramValues** | getParameterValues()를 통해 파라미터 배열 반환 |
| 요청 헤더 | **header** | getHeader()를 통해 헤더 정보 반환 |
| | **headerValues** | getHeaders()를 통해 헤더 배열 반환 |
| 쿠키 | **cookie** | getCookies()를 통해 쿠키 정보 반환 |
| 초기화 매개변수 | **initParam** | 초기화 파라미터를 추출 |


## JSTL (JSP Standard Tag Library)
JSTL은 XML처리, 조건문, 반복문, 국제화 같은 일을 처리하기 위해 표준화된 태그 라이브러리  
`스크립틀릿(Scriptlet)을 사용하지 않고 액션을 통해 간단히 처리`할 수 있는 방법을 제공한다.

### JSTL 태그 종류

| library | prefix | function | URI | 
| -- | -- | -- | -- | 
| core | c | 변수 지원, 흐름제어, URL 처리 | http://java.sun.com/jsp/jstl/core |
| XML | x | XML 코어, 흐름제어, XML변환 | http://java.sun.com/jsp/jstl/xml |
| formatting | fmt | 지역, 메세지 형식, 숫자 및 날짜 처리 | http://java.sun.com/jsp/jstl/fmt |
| database | sql | SQL 지원 | http://java.sun.com/jsp/jstl/sql |
| function | fn | Collection, String 처리 | http://java.sun.com/jsp/jstl/functions |

### JSTL의 사용
JSTL을 사용하기 위해서는 JSP taglib 지시어를 통해 미리 선언을 해두어야 한다.  
`<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>`

### JSTL Core Tag
일반적으로 Core Tag가 가장 많이 사용되므로 여기에 대해서만 설명하려고 한다.  
- `<c:set>`  
변수를 선언한다.  
var는 변수명, value는 속성값. scope는 변수 생존범위로 디폴트는 page다.  

```jsp
<c:set var="num" value="100"/>
<c:set var="num" value="100" scope="request"/>
```

- `<c:remove>`  
변수를 제거한다.  
scope가 없으면 모든 영역의 변수가 제거된다.  

```jsp
<c:remove var="num" scope="request">
```

- `<c:if>, <c:choose><c:when><c:otherwise>`  
조건문으로 가장 자주 사용된다.  
if는 조건 하나, choose,when,otherwise는 여러개라고 생각하면 된다.  
else if는 존재하지 않는다.  

```jsp
<c:if test="${userType eq 'admin'}">
  <jsp:include page="admin.jsp">
</c:if>

<c:choose>
  <c:when test="${userType == 'admin'}">
    관리자 화면
  </c:when>
  <c:when test="${userType == 'member'}">
    회원 사용자 화면
  </c:when>
  <c:otherwise>
    일반 사용자 화면
  </c:otherwise>
</c:choose>
```

- `<c:forEach>`  
반복문이 필요할 때 사용한다.  
var에는 현재 변수명, items에는 컬렉션을 지정, varStatus를 통해 반복상태를 알 수 있다.  

```jsp
<c:forEach var="value" begin="1" end="5" step="1">
  ${value}<br/>
</c:forEach>

<c:forEach var="item" items="${courses}" varStatus="status">
  ${status.count}. ${item.name}<br/>
</c:forEach>
```

- `<c:catch>`  
예외를 처리할 때 사용한다.  
var속성에는 발생한 예외를 담을 page scope 변수를 지정한다.  

```jsp
<c:catch var="ex">
<%
  String str = null;
  out.println(str.length()); // 예외 발생
%>
</c:catch>

<c:if test="${ex != null}">
  예외가 발생했습니다. ${ex.message}
</c:if>
```
그 외 다른 태그들이 더 있지만 이 정도가 자주 사용되는 것 같다.