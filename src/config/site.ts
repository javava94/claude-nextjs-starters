import {
  LayoutDashboard,
  Settings,
  Users,
  FileText,
  BarChart3,
} from "lucide-react"
import type { NavItem, NavGroup } from "@/types/nav"

export const siteConfig = {
  name: "Starter Kit",
  description: "범용 Next.js 웹 스타터킷",
  url: "https://example.com",
}

// 퍼블릭 네비게이션 항목
export const publicNav: NavItem[] = [
  { title: "홈", href: "/" },
  { title: "소개", href: "/about" },
  { title: "대시보드", href: "/dashboard" },
]

// 대시보드 사이드바 네비게이션 그룹
export const dashboardNav: NavGroup[] = [
  {
    title: "메뉴",
    items: [
      { title: "대시보드", href: "/dashboard", icon: LayoutDashboard },
      { title: "분석", href: "/dashboard", icon: BarChart3, badge: "곧 출시" },
      { title: "사용자", href: "/dashboard", icon: Users },
      { title: "문서", href: "/dashboard", icon: FileText },
    ],
  },
  {
    title: "설정",
    items: [
      { title: "설정", href: "/dashboard", icon: Settings },
    ],
  },
]
