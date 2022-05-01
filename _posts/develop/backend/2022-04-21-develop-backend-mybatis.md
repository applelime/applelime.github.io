---
layout: post
title: MyBatis 사용하기
sitemap: true
hide_last_modified: false
categories:
  - develop
  - backend
---

# MyBatis 사용하기
* toc
{:toc .large-only}

MyBatis는 `Java Object와 SQL문 사이의 자동 Mapping 기능을 지원`하는 ORM Framework이다.  

MyBatis를 사용하면 `SQL을 별도의 파일로 분리해서 관리`{:.block-blue}하므로  
- 복잡한 JDBC 코드를 들어내어 **자바 코드가 간결**해진다.
- SQL 변경이 있어도 자바 코드를 수정하거나 **새로 컴파일하지 않아도 된다.**
- **SQL 작성과 관리**를 개발자가 아닌 DBA와 같은 **다른 사람에게 맡길 수 있다.**

## 기본 세팅
### Dependency 추가
Maven기준으로 pom.xml에 dependency를 추가하자.

```xml
<dependency>
  <groupId>org.mybatis</groupId>
  <artifactId>mybatis</artifactId>
  <version>${mybatis-version}</version>
</dependency>
```

### Mappper 설정
실제 동작할 SQL문을 세팅한다.  

`id`는 `해당 SQL문을 찾기 위해 사용되는 식별자`{:.block-blue}  
`parameterType`은 `parameter로 사용할 타입`{:.block-blue}  
`resultType`은 `return 타입`{:.block-blue} 이라고 보면 된다.

더 자세한 내용은 [공식 문서](https://mybatis.org/mybatis-3/ko/sqlmap-xml.html)에 잘 나와있다.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper
 PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
 "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
 
<mapper namespace="com.mvc.guestbook.model.dao.MemberDao">
  <insert id="registerMember" parameterType="member">
  insert into member (userid, username, userpwd, email, joindate)
  values(#{userId}, #{userName}, #{userPwd}, #{email}, now())
  </insert>
  
  <select id="login" parameterType="map" resultType="member">
  select username, userid, email
  from member
  where userid = #{userId} and userpwd = #{userPwd}
  </select>
</mapper>
```

## MyBatis 사용
### Java에서의 기본 세팅
모든 MyBatis 기능은 `SqlSessionFactory 인스턴스`를 생성하여 사용한다.  
기본 디렉토리는 `src/main/resources/`{:.block-blue}이므로 여기에 config파일을 위치시키면 된다.

```java
String resource = "mybatis-config.xml";
InputStream inputStream = Resources.getResourceAsStream(resource);
SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);
```

### MyBatis 설정 파일
```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
"http://mybatis.org/dtd/mybatis-3-config.dtd">

<configuration>
  <properties resource="dbinfo.properties"/>

  <typeAliases>
    <typeAlias type="com.mvc.guestbook.model.MemberDto" alias="member" />
    <typeAlias type="com.mvc.guestbook.model.GuestBookDto" alias="guestbook" />
    <typeAlias type="com.mvc.guestbook.model.FileInfoDto" alias="fileinfo" />
  </typeAliases>
    
  <environments default="development">
    <environment id="development">
      <transactionManager type="JDBC"/>
      <dataSource type="POOLED">
        <property name="driver" value="${driver}"/>
        <property name="url" value="${url}"/>
        <property name="username" value="${dbid}"/>
        <property name="password" value="${dbpwd}"/>
      </dataSource>
    </environment>
  </environments>

  <mappers>
    <mapper resource="guestbook.xml" />
    <mapper resource="member.xml" />
  </mappers>
</configuration>
```
크게는 typeAlias, dataSource, mapper 3가지를 설정해야한다.  
`typeAlias`는 `자바 타입에 대한 별칭`{:.block-blue}으로 타이핑을 줄이기 위해 사용한다.  
`dataSource`는 `ConnectionPool을 사용하기 위해 DB 정보를 세팅`{:.block-blue}해야하고,  
`mapper`는 `실제 매핑하여 동작할 SQL문`{:.block-blue}이 위치한다.

### 사용하기
위에서 만들어둔 Java 파일의 `SqlSessionFactory에서 openSession 메소드를 호출`하면  
`SqlSession 객체`{:.block-blue}를 받아올 수 있다.

DAO 객체에서 기존 Connection을 가져오는 것처럼 SqlSession 객체를 받아와서  
`Mapper xml에 설정해둔 id`로 `해당 sql문을 실행`{:.block-blue}한다.  

openSession 메소드로 sqlSession을 받아올 때 인자값을 설정하지 않으면  
autoCommit은 false이므로 해당 내용을 반영하고 싶을때에는 commit를 수동으로 해야한다.
```java
@Repository
public class MemberDaoImpl implements MemberDao {
  private final String NAMESPACE = "com.mvc.guestbook.model.dao.MemberDao.";

  @Override
  public void registerMember(MemberDto memberDto) throws SQLException {
    try(SqlSession sqlSession = SqlMapConfig.getSqlSession()) {
      sqlSession.insert(NAMESPACE + "registerMember", memberDto);
      sqlSession.commit();
    }
  }

  @Override
  public MemberDto login(Map<String, String> map) throws SQLException {
    try(SqlSession sqlSession = SqlMapConfig.getSqlSession()) {
      return sqlSession.selectOne(NAMESPACE + "login", map);
    }
  }
}
```

## Spring에서의 MyBatis 사용
Spring에서는 MyBatis를 조금 더 간편하게 사용할 수 있다.

### Dependency 추가
`mybatis-spring` Dependency를 추가한다.
```xml
<dependency>
  <groupId>org.mybatis</groupId>
  <artifactId>mybatis-spring</artifactId>
  <version>${mybatis-spring-version}</version>
</dependency>
```

### MyBatis 설정
`root-context.xml`에 아래 내용을 추가하자.

```xml
...
  <!-- dataSource 설정 -->
  <bean id="ds" class="org.springframework.jndi.JndiObjectFactoryBean">
    <property name="jndiName" value="java:comp/env/jdbc/scott"></property>
  </bean>

  <!-- SqlSessionFactory 생성 -->
  <!-- dataSource, typeAliase, mapper 세팅 -->
  <bean id="sqlSessionFactoryBean" class="org.mybatis.spring.SqlSessionFactoryBean">
    <property name="dataSource" ref="ds"/>
    <property name="typeAliasesPackage" value="com.mvc.guestbook.model"/>
    <property name="mapperLocations" value="classpath:mapper/*.xml"/>
  </bean>

  <!-- mapper 스캔 -->
  <mybatis-spring:scan base-package="com.mvc.guestbook.model.mapper"/>

  <!-- transactionManager -->
  <bean id="transactionManager" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
    <property name="dataSource" ref="ds" />
  </bean>
    
  <!-- 어노테이션으로 Transaction 제어 -->
  <tx:annotation-driven transaction-manager="transactionManager"/>
...
```

주석으로 어느정도 설명을 달아놓았다.  
`dataSource`는 [기존 방식](/develop/backend/2022-03-30-develop-backend-db-connection-pool/)을 이용하여 생성하였는데 아래처럼 다른방법으로 생성하여도 상관없다.  
```xml
<bean id="ds" class="org.apache.commons.dbcp.BasicDataSource">
  <property name="driverClassName">
    <value>com.mysql.cj.jdbc.Driver</value>
  </property>
  <property name="url">
    <value>jdbc:mysql://127.0.0.1:3306/scottdb?serverTimezone=UTC</value>
  </property>
  <property name="username">
    <value>scott</value>
  </property>
  <property name="password">
    <value>tiger</value>
  </property>
</bean>
```

`SqlSessionFactory`를 생성하면서 `dataSource, typeAlias, mapper`{:.block-blue}를 설정해주었고,  
`Mapper 클래스가 있는 패키지를 지정`{:.block-blue}하여 `Mapper를 스캔`하도록 설정하였다.  
이후 `TransactionManager를 추가`해주었고, `어노테이션으로 제어`할 수 있도록 하였다.

### 사용하기
기존의 DAO 클래스는 이제 전부 사용하지 않고 이를 대체할 `Mapper 인터페이스를 추가`한다.  
```java
@Mapper
public interface MemberMapper {
  MemberDto login(Map<String, String> map) throws Exception;
  
  int idCheck(String checkId) throws Exception;
  void registerMember(MemberDto memberDto) throws Exception;
  
  List<MemberDto> listMember() throws Exception;
  MemberDto getMember(String userId) throws Exception;
  void updateMember(MemberDto memberDto) throws Exception;
  void deleteMember(String userId) throws Exception;
}
```

그리고 서비스에서 DAO가 아닌 `Mapper를 주입` 후 해당 메소드를 실행하면 된다.  
이 때 `메소드의 이름과 매개변수`는 `Mapper XML의 ID, parameterType`{:.block-blue}과 동일해야 한다.

TransactionManager 세팅도 해주었기 때문에 `@Transactional 어노테이션`을 사용하면  
해당 작업들이 정상적으로 실행되면 자동 commit, 문제가 발생하면 rollback을 시켜준다.
```java
@Service
public class MemberServiceImpl implements MemberService {
  @Autowired
  private MemberMapper memberMapper;
    
  @Override
  public int idCheck(String checkId) throws Exception {
    return memberMapper.idCheck(checkId); // 0 or 1
  }

  @Override
  @Transactional
  public void registerMember(MemberDto memberDto) throws Exception {
    memberMapper.registerMember(memberDto);
  }

  @Override
  public MemberDto login(Map<String, String> map) throws Exception {
    return memberMapper.login(map);
  }
    
  @Override
  public List<MemberDto> listMember() throws Exception {
    return memberMapper.listMember();
  }

  @Override
  public MemberDto getMember(String userId) throws Exception {
    return memberMapper.getMember(userId);
  }

  @Override
  @Transactional
  public void updateMember(MemberDto memberDto) throws Exception {
    memberMapper.updateMember(memberDto);
  }

  @Override
  @Transactional
  public void deleteMember(String userId) throws Exception {
    memberMapper.deleteMember(userId);
  }
}
```

## SpringBoot에서의 MyBatis 사용
SpringBoot에서는 설정이 더욱 간소화 되었다.  
`application.properties`에 dataSource와 myBatis 설정을 추가한다.
```properties
#DataBase Setting
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.datasource.url=jdbc:mysql://127.0.0.1:3306/scottdb?serverTimezone=UTC&useUniCode=yes&characterEncoding=UTF-8
spring.datasource.username=scott
spring.datasource.password=tiger

#MyBatis Setting
mybatis.type-aliases-package=com.mvc.guestbook.model
mybatis.mapper-locations=classpath:mapper/**/*.xml
```

실제 사용 코드는 Spring과 동일하므로 mapper에서 바로 메소드를 호출하면 된다.