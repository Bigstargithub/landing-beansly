# 배포 가이드

이 문서는 커피 원두 랜딩페이지를 Vercel에 배포하는 전체 과정을 안내합니다.

---

## 🎯 배포 전 체크리스트

### 1. Google Sheets 설정 완료
- [ ] Google Cloud Console에서 Service Account 생성
- [ ] Google Sheets API 활성화
- [ ] JSON 키 다운로드
- [ ] 스프레드시트 생성 및 권한 부여

**가이드**: `landing-page/docs/google-sheets-setup.md`

### 2. 로컬 테스트 완료
- [ ] 환경변수 설정 (`.env.local`)
- [ ] 개발 서버 실행 (`npm run dev`)
- [ ] 폼 제출 테스트
- [ ] Google Sheets에 데이터 저장 확인

### 3. 프로덕션 빌드 성공
- [ ] `npm run build` 성공
- [ ] 빌드 에러 없음

---

## 🚀 Vercel 배포 단계

### 1단계: Vercel 계정 준비

1. [Vercel](https://vercel.com) 접속
2. GitHub/GitLab/Bitbucket 계정으로 로그인
3. 대시보드 확인

---

### 2단계: Git 저장소 준비 (선택)

#### 옵션 A: GitHub 저장소 사용 (권장)
```bash
cd /Users/eddie-insaeng/vibecoding-test/landing-page

# Git 초기화 (이미 되어 있음)
git status

# 원격 저장소 추가
git remote add origin https://github.com/your-username/your-repo.git

# 커밋 및 푸시
git add .
git commit -m "Initial commit: Coffee landing page"
git push -u origin main
```

#### 옵션 B: Vercel CLI 사용
```bash
# Vercel CLI 설치
npm i -g vercel

# 로그인
vercel login

# 프로젝트 디렉토리에서
cd /Users/eddie-insaeng/vibecoding-test/landing-page
vercel
```

---

### 3단계: Vercel에서 프로젝트 Import

1. Vercel 대시보드 → "Add New" → "Project"
2. GitHub 저장소 선택 또는 Git 저장소 연결
3. `vibecoding-test/landing-page` 선택
4. "Import" 클릭

---

### 4단계: 프로젝트 설정

#### Framework Preset
- **자동 감지**: Next.js
- **변경 불필요** (자동 설정됨)

#### Root Directory
- `landing-page` 선택 (monorepo인 경우)

#### Build Command
- 기본값 사용: `next build`

#### Output Directory
- 기본값 사용: `.next`

---

### 5단계: 환경변수 설정 ⚠️ 중요!

"Environment Variables" 섹션에서 다음 변수를 추가하세요:

#### 변수 1: GOOGLE_SERVICE_ACCOUNT_EMAIL
```
GOOGLE_SERVICE_ACCOUNT_EMAIL
```
**Value**: JSON 파일의 `client_email` 값  
예: `your-service-account@your-project.iam.gserviceaccount.com`

#### 변수 2: GOOGLE_PRIVATE_KEY
```
GOOGLE_PRIVATE_KEY
```
**Value**: JSON 파일의 `private_key` 값 (큰따옴표 포함 전체)  
예: `"-----BEGIN PRIVATE KEY-----\nMIIEvQIB...\n-----END PRIVATE KEY-----\n"`

**⚠️ 주의**: 
- 반드시 큰따옴표(`"`)를 포함해서 붙여넣으세요
- `\n`은 실제 개행이 아닌 문자열 `\n`입니다
- 복사할 때 앞뒤 공백이 없도록 주의하세요

#### 변수 3: GOOGLE_SHEET_ID
```
GOOGLE_SHEET_ID
```
**Value**: 스프레드시트 URL의 ID 부분  
예: `1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms`

URL 예시:
```
https://docs.google.com/spreadsheets/d/[여기가_ID]/edit
```

#### 변수 4: GOOGLE_SHEET_NAME (선택)
```
GOOGLE_SHEET_NAME
```
**Value**: 시트 탭 이름 (기본값: `Sheet1`)

---

### 6단계: 배포 실행

1. 모든 설정 확인
2. "Deploy" 버튼 클릭
3. 배포 진행 상황 모니터링 (약 2-3분 소요)

배포 로그 예시:
```
Running "npm run build"
✓ Compiled successfully
✓ Generating static pages
✓ Finalizing page optimization
Build completed successfully
```

---

### 7단계: 배포 확인

#### 7.1 URL 확인
배포 완료 후 URL이 생성됩니다:
- **Production**: `https://your-project.vercel.app`
- **Custom Domain** (선택): 나중에 추가 가능

#### 7.2 Smoke Test
1. 배포된 URL 접속
2. 각 섹션 정상 표시 확인:
   - Hero 섹션
   - Features 섹션
   - Proof 섹션
   - CTA 섹션
3. "지금 시작하기" 버튼 클릭 → CTA 섹션으로 스크롤 확인
4. 이메일 입력 후 "알림 신청하기" 제출
5. 성공 메시지 확인: "신청 완료! 곧 좋은 소식으로 찾아뵙겠습니다 ☕"
6. Google Sheets에서 데이터 저장 확인

#### 7.3 반응형 테스트
- 모바일 (Chrome DevTools)
- 태블릿
- 데스크톱

---

## 🔧 배포 후 설정

### 1. 커스텀 도메인 추가 (선택)

1. Vercel 프로젝트 → "Settings" → "Domains"
2. 도메인 입력 (예: `coffee.example.com`)
3. DNS 레코드 추가:
   - Type: `CNAME`
   - Name: `coffee` 또는 `@`
   - Value: `cname.vercel-dns.com`
4. 도메인 인증 (수 분 소요)

### 2. Analytics 연동 (선택)

#### Vercel Analytics
```bash
npm install @vercel/analytics
```

`app/layout.tsx`에 추가:
```typescript
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

#### Google Analytics (선택)
환경변수에 추가:
```
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### 3. 자동 배포 설정

- **기본 동작**: `main` 브랜치에 push 시 자동 배포
- **Preview 배포**: PR 생성 시 미리보기 URL 자동 생성

---

## 🐛 문제 해결

### 문제 1: "서버 설정이 완료되지 않았습니다"
**원인**: 환경변수 미설정 또는 오타

**해결**:
1. Vercel → Settings → Environment Variables 확인
2. 모든 변수가 정확히 입력되었는지 확인
3. `GOOGLE_PRIVATE_KEY`에 큰따옴표가 포함되었는지 확인
4. Redeploy (Settings → Deployments → "Redeploy")

---

### 문제 2: "데이터 저장 중 오류가 발생했습니다"
**원인**: Google Sheets 권한 또는 API 설정 문제

**해결**:
1. Service Account가 스프레드시트에 편집 권한이 있는지 확인
2. Google Sheets API가 활성화되었는지 확인
3. Spreadsheet ID가 정확한지 확인
4. 시트 이름이 `GOOGLE_SHEET_NAME`과 일치하는지 확인

---

### 문제 3: 빌드 실패
**원인**: 코드 오류 또는 의존성 문제

**해결**:
1. 로컬에서 `npm run build` 재시도
2. `node_modules` 삭제 후 재설치
3. Vercel 빌드 로그 확인
4. Node.js 버전 확인 (18.0 이상)

---

### 문제 4: 환경변수가 적용되지 않음
**원인**: 환경변수 변경 후 재배포 필요

**해결**:
1. 환경변수 수정
2. "Redeploy" 버튼 클릭 (새 배포 트리거)
3. 캐시를 비우려면 "Clear Cache" 체크

---

## 📊 모니터링

### Vercel Dashboard
- **Deployments**: 배포 이력
- **Analytics**: 방문자 통계 (Vercel Analytics 설치 시)
- **Logs**: 실시간 로그 (Functions 탭)

### Google Sheets
- 실시간으로 수집된 이메일 확인
- 필터/정렬 기능 활용
- 주기적으로 백업 권장

---

## 🔄 업데이트 및 롤백

### 코드 업데이트
```bash
# 변경사항 커밋
git add .
git commit -m "Update: improve CTA copy"
git push

# Vercel이 자동으로 재배포
```

### 롤백 (이전 버전으로 되돌리기)
1. Vercel → Deployments
2. 이전 배포 선택
3. "Promote to Production" 클릭

---

## ✅ 배포 완료 체크리스트

- [ ] Vercel 배포 성공
- [ ] 프로덕션 URL 정상 접속
- [ ] Hero 섹션 정상 표시
- [ ] Features 섹션 정상 표시
- [ ] Proof 섹션 정상 표시
- [ ] CTA 섹션 정상 표시
- [ ] 스크롤 동작 정상
- [ ] 폼 제출 성공
- [ ] Google Sheets 데이터 저장 확인
- [ ] 모바일 반응형 확인
- [ ] 커스텀 도메인 설정 (선택)

---

## 📞 지원

### 공식 문서
- [Vercel 문서](https://vercel.com/docs)
- [Next.js 배포 가이드](https://nextjs.org/docs/deployment)

### 프로젝트 문서
- `landing-page/README.md`: 프로젝트 개요
- `landing-page/docs/google-sheets-setup.md`: Google Sheets 설정
- `landing-page/docs/qa-checklist.md`: QA 결과

---

## 🎉 축하합니다!

랜딩페이지가 성공적으로 배포되었습니다!  
이제 방문자들이 이메일을 신청할 수 있습니다.

**다음 단계**:
1. 소셜 미디어/광고 캠페인 시작
2. Google Sheets 데이터 모니터링
3. 전환율 분석
4. A/B 테스트 (필요 시)

---

**Made with ☕ and 🚀**

