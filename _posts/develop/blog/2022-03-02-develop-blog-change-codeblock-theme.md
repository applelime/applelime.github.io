---
layout: post
title: Rouge로 코드 블럭 테마 변경하기
sitemap: false
hide_last_modified: false
categories:
  - develop
  - blog
---

# Rouge로 코드 블럭 테마 변경하기

[Rouge](https://github.com/rouge-ruby/rouge)라는 Ruby 기반의 Syntax Highlighter가 있어 이를 활용해 코드 블럭의 테마를 변경해보았다.

## 설치하기
Rouge는 Ruby 기반으로 Jekyll의 기본 Syntax Highlighter로 사용되고 있다.  
우선 `gem install rouge` 명령어를 통해 rouge를 설치한다.

## 적용할 테마 고르기
`rougify help style` 명령어를 입력하면 아래와 같이 사용가능한 테마를 보여준다.  
![theme-list](/assets/img/blog/develop/blog/rouge/theme-list.jpg)  

해당 테마들은 [이 사이트](https://spsarolkar.github.io/rouge-theme-preview/)에서 미리보기가 가능하다.  

## css 파일 가져오기
`rougify style base16.monokai.dark > assets/css/syntax.css`  
원하는 테마를 골라 위 명령어를 입력한다.  

위 명령어는 해당 테마의 css 파일을 `assets/css/syntax.css` 파일로 저장하겠다는 뜻이다.  

## 적용하기 - 1
일반적으로 적용하는 방법이다.  
우선 `_config.yml` 파일에 아래 내용이 있는지 확인하고 없으면 추가한다.  
```md
markdown: kramdown
highlighter: rouge
```

이후 layout의 default나 head 파일에서 해당 css를 불러오기만 하면 된다.  
```html
<link rel="stylesheet" href="/assets/css/syntax.css">
```

## 적용하기 - 2
나의 경우 현재 사용하고 있는 테마 Hydejack에서 이미 Rouge가 기본적으로 적용된 상태였다.  
기본적으로 `_sass 폴더의 _syntax.scss파일`을 읽도록 설정되어 있었기 때문에  
해당 폴더에 _syntax.scss 파일 생성 후 위의 테마 css 코드를 적용시켜주었다.  

## 결과

| 변경 전 | 변경 후 |
| ------- | ------- |
| ![before](/assets/img/blog/develop/blog/rouge/before.jpg) | ![dafter](/assets/img/blog/develop/blog/rouge/after.jpg) |