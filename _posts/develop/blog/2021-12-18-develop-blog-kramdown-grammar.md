---
layout: post
title: Kramdown 문법을 사용해보자
sitemap: false
hide_last_modified: false
categories:
  - develop
  - blog
---
# Kramdown 문법을 사용해보자 
Jekyll은 현재 마크다운 엔진으로 ```kramdown```을 사용 중이다.  
kramdown만의 기능을 사용하면 css를 쉽게 적용할 수 있어 게시물을 편하게 꾸밀 수 있다.


## 속성 추가하기
속성을 추가하는 방법으로는 ALD (Attribute List Definitions)를 사용하는 것인데  
중괄호 안에 ```:```을 이용하여 정의할 수 있으며, 블록 사이에도 사용이 가능하다.  
아래와 같이 ```key-value```{:.block-blue}, ```id```{:.block-blue}, ```class```{:.block-blue}를 추가할 수 있다.
- ```{:key="value"}```
- ```{:#myid}```
- ```{:.cls2}```  
<br>

🔍 **예시**  
```css
.block-blue {
  color: #0d5ab1 !important;
}
```
```
코드블럭에 색상 적용하기  
```kramdown``` {:.block-blue}
```

💡 **결과**  
> 코드블럭에 색상 적용하기  
```kramdown```{:.block-blue}


## 확장 기능
확장자는 중괄호 안 ```::```으로 시작하고, ```:/```으로 쌍을 맞춰서 닫아야한다.  
대표적으로는 ```comment```{:.block-blue}와 ```nomarkdown```{:.block-blue}이 있다.
- ```comment``` : 본문 텍스트를 출력에 표시하지 않고 주석처럼 처리
- ```nomarkdown``` : 본문 텍스트를 markdown 처리하지 않고 있는 그대로 출력  
<br>

🔍 **예시**  
```
{::comment}
This text is completely ignored by kramdown - a comment in the text.
{:/comment}

Do you see {::comment}this text{:/comment}?
{::comment}some other comment{:/}

{::options key="val" /}
```

💡 **결과**  
> {::comment}
This text is completely ignored by kramdown - a comment in the text.
{:/comment}  
Do you see {::comment}this text{:/comment}?  
{::comment}some other comment{:/}  


## Table Of Contents (TOC)
TOC 기능을 사용하면 말그대로 페이지 내용의 테이블이 생성된다.  
```{:toc}``` 를 본문에 넣으면 자동으로 H1~H6 내용물의 index가 생성된다.  
<br>

🔍 **예시**  
```
* toc
{:toc}

## 제외하고 싶은 헤더
{:.no_toc}
```

💡 **결과**  
* toc
{:toc}
> -> 바로 옆에 생긴 Table Of Contents를 확인