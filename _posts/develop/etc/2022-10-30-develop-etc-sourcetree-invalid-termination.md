---
layout: post
title: Sourcetree for mac 비정상 종료 문제 해결
sitemap: true
hide_last_modified: false
categories:
  - develop
  - etc
---

# Sourcetree for mac 비정상 종료 문제 해결
소스트리를 실행하자마자 바로 소스트리가 종료되는 현상이 발생했다.  
원인을 찾아보니 소스트리 언어 설정이 한국어일 때 발생하는 문제로 `언어를 영어로 변경하면 해결`된다고 한다.  
찾아보니 6개월도 더 된 이슈인것 같은데 왜 안고쳐지고 있는걸까..

## 시스템 언어설정 영어로 변경하기
소스트리의 기본 언어설정은 Automatic으로 설정되어있는데 기본적으로 시스템의 언어를 따라간다.  
시스템의 언어를 영어로 변경하게 되면 이 문제를 해결할 수 있다.  

시스템 환경설정 > 언어 및 지역  
![language setting](/assets/img/blog/develop/etc/macos-language.png)  
왼쪽 아래 + 버튼을 누르면 언어 추가 창이 뜨는데 English (영어)를 선택하여 등록하고 기본언어로 설정한다.

## 소스트리 언어설정 변경하기
이후 소스트리를 실행하면 강제종료되는 현상이 발생하지 않는데 이때 설정에서 언어를 영어로 변경해주자.  
![language setting](/assets/img/blog/develop/etc/sourcetree-language.png)  

소스트리 언어설정을 변경했다면 시스템 언어설정을 다시 한국어로 변경해주자.