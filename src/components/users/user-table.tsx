"use client"

import { useState } from "react"
import {
  MoreHorizontal,
  Pencil,
  Plus,
  Search,
  Trash2,
  UserPlus,
} from "lucide-react"
import { toast } from "sonner"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { UserDeleteDialog } from "@/components/users/user-delete-dialog"
import { UserFormDialog } from "@/components/users/user-form-dialog"
import { UserRoleBadge } from "@/components/users/user-role-badge"
import { UserStatusBadge } from "@/components/users/user-status-badge"
import type { User, UserFormData, UserRole, UserStatus } from "@/types/user"
import { USER_ROLE_LABELS, USER_STATUS_LABELS } from "@/types/user"

/** 초기 샘플 사용자 데이터 */
const initialUsers: User[] = [
  {
    id: "1",
    name: "김지훈",
    email: "jihun.kim@example.com",
    role: "admin",
    status: "active",
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    name: "이서연",
    email: "seoyeon.lee@example.com",
    role: "manager",
    status: "active",
    createdAt: "2024-02-20",
  },
  {
    id: "3",
    name: "박민준",
    email: "minjun.park@example.com",
    role: "member",
    status: "inactive",
    createdAt: "2024-03-10",
  },
  {
    id: "4",
    name: "최수아",
    email: "sua.choi@example.com",
    role: "member",
    status: "active",
    createdAt: "2024-04-05",
  },
  {
    id: "5",
    name: "정도윤",
    email: "doyun.jung@example.com",
    role: "manager",
    status: "pending",
    createdAt: "2024-05-12",
  },
  {
    id: "6",
    name: "강하은",
    email: "haeun.kang@example.com",
    role: "member",
    status: "active",
    createdAt: "2024-06-18",
  },
  {
    id: "7",
    name: "윤시우",
    email: "siwoo.yoon@example.com",
    role: "member",
    status: "pending",
    createdAt: "2024-07-22",
  },
  {
    id: "8",
    name: "임지우",
    email: "jiwoo.lim@example.com",
    role: "admin",
    status: "active",
    createdAt: "2024-08-30",
  },
]

/** 이름에서 이니셜 추출 */
function getInitials(name: string): string {
  return name
    .split("")
    .filter((char) => char.match(/[가-힣a-zA-Z]/))
    .slice(0, 2)
    .join("")
}

/** 사용자 관리 테이블 */
export function UserTable() {
  const [users, setUsers] = useState<User[]>(initialUsers)
  const [searchQuery, setSearchQuery] = useState("")
  const [roleFilter, setRoleFilter] = useState<UserRole | "all">("all")
  const [statusFilter, setStatusFilter] = useState<UserStatus | "all">("all")

  // 다이얼로그 상태
  const [formOpen, setFormOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | undefined>(undefined)
  const [deleteTarget, setDeleteTarget] = useState<User | null>(null)

  // 필터링된 사용자 목록
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRole = roleFilter === "all" || user.role === roleFilter
    const matchesStatus =
      statusFilter === "all" || user.status === statusFilter
    return matchesSearch && matchesRole && matchesStatus
  })

  // 사용자 추가
  const handleAddUser = (data: UserFormData) => {
    const newUser: User = {
      id: String(Date.now()),
      ...data,
      createdAt: new Date().toISOString().split("T")[0],
    }
    setUsers((prev) => [...prev, newUser])
    toast.success(`${data.name} 사용자가 추가되었습니다.`)
  }

  // 사용자 수정
  const handleEditUser = (data: UserFormData) => {
    if (!selectedUser) return
    setUsers((prev) =>
      prev.map((user) =>
        user.id === selectedUser.id ? { ...user, ...data } : user
      )
    )
    toast.success(`${data.name} 사용자 정보가 수정되었습니다.`)
    setSelectedUser(undefined)
  }

  // 사용자 삭제
  const handleDeleteUser = () => {
    if (!deleteTarget) return
    setUsers((prev) => prev.filter((user) => user.id !== deleteTarget.id))
    toast.success(`${deleteTarget.name} 사용자가 삭제되었습니다.`)
    setDeleteTarget(null)
  }

  // 추가 다이얼로그 열기
  const openAddDialog = () => {
    setSelectedUser(undefined)
    setFormOpen(true)
  }

  // 수정 다이얼로그 열기
  const openEditDialog = (user: User) => {
    setSelectedUser(user)
    setFormOpen(true)
  }

  // 삭제 다이얼로그 열기
  const openDeleteDialog = (user: User) => {
    setDeleteTarget(user)
    setDeleteOpen(true)
  }

  return (
    <div className="space-y-4">
      {/* 툴바: 검색 + 필터 + 추가 버튼 */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 flex-col gap-2 sm:flex-row sm:items-center">
          {/* 검색 */}
          <div className="relative flex-1 sm:max-w-xs">
            <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
            <Input
              placeholder="이름 또는 이메일 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
          </div>

          {/* 역할 필터 */}
          <Select
            value={roleFilter}
            onValueChange={(value) =>
              setRoleFilter(value as UserRole | "all")
            }
          >
            <SelectTrigger className="w-full sm:w-[130px]">
              <SelectValue placeholder="역할" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">전체 역할</SelectItem>
              {(
                Object.entries(USER_ROLE_LABELS) as [UserRole, string][]
              ).map(([value, label]) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* 상태 필터 */}
          <Select
            value={statusFilter}
            onValueChange={(value) =>
              setStatusFilter(value as UserStatus | "all")
            }
          >
            <SelectTrigger className="w-full sm:w-[130px]">
              <SelectValue placeholder="상태" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">전체 상태</SelectItem>
              {(
                Object.entries(USER_STATUS_LABELS) as [UserStatus, string][]
              ).map(([value, label]) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* 사용자 추가 버튼 */}
        <Button onClick={openAddDialog} className="w-full sm:w-auto">
          <Plus className="mr-2 size-4" />
          <span className="hidden sm:inline">사용자 추가</span>
          <span className="sm:hidden">추가</span>
        </Button>
      </div>

      {/* 통계 요약 */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
          <p className="text-sm text-muted-foreground">전체 사용자</p>
          <p className="text-2xl font-bold">{users.length}</p>
        </div>
        <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
          <p className="text-sm text-muted-foreground">활성 사용자</p>
          <p className="text-2xl font-bold">
            {users.filter((u) => u.status === "active").length}
          </p>
        </div>
        <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
          <p className="text-sm text-muted-foreground">대기 중</p>
          <p className="text-2xl font-bold">
            {users.filter((u) => u.status === "pending").length}
          </p>
        </div>
      </div>

      {/* 테이블 */}
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">사용자</TableHead>
              <TableHead className="hidden md:table-cell">역할</TableHead>
              <TableHead className="hidden sm:table-cell">상태</TableHead>
              <TableHead className="hidden lg:table-cell">가입일</TableHead>
              <TableHead className="w-[50px]">
                <span className="sr-only">작업</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-32 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <UserPlus className="size-8 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      {searchQuery || roleFilter !== "all" || statusFilter !== "all"
                        ? "검색 결과가 없습니다."
                        : "등록된 사용자가 없습니다."}
                    </p>
                    {!searchQuery &&
                      roleFilter === "all" &&
                      statusFilter === "all" && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={openAddDialog}
                        >
                          <Plus className="mr-2 size-4" />
                          첫 사용자 추가
                        </Button>
                      )}
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  {/* 사용자 정보 */}
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="size-8">
                        <AvatarFallback className="text-xs">
                          {getInitials(user.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <p className="truncate font-medium">{user.name}</p>
                        <p className="truncate text-sm text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </TableCell>

                  {/* 역할 */}
                  <TableCell className="hidden md:table-cell">
                    <UserRoleBadge role={user.role} />
                  </TableCell>

                  {/* 상태 */}
                  <TableCell className="hidden sm:table-cell">
                    <UserStatusBadge status={user.status} />
                  </TableCell>

                  {/* 가입일 */}
                  <TableCell className="hidden lg:table-cell">
                    <span className="text-sm text-muted-foreground">
                      {user.createdAt}
                    </span>
                  </TableCell>

                  {/* 작업 메뉴 */}
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="size-8">
                          <MoreHorizontal className="size-4" />
                          <span className="sr-only">작업 메뉴</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => openEditDialog(user)}
                        >
                          <Pencil className="mr-2 size-4" />
                          수정
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => openDeleteDialog(user)}
                          className="text-destructive focus:text-destructive"
                        >
                          <Trash2 className="mr-2 size-4" />
                          삭제
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* 결과 카운트 */}
      <p className="text-sm text-muted-foreground">
        전체 {users.length}명 중 {filteredUsers.length}명 표시
      </p>

      {/* 사용자 추가/수정 다이얼로그 */}
      <UserFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        onSubmit={selectedUser ? handleEditUser : handleAddUser}
        user={selectedUser}
      />

      {/* 사용자 삭제 확인 다이얼로그 */}
      <UserDeleteDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        onConfirm={handleDeleteUser}
        user={deleteTarget}
      />
    </div>
  )
}
