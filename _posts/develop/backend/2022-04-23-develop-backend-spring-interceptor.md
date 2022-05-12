---
layout: post
title: Spring Interceptor, Filter
sitemap: true
hide_last_modified: false
categories:
  - develop
  - backend
---

# Spring Interceptor, Filter
* toc
{:toc .large-only}

![Spring MVC life cycle](https://justforchangesake.files.wordpress.com/2014/05/spring-request-lifecycle.jpg?w=474&h=418)  
(출처 : <https://justforchangesake.wordpress.com/2014/05/07/spring-mvc-request-life-cycle/>)

## Interceptor
`Interceptor`는 가로채다라는 뜻으로 `Controller에 요청을 전달하기 전/후에 추가적인 처리`{:.block-blue}를 할 수 있게 해준다.  

### Interceptor의 종류
- **preHandle**  
`Controller의 동작 이전에 처리`하며, false를 반환하면 바로 종료한다.
- **postHandle**  
`Controller의 동작 이후에 호출`된다.
- **afterCompletion**  
`View를 통해 클라이언트에 응답을 전송한 후 호출`된다.

### Interceptor 등록
`servlet-context.xml`에 Interceptor를 등록하고 적용할 경로를 설정한다.
```xml
<interceptors>
  <interceptor>
    <mapping path="/guestbook/register"/>
    <mapping path="/guestbook/modify"/>
    <mapping path="/guestbook/delete"/>
    <beans:ref class="com.guestbook.interceptor"/>
  </interceptor>
</interceptors>
```

### Interceptor 구현
`HandlerInterceptor 인터페이스를 상속`받아 인터셉터를 구현한다.  
```java
public class ConfirmInterceptor extends HandlerInterceptorAdapter {
  @Override
  public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
      throws Exception {
    HttpSession session = request.getSession();
    MemberDto memberDto = (MemberDto) session.getAttribute("userinfo");
    if(memberDto == null) {
      response.sendRedirect(request.getContextPath() + "/user/login");
      return false;
    }
    return true;
  } 

  @Override
  public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
      ModelAndView modelAndView) throws Exception {
    // do something..
  }
    
  @Override
  public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex)
      throws Exception {
    // do something..
  }
}
```

## Filter
`Filter`는 `DispatcherServlet에 요청이 전달되기 전/후에 처리`{:.block-blue}를 할 수 있게 해주는 것으로  
Spring의 기능이 아닌 `Servlet에서 제공하는 기능`{:.block-blue}이다.

### Filter의 메소드
- **init()**  
`필터 인스턴스 생성 후 초기화`

- **doFilter()**  
`실제 필터 처리`  
FilterChain을 따라가며 연속된 필터 처리

- **destroy()**  
`필터 인스턴스 소멸 전 호출`

### Filter 등록
Filter는 Servlet에서 제공하는 기능이기에 `web.xml`에 등록한다.

```xml
<filter>
  <filter-name>encodingFilter</filter-name>
  <filter-class>org.springframework.web.filter.CharacterEncodingFilter</filter-class>
  <init-param>
    <param-name>encoding</param-name>
    <param-value>UTF-8</param-value>
  </init-param>
</filter>
```

### Filter 구현
`Filter 인터페이스 상속`받아 Filter 구현
```java
public class FirstFilter implements Filter {
  @Override
  public void init(FilterConfig filterConfig) throws ServletException {
    // filter init
  }

  @Override
  public void doFilter(ServletRequest request, 
  ServletResponse response, FilterChain chain) throws IOException, ServletException {
    // filter 처리 전
    chain.doFilter(request, response);
    // filter 처리 후
  }
  
  @Override
  public void destroy() {
    // filter destroy
  }
}
```