import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/config/site"

export default function HomePage() {
  return (
    <div className="flex flex-col items-center">
      {/* 히어로 섹션 */}
      <section className="container mx-auto flex flex-col items-center gap-6 px-4 py-24 text-center md:py-32">
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          {siteConfig.name}으로
          <br />
          빠르게 시작하세요
        </h1>
        <p className="max-w-xl text-lg text-muted-foreground">
          Next.js, Tailwind CSS, shadcn/ui 기반의 범용 웹 스타터킷입니다.
          퍼블릭 레이아웃과 대시보드 레이아웃을 모두 포함합니다.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link href="/dashboard">
              대시보드 보기
              <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/about">소개 페이지</Link>
          </Button>
        </div>
      </section>

      {/* 기능 소개 섹션 */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm"
            >
              <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

const features = [
  {
    title: "퍼블릭 레이아웃",
    description:
      "반응형 헤더, 모바일 네비게이션, 푸터를 포함한 완성된 퍼블릭 레이아웃",
  },
  {
    title: "대시보드 레이아웃",
    description:
      "shadcn/ui Sidebar 기반의 대시보드 레이아웃 (모바일 Sheet 자동 전환)",
  },
  {
    title: "다크모드",
    description:
      "next-themes 기반 라이트/다크/시스템 테마 지원 및 토글 버튼",
  },
  {
    title: "타입 안전",
    description:
      "TypeScript 기반으로 타입 안전한 네비게이션 설정 및 컴포넌트",
  },
  {
    title: "중앙 설정 관리",
    description:
      "사이트명, 네비게이션 항목 등을 config/site.ts에서 중앙 관리",
  },
  {
    title: "에러 처리",
    description:
      "404 페이지와 에러 바운더리가 기본 포함된 안정적인 에러 처리",
  },
]
