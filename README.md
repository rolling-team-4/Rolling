# 📝 Rolling

![Development Period](https://img.shields.io/badge/Period-26.01.01_~_26.02.09-3cb371?style=for-the-badge&logo=time&logoColor=white)
<br>
 누구나 쉽게 롤링페이퍼를 만들고 마음을 전하는 웹 서비스

<br>

## 🚀 배포 주소
🔗 **Service URL:** https://rolling-pi-lemon.vercel.app/

<br>

## 🛠️ Tech Stack

### **Frontend Core**
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black"> <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=black"> <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=Vite&logoColor=white">

### **Routing & State Management**
<img src="https://img.shields.io/badge/React Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white"> <img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white">

### **UI Components & Libraries**
<img src="https://img.shields.io/badge/Swiper-6332F6?style=for-the-badge&logo=swiper&logoColor=white"> <img src="https://img.shields.io/badge/React_Quill-000000?style=for-the-badge&logo=quill&logoColor=white"> <img src="https://img.shields.io/badge/Emoji_Picker-FFC107?style=for-the-badge&logo=emoji&logoColor=black"> 
### **Styling**
<img src="https://img.shields.io/badge/CSS Modules-000000?style=for-the-badge&logo=css3&logoColor=white">

### **Code Quality**
<img src="https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white"> 

### **Deployment**
<img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white">

## 📂 프로젝트 구조

```text
src/
├── components/                   
│   ├── common/                   
│   ├── Main/                  
│   ├── List/                    
│   ├── Create/               
│   ├── Post/                     
│   │   ├── PostHeader.jsx        
│   │   ├── Reaction.jsx          
│   │   ├── ShareButton.jsx       
│   │   ├── MessageGrid.jsx     
│   │   └── PostModal.jsx        
│   └── Message/                 
│
├── pages/                        
│   ├── MainPage.jsx              
│   ├── ListPage.jsx              
│   ├── PostCreatePage.jsx        
│   ├── PostDetailPage.jsx       
│   ├── PostEditPage.jsx          
│   └── MessageWritePage.jsx  
│
├── utils/                        
│   └── share.js                 
└── App.jsx                      
```

---

## 👨‍💻 팀원 & 역할

### 👤 [김혜원](https://github.com/hyewon0457) (List)
* **[Page] 목록 페이지 (`/list`)**
  * '나도 만들어보기' 버튼을 통한 페이지 이동 흐름 제어
* **[Component] 카드 & 슬라이더 UI**
  * `Swiper` 라이브러리를 커스텀하여 좌/우 슬라이드 기능 구현
  * 생성된 롤링페이퍼 카드 클릭 시 해당 ID의 상세 페이지(`/post/{id}`)로 동적 라우팅 연결

<br>


### 👤 [백종인](https://github.com/qorwhddls134) (Create & Message)
* **[Page] 롤링페이퍼 생성 (`/post`)**
  * 배경색/이미지 선택 기능 및 토글 UI 구현
  * `onBlur` 이벤트를 활용한 받는 사람 이름 유효성 검사 (빈 값 체크 및 버튼 활성화)
* **[Page] 메시지 작성 (`/post/{id}/message`)**
  * 프로필 이미지 선택 및 상대방과의 관계(동료/가족/친구 등) 드롭다운 구현
  * `React-Quill` 에디터를 활용한 텍스트 스타일링 및 폰트 선택 기능 구현
 
<br>

### 👤 [양성준](https://github.com/jakejun98) (Main & Header & Utils)
* **[Page] 메인 페이지 (`/`)**
  * '롤링 페이퍼 만들기' 버튼 클릭 시 생성 페이지(`/post`)로 이동 구현
* **[Common] 헤더(Header)**
  * 로고 클릭 시 메인(`/`)으로 이동, '구경해보기' 버튼 클릭 시 목록(`/list`)으로 라우팅 처리
* **[Feature] 유틸리티 & 공유 기능**
  * 이모지 피커(`EmojiPicker`)를 활용한 리액션 추가 기능 구현
  * 카카오톡 공유 API 연동 및 현재 URL 클립보드 복사 기능 구현 (`ShareButton.jsx`)

<br>

### 👤 [정다은](https://github.com/da1eun) (Detail & Edit)
* **[Page] 상세 페이지 (`/post/{id}`)**
  * API 응답 데이터를 기반으로 메시지 카드 그리드(Grid) 레이아웃 구성
  * 메시지 카드 클릭 시 내용을 확대해서 보여주는 모달(Modal) 컴포넌트 구현
* **[Page] 편집 및 관리 (`/post/{id}/edit`)**
  * 특정 메시지 삭제 및 롤링페이퍼 전체 삭제 기능 (API `DELETE` 요청 처리)
 

## ✨ 페이지별 기능

### 1. 메인 페이지
- 누구나 쉽게 '롤링페이퍼' 버튼을 통해 롤링페이퍼를 생성할 수 있습니다.
- '구경해보기' 버튼을 통해 롤링페이퍼 목록 페이지로 이동할 수 있습니다.

![Image](https://github.com/user-attachments/assets/f25ed6f6-abb1-49f0-b411-7a49ff97adea)

<br>

### 2. 롤링페이퍼 목록 페이지
- 생성된 롤링페이퍼들을 케러셀 형태로 탐색합니다.

![Image](https://github.com/user-attachments/assets/52b0772e-1d05-478c-9e14-eff459afaeae)


<br>

### 3. 생성된 롤링페이퍼 페이지
- 카드를 클릭하면 모달(Modal) 창이 활성화되어 내용을 확대해 볼 수 있습니다.
- 카카오톡 공유하기 기능을 연동하여 접근성을 높였습니다.
- URL 복사 시 Toast알림을 띄워줍니다.
- 가장 많이 눌린 Top3 이모지를 랭킹순으로 보여주고, 드롭다운을 통해 새로운 리액션을 추가할 수 있습니다.

![Image](https://github.com/user-attachments/assets/862bb6b3-cec9-423e-915f-8a378ec49dc1)


<br>

### 4. 롤링페이퍼 만들기 페이지

- 받는사람 이름을 입력하고 배경 , 이미지를 커스텀하여 롤링페이퍼를 생성할 수 있습니다.

![Image](https://github.com/user-attachments/assets/7b8ed653-6e79-4faa-a4c3-5e989b9c02a5)
<br>

### 5. 롤링페이퍼에 메시지 보내기 페이지

- 이름,관계,내용,폰트를 입력하고 생성하여 롤링페이퍼에 메시지를 보낼 수 있습니다. 

![Image](https://github.com/user-attachments/assets/b1d458e1-cd16-4041-9e86-1738a01de511)
