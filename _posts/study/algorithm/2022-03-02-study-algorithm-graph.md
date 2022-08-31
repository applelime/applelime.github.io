---
layout: post
title: 그래프
sitemap: true
hide_last_modified: false
categories:
  - study
  - algorithm
---
# 그래프

알고리즘 문제를 풀다보면 트리보다는 사실 그래프 문제가 훨씬 많은 것 같다.  
그래프는 `정점(아이템)들 사이의 연결 관계를 표현하는 자료구조`로  
트리가 1대다 였다면, 그래프는 다대다의 관계를 가진다.

## 용어
- 정점(Vertex) : 그래프에서 하나의 연결점. 객체. 요소. 아이템을 뜻한다.
- 간선(Edge) : 두 정점을 연결하는 선. 연결 관계를 뜻한다.
- 차수(Degree) : 정점에 연결된 간선의 수를 말한다.

## 유형
- 무향 그래프 : 말그대로 방향없이 좌우로 이동 가능한 그래프이다.
- 유향 그래프 : 방향이 있는 그래프를 뜻한다.
- 가중치 그래프 : 간선에 가중치를 부여한 그래프이다.
- 완전 그래프 : 정점들에 대해 가능한 모든 간선을 가진 그래프이다.

## 표현
그래프의 용어보다는 아무래도 어떻게 표현하고 사용하는 지가 더 중요할 것이다.  
보통 아래 3가지 방법으로 그래프를 많이 표현한다.

### 1. 인접 행렬
가장 많이 사용하는 방법이다. 두 정점을 연결하는 간선의 유무를 `2차원 행렬로 표현`한다.  
행번호와 열번호는 정점에 대응되며, `행번호는 from, 열번호는 to`라고 볼 수 있다.  
두 정점이 `연결되어 있으면 1(혹은 가중치). 그렇지 않으면 0`으로 표현한다.  

장점으로는 사용하기 편하고 어디와 연결되어 있는지 확인하기 좋지만  
`정점이 많고 간선이 적은 그래프 (희소 그래프)에서는 효율성이 떨어진다.`{:.block-blue}

```java
int[][] adjMatrix = new int[n][n]; // 정점수 크기 x 정점수 크기

for (int i = 0; i < C; i++) {
  int from = sc.nextInt();
  int to = sc.nextInt();
  int weight = sc.nextInt();
  
  adjMatrix[from][to] = weight;
}
```

### 2. 인접 리스트
각 정점에 대한 인접 정점들을 순차적으로 표현하는 방법이다.  
`정점마다 인접 정점 리스트를 가지며` 연결 리스트로 구현한다.

단점으로는 진출은 알기 쉽지만, 어디서 들어오는지 진입은 알기가 힘들다.

```java
static class Node {
  int vertex;
  Node link;

  public Node(int vertex, Node link) {
    this.vertex = vertex;
    this.link = link;
  }
}

Node[] adjList = new Node[n]; // 정점수 크기
for (int i = 0; i < C; i++) {
  int from = sc.nextInt();
  int to = sc.nextInt();
  
  // 무향에서는 간선 하나로 양방향 처리
  adjList[from] = new Node(to, adjList[from]);
  adjList[to] = new Node(from, adjList[to]);
}
```

### 3. 간선 리스트
위 2가지가 정점에 대한 정보였다면 `간선 리스트는 간선 자체를 객체로 표현`하여 리스트로 저장한다.  
간선을 표현하는 두 정점 정보 (시작 정점, 끝 정점)를 포함한다.

```java
static class Edge implements Comparable<Edge> {
  int from, to, weight;

  public Edge(int from, int to, int weight) {
    this.from = from;
    this.to = to;
    this.weight = weight;
  }

  @Override
  public int compareTo(Edge o) {
    return this.weight - o.weight;
  }
}

Edge[] edgeList = new Edge[n];
for (int i = 0; i < n; i++) {
  st = new StringTokenizer(br.readLine());
  int from = Integer.parseInt(st.nextToken());
  int to = Integer.parseInt(st.nextToken());
  int weight = Integer.parseInt(st.nextToken());
  edgeList[i] = new Edge(from, to, weight);
}
```

## 그래프의 탐색
**1. BFS (너비 우선 탐색)**  
트리의 BFS와 크게 다르지 않다. `탐색 시작점의 인접 정점들을 모두 방문`한 후,  
방문했던 정점을 시작점으로 하여 `다시 인접한 정점들을 차례로 방문`한다.

-> 인접한 노드들 먼저 탐색 후, 다시 탐색해야하므로 **`큐`{:.block-blue}**를 활용한다.

```java
public static void bfs(int[][] adjMatrix, int start) {
  Queue<Integer> queue = new LinkedList<>();
  boolean[] visited = new boolean[n];
  
  queue.offer(start);
  visited[start] = true;
  
  int time = 0;
  while(!queue.isEmpty()) {
    int current = queue.poll();   // 현재 정점
    System.out.println(current);
    
    // 1. 인접행렬이면
    for (int j = 0; j < n; j++) {
      // 아직 방문하지 않았고, 인접한 경우에만 탐색
      if(!visited[j] && adjMatrix[current][j]!=0) {
        queue.offer(j);
        visited[j] = true;
      }				
    }

    // 2. 인접리스트면
    for (Node temp = adjList[current]; temp != null; temp = temp.link) {
      if(!visited[temp.vertex]) {
        queue.offer(temp.vertex);
        visited[temp.vertex] = true;
      }
    }
  }
}
```

**2. DFS (깊이 우선 탐색)**  
마찬가지로 `시작 정점에서 한 방향으로 갈 수 있는 끝까지 탐색`한 후,  
더 이상 갈 곳이 없어지면 `마지막 갈림길로 돌아와 간선이 있는 다른 정점으로 탐색`한다.

-> 마지막 갈림길로 돌아와야 하므로 **`재귀적`{:.block-blue}**으로 구현하거나 스택을 활용한다.

```java
public static void dfs(int[][] adjMatrix, boolean[] visited, int current) {
  visited[current] = true;
  System.out.println(current);
  
  // 1. 인접행렬이면
  for (int j = 0; j < N; j++) {
    if(!visited[j] && adjMatrix[current][j]!=0) {
      dfs(adjMatrix, visited, j);
    }								
  }

  // 2. 인접리스트면
  for (Node temp=adjList[current]; temp != null; temp = temp.link) {
    if(!visited[temp.vertex]) {
      dfs(adjList, visited, temp.vertex);
    }						
  }
}
```

### BFS시에 거리, 시간, 레벨을 확인하는 방법
보통 최단 거리, 최소 시간과 관련된 문제를 BFS로 풀게 되는데  
이 때는 아래처럼 `큐의 사이즈만큼만 반복`하면 현재 레벨까지만 반복할 수 있게 된다.  

여기서 주의할 점은 `큐의 사이즈를 캐싱하지 않으면 큐에 값을 집어넣으면서 반복 횟수가 달라진다`는 점이다.  
그렇기에 꼭 큐의 사이즈를 미리 받아놓고 그만큼만 반복을 해야한다.

다른 방법으로는 클래스를 만들어 큐에 넣을 때 거리를 1씩 증가시켜줄 수도 있다.
```java
int dist = 0;
while(!q.isEmpty()) {
  int size = q.size();   // 큐의 사이즈를 받아온다.
  dist++;                // 거리(시간) 증가

  for (int i = 0; i < size; i++) {   // 사이즈만큼만 반복
    Point p = q.poll();
    // do something..
  }
}
```