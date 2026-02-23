import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { UserRole } from "@/types/user"
import { USER_ROLE_LABELS } from "@/types/user"

interface UserRoleBadgeProps {
  role: UserRole
}

/** 역할별 스타일 맵 */
const roleStyles: Record<UserRole, string> = {
  admin: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  manager: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  member: "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300",
}

/** 사용자 역할 배지 */
export function UserRoleBadge({ role }: UserRoleBadgeProps) {
  return (
    <Badge variant="outline" className={cn("border-0", roleStyles[role])}>
      {USER_ROLE_LABELS[role]}
    </Badge>
  )
}
