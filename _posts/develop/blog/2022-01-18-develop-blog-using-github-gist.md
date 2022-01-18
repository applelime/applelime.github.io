---
layout: post
title: GitHub Gist 사용하기
sitemap: false
hide_last_modified: false
categories:
  - develop
  - blog
---

# GitHub Gist 사용하기

GitHub Gist는 GitHub에서 제공해주는 서비스로  
`짧은 코드를 공유나 기록 목적`으로 사용할 수 있다.

## 사용법
1. [GitHub Gist](https://gist.github.com/)에 접속한 후, GitHub 계정으로 로그인 한다.

2. 상단 + 버튼을 눌러 Gist를 작성한다.

3. 확장자를 포함한 파일명과 Gist 설명을 작성한다.  
여기서 `파일명의 확장자에 따라 스타일이 자동 적용`된다.

4. Create 한다.  
public과 secret 옵션이 있는데. `secret은 private이 아니다.`  
검색엔진을 통해 노출되지는 않지만 URL을 통해 누구나 볼 수 있다.

## 사용하는 이유?

- `소스코드를 간편하게 embed` 할 수 있다.
- `스타일 포맷이 적용`되어 있어 Color Scripter를 사용하지 않아도 된다.
- Gist 수정 시 자동으로 `수정내용이 반영`된다.

## 블로그에 공유하기

우선 외부에서 Embed 하려면 Gist를 `Public으로 생성`해야 한다.  
이 후 상단의 Embed 항목의 `Script를 복사해서 붙여넣기`만 하면 해당 코드를 삽입할 수 있다.

## jekyll-gist 플러그인

Jekyll을 사용해 GitHub Pages를 만들었다면 [jekyll-gist](https://github.com/jekyll/jekyll-gist) 플러그인을 사용할 수도 있다.  
```md
{ % gist 8814d6a7a3c1de994b0b0b69fe4baf33 % }
```
위와 같이 Gist의 ID를 입력하면 자동으로 javascript 코드로 변환시켜준다.

## 사용 예시

아래와 같이 간단한 코드를 공유할 때 유용하게 사용될 것 같다.

{% gist 8814d6a7a3c1de994b0b0b69fe4baf33 %}