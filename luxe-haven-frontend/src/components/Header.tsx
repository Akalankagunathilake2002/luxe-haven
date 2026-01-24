"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { logout } from "@/lib/auth";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/properties", label: "Properties" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
  { href: "/agents", label: "Agents" },
];

function cx(...classes: Array<string | false | undefined | null>) {
  return classes.filter(Boolean).join(" ");
}

function IconMenu(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}
function IconX(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}
function IconUser(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
    </svg>
  );
}
function IconArrowIn(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 17l5-5-5-5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H3" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21V3" />
    </svg>
  );
}
function IconArrowOut(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M14 7l-5 5 5 5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h12" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 21V3" />
    </svg>
  );
}

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();

  const [mobileOpen, setMobileOpen] = useState(false);

  // ✅ avoid hydration mismatch by reading localStorage in useEffect
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(Boolean(token));
  }, []);

  // close drawer on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isActive = (href: string) => pathname === href;

  const handleLogout = () => {
    logout();
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
    router.push("/");
  };

  const brand = useMemo(
    () => (
      <Link href="/" className="group flex items-center gap-3">
        {/* Logo */}
        <div className="relative grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-[#b07a52] to-[#9a6643] text-white shadow-lg shadow-[#b07a52]/20 ring-1 ring-white/30">
          <span className="text-sm font-black tracking-tight">LH</span>
          <div className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_20%_15%,rgba(255,255,255,.35),transparent_45%)]" />
        </div>

        {/* Text */}
        <div className="leading-none">
          <div className="text-lg font-black tracking-tight text-[#2b221b]">
            Luxe<span className="text-[#b07a52]">Haven</span>
          </div>
          <div className="mt-1 text-[11px] font-semibold tracking-[0.22em] text-[#9a6643]/90">
            PREMIUM REAL ESTATE
          </div>
        </div>
      </Link>
    ),
    []
  );

  return (
    <header className="sticky top-0 z-50 border-b border-[#b07a52]/10 bg-white/70 backdrop-blur-xl">
      <div className="mx-auto w-[min(1400px,94%)]">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Left */}
          <div className="flex items-center gap-6">
            {brand}

            {/* Desktop nav */}
            <nav className="hidden items-center gap-1 lg:flex">
              {navLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className={cx(
                    "relative rounded-full px-4 py-2 text-sm font-semibold transition",
                    "text-[#4c3b2f] hover:bg-[#b07a52]/10",
                    isActive(l.href) && "bg-[#b07a52]/12 text-[#2b221b]"
                  )}
                >
                  {l.label}
                  {/* active underline */}
                  <span
                    className={cx(
                      "pointer-events-none absolute left-1/2 top-[calc(100%-2px)] h-[2px] w-0 -translate-x-1/2 rounded-full bg-gradient-to-r from-[#b07a52] to-[#9a6643] transition-all",
                      isActive(l.href) && "w-8"
                    )}
                  />
                </Link>
              ))}
            </nav>
          </div>

          {/* Right */}
          <div className="flex items-center gap-2">
            {/* Desktop auth */}
            <div className="hidden items-center gap-2 lg:flex">
              {isLoggedIn ? (
                <>
                  <button
                    onClick={() => router.push("/dashboard")}
                    className="inline-flex items-center gap-2 rounded-full border border-[#b07a52]/25 bg-white px-4 py-2 text-sm font-bold text-[#b07a52] shadow-sm transition hover:bg-[#b07a52]/10"
                  >
                    <IconUser className="h-4 w-4" />
                    Dashboard
                  </button>
                  <button
                    onClick={handleLogout}
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#ff6b6b] to-[#ee5a5a] px-4 py-2 text-sm font-extrabold text-white shadow-md shadow-red-500/20 transition hover:brightness-95"
                  >
                    <IconArrowOut className="h-4 w-4" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => router.push("/login")}
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#b07a52] to-[#9a6643] px-4 py-2 text-sm font-extrabold text-white shadow-md shadow-[#b07a52]/25 transition hover:brightness-95"
                  >
                    <IconArrowIn className="h-4 w-4" />
                    Login
                  </button>
                  <button
                    onClick={() => router.push("/signup")}
                    className="inline-flex items-center gap-2 rounded-full border border-[#b07a52]/25 bg-white px-4 py-2 text-sm font-extrabold text-[#b07a52] shadow-sm transition hover:bg-[#b07a52]/10"
                  >
                    <IconUser className="h-4 w-4" />
                    Sign Up
                  </button>
                </>
              )}
            </div>

            {/* Mobile button */}
            <button
              onClick={() => setMobileOpen((p) => !p)}
              className="grid h-10 w-10 place-items-center rounded-xl border border-[#b07a52]/15 bg-white/70 text-[#2b221b] shadow-sm transition hover:bg-[#b07a52]/10 lg:hidden"
              aria-label="Open menu"
            >
              {mobileOpen ? <IconX className="h-5 w-5" /> : <IconMenu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden">
          <div className="border-t border-[#b07a52]/10 bg-white/80 backdrop-blur-xl">
            <div className="mx-auto w-[min(1400px,94%)] py-4">
              <div className="grid gap-2">
                {navLinks.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className={cx(
                      "flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-bold transition",
                      isActive(l.href)
                        ? "bg-gradient-to-r from-[#b07a52] to-[#9a6643] text-white"
                        : "bg-white text-[#4c3b2f] hover:bg-[#b07a52]/10 border border-[#b07a52]/10"
                    )}
                  >
                    <span>{l.label}</span>
                    <span className={cx("text-xs opacity-80", isActive(l.href) && "opacity-100")}>→</span>
                  </Link>
                ))}

                <div className="mt-2 grid gap-2">
                  {isLoggedIn ? (
                    <>
                      <button
                        onClick={() => router.push("/dashboard")}
                        className="flex w-full items-center justify-center gap-2 rounded-2xl border border-[#b07a52]/25 bg-white px-4 py-3 text-sm font-extrabold text-[#b07a52] transition hover:bg-[#b07a52]/10"
                      >
                        <IconUser className="h-4 w-4" />
                        Dashboard
                      </button>
                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#ff6b6b] to-[#ee5a5a] px-4 py-3 text-sm font-extrabold text-white shadow-md shadow-red-500/20 transition hover:brightness-95"
                      >
                        <IconArrowOut className="h-4 w-4" />
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => router.push("/login")}
                        className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#b07a52] to-[#9a6643] px-4 py-3 text-sm font-extrabold text-white shadow-md shadow-[#b07a52]/25 transition hover:brightness-95"
                      >
                        <IconArrowIn className="h-4 w-4" />
                        Login
                      </button>
                      <button
                        onClick={() => router.push("/signup")}
                        className="flex w-full items-center justify-center gap-2 rounded-2xl border border-[#b07a52]/25 bg-white px-4 py-3 text-sm font-extrabold text-[#b07a52] transition hover:bg-[#b07a52]/10"
                      >
                        <IconUser className="h-4 w-4" />
                        Sign Up
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
