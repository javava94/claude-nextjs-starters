import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { UserStatus } from "@/types/user"
import { USER_STATUS_LABELS } from "@/types/user"

interface UserStatusBadgeProps {
  status: UserStatus
}

/** 상태별 스타일 맵 */
const statusStyles: Record<UserStatus, string> = {
  active: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  inactive: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
  pending:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
}

/** 사용자 상태 배지 */
export function UserStatusBadge({ status }: UserStatusBadgeProps) {
  return (
    <Badge variant="outline" className={cn("border-0", statusStyles[status])}>
      {USER_STATUS_LABELS[status]}
    </Badge>
  )
}
