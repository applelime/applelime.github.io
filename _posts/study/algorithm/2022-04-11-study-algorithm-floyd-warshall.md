---
layout: post
title: 플로이드-와샬 알고리즘
sitemap: true
hide_last_modified: false
categories:
  - study
  - algorithm
---
# 플로이드-와샬 알고리즘

플로이드-와샬 알고리즘은 최단거리 알고리즘 중 하나로  
`모든 정점에서 다른 모든 정점까지의 최단거리`를 구하는 알고리즘이다.

## 알고리즘
1. `최초 인접행렬을 구성`한다. 이 때 `해당 노드에서 특정 노드로 가는 길이 없다면 INF` 값을 넣어준다.
2. `1번 노드를 경유지`로 설정하여 `비용을 갱신`한다.
3. 2번 노드를 경유지로 설정하여 비용을 갱신한다.
4. `반복하여 n번 노드까지` 경유지로 설정하여 비용을 갱신한다.

```java
final int INF = 9999999;

adjMatrix = new int[N][N];
for(int i=0; i<N; ++i) {
  for(int j=0; j<N; ++j) {
    adjMatrix[i][j] = sc.nextInt();
    if(i!=j && adjMatrix[i][j]==0) { // 인접해있지 않다면 INF로 채우기
      adjMatrix[i][j]=INF;
    }
  }
}

// 경출도
for(int k=0; k<N; ++k) { // 경유지
  for(int i=0; i<N; ++i) { // 출발지
    if(i==k) continue;
    for(int j=0; j<N; ++j) { // 도착지
      if(j==k || i==j) continue;
      // 경유해서 가는 것이 더 가까우면 갱신
      if(adjMatrix[i][j] > adjMatrix[i][k]+adjMatrix[k][j]) {
        adjMatrix[i][j] = adjMatrix[i][k]+adjMatrix[k][j];
      }
    }
  }
}
```
코드는 DP를 이용하여 경유지를 지나오는 것이 더 가까우면 갱신하는 방법으로 굉장히 단순하다.  
유의할 점은 `경출도 순서`로 반복해야 한다는 것. `시간 복잡도는 O(n³)`{:.block-blue}

## 다익스트라 알고리즘과의 차이
`다익스트라`
- `한 시작 정점`{:.block-blue}에서 다른 모든 정점 까지의 최단거리
- `가중치가 양수`{:.block-blue}인 경우에만 사용가능하다.

`플로이드-와샬`
- `모든 정점`{:.block-blue}에서 다른 모든 정점 까지의 최단거리 (모든 쌍)
- `가중치가 음수`{:.block-blue}인 경우에도 사용가능하다.


## 관련 문제
> [경로 찾기](https://www.acmicpc.net/problem/11403)  
[플로이드](https://www.acmicpc.net/problem/11404)  
[운동](https://www.acmicpc.net/problem/1956)  
[호석이 두 마리 치킨](https://www.acmicpc.net/problem/21278)