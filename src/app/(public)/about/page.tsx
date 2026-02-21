import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "소개",
  description: "프로젝트 소개 페이지",
}

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mx-auto max-w-2xl space-y-8">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            소개
          </h1>
          <p className="text-lg text-muted-foreground">
            이 프로젝트는 Next.js 기반의 범용 웹 스타터킷입니다.
          </p>
        </div>

        <div className="space-y-6">
          <section className="space-y-3">
            <h2 className="text-2xl font-semibold">기술 스택</h2>
            <ul className="list-inside list-disc space-y-2 text-muted-foreground">
              <li>Next.js 16 (App Router)</li>
              <li>React 19</li>
              <li>TypeScript</li>
              <li>Tailwind CSS v4</li>
              <li>shadcn/ui</li>
              <li>lucide-react</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold">주요 기능</h2>
            <ul className="list-inside list-disc space-y-2 text-muted-foreground">
              <li>퍼블릭 + 대시보드 듀얼 레이아웃</li>
              <li>반응형 모바일 네비게이션</li>
              <li>다크모드 토글 (라이트/다크/시스템)</li>
              <li>중앙 집중 네비게이션 설정</li>
              <li>404 및 에러 페이지</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
}
