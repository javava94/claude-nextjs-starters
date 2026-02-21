import { siteConfig } from "@/config/site"

export function SiteFooter() {
  return (
    <footer className="border-t py-6">
      <div className="container mx-auto flex flex-col items-center gap-2 px-4 text-center text-sm text-muted-foreground md:flex-row md:justify-between">
        <p>&copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
        <p>
          Built with{" "}
          <a
            href="https://nextjs.org"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-foreground underline-offset-4 hover:underline"
          >
            Next.js
          </a>
        </p>
      </div>
    </footer>
  )
}
