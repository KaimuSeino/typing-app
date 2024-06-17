"use client"




import { Home, User } from "lucide-react";
import SidebarItem from "./sidebar-item";

const routes = [
  {
    icon: Home,
    label: "レッスン",
    href: "/learn"
  },

  {
    icon: User,
    label: "プロフィール",
    href: "/profile"
  },
]

const SidebarRoutes = () => {
  return (
    <div className="flex flex-col w-full p-2 space-y-2">
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          href={route.href}
          label={route.label}
        />
      ))}
    </div>
  );
}

export default SidebarRoutes;