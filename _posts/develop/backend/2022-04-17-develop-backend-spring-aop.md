---
layout: post
title: Spring AOP
sitemap: true
hide_last_modified: false
categories:
  - develop
  - backend
---

# Spring AOP
* toc
{:toc .large-only}

## AOP (Aspect Object Programming)
AOP (Aspect Object Programming)은 `관점 지향 프로그래밍`으로  
`문제를 바라보는 관점(Aspect) 기준으로 프로그래밍`{:.block-blue}하는 기법이다.

관점 지향은 어떤 기능을 구현할 때 `주요 핵심 기능과 부가적인 기능을 각각의 관점별로 모듈화`{:.block-green}하는 것이다.

이 때 `여러 곳에서 반복되어 사용하는 코드`를 `횡단 관심사(Cross-cutting concern)`라고 하며  
이를 `Aspect로 모듈화하여 재사용성과 유지보수성을 올리는 것`{:.block-blue}이 AOP의 목적이다.

## AOP 주요 개념
- **Aspect**  
`반복되어 사용하는 부가 기능을 모듈화`한 것  
여러 객체에 공통 적용되는 공통 관점 사항  
- **Target**  
`핵심 기능을 담고 있는 모듈`  
Aspect를 적용할 대상
- **JoinPoint**  
`구현된 부가 기능(Advice)을 실제 수행할 시점`  
클래스의 인스턴스 생성 시점, 메소드 호출 시점, 특정 작업이 시작되는 시점
- **PointCut**  
`Advice를 적용할 Target의 메소드를 선별할 표현식`
- **Advice**  
`실질적으로 부가기능을 담은 구현체`

## Advice 종류
- **Before** : Target 메소드 실행 전
- **After** : Target 메소드 실행 후
- **Around** : Before + After
- **AfterRunning** : Target 메소드가 정상적으로 결과값 반환 후
- **AfterThrowing** : Target 메소드 실행 중 예외발생 시

## Proxy
Spring은 프록시 기반 AOP를 지원한다.  
Proxy란 `대리인`이라는 의미로 Target을 감싸서 `Target에 대한 요청을 대신 받아주는 객체`{:.block-blue}이다.  

`Target을 호출하면 Proxy에서 호출을 가로챈 후`  
`Advice에 등록된 기능을 수행 한 뒤 Target Method를 호출 (Before)`{:.block-blue}한다.

## PointCut 표현식
> 지시자([수식어] 리턴타입 패키지 타입 메소드(매개변수))

일반적으로는 `execution` 지시자를 가장 흔히 사용한다.  

ex)  
- execution(void send*(String))  
리턴타입이 void, 메소드명이 send로 시작하며, 매개변수가 String 1개인 모든 메소드

- execution(* com.aop.\*.service.send(*))  
com.aop.\*.service 패키지, 메소드명이 send이며, 매개변수가 1개인 모든 메소드

- execution(* send(int, ..))  
메소드명이 send이고, 1번째 매개변수가 int인 모든 메소드 (..은 0개 이상을 의미)

## Spring AOP
- **`Aspect 선언`**  
@Aspect 어노테이션을 사용하여 해당 클래스가 Aspect 모듈임을 명시  
    ```java
    @Component
    @Aspect
    public class PerformanceAspect {
      @Around("execution(* com.board.boardService.read(..))")
      public Object logPerformance(ProceedingJoinPoint pjp) {
        Object result = null;
        try {
          long start = System.currentTimeMillis();
          result = pjp.proceed();
          long end = System.currentTimeMillis();

          System.out.println("수행 시간 : "+ (end - start));
        } catch (Throwable throwable) {
          System.out.println("exception!!");
        }
        return result;
      }
    }
    ```

- **`Config 추가`**  
해당 Aspect를 사용하기 위해 xml 또는 Annotation 추가  
    ```xml
    ...
    <aop:aspectj-autoproxy/>
    ...
    ```
    ```java
    @Configuration
    @ComponentScan
    @EnableAspectJAutoProxy
    public class Configuration {
      ...
    }
    ```