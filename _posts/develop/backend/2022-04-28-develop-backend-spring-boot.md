---
layout: post
title: SpringBoot 사용하기 
sitemap: true
hide_last_modified: false
categories:
  - develop
  - backend
---

# SpringBoot 사용하기 
* toc
{:toc .large-only}
SpringBoot란 `Spring 프레임워크 기반 프로젝트를 복잡한 설정없이 쉽게 생성`할 수 있게 하는 프레임워크이다.  
그 외 특징들에 대해서는 바로 아래에서 설명하겠다.

## SpringBoot의 특징
1. **`설정의 자동화`{:.block-blue}**  
Spring 프레임워크를 사용하려면 많은 xml파일을 설정해야 했으나,  
SpringBoot에서는 복잡한 설정들을 자동화하여 프로젝트 생성 후 별도의 설정 없이도 서버 구동이 가능하다.

2. **`라이브러리 버전 관리`{:.block-blue}**  
Spring 및 서드 파티 라이브러리들의 버전을 미리 정의하고 관리하고 있어,  
호환성 맞는 버전을 찾는다거나 예상치 못한 에러가 발생할 일이 없다.

3. **`내장 서버 포함`{:.block-blue}**  
SpringBoot에는 WAS인 Tomcat을 내장 서버로 포함하고 있어,  
서버 추가 및 별도의 작업 없이 서버를 구동할 수 있다.

4. **`JAR 파일로 개발 가능`{:.block-blue}**  
기존 Spring 프로젝트를 배포하기 위해서는 war(Web Application Archive) 파일로 패키징하여 배포하여야 했는데,   
SpringBoot에서는 내장 서버를 포함하고 있기에 jar(Java Archive) 파일로 패키징해도 웹 어플리케이션을 실행할 수 있다.

## 프로젝트 생성 및 실행
STS 기준으로
1. **`New -> Spring Starter Project`**  
![project-1](/assets/img/blog/develop/back/springboot/project-1.jpg){:.bordered}

2. **`프로젝트 세팅을 설정한다.`**  
빌드 도구 (Maven/Gradle), 패키지 종류(jar/war), 자바 버전, 언어 등을 설정한다.  
![project-2](/assets/img/blog/develop/back/springboot/project-2.jpg){:.bordered}

3. **`SpringBoot의 버전 및 추가할 Dependency를 선택한다.`**
![project-3](/assets/img/blog/develop/back/springboot/project-3.jpg){:.bordered}

4. **`프로젝트를 생성한다.`**

5. **`SpringBoot를 실행한다.`**  
SpringBoot의 폴더 구조는 아래처럼 생겼는데,  
프로젝트명+Application.java 파일에서 Spring Boot App으로 실행한다.  
![project-4](/assets/img/blog/develop/back/springboot/project-4.jpg){:.bordered}

## 메인 클래스

```java
@SpringBootApplication
public class SpringBootRestTodoApplication {
  public static void main(String[] args) {
    SpringApplication.run(SpringBootRestTodoApplication.class, args);
  }
}
```
프로젝트를 생성하면 프로젝트명+Application 클래스가 생성된다.  
여기에는 `@SpringBootApplication`이라는 어노테이션이 붙어있는데 이는 아래 3가지 역할을 수행한다.

1. **`@ComponentScan`{:.block-blue}**  
@Component 및 @Controller, @Service, @Repository 등의 어노테이션을 스캔하여 Bean으로 등록해준다.

2. **`@EnableAutoConfiguration`{:.block-blue}**  
Dependency를 보면 spring-boot-autoconfigure가 있는데 여기에 포함된 사전에 정의된 Configuration 들을 Bean으로 등록해준다.

3. **`@SpringBootConfiguration`{:.block-blue}**  
스프링 부트의 설정을 나타내는 어노테이션으로 @Configuration를 대체한다.

이런 과정들이 진행되므로 따로 설정이 불필요한 것이다.

## 템플릿 엔진과 폴더 구조
보통 Spring에서는 View를 표현하기 위해 JSP를 사용했는데,  
SpringBoot에서는 `JSP를 지원하지 않고 권장하지 않는다.`  
대신에 Template Engine의 사용을 권장하고 있다.

그 이유로는 war는 web에서 사용하기 위한 archive로 WEB-INF 폴더를 포함하는 구조인데  
JSP는 해당 폴더 안에 위치하여 동적으로 사용되므로  
기본적으로 jar를 권장하는 SpringBoot에서는 Template Engine의 사용을 권장하는 것이다.

### Template Engine
`template 파일을 사용하여 데이터를 합성하여 결과를 출력하는 엔진`이다.  
서버에서 가져온 데이터를 미리 정의된 template에 넣어 html을 만들어 클라이언트에 전달한다.  

SpringBoot에서 지원하는 Template으로는 Thymeleaf, Groovy, Freemarker 등이 있다.

### 폴더 구조
위의 프로젝트 구조 사진과 설명을 바탕으로,  
`static 폴더`에는 `css, js, img와 같은 정적인 리소스`{:.block-blue}들이 포함되고,  
`templates 폴더`에는 `template 파일`{:.block-blue}들이 위치된다.

## 설정 파일
`application.properties`는 SpringBoot가 구동될 때 자동으로 로딩하는 파일로 `외부 설정들을 정의하는 파일`{:.block-blue}이다.  
key, value 쌍으로 구성되며 기타 필요한 설정들을 넣으면 된다.

```properties
#server setting
server.port=80

#JSP Setting
spring.mvc.view.prefix=/WEB-INF/views/
spring.mvc.view.suffix=.jsp

#DataBase Setting
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.datasource.url=jdbc:mysql://127.0.0.1:3306/webdb?serverTimezone=UTC&useUniCode=yes&characterEncoding=UTF-8
spring.datasource.username=scott
spring.datasource.password=tiger

#MyBatis Setting
mybatis.type-aliases-package=com.guestbook.model
mybatis.mapper-locations=classpath:mapper/**/*.xml

#File Upload size Setting
spring.servlet.multipart.max-file-size=5MB
spring.servlet.multipart.max-request-size=5MB

#log level Setting
logging.level.root=info
logging.level.com.guestbook.controller=debug
```

## SpringBoot에서 JSP 사용하기
Maven 기준으로 pom.xml에 `jstl과 tomcat-embed-jasper를 추가`해주자.

```xml
<dependency>
    <groupId>javax.servlet</groupId>
    <artifactId>jstl</artifactId>
</dependency>		
<dependency>
    <groupId>org.apache.tomcat.embed</groupId>
    <artifactId>tomcat-embed-jasper</artifactId>
</dependency>
```

그리고 ViewResolver를 설정하기 위해 `application.properties`{:.block-green} 파일에서  
`spring.mvc.view의 prefix와 suffix를 설정`해주면 된다.

```properties
spring.mvc.view.prefix=/WEB-INF/views/
spring.mvc.view.suffix=.jsp
```