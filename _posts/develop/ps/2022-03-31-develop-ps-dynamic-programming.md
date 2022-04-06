---
layout: post
title: 다이나믹 프로그래밍
sitemap: false
hide_last_modified: false
categories:
  - develop
  - ps
---
# 다이나믹 프로그래밍

* toc
{:toc .large-only}

다이나믹 프로그래밍(Dynamic Programming)은 그리디 알고리즘처럼 `최적화 문제를 해결하는 알고리즘`{:.block-blue}으로 동적 계획법, DP라고 부르기도 한다.  
다이나믹 프로그래밍은 `복잡한 문제를 간단한 여러 개의 문제로 나누어, 먼저 작은 문제들의 해를 구한 후 이들을 이용하여 큰 크기의 문제들을 해결하는 방법`이다.

## 피보나치 수열
가장 기본적이고 대표적인 DP의 예이다.  
예를 들어 f(6)을 구하기 위해서는 f(5)와 f(4)의 값이 필요하고,  
마찬가지로 f(5)를 구하기 위해서는 f(4)와 f(3)의 값이 필요하다 ... (반복)  

이렇게 큰 문제의 답을 구하기 위해 작은 문제들의 해를 구해 큰 문제를 해결하는 방법이다.
```java
int fibo(int n) {
  if (n<2)
    return n;
  return fibo(n-1) + fibo(n-2);
}
```

## 메모이제이션 (Memoization)
DP를 적용할 때 주로 사용하는 방법 중 하나이다.  
`이전에 계산한 값을 메모리에 저장`하여 매 번 다시 계산하지 않도록 하는 방법이다.  
메모이제이션을 적용한 피보나치 수열은 O(n)으로 시간 복잡도를 줄일 수 있다.
```java
int fibo(int n) {
  if (n<2)
    return n;
  if (memo[n] != 0)
    return memo[n];
  return memo[n] = fibo(n-1) + fibo(n-2);
}
```

## DP의 적용 요건
DP를 적용하기 위해서는 아래 2가지 조건을 만족해야 한다.

### 중복 부분 문제 (Overlapping Subproblems)
DP는 작은 문제들을 먼저 해결하고, 작은 문제들의 최적해를 이용하여 순환적으로 큰 문제를 해결한다. 즉 `부분 문제가 중복해서 나타나는 경우`에만 사용할 수 있다.  
이러한 순환적인 관계를 명시적으로 표현하기 위해 일반적으로 `점화식`{:.block-blue}을 많이 사용한다.

### 최적 부분 구조 (Optimal Substructure)
어떤 문제의 해가 최적일 때, 그 해를 구성하는 작은 부분 문제들의 해 역시 최적이어야 한다는 것이다. `큰 문제의 해가 작은 문제들의 최적해로 구성`되지 않으면 DP를 사용할 수 없다.

## 탑다운(Top-Down), 바텀업(Bottom-Up)
### 탑다운 (Top-Down)
말 그대로 `위에서 부터 시작하여 아래로 내려가는 방식`으로 `하향식`{:.block-blue}이라고도 한다.  
위의 피보나치 수열 코드는 n에서 시작하여 n-1, n-2를 찾아나가며 0,1까지 내려가므로 탑다운 방식의 코드이다.  
보통 `재귀함수를 사용`하여 구현한다.

### 바텀업 (Bottom-Up)
마찬가지로 `아래에서 부터 시작하여 위로 올라가는 방식`으로 `상향식`{:.block-blue}이라고도 한다.  
재귀 호출을 하지 않기 때문에 `메모리와 실행속도의 이점`이 있다.  
보통 DP는 바텀업 방식으로 구현한다. 피보나치 수열을 바텀업으로 구현하면 아래와 같다.
```java
int[] fibo = new int[n+1];
fibo[0] = 0;
fibo[1] = 1;
for (int i = 2; i <= n; i++) {
  fibo[i] = fibo[i-1] + fibo[i-2];
}
System.out.println(fibo[n]);
```

## 거스름돈 문제
> 거스름돈으로 사용가능한 동전 종류가 1원, 4원, 6원이 있다.  
8원을 거슬러 줘야할 때 필요한 동전의 최소 개수는?

[그리디 알고리즘](/develop/ps/2022-02-26-develop-ps-greedy/) 글에서도 다뤘던 문제인데 문제가 조금 다르다.  

위의 문제에서는 10원, 50원, 100원, 500원의 경우로 항상 큰 동전은 작은 동전의 배수로 이루어져 있었기에 큰 단위의 동전부터 선택하면 되었지만 지금 같은 경우는 다르다.  

DP로 푼다면 어떻게 풀어야할까?  
바텀업으로 아래에서 부터 접근해보자. 

> 1원에 대한 최적해 -> 2원에 대한 최적해 -> 3원에 대한 최적해 -> ... -> 8원에 대한 최적해  

코드로 짠다면 아래와 같을 것이다.
```java
int n = 8;
int[] dp = new int[n+1];
int max = 999999;
Arrays.fill(dp, max);

dp[0] = 0;
for (int i = 1; i <= n; i++) {
  dp[i] = Math.min(dp[i], dp[i-1]+1);
  if (i >= 4)
    dp[i] = Math.min(dp[i], dp[i-4]+1);
  if (i >= 6)
    dp[i] = Math.min(dp[i], dp[i-6]+1);
}

System.out.println(dp[n]);
```
여기서 max값이 999999인 이유는 Integer.MAX_VALUE로 설정하면 +1에서 오버플로우가 발생하기 때문에  
최소값을 정상적으로 선택하지 못하는 경우가 생겨 오버플로우가 발생하지 않는 임의의 큰 값으로 설정하였다.

## 0-1 Knapsack 문제
> 배낭에 담을 수 있는 무게의 최대값은 w이다.  
n개의 물건과 각 물건의 무게와 가치가 주어질 때, 배낭에 담을 수 있는 물건의 최대 가치는?  
단 물건은 1개씩만 있다.

이 문제도 마찬가지로 분할 가능한 배낭 문제는 무게당 가치가 높은 순으로 그리디 알고리즘을 통해 풀 수 있지만, 분할되지 않는 경우에는 그렇게 풀 수가 없다.  

> 물건 1까지 포함하는 최적해 -> 물건 2까지 포함하는 최적해 -> ... -> 물건 n까지 포함하는 최적해  

```java
int[][] result = new int[n+1][w+1];
for (int i = 1; i <= n; i++) { // 물건의 개수
  for (int weight = 1; weight <= w; weight++) { // 무게
    if (weight[i] <= weight)
      result[i][weight] = Math.max(result[i-1][weight], result[i-1][weight-weight[i]] + profit[i]);
    else
      result[i][weight] = result[i-1][weight];
  }
}
System.out.println(result[n][w]);
```

해당 코드를 보면 공간 복잡도는 n*w인데 항상 이전해까지에서 비교하므로 행을 2개만 사용해서 처리할 수도 있다.  
1. 현재 행 갱신 후 이전행으로 복사하는 방법
2. 값을 복사하지않고, 현재와 이전행을 0,1번 행을 번갈아가며 사용하는 방법

행을 1개만 사용하면 안 될까?  
-> 가능하다. 하지만 앞에서부터 갱신하면 이미 갱신된 값을 이용하여 다시 갱신할 수 있으므로 뒤에서부터 갱신해야 한다.

## 추천 문제 

> [1로 만들기](https://www.acmicpc.net/problem/1463)  
[피보나치 함수](https://www.acmicpc.net/problem/1003)  
[계단 오르기](https://www.acmicpc.net/problem/2579)  
[동전 2](https://www.acmicpc.net/problem/2294)  
[RGB거리](https://www.acmicpc.net/problem/1149)  
