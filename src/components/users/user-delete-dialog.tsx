"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import type { User } from "@/types/user"

interface UserDeleteDialogProps {
  /** 다이얼로그 열림 상태 */
  open: boolean
  /** 다이얼로그 닫기 핸들러 */
  onOpenChange: (open: boolean) => void
  /** 삭제 확인 핸들러 */
  onConfirm: () => void
  /** 삭제 대상 사용자 */
  user: User | null
}

/** 사용자 삭제 확인 다이얼로그 */
export function UserDeleteDialog({
  open,
  onOpenChange,
  onConfirm,
  user,
}: UserDeleteDialogProps) {
  const handleConfirm = () => {
    onConfirm()
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>사용자 삭제</DialogTitle>
          <DialogDescription>
            정말로 <strong>{user?.name}</strong> 사용자를 삭제하시겠습니까?
            이 작업은 되돌릴 수 없습니다.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            취소
          </Button>
          <Button variant="destructive" onClick={handleConfirm}>
            삭제
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
