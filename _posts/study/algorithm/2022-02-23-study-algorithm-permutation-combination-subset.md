---
layout: post
title: 순열, 조합, 부분집합
sitemap: true
hide_last_modified: false
categories:
  - study
  - algorithm
---
# 순열, 조합, 부분집합

* toc
{:toc .large-only}

완전 탐색(브루트 포스)을 하다보면 모든 경우의 수를 나열하는 방법 중에  
순열, 조합, 부분집합이 은근히 쓰일 때가 있어 어떻게 코드를 짜는지 알아두면 많은 도움이 된다.

## 순열
순열이란 `서로 다른 n개의 원소에서 r개를 중복없이 순서있게 선택`, 나열하는 것을 순열이라고 한다.

> 5개 중 3개를 선택하는 순열  
1번째 - 5가지  
2번째 - 4가지  
3번째 - 3가지  
총 경우의 수 = 5x4x3 = 60가지

이를 일반화 하면 `총 경우의 수`는 `n!/(n-r)!`로 나타낼 수 있다.

```java
public static void permutation(int cnt) {
  // r개를 뽑으면 종료
  if (cnt==r) {
    System.out.println(Arrays.toString(numbers));
    return;
  }
  
  // n개를 반복하며 뽑는다.
  for (int i = 0; i < n; i++) {
    if(isSelected[i]) continue;   // 선택한 수는 다시 뽑지 않는다.
    
    numbers[cnt] = data[i];       // 선택한 수를 저장
    isSelected[i] = true;         // isSelected 배열로 선택한 수 관리
    permutation(cnt+1);           // 다음 자리수 뽑기 (재귀)
    isSelected[i] = false;        // 재귀에서 돌아오면 선택한 수 초기화
  }
}
```
주의할 점으로는 11!이 약 4천만, 12!은 약 5억이다.  
그렇기에 **`n이 12이상이라면 순열로 푸는 문제가 아닐`{:.block-blue}** 확률이 높다.

## 중복 순열
`중복된 수를 허용하는 순열`이다.

> 마찬가지로 5개중 3개를 선택하는 중복순열  
1번째 - 5가지  
2번째 - 5가지  
3번째 - 5가지  
총 경우의 수 = 5x5x5 = 125가지

이를 일반화 하면 `총 경우의 수`는 `n^r`로 나타낼 수 있다.

```java
public static void permutation(int cnt) {
  // r개를 뽑으면 종료
  if (cnt==r) {
    System.out.println(Arrays.toString(numbers));
    return;
  }
  
  // n개를 반복하며 뽑는다.
  for (int i = 0; i < n; i++) {
    numbers[cnt] = data[i];       // 선택한 수를 저장
    permutation(cnt+1);           // 다음 자리수 뽑기 (재귀)
  }
}
```
중복 순열에서는 기존 순열 코드에서 `중복체크를 제거`하면 되므로 오히려 더 단순해진다.

## 조합
조합이란 `서로 다른 n개의 원소에서 r개를 중복없이 순서없이 선택`하는 것을 조합이라고 한다.

> 5개 중 3개를 선택하는 조합  
1번째 - 5가지  
2번째 - 4가지  
3번째 - 3가지  
총 경우의 수 = 5x4x3 = 60가지  
<br>
순서가 없으므로 뽑은 3가지가 자리만 바뀌는 경우는 같은 경우이므로 나눠준다.  
3x2x1 = 6  
<br>
총 경우의 수 = 60 / 6 = 10가지

이를 일반화 하면 `총 경우의 수`는 `n!/(n-r)!r!`로 나타낼 수 있다.

```java
public static void combination(int cnt, int start) {
  // r개를 뽑으면 종료
  if (cnt==r) {
    System.out.println(Arrays.toString(numbers));
    return;
  }
  
  // n개를 반복하며 뽑는다.
  for (int i = start; i < n; i++) {
    numbers[cnt] = data[i];       // 선택한 수를 저장
    combination(cnt+1, i+1);      // 다음 자리수 뽑기, i+1번부터 (재귀)
  }
}
```
조합의 경우 중복된 값을 뽑지 않기 위해 `start 매개변수를 사용`하여 이전에 선택한 인덱스 다음부터 값을 뽑는다.  
그렇기에 중복이 제거되었으므로 isSelected 배열로 선택한 수를 관리할 필요가 없다.  

조합은 n과 r에 따라 시간차이가 큰데 대체로 전체 중 절반을 뽑는 문제가 많다.  
20C10 = 18만, **`30C15 = 1억5천`{:.block-blue}** 정도로 참고만 하도록 하자.

## 중복 조합
`중복된 수를 선택하는 것을 허용`하는 조합이다.  

> 마찬가지로 5개중 3개를 선택하는 중복 조합  
같은 수가 r개(3개)까지 나올 수 있으므로 전체가 r-1개(2개) 더 있다고 생각할 수 있다.  
<br>
-> 7개중 3개를 뽑는 조합으로도 볼 수 있으므로  
총 경우의 수 = 7C3 = 35가지

이를 일반화 하면 `총 경우의 수`는 `n+r-1Cr`로 나타낼 수 있다.

```java
public static void combination(int cnt, int start) {
  // r개를 뽑으면 종료
  if (cnt==r) {
    System.out.println(Arrays.toString(numbers));
    return;
  }
  
  // n개를 반복하며 뽑는다.
  for (int i = start; i < n; i++) {
    numbers[cnt] = data[i];       // 선택한 수를 저장
    combination(cnt+1, i);      // 다음 자리수 뽑기, i번부터 (재귀)
  }
}
```
중복 조합의 경우 중복된 값을 뽑아도 되므로 `다음 시작을 현재값부터 시작할 수 있게 start를 i로만 바꿔주면` 된다.  
재밌고 쉽게 중복조합을 이해할 수 있었던 영상이 있어 공유한다.
> [[이차함수] 오충대장군으로 중복조합 킬 내는 법](https://youtu.be/gYHCDLkItbw)

## 부분 집합
전체 중 `일부를 선택하여 만들 수 있는 모든 집합`을 말한다.  
모두 선택하지 않은 `공집합도 해당 집합의 부분집합`이다.  

간단하게 설명하자면 모든 숫자는 `뽑거나 / 뽑지않거나` 둘 중 하나의 상태로 나타낼 수 있다.  
`총 경우의 수`는 `2ⁿ`으로 나타낼 수 있다.
```java
public static void subset(int cnt) { 
  // n개를 다 뽑으면 종료
  if (cnt == n) {
    for (int i = 0; i < n; i++)
      System.out.print((isSelected[i]?input[i]:"X")+" ");
    System.out.println();
    return;
  }

  // 현재 원소를 선택
  isSelected[cnt] = true;
  subset(cnt+1);

  // 현재 원소를 비선택
  isSelected[cnt] = false;
  subset(cnt+1);
}
```
시간복잡도상 2³⁰ = 약 10억이므로  
그렇기에 **`n이 27이상이라면 부분집합으로 푸는 문제가 아닐`{:.block-blue}** 확률이 높다.

## 요약
숫자 1,2,3 - 3개 중 3개를 선택하는 수열에서  
> **순열** : 123 132 213 231 312 321  
**중복 순열** : 111 112 113 121 122 123 .. 331 332 333  
-> **`순서가 있게`** 나열하는 방법  
1초기준 **`n이 11이하`{:.block-blue}**일 때만 사용

> **조합** : 123  
**중복 조합** : 111 112 113 122 123 133 222 223 233 333  
-> **`순서 없이`** 나열하는 방법  
**`30C15 = 1억5천`{:.block-blue}**

> **부분집합** : {} {1} {2} {3} {12} {13} {23} {123}  
-> 1초기준 **`n이 26이하`{:.block-blue}**일 때만 사용

## 추천 문제
**1부터 n까지로 수열을 만드는 문제**   
> [N과 M (1) - 순열](https://www.acmicpc.net/problem/15649)  
[N과 M (2) - 조합](https://www.acmicpc.net/problem/15650)  
[N과 M (3) - 중복순열](https://www.acmicpc.net/problem/15651)  
[N과 M (4) - 중복조합](https://www.acmicpc.net/problem/15652)  

<br>

**입력받은 데이터로 수열을 만드는 문제**  
>[N과 M (5) - 순열](https://www.acmicpc.net/problem/15653)  
[N과 M (6) - 조합](https://www.acmicpc.net/problem/15655)  
[N과 M (7) - 중복순열](https://www.acmicpc.net/problem/15656)  
[N과 M (8) - 중복조합](https://www.acmicpc.net/problem/15657)  

<br>

**부분집합을 활용해서 풀 수 있는 문제**  
> [부분수열의 합](https://www.acmicpc.net/problem/1182)  
[도영이가 만든 맛있는 음식](https://www.acmicpc.net/problem/2961)