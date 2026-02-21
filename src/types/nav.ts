import type { LucideIcon } from "lucide-react"

export interface NavItem {
  title: string
  href: string
  icon?: LucideIcon
  disabled?: boolean
  external?: boolean
  badge?: string
}

export interface NavGroup {
  title: string
  items: NavItem[]
}
