"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 p-6 text-center">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">오류가 발생했습니다</h2>
        <p className="text-muted-foreground">
          사용자 데이터를 불러오는 중 문제가 발생했습니다.
        </p>
      </div>
      <Button onClick={() => reset()}>다시 시도</Button>
    </div>
  )
}
