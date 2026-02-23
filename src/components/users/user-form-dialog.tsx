"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { User, UserFormData, UserRole, UserStatus } from "@/types/user"
import { USER_ROLE_LABELS, USER_STATUS_LABELS } from "@/types/user"

interface UserFormDialogProps {
  /** 다이얼로그 열림 상태 */
  open: boolean
  /** 다이얼로그 닫기 핸들러 */
  onOpenChange: (open: boolean) => void
  /** 폼 제출 핸들러 */
  onSubmit: (data: UserFormData) => void
  /** 수정 시 기존 사용자 데이터 */
  user?: User
}

interface UserFormContentProps {
  /** 폼 제출 핸들러 */
  onSubmit: (data: UserFormData) => void
  /** 다이얼로그 닫기 핸들러 */
  onClose: () => void
  /** 수정 시 기존 사용자 데이터 */
  user?: User
}

/** 폼 내부 컴포넌트 (key로 리마운트되어 초기값 동기화) */
function UserFormContent({ onSubmit, onClose, user }: UserFormContentProps) {
  const [name, setName] = useState(user?.name ?? "")
  const [email, setEmail] = useState(user?.email ?? "")
  const [role, setRole] = useState<UserRole>(user?.role ?? "member")
  const [status, setStatus] = useState<UserStatus>(user?.status ?? "active")

  const isEdit = !!user

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ name, email, role, status })
    onClose()
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>{isEdit ? "사용자 수정" : "사용자 추가"}</DialogTitle>
        <DialogDescription>
          {isEdit
            ? "사용자 정보를 수정합니다."
            : "새 사용자를 추가합니다."}
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-4 py-4">
          {/* 이름 */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              이름
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-3"
              placeholder="이름을 입력하세요"
              required
            />
          </div>

          {/* 이메일 */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              이메일
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="col-span-3"
              placeholder="email@example.com"
              required
            />
          </div>

          {/* 역할 */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="role" className="text-right">
              역할
            </Label>
            <Select
              value={role}
              onValueChange={(value: UserRole) => setRole(value)}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="역할 선택" />
              </SelectTrigger>
              <SelectContent>
                {(
                  Object.entries(USER_ROLE_LABELS) as [UserRole, string][]
                ).map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* 상태 */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right">
              상태
            </Label>
            <Select
              value={status}
              onValueChange={(value: UserStatus) => setStatus(value)}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="상태 선택" />
              </SelectTrigger>
              <SelectContent>
                {(
                  Object.entries(USER_STATUS_LABELS) as [
                    UserStatus,
                    string,
                  ][]
                ).map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            취소
          </Button>
          <Button type="submit">{isEdit ? "수정" : "추가"}</Button>
        </DialogFooter>
      </form>
    </>
  )
}

/** 사용자 추가/수정 다이얼로그 */
export function UserFormDialog({
  open,
  onOpenChange,
  onSubmit,
  user,
}: UserFormDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        {/* key를 사용하여 다이얼로그가 열릴 때마다 폼 상태를 초기화 */}
        <UserFormContent
          key={user?.id ?? "new"}
          onSubmit={onSubmit}
          onClose={() => onOpenChange(false)}
          user={user}
        />
      </DialogContent>
    </Dialog>
  )
}
