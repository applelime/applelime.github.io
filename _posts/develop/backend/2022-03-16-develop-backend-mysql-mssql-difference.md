---
layout: post
title: MySQL, MS SQL 단축키 및 함수 비교
sitemap: false
hide_last_modified: false
categories:
  - develop
  - backend
---

# MySQL, MS SQL 단축키 및 함수 비교
이전에는 SQL Server(MS SQL)를 사용하면서 SQL Server Management Studio(SSMS)를 사용했었는데 이번에는 MySQL을 공부하면서 MySQL Workbench를 사용해보게 되었다.  

두 프로그램의 단축키가 어떻게 다른지, 또 함수에서는 어떤 차이가 있는지 비교해보려고 한다.

## 단축키
1. **현재 사용중인 DB 확인**  
단축키는 아니지만 이 부분도 달랐어서 공유하려고 한다.  
> ![](/assets/img/blog/develop/back/workbench/mysql-1.jpg){:.bordered}  
Workbench : 현재 사용중인 DB가 볼드로 표시된다.  
<br>
![](/assets/img/blog/develop/back/workbench/mssql-1.jpg){:.bordered}  
SSMS : 좌측상단에 현재 사용중인 DB명이 표시된다.

2. **새 쿼리 작성**  
> Workbench : Ctrl + T  
SSMS : Ctrl + N

3. **쿼리 전체 실행**  
아무것도 선택(드래그)하지 않고
> Workbench : Ctrl + Shift + Enter  
SSMS : F5

4. **쿼리 일부 실행**
> Workbench : (드래그 후) Ctrl + Shift + Enter (드래그한 부분 전체 실행), Ctrl + Enter (현재 쿼리 1개 실행)  
SSMS : (드래그 후) F5 (드래그한 부분 전체 실행)

5. **주석 설정/해제**
> Workbench : Ctrl + / (vs code, eclipse 동일)  
SSMS : Ctrl + K, C | Ctrl + K, U (visual studio 동일)

6. **쿼리 정렬**
> Workbench : Ctrl + B

## 함수 비교

|          | **MS SQL** | **MySQL** |
| NULL체크 | isnull(value, 'hi') | ifnull(value, 'hi') |
| 문자열 붙이기 | 'hello' + ' ' + 'world' | concat('hello', ' ', 'world') |
| 문자열 반복 | replicate('a', 10) | repeat('a', 10) |
| 문자열 길이 | len('안녕') | char_length('안녕') |
| 타입 변환 | convert(decimal(18,2), 12.3456) | convert(12.3456, decimal(18,2)) |
| 현재 날짜 | getdate() | now() |
| 자동 증가 제약조건 | identity(1,1) | auto_increment |
| SELECT TOP | select top n *<br>from table | select *<br>from table<br>limit n |

이외에도 다른 부분이 있겠지만 자주 사용되는 부분은 이정도가 있는 것 같다.