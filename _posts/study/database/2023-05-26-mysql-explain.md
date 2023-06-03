---
layout: post
title: MySQL 실행 계획
sitemap: true
hide_last_modified: false
categories:
  - study
  - database
---

# MySQL 실행 계획
* toc
{:toc .large-only}

MySQL에서는 EXPLAIN문을 통해 쿼리가 어떻게 실행될 것인지 실행 계획을 확인하여 참고할 수 있다.

## 사용 방법
```sql
EXPLAIN [FORMAT=JSON] SELECT * FROM tbl
EXPLAIN ANALYZE SELECT * FROM tbl
```
쿼리 앞에 EXPLAIN 문만 추가하면 된다.

FORMAT은 TRADITIONAL, JSON, TREE (8.0.16 이상)를 제공하며,  
EXPLAIN ANALYZE를 통해 예측 실행 계획과 실제 수행 소요시간/비용을 같이 확인할 수 있다.

## 실행 계획의 항목 분석
![mysql-explain](/assets/img/blog/study/database/mysql-explain.png)  
일반적으로 EXPLAIN을 실행하면 위와 같은 항목들이 표시된다.

### id
실행 순서를 표시하는 숫자  
ID가 작을 수록 먼저 수행된 것이다.  
조인을 수행하는 쿼리는 하나의 단위로 실행하므로 같은 id를 가진다.

### select_type
select에 대한 타입

| 종류 | 설명 |
| ------ | -------- |
| `SIMPLE`{:.block-blue} | 단순 SELECT |
| `PRIMARY`{:.block-blue} | 서브쿼리 혹은 UNION이 포함된 쿼리에서 1번쨰 SELECT 쿼리 |
| SUBQUERY | 독립적으로 수행되는 서브쿼리 |
| `DERIVED`{:.block-blue} | FROM절에 작성된 서브 쿼리. 인라인 뷰 |
| UNION | UNION 쿼리에서 PRIMARY 이후 SELECT |
| UNION RESULT | UNION ALL이 아닌 UNION으로 SELECT절 결합 시,<br>메모리 또는 디스크에서 임시 테이블을 만들어 중복을 제거한 결과 |
| `DEPENDENT SUBQUERY` | 서브쿼리가 메인 테이블의 영향을 받는 경우 |
| `DEPENDENT UNUON` | UNION 쿼리가 메인 테이블의 영향을 받는 경우 |
| `UNCACHEABLE SUBQUERY` | 서브쿼리가 캐시되지 못하고 메모리에 올라가지 못하는 경우.<br>사용자 정의 함수나 사용자 정의 변수를 포함하거나, RAND(), UUID() 등 함수 사용|
| MATERIALIZED | IN절의 서브쿼리를 임시 테이블로 만들어 조인을 수행 |

### table
테이블 명 (or alias) 표시  
서브쿼리나 임시테이블로 작업을 수행할 때는 <subquery#>, <derived#>처럼 출력  

### partitions
데이터가 저장된 파티션을 표시

### type
테이블의 데이터를 어떻게 찾을 지에 관한 정보를 제공

| 종류 | 설명 |
| ------ | -------- |
| `system`{:.block-blue} | 테이블에 데이터가 없거나 1개만 있는 경우 |
| `const`{:.block-blue} | 조회되는 데이터가 단 1건일 때 (pk, unique) |
| `eq_ref`{:.block-blue} | join 시 pk or index를 통해 1건의 데이터 조회 |
| ref | join 시 데이터의 접근 범위가 2개 이상인 경우. 일대다 |
| ref_or_null | ref와 유사하지만 is null 구문에 대해 인덱스 활용 |
| range | 테이블 내 연속된 데이터 범위를 조회 |
| fulltext | fulltext index를 사용하여 데이터 접근하는 경우 |
| index_merge | 인덱스 머지가 일어나는 경우 |
| unique_subquery | IN절 안의 서브쿼리에서 pk, unique가 오는 경우 |
| index_subquery | IN절 안의 서브쿼리에서 일반 index 사용하는 경우 |
| `index` | index full scan |
| `ALL` | table full scan |

### possible_keys
사용 가능한 인덱스 리스트

### key
현재 쿼리에서 사용된 인덱스

### key_len
인덱스 사용시에는 인덱스 전체를 사용하거나 일부 인덱스만 사용하는데 사용한 인덱스의 byte 수

### ref
테이블 조인을 수행할 때 어떤 조건으로 해당 테이블에 액세스되었는지 알려주는 정보

### rows
해당 쿼리를 수행할때 접근하는 데이터의 row수를 예측하는 항목

### filtered
해당 쿼리가 DB 엔진으로 가져온 데이터 대상으로 필터 조건에 따라 어느 비율로 데이터 제거했는지 의미  
ex) DB엔진에서 100건으로 데이터를 가져와서 where문으로 10건으로 필터링 → 10.00(%)

### extra
부가적인 정보를 표시

| 종류 | 설명 |
| ------ | -------- |
| Distinct | 중복 제거. distinct나 union문에서 출력 |
| Using where | where절 조건으로 데이터를 추출 |
| `Using index`{:.block-blue} | 물리적인 데이터 파일 읽지 않고 인덱스만 읽어서 처리. 커버링 인덱스 |
| `Using temporary` | 데이터 중간 결과를 저장하기 위해 임시테이블을 생성<br>주로 distinct, group by, order by시 출력 |
| `Using filesort` | 정렬을 위해 데이터를 메모리에 올리고 정렬 수행 |
| Using join buffer | join을 위해 중간 데이터 결과를 저장하는 join buffer를 이용 |
| Using union | index merge - 인덱스들을 모두 결합하여 데이터 접근 (or문) |
| Using intersect | index merge - 인덱스들을 교집합으로 추출 (and문) |
| Using sort_union | index merge - where절의 or구문이 동등조건이 아닐 때 |
| Using index condition | 필터 조건을 스토리지 엔진으로 전달하여 추출 |
| `Using index for group-by`{:.block-blue} | group by나 distinct 시 인덱스로 정렬 수행 |
| Not exists | 하나의 일치하는 행을 찾으면 추가로 행을 더 검색하지 않아도 될 때 |

## 좋고 나쁨을 판단하는 기준
명확하게 선을 그어 구분하기는 어렵지만 select_type, type, extra를 주로 참고한다.  
대체로 성능이 좋은 경우에는 `파란색`{:.block-blue}, 좋지 않은 경우에는 `빨간색`으로 표시하였다.

## 프로파일링
실행 계획과 비슷하게 실행된 쿼리에 대한 프로파일링을 확인하는 방법도 있다.  
profiling 변수를 1로 설정하고 쿼리를 실행하면  
show profile 명령어를 통해 프로파일링 결과를 확인할 수 있다.

```sql
mysql> SET profiling = 1;
Query OK, 0 rows affected (0.00 sec)

mysql> DROP TABLE IF EXISTS t1;
Query OK, 0 rows affected, 1 warning (0.00 sec)

mysql> CREATE TABLE T1 (id INT);
Query OK, 0 rows affected (0.01 sec)

mysql> SHOW PROFILES;
+----------+----------+--------------------------+
| Query_ID | Duration | Query                    |
+----------+----------+--------------------------+
|        0 | 0.000088 | SET PROFILING = 1        |
|        1 | 0.000136 | DROP TABLE IF EXISTS t1  |
|        2 | 0.011947 | CREATE TABLE t1 (id INT) |
+----------+----------+--------------------------+
3 rows in set (0.00 sec)

mysql> SHOW PROFILE;
+----------------------+----------+
| Status               | Duration |
+----------------------+----------+
| checking permissions | 0.000040 |
| creating table       | 0.000056 |
| After create         | 0.011363 |
| query end            | 0.000375 |
| freeing items        | 0.000089 |
| logging slow query   | 0.000019 |
| cleaning up          | 0.000005 |
+----------------------+----------+
7 rows in set (0.00 sec)

mysql> SHOW PROFILE FOR QUERY 1;
+--------------------+----------+
| Status             | Duration |
+--------------------+----------+
| query end          | 0.000107 |
| freeing items      | 0.000008 |
| logging slow query | 0.000015 |
| cleaning up        | 0.000006 |
+--------------------+----------+
4 rows in set (0.00 sec)
```