---
layout: post
title: MVC 패턴이란?
sitemap: true
hide_last_modified: false
categories:
  - develop
  - backend
---

# MVC 패턴이란?

## MVC 패턴
![mvc pattern](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FJeqRn%2FbtqID6bWwwA%2FLcgEx13rMmHLWwGzkftTwK%2Fimg.png)  
(출처 : <https://osy0907.tistory.com/63>)  

MVC (Model-View-Controller) 패턴은 프로그램을 3가지 구성요소로 나눈다.  

- **`Model`**  
모델은 `Logic(Business & DB Logic)을 처리하는 코드`{:.block-blue}를 말한다.  
Controller로부터 넘어온 data를 이용하여 이를 수행하고 그 결과를 다시 Controller에게 return한다.  

- **`View`**  
뷰는 `사용자에게 보여주는 화면 처리`{:.block-blue}를 말한다.  
Logic 처리를 위한 java 코드는 사라지고 결과 출력을 위한 코드만 존재한다.  

- **`Controller`**  
컨트롤러는 Client의 요청을 분석하여 Logic 처리를 위한 `Model단을 호출`{:.block-blue}한다.  
return 받은 결과 data를 필요에 따라 request, session 등에 저장하고,  
redirect, forward 방식으로 `jsp page(view)를 이용하여 출력`{:.block-blue}한다.

## MVC패턴의 장점
- 출력을 위한 view 코드와 처리를 위한 java 코드가 분리되어 `jsp가 복잡하지 않다.`
- `화면단과 Logic단이 분리`되어 분업이 용이하다.
- 기능에 따라 code가 분리되어 `유지보수가 쉽다.`
- 확장성이 뛰어나다.

## MVC패턴의 단점
- 구조가 복잡하여 초기 진입이 어렵다.
- 개발 시간의 증가로 개발 비용 증가.