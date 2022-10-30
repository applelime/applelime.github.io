---
layout: post
title: Sourcetree Permission Denied 에러 해결
sitemap: true
hide_last_modified: false
categories:
  - develop
  - etc
---

# Sourcetree Permission Denied 에러 해결
![sourcetree error](/assets/img/blog/develop/etc/sourcetree-permission-defined.png){:width="600px"}  
로컬에서 커밋을 쌓아두다 PUSH를 했더니 위와 같은 에러가 발생하며 푸쉬가 되지 않았다.  

구글링을 통해 해결방법을 찾아보니 ssh key를 발급받아 등록하는 해결방법이 많았는데  
키를 관리하지 않고 더 편하게 해결할 수 있는 방법이 없을까 찾아보게 되었다. 

## HTTPS를 이용하는 방법
[github 공식 문서에서 HTTPS URL을 이용한 clone 방법](https://docs.github.com/en/get-started/getting-started-with-git/about-remote-repositories#cloning-with-https-urls)이 소개되어 있다.  
계정 인증을 위해 패스워드 기반의 인증은 이제 보안상의 문제로 중단되었고,  
액세스 토큰을 사용하거나 Git Credential Manager와 같은 자격증명 헬퍼를 사용할 수 있다고 소개되어 있다.  
해당 문서에 SSH Key를 이용한 방법도 소개되어있으니 이 방법을 사용해도 된다.

## Git Credential Manager
Git Credential Manager는 Git 자격 증명 도우미로  
HTTP 프로토콜을 이용하여 접속할 때 필요한 사용자 이름과 패스워드를 저장하고 자동으로 입력해주는 시스템이다.  
자세한 내용은 아래 문서를 읽어보자.  
<https://git-scm.com/book/en/v2/Git-Tools-Credential-Storage>

## GCM 사용하기
[Git Credential Manager 저장소](https://github.com/GitCredentialManager/git-credential-manager)에 방문하면 README에 상세하게 설명되어 있다.

macOS Homebrew 기준으로  
아래 명령어를 통해 git credential manager를 설치하고 업데이트하자.
```
brew tap microsoft/git
brew install --cask git-credential-manager-core

brew upgrade git-credential-manager-core
```

Sourcetree에서 첫 푸쉬를 하게되면 Github 로그인창이 나타나게 되고,  
로그인을 성공하면 정상적으로 푸쉬가 되는 모습을 확인할 수 있다.  
이후에는 자격증명이 캐싱되어 추가절차 없이 바로 푸쉬가 가능하게 된다.