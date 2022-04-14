---
layout: post
title: 서블릿(Servlet) 정리
sitemap: true
hide_last_modified: false
categories:
  - develop
  - backend
---

# 서블릿(Servlet) 정리

## 서블릿(Servlet) 이란?
서블릿(Servlet)은 `자바를 사용하여 웹 페이지를 동적으로 생성하는 기술`이다.  
서블릿은 WAS 안의 서블릿 컨테이너에서 실행된다.  

## 서블릿 컨테이너(Servlet Container) 란?
서블릿 컨테이너는 `서블릿을 담고 관리해주는 컨테이너`로 웹 컨테이너라고도 부른다.  
요청에 따라 필요한 서블릿이 작동하도록 서블릿을 제어, 관리한다고 보면 된다.

## 서블릿의 생명주기(Life Cycle)
1. `init()`  
서블릿이 `처음으로 요청되어 메모리에 로드될 때 최초 1회`{:.block-blue} 초기화가 이루어진다.

2. `service()`
서블릿 컨테이너가 요청을 받고 `요청에 대한 처리를 해야할 때마다 반복 호출`{:.block-blue}된다.  
모든 요청은 service() 메소드를 통해 doGet(), doPost() 등의 다른 메소드로 이동한다.

3. `destroy()`
서블릿이 더 이상 사용되지 않고 `메모리에서 해제될 때 1회만 호출`{:.block-blue} 된다.

## 서블릿의 구조
```java
import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/HelloServlet")
public class HelloServlet extends HttpServlet {
  private static final long serialVersionUID = 1L;

  @Override
  public void init() throws ServletException {}

  protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    String name = request.getParameter("username");

    response.setContentType("text/html;charset=utf-8");
    PrintWriter out = response.getWriter();
    out.println("<html>");
    out.println("	<body>");
    out.println("	안녕하세요. " + name + "님!!");
    out.println("	</body>");
    out.println("</html>");
  }

  protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    request.setCharacterEncoding("utf-8");
    doGet(request, response);
  }

  @Override
  public void destroy() {} 
}
```
1. 기본적으로 Servlet은 `javax.servlet 패키지에 포함`되어 있다.  
javax 패키지는 자바의 표준 확장 패키지로 기본적으로 servlet에 관한 부분은 포함되어 있다.  

2. Servlet을 사용하기 위해서는 `Servlet 인터페이스를 상속`받아야 한다.  
Servlet 인터페이스를 상속받은 GenericServlet 클래스가 존재하고,  
GenericServlet을 상속받은 HttpServlet클래스가 있다.  
`HttpServlet은 HTTP 프로토콜을 위해 미리 구현해둔 클래스로 보통 이를 상속`{:.block-blue}받아 구현한다.

3. `@WebServlet 어노테이션`을 통해 `Servlet과 매핑될 url 패턴을 지정`{:.block-blue}한다.  
@WebServlet("/Hello"), @WebServlet("*.do"), @WebServlet(urlPatterns = {"/hi", "hello"}) 등으로 사용

4. doService() 메소드를 통해 호출되는 `doGet(), doPost()와 같은 메소드가 요청시마다 호출되는 메소드`이다.  

