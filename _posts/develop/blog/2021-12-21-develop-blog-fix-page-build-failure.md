---
layout: post
title: Jekyll 빌드 실패 해결하기
sitemap: false
hide_last_modified: false
categories:
  - develop
  - blog
---
# Jekyll 빌드 실패 해결하기
![그림1](/assets/img/blog/develop/blog/page-build-failure-1.jpg){:.bordered}
갑자기 페이지 빌드가 실패했다는 이메일이 왔다.  
보통은 실패 원인도 나온다는데 나는 따로 원인이 표시되어 있지 않았다.

## 원인파악
![그림2](/assets/img/blog/develop/blog/page-build-failure-2.jpg){:.bordered}  
[About Jekyll build errors for GitHub Pages sites](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/about-jekyll-build-errors-for-github-pages-sites)  
깃헙 공식문서인 위 문서를 읽다보니 workflow를 확인하고 에러 메세지를 확인할 수 있는 방법이 있었다.  

`Github Repository -> Actions`로 들어가면 workflow들이 표시되는데 여기서 실패한 항목으로 들어가보면 어디서 실패했는지와 에러 메세지를 확인 할 수 있었다.

## 원인파악2
![그림3](/assets/img/blog/develop/blog/page-build-failure-3.jpg){:.bordered}  
우선 빌드 자체가 실패한 것을 알 수 있었고, 상세 내역을 확인해보니  

![그림4](/assets/img/blog/develop/blog/page-build-failure-4.jpg)  
`The jekyll-theme-hydejack theme could not be found. (Jekyll::Errors::MissingDependencyException)`  
라는 에러 메세지를 확인할 수 있었다.  

테마를 찾을 수 없다..? 최근까지 아무 문제 없었는데?  
게시물을 쓴 것 말고는 수정한게 없는데 뭐가 문제지?  
왜 테마를 찾을 수 없다는 것일까 생각해도 이해가 안 되었다.  

일단 로컬에서는 정상적으로 실행이 되었기에 여러가지 원인을 찾아보기 시작했다.

## 추측
1. **테마 버전문제**  
Hydejack 테마의 9.1.4버전을 사용중이었는데 약 20일전 9.1.5버전이 나와있었다. 버전의 문제인가? 관련 부분을 변경해봐도 문제는 해결되지 않았다.

2. **jekyll 버전문제**  
로컬에서는 현재 4.1.1버전을 사용 중인데 github pages에서는 3.9.0버전으로 빌드를 하고 있었다. 하지만 이 문제도 아니었다.

여기서부터는 최대한 검색을 활용해보기로 했다.  

우선 최신글 기준으로 검색했을 때 관련 게시물은 없었고,  
혹시나 하는 마음에 `트위터에 검색`했더니 같은 문제를 해결하신 분이 계셨다..!!  

## 임시해결
![그림5](/assets/img/blog/develop/blog/page-build-failure-5.jpg){:.bordered}  
(github pages의 빌드에러 마침내 해결..  
hydejack이 비공식이었기 때문이었다.)  

해당 글을 발견하게 되었고, 프로필에 github pages 주소가 노출되어 있었기에 해당 분의 repository에서 해결법을 발견할 수 있었다. 

![그림6](/assets/img/blog/develop/blog/page-build-failure-6.jpg)  
해결법은 이게 뭐지 싶을 정도로 단순했다.  
`_config.yml 파일에서 theme 항목을 주석처리`한 게 다였고,  
똑같이 따라 적용했을 때 나역시도 빌드에러가 해결되었다.  

이렇게 빌드에러를 해결한 줄 알았는데..  
이번에는 `로컬에서 빌드가 되지 않았다.`  

## 진짜해결
### GitHub Pages 빌드에러 해결
우선 아래의 글을 읽어볼 필요가 있다.  
[Adding a theme to your GitHub Pages site using Jekyll](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/adding-a-theme-to-your-github-pages-site-using-jekyll)  

Adding a theme 항목에 5번을 살펴보면,
- 공식 지원하는 테마를 사용하려면 `theme: theme-name`
- 다른 jekyll theme를 사용하려면 `remote_theme: theme-name`

으로 사용하라고 되어있는데  

내가 사용하던 hydejack 테마는 공식 지원 테마가 아니었기 때문에 `theme: jekyll-theme-hydejack` 부분에서 해당 테마를 찾지 못해 에러가 난 것이었다.  
(공식지원하는 테마는 [여기](https://pages.github.com/themes/)를 참고하자.)

그렇기에 theme 항목을 주석처리 했을 때 빌드에러가 해결된 것이라고 본다.  
근데 기존에는 왜 에러가 안 났는지 모르겠긴 하다. 최근에 뭔가 바뀐걸까.

### 로컬 빌드 해결
하지만 로컬에서는 remote-theme가 아닌 theme 항목을 읽어 jekyll을 빌드했던 것으로 보이는데, `theme항목을 주석처리하여 빌드가 제대로 되지 않던 것`이었다.  

여기는 인터넷을 검색하다보니 [Jekyll Remote Theme](https://github.com/benbalter/jekyll-remote-theme) 라는 플러그인이 있었다.  
`로컬에서도 remote-theme를 이용해 빌드`를 할 수 있게 하는 플러그인이다.  
위 링크의 README를 참고하여 적용했더니 로컬에서도 정상적으로 빌드가 가능하게 되었다.