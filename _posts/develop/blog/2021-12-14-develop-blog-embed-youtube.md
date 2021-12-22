---
layout: post
title: 유튜브 영상 쉽게 삽입하는 법
sitemap: false
hide_last_modified: false
categories:
  - develop
  - blog
---
# 유튜브 영상 쉽게 삽입하는 법

_includes 폴더에 youtubePlayer.html 파일을 하나 만들자.
~~~html
<style>
    .embed-container {
        position: relative;
        padding-bottom: 56.25%;
        height: 0;
        overflow: hidden;
        max-width: 100%;
    }

    .embed-container iframe,
    .embed-container object,
    .embed-container embed {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
</style>

<div class="embed-container">
    <iframe src="https://www.youtube.com/embed/{{ include.id }}" frameborder="0" allowfullscreen="" onclick="ga('send', 'event', 'post', 'click', 'youtubePlayer');">
    </iframe>
</div>
~~~

아래처럼 영상 id만 이용하여 쉽게 삽입할 수 있게 된다.  
괄호와 % 사이에 공백은 제거해야 한다.
~~~
{ % include components/youtubePlayer.html id="Xc1Le3CSdrM" % }
~~~

> 🔍 **결과**

{% include components/youtubePlayer.html id="Xc1Le3CSdrM" %}

<br>
```동영상을 재생할 수 없음``` 이라고 나오는 경우는 원본 영상에서 퍼가기 허용을 금지한 경우로 어쩔 수 없이 삽입할 수 없긴 하다.
