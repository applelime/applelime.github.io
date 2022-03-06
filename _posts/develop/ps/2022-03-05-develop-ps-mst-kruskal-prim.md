---
layout: post
title: 최소 신장 트리 (MST), Kruskal, Prim 알고리즘
sitemap: false
hide_last_modified: false
categories:
  - develop
  - ps
---
# 최소 신장 트리 (MST), Kruskal, Prim 알고리즘

우선 신장 트리 (Spanning Tree)는 n개의 정점으로 이루어진 그래프에서 `n개의 정점`과 `n-1개의 간선`으로 이루어진 그래프를 뜻한다.  
즉 최소 간선개수로 모든 정점을 연결하는 트리를 말하는데, `무향 가중치 그래프`에서 신장 트리를 구성하는 간선들의 `가중치의 합이 최소인 신장 트리`를 최소 신장 트리 (Minimum Spanning Tree)라고 한다.

## Kruskal 알고리즘
최소 신장 트리를 구성하는 알고리즘 중 하나로, 간선을 하나씩 선택하여 찾는 방식이다.  
1. 최초 모든 간선을 `가중치 오름차순으로 정렬`한다.
2. `가중치가 낮은 간선부터 선택`한다.  
만약 사이클이 존재하면 다음으로 가중치가 낮은 간선을 선택한다.
3. `n-1개의 간선이 선택`될 때까지 반복한다.

크루스칼 알고리즘은 `간선 중심`{:.block-blue}으로 표현하므로 간선리스트를 사용한다.  
이 때 disjoint set을 사용하며 간선을 선택하며 정점들을 합쳐나간다.

```java
static class Edge implements Comparable<Edge>{
  int from, to, weight;

  public Edge(int from, int to, int weight) {
    this.from = from;
    this.to = to;
    this.weight = weight;
  }

  @Override
  public int compareTo(MST1_KruskalTest.Edge o) {
    return this.weight - o.weight;
  }
}

edgeList = new Edge[E];
for (int i = 0; i < E; i++) {
  st = new StringTokenizer(in.readLine());
  int from = Integer.parseInt(st.nextToken());
  int to = Integer.parseInt(st.nextToken());
  int weight = Integer.parseInt(st.nextToken());
  edgeList[i] = new Edge(from, to, weight);
}

Arrays.sort(edgeList); // 간선비용의 오름차순 정렬
makeSet();             // Disjoin Set 자료구조 사용 

int result = 0;
int cnt = 0;
for (Edge edge : edgeList) {
  if (union(edge.from, edge.to)) {    // 비용이 낮은 간선부터 union하며 더해간다.
    result += edge.weight;
    if (++cnt == N-1) break;          // n-1개의 간선을 선택하면 종료
  }
}

System.out.println(result);
```

## Prim 알고리즘
프림 알고리즘은 하나의 정점에서 연결된 간선들 중 하나씩 선택해 나가며 최소 신장 트리를 완성한다.
1. `임의 정점 하나를 선택`해서 시작
2. `가장 비용이 낮은 정점 방문` 후 방문한 정점에서 `인접하는 정점의 최소 비용 갱신`
3. 모든 정점 선택할 때까지 반복

프림 알고리즘은 `정점 중심`{:.block-blue}으로 표현하므로 인접행렬이나 인접리스트를 사용한다.  
다익스트라 알고리즘과 구현상 비슷한 부분이 많다.

```java
int[] minEdge = new int[N];	// 타 정점에서 자신으로의 간선비용 중 최소비용

int result = 0;
minEdge[0] = 0; // 0번 정점부터 시작. 최소값 0으로하여 0번 먼저 선택되게함.

for (int c = 0; c < N; c++) {
  // 신장트리에 연결되지 않은 정점 중 가장 유리한 비용의 정점을 선택
  int min = Integer.MAX_VALUE, minVertex = 0;
  for (int i = 0; i < N; i++) {
    if (!visited[i] && min > minEdge[i]) {
      min = minEdge[i];
      minVertex = i;
    }
  }
  
  // 선택된 정점을 신장트리에 포함시킴
  visited[minVertex] = true;
  result += min;
  
  for (int i = 0; i < N; i++) {
    // 방문하지 않은 곳 중, 현재위치에 인접해있고
    // 현재정점에서 거리가 더 가까우면 갱신한다.
    if(!visited[i] && adjMatrix[minVertex][i] != 0 
       && minEdge[i] > adjMatrix[minVertex][i]) {
      minEdge[i] = adjMatrix[minVertex][i];
    }
  }
}
System.out.println(result);		
```

### Prim과 Dijkstra의 차이
`프림` 알고리즘은 정점들을 방문하면서 `가장 가까운 간선거리를 갱신`하는 것이고,  
`다익스트라`는 시작점에서부터 `거리합계를 갱신`하면서 나가는 것이 다르다.  

## 어떤 알고리즘을 사용해야 할까?
결론 먼저 이야기하면 `간선의 개수에 따라 다르다.`{:.block-blue}
- 간선이 적으면 Kruskal 알고리즘
- 간선이 많으면 Prim 알고리즘  

`Kruskal 알고리즘`은 간선을 중심으로 탐색하여, 시간 복잡도는 `O(ElogE)`이며,  
`Prim 알고리즘`은 정점을 중심으로 탐색하여, 시간 복잡도는 `O(V²)`이다.

하지만 Kruskal 알고리즘만 사용해도 대부분의 문제가 풀리는 편이고,  
간선이 많아 시간제한이 나는 경우에만 Prim 알고리즘을 사용하면 된다.