---
layout: post
title: 배열을 이용한 탐색
sitemap: true
hide_last_modified: false
categories:
  - study
  - algorithm
---
# 배열을 이용한 탐색
배열이 무엇인지에 대한 내용은 생략하고,  
실제로 문제풀이에 활용할 방법 몇 개를 소개하려고 한다.

## 4방 탐색
x와 y값을 변화시킬 변화량 배열 dx[], dy[]를 만들어둔다.  
해당 방향으로 탐색하며 작업을 진행한다. 엄청 자주 사용하는 기본이라고 보면 될 것 같다.
```java
int dx[] = {-1, 1, 0, 0};
int dy[] = {0, 0, -1, 1};
for (int i=0; i<4; i++) {
  int nx = x + dx[i];
  int ny = y + dy[i];
  if (nx<0 || ny<0 || n<=nx || n<=ny)
    continue;

  if (map[nx][ny] == 0)
    // do something...
}
```

## 8방 탐색
상하좌우뿐만 아니라 대각선까지 탐색.
```java
int dx[] = {-1, 1, 0, 0, -1, -1, 1, 1};
int dy[] = {0, 0, -1, 1, -1, 1, -1, 1};
for (int i=0; i<8; i++) {
  // do something...
}
```

## 3차원 탐색
3차원으로 위 아래 까지 탐색하는 경우도 동일하다.
```java
int dx[] = {-1, 1, 0, 0, 0, 0};
int dy[] = {0, 0, -1, 1, 0, 0};
int dz[] = {0, 0, 0, 0, -1, 1};
for (int i=0; i<6; i++) {
  int nx = x + dx[i];
  int ny = y + dy[i];
  int nz = z + dz[i];
  if (nx<0 || ny<0 || nz<0 || n<=nx || n<=ny || n<=nz)
    continue;
  // do something...
}
```

## 기타 배열 관련
### 배열 밀기
별거 아닌 코드인데 이런 부분이 생각이 안 날 때가 있다.  
큐나 덱을 활용할 수 있으면 활용하자.
```java
// 하나씩 앞으로 당기기
int temp = arr[0];
for (int i=0; i<arr.length-1; i++)
  arr[i] = arr[i+1];
arr[arr.length-1] = temp;

// 하나씩 뒤로 밀기
int temp = arr[arr.length-1];
for (int i=0; i<arr.length-1; i++)
  arr[i+1] = arr[i];
arr[0] = temp;
```

### 배열 회전
arr[n][m] 배열을 90도로 회전했을 때.  
회전함으로서 행과 열이 바뀌게되고, 방향에 따라 앞이 뒤가 될 수 있다.
```java
int[][] rotate = new int[m][n];
for (int i=0; i<m; i++) {
  for (int j=0; j<n; j++) {
    rotate[i][j] = arr[n-1-j][i];
  }
}
```

### 전치 행렬
대각선 축을 기준으로 행과 열을 바꾼 행렬
```java
for (int i=0; i<n; i++) {
  for (int j=i+1; j<n; j++) {
    swap(arr[i][j], arr[j][i]);
  }
}
```
