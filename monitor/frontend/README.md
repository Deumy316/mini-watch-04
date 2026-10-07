# mini-watch-day04

React와 Flask를 이용해 일반 서비스의 요청 기록을 확인하고 관찰 메모를 관리하는 감시 대시보드 프로젝트입니다.

기존 일반 게시판 서비스는 유지하고, 감시 서비스는 React 프론트엔드와 Flask API로 구성했습니다.  
데이터는 PostgreSQL에 저장하며 React는 DB에 직접 접근하지 않고 Flask API를 통해 데이터를 조회·변경합니다.

---

## 1. 프로젝트 구성

```text
mini-watch-day04/
├─ general/
│  ├─ app.py
│  ├─ db.py
│  ├─ routes/
│  ├─ repositories/
│  ├─ templates/
│  ├─ static/
│  └─ requirements.txt
│
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
│  │
│  └─ frontend/
│     ├─ src/
│     │  ├─ App.jsx
│     │  ├─ api/
│     │  │  ├─ auth.js
│     │  │  ├─ events.js
│     │  │  └─ notes.js
│     │  ├─ components/
│     │  │  ├─ LoginForm.jsx
│     │  │  ├─ EventList.jsx
│     │  │  ├─ NoteList.jsx
│     │  │  ├─ NoteDetail.jsx
│     │  │  ├─ NoteForm.jsx
│     │  │  └─ DeleteConfirm.jsx
│     │  └─ ...
│     ├─ package.json
│     ├─ package-lock.json
│     └─ vite.config.js
│
├─ .gitignore
└─ README.md