---
layout: post
title: 게시물 목록 커스텀하기
sitemap: false
hide_last_modified: false
categories:
  - develop
  - blog
---

# 게시물 목록 커스텀하기

일단 현재 사용하고 있는 테마는 [Hydejack](https://hydejack.com/) v9.1.5 버전이고,  
다른 테마도 동일하게 적용할 수 있을 것이라 본다.

이번에는 날짜 형식만 변경했지만 마찬가지로 다른 부분도 얼마든지 커스텀할 수 있다.

## 수정할 파일 찾기

우선 메뉴를 눌렀을 때 나타나는 페이지를 알아야 한다.  
해당 카테고리의 `메뉴명.md 파일`을 보면 `어떤 layout을 적용했는지` 알 수 있다.

```md
# Featured tags need to have either the `list` or `grid` layout (PRO only).
layout: list
```

Hydejack 테마의 경우 디폴트로 list layout을 이용하게 되어있고,  
이 `list layout을 수정`해주면 되는 것이다.

## 수정방법

해당 layout을 수정하려면 custom layout을 적용하여야 한다.  
custom layout을 적용하기 위해서는 `_layouts 폴더 안에 해당 파일을 만들면` 적용된다.

### 1. 원본 찾기

우선 `기존 코드`가 어떤식으로 적용되었는지를 `확인`하자.  
로컬에서 해당 테마를 설치하였다면 vendor\bundle 폴더 안에 설치되어 있을 것이다.

> vendor\bundle\ruby\2.7.0\gems\jekyll-theme-hydejack-9.1.5

나의 경우에는 위의 폴더에 원본 테마가 있었다.  

### 2. 커스텀하기

위의 경로에서 list.html을 복사하여 _layouts 폴더에 넣어준다.  
그리고 `구조를 확인하여 필요에 맞게 수정`하면 된다.  
(list.html을 전부 지우고 블로그를 새로고침 해보면 게시물 목록이 나타나지 않는 것을 확인할 수 있다.)

## 실제로 수정하기

![list.html](/assets/img/blog/develop/blog/post-list/list.jpg)

list.html의 구조를 확인 했을 때 post의 정보는 `components/post-list-item.html`에서 표시됨을 알 수 있었다.  
마찬가지로 `_includes/components/post-list-item.html 파일도 원본을 복사`하여 동일하게 수정하면 된다.

![post-list-item.html](/assets/img/blog/develop/blog/post-list/list-item.jpg)

구조는 단순한 편이었다.  
나는 `날짜가 게시물 제목 앞으로` 왔으면 해서 `a태그와 time 태그의 위치를 바꿔`주었다.

이후 월도 영어가 아닌 `숫자로 표시`되었으면 해서 `strings.yml에서 format을 수정`하였고,  
css를 수정하여 여백을 살짝 조정하였다.  

## 결과

| 변경 전  | 변경 후 |
| -- | -- |
| ![datetime-before](/assets/img/blog/develop/blog/post-list/date-before.jpg) | ![datetime-after](/assets/img/blog/develop/blog/post-list/date-after.jpg) |

해당 수정 부분은 [여기](https://github.com/applelime/applelime.github.io/commit/2122f2122b8c0e21d4a7fbc77b4a8fc667618665)에서 확인할 수 있다.