---
layout: post
title: M1 MAC에서 Jekyll 빌드하기
sitemap: true
hide_last_modified: false
categories:
  - develop
  - blog
---

# M1 MAC에서 Jekyll 빌드하기
이번에 개발환경을 M1으로 바꾸면서 새로 세팅한 부분을 기록하려고 적었다.  
루비 설치에는 HomeBrew를 사용하였음 !

## 루비 설치
우선 `rbenv`와 `ruby-build`를 설치한다.  
`rbenv`{:.block-blue}는 루비의 버전을 독립적으로 사용할 수 있도록 도와주는 패키지.
```
brew install rbenv ruby-build
```

`rbenv`를 통해 루비를 설치한다.
```
rbenv install -l // 설치 가능한 버전보기
rbenv install 2.6.10 (원하는 버전)
```

설치 후 `rbenv versions`로 설치된 버전 확인.  
`rbenv global` 명령어로 기본 전역 루비 버전 선택 
```
rbenv versions
rbenv global 2.6.10
rbenv versions
```


## 환경변수 추가
기본적으로 zsh를 사용하므로 `~/.zshrc`에 아래 내용을 추가한다. 
```
export PATH={$Home}/.rbenv/bin:$PATH && \
eval "$(rbenv init -)"
```

완료 후에는 source 명령어로 적용
```
source ~/.zshrc
```

## Bundler 설치 및 실행
```
gem install bundler
rbenv rehash

bundler install
bundle exec jekyll serve
```
정상적으로 로컬에서 Jekyll 빌드가 되는 것을 확인할 수 있다!

