# 커피 원두 랜딩페이지

> 취향에 딱 맞는 원두를 집 앞까지 배송하는 커피 플랫폼의 랜딩페이지

## 🎯 프로젝트 개요

이 프로젝트는 커피 원두 추천 및 배송 플랫폼의 런칭 전 이메일 수집을 위한 랜딩페이지입니다.

### 주요 기능
- ✨ 반응형 디자인 (모바일/태블릿/데스크톱)
- 📧 Google Sheets 이메일 수집
- ♿ 접근성 (a11y) 준수
- 🚀 빠른 로딩 (정적 페이지 생성)
- 📱 SEO 최적화

---

## 🛠 기술 스택

- **프레임워크**: [Next.js 16](https://nextjs.org/) (App Router)
- **스타일링**: [Tailwind CSS](https://tailwindcss.com/)
- **언어**: TypeScript
- **API**: Google Sheets API (googleapis)
- **배포**: Vercel

---

## 📋 시작하기

### 1. 필수 요구사항

- Node.js 18.0 이상
- npm 또는 yarn
- Google Cloud Console 계정 (Google Sheets 연동용)

### 2. 설치

```bash
# 저장소 클론 (또는 프로젝트 다운로드)
cd landing-page

# 의존성 설치
npm install
```

### 3. 환경변수 설정

`.env.local.example`을 복사하여 `.env.local` 파일을 생성하세요:

```bash
cp .env.local.example .env.local
```

그리고 다음 값을 채워주세요:

```env
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_KEY_HERE\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEET_ID=your-spreadsheet-id
GOOGLE_SHEET_NAME=Sheet1
```

**상세한 설정 방법**: [`docs/google-sheets-setup.md`](./docs/google-sheets-setup.md) 참고

### 4. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

### 5. 프로덕션 빌드

```bash
npm run build
npm start
```

---

## 📁 프로젝트 구조

```
landing-page/
├── app/
│   ├── components/
│   │   ├── Hero.tsx          # 히어로 섹션
│   │   ├── Features.tsx      # 가치 제안 섹션
│   │   ├── Proof.tsx         # 신뢰 요소 섹션
│   │   └── CTA.tsx           # 이메일 수집 폼
│   ├── api/
│   │   └── subscribe/
│   │       └── route.ts      # Google Sheets API 엔드포인트
│   ├── layout.tsx            # 루트 레이아웃 (SEO 메타태그)
│   ├── page.tsx              # 메인 페이지
│   └── globals.css           # 전역 스타일
├── docs/
│   ├── wireframe.md          # 기획 문서
│   ├── copy-draft.md         # 초안 카피
│   ├── copy-refinement.md    # 개선된 카피
│   ├── google-sheets-setup.md # Google Sheets 연동 가이드
│   └── qa-checklist.md       # QA 체크리스트
├── public/                   # 정적 파일
├── .env.local.example        # 환경변수 예시
└── README.md                 # 이 파일
```

---

## 🎨 페이지 구조

### 1. Hero 섹션
- **목적**: 첫 인상에서 문제 공감 및 가치 제안
- **내용**: "매일 마시는 커피, 이제 딱 맞는 원두로"
- **CTA**: "지금 시작하기" (CTA 섹션으로 스크롤)

### 2. Features 섹션
- **목적**: 3가지 핵심 가치 제시
- **내용**:
  - 3분 만에 찾는 나만의 원두
  - 로스팅 24시간 내 배송
  - 엄선된 원두만

### 3. Proof 섹션
- **목적**: 사회적 증거로 신뢰 구축
- **내용**: 사용자 후기 3개 + 대기자 수

### 4. CTA 섹션
- **목적**: 이메일 수집 (런칭 알림)
- **내용**: 이메일 입력 폼 → Google Sheets 저장

---

## 🚀 배포

### Vercel 배포 (권장)

1. [Vercel](https://vercel.com)에 로그인
2. 프로젝트 import
3. 환경변수 설정:
   - `GOOGLE_SERVICE_ACCOUNT_EMAIL`
   - `GOOGLE_PRIVATE_KEY`
   - `GOOGLE_SHEET_ID`
   - `GOOGLE_SHEET_NAME`
4. 배포 완료!

**참고**: `GOOGLE_PRIVATE_KEY`는 큰따옴표 포함 전체를 붙여넣으세요.

### 다른 플랫폼

- **Netlify**: Next.js 지원 활성화 필요
- **AWS Amplify**: 자동 빌드 설정
- **Docker**: `Dockerfile` 추가 필요 (선택)

---

## 📊 Google Sheets 데이터 구조

수집된 데이터는 다음 형식으로 저장됩니다:

| A (이메일) | B (신청 일시) |
|-----------|--------------|
| user@example.com | 2025-11-04 14:30:00 |

**상세 설정**: [`docs/google-sheets-setup.md`](./docs/google-sheets-setup.md)

---

## 🧪 테스트

### 로컬 테스트
1. 개발 서버 실행 (`npm run dev`)
2. 이메일 입력 후 제출
3. Google Sheets에서 데이터 확인

### 빌드 테스트
```bash
npm run build
```

모든 경고/에러가 없어야 합니다.

---

## 📈 성능

- **Lighthouse Score**: 90+ 예상
- **First Contentful Paint**: < 1.5s
- **번들 크기**: < 200KB (gzip)
- **정적 생성**: 빠른 로딩 보장

---

## ♿ 접근성

- 시맨틱 HTML 사용
- 키보드 네비게이션 지원
- 충분한 색상 대비 (WCAG AA)
- 스크린리더 호환

---

## 🔒 보안

- API 키는 서버 사이드에서만 사용
- `.env.local`은 Git에 커밋되지 않음
- 입력 유효성 검사 적용

---

## 📝 문서

- [기획 문서](./docs/wireframe.md)
- [카피 초안](./docs/copy-draft.md)
- [카피 개선안](./docs/copy-refinement.md)
- [Google Sheets 설정](./docs/google-sheets-setup.md)
- [QA 체크리스트](./docs/qa-checklist.md)

---

## 🐛 문제 해결

### "서버 설정이 완료되지 않았습니다"
→ `.env.local` 파일의 환경변수를 확인하세요.
→ 개발 서버를 재시작하세요 (`npm run dev`).

### "데이터 저장 중 오류가 발생했습니다"
→ Google Service Account가 스프레드시트에 편집 권한이 있는지 확인하세요.
→ Google Sheets API가 활성화되었는지 확인하세요.

### 빌드 에러
→ Node.js 버전이 18.0 이상인지 확인하세요.
→ `node_modules` 삭제 후 재설치: `rm -rf node_modules && npm install`

---

## 🎨 디자인 가이드라인

### 색상 팔레트
- **커피 브라운**: `#6f4e37` (메인 색상)
- **라이트 브라운**: `#c7a17a` (보조 색상)
- **크림**: `#f5f0e8` (배경)
- **다크 브라운**: `#2d1f1a` (텍스트)

### 타이포그래피
- **헤드라인**: 크고 굵게 (48-72px)
- **본문**: 읽기 편하게 (16-20px)
- **톤**: 간결하고 따뜻한 한국어

---

## 📦 추가 기능 아이디어

향후 구현 가능:
- [ ] 배경 이미지/비디오
- [ ] 애니메이션 효과 (Framer Motion)
- [ ] 다국어 지원 (i18n)
- [ ] A/B 테스트 (Optimizely)
- [ ] 분석 도구 (Google Analytics, Hotjar)
- [ ] 이메일 자동 응답 (Sendgrid)
- [ ] 추천 퀴즈 (커피 취향 테스트)

---

## 🤝 기여

이 프로젝트는 AI 에이전트에 의해 생성되었습니다.  
개선 제안이나 버그 리포트는 언제든 환영합니다!

---

## 📄 라이선스

© 2025 커피 원두 플랫폼. All rights reserved.

---

## 👤 제작

- **기획**: Planner Agent
- **개발**: UI Builder Agent
- **카피**: Copy Refiner Agent
- **QA**: QA Reviewer Agent
- **문서화**: Release Manager Agent

---

## 🔗 관련 링크

- [Next.js 문서](https://nextjs.org/docs)
- [Tailwind CSS 문서](https://tailwindcss.com/docs)
- [Google Sheets API](https://developers.google.com/sheets/api)
- [Vercel 배포 가이드](https://vercel.com/docs)

---

**Made with ☕ and AI**
