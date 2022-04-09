---
layout: post
title: VS Code Emmet 사용하기
sitemap: true
hide_last_modified: false
categories:
  - develop
  - frontend
---

# VS Code Emmet 사용하기

* toc
{:toc .large-only}

Emmet은 HTML, XML, CSS 등 문서를 편집할 때 `빠른 코딩을 위해 사용하는 플러그인`으로  
현재 `VS Code에서 기본으로 제공`한다.

기본적으로는 단축 명령어 입력 후 Tab 이나 Enter키를 입력하면 된다.  
기본 사용법 외 상세한 내용은 [Emmet Documentation 페이지](https://docs.emmet.io/)를 확인하자.

## HTML 표준 문서 만들기

> ! 또는 html:5

간단하게 HTML 기본 문서를 만들 수 있다.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body></body>
</html>
```

## 자식노드 >

> div>ul>li

\>를 이용하여 자식요소 생성

```html
<div>
  <ul>
    <li></li>
  </ul>
</div>
```

## 형제노드 +

> div>ul+ol

\+를 이용하여 형제노드 생성

```html
<div>
  <ul></ul>
  <ol></ol>
</div>
```

## 노드 올라가기 ^

> div>ul>li^ol

li의 부모인 ul의 형제노드로 ol을 생성

```html
<div>
  <ul>
    <li></li>
  </ul>
  <ol></ol>
</div>
```

## 반복하기 \*

> div>ul>li\*5

```html
<div>
  <ul>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
  </ul>
</div>
```

## 그룹화하기 ()

> div>(header>ul>li\*2>a)+footer>p

```html
<div>
  <header>
    <ul>
      <li><a href=""></a></li>
      <li><a href=""></a></li>
    </ul>
  </header>
  <footer>
    <p></p>
  </footer>
</div>
```

## ID(#), 클래스(.)

> div#id, div.class

ID : 태그 뒤에 #id 입력  
클래스 : 태그 뒤에 .class 입력

```html
<!-- div#id -->
<div id="id"></div>

<!-- div.class -->
<div class="class"></div>
```

## 텍스트 입력 {}

> p{안녕하세요}

태그 뒤 {} 안에 텍스트 입력

```html
<p>안녕하세요</p>
```

## 자동 넘버링 $

> p.class${item $}\*3

```html
<p class="class1">item 1</p>
<p class="class2">item 2</p>
<p class="class3">item 3</p>
```

## 더미용 텍스트 lorem

> p>lorem

lorem4 처럼 사용하면 4단어로 구성된 임의의 문장을 추가한다.

```html
<p>
  Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati facilis et
  beatae labore, molestiae quod itaque cum porro at quis. Nesciunt voluptatem
  illo mollitia nemo ducimus, molestias numquam cumque ullam.
</p>
```

## 커스텀 속성

> td[title="Hello world!" colspan=3]

```html
<td title="Hello world!" colspan="3"></td>
```

## CSS에서의 사용

<https://docs.emmet.io/cheat-sheet/>  
여기에서 CSS 약어를 확인하여 적용하면 된다.

> .item{h100+w3em}

```css
.item {
  height: 100px;
  width: 3em;
}
```
