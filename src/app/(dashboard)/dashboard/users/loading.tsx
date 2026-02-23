import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="space-y-1">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-5 w-64" />
      </div>

      {/* 툴바 스켈레톤 */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 gap-2">
          <Skeleton className="h-10 flex-1 sm:max-w-xs" />
          <Skeleton className="hidden h-10 w-[130px] sm:block" />
          <Skeleton className="hidden h-10 w-[130px] sm:block" />
        </div>
        <Skeleton className="h-10 w-full sm:w-[120px]" />
      </div>

      {/* 통계 카드 스켈레톤 */}
      <div className="grid gap-4 sm:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-20 rounded-lg" />
        ))}
      </div>

      {/* 테이블 스켈레톤 */}
      <div className="rounded-lg border">
        <div className="p-4">
          <Skeleton className="mb-4 h-10 w-full" />
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="mb-3 h-16 w-full" />
          ))}
        </div>
      </div>
    </div>
  )
}
