---
layout: post
title: DB Connection Pool 사용하기
sitemap: true
hide_last_modified: false
categories:
  - develop
  - backend
---

# DB Connection Pool 사용하기
기존의 DB 연결 방식은  
`작업마다 Connection 객체를 받아와서 작업 후 다시 연결을 끊어주고를 반복`  
하기 때문에 매우 비효율적이고 느리다.  

이런 문제를 해결하기 위해  
`웹 컨테이너(WAS)가 실행될때 미리 Connection 객체를 생성하여 저장해 두었다가 필요할 때 가져다 쓰고 반환`{:.block-blue}하는 Connection Pool을 사용한다.  

## 기존의 DB 연결 방식
```java
Connection conn = null;
PreparedStatement pstmt = null;
ResultSet rs = null;

try {
  conn = DriverManager.getConnection("jdbc:mysql://127.0.0.1:3306/webdb?serverTimezone=UTC&useUniCode=yes&characterEncoding=UTF-8", "scott", "tiger");
  
  String sql = "select cnt from counter";
  pstmt = conn.prepareStatement(sql);
  rs = pstmt.executeQuery();
  rs.next();
  cnt = rs.getInt(1);
  pstmt.close();
  
  sql = "update counter set cnt = cnt + 1";
  pstmt = conn.prepareStatement(sql);
  pstmt.executeUpdate();
} catch (SQLException e) {
  e.printStackTrace();
} finally {
  try {
    if(rs != null)
      rs.close();
    if(pstmt != null)
      pstmt.close();
    if(conn != null)
      conn.close();
  } catch (SQLException e) {
    e.printStackTrace();
  }
}
```

## Connection Pool 사용하기
### DataSource
Connection Pool을 사용하기 위해 DataSource를 사용한다.  
DataSource는 `Connection을 관리하기 위한 객체`로 javax.sql 패키지에 들어있는데,  
자체적으로 `Connection Pool을 구현하고 있어 이를 이용해 Connection을 획득, 반납`{:.block-blue}한다.

### JNDI
`JNDI (Java Naming and Directory Interface)`는  
`디렉터리 서비스에서 제공하는 데이터 및 객체를 발견하고 참조하기 위한 API`{:.block-blue}로,  
JNDI를 사용하여 미리 생성된 DataSource를 찾아 사용할 수 있다.

### 1. context.xml 설정  
Connection Pool은 서버에서 관리하는 자원으로, Connection Pool에 관한 설정이 필요하다.  
TomCat에서는 `WebContent/META-INF/` 폴더에 아래와 같이 `context.xml을 추가`한다.  

- **maxIdle** : 일반적으로 활용할 Connection 수
- **maxTotal** : 최대로 활용할 Connection 수
- **maxWaitMillis** : Connection 사용 요청 있을 때의 대기 시간.  
1000 = 1초이며, 해당 시간 내에 Connection을 얻지 못하면 Exception이 발생한다.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Context>
  <Resource name="jdbc/scott" auth="Container" type="javax.sql.DataSource" 
    maxTotal="100" maxIdle="30" maxWaitMillis="10000" 
    username="scott" password="tiger" driverClassName="com.mysql.cj.jdbc.Driver" 	
    url="jdbc:mysql://localhost:3306/webdb?serverTimezone=UTC&amp;useUniCode=yes&amp;characterEncoding=UTF-8"/> 
  <WatchedResource>WEB-INF/web.xml</WatchedResource>
</Context>
```

### 2. Connection 가져오기
```java
public Connection getConnection() throws SQLException {
    try {
      Context context = new InitialContext();
      Context rootContext = (Context) context.lookup("java:comp/env");
      DataSource dataSource = (DataSource) rootContext.lookup("jdbc/scott");
      return dataSource.getConnection();
    } catch (NamingException e) {
      e.printStackTrace();
    }
    return null;
  }
```

1. Connection Pool에 접근하려면 `JNDI 서비스를 사용`해야 하는데 이를 위해 `Context 객체가 필요`{:.block-blue}하다.  
2. Context 객체를 생성 후 lookup 메소드를 통해 리소스를 찾는데,  
`TomCat에서 리소스를 관리하는 가상의 디렉터리`는 `"java:comp/env"`{:.block-blue}이다.
3. `찾으려는 리소스의 이름`은 아까 등록한 name 그대로 `"jdbc/scott"`{:.block-blue} 이므로 이를 찾는다.  
lookup 메소드의 리턴타입은 Object 이므로 타입 변환이 필요하다.

Connection의 사용과 반납은 기존과 동일하다.