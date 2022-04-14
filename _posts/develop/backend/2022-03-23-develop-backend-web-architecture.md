---
layout: post
title: Web Server와 WAS의 차이
sitemap: true
hide_last_modified: false
categories:
  - develop
  - backend
---

# Web Server와 WAS의 차이

## Web Architecture
![Web Architecture](https://4aozg2yddrfwclgn4z1yj42g-wpengine.netdna-ssl.com/wp-content/uploads/2021/10/Web_Server_vs_App_Server_Diagram-1-696x262.png)  
(출처 : <https://www.webopedia.com/servers/web-server-vs-application-server/>)  

<br>

웹 아키텍처를 간단하게 나타내면 위 그림과 같다.  

- `Client`  
클라이언트에서는 웹 브라우저를 통해 HTTP를 통해 요청을 보낸다.

- `Web Server`  
웹 서버는 클라이언트로부터 요청을 받고, `정적 컨텐츠를 제공`{:.block-blue}하는 서버이다.  
동적인 처리를 요청받게되면 해당 처리는 어플리케이션 서버로 넘겨주고,   
처리한 결과를 받아 클라이언트에게 다시 전달한다.

- `Application Server`  
데이터베이스 조회나 로직 처리가 필요한 `동적인 요청을 처리`{:.block-blue}하는 서버이다.  
JSP, Servlet 구동환경을 제공해주므로 웹 컨테이너 혹은 서블릿 컨테이너라고도 한다.

## WAS (Web Application Server)
WAS는 Web Server와 Application Server를 합쳐 WAS라고 부른다.  
`Web Server의 기능`과 `Web Container의 기능`을 모두 담당하지만, Web Server를 따로 구분하여 두기도 한다.  

대표적인 WAS로는 Apache Tomcat, JEUS 등이 있다.