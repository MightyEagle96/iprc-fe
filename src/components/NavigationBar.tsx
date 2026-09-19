import { useState } from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    {
      label: "Home",
      path: "/",
    },
    {
      label: "Events",
      path: "/events",
    },
    {
      label: "Register",
      path: "/register",
    },
    {
      label: "View My Cohort",
      path: "/cohort",
    },
    {
      label: "Gallery",
      path: "/gallery",
    },
    {
      label: "Panel",
      path: "/panel",
    },
  ];

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 shadow-2xl backdrop-blur-xl sm:px-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <NavLink
              to="/"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500">
                <span className="text-lg font-black text-white">I</span>
              </div>

              <div className="hidden sm:block">
                <p className="text-sm font-black tracking-wide text-white">
                  IMPACT 2026
                </p>

                <p className="text-[10px] font-medium uppercase tracking-wider text-white/50">
                  New Life Youth & Young Adults
                </p>
              </div>
            </NavLink>

            {/* Desktop Navigation */}
            <div className="hidden items-center gap-2 md:flex">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                      isActive
                        ? "bg-emerald-500 text-white"
                        : "text-white/70 hover:bg-white/10 hover:text-white"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="rounded-xl p-2 text-white transition hover:bg-white/10 md:hidden"
              aria-label="Toggle navigation"
            >
              {mobileOpen ? (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileOpen && (
            <div className="mt-3 border-t border-white/10 pt-3 md:hidden">
              <div className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      `rounded-xl px-4 py-3 text-sm font-semibold transition ${
                        isActive
                          ? "bg-emerald-500 text-white"
                          : "text-white/70 hover:bg-white/10 hover:text-white"
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
