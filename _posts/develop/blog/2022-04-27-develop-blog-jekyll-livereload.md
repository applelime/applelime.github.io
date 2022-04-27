---
layout: post
title: Jekyll LiveReload 적용하기
sitemap: true
hide_last_modified: false
categories:
  - develop
  - blog
---

# Jekyll LiveReload 적용하기

[Jekyll 3.7.0](https://jekyllrb.com/news/2018/01/02/jekyll-3-7-0-released/) 버전부터 LiveReload 기능이 포함되었다.  
해당 기능은 `수정사항이 생기면 페이지가 자동으로 새로고침 되는 기능`으로  
VS Code의 [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) 확장과 비슷하다고 보면 된다.

## 적용하기
로컬에서 jekyll 실행 시 명령어 뒤에 `--livereload` 명령어만 붙이면 된다.
```
bundle exec jekyll serve --livereload
```
하지만 실행했을 때 eventmachine 에러가 발생하며 실행이 되지 않았다.

## 문제 원인
그 이유를 찾아본 결과, 
기본적으로 사용하는 eventmachine 라이브러리의 버전은  
`eventmachine (1.2.7-x64-mingw32)` 버전으로  
해당 버전을 사용하면 정상적으로 실행되지 않는 것으로 보였다.

## 문제 해결
1. `gem uninstall eventmachine` 명령어를 통해 기존 설치되어 있는 `eventmachine을 제거`{:.block-blue}한다.

2. `Gemfile.lock 파일`에서 eventmachine 버전을 `eventmachine(1.2.7)`{:.block-blue}로 변경한다.

3. `bundle install`을 통해 `eventmachine을 새로 받는다.`{:.block-blue}

4. `실행`한다.

위 방법으로 정상 실행되지 않는다면  
`gem install eventmachine --platform ruby` 명령어로 eventmachine을 재설치 후 시도해본다.

그래도 정상 실행되지 않는다면 아래 블로그를 참고하여 Gemfile에서 eventmachine을 세팅해주자.  
<https://chanoyoung.github.io/jekyll-livereload/>

`start_tcp_server : no acceptor (port is in use or requires root privileges)`{:.block-blue}  
에러가 발생한다면 컴퓨터를 한 번 재부팅하면 된다.

## 적용 완료

![livereload](/assets/img/blog/develop/blog/livereload.jpg)  
정상적으로 적용되면 Server address 위에 LiveReload address가 표시된다.  
잠깐 기다리면 `LiveReload: Browser connected` 메세지가 나타나는데  
이후부터 `수정사항이 생기면 페이지가 자동 새로고침`{:.block-blue}된다.

## 단점
- 보고있는 페이지가 아닌 다른 페이지의 수정 및 이미지 업로드 등 무엇인가 변경되면 페이지가 새로고침된다.  
- 내 블로그처럼 HITS를 달아놓은 경우, 글쓰면서 저장할 때 마다 새로고침되어 HITS가 올라가는 게 아쉽긴 하다.

이런 약간의 단점은 있지만 그래도 굉장히 편한 기능이므로 사용해보는 것을 추천한다.