import Link from "next/link"
import { Command } from "lucide-react"

interface LogoProps {
  href?: string
  showText?: boolean
}

export function Logo({ href = "/", showText = true }: LogoProps) {
  return (
    <Link href={href} className="flex items-center gap-2 font-semibold">
      <Command className="size-5" />
      {showText && <span>Starter Kit</span>}
    </Link>
  )
}
