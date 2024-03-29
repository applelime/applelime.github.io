---
layout: post
title: Next Permutation 알고리즘
sitemap: true
hide_last_modified: false
categories:
  - study
  - algorithm
---
# Next Permutation 알고리즘
사전 순으로 다음 순열을 찾을 수 있게 해주는 알고리즘이다.

## 알고리즘
우선 배열을 `오름차순으로 정렬`하고 시작한다.  
1. 뒤쪽부터 앞으로 탐색하여 꼭대기(i)를 찾는다. 꼭대기 앞이 교환위치(i-1)가 된다.
2. 뒤쪽부터 앞으로 탐색하여 교환위치(i-1)와 교환할 큰 값 위치(j)를 찾는다.
3. 두 위치 값 (i-1, j)를 교환한다.
4. 꼭대기 위치(i)부터 맨 뒤까지 다시 오름차순으로 정렬한다.

```java
private static boolean np() {
  // 1. 교환위치 찾기
  int i = n-1;
  while(i>0 && data[i-1]>=data[i]) --i;

  if(i==0) return false;
  
  // 2. 교환할 값 찾기
  int j = n-1;
  while(input[i-1]>=input[j]) --j;
  
  // 3. 교환
  swap(i-1, j);
  
  // 4. 교환위치 뒤(꼭대기)부터 맨 뒤까지 만들수 있는 가장 작은 순열 생성(오름차순 정렬)
  int k = n-1;
  while(i<k) {
    swap(i++, k--); // i와 k를 swap하고 i는 중가, k는 감소
  }
  return true;
}
```

### 장점
기존의 재귀방식과는 다르게 중복체크를 하지않고   
정확하게 순열의 횟수만큼 반복하므로 `속도가 빠르다.` 시간복잡도는 O(n)

### 단점
원래의 배열을 재배치하며 순열을 만들기 때문에 `nPn 순열에서만 사용 가능`하다.  
r개를 뽑는 경우에는 사용할 수 없다.

## Next Permutation으로 조합 생성
nCr 조합을 생성하기 위해서는 `n개의 크기를 가진 배열을 생성` 후 0으로 초기화한다.  
그 후 `r개만큼 뒤에서 1로 초기화`한다.
> 5C3 : 00111  
5C2 : 00011

Next Permutation 알고리즘을 그대로 적용한다.  
> 예시 - {1,2,3,4} 배열에서 4C2 구하기  
0011 -> 3,4  
0101 -> 2,4  
0110 -> 2,3  
1001 -> 1,4  
1010 -> 1,3  
1100 -> 1,2

비트마스킹을 이용했을 때처럼 `해당자리가 1이면 해당 번째 값을 뽑은` 경우이다.