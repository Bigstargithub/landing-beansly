# Google Sheets 연동 설정 가이드

## 개요
이 문서는 랜딩페이지에서 수집한 이메일을 Google Sheets에 자동으로 저장하는 방법을 설명합니다.

---

## 1단계: Google Cloud Console 설정

### 1.1 프로젝트 생성
1. [Google Cloud Console](https://console.cloud.google.com/)에 접속
2. 새 프로젝트 생성 또는 기존 프로젝트 선택
3. 프로젝트 이름: 예) "coffee-landing-page"

### 1.2 Google Sheets API 활성화
1. 좌측 메뉴 → "API 및 서비스" → "라이브러리"
2. "Google Sheets API" 검색
3. "사용" 버튼 클릭

### 1.3 Service Account 생성
1. 좌측 메뉴 → "API 및 서비스" → "사용자 인증 정보"
2. "사용자 인증 정보 만들기" → "서비스 계정" 선택
3. 서비스 계정 정보 입력:
   - 이름: 예) "landing-page-sheets"
   - 설명: "랜딩페이지 이메일 수집용"
4. "만들기 및 계속하기" 클릭
5. 역할 선택: "편집자" (또는 최소 권한으로 "Google Sheets API 사용자")
6. "완료" 클릭

### 1.4 JSON 키 생성
1. 생성된 서비스 계정 클릭
2. "키" 탭으로 이동
3. "키 추가" → "새 키 만들기" → "JSON" 선택
4. JSON 파일이 자동으로 다운로드됩니다
5. **이 파일을 안전한 곳에 보관하세요** (절대 공개 저장소에 올리지 마세요)

---

## 2단계: Google Sheets 준비

### 2.1 스프레드시트 생성
1. [Google Sheets](https://sheets.google.com/)에서 새 스프레드시트 생성
2. 제목: 예) "커피 랜딩페이지 이메일 수집"

### 2.2 헤더 설정 (선택)
첫 번째 행에 헤더 추가:
- A1: `이메일`
- B1: `신청 일시`

### 2.3 권한 부여
1. 스프레드시트 우측 상단 "공유" 버튼 클릭
2. 다운로드한 JSON 파일에서 `client_email` 값 복사
   - 형식: `xxx@yyy.iam.gserviceaccount.com`
3. 이 이메일을 스프레드시트에 "편집자" 권한으로 추가
4. "알림 보내지 않음" 체크

### 2.4 Spreadsheet ID 확인
스프레드시트 URL에서 ID 복사:
```
https://docs.google.com/spreadsheets/d/[여기가_SPREADSHEET_ID]/edit
```

---

## 3단계: 환경변수 설정

### 3.1 .env.local 파일 생성
프로젝트 루트(`landing-page/`)에 `.env.local` 파일 생성:

```bash
# Google Sheets API 설정
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEET_ID=your-spreadsheet-id-here
GOOGLE_SHEET_NAME=Sheet1
```

### 3.2 값 채우기

#### GOOGLE_SERVICE_ACCOUNT_EMAIL
- JSON 파일의 `client_email` 값

#### GOOGLE_PRIVATE_KEY
- JSON 파일의 `private_key` 값
- **주의**: 반드시 큰따옴표로 감싸야 하며, `\n`은 그대로 유지

**예시**:
```
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQE...\n-----END PRIVATE KEY-----\n"
```

#### GOOGLE_SHEET_ID
- 2.4단계에서 복사한 Spreadsheet ID

#### GOOGLE_SHEET_NAME
- 시트 이름 (기본값: `Sheet1`)
- 다른 이름을 사용하려면 해당 시트 탭 이름 입력

---

## 4단계: 로컬 테스트

### 4.1 개발 서버 실행
```bash
cd landing-page
npm run dev
```

### 4.2 테스트
1. 브라우저에서 `http://localhost:3000` 접속
2. CTA 섹션으로 스크롤
3. 이메일 입력 후 "알림 신청하기" 버튼 클릭
4. Google Sheets에서 데이터 확인

### 4.3 문제 해결
- "서버 설정이 완료되지 않았습니다" 에러:
  → 환경변수가 올바르게 설정되었는지 확인
  → 서버 재시작 (`npm run dev` 종료 후 재실행)

- "데이터 저장 중 오류가 발생했습니다" 에러:
  → Service Account가 스프레드시트에 편집 권한이 있는지 확인
  → Spreadsheet ID가 올바른지 확인
  → Google Sheets API가 활성화되었는지 확인

---

## 5단계: Vercel 배포 시 설정

### 5.1 Vercel 환경변수 추가
1. Vercel 대시보드 → 프로젝트 선택
2. "Settings" → "Environment Variables"
3. 다음 변수들을 추가:
   - `GOOGLE_SERVICE_ACCOUNT_EMAIL`
   - `GOOGLE_PRIVATE_KEY`
   - `GOOGLE_SHEET_ID`
   - `GOOGLE_SHEET_NAME`

**주의**: `GOOGLE_PRIVATE_KEY`는 큰따옴표 포함해서 전체를 붙여넣기

### 5.2 재배포
환경변수 추가 후 자동으로 재배포되거나, 수동으로 재배포 트리거

---

## 보안 권장사항

### ✅ 해야 할 것
- `.env.local`을 `.gitignore`에 추가 (이미 추가됨)
- Service Account JSON 파일을 안전하게 보관
- 스프레드시트를 비공개로 유지

### ❌ 하지 말아야 할 것
- JSON 파일을 Git 저장소에 커밋
- 환경변수를 코드에 하드코딩
- Service Account에 불필요한 권한 부여

---

## 데이터 구조

Google Sheets에 다음 형식으로 저장됩니다:

| A (이메일) | B (신청 일시) |
|-----------|--------------|
| user1@example.com | 2025-11-04 14:30:00 |
| user2@example.com | 2025-11-04 15:45:22 |

---

## 추가 기능 아이디어

향후 필요시 구현 가능:
- 중복 이메일 체크
- 이메일 자동 응답 (Welcome 이메일)
- 통계 대시보드
- CSV 내보내기
- Mailchimp/Sendgrid 연동

---

## 문의

문제가 발생하면 다음을 확인하세요:
1. Google Cloud Console에서 API 할당량
2. Service Account 권한
3. Spreadsheet 공유 설정
4. 환경변수 형식 (특히 개행 문자)

도움이 필요하면 [Google Sheets API 문서](https://developers.google.com/sheets/api/guides/concepts)를 참고하세요.

