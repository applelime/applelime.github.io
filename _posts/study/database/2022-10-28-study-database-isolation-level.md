---
layout: post
title: MySQL 트랜잭션 격리 수준 (Isolation Level)
sitemap: true
hide_last_modified: false
categories:
  - study
  - database
---

# MySQL 트랜잭션 격리 수준 (Isolation Level)
* toc
{:toc .large-only}

InnoDB에서는 4가지 트랜잭션 격리수준을 제공한다.
- READ UNCOMMITTED
- READ COMMITTED
- REPEATABLE READ
- SERIALIZABLE

## 격리 수준에 따라 발생 가능한 문제점
대표적으로 Dirty Read, Non-Repeatable Read, Phantom Read가 발생하는데  
격리 수준에 따른 발생 여부를 정리하면 다음 표와 같다.

| Isolation Level | Dirty Read | Non-Repeatable Read | Phantom Read |
| :---: | :---: | :---: | :---: |
| READ UNCOMMITTED | O | O | O |
| READ COMMITTED | | O | O |
| REPEATABLE READ | | | O |
| SERIALIZABLE | | | |

`Dirty Read`는 `다른 트랜잭션에 의해 수정되었지만 아직 커밋되지 않은 데이터를 읽는 것`{:.block-blue}을 말한다.  
즉 데이터가 나타났다 안 나타났다 하는 현상이 발생하며, READ UNCOMMITTED에서 발생한다.

`Non-Repeatable Read`는 `반복된 읽기 시에 결과가 다르게 나타나는 현상`{:.block-blue}을 말한다.  
READ COMMITTED에서 발생한다.  

`Phantom Read`는 `다른 트랜잭션에서 수행한 작업으로 인해 레코드가 보였다 안 보였다 하는 현상`{:.block-blue}을 말한다.  
REPEATABLE READ에서 발생하나, InnoDB에서는 발생하지 않는다.  

각각에 대한 자세한 설명은 아래에서 하도록 하겠다.


## READ UNCOMMITTED
말 그대로 `커밋되지 않은 내용을 읽을 수 있는 격리수준`이다.  
다른 트랜잭션에서 데이터를 수정할 경우 커밋되지 않은 데이터라도 조회가 가능하여 `Dirty Read가 발생`{:.block-green}한다.  
조회 시에 lock을 사용하지 않으며 이 격리 수준에서는 데이터 정합성에 문제가 발생할 수 있어 거의 사용하지 않는다.

## READ COMMITTED
마찬가지로 이번에는 `커밋된 내용을 읽을 수 있는 격리수준`이다.  
`가장 최신의 스냅샷을 조회`{:.block-green}하기 때문에 다른 트랜잭션에서 데이터를 수정하여 커밋한 경우,  
같은 쿼리라도 `트랜잭션 내에서 결과값이 다르게 나타날 수 있다. (Non-Repeatable Read)`{:.block-green}

## REPEATABLE READ
REPEATABLE READ는 `첫 번째 읽기 작업이 수행될 때 해당 시점 기준으로 스냅샷을 조회`하여  
다른 트랜잭션에서 커밋하더라도 항상 동일한 결과값을 보여줄 수 있게 된다.  
현재 `InnoDB에서 기본 격리 수준`{:.block-green}으로 사용되고 있다.

### Phantom Read의 발생
스냅샷으로만 조회한다면 다른 세션에서 데이터를 insert하더라도 Phantom Read가 발생하지 않는 것 아닌가? 생각할 수 있다.  
하지만 SELECT ... FOR UPDATE 구문을 사용하게 되면 exclusive lock을 획득하고 스냅샷이 아닌 가장 최신 데이터를 조회한다.    
이렇게 되면 데이터가 보였다 안 보였다 하는 Phantom Read가 발생할 수 있다.

### InnoDB에서의 Phantom Read의 해결
InnoDB에서는 `next-key lock을 사용하여 이 문제를 해결`하였다.  
next-key lock은 row lock과 gap lock을 합친 락으로 실제 레코드와 그 사이의 갭을 다 잠궈버린다.

예를 들어 SELCT * FROM child WHERE id > 100 FOR UPDATE; 구문을 수행할 때  
id가 90, 102인 데이터가 child에 들어있다고 하면  
102는 row lock (record lock)이 걸리고, 100~102와 102~에는 gap lock이 걸리게 되어  
id가 101인 데이터는 insert할 수 없게 되는 것이다.  

## SERIALIZABLE
이 격리 수준에서는 `shared lock을 사용`하기 때문에 `동시에 다른 트랜잭션에서 수정이 불가능`하다.  
가장 엄격하고 안전한 격리 수준이지만 처리 성능이 떨어지게 되므로 거의 사용하지 않는다.