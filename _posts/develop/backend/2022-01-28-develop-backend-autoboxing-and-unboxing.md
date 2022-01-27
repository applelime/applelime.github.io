---
layout: post
title: Wrapper 클래스 오토박싱과 언박싱
sitemap: false
hide_last_modified: false
categories:
  - develop
  - backend
---

# Wrapper 클래스 오토박싱과 언박싱

오토박싱과 언박싱은 `기본 타입`과 `해당 객체 래퍼 클래스` 간에 자동으로 변환이 이루어지는 것을 말한다.  
Integer클래스에서 증감연산자 ++이 어떻게 정상 동작할까 궁금하여 찾아보게 되었다.

## Autoboxing

간단한 예시로 아래와 같은 코드가 있다.
```Java
List<Integer> li = new ArrayList<>();
for (int i = 1; i < 50; i +=2)
  li.add(i);
```

위 코드는 실제로는 런타임에 아래 코드로 변경된다.
```Java
List<Integer> li = new ArrayList<>();
for (int i = 1; i < 50; i +=2)
  li.add(Integer.valueOf(i));
```

이렇게 `원시 값(int)을 해당 래퍼 클래스(Integer)로 변환`하는 것을 오토박싱이라고 한다.

## Unboxing

```Java
public static int sumEven(List<Integer> li) {
  int sum = 0;
  for (Integer i: li)
   if (i%2 == 0)
    sum += i;
  return sum;
}
```

이번에는 반대로 위 코드는 아래처럼 바뀌게 된다.
```Java
public static int sumEven(List<Integer> li) {
  int sum = 0;
  for (Integer i: li)
   if (i%2 == 0)
    sum += i.intValue();
  return sum;
}
```

이렇게 `래퍼 유형(Integer)의 개체를 기본(int)값으로 변환`하는 것을 언박싱이라고 한다.

## valueOf
 
![valueOf](/assets/img/blog/develop/back/autoboxing/valueof.jpg){:.bordered}  

오토박싱이 일어나면 실제로는 Integer 클래스의 valueOf 메소드를 호출한다.  
이 valueOf 메소드의 정의를 보면 -128 ~ 127의 값은 캐싱한다고 되어 있는데  
실제로도 주소값을 비교해보면 해당 범위 밖은 주소값이 다른 것을 알 수 있다.  

![](/assets/img/blog/develop/back/autoboxing/valueof-2.jpg){:.bordered} 
![](/assets/img/blog/develop/back/autoboxing/valueof-3.jpg){:.bordered}   

### 더 자세한 내용은 공식 문서를 확인하자.
<https://docs.oracle.com/javase/tutorial/java/data/autoboxing.html>
<https://docs.oracle.com/javase/specs/jls/se7/html/jls-5.html#jls-5.1.7>