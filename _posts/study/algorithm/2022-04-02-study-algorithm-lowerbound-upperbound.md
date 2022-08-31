---
layout: post
title: Lower Bound, Upper Bound
sitemap: true
hide_last_modified: false
categories:
  - study
  - algorithm
---
# Lower Bound, Upper Bound

Lower Bound와 Upper Bound는 이분 탐색에서 사용하는 기법으로  
중복 데이터가 있을 때, 혹은 삽입 위치를 찾을 때 주로 사용한다.  

![bound](http://bajamircea.github.io/assets/2018-08-09-lower-bound/01-lower_bound.png)  
(출처 : <http://bajamircea.github.io/coding/cpp/2018/08/09/lower-bound.html>)

## 동작 예시
![bound2](http://bajamircea.github.io/assets/2018-08-09-lower-bound/02-lower_bound_samples.png)  
(출처 : <http://bajamircea.github.io/coding/cpp/2018/08/09/lower-bound.html>)  

## Lower Bound
Lower Bound는 말 그대로 하한 값이다.  
`특정 값보다 같거나 큰 값이 처음 나오는 위치`를 리턴한다.  

기존 이분탐색에서는 mid 왼쪽 범위에 있을 때 right = mid - 1로 세팅하는데,  
여기서는 mid값을 그대로 두는 것이 특징이다. (같거나 큰 값이 처음 나오는 위치)

```java
public int lowerBound(int value) {
  int left = 0;
  int right = data.length;
  while (left < right) {
    int mid = (left+right)/2;
    if (data[mid] < value)
      left = mid + 1;
    else
      right = mid;
  }
  return right;
}
```

## Upper Bound
Upper Bound는 상한 값이다.  
`특정 값보다 큰 값이 처음 나오는 위치`를 리턴한다.

Lower Bound와 다른 점은 같은 값일 경우에도 더 큰 값을 찾으므로 같을 때도 mid + 1을 해준다.
```java
public int upperBound(int value) {
  int left = 0;
  int right = data.length;
  while (left < right) {
    int mid = (left+right)/2;
    if (data[mid] <= value)
      left = mid + 1;
    else
      right = mid;
  }
  return right;
}
```

## 어떤 경우에 사용할까?
1. 중복되는 값의 개수를 알아내고 싶을 때  
`upperBound() - lowerBound()를 계산하면 특정 값의 개수`를 얻을 수 있다.

2. 삽입 위치를 알아내고 싶을 때  
이전 [LIS](/develop/ps/2022-04-01-develop-ps-lis/) 를 만들 때에도 원소의 삽입 위치를 알아내기 위해 Lower Bound를 사용하였다.
