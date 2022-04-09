---
layout: post
title: Java는 Call by Reference가 없다
sitemap: true
hide_last_modified: false
categories:
  - develop
  - backend
---

# Java는 Call by Reference가 없다
결론만 먼저 말하자면 `자바는 Call by Value`다.  
참조 타입에서도 레퍼런스를 전달하지 않는다!!  

## Primitive Type (기본형)
boolean, char, byte, short, int, long, float, double.  
다른 언어와 마찬가지로 역시나 `Call by Value`다. `값이 복사`된다는 것이다.  
  
**아래 코드를 실행하면 결과가 어떻게 나올까?**  
![](/assets/img/blog/develop/back/call-by-value/value1.jpg){:.bordered}  

역시나 예상한 대로일 것이다.  
![](/assets/img/blog/develop/back/call-by-value/value2.jpg){:.bordered}  

## Reference Type (참조형)
자바도 다른 언어와 마찬가지로 `Call by Reference`일까?  
실제로는 `Call by Value`{:.block-blue}로 동작한다.  

**① 아래 코드를 실행하면 결과가 어떻게 나올까?**  
Test 클래스는 String name 변수만 존재하는 클래스이다.  
![](/assets/img/blog/develop/back/call-by-value/value3.jpg){:.bordered}  

결과는 아래와 같다.  
t가 가리키는 객체의 내용이 변경되었다.  
![](/assets/img/blog/develop/back/call-by-value/value4.jpg){:.bordered}  
<br>

**② 그렇다면 아래 코드를 실행하면 어떨까?**  
t와 t2는 같은 객체를 가리키고 있을까?  
![](/assets/img/blog/develop/back/call-by-value/value5.jpg){:.bordered}  

정답은 아니다.  
change 메소드에서 받아온 t는 main 메소드에서 선언된 t와 `같은 주소값을 가진 로컬 변수`이다.  
즉. `주소 값만 복사`된 것이다.  
![](/assets/img/blog/develop/back/call-by-value/value6.jpg){:.bordered}  

## 정리
자바에서는 `참조타입도` 같은 객체를 가리키는 `주소값을 복사`하는 **`Call by Value 방식`{:.block-blue}**으로 전달된다.  
C++의 참조자나 Call by Reference 방식처럼 해당 `변수가 가리키는 값`은 `변경할 수 없다.`{:.block-blue}  
하지만 `객체 내부의 값`은 해당 주소로 접근하여 `변경이 가능`{:.block-blue}하다.