---
layout: post
title: 비트마스킹
sitemap: true
hide_last_modified: false
categories:
  - develop
  - ps
---
# 비트마스킹

이전에 포스팅했던 순열, 조합과 관련된 내용이라 이어서 작성하였다.

## 비트마스킹
비트마스킹(BitMasking)이란 `비트(Bit)를 사용하여 데이터를 표현하는 기법`이다.  
우선 비트를 다루므로 `비트 연산자`는 기본적으로 알고 있어야 한다.  

| a&b | AND. 둘다 1이면 1 |
| a\|b | OR. 하나라도 1이면 1 |
| a^b | XOR. 둘이 다르면 1 |
| ~a | NOT. 비트 반전. 0이면 1 |
| a<<b | a를 b비트만큼 왼쪽으로 시프트 |
| a>>b | a를 b비트만큼 오른쪽으로 시프트 |

### 일반적인 사용
보통 1을 n번 시프트하여 원하는 자리에 1을 위치시킨다.  
`10 & 1<<3`  
```
  00001010
& 00001000
= 00001000
```
위처럼 `&연산을 통하면 해당 자리값이 1인지를 검사`{:.block-blue}할 수 있다.  
전체 결과가 0이 아니라면 값이 존재하는 것.

아래는 자주 사용되는 연산으로 알아두면 좋다.    
`data |= (1<<x)` : 원소 추가 (x자리에 1 추가)  
`data &= ~(1<<x)` : 원소 삭제  
`data ^= (1<<x)` : 토글. 해당 비트 반전  

> 관련 기본문제 - [집합](https://www.acmicpc.net/problem/11723) 

### 비트마스킹을 이용한 순열
```java
public static void permutation(int cnt, int flag) { 
// flag : 뽑힌 수들에 대한 플래그 비트열
  if (cnt==r) {
    return;
  }
  
  for (int i = 0; i < n; i++) {
    // 해당 자리를 사용하고 있는지 체크
    if ((flag & 1<<i) != 0)
      continue;
    
    numbers[cnt] = data[i];
    permutation(cnt+1, flag | 1<<i);  // 다음 자리수로 넘어갈 때 해당 자리값 세팅
  }
}
```
기존의 순열 코드와 달라진 부분은 isSelected 배열을 사용하지 않고  
비트마스킹을 활용하여 `매개변수로 flag를 넘겨 사용한 index를 체크`한다.

### 비트마스킹을 이용한 부분집합
```java
private static void subset(int[] data) {
  int n = data.length;
  for (int flag = 0, caseCount = 1<<n; flag < caseCount; flag++) {
    // flag : 원소들의 선택상태의 비트열
    for (int i = 0; i < n; i++) {
      if((flag & 1<<i) != 0) {
        System.out.print(data[i] + " ");
      }
    }
    System.out.println();
  }
}
```
쉽게 생각하여 flag를 이용해 `1이면 해당 자리를 뽑았다`고 생각하는 것이다.  
7이면 0111이므로 2,3,4번째를 선택하는 부분집합  
10이면 1010이므로 1,3번째를 선택하는 부분집합과 같이 처리하는 것이다.  

반복문의 `마지막 조건은 1<<n 보다 작을 때`이다.  
예를들어 n이 4라면 1<<4는 10000이 되고, 하나 적은 1111까지 반복이 일어날 것이다.  
기존의 부분집합을 처리하는 코드만 다를 뿐 결과적으로 `경우의 수는 2ⁿ` 그대로 라는 것을 주의해야한다.