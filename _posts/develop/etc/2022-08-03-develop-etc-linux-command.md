---
layout: post
title: Linux 기본 명령어 정리
sitemap: true
hide_last_modified: false
categories:
  - develop
  - etc
---

# Linux 기본 명령어 정리
* toc
{:toc .large-only}

linux에서 자주 사용되는 기본적인 명령어들을 정리해보았다.  
명령어가 꽤나 많아서 비슷한 명령어끼리 모아보았다.

## 완전 기본 명령어
### man (manual)
`다른 명령어의 사용법을 알고 싶을 때` 사용한다.  
help와 비슷하다고 보면 된다.

### clear
`현재 터미널 내용을 지운다.`


## 디렉토리 관련
### pwd (print working directory)
`현재 경로 확인`   
기본적으로 모든 사용자 디렉토리는 /home/ 밑에 존재한다.  

### cd (change directory)
`현재 디렉토리 변경`

- . : 현재경로  
- .. : 상위경로  
- ~ : home 디렉토리
- \- : 이전경로

그냥 cd만 쳐도 home 디렉토리로 이동한다.

### ls (list)
`현재 디렉토리의 파일을 출력`  
  
자주 쓰는 옵션을 정리하면 다음과 같다.
- l 옵션 : long. 자세히 보기
- a 옵션 : all. 숨겨진 파일까지 보기
- i 옵션 : 파일의 inode까지 표시
- h 옵션 : human. 사람이 보기 편하도록 K,M,G 등의 단위를 사용하여 파일 크기 표시

보통 ls -al이나 ll 명령어를 자주 사용하는 것 같다.  
(ll은 기본 명령어는 아니나 alias로 되어있는 경우가 많다.  
맥에서 alias ll을 입력하면 실제로는 ls -lh 명령어임을 알 수 있다.)  

추가로 설명하자면  
리눅스에서 .으로 시작하는 파일은 숨김파일로 a옵션을 사용해야만 확인할 수 있다. (예시로 .gitignore)  
  
l 옵션을 사용하여 상세히 표시하면 아래처럼 표시되는데
```
-rw-r--r--   1 misty  staff     71  8 31 17:10 robots.txt
-rw-r--r--   1 misty  staff     71  8 31 17:10 robots.xml
-rw-r--r--   1 misty  staff    621  8 31 17:10 search.html
-rw-r--r--   1 misty  staff    978  8 31 17:10 sitemap.xml
drwxr-xr-x   4 misty  staff    128  9  3 18:39 vendor
drwxr-xr-x   5 misty  staff    160  8 31 17:10 workers-site
-rw-r--r--   1 misty  staff    582  8 31 17:10 wrangler.toml
```
순서대로  
`권한 / 하드링크수 / 소유자 사용자명 / 소유자 그룹명 / 파일크기 / 수정일시 / 파일명`{:.block-blue}이다.  
권한은 아래 chmod 명령어, 하드링크는 ln 명령어에서 설명하겠다.

### mkdir (make directory)
`디렉토리 생성`  
p옵션 사용 시 존재하지 않는 중간의 디렉토리를 자동으로 생성할 수 있다.  

mkdir dir3  
mkdir -p dir4/subdir1/subdir2  

### cp (copy)
`복사`  
목적지를 폴더로 설정하면 해당 폴더로 복사도 가능하다.  

cp file1.txt file2.txt  
cp file1.txt /dir1  

### mv (move)
`이동`  
같은 폴더 내로 이동하면 rename으로 동작한다.  

mv file2.txt file2.txt  
mv file2.txt /dir1  

### rm (remove)
`삭제`    
r옵션 (recursive) 사용시 내부에 있는 폴더들까지 삭제할 수 있다.  
rm -rf / 처럼 사용할 경우 모든 파일을 삭제할 수 있으므로 주의해야 한다.  

rm file2.txt  
rm -r /dir2

### ln (link)
`링크 생성`  
링크에는 크게 하드링크와 소프트링크가 있다.  

- `hard link`{:.block-green}  
`실제 파일`{:.block-blue}을 가리키는 링크 파일을 추가로 생성  
  
  하드 링크는 실제로도 같은 파일이며 inode가 같다.  
  쉽게 말해 같은 파일을 가리키는 링크 파일이 생성된다고 보면 되고, 그렇기에 하드 링크 파일을 수정하면 원본 파일이 수정된다.  

  ls 명령어에서 해당 파일의 하드링크 수(즉 ref count)를 확인할 수 있다.  
  하드 링크 생성 시에는 실제 파일이 복사되는 개념이 아니므로 파일 용량만큼 증가하지 않으며,  
  파일을 삭제할 경우에도 원본 파일이 삭제되는 것이 아니라 링크 파일만 삭제된다.      
  즉 ref count가 감소되는 개념이며, 이 값이 0이 되는 경우(마지막 파일 삭제 시) 실제로 파일이 삭제되는 것이다.
  
  ln file1 myfile

- `soft link (symbolic link)`{:.block-green}  
쉽게 말해 `바로가기`{:.block-blue} 생성  

  ln -s source target  
  ln -s library.0.1.so library.so  
  ln -s library.0.2.so library.so 

### find
`검색`  
find 경로 조건 target 형태로 사용한다.
```
find . -name system.log
find . -type file -name "*.txt"
find . -type directory -name "*2"
```
검색조건이 굉장히 많으니 찾아보자.

## 파일 관련
### open
`파일이나 폴더 열기`

### which
`실행 가능한 명령어의 위치를 찾는다.`  
which code  
which node

### echo
`지정한 문자열, 텍스트를 출력`   
\>나 \>\>와 같이 주로 사용한다.  

- \> : 해당 파일에 저장
- \>\> : 해당 파일 마지막에 추가(append)  

echo "hello world" > new_file3.txt 라면  
hello world 문구를 new_file3.txt로 저장하겠다는 뜻이다.

### touch
`파일 생성`  
touch new_file.txt

### cat
`파일 출력`  
cat new_file.txt

### head, tail
`파일의 시작 또는 끝 일부를 출력`하는 명령어.  
라인수를 설정하지 않으면 기본은 10라인이다.

head test.c  
head -5 test.c
tail test.c  
tail -n 20 -f test.c

### vi, vim
`리눅스 기본 에디터 vi를 이용해 파일 열기`  
자세한 내용은 [vim 사용하기](/develop/etc/2022-08-25-develop-etc-vim/)를 읽어보자.  

vi test.log

### less
`파일의 내용을 한 화면에 보여주는 명령어`  

vi의 경우 해당 파일을 읽어 메모리에 올리게 되는데  
로그파일의 용량이 큰 경우 (예를 들어 10기가) 문제가 발생할 수 있다.  

이런 경우 less나 head, tail 등을 사용하게 된다.  
less는 전체 파일을 읽지 않고 `현재 보이는 크기만큼만 메모리에 올린다.`{:.block-blue}

less test.c  

## 유저/권한 관련
### adduser, deluser, addgroup, delgroup
`사용자 추가/삭제, 그룹 추가/삭제`  

adduser 사용자id  
deluser 사용자id  

### su (substitute user)
`다른 사용자로 로그인`  
아무것도 입력하지 않으면 root 사용자로 로그인 한다. (su / su -)  
l옵션 (login) 또는 -를 사용하여 다른 사용자로 로그인한다.  

su -  
su - mysql  
su -l mysql

### w, who  
`접속한 계정정보, 로그인시간, 현재 어떤 작업 진행중인지` 등을 확인

### sudo (super user do)
`root 권한으로 실행`  
/etc/sudoers에서 root 권한 부여할 계정을 등록할 수 있다.  

### chown
`파일, 디렉토리의 소유자 변경`  
-R 옵션 사용 시 하위 폴더와 하위 파일까지 한번에 적용할 수 있다.  
소유권을 변경하는 명령어이므로 root 권한이 필요하여 sudo 명령어와 자주 사용된다.  

sudo chown user:group target  
sudo chown -R user1:group1 /data/log

### chmod
`파일, 디렉토리에 권한을 부여할 때 사용`  

권한에 대해 조금 더 자세히 설명하자면 권한은 10자리로 구성되는데  
`1번째 자리`{:.block-blue}는 `파일의 종류`{:.block-green}를 표시하고,  
`이후 3자리씩`{:.block-blue} `user, group, other의 권한`{:.block-green}을 표시한다.

파일의 종류로는  
- \-는 일반 파일
- d는 폴더 (directory)
- l은 링크 (link)
정도가 주로 표시된다.

이후 3자리씩은 각각 권한을 표시하는데  
rwx는 read, write, execute를 표현한다.  
<br>
  
즉. d`rwx``r-x`{:.block-blue}`r-x`{:.block-green}이라면  
해당 항목은 폴더(directory)이며,  
사용자는 read, write, execute가 모두 가능하고,  
같은 그룹이나 다른 사용자는 read와 execute만 가능하다는 뜻이다.  
<br>
  
이 부분을 이진수로 표현하여 `rwx의 각 자리에 4,2,1이라는 값을 부여`하여 이진수의 합으로 항목을 설정할 수 있다.  
즉 rwx로 설정하려면 4+2+1=7로 설정하면 되고,  
r-x로 설정하려면 4+1=5,  
rw-는 4+2=6으로 설정하면 된다.

```
chmod 775 : rwx rwx r-x
chmod 664 : rw- rw- r--

chmod 664 a.out
chmod g-x a.out
chmod o+w a.out
```
위와 같이 숫자를 이용하는 것 외에도 -와 +를 이용하여 권한 변경도 가능하다.   
group에 execute 권한을 제거 (-x), other에 write 권한 추가 (+w) 등으로도 사용 가능하다.

## 기타 자주 사용되는 명령어
### ps (process)
`현재 구동중인 프로세스 확인`  
ps -ef 하면 현재 모든 프로세스가 출력  
앞의 번호는 PID, 뒤에는 부모 프로세스의 PID

### kill
`해당 프로세스를 강제로 종료`  
kill -9 processID

### grep (global regular expression print)
`특정 문자열을 찾으려고 할때 사용한다.`  
보통 process list에서 원하는 process를 검색하기 위해 ps -ef | grep mysql 처럼 주로 사용
- n옵션 : 라인 표시
- i옵션 : 대소문자 구분x
- r옵션 : 폴더 안 까지 탐색. recursive

grep "world" *.txt  
grep -n "world" *.txt  
grep -ni "world" *.txt  
grep -nir "world" .  

### tar (tape archive)
`tar로 파일을 묶거나 해제할 때 사용`  
리눅스에서 파일을 묶을 때 자주 사용하는 명령어로 실제 압축은 하지 않는다.  
압축이 필요할 경우 gzip으로 주로 압축하며 z옵션을 사용하여 압축까지 할 수 있다.  
이 경우 file.tar.gz 와 같은 파일이 만들어 지게 된다.  

- c : create (압축)
- v : view. 진행 과정을 표시
- f : file명을 명시
- z : gzip으로 압축
- x : extract. 압축해제

tar cvfz backup.tar.gz ./dir3 ./file3 ./system.log  

### vmstat (virtual memory stat)
`리눅스 자원 사용률 모니터링`  
CPU, 메모리, IO 상태를 요약한 정보로 간략하게 확인할 수 있다.

### top
`cpu, memory 사용량 확인`

### export, unset, env
`환경변수 설정, 삭제, 확인`  

export MY_DIR="dir1"  
cd $MY_DIR  
unset MY_DIR  
env

### uname -a
`시스템정보 간략 출력`

### hostname
`hostname을 출력`  
여기서 출력되는 hostname은 /etc/hostname에서 변경가능하다.

### reboot
`재부팅`

### halt -p
`완전종료`