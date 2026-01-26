# 📨 Rolling

롤링페이퍼 웹 서비스 프로젝트입니다.

---

## 🛠 초기 세팅 및 실행 방법 (Getting Started)

프로젝트를 클론 받은 후, **반드시 패키지를 먼저 설치**해주세요.

```bash
# 1. 프로젝트 복제
git clone [레포지토리 주소]

# 2. 폴더 이동
cd [폴더명]

# 3. 패키지 설치 (필수!)
npm install

# 4. 프로젝트 실행
npm run dev
```

---

## 🌿 브랜치 전략 (Git Strategy)

모든 작업은 `develop` 브랜치에서 시작

### 📌 브랜치 구조
* 🔵 **main**: 최종 배포용 (건드리지 않기)
* 🟠 **develop**: 개발용 메인 브랜치 (여기서 브랜치 생성!)
* 🟣 **feature/...**: 각자 작업하는 개인 브랜치

### 🌳 작업용 브랜치 목록 (총 5개)
| 담당자 | 브랜치명 | 작업 내용 |
| :--- | :--- | :--- |
| **양성준** | `feature/main` | 메인 페이지, 공통 헤더, 공유/이모지 기능 |
| **김혜원** | `feature/list` | 목록 페이지, 슬라이더 |
| **백종인** | `feature/create` | 롤링페이퍼 생성 기능  |
| **백종인** | `feature/message`| 메시지 작성 기능 - create 완료 후 생성 |
| **정다은** | `feature/detail` | 생성된 페이지, 수정/삭제 기능 |

---

## 🚀 협업 가이드 (Work Process)

작업을 시작할 때는 **반드시 아래 순서**를 지켜주세요!

1.  **브랜치 최신화 및 생성**
    ```bash
    git checkout develop          # 개발 본진으로 이동
    git pull origin develop       # 최신 코드 받기
    git checkout -b feature/내기능  # 내 브랜치 만들고 이동
    ```

2.  **작업 및 커밋**
    ```bash
    git add .
    git commit -m "feat: 기능 구현 메시지"
    ```

3.  **PR 보내기 (Pull Request)**
    * `git push origin feature/내기능`
    * GitHub 페이지에서 **Compare & Pull Request** 클릭
    * **Base: `develop`** ⬅️ **Compare: `feature/내기능`** (방향 확인 필수!)

---

## 📂 폴더 구조 (Directory Structure)

`src/pages`와 `src/components`가 역할별로 나뉘어 있습니다. 본인 담당 폴더를 확인하세요.

```text
src/
├── components/                   
│   ├── common/                   # [성준] Header(로고, 만들기 버튼), Button, Layout
│   ├── Main/                     # [성준] 메인 페이지 전용
│   ├── List/                     # [혜원] Card, CardSlider(좌우 버튼)
│   ├── Create/                   # [종인] BackgroundSelect(배경 선택)
│   ├── Post/                     # [다은 & 성준] 생성된 페이지 전용
│   │   ├── PostHeader.jsx        # [성준 구현] 생성된 페이지 헤더 (이모지, 공유 포함)
│   │   ├── Reaction.jsx          # [성준] 이모지 추가 기능
│   │   ├── ShareButton.jsx       # [성준] 카카오/URL 공유 기능
│   │   ├── MessageGrid.jsx       # [다은] 메시지 카드 리스트
│   │   └── PostModal.jsx         # [다은] 카드 확대 모달
│   └── Message/                  # [종인] ProfileSelect, TextEditor(폰트)
│
├── pages/                        
│   ├── MainPage.jsx              # [성준] 메인 (/)
│   ├── ListPage.jsx              # [혜원] 목록 (/list)
│   ├── PostCreatePage.jsx        # [종인] 롤링페이퍼 생성 (/post)
│   ├── PostDetailPage.jsx        # [다은] 상세 (/post/{id})
│   ├── PostEditPage.jsx          # [다은] 수정 (/post/{id}/edit)
│   └── MessageWritePage.jsx      # [종인] 메시지 작성 (/post/{id}/message)
│
├── utils/                        
│   └── share.js                  # [성준] 공유하기 로직
└── App.jsx                       # [성준] 라우터 설정 완료
```

---

## ✅ 담당자별 상세 업무 (R&R)

### 👤 양성준 (Main & Header & Utils)
* **[Page]** 메인 페이지 구현 (`/`)
    * '롤링 페이퍼 만들기' 버튼 → `/post` 이동
* **[Common]** 헤더(Header) 구현
    * 로고 클릭 → `/` 이동
    * '구경해보기' 버튼 → `/list` 이동 (목록 페이지 연결)
* **[Feature]** 부가 기능 구현 (컴포넌트화)
    * 이모지 추가 기능 (`Reaction.jsx`)
    * 카카오톡 공유 및 URL 복사 기능 (`ShareButton.jsx`)

### 👤 김혜원 (List)
* **[Page]** 롤링페이퍼 목록 페이지 구현 (`/list`)
    * '나도 만들어보기' 버튼 → `/post` 이동
* **[Component]** 카드 & 슬라이더 구현
    * 생성된 카드 클릭 → `/post/{id}` 이동
    * 좌/우측 화살표 버튼으로 슬라이드 기능 구현

### 👤 백종인 (Create & Message)
* **[Page 1]** 롤링페이퍼 만들기 페이지 (`/post`) - `feature/create`
    * 배경화면 선택 기능 (컬러/이미지)
    * 받는 사람 이름 입력 시 '생성하기' 버튼 활성화 (유효성 검사)
    * 생성 완료 시 → `/post/{id}` 이동
* **[Page 2]** 메시지 보내기 페이지 (`/post/{id}/message`) - `feature/message`
    * 프로필 이미지 선택 & 상대와의 관계 선택
    * 내용 입력 (Text Editor) & 폰트 선택 기능
    * 생성 완료 시 → `/post/{id}` 이동

### 👤 정다은 (Detail & Edit)
* **[Page]** 생성된 페이지 구현 (`/post/{id}`)
    * '+' 버튼 클릭 → `/post/{id}/message` 이동
    * (성준님이 만든) 헤더, 이모지, 공유 컴포넌트 배치
* **[Component]** 모달 & 그리드
    * 메시지 카드 클릭 시 확대 모달 표시
* **[Page]** 수정/삭제 페이지 (`/post/{id}/edit`)
    * '쓰레기통' 버튼 클릭 → 해당 메시지 삭제
    * '페이지 삭제하기' 버튼 → 롤링페이퍼 전체 삭제

---

## 💾 커밋 컨벤션 (Commit Message)

협업을 위해 커밋 메시지 앞에 태그를 붙여주세요.

* `feat: ` : 새로운 기능 추가
* `fix: ` : 버그 수정
* `design: ` : CSS 등 스타일 수정
* `refactor: ` : 코드 리팩토링 (기능 변경 없음)
* `docs: ` : 문서 수정 (README 등)

**예시:** `feat: 메인 페이지 버튼 클릭 이벤트 추가`

---
