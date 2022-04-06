---
layout: post
title: 최장 증가 부분 수열 (LIS)
sitemap: false
hide_last_modified: false
categories:
  - develop
  - ps
---
# 최장 증가 부분 수열 (LIS)

* toc
{:toc .large-only}

최장 증가 부분 수열(Longest Increasing Subsequence)은 `주어진 수열에서 오름차순으로 정렬된 가장 긴 부분수열`을 말한다. 

## DP 이용하기
일반적인 DP 코드처럼 i번째 값을 구할 때 i-1번째 값을 사용하면 안 된다.  
i-1번째 값이 LIS에 포함되어 있는 값이 아닐 수도 있기 때문.  
-> `i번째 인덱스에서 끝나는 LIS의 길이`로 설계해야 한다. 시간복잡도는 O(n²)

- [3, 2, 6, 4, 5, 1] 수열의 경우 lis 배열은 아래와 같이 갱신된다.  
`전체 배열 갱신 후 최대값이 LIS의 길이`{:.block-blue}가 된다.

| lis[0] | lis[1] | lis[2] | lis[3] | lis[4] | lis[5] |
| 1 (3) | 1 (2) | 2 (3,6) | 2 (3,4) | 3 (3,4,5) | 1 (1) |

```java
int[] lis = new int[n];
int max = 0;

for (int i = 0; i < n; i++) {
  lis[i] = 1; // lis 초기값은 1로 둔다.
  for (int j = 0; j < i; i++) { // 0~i-1까지 비교
    // 증가 수열이면서, 이전 길이+1이 더 크면 갱신
    if (arr[j] < arr[i] && lis[i] < lis[j]+1)
      lis[i] = lis[j]+1;
  }
  max = Math.max(max, lis[i]);
}

System.out.println(max);
```

## 이분 탐색 이용하기
lis 배열을 DP처럼 i번째 인덱스의 길이가 아니라, `길이가 i인 증가 수열에 대해 가장 작은 값`을 넣는다.  
`증가 수열이므로 lis 배열은 오름차순으로 정렬`{:.block-blue}될 수 밖에 없고, 이를 이용해 현재 값이 들어갈 수 있는 위치를 찾는다.  
-> lis 배열의 길이가 곧 LIS의 길이가 되는 것. `시간 복잡도는 O(NlogN)`

- [3, 2, 6, 4, 5, 1] 수열의 경우 lis 배열은 아래와 같이 갱신된다.

| lis[0] |
| 3 |

| lis[0] |
| 2 |

| lis[0] | lis[1] |
| 2 | 6 |

| lis[0] | lis[1] |
| 2 | 4 |

| lis[0] | lis[1] | lis[2] |
| 2 | 4 | 5 |

| lis[0] | lis[1] | lis[2] |
| 1 | 4 | 5 |

-> LIS의 길이 = lis 배열의 길이 = 3

```java
int[] lis = new int[n];
int size = 0;
lis[size++] = data[0]; // 초기값 = 1번째값

for (int i = 1; i < n; i++) {
  int start = 0;
  int end = size;
  while (start<end) {
    int mid = (start+end)/2;
    if (lis[mid] < arr[i])
      start = mid+1;
    else
      end = mid;
  }

  lis[end] = arr[i];
  if (size == end)
    size++;
}
```

## 최장 감소 부분 수열
첫 번째로는 정말 문제 그대로 감소 수열 중에서 최장 감소 부분 수열을 찾는 방법이다.  
위의 DP코드를 보자면 증가수열인지 확인하는 `arr[j] < arr[i]` 부분의 부호만 뒤집으면 끝이다.  
다만 이 경우 중간까지의 길이를 구하고자 하면 답이 아닐 수 있다.

```java
int[] lis = new int[n];
int max = 0;

for (int i = 0; i < n; i++) {
  lis[i] = 1; // lis 초기값은 1로 둔다.
  for (int j = 0; j < i; i++) { // 0~i-1까지 비교
    // 감소 수열이면서, 이전 길이+1이 더 크면 갱신
    if (arr[j] > arr[i] && lis[i] < lis[j]+1)
      lis[i] = lis[j]+1;
  }
  max = Math.max(max, lis[i]);
}

System.out.println(max);
```

두 번째로는 `원본 데이터를 뒤집어서 (혹은 뒤에서부터) LIS를 구하는 것`이다.  
LIS 로직은 그대로 두고 아래 코드처럼 뒤에서부터만 도는 방법이 있다.  

하지만 인덱스를 역으로 이용할 경우 실수할 가능성이 높아 메모리의 여유가 있다면 `원본 데이터를 뒤집어서 기존 LIS로직을 그대로 사용`하는 게 안전하다.

```java
int[] lis = new int[n];
int max = 0;

int[] lis = new int[n];
int max = 0;
for (int i = n-1; i >= 0; i--) {
  lis[i] = 1;
  for (int j = n-1; j > i; j--) {
    if (data[j] < data[i] && lis[j]+1 > lis[i])
      lis[i] = lis[j]+1;
  }
  max = Math.max(max, lis[i]);
}
System.out.println(max);
```

## LIS 출력하기
- DP를 이용했을 때.  
lis배열에는 길이가 저장되어 있고 인덱스가 매칭되므로,  
`스택을 사용하여 최대 길이부터 내려오면서 길이마다 값을 저장`하고 이를 이용해 출력한다.

```java
Stack<Integer> s = new Stack<>();
for (int i = n-1; i >= 0; i--) {
  if (size == lis[i]) { // 경로의 lis 길이
    s.push(data[i]); // 경로의 수열 값
    size--;
  }
}

StringBuilder sb = new StringBuilder();
while (!s.isEmpty()) {
  sb.append(s.pop() + " ");
}
System.out.println(sb);
```

- 이분 탐색을 이용했을 때.  
`길이, 값 쌍으로 path를 저장`한 후 DP와 마찬가지 방법으로 출력한다.

```java
int[] lis = new int[n];
ArrayList<int[]> path = new ArrayList<>();

int size = 0;
lis[size++] = data[0];
path.add(new int[] {1, data[0]});

for (int i = 1; i < n; i++) {    		
  int start = 0;
  int end = size;
  while(start<end) {
    int mid = (start+end)/2;
    if (lis[mid] < data[i])
      start = mid+1;
    else
      end = mid;
  }
  lis[end] = data[i];
  path.add(new int[] {end+1, data[i]}); // 길이, 값 쌍으로 경로 저장
  
  if (size <= end)
    size++;
}
System.out.println(size);

// LIS 출력
Stack<Integer> s = new Stack<>();
for (int i = n-1; i >= 0; i--) {
  if (size == path.get(i)[0]) { // 경로의 lis 길이
    s.push(path.get(i)[1]); // 경로의 수열 값
    size--;
  }
}

StringBuilder sb = new StringBuilder();
while (!s.isEmpty()) {
  sb.append(s.pop() + " ");
}
System.out.println(sb);

/*
아래 처럼 출력하면 안 된다.
for (int i = 0; i < size; i++) {
  System.out.print(lis[i] + " ");
}

7
1 6 2 4 5 3 7
이 경우에 뒤에서 lis[2]가 3으로 갱신되버리므로
답은 1 2 4 5 7이지만 1 2 3 5 7이 출력된다.
*/
```

## 관련 문제 

> [가장 긴 증가하는 부분 수열](https://www.acmicpc.net/problem/11053)  
[가장 긴 감소하는 부분 수열](https://www.acmicpc.net/problem/11722)  
[가장 긴 증가하는 부분 수열 2](https://www.acmicpc.net/problem/12015)  
[가장 긴 증가하는 부분 수열 4](https://www.acmicpc.net/problem/14002)  
[반도체 설계](https://www.acmicpc.net/problem/2352)
