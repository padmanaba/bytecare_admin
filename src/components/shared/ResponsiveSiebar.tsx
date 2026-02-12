import { NavLink } from "react-router-dom";
import { LayoutDashboard, Users, Settings, CreditCard, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

const menuItems = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { name: "Customers", icon: Users, path: "/customers" },
  { name: "Billing", icon: CreditCard, path: "/billing" },
  { name: "Settings", icon: Settings, path: "/settings" },
];

export default function ResponsiveSidebar({
  mobileOpen,
  setMobileOpen,
}: SidebarProps) {
  return (
    <>
      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed md:static z-50 top-0 left-0 h-full w-64 bg-background border-r transition-transform duration-300",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
          "md:translate-x-0",
        )}
      >
        {/* Header */}
        <div className="h-16 flex items-center justify-between px-6 border-b">
          <span className="font-semibold text-lg tracking-tight">ByteCare</span>

          {/* Close button (mobile only) */}
          <button onClick={() => setMobileOpen(false)} className="md:hidden">
            <X size={18} />
          </button>
        </div>

        {/* Menu */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition",
                    isActive
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )
                }
              >
                <Icon size={18} />
                {item.name}
              </NavLink>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
