---
layout: post
title: 쿠키(Cookie)와 세션(Session)의 차이
sitemap: true
hide_last_modified: false
categories:
  - develop
  - backend
---

# 쿠키(Cookie)와 세션(Session)의 차이

* toc
{:toc .large-only}

## HTTP 프로토콜의 특징
HTTP 프로토콜은 `Connectionless, Stateless`한 특성을 가진다.  
클라이언트가 서버에 요청을 하면, 서버는 요청에 응답한 후 연결을 끊어버린다.  
또한, 통신이 끝나면 이전 상태를 유지하지 않는다.  

-> `상태 정보를 유지하기 위해 사용하는 것이 쿠키와 세션`{:.block-blue}

## 쿠키 (Cookie)
쿠키는 서버에서 `사용자의 컴퓨터에 저장`하는 정보 파일이다.  
쿠키는 `Key와 Value로 구성`되고 `String 형태`로 이루어져 있다.  
브라우저마다 저장되는 쿠키는 다르다.  

### 쿠키의 특징
1. 쿠키는 `이름, 값, 유효기간, 도메인, 경로` 정보로 구성되어 있다.
2. `클라이언트에 총 300개의 쿠키를 저장`할 수 있다.
3. 하나의 `도메인당 20개의 쿠키`를 가질 수 있다.
4. `하나의 쿠키는 4KB까지 저장`가능하다.

### 쿠키의 동작 순서
1. Client가 페이지를 요청한다.
2. WAS는 쿠키를 생성한다.
3. HTTP Header에 쿠키를 담아 응답을 보낸다.
4. 브라우저는 해당 쿠키를 PC에 저장하고, 다시 서버에 요청할 때 쿠키를 같이 전송한다.
5. 동일 사이트 재방문 시 쿠키가 있는 경우, 요청시 함께 쿠키를 전송한다.

### 쿠키의 사용 예
- ID 저장
- 일주일간 다시 보지 않기
- 쇼핑몰 장바구니 등

### 쿠키의 주요 기능
```java
//생성
Cookie cookie = new Cookie(String name, String value);

// 값 변경/얻기
cookie.setValue(String value);
String value = cookie.getValue();

// 사용 도메인 지정/얻기 
cookie.setDomain(String domain);
String domain = cookie.getDomain();

// 값 범위 지정/얻기
cookie.setPath(String path);
String path = cookie.getPath();

// 유효기간 지정/얻기
cookie.setMaxAge(int expiry);
int expiry = cookie.getMaxAge();

// 쿠키 삭제
cookie.setMaxAge(0);

// 쿠키 전송
response.addCookie(cookie);

// 쿠키 얻기
Cookie cookies[] = request.getCookies();
for (Cookie cookie : cookies) {
  if(cookie.getName().equals("userId")) {
    out.println(cookie.getValue());
  }
}
// -> EL을 사용하면 ${cookie.userId.value} 로 사용 가능
```

## 세션 (Session)
`방문자가 서버에 접속해 있는 상태를 하나의 단위`로 보고 그것을 세션이라 한다.  
세션은 `WAS의 메모리에 Object 형태로 저장`하므로, 메모리가 허용하는 용량까지 제한 없이 저장 가능하다.  

### 세션의 특징
1. 각 클라이언트에 `고유한 세션 ID를 부여`한다.
2. `저장 데이터에 제한이 없으나`, 사용자가 많아질수록 서버 메모리를 많이 차지하게 된다.
3. 웹 서버에 저장되므로 `쿠키에 비해 보안이 좋다.` 

### 세션의 동작 순서
1. Client가 페이지를 요청한다.
2. 서버는 Client가 보낸 쿠키를 확인하여, 해당 세션ID를 보냈는지 확인한다.
3. 세션 ID가 존재하지 않으면 서버는 세션 ID를 생성하여 클라이언트에게 돌려준다.
4. 클라이언트는 해당 세션ID를 쿠키로 저장한다.
5. 다시 서버에 요청할 때 이 쿠키를 이용하여 세션ID값을 서버로 전달한다.

### HttpSession의 주요 기능
```java
// 생성
HttpSession session = request.getSession(); // 기존에 없는 경우 만들어서 리턴   
HttpSession session = request.getSession(false); // 기존에 없는 경우 null 리턴  

// 저장
session.setAttribute(String name, Object value);

// 값 얻기
Object obj = session.getAttribute(String name);

// 값 제거
session.removeAttribute(String name);

// 모든 속성 제거
session.invalidate();
```


## 쿠키와 세션의 차이

|  | 쿠키 (Cookie) | 세션 (Session) |
| -- | -- | -- |
| **저장 위치** | Client에 파일로 저장 | Server의 메모리에 Object로 저장 | 
| **저장 형식** | String형태 | Object는 모두 가능 (일반적 Dto, List 등) |
| **용량 제한** | 도메인당 20개, 1쿠키당 4KB | 제한 없음 |
| **만료 시점** | 쿠키 저장시 설정 | Client 로그아웃, 일정시간 접근하지 않을 경우 |
| **사용 예** | 아이디 저장, 오늘은 그만 열기 등 | 로그인 시 사용자정보 등 |