# Facebook Clone

> **Facebook Minimalize Clone Coding**입니다.

- [완성된 사이트 이동하기](https://glacial-refuge-58656.herokuapp.com/)

- [Facebook 바로가기](https://www.facebook.com)의 보고 만든 사이트 입니다.

### [Github - TIL로 이동하기](https://github.com/engus93/TIL)

## 기능

### 반응형 페이지 (Responsive Web)

#### 0. Partials - Header

    0-1. Logo
        - Feed Main으로 이동
    0-2. Searching bar
        - 검색 가능
    0-3. Wait-Friend
        - 친구 요청 수락 거절 가능
    0-4 Log out 기능
        - Passport를 이용한 로그아웃 및 세션 제거

#### 1. Home

    1-1. 회원가입
        - axios를 통한 비동기 아이디 및 비밀번호 체크
    1-2. 로그인
        - crypto를 이용한 비밀번호 암호화 사용
        - Passport.js를 통한 로그인 및 세션 유지

#### 2. Feed Main

    2-1. Feed
        - Feed 추가 수정 삭제 동기식
        - Feed comment & 대댓글 추가 수정 삭제 axios를 이용한 비동기식
        - Axios와 event를 이용한 autoscroll 페이징
    2-2. Axios를 통한 aside 랜덤 유저 친구 추천
    3-3. Aside ad 광고 노출

#### 3. Feed User

    3-1. 자신과 다른 사용자의 페이지 구분
    3-2. 피드 & 댓글 & 대댓글 추가 수정 삭제
    3-3. Aside friend box에 내 친구들 표시
    3-4. Feed
        - Feed 추가 수정 삭제 동기식
        - Feed comment & 대댓글 추가 수정 삭제 axios를 이용한 비동기식
        - Axios와 event를 이용한 autoscroll 페이징

#### 4. Feed User Edit

    4-1. 프로필 & 마이페이지 커버 수정
        - Multer-s3를 이용해 Aws-s3 스토리지에 업로드
    4-2. 비밀번호 수정
        - Crypto를 이용한 비밀번호 암호화 복호화를 이용해 비밀번호 수정

#### 5. Feed Search

    5-1. 검색
        - 유저 및 피드에 해당 검색어가 있으면 데이터를 가져옴
        - Axios와 event를 이용한 autoscroll 페이징
    5-2. Axios를 통한 aside 랜덤 유저 친구 추천
    5-3. Aside ad 광고 노출

## 구성

#### 1. Node.js (Express)

#### 2. Mysql (Aws)

#### 3. S3 (Aws)

#### 4. Heroku

## 주로 사용한 기술

#### 1. babel

#### 2. eslint

#### 3. multer

#### 4. sass

#### 5. webpack

#### 6. passport

#### 7. crypto

#### 8. axios

#### 9. etc....
