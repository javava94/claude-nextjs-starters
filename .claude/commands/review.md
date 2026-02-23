---
description: "프로젝트 코딩 규칙에 맞춰 현재 변경사항을 리뷰합니다"
allowed-tools:
  [
    "Bash(git diff:*)",
    "Bash(git status:*)",
    "Bash(git log:*)",
    "Bash(npm run lint:*)",
    "Read",
    "Glob",
    "Grep",
  ]
---

# Claude 명령어: Review

프로젝트 코딩 규칙(CLAUDE.md)에 맞춰 현재 변경사항을 리뷰합니다.

## 사용법

```
/review
```

## 프로세스

1. `git diff`로 스테이지된 변경사항 확인 (없으면 전체 unstaged 변경사항 확인)
2. 변경된 파일 목록을 파악하고, 각 파일의 전체 내용을 읽어 맥락 파악
3. 아래 체크리스트 항목별로 위반 사항 검사
4. `npm run lint` 실행하여 ESLint 결과 확인
5. 리뷰 결과를 카테고리별로 정리하여 출력

## 체크리스트

### TypeScript 규칙

- [ ] `any` 타입 사용 여부 → **사용 금지**, 구체적 타입 또는 `unknown` 사용 권장
- [ ] 타입 정의 누락 여부 → props, 반환값 등에 타입 명시
- [ ] `@ts-ignore`, `@ts-expect-error` 불필요한 사용

### Server / Client Component

- [ ] 불필요한 `"use client"` 선언 여부 → 상태/인터랙션 없으면 Server Component 유지
- [ ] Client Component에서 무거운 데이터 페칭 여부 → Server Component로 이동 권장
- [ ] `"use client"` 경계가 너무 상위에 있는지 여부

### 스타일링 / 반응형

- [ ] `cn()` 유틸리티 미사용 → 조건부 클래스 결합 시 `cn()` 사용
- [ ] 반응형 클래스 누락 → `md:` 브레이크포인트 기준 반응형 적용 확인
- [ ] 하드코딩된 색상값 → Tailwind CSS 변수 또는 oklch 토큰 사용 권장
- [ ] 인라인 스타일 사용 여부 → Tailwind 클래스 사용 권장

### 컴포넌트 구조

- [ ] `components/ui/` 직접 수정 여부 → shadcn/ui 기본 컴포넌트는 직접 수정 지양
- [ ] 컴포넌트 배치 위치 적절성 → `ui/`, `layout/`, `common/` 분류 확인
- [ ] 컴포넌트 재사용성 → 중복 코드 발견 시 공용 컴포넌트 분리 제안

### 네비게이션 / 설정

- [ ] 새 페이지 추가 시 `config/site.ts` 네비게이션 등록 여부
- [ ] `types/nav.ts` 타입과의 정합성

### 접근성

- [ ] 이미지 `alt` 속성 누락
- [ ] 버튼/링크의 접근 가능한 텍스트 여부
- [ ] 시맨틱 HTML 사용 여부 (`div` 남용 지양)

### 보안

- [ ] 환경변수 또는 민감정보 하드코딩 여부
- [ ] `dangerouslySetInnerHTML` 사용 여부

## 출력 형식

리뷰 결과를 아래 형식으로 출력한다:

```
## 📋 코드 리뷰 결과

### 변경 요약
- 변경 파일: N개
- 추가/수정/삭제 라인 요약

### 🚨 필수 수정 (Must Fix)
심각한 문제 (any 타입, 보안 이슈, 빌드 에러 등)

### ⚠️ 권장 수정 (Should Fix)
코딩 규칙 위반, 반응형 누락, 접근성 문제 등

### 💡 개선 제안 (Nice to Have)
리팩토링 기회, 성능 개선 포인트, 코드 구조 개선 등

### ✅ 잘된 점 (Good)
규칙을 잘 따른 부분, 좋은 패턴 사용 등
```

## 참고사항

- 변경되지 않은 코드에 대해서는 리뷰하지 않음
- shadcn/ui 컴포넌트(`components/ui/`)의 변경은 특히 주의해서 검토
- ESLint 경고도 함께 보고
