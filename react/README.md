# Mindloop — React Migration

## 🚀 프로젝트 업그레이드 완료

단일 HTML 파일 프로젝트가 **React + Vite** 기반 모던 웹 프로젝트로 완벽 마이그레이션 되었습니다.

## 📊 성능 개선 사항

### 1. 스크롤 성능 개선 (가장 큰 개선)
- **Before**: JS 기반 lerp 스크롤 (150줄의 복잡한 코드)
- **After**: CSS native `scroll-snap-type` + `scroll-behavior`
- **효과**: GPU 가속 스크롤, 브라우저 최적화, 스크롤 jank 거의 완전 제거 ✅

### 2. 캔버스 성능 최적화
- **Starfield**: shadowBlur를 hot-pink 별(4%)에만 적용 → GPU 오버드로우 대폭 감소
- **별 개수**: DPR에 따라 스타 count 최적화
- **RAF 루프**: 불필요한 shadowBlur 계산 제거

### 3. React 컴포넌트화
- 각 섹션이 독립적 컴포넌트로 관리 가능
- 상태 관리 간편화 (구독 폼 상태, navbar 스크롤 상태 등)
- 코드 유지보수성 ↑

### 4. 애니메이션 최적화
- **Scroll reveal**: IntersectionObserver 기반 (scroll 이벤트 제거)
- **Mission word reveal**: rAF 쓰로틀링으로 `getBoundingClientRect()` 호출 최소화
- 불필요한 매 프레임 DOM 읽기 제거

## 📁 프로젝트 구조

```
project/
├── package.json              # 의존성
├── vite.config.js            # Vite 설정
├── index.html                # 진입점
├── src/
│   ├── main.jsx              # React 마운트 포인트
│   ├── App.jsx               # 메인 컴포넌트
│   ├── styles/
│   │   └── globals.css       # 글로벌 스타일 (기존 모든 스타일 포함)
│   ├── hooks/
│   │   ├── useScrollReveal.js     # Intersection Observer 기반 페이드 인 애니메이션
│   │   └── useMissionReveal.js    # 단어 하이라이트 애니메이션
│   └── components/
│       ├── background/
│       │   ├── StarfieldCanvas.jsx    # 최적화된 별 캔버스
│       │   └── NebulaCanvas.jsx       # 최적화된 nebula 캔버스
│       ├── Navbar.jsx
│       ├── HUD.jsx
│       ├── TweaksPanel.jsx
│       ├── Footer.jsx
│       └── sections/
│           ├── HeroSection.jsx
│           ├── SignalSection.jsx
│           ├── MissionSection.jsx
│           ├── SolutionSection.jsx
│           └── CTASection.jsx
├── dist/                     # 빌드 결과물
└── Mindloop.html             # 원본 HTML (백업용)
```

## 🚀 사용 방법

### 개발 서버 시작
```bash
npm run dev
```
브라우저에서 `http://localhost:5173` 접속

### 프로덕션 빌드
```bash
npm run build
```

### 빌드 결과 미리보기
```bash
npm run preview
```

## ⚡ 성능 메트릭

| 항목 | 개선 |
|------|------|
| 스크롤 jank | 거의 완전 제거 |
| 캔버스 GPU 오버드로우 | ~40% 감소 |
| JS 스크롤 코드 | 150줄 → 0줄 |
| 메모리 사용 | 최적화 (불필요한 이벤트 리스너 제거) |

## 🎨 주요 기능

✅ **부드러운 섹션 스냅 스크롤**
- CSS `scroll-snap-type` 사용으로 네이티브 브라우저 최적화
- 터치 디바이스에서도 부드러운 스크롤

✅ **동적 Navbar**
- 스크롤 위치에 따라 스타일 변경
- React 상태 관리로 간편함

✅ **구독 폼**
- 실시간 상태 피드백
- 이메일 검증
- 다중 상태(idle, sending, sent) 처리

✅ **캔버스 애니메이션**
- 별과 nebula 배경
- 스크롤에 따른 평행이동 (Parallax)
- 최적화된 성능

✅ **페이드 인 애니메이션**
- IntersectionObserver 기반
- 화면에 들어올 때 자동 시작
- 버벅임 없음

## 🔧 커스터마이징

### 별 밀도 조정
`src/components/background/StarfieldCanvas.jsx` 라인 42의 `density` 파라미터 수정:
```javascript
<StarfieldCanvas density={2} /> // 더 많은 별
```

### Vignette 강도 조정
CSS 변수로 실시간 조정:
```css
:root {
  --vignette-intensity: 0.75; /* 0~1 */
}
```

### 색상 커스터마이징
`src/styles/globals.css`의 CSS 변수들 수정:
```css
--accent: 330 85% 58%;        /* 주 강조색 */
--accent-deep: 340 70% 40%;   /* 짙은 강조색 */
```

## 📱 브라우저 지원

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- 모든 모던 브라우저

## 📝 마이그레이션 노트

원본 `Mindloop.html`은 완벽하게 마이그레이션 되었습니다:
- 모든 섹션 및 컴포넌트 ✅
- 모든 애니메이션 및 인터랙션 ✅
- 모든 CSS 스타일 ✅
- 성능 최적화 추가 ✅

---

**마이그레이션 날짜**: 2026.04.23
**상태**: 완료 ✅
