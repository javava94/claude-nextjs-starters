# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 프로젝트 개요

Next.js 16 App Router 기반 웹 스타터킷. 퍼블릭 사이트와 대시보드 두 가지 레이아웃을 Route Group으로 분리하여 제공한다.

## 명령어

```bash
npm run dev      # 개발 서버 (localhost:3000)
npm run build    # 프로덕션 빌드
npm start        # 프로덕션 서버 실행
npm run lint     # ESLint 검사 (core-web-vitals + typescript)
```

shadcn/ui 컴포넌트 추가:
```bash
npx shadcn@latest add <component-name>
```

## 기술 스택

- **Next.js 16** (App Router, RSC 기본)
- **TypeScript** (strict mode, path alias `@/*` → `./src/*`)
- **Tailwind CSS 4** (PostCSS v4 @import 기반, oklch 색상 모델)
- **shadcn/ui** (new-york 스타일, lucide-react 아이콘)
- **next-themes** (다크모드, `attribute="class"`)
- **sonner** (토스트 알림)

## 아키텍처

### 듀얼 레이아웃 시스템

Route Group을 사용하여 두 레이아웃이 완전히 분리된다:

```
src/app/layout.tsx              ← Root (ThemeProvider, TooltipProvider, Toaster)
├── src/app/(public)/layout.tsx ← 퍼블릭 (SiteHeader + SiteFooter)
│   ├── page.tsx                   /
│   └── about/page.tsx             /about
└── src/app/(dashboard)/layout.tsx ← 대시보드 (SidebarProvider + DashboardSidebar)
    └── dashboard/page.tsx         /dashboard
```

### 컴포넌트 구조

- `components/ui/` — shadcn/ui 기본 컴포넌트 (직접 수정 지양)
- `components/layout/` — 레이아웃 컴포넌트 (헤더, 푸터, 사이드바)
- `components/common/` — 공용 컴포넌트 (로고 등)
- `components/providers/` — Context Provider (ThemeProvider)

### 중앙 설정

- `config/site.ts` — 사이트 이름, 설명, URL, 네비게이션 메뉴 구조를 한곳에서 관리
- `types/nav.ts` — `NavItem`, `NavGroup` 타입 정의 (아이콘, 배지, disabled, external 지원)

### 유틸리티

- `lib/utils.ts` — `cn()` 함수 (clsx + tailwind-merge)
- `hooks/use-mobile.ts` — 모바일 감지 훅 (768px 기준)

## 코딩 규칙

- **언어**: 응답, 주석, 커밋, 문서 → 한국어 / 변수명, 함수명 → 영어
- **들여쓰기**: 2칸
- **any 타입 사용 금지**
- **Server Component 우선**: 상태/인터랙션이 필요한 경우에만 `"use client"` 사용
- **반응형 필수**: Tailwind 반응형 클래스 활용 (md 브레이크포인트 기준)
- **스타일링**: `cn()` 유틸리티로 조건부 클래스 결합
