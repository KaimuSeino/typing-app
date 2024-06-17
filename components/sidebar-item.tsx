"use clinet"

import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"
import { usePathname } from "next/navigation"
import { useRouter } from "next/navigation"

interface SidebarItemProps {
  icon: LucideIcon
  label: string
  href: string
}

const SidebarItem = ({
  icon: Icon,
  label,
  href
}: SidebarItemProps) => {
  const pathname = usePathname()
  const router = useRouter()

  const isActive =
    (pathname === "/" && href === "/") ||
    pathname === href ||
    pathname?.startsWith(`${href}/`)

  const onClick = () => {
    router.push(href)
  }

  return (
    <button
      onClick={onClick}
      type="button"
      className={cn("flex items-center gap-x-2 text-slate-500 font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20 rounded-3xl",
        isActive && "text-[#8078ff] bg-[#8078ff]/20 hover:text-[#8078ff] hover:bg-[#8078ff]/20"
      )}
    >
      <div className="flex items-center gap-x-4 py-4 font-mono">
        <Icon
          size={30}
          className="text-slate-500"
        />
        {label}
      </div>
    </button>
  );
}

export default SidebarItem;