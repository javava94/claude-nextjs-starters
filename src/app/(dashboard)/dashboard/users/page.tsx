import type { Metadata } from "next"
import { DashboardHeader } from "@/components/layout/dashboard-header"
import { UserTable } from "@/components/users/user-table"

export const metadata: Metadata = {
  title: "사용자 관리",
  description: "사용자를 조회, 추가, 수정, 삭제할 수 있는 관리 페이지",
}

export default function UsersPage() {
  return (
    <>
      <DashboardHeader breadcrumbs={[{ title: "사용자 관리" }]} />
      <div className="flex-1 space-y-6 p-6">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight">사용자 관리</h1>
          <p className="text-muted-foreground">
            시스템 사용자를 조회하고 관리합니다.
          </p>
        </div>
        <UserTable />
      </div>
    </>
  )
}
