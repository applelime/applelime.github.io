---
layout: post
title: 코드포스 (Codeforces) 소개 & 첫 대회 후기
sitemap: true
hide_last_modified: false
categories:
  - study
  - algorithm
---
# 코드포스 (Codeforces) 소개 & 첫 대회 후기

이번에 코드포스에서 div4가 열린다고 하여 처음으로 도전해보았다.  
혹시나 코드포스에 관심 있는 분들이 있을까하여 정리해서 적어보려고 한다.

## 코드포스란?
[Codeforces](https://codeforces.com/)는 백준, 프로그래머스처럼 알고리즘 문제를 푸는 사이트인데  
`대회를 통해 경쟁하면서 평가`하는 사이트다.  

기본적으로 문제가 영어로 제공되기 때문에 이 부분이 약간의 진입장벽인 것 같다.

## Contest

![contests](/assets/img/blog/develop/ps/codeforces/contests.jpg){:.bordered}

사이트의 상단 Contests 탭을 누르면 위 사진과 같이 진행 예정, 종료된 대회목록이 나타난다.  
여기서 `진행 예정인 대회에 참가신청하여 대회에 참가`할 수도 있고,  
`종료된 대회를 Virtual로 참가하여 지난 대회문제를 풀어`{:.block-blue}볼 수도 있다.

## Division 
대회에는 Division (줄여서 Div.) 시스템이 있는데 쉽게 말해 대회의 난이도이다.  
`Div.4 < Div.3 < Div.2 < Div.1` 순으로 숫자가 낮을 수록 어렵다.  

사실상 Div.3이 가장 낮은 난이도이며,  
Div.4 공식 대회는 이번이 2번째인데 열리게 된 것을 알게되어 참가해보았다.

## 진행 방식
다른 코딩테스트와 마찬가지로 `제한 시간(2~3시간)이 존재`하고,  
`시간 내에 문제를 풀 수 있을만큼 풀면 된다.`{:.block-blue}  

다만 다른 코테하고의 다른 점이 몇 가지 있는데  
**`제출한 코드가 테스트 케이스에서 실패하면 패널티`**가 있다.  

### Hack 시스템
자신이 문제를 해결한 경우 대시보드에서 문제를 Lock할 수 있는데,  
Lock 이후에는 해당 문제의 추가제출이 불가능하다.  

이후 다른 참가자들이 해당 문제에 제출한 코드를 볼 수 있는데,  
여기서 통과하지 못하는 테케를 발견하여 공격할 수 있고(Hack 시도)  
이를 성공하면 추가점수를 받고, 실패하면 점수를 잃는다.  

Hack에 성공한 테스트케이스는 문제의 채점 테스트케이스에 추가된다.

### 채점
우선 문제마다 `Pretests가 존재하고 이를 통과하면 Passed 판정`을 받는다.  
이후 `대회가 종료되면 전체 테스트케이스 + Hack 성공으로 추가된 테스트케이스로 재채점 (System testing)을 진행`{:.block-blue}하고, 여기서 틀린 경우에는 그 문제를 풀지 못한 것으로 간주한다.

### Editorial
대회와 채점이 모두 끝나면 에디토리얼이 공개된다.  
에디토리얼은 `문제의 풀이와 소스코드를 간단하게 적은 글`로 문제 페이지에 에디토리얼 링크가 뜬다.

[Codeforces Round #784 (Div.4) Editorial](https://codeforces.com/blog/entry/102101)

## Rating
solved.ac처럼 Rating이 존재하는데 `대회의 결과에 따라 올라가기도, 떨어지기도 한다.`  
레이팅 구간별로 색상이 있어 색상으로 많이 부르는 편이다.  

`신규 유저의 레이팅은 1400점`{:.block-blue}으로  
6회의 대회를 마치게 되면 레이팅 500, 350, 250, 150, 100, 50을 추가로 준다.  

| 색상 | 레이팅 |
| -- | -- |
| <span style="color:black">검</span><span style="color:red">빨간색</span> | 3000 ~ |
| <span style="color:red">빨간색</span> | 2400 ~ 2999 |
| <span style="color:orange">주황색</span> | 2100 ~ 2399 |
| <span style="color:purple">보라색</span> | 1900 ~ 2099 |
| <span style="color:blue">파란색</span> | 1600 ~ 1899 |
| <span style="color:darkturquoise">민트색</span> | 1400 ~ 1599 |
| <span style="color:forestgreen">초록색</span> | 1200 ~ 1399 |
| <span style="color:gray">회색</span> | ~ 1199 |

체감상 퍼플 이상만 되어도 굉장히 잘 하는 느낌이고,  
민트도 쉽지 않은 것 같다. 😅

> [코드포스 레이팅과 롤 티어의 비교](https://www.acmicpc.net/blog/view/85)  
[solved.ac 티어 - 코드포스 레이팅](https://www.acmicpc.net/blog/view/92)  

## Carrot
크롬 확장프로그램으로 `대회 중 실시간으로 레이팅 변화, 퍼포먼스`를 알려준다.  
> [Carrot](https://chrome.google.com/webstore/detail/carrot/gakohpplicjdhhfllilcjpfildodfnnn)

## 후기
![result](/assets/img/blog/develop/ps/codeforces/result.jpg){:.bordered}

이번 Div.4는 2시간에 8문제였고  
오랜만에 열린 Div.4라고 들었는데 문제 난이도는 굉장히 할만했다.  

아쉬운 점은 E문제도 풀었으나 시간복잡도에 문제가 있었는데  
에디토리얼 보면서 업솔빙하니 굉장히 쉽게 풀 수 있는 문제였기도 하고,  
조금만 더 생각해서 불필요한 정렬만 안 했어도 통과했을 것 같아 아쉬움이 남는다.  

영어로 된 테스트는 이번이 처음이었는데  
문제를 읽을 수 없는건 아니지만 영어 실력이 부족하여 이해하는데 시간이 오래걸렸고,  
시간나면 영어 공부 좀 더해야겠다는 생각도 들었다.

결과로는 8문제중 7문제를 풀어 레이팅 +504점을 받았다.  
일단은 기준점보다 + 된 것만해도 만족하고, 시간나면 종종 참가하여 민트를 목표로 달려봐야겠다.