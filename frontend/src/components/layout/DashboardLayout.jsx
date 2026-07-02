import { useState } from "react";
import { Link, useLocation, Outlet } from "react-router";
import { Menu, X } from "lucide-react";
import Container from "../Container";

function DashboardLayout({ title, menuItems }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  return (
    <Container>
      <div className="w-full lg:p-8 lg:bg-zinc-50 min-h-screen font-sans text-zinc-900 antialiased">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 relative items-start">
          {/* Mobile menu */}
          <div className="w-full lg:hidden flex items-center justify-between bg-zinc-50 border border-zinc-200/80 p-4 rounded-xl mb-2">
            <div>
              <h3 className="text-sm font-bold text-zinc-800 font-heading">{title}</h3>
              <p className="text-[11px] text-zinc-400 mt-0.5">
                Tap menu to navigate settings
              </p>
            </div>
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 bg-white border border-zinc-200 text-zinc-700 rounded-lg hover:text-mauve-500 transition-colors cursor-pointer"
            >
              <Menu size={18} strokeWidth={2.5} />
            </button>
          </div>

          {/* Mobile sidebar */}
          {isSidebarOpen && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <div
                className="absolute inset-0 bg-zinc-900/40 backdrop-blur-xs transition-opacity"
                onClick={() => setIsSidebarOpen(false)}
              />

              <div className="absolute top-0 left-0 bottom-0 w-72 bg-zinc-50 border-r border-zinc-200 p-6 flex flex-col justify-between animate-in slide-in-from-left duration-200">
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-zinc-200/60 pb-4">
                    <span className="text-sm font-bold tracking-tight text-zinc-800 font-heading">
                      {title}
                    </span>
                    <button
                      onClick={() => setIsSidebarOpen(false)}
                      className="p-1.5 text-zinc-400 hover:text-zinc-600 cursor-pointer"
                    >
                      <X size={18} strokeWidth={2.5} />
                    </button>
                  </div>

                  {/* Mobile Links */}
                  <nav className="space-y-1">
                    {menuItems.map((item) => {
                      const Icon = item.icon;
                      const isActive = location.pathname === item.url;
                      return (
                        <Link
                          key={item.url}
                          to={item.url}
                          onClick={() => setIsSidebarOpen(false)}
                          className={`flex items-center gap-3 px-4 py-3 text-xs font-bold uppercase tracking-wider rounded-xl transition-all border border-transparent ${
                            isActive
                              ? "bg-mauve-500 text-white shadow-sm"
                              : "text-zinc-600 hover:bg-zinc-100/60 hover:text-mauve-500"
                          }`}
                        >
                          <Icon size={14} strokeWidth={isActive ? 2.6 : 2.2} />
                          <span>{item.name}</span>
                        </Link>
                      );
                    })}
                  </nav>
                </div>
              </div>
            </div>
          )}

          {/* Desktop sidebar  */}
          <aside className="hidden lg:flex flex-col gap-8 w-64 shrink-0 sticky top-28 h-fit">
            <div className="border-b border-zinc-200/60 pb-3">
              <h2 className="text-sm font-bold tracking-tight text-zinc-800 font-heading">
                {title}
              </h2>
            </div>
            <nav className="space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.url;
                return (
                  <Link
                    key={item.url}
                    to={item.url}
                    className={`flex items-center gap-3 px-4 py-2.5 text-xs font-bold uppercase tracking-wider rounded-xl transition-all border border-transparent ${
                      isActive
                        ? "bg-mauve-500 text-white shadow-sm"
                        : "text-zinc-600 hover:bg-zinc-100/60 hover:text-mauve-500"
                    }`}
                  >
                    <Icon size={14} strokeWidth={isActive ? 2.6 : 2.2} />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </aside>

          {/* dynamic content */}
          <main className="flex-1 w-full bg-white border border-zinc-200/60 rounded-2xl p-5 sm:p-8 shadow-xs min-h-115">
            <Outlet />
          </main>
        </div>
      </div>
    </Container>
  );
}

export default DashboardLayout;
