---
layout: post
title: Slick으로 슬라이드 이미지 삽입하기
sitemap: false
hide_last_modified: false
categories:
  - etc
---
# Slick으로 슬라이드 이미지 삽입하기

우선 [slick 홈페이지](http://kenwheeler.github.io/slick/) 에서 slick을 다운로드 받자.  
slick은 jQuery 기반으로 만들어져 jQuery가 필요하다.  
우선 블로그에 아래 코드가 포함될 수 있도록 head 또는 적절한 곳에 추가한다.

```html
<!--slick-->
<link rel="stylesheet" type="text/css" href="/assets/css/slick/slick.css"/>
<link rel="stylesheet" type="text/css" href="/assets/css/slick/slick-theme.css"/>
<script	src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
<script	type="text/javascript" src="/assets/css/slick/slick.min.js"></script>
```

<br>
그리고 아래처럼 div 태그에 class를 지정하고 해당 클래스에 slick을 사용하면 된다.

```html
<div class="main_center">
    <div><img src= "/assets/img/blog/etc/1.JPG" style="width: auto; height: 500px;"></div>
    <div><img src="/assets/img/blog/etc/2.JPG" style="width: auto; height: 500px;"></div>
    <div><img src= "/assets/img/blog/etc/3.JPG" style="width: auto; height: 500px;"></div>
</div>

<script>
$(document).ready(function() {
    $('.main_center').slick({
        autoplay : true, /*자동으로 슬라이딩됨*/
        dots : true, /* 하단 점 버튼 */
        speed : 300 /* 이미지가 슬라이딩시 걸리는 시간 */,
        infinite : true,
        autoplaySpeed : 30000 /* 이미지가 다른 이미지로 넘어 갈때의 텀 */,
        arrows : true,
        slidesToShow : 1,
        slidesToScroll : 1,
        touchMove : true, /* 마우스 클릭으로 끌어서 슬라이딩 가능여부 */
        nextArrows : true, /* 넥스트버튼 */
        prevArrows : true,
        arrow : true, /*false 면 좌우 버튼 없음, true 면 좌우 버튼 보임*/
        fade : false
    });
});
</script>
```

자세한 사용 방법은 [slick 홈페이지](http://kenwheeler.github.io/slick/)나 [slick github](https://github.com/kenwheeler/slick/)를 참고하자.

<br>
> 🔍 **결과**

<div class="main_center">
    <div><img src= "/assets/img/blog/etc/1.JPG" style="width: auto; height: 500px;"></div>
    <div><img src="/assets/img/blog/etc/2.JPG" style="width: auto; height: 500px;"></div>
    <div><img src= "/assets/img/blog/etc/3.JPG" style="width: auto; height: 500px;"></div>
</div>

<script>
$(document).ready(function() {
    $('.main_center').slick({
        autoplay : true, /*자동으로 슬라이딩됨*/
        dots : true, /* 하단 점 버튼 */
        speed : 300 /* 이미지가 슬라이딩시 걸리는 시간 */,
        infinite : true,
        autoplaySpeed : 30000 /* 이미지가 다른 이미지로 넘어 갈때의 텀 */,
        arrows : true,
        slidesToShow : 1,
        slidesToScroll : 1,
        touchMove : true, /* 마우스 클릭으로 끌어서 슬라이딩 가능여부 */
        nextArrows : true, /* 넥스트버튼 */
        prevArrows : true,
        arrow : true, /*false 면 좌우 버튼 없음, true 면 좌우 버튼 보임*/
        fade : false
    });
});
</script>