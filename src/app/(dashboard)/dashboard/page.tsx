import type { Metadata } from "next"
import { Activity, CreditCard, DollarSign, Users } from "lucide-react"
import { DashboardHeader } from "@/components/layout/dashboard-header"

export const metadata: Metadata = {
  title: "대시보드",
  description: "대시보드 메인 페이지",
}

export default function DashboardPage() {
  return (
    <>
      <DashboardHeader />
      <div className="flex-1 space-y-6 p-6">
        <h1 className="text-2xl font-bold tracking-tight">대시보드</h1>

        {/* 통계 카드 그리드 */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.title}
              className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </p>
                <stat.icon className="size-4 text-muted-foreground" />
              </div>
              <div className="mt-2">
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.change}</p>
              </div>
            </div>
          ))}
        </div>

        {/* 콘텐츠 영역 */}
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
            <h3 className="mb-4 text-lg font-semibold">최근 활동</h3>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="size-2 rounded-full bg-primary" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
            <h3 className="mb-4 text-lg font-semibold">안내</h3>
            <p className="text-sm text-muted-foreground">
              이 대시보드는 스타터킷의 예시 페이지입니다.
              실제 프로젝트에서는 이곳에 차트, 테이블, 폼 등
              다양한 컴포넌트를 배치할 수 있습니다.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

const stats = [
  {
    title: "총 수익",
    value: "₩45,231,890",
    change: "전월 대비 +20.1%",
    icon: DollarSign,
  },
  {
    title: "구독자",
    value: "+2,350",
    change: "전월 대비 +180.1%",
    icon: Users,
  },
  {
    title: "판매량",
    value: "+12,234",
    change: "전월 대비 +19%",
    icon: CreditCard,
  },
  {
    title: "활성 사용자",
    value: "+573",
    change: "전월 대비 +201",
    icon: Activity,
  },
]

const recentActivities = [
  { title: "새 사용자 가입", time: "5분 전" },
  { title: "주문 #1234 완료", time: "15분 전" },
  { title: "시스템 업데이트 완료", time: "1시간 전" },
  { title: "새 리뷰 등록", time: "2시간 전" },
  { title: "결제 처리 완료", time: "3시간 전" },
]
