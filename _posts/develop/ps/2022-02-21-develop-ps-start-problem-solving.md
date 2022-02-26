---
layout: post
title: 알고리즘 문제풀이 시작하기
sitemap: false
hide_last_modified: false
categories:
  - develop
  - ps
---
# 알고리즘 문제풀이 시작하기

* toc
{:toc .large-only}

알고리즘 문제풀이 전 알면 도움이 될 내용을 몇 가지 소개하려고 한다.  

## 입력/출력 처리
기본적으로 Java를 기준으로 설명하지만, 아래 속도 비교 자료를 보고 다른 언어에서도 참고하면 된다.

### 입력
- **Scanner**  
스캐너를 사용하면 다양한 타입으로 `형변환`하여 바로 리턴받을 수 있으므로 `편리`하게 입력받을 수 있다.  
다만 단점으로는 속도가 느리다.

```java
Scanner sc = new Scanner(System.in);
int n = sc.nextInt();
double d = sc.nextDouble();
String s = sc.next();
```

- **BufferedReader**  
readLine 메소드를 제공하여 `줄 단위로 문자열을 읽어` 들일 수 있다.  
문자열을 잘라주는 `StringTokenizer 클래스를 주로 같이 사용`한다.

```java
BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
int a = Integer.parseInt(br.readLine());

StringTokenizer st = new StringTokenizer(br.readLine());
int b = Integer.parseInt(st.nextToken());
int c = Integer.parseInt(st.nextToken());
```

### 출력
- **StringBuilder**  
builder에 `스트링을 계속 추가`한 후 한번에 출력할 수 있다. 

```java
StringBuilder sb = new StringBuilder();
sb.append("hi").append("\n");
System.out.println(sb);
```

### 속도 비교
아래는 백준 사이트에서 제공하는 입력/출력 속도 비교 자료이다.  
> [입력 속도 비교](https://www.acmicpc.net/blog/view/56)  
[출력 속도 비교](https://www.acmicpc.net/blog/view/57)

<br>
결과만 요약하자면 아래와 같다.

**입력 속도**

| 언어 | 입력 방법 | 평균 (초) |
| ---- | -------- | --------- |
| Java | BufferedReader, Integer.parseInt | 0.6585 |
| Java | Scanner | 4.8448 |

**출력 속도**

| 언어 | 출력 방법 | 평균 (초) |
| ---- | -------- | --------- |
| Java | BufferedWriter, bf.write(i + "\n"); | 0.9581 |
| Java | StringBuilder를 이용, System.out.println(sb); | 1.1881 |
| Java | System.out.println(i); | 30.013 |

### 그래서 무엇을 써야 하는가?
결론은 **`문제에 따라 다르다.`{:.block-blue}**  
입력/출력이 `많다` -> `BufferedReader`와 `StringBuilder/BufferedWriter` 를 쓰자.  
입력/출력이 `적다` -> `Scanner`와 `System.out.println`을 그냥 써도 상관없다.  
실행 시간적으로 여유가 있는 경우 더 편한 방법을 쓰는 것도 코딩시간 단축을 위한 방법이다.

## 문제 해결

### 문제 해결을 위한 질문들
1. `비슷한 문제`를 풀어본 적이 있던가?
2. `단순한 방법`에서 시작할 수 있을까?
3. 문제를 `단순화`할 수 있을까?
4. `그림`으로 그려볼 수 있을까?
5. `수식으로 표현`할 수 있을까?
6. 문제를 `분해`할 수 있을까?
7. `뒤에서부터 생각`해서 문제를 풀 수 있을까?
8. `특정 형태의 답`만을 고려할 수 있을까?

이런 것들을 생각해보는게 문제를 해결하는데 도움이 될 것이다.

### 알고리즘 성능
문제를 만났을 때 먼저 확인해야할 것이 `시간 제한`과 `메모리 제한`이다.  
보통 문제들은 아래와 같이 제한 요소가 주어질 것이다.

![](/assets/img/blog/develop/ps/problem-solving/example-problem.jpg){:.bordered}  

대체로 문제를 풀다보면 메모리보다는 `시간 제한이 초과`하는 경우가 많다.  
여기서 우리가 알고있는 `빅오(O)표기법을 활용하여 대략적인 시간을 판단`해보자.  

흔히 전해지기로 **`1초동안 1억번의 연산`{:.block-blue}**을 수행할 수 있다고 한다.  
`O(n²)의 알고리즘`으로 푼다면 `n이 10000을 초과할 경우 시간 제한`이 걸릴 것이다.  
그렇다면 위의 문제는 O(n²) 알고리즘으로 풀면 안되고, 일반적인 브루트포스로 풀 수 있는 문제는 아니라는 것이다.  

이런 식으로 **`문제를 풀기전에 해당 알고리즘을 사용할 수 있는가`{:.block-blue}** 먼저 판단해보는 것이 좋다.

실제로는 1초동안 1억번보다 연산을 조금 더 하므로 대략적으로는  
```
O(n) : 1억  
O(nLogN) : 500만  
O(n²) : 1만  
O(n³) : 500  
O(2ⁿ) : 26  
O(n!) : 11  
```
정도라는 것을 기억하고 있으면 좋다.

### 틀리는 문제 해결
문제를 풀다보면 예제 테스트케이스는 맞는데 문제가 틀리는 경우가 있다.  
이런 경우에 항상 확인할 부분은  
1. **`min값, max값 확인하기`**  
이부분이 가장 많은 경우인 것 같다.  
범위 밖을 나가는 예외처리를 안 했다거나, 비교문에 =이 빠져있다거나,  
배열은 n+1개를 선언해서 인덱스는 1번부터 사용하는데 0에서 n-1까지 반복한다거나 등이 있다.
2. **`극한의 상황 테스트하기`**  
데이터가 엄청나게 적은 경우라던가 엄청나게 많은 경우 등을 확인해보면  
시간이 엄청 오래걸리거나, 무한 루프에 빠져드는 경우도 있다.
3. **`반례 찾기`**  
가장 쉬운 방법으로는 백준 질문 게시판에서 반례를 찾는 방법이 있고,  
다른 방법으로는 시간/공간복잡도 생각하지 않고 브루트포스로 구현 후 틀린 반례가 있는지 찾는 것이다.  
이런 반례를 통해 디버깅을 하면서 문제를 해결해보자.
