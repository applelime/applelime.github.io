---
layout: post
title: Spring 이란?
sitemap: true
hide_last_modified: false
categories:
  - develop
  - backend
---

# Spring 이란?
Spring은 `자바 엔터프라이즈 개발을 편하게 해주는 경량급 애플리케이션 프레임워크`이다.  
개발자가 실수하기 쉽고 복잡한 Low Level에 신경쓰지 않고, Business Logic 개발에만 전념할 수 있도록 해준다.


## Spring의 주요 특징
1. **`IoC (Inversion of Control, 제어의 역전)`{:.block-blue}**  
기존의 방식은 java를 통해서 직접 객체를 생성하고 소멸시킨다.  
하지만 Spring에서는 `객체 생명주기를 개발자가 아닌 스프링 컨테이너가 대신 관리`한다.  
이를 Spring Container 또는 IoC Container라고 부르기도 한다.

2. **`DI (Dependency Injection, 의존성 주입)`{:.block-blue}**  
구성요소간의 `의존 관계가 외부의 설정파일을 통해 정의`되는 방식이다.  
현재는 설정파일이나 어노테이션을 통해 객체 간 의존 관계를 설정할 수 있다.

3. **`AOP (Aspect Oriented Programming, 관점 지향 프로그래밍)`{:.block-blue}**  
문제를 바라보는 관점을 기준으로 프로그래밍하는 기법이다.  
여러 객체에 `공통 적용할 수 있는 기능을 구분`하여 여러 코드에 쉽게 적용할 수 있도록 한다.  
여러 모듈에서 사용하는 기능을 분리하여 관리할 수 있다.  

4. **`POJO (Plain Old Java Object)`{:.block-blue}**  
특정환경이나 기술에 종속적이지 않은 객체지향 원리에 충실한 `기존의 자바 객체`를 뜻한다.  
특정한 인터페이스를 구현하거나, 클래스 상속 없이도 사용이 가능하다. 

## Spring Framework Module

| **Spring Core** | Spring Framework의 핵심기능을 제공<br>BeanFactory를 기반으로 Bean 클래스들을 제어 |
| **Spring Context** | context 정보들을 제공하는 설정 파일<br>JNDI, EJB, Validation 등 서비스들을 포함 |
| **Spring AOP** | Spring에서 AOP를 지원 |
| **Spring DAO** | JDBC 기반의 DAO 개발을 좀 더 쉽고 일관되게 개발 가능하도록 지원 |
| **Spring ORM** | 여러 ORM Framework에 플러그인되어<br>Object Relational Tool(JDO, Hibernate, iBatis)을 제공 |
| **Spring Web** | Web Application에 필요한 기본 기능 지원 |
| **Spring Web MVC** | 자체적으로 MVC 프레임워크를 제공 |

> [IoC / DI](/develop/backend/2022-04-16-develop-backend-spring-ioc-di/)  