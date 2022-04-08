---
layout: post
title: 투 포인터, 누적 합, 슬라이딩 윈도우
sitemap: false
hide_last_modified: false
categories:
  - develop
  - ps
---
# 투 포인터, 누적 합, 슬라이딩 윈도우

`연속된 데이터 구간을 처리`할 때 주로 사용하는 알고리즘으로 투 포인터, 누적 합, 슬라이딩 윈도우 알고리즘이 있다.

## 투 포인터 (Two Pointer)
투 포인터 알고리즘은 이름 그대로 `2개의 포인터`를 사용해 `데이터의 시작과 끝을 가리키며` 데이터를 처리하는 알고리즘이다.  

보통 수열에서 `합이 N인 연속 부분 수열`{:.block-blue}을 구하는 문제에서 자주 사용된다.
> [1, 2, 3, 2, 5] 수열에서 합이 5가 되는 연속 수열의 개수는?  

### 기본 동작 원리
1. 시작점(start)과 끝점(end)을 1번째 원소(인덱스 0)를 가리키도록 한다.
2. 현재 부분 합이 M과 같으면 카운트한다.
3. 현재 부분 합이 M보다 같거나 작으면 end를 1 증가시킨다.
4. 현재 부분 합이 M보다 크면 start를 1 증가시킨다.
5. 위 과정을 반복하여 모든 경우를 확인한다.

start와 end가 각각 N번 움직이므로 최대 2N번. 즉 `시간복잡도는 O(N)`이다.

```java
int end = 0;
int sum = 0;
int count = 0;

// start를 차례대로 증가시키며 반복
for (int start = 0; start < n; start++) {

  // end를 가능한 만큼 이동
  while (sum < m && end < n) {
    sum += data[end];
    end++;
  }
  
  // 부분합이 m일 때 카운트 증가
  if (sum == m)
    count++;
  
  sum -= data[start];
}
System.out.println(count);
```

## 누적 합 (Prefix Sum)
누적 합 알고리즘도 이름 그대로 `값을 누적하여 저장`하여 그 값을 이용하는 알고리즘이다.  
보통 `구간 합을 구할 때 사용`{:.block-blue}하여 구간 합(Interval Sum) 이라고도 부른다.  

예를 들어 [10, 20, 30, 40, 50] 배열이 있다고 할 때 누적 합은 아래처럼 저장된다.  

| P[0] | P[1] | P[2] | P[3] | P[4] |
| 10 | 30 | 60 | 100 | 150 |

여기서 `P[R] - P[L-1]`이 구간 합이 되는 것이다.  
R개 까지의 합에서 L-1개까지의 합을 빼버리면 L부터 R까지의 구간 합을 얻을 수 있다.  
최초 1번만 누적합을 저장하면 되므로 `시간 복잡도는 O(N)`이다.

```java
// 누적 합 저장
int[] prefixSum = new int[n];
int sum = 0;
for (int i = 0; i < n; i++) {
  sum += data[i];
  prefixSum[i] = sum;
}

// 구간 합 계산
int left = 3;
int right = 4;
System.out.println(prefixSum[right] - prefixSum[left-1]);
```

## 슬라이딩 윈도우 (Sliding Window)
슬라이딩 윈도우란 `고정 사이즈의 창문(Window)이 이동`하면서 `창문 안에서의 데이터를 이용해 정보를 얻어내는` 알고리즘이다.  

슬라이딩 윈도우는 투 포인터와 비슷하지만 투 포인터가 부분 배열의 길이가 가변적인 반면에 슬라이딩 윈도우는 `부분 배열 길이가 고정적일 때`{:.block-blue} 사용한다.  

> [1, 2, 3, 2, 5] 수열에서 연속되는 3개의 합이 가장 큰 값은?

윈도우가 1칸씩 이동하면서 새로 들어오는 값과 나가는 값을 제외하고는 내부의 값이 그대로이므로 윈도우를 옮길 때마다 합을 계산할 필요없이, `들어오고 나가는 값에 대해서만 처리`를 하면 된다.  
마찬가지로 `시간복잡도는 O(N)`이 된다.

```java
int m = 3;

// 초기값으로 0~m까지의 합을 구한다.
int sum = 0;
for (int i = 0; i < m; i++) {
  sum += data[i];
}
int max = sum;

// 윈도우를 1칸씩 이동시킨다.
for (int i = m; i < n; i++) {
  // i번째 값은 새로 들어오는 값이므로 더하고
  // i-m번째 값은 빠져나가는 값이므로 뺀다.
  sum += data[i];
  sum -= data[i-m];
  max = Math.max(max, sum);
}
System.out.println(sum);
```

## 관련 문제
**투 포인터**   
> [수들의 합 2](https://www.acmicpc.net/problem/2003)  
[수 고르기](https://www.acmicpc.net/problem/2230)  
[부분합](https://www.acmicpc.net/problem/1806)  
[두 용액](https://www.acmicpc.net/problem/2470)  

<br>

**누적 합**  
>[구간 합 구하기 4](https://www.acmicpc.net/problem/11659)  
[구간 합 구하기 5](https://www.acmicpc.net/problem/11660)  

<br>

**슬라이딩 윈도우**  
> [게으른 백곰](https://www.acmicpc.net/problem/10025)  
[수열](https://www.acmicpc.net/problem/2559)  
[회전 초밥](https://www.acmicpc.net/problem/15961)  
[좋은 친구](https://www.acmicpc.net/problem/3078)  
[최솟값 찾기](https://www.acmicpc.net/problem/11003)  