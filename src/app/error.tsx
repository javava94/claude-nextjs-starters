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
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-4 text-center">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tighter">오류 발생</h1>
        <p className="text-muted-foreground">
          예상치 못한 오류가 발생했습니다. 다시 시도해 주세요.
        </p>
      </div>
      <Button onClick={() => reset()}>다시 시도</Button>
    </div>
  )
}
