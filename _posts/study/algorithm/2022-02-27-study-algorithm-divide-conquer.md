---
layout: post
title: 분할 정복, 이진 탐색
sitemap: true
hide_last_modified: false
categories:
  - study
  - algorithm
---
# 분할 정복, 이진 탐색

* toc
{:toc .large-only}

## 분할 정복
분할 정복 (Divide & Conquer)이란 문제를 분할해 나가면서 용이하게 풀 수 있는 문제 단위로 나누어 해결한 후, 결과를 합쳐나가며 문제를 해결해나가는 알고리즘이다.

### 설계
1. **분할 (Divide)**  
해결할 문제를 `여러 개의 작은 부분으로 나눈다`.
2. **정복 (Conquer)**  
나눈 `작은 문제를 각각 해결`한다.
3. **통합 (Combine)**  
해결된 `해답을 합쳐나가며 원래 문제의 답`을 얻는다.

대체로 재귀함수를 이용하여 구현한다.

### 거듭 제곱
예를 들어 C⁸을 계산한다고 하자.  
일반적으로는 C⁸ = C x C x C x C x C x C x C x C 처럼 계산할 것이다.  
이런 기존의 방식은 O(n)의 시간 복잡도를 가진다.  

하지만 `C⁸ = C⁴ x C⁴ = (C⁴)² = ((C²)²)²` 으로도 나타낼 수 있다.  
이를 이용한다면 재귀 함수로 거듭 제곱을 구현할 수 있다.  
이 경우 시간 복잡도는 O(log₂n)을 가진다.

> n이 짝수라면 C^(n/2) x C^(n/2)  
n이 홀수라면 C^((n-1)/2) x C^((n-1)/2) x C

```java
public static long pow(long x, long n) {
  if (n==1) return x;
  long y = pow(x, n/2);
  return (n%2==0)? y*y : y*y*x;
}
```

## 이진 탐색
이진 탐색 (Binary Search)은 분할 정복의 한 방법으로도 볼 수 있다.  
자료의 `가운데에 있는 항목의 값과 비교`하며 다음 검색 위치를 결정하고 검색을 반복 진행하며 해답을 찾는 방법이다.

### 검색 과정
1. 자료의 `중앙에 있는 원소`를 고른다.
2. 중앙 원소 값과 `찾고자 하는 목표 값을 비교`한다.
3. `값이 일치하면 탐색을 끝`낸다.
4. 목표 값이 중앙 원소 값보다 `작다면 자료의 왼쪽 반`에서 새로 검색을 수행하고,  
`크다면 자료의 오른쪽 반`에 대해서 새로 검색을 수행한다.
5. 찾고자 하는 값을 찾을 때까지 위 과정을 `반복`한다.

```java
public static int binarySearch(int key, int low, int high) {
  int mid;
  int cur;
  while(low <= high) {
    mid = (high+low)/2;    // 중앙값 설정
    
    cur = list.get(mid);
    if(key == cur)         // 중앙값과 찾는값 비교
      return 1;
    else if(key < cur)     // 찾는값이 더 작다면 high를 내려 왼쪽 반에서 재탐색
      high = mid-1;
    else                   // 찾는값이 더 크다면 low를 올려 오른쪽 반에서 재탐색
      low = mid+1;
  }
  return 0;
}
```
이진탐색은 대표적인 시간복잡도 O(log₂n) 알고리즘이다.

### 관련 문제 

> [쿼드트리 - 분할 정복](https://www.acmicpc.net/problem/1992)  
[Z - 분할 정복](https://www.acmicpc.net/problem/1074)  
[수 찾기 - 이진 탐색](https://www.acmicpc.net/problem/1920)  