---
layout: post
title: Maven 사용하기
sitemap: true
hide_last_modified: false
categories:
  - develop
  - backend
---

# Maven 사용하기
Maven과 Gradle은 `자바 빌드 도구`로서  
`프로젝트 빌드에 필요한 라이브러리 및 각종 빌드 설정`{:.block-blue}을 할 수 있다.  

Maven은 2004년 출시되어 현재까지도 가장 많은 곳에서 사용되고 있어 Maven의 사용방법에 대해 알아보려고 한다.

## Eclipse(STS)로 Maven 프로젝트 생성하기
1. Maven Project로 생성한다.  
![maven-1](/assets/img/blog/develop/back/maven/create-maven-1.jpg)  

2. 기존 프로젝트를 우클릭하여 Maven Project로 Convert한다.  
![maven-2](/assets/img/blog/develop/back/maven/create-maven-2.jpg)  

## Maven 설정 파일 (pom.xml)
![pom](/assets/img/blog/develop/back/maven/maven-pom.jpg)  
pom은 Project Object Model의 약자로 Maven 프로젝트를 생성하면 root에 pom.xml이 생긴다.

이 설정 파일을 통해 `라이브러리를 추가하거나 버전을 관리하는 등의 기능을 사용`할 수 있다. 

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/maven-v4_0_0.xsd">
  <modelVersion>4.0.0</modelVersion>
  <groupId>com.mvc</groupId>
  <artifactId>todo</artifactId>
  <name>SpringTodo</name>
  <packaging>war</packaging>
  <version>1.0.0-BUILD-SNAPSHOT</version>
  <properties>
    <java-version>1.8</java-version>
    <org.springframework-version>5.3.18</org.springframework-version>
    <org.aspectj-version>1.6.10</org.aspectj-version>
    <org.slf4j-version>1.6.6</org.slf4j-version>
  </properties>
  <dependencies>
    <!-- Spring -->
    <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-context</artifactId>
      <version>${org.springframework-version}</version>
      <exclusions>
        <!-- Exclude Commons Logging in favor of SLF4j -->
        <exclusion>
          <groupId>commons-logging</groupId>
          <artifactId>commons-logging</artifactId>
         </exclusion>
      </exclusions>
    </dependency>
    <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-webmvc</artifactId>
      <version>${org.springframework-version}</version>
    </dependency>
        
    <!-- AspectJ -->
    <dependency>
      <groupId>org.aspectj</groupId>
      <artifactId>aspectjrt</artifactId>
      <version>${org.aspectj-version}</version>
    </dependency>	
...
```

간략하게 설명하자면 아래와 같다.
- **modelVersion** : POM모델의 version 정보
- **groupId** : 프로젝트를 생성하는 조직의 고유한 ID
- **artifactId** : 프로젝트 빌드 시 파일의 대표 이름
- **name** : 프로젝트의 이름
- **description** : 프로젝트의 설명
- **packaging** : 패키지의 유형 (jar, war, ear, ..)
- **version** : 프로젝트의 현재 버전
- **properties** : 버전 관리를 용이하게 하기 위한 프로퍼티
- **dependencies** : 프로젝트 의존 관계에 있는 라이브러리를 나열

## Maven을 이용하여 라이브러리 추가, 변경하기
- **라이브러리 추가하기**  
라이브러리를 추가하는 방법은 dependencies 태그 사이에 `새로운 dependency를 추가`하면 된다.  
[MVN REPOSITORY](https://mvnrepository.com/)와 같은 사이트에서 필요한 라이브러리를 찾아 해당 부분을 복사해 넣으면 된다.  

```xml
...
  <dependencies>
  ...
    <!-- Spring JDBC -->
    <!-- https://mvnrepository.com/artifact/org.springframework/spring-jdbc -->
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-jdbc</artifactId>
        <version>5.3.18</version>
    </dependency>
  ...
  </dependencies>
...
```

- **라이브러리 버전 변경하기**  
버전은 `<dependency> 태그 안에 있는 <version> 값을 변경`하면 된다.  
하지만 이렇게 버전관리하면 버전이 바뀔때마다 일일이 버전을 바꿔줘야 하므로  
위에 설명한 `프로퍼티를 사용하여 버전을 관리`{:.block-blue}한다.

```xml
...
  <properties>
    <org.springframework-version>5.3.18</org.springframework-version>
  </properties>
  <dependencies>
  ...
    <!-- Spring JDBC -->
    <!-- https://mvnrepository.com/artifact/org.springframework/spring-jdbc -->
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-jdbc</artifactId>
        <version>${org.springframework-version}</version>
    </dependency>
  ...
  </dependencies>
...
```

이렇게 라이브러리를 새로 추가, 변경 시 최초에는 다운받아 로컬에 저장한다.  
기본 디렉토리는 `C:\Users\user\.m2\repository`로  
해당 폴더에 가면 다운받은 라이브러리를 확인 할 수 있다.  

이후 이전에 받은 버전으로 변경 시에는 추가 다운로드 없이 바로 변경되는 것을 볼 수 있다.