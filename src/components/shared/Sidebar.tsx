import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Settings,
  CreditCard,
  ChevronLeft,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

type SidebarItem =
  | {
      name: string;
      icon: LucideIcon;
      path: string;
      children?: never;
    }
  | {
      name: string;
      icon: LucideIcon;
      children: {
        name: string;
        path: string;
      }[];
      path?: never;
    };

const menuItems: SidebarItem[] = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { name: "Users/caregivers", icon: Users, path: "/customers" },
  { name: "Callback-Requests", icon: CreditCard, path: "/callback-requests" },
  { name: "Billing", icon: CreditCard, path: "/billing" },
  { name: "Settings", icon: Settings, path: "/settings" },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);

  return (
    <aside
      className={cn(
        "h-screen bg-background border-r transition-all duration-300 flex flex-col",
        collapsed ? "w-20" : "w-64",
      )}
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-between px-4 border-b">
        {!collapsed && (
          <span className="font-semibold text-lg tracking-tight">ByteCare</span>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded-md hover:bg-muted transition"
        >
          <ChevronLeft
            size={18}
            className={cn("transition-transform", collapsed && "rotate-180")}
          />
        </button>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-3 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const hasChildren = !!item.children;

          return (
            <div key={item.name}>
              {/* Main Menu Item */}
              {hasChildren ? (
                <button
                  onClick={() =>
                    setOpenMenu(openMenu === item.name ? null : item.name)
                  }
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition",
                    "text-muted-foreground hover:bg-muted hover:text-foreground",
                    collapsed && "justify-center",
                  )}
                >
                  <Icon size={18} />
                  {!collapsed && (
                    <>
                      <span className="flex-1 text-left">{item.name}</span>
                      <ChevronDown
                        size={16}
                        className={cn(
                          "transition-transform",
                          openMenu === item.name && "rotate-180",
                        )}
                      />
                    </>
                  )}
                </button>
              ) : (
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition",
                      isActive
                        ? "bg-muted text-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground",
                      collapsed && "justify-center",
                    )
                  }
                >
                  <Icon size={18} />
                  {!collapsed && <span>{item.name}</span>}
                </NavLink>
              )}

              {/* Submenu */}
              {hasChildren && openMenu === item.name && !collapsed && (
                <div className="ml-8 mt-1 space-y-1">
                  {item.children.map((sub) => (
                    <NavLink
                      key={sub.name}
                      to={sub.path}
                      className={({ isActive }) =>
                        cn(
                          "block px-3 py-2 rounded-md text-sm transition",
                          isActive
                            ? "bg-muted text-foreground"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground",
                        )
                      }
                    >
                      {sub.name}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="p-4 border-t text-xs text-muted-foreground">
        {!collapsed && "v1.0.0"}
      </div>
    </aside>
  );
}
