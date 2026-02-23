/** 사용자 역할 */
export type UserRole = "admin" | "manager" | "member"

/** 사용자 상태 */
export type UserStatus = "active" | "inactive" | "pending"

/** 사용자 엔티티 */
export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  status: UserStatus
  avatar?: string
  createdAt: string
}

/** 사용자 폼 입력 데이터 */
export interface UserFormData {
  name: string
  email: string
  role: UserRole
  status: UserStatus
}

/** 역할 라벨 맵 */
export const USER_ROLE_LABELS: Record<UserRole, string> = {
  admin: "관리자",
  manager: "매니저",
  member: "멤버",
}

/** 상태 라벨 맵 */
export const USER_STATUS_LABELS: Record<UserStatus, string> = {
  active: "활성",
  inactive: "비활성",
  pending: "대기",
}
