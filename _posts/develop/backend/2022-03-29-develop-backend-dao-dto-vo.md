---
layout: post
title: DAO, DTO, VO 개념 및 차이
sitemap: true
hide_last_modified: false
categories:
  - develop
  - backend
---

# DAO, DTO, VO 개념 및 차이

## DAO (Data Access Object)
DAO는 Data Access Object의 약자로 `실제로 데이터에 접근하는 객체`를 말한다.  
직접 DB에 접근하여 데이터의 삽입, 조회, 갱신, 삭제 등의 작업을 수행한다.  

`데이터베이스 처리를 위한 로직과 비즈니스 로직을 분리`{:.block-blue}하기 위해 사용한다.

```java
public class MemberDaoImpl implements MemberDao {
  private DBUtil dbUtil = DBUtil.getInstance();
  private static MemberDao memberDao = new MemberDaoImpl();
  private MemberDaoImpl() {}
  public static MemberDao getMemberDao() {
    return memberDao;
  }

  @Override
  public void registerMember(MemberDto memberDto) throws SQLException {
    Connection conn = null;
    PreparedStatement pstmt = null;
    try {
      conn = dbUtil.getConnection();
      StringBuilder registerMember = new StringBuilder();
      registerMember.append("insert into member (userid, username, userpwd, email, joindate) \n");
      registerMember.append("values (?, ?, ?, ?, now())");
      pstmt = conn.prepareStatement(registerMember.toString());
      pstmt.setString(1, memberDto.getUserId());
      pstmt.setString(2, memberDto.getUserName());
      pstmt.setString(3, memberDto.getUserPwd());
      pstmt.setString(4, memberDto.getEmail());
      pstmt.executeUpdate();
    } finally {
      dbUtil.close(pstmt, conn);
    }
  }
}
```

## DTO (Data Transfer Object)
DTO는 Data Transfer Object의 약자로 `데이터 교환을 위한 객체`를 말한다.  
DTO는 로직을 가지지 않는 데이터 객체이고, getter/setter 메소드만을 가지고 있다.  

보통 `DB에서 데이터를 얻어 Service나 Controller 등으로 보낼 때`{:.block-blue} 사용한다.
```java
public class MemberDto {
  private String userName;
  private String userId;
  private String userPwd;
  private String email;
  private String joinDate;

  public String getUserName() {
    return userName;
  }
  public void setUserName(String userName) {
    this.userName = userName;
  }
  public String getUserId() {
    return userId;
  }
  public void setUserId(String userId) {
    this.userId = userId;
  }
  public String getUserPwd() {
    return userPwd;
  }
  public void setUserPwd(String userPwd) {
    this.userPwd = userPwd;
  }
  public String getEmail() {
    return email;
  }
  public void setEmail(String email) {
    this.email = email;
  }
  public String getJoinDate() {
    return joinDate;
  }
  public void setJoinDate(String joinDate) {
    this.joinDate = joinDate;
  }
}
```

## VO (Value Object)
VO는 `값을 표현하기 위한 객체`이다.  
단순히 값을 표현하기 위해 사용하며 getter만 존재한다. (read-only 특성을 가짐)  

VO는 DTO와 혼용되어 사용되기도 하는데 DTO는 인스턴스 개념이고, VO는 리터럴 값 개념이다.  
