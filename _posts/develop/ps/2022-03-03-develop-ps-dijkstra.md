---
layout: post
title: 다익스트라 알고리즘
sitemap: false
hide_last_modified: false
categories:
  - develop
  - ps
---
# 다익스트라 알고리즘

다익스트라 알고리즘은 최단거리 알고리즘 중 하나로 그래프에서 `음의 가중치가 없을 때`  
`시작 정점에서 다른 모든 정점까지의 최단거리`를 구하는 알고리즘이다.

## 알고리즘
1. `시작 정점을 방문`하고, `다른 정점들간의 최소 거리를 갱신`한다.
2. 이 중 `거리가 가장 가까운 정점을 방문`하고 `다른 정점들간 최소 거리를 갱신`한다.
3. 이 과정을 반복하며 도착 정점까지, 혹은 모든 정점과의 최소거리를 구한다.

### 인접 행렬을 사용하여 구현
```java
int[] distance = new int[V];        // 출발지에서 최소비용
boolean[] visited = new boolean[V]; // 정점 방문 여부

Arrays.fill(distance, Integer.MAX_VALUE); // 일단 거리를 max값으로 둔다.
distance[start] = 0;	                    // 시작점을 0으로 두고 시작한다.

for (int i = 0; i < V; i++) {
  // 방문하지 않은 곳 중, 가장 가까운 정점을 찾아 방문한다.
  int min = Integer.MAX_VALUE, current = 0;
  for (int j = 0; j < V; j++) {
    if(!visited[j] && min>distance[j]) {
      min = distance[j];
      current = j;
    }
  }
  visited[current] = true;
  
  // 도착 정점에 도달하면 종료
  if (current==end) break;
  
  // 다른 정점들간 최소 거리를 갱신한다.
  for (int j = 0; j < V; j++) {
    // 방문하지 않은 곳 중, 현재위치에 인접해있고
    // 기존보다 현재정점을 통하는게 더 가까우면 갱신한다.
    if(!visited[j] && adjMatrix[current][j] != 0 
    && distance[j] > distance[current] + adjMatrix[current][j]) {
      distance[j] = distance[current] + adjMatrix[current][j];
    }
  }
}
System.out.println(distance[end]);
```

### 인접 리스트를 사용하여 구현
```java
static class Node {
  int vertex;
  int weight;
  Node link;

  public Node(int vertex, int weight, Node link) {
    this.vertex = vertex;
    this.weight = weight;
    this.link = link;
  }
}

Node[] adjList = new Node[V+1]; // 정점수 크기로 생성
for (int i = 0; i < E; i++) {
  st = new StringTokenizer(br.readLine());
  int from = Integer.parseInt(st.nextToken());
  int to = Integer.parseInt(st.nextToken());
  int weight = Integer.parseInt(st.nextToken());
  adjList[from] = new Node(to, weight, adjList[from]);
}

int[] distance = new int[V+1];
Arrays.fill(distance, Integer.MAX_VALUE);

boolean[] isVisited = new boolean[V+1];
distance[start] = 0;

for (int i = 1; i <= V; i++) {
  int min = Integer.MAX_VALUE, current = 0;
  for (int j = 1; j <= V; j++) {
    if (!isVisited[j] && min > distance[j]) {
      min = distance[j];
      current = j;
    }
  }
  isVisited[current] = true;

  // 인접 리스트이므로 인접 여부는 확인할 필요가 없다.
  for (Node temp = adjList[current]; temp != null; temp = temp.link) {
    if(!isVisited[temp.vertex]
      && distance[temp.vertex] > distance[current] + temp.weight) {
      distance[temp.vertex] = distance[current] + temp.weight;
    }
  }
}
```

## 우선순위 큐를 활용한 다익스트라
코드를 보면 크게 아래처럼 2단계로 이루어진다. 
1. `가장 가까운 정점을 방문`하고
2. 그 정점에서 최소 위치를 갱신한다.

이 중 가장 가까운 정점을 방문하는 것은 `힙을 사용한다면 더 쉽게 구현`할 수 있지 않을까?  

```java
static class Vertex implements Comparable<Vertex> {
  int no, minDistance;

  public Vertex(int no, int minDistance) {
    this.no = no;
    this.minDistance = minDistance;
  }

  @Override
  public int compareTo(Vertex o) {
    return this.minDistance - o.minDistance;
  }
}

int[] distance = new int[V];
boolean[] visited = new boolean[V];
Arrays.fill(distance, Integer.MAX_VALUE);
distance[start] = 0;	// 시작점 0으로

PriorityQueue<Vertex> pQueue = new PriorityQueue<>();
pQueue.offer(new Vertex(start, distance[start]));

while(!pQueue.isEmpty()) {
  Vertex current = pQueue.poll();   // 우선순위 큐이므로 뽑은 값이 가장 가까운 정점
  
  if(visited[current.no]) continue; // 중복이 있을 수 있으므로 중복체크 필요!
  visited[current.no] = true;
  
  // 최소 위치 갱신 및 우선순위 큐에 삽입
  for (int j = 0; j < V; j++) {
    if(!visited[j] && adjMatrix[current.no][j] != 0 
    && distance[j] > distance[current.no] + adjMatrix[current.no][j]) {
      distance[j] = distance[current.no] + adjMatrix[current.no][j];
      pQueue.offer(new Vertex(j, distance[j]));
    }
  }
}
```
사실 속도에서의 차이도 있다.  
`우선순위 큐`를 사용하면 가장 가까운 정점을 찾는 속도가 O(logV)가 되므로  
인접리스트를 사용했을 때의 `시간복잡도는 O(ElogV)`가 된다.