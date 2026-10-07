# mini-watch-day04

React와 Flask를 이용해 일반 서비스의 요청 기록을 확인하고 관찰 메모를 관리하는 감시 대시보드 프로젝트입니다.

기존 일반 게시판 서비스는 유지하고, 감시 서비스는 React 프론트엔드와 Flask API로 구성했습니다. 데이터는 PostgreSQL에 저장하며 React는 DB에 직접 접근하지 않고 Flask API를 통해 데이터를 조회·변경합니다.

## 1. 프로젝트 구성

```text
mini-watch-day04/
├─ general/
│  └─ ...                         # 기존 게시판과 요청 기록 전송 기능
├─ monitor/
│  ├─ backend/
│  │  ├─ app.py
│  │  ├─ auth_helpers.py
│  │  ├─ create_user.py
│  │  ├─ db.py
│  │  ├─ error_handlers.py
│  │  ├─ event_rules.py
│  │  ├─ note_rules.py
│  │  ├─ routes/
│  │  │  ├─ auth.py
│  │  │  ├─ events.py
│  │  │  └─ notes.py
│  │  ├─ repositories/
│  │  │  ├─ users.py
│  │  │  ├─ events.py
│  │  │  └─ notes.py
│  │  ├─ sql/
│  │  │  ├─ create_database.sql
│  │  │  ├─ day04.sql
│  │  │  └─ http_events.sql
│  │  ├─ .env.example
│  │  └─ requirements.txt
│  └─ frontend/
│     ├─ src/
│     │  ├─ App.jsx
│     │  ├─ api/
│     │  │  ├─ auth.js
│     │  │  ├─ events.js
│     │  │  └─ notes.js
│     │  └─ components/
│     │     ├─ LoginForm.jsx
│     │     ├─ EventList.jsx
│     │     ├─ NoteList.jsx
│     │     ├─ NoteDetail.jsx
│     │     ├─ NoteForm.jsx
│     │     └─ DeleteConfirm.jsx
│     ├─ package.json
│     ├─ package-lock.json
│     └─ vite.config.js
├─ .gitignore
└─ README.md
```

## 2. 사용 기술

- 일반 서비스: Flask, PostgreSQL, psycopg
- 감시 백엔드: Flask, PostgreSQL, psycopg, Werkzeug, Flask session
- 감시 프론트엔드: React, Vite, JavaScript, Fetch API
- 데이터 흐름: React → Flask API → PostgreSQL

## 3. 설치 준비

필요한 프로그램:

- Python 3
- PostgreSQL
- Node.js
- npm

프로젝트 루트에서 가상환경을 생성합니다.

```cmd
python -m venv venv
```

Windows CMD:

```cmd
venv\Scripts\activate
```

Windows PowerShell:

```powershell
.\venv\Scripts\Activate.ps1
```

## 4. Python 패키지 설치

감시 백엔드 패키지를 설치합니다.

```cmd
pip install -r monitor\backend\requirements.txt
```

`requirements.txt`

```text
Flask==3.1.3
psycopg[binary]==3.2.10
python-dotenv==1.2.1
```

일반 서비스에 별도 `requirements.txt`가 있다면 해당 파일도 설치합니다.

## 5. PostgreSQL 준비

### 5-1. 데이터베이스 생성

PostgreSQL에서 다음 SQL을 실행합니다.

```sql
CREATE DATABASE monitor_db;
```

또는 다음 파일을 사용합니다.

```text
monitor/backend/sql/create_database.sql
```

### 5-2. 테이블 생성

`monitor_db`에 접속한 뒤 다음 테이블을 생성합니다.

```sql
CREATE TABLE IF NOT EXISTS http_events (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    occurred_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    method TEXT NOT NULL,
    path TEXT NOT NULL,
    status_code INTEGER NOT NULL,
    event_type TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS users (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS notes (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title TEXT NOT NULL,
    body TEXT NOT NULL
);
```

수업 준비본을 사용하는 경우 다음 파일을 실행합니다.

```text
monitor/backend/sql/day04.sql
```

## 6. 환경 변수 설정

`monitor/backend/.env.example`을 참고하여 같은 폴더에 `.env`를 생성합니다.

```env
DB_HOST=127.0.0.1
DB_PORT=5432
DB_NAME=monitor_db
DB_USER=postgres
DB_PASSWORD=YOUR_POSTGRES_PASSWORD
SECRET_KEY=CHANGE_ME_TO_YOUR_OWN_RANDOM_SECRET
```

설정값 용도:

| 설정값 | 용도 |
|---|---|
| DB_HOST | PostgreSQL 서버 주소 |
| DB_PORT | PostgreSQL 포트 |
| DB_NAME | 사용할 데이터베이스 이름 |
| DB_USER | PostgreSQL 사용자 |
| DB_PASSWORD | PostgreSQL 비밀번호 |
| SECRET_KEY | Flask session 서명용 비밀키 |

실제 `.env`에는 자신의 PostgreSQL 비밀번호와 32자 이상의 임의 `SECRET_KEY`를 사용합니다.

실제 `.env`는 Git에 포함하지 않습니다.

## 7. 테스트 계정 생성

감시 백엔드 폴더로 이동합니다.

```cmd
cd monitor\backend
python create_user.py
```

실습 계정 `operator`를 생성한 뒤 해당 계정으로 로그인합니다.

## 8. 서비스 실행

### 일반 서비스

새 터미널에서:

```cmd
cd general
python app.py
```

접속 주소:

```text
http://127.0.0.1:5100
```

### 감시 Flask API

새 터미널에서:

```cmd
cd monitor\backend
python app.py
```

접속 주소:

```text
http://127.0.0.1:5200
```

### React 감시 화면

새 터미널에서:

```cmd
cd monitor\frontend
npm install
npm run dev
```

접속 주소:

```text
http://localhost:5173
```

Vite의 `/api` 프록시를 사용하여 React의 API 요청을 Flask 5200 포트로 전달합니다.

## 9. 구현한 필수 기능

### 로그인

- React state로 아이디와 비밀번호 관리
- `POST /api/auth/login`으로 JSON 전송
- DB의 사용자 계정 조회
- `check_password_hash()`를 이용한 비밀번호 해시 검증
- 빈 입력은 `400`
- 잘못된 계정 정보는 `401`
- 성공 시 대시보드 표시
- 로그아웃 시 로그인 화면으로 이동

### 요청 기록 조회

- `GET /api/events`
- 일반 서비스에서 수집한 요청 기록 표시
- 요청 메서드 표시
- 요청 경로 표시
- 응답 상태 코드 표시
- 이벤트 종류와 시간 표시
- 요청 기록 새로고침 버튼 제공
- 빈 목록 및 실패 안내 처리

### 관찰 메모 CRUD

- `GET /api/notes` : 목록 조회
- `GET /api/notes/<id>` : 상세 조회
- `POST /api/notes` : 작성
- `PUT /api/notes/<id>` : 수정
- `DELETE /api/notes/<id>` : 삭제
- 메모 목록은 React state에 저장 후 `map()`으로 출력
- 메모 번호를 `key`로 사용
- 제목 선택 시 상세 조회
- 수정 시 기존 내용을 먼저 표시
- 수정 취소 시 DB 내용을 변경하지 않음
- 삭제 전 확인 화면 표시
- 삭제 취소 시 메모 유지
- 삭제 확정 시에만 API 호출
- 저장·수정·삭제 성공 후 목록을 다시 조회

### 입력 오류 처리

Flask에서 제목과 내용에 `strip()`을 적용한 뒤 검사합니다.

다음 경우 `400`을 반환합니다.

- 제목이 빈 값
- 내용이 빈 값
- 제목이 공백뿐인 값
- 내용이 공백뿐인 값
- JSON 형식이 올바르지 않은 경우

잘못된 수정 요청이 들어오면 기존 메모는 유지됩니다.

### 존재하지 않는 메모 처리

존재하지 않는 메모 번호에 대해 다음 요청은 `404`를 반환합니다.

```text
GET /api/notes/<id>
PUT /api/notes/<id>
DELETE /api/notes/<id>
```

## 10. 모듈 분리

### React

화면 컴포넌트는 `src/components`에 분리했습니다.

```text
LoginForm.jsx
EventList.jsx
NoteList.jsx
NoteDetail.jsx
NoteForm.jsx
DeleteConfirm.jsx
```

API 요청 함수는 `src/api`에 분리했습니다.

```text
auth.js
events.js
notes.js
```

`App.jsx`는 로그인 전후 화면을 연결하고 필요한 데이터와 이벤트 함수를 props로 전달합니다.

### Flask

`routes`는 HTTP 요청·응답을 담당합니다.

`repositories`는 SQL 실행을 담당합니다.

`db.py`는 PostgreSQL 연결을 담당합니다.

SQL 입력값은 문자열 연결이 아닌 `%s` 매개변수 바인딩을 사용합니다.

## 11. 선택 심화 기능

세션 유지와 API 보호 기능을 구현했습니다.

- 로그인 성공 시 `session["user_id"]` 저장
- `/api/auth/me`로 현재 사용자 확인
- 브라우저 새로고침 후에도 로그인 상태 유지
- 로그아웃 시 session 초기화
- 로그인하지 않은 상태에서 보호 API 접근 시 `401`
- 변경 요청에 CSRF 토큰 검사

보호 대상:

```text
GET /api/events
GET /api/notes
GET /api/notes/<id>
POST /api/notes
PUT /api/notes/<id>
DELETE /api/notes/<id>
```

## 12. 통합 확인 결과

다음 순서로 동작을 확인했습니다.

1. 일반 게시판에서 정상 페이지와 존재하지 않는 주소에 접속했습니다.
2. 틀린 로그인 정보로 로그인 실패 안내를 확인했습니다.
3. 올바른 `operator` 계정으로 로그인했습니다.
4. 감시 화면에서 일반 서비스의 요청 메서드·경로·상태 코드를 확인했습니다.
5. 관찰 메모를 작성하고 목록과 상세 화면에 동일한 내용이 표시되는 것을 확인했습니다.
6. 기존 메모를 수정하고 DB와 화면에 변경 내용이 반영되는 것을 확인했습니다.
7. 공백뿐인 내용으로 수정을 시도했을 때 `400` 오류가 발생하고 기존 내용이 유지되는 것을 확인했습니다.
8. 삭제 취소 시 메모가 유지되고, 삭제 확정 시 DB와 목록에서 제거되는 것을 확인했습니다.
9. 브라우저를 새로고침한 뒤 DB에 저장한 요청 기록과 메모가 유지되는 것을 확인했습니다.
10. 로그아웃 후 로그인 화면으로 돌아오는 것을 확인했습니다.

## 13. 주요 API

### 인증

```text
GET  /api/auth/me
POST /api/auth/login
POST /api/auth/logout
```

### 요청 기록

```text
POST /api/events
GET  /api/events
```

### 관찰 메모

```text
GET    /api/notes
GET    /api/notes/<id>
POST   /api/notes
PUT    /api/notes/<id>
DELETE /api/notes/<id>
```

## 14. 제출 제외 파일

`.gitignore`를 통해 다음 파일과 폴더를 제출에서 제외합니다.

```text
.env
venv/
.venv/
node_modules/
dist/
__pycache__/
*.pyc
*.log
```

`.env.example`은 제출에 포함합니다.

## 15. 수업 제공 자료와 직접 구현한 부분

수업에서 제공한 기존 `mini-watch` 구조와 DB 준비 자료를 기반으로 작업했습니다.

직접 구현·수정한 주요 부분:

- React 로그인 화면과 대시보드 연결
- React 요청 기록 화면
- React 관찰 메모 CRUD 화면
- React API 요청 모듈 분리
- 로그인 성공·실패 처리
- 요청 기록 조회 및 새로고침
- 메모 작성·조회·수정·삭제
- 입력 오류 메시지 처리
- Flask 세션 로그인 유지
- 보호 API 로그인 검사
- CSRF 검사
- 제출용 환경 설정과 README 정리
