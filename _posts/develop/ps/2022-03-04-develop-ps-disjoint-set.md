---
layout: post
title: Disjoint Set (Union-Find)
sitemap: true
hide_last_modified: false
categories:
  - develop
  - ps
---
# Disjoint Set (Union-Find) 

서로소 집합(Disjoint Set)은 `상호 배타적으로 이루어진 집합을 표현`하기 위해 사용하는 자료구조이다.  
`2개의 집합을 병합하는 Union 연산`과, `어떤 집합에 속했는지 검사하는 Find 연산`을 지원하여 Union-Find 라고도 불린다. 

### 구현
집합에 속한 특정 멤버를 통해 집합을 구분하게 되는데 이를 `대표자`라고 한다.  
보통 트리로 많이 구현하는데, 같은 집합을 하나의 트리로 표현하며 `루트노드`가 대표자이다.

```java
static int[] parents;

public static void makeSet() {
  parents = new int[N];

  // 1. 기본값을 자기 자신으로 설정하거나
  for (int i = 0; i < N; i++) {
    parents[i] = i;
  }

  // 2. 기본값을 -1로 설정하거나. 어쨌든 대표자를 찾기만 하면 된다.
  Arrays.fill(parent, -1);
}

// a의 집합 찾기 : a의 대표자 찾기
public static int find(int a) {
  if (a==parents[a]) return a;
  return parents[a] = find(parents[a]);	// path compression
}

// a,b 두 집합 합치기
public static boolean union(int a, int b) {
  int aRoot = find(a);
  int bRoot = find(b);
  if (aRoot == bRoot) return false; // 대표자가 같으면 같은 집합 (이미 합쳐짐)
  
  parents[bRoot] = aRoot;     // 다르면 한쪽의 대표자를 바꿔준다. (합침)
  return true;
}
```

### 경로 압축 최적화
트리로 구현하는 경우 한쪽으로만 길게 자식이 늘어났을 때,    
최악의 경우 `원소 n개에서 대표자를 찾기위해 n-1번 탐색`을 해야할 수 있다.  

이를 최적화하기 위해 등장한 방법이 경로 압축 최적화 (Path Compression)으로  
`find 연산`시 한번 `탐색한 노드들은 부모를 루트노드`로 바꿔버린다.  
그렇게 되면 이후에는 1번만에 대표자를 탐색할 수 있게 된다.

```java
public static int find(int a) {
  if (a==parents[a]) return a;
  /* return find(parents[a]) */         // 압축 전
  return parents[a] = find(parents[a]);	// path compression
}
```