---
layout: post
title: Spring IoC / DI
sitemap: true
hide_last_modified: false
categories:
  - develop
  - backend
---

# Spring IoC / DI
* toc
{:toc .large-only}

## IoC (Inversion of Control)
IoC는 `제어의 역전`이라는 의미로  
Spring에서는 `객체 생명주기를 개발자가 아닌 스프링 컨테이너가 대신 관리`{:.block-blue}한다.  
다형성과 Factory, Assembler를 통해 객체 간의 결합도를 낮춘 것이 특징이다.

### Container
오브젝트의 생성과 관계설정, 사용, 제거 등의 작업을 컨테이너가 담당한다.  
스프링에서 IoC를 담당하는 컨테이너에는 BeanFactory, ApplicationContext가 있다.

- `Bean`  
`컨테이너가 관리하는 객체`{:.block-blue}를 빈(Bean)이라고 한다.

- `BeanFactory`  
`Bean들의 생명주기(Life-Cycle)를 관리하며 Bean을 등록, 생성, 조회, 반환`{:.block-blue}한다.  

- `ApplicationContext`  
`BeanFactory를 확장`{:.block-blue}하여 Bean들을 관리하며 `추가로 Spring의 각종 서비스를 제공`{:.block-blue}한다.

### IoC 유형
- `Dependency Lookup`  
컨테이너가 `lookup context를 통해 필요한 Resource나 Object를 얻는 방식`{:.block-blue}  

- `Dependency Injection`  
컨테이너가 `직접 의존 구조를 Object에 설정하는 방식`{:.block-blue}

Dependency Lookup 방법으로는 아래와 같이 xml에 Bean 정보를 명시하고,  
컨테이너가 제공하는 메소드를 이용하여 Lookup하여 찾는다.  
```xml
<beans>
...
  <bean id="memberService" class="com.service.MemberServiceImpl" />
  <bean id="adminService" class="com.service.AdminServiceImpl" />
  ...
</beans>
```
```java
ApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");
CommonService memberService = context.getBean("memberService", MemberService.class);
CommonService adminService = context.getBean("adminService", AdminService.class);
```

## DI (Dependency Injection)
Dependency Injection은 말그대로 `의존성 주입`을 뜻하며  
`클래스 간의 의존성을 외부의 설정파일을 통해 주입`{:.block-blue}한다.  

### XML을 통한 Bean 설정
`xml에서 <bean>태그를 사용하여 설정`한다.  

- **`Bean 객체 생성`{:.block-blue}**  
`id`{:.block-green} : 주입 받을 곳에서 호출 할 이름 설정 (유일 값)  
`class`{:.block-green} : 주입할 객체의 클래스  
`scope`{:.block-green} : Bean의 생성 범위 지정  
`factory-method`{:.block-green} : Singleton 패턴으로 작성된 객체의 factory 메소드 호출

- **`Bean 의존 관계 설정`{:.block-blue}**
  - `1. Constructor 이용`  
  `<constructor-arg>`{:.block-green} 태그를 이용하여 객체 또는 값을 생성자를 통해 주입받는다.  
  객체 주입시 `ref`{:.block-green}, 값 주입 시 `value`{:.block-green}를 이용하며,  
  하위태그를 사용하거나 속성을 이용할 수 있다.
    ```xml
    <bean id="player1" name="p1" class="com.test.Player">
      <constructor-arg index="0">
        <value>31</value>
      </constructor-arg>
      <constructor-arg value="정수빈" />
      <constructor-arg name="position" value="8" />
    </bean>
    ...
    <bean id="dao" class="com.test.PlayerDao">
    <bean id="service1" class="com.test.PlayerService">
      <constructor-arg ref="dao" />
    </bean>
    ```
  - `2. Property 이용`  
  Setter Method를 이용하여 `property`{:.block-green} 태그를 통해 객체 또는 값을 주입받는다.
    ```xml
    <bean id="player1" class="com.test.Player">
      <property name="num" value="31" />
    </bean>
    ...
    <bean id="dao" class="com.test.PlayerDao">
    <bean id="service1" class="com.test.PlayerService">
      <property name="playerDao" ref="dao" />
    </bean>
    ```

- **`Collection 계열 주입`{:.block-blue}**  
마찬가지로 2가지 방법을 이용하여 `List, Set, Map, Properties`{:.block-green}를 주입할 수 있다.  

  ```xml
  <bean id="listdi" class="com.test.ListDi">
    <property name="myList">
      <list>
        <value>20</value> <!-- String -->
        <value type="java.lang.Integer">20</value> <!-- Integer -->
        <ref bean="player" />
      </list>
    </property>
  </bean>
  ...
  <bean id="mapdi" class="com.test.Mapdi">
    <property name="myMap">
      <map>
        <entry key="username" value="김민수" />
        <entry key="py" value-ref="player" />
      </map>
    </property>
  </bean>
  ```

- **`Bean 객체의 생성 범위`{:.block-blue}**  
\<bean\>의 `scope 속성`을 이용해 설정한다.  
`default는 singleton`{:.block-green}으로 생성된다.  

| **singleton** | 스프링 컨테이너당 하나의 인스턴스만 생성 |
| **prototype** | 컨테이너에 빈을 요청할 때마다 새로운 인스턴스 생성 | 
| **request** | HTTP Request 별로 새로운 인스턴스 생성 |
| **session** | HTTP Session 별로 새로운 인스턴스 생성 |

request, session은 WebApplicationContext에서만 적용 가능하다.

### Annotation을 통한 Bean 설정
xml에서 `component-scan`을 이용하여 `어노테이션이 설정된 Bean을 자동 등록`{:.block-green}한다.  

- **`Stereotype Annotation`{:.block-blue}**  
Bean 등록을 위해 사용 가능한 어노테이션은 아래와 같다.  
@Component와 @Controller, @Service, @Repository의 동작은 동일하지만 기능에 따라 구분하여 사용한다.

  | **@Component** | 일반적인 기본 Component를 의미한다. |
  | **@Controller** | MVC Controller일 경우 사용한다. |
  | **@Service** | Service 클래스에 사용한다. |
  | **@Repository** | DAO 클래스에 사용한다. |

- **`Bean 의존 관계 설정을 위한 Annotation`{:.block-blue}**  

  | **@Autowired** | 해당 어노테이션을 붙이면 자동으로 Bean 객체를 생성하여 연결시켜준다. |
  | **@Resource** | Spring 2.5부터 지원하는 어노테이션으로<br>JNDI 리소스에 대한 Injection을 필요로 하는 경우 사용한다. |
  | **@Inject** | Spring 3부터 지원하는 어노테이션으로<br>특정 프레임워크에 종속되지 않게 구성하기 위해 사용한다. |
  | **@Qualifier** | 동일한 타입의 Bean이 여러개일 때 name으로 식별 |

```java
@Service
public class MemberServiceImpl implements MemberService {
  @Autowired
  @Qualifier("mdao")
  MemberDao memberDao;

  @Autowired
  @Qualifier("adao")
  AdminDao adminDao;

  ...
}
```

