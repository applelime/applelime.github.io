---
layout: post
title: Java 제네릭과 C++ 템플릿의 차이
sitemap: false
hide_last_modified: false
categories:
  - develop
  - backend
---

# Java 제네릭과 C++ 템플릿의 차이

Java의 제네릭과 C++의 템플릿은 비슷해보이나 실제 동작은 다른 부분이 있다.

## Java 제네릭

모든 종류의 타입을 다룰 수 있도록 타입 파라미터(generic type)로 클래스나 메서드를 선언하는 기법.  
제네릭 사용 시 `컴파일 단계에서 타입을 체크하여 에러 검출` 가능하지만,  
`실제로 동작하는 코드는 제네릭을 사용하지 않을 때와 동일`하다.  

즉, 아래 2코드는 컴파일 후 같은 코드라는 것이다.
```java
  List<String> list = new ArrayList<>();
```
```java
  List list = new ArrayList();
```

## C++ 템플릿

하나의 클래스를 서로 다른 여러 타입에 재사용할 수 있도록 하는 기법.  
컴파일러는 인자로 주어진 `각각의 타입에 대해 별도의 템플릿 코드를 생성`한다.  
템플릿 선언 후 `사용하는 곳이 없다면 컴파일하지 않는다.`  

C++의 경우에는 타입마다 별도의 코드가 생성되므로 아래는 서로 다른 코드인 것.
```cpp
  vector<int> v;
```
```cpp
  vector<double> v;
```

## 차이점

1. C++의 Template에서는 int와 같은 기본 타입을 사용 가능하나  
Java의 Generic에서는 `Object를 상속받는 Integer를 사용`해야 한다.

2. C++에서는 다른 타입 인자를 사용해 만든 객체는 서로 다른 타입의 객체이나  
Java에서는 `Generic 타입 인자와 관계없이 전부 동등한 타입`이다.  

3. 2번의 이유에서 C++에서는 static 변수를 공유하지 않으나  
Java에서는 `타입이 달라도 같은 클래스를 공유하므로 static을 사용할 수 없다.`

4. Java에서는 `와일드카드를 활용하여 특정 클래스를 상속받은 타입만 설정`할 수 있다.