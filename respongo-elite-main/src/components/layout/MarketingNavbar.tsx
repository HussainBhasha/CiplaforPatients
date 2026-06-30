import { useEffect, useState, type MouseEvent } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Container from "@/components/ui/Container";
import { cn } from "@/lib/utils";
import brandLogo from "@/assets/ciplostem-logo.png";
import ciplaLogo from "@/assets/Cipla_logo.svg.png";

const defaultNav = [
  { label: "About", href: "/about" },
  { label: "Doctor", href: "/doctor" },
  { label: "Assessment", href: "/patient#assessment" },
  { label: "Contact", href: "/contact" },
] as const;

const patientNav = [
  { label: "Home", href: "/patient" },
  { label: "Assessment", href: "/patient#assessment" },
  { label: "Contact", href: "/contact" },
] as const;

const doctorNav = [
  { label: "About", href: "/about" },
  { label: "Doctor", href: "/doctor" },
  { label: "Contact", href: "/contact" },
] as const;

export default function MarketingNavbar() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const setPortal = (next: "patient" | "doctor" | null) => {
    if (!next) return;
    try {
      sessionStorage.setItem("ciplostem:portal", next);
    } catch {
      void 0;
    }
  };
  const portal = (() => {
    if (location.pathname.startsWith("/patient")) return "patient" as const;
    if (location.pathname.startsWith("/doctor")) return "doctor" as const;
    try {
      const v = sessionStorage.getItem("ciplostem:portal");
      if (v === "patient" || v === "doctor") return v;
    } catch {
      void 0;
    }
    return null;
  })();
  const nav = portal === "patient" ? patientNav : portal === "doctor" ? doctorNav : defaultNav;

  useEffect(() => {
    if (location.pathname.startsWith("/patient")) setPortal("patient");
    if (location.pathname.startsWith("/doctor")) setPortal("doctor");
  }, [location.pathname]);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div
        className={cn(
          "pointer-events-none absolute inset-x-0 top-0 h-16 transition-opacity",
          scrolled ? "opacity-0" : "opacity-100",
          "bg-gradient-to-b from-white/80 via-white/40 to-transparent",
        )}
      />
      <div
        className={cn(
          "transition-all duration-300 bg-white",
          scrolled ? "shadow-[0_4px_18px_rgb(2_8_23/0.06)]" : "",
        )}
      >
        <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10 pl-4 sm:pl-6 lg:pl-8 flex items-center">
          {portal === "patient" ? (
            <Link to="/" className="inline-flex items-center gap-2 shrink-0">
              <img
                src={ciplaLogo}
                alt="Cipla"
                className="h-10 sm:h-14 lg:h-16 w-auto object-contain contrast-125"
                decoding="async"
                loading="eager"
              />
              <span className="sr-only">Cipla</span>
            </Link>
          ) : (
            <Link to="/" className="inline-flex items-center gap-2 shrink-0">
              <img
                src={brandLogo}
                alt="CiploStem"
                className="h-10 sm:h-14 lg:h-16 w-auto object-contain contrast-125"
                decoding="async"
                loading="eager"
              />
              <span className="sr-only">CiploStem</span>
            </Link>
          )}
        </div>
        <Container>
          <div className={cn("flex h-16 sm:h-20 items-center justify-between relative")}>
            {/* Left: Logo */}
            <div className="relative z-20">
              {/* Logo is already absolutely positioned on the left */}
            </div>

            {/* Middle: Nav Links */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm text-slate-600 absolute left-1/2 -translate-x-1/2">
              {nav.map((item) => {
                const [path, hash] = item.href.split("#");
                const normalizedPath = path || "/";
                const active = location.pathname === normalizedPath && (!hash || location.hash === `#${hash}`);

                return (
                  <Link
                    key={item.label}
                    to={item.href}
                    className={cn(
                      "relative transition-colors hover:text-slate-950",
                      active && "text-slate-950 font-semibold",
                    )}
                    onClick={(e: MouseEvent<HTMLAnchorElement>) => {
                      if (item.href.startsWith("/patient")) setPortal("patient");
                      if (item.href.startsWith("/doctor")) setPortal("doctor");

                      if (hash && location.pathname === normalizedPath) {
                        e.preventDefault();
                        const el = document.getElementById(hash);
                        el?.scrollIntoView({ behavior: "smooth", block: "start" });
                        window.history.replaceState(null, "", `${normalizedPath}#${hash}`);
                        return;
                      }
                      if (!hash && location.pathname === normalizedPath) {
                        e.preventDefault();
                        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
                      }
                    }}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Right: Mobile menu button (if needed) */}
            <div className="relative z-20">
              {!portal && (
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    className="lg:hidden inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/80 ring-1 ring-sky-200/70 text-slate-80 backdrop-blur transition active:scale-95"
                    aria-label={open ? "Close menu" : "Open menu"}
                    aria-expanded={open}
                    onClick={() => setOpen((v) => !v)}
                  >
                    {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                  </button>
                </div>
              )}
              {portal && (
                <button
                  type="button"
                  className="lg:hidden inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/80 ring-1 ring-sky-200/70 text-slate-80 backdrop-blur transition active:scale-95"
                  aria-label={open ? "Close menu" : "Open menu"}
                  aria-expanded={open}
                  onClick={() => setOpen((v) => !v)}
                >
                  {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
              )}
            </div>
          </div>
        </Container>
      </div>

      {/* Mobile sheet */}
      <div
        className={cn(
          "lg:hidden fixed inset-x-0 top-16 sm:top-20 bottom-0 z-30 transition-all duration-300",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        )}
      >
        <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm" onClick={() => setOpen(false)} />
        <div
          className={cn(
            "absolute inset-x-3 top-3 rounded-3xl bg-white shadow-soft-xl ring-1 ring-sky-100 p-4 max-h-[calc(100vh-6rem)] overflow-y-auto transition-transform duration-300",
            open ? "translate-y-0" : "-translate-y-4",
          )}
        >
          <div className="grid gap-1">
            {nav.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="flex items-center justify-between rounded-2xl px-4 py-3.5 text-base font-semibold text-slate-800 hover:bg-sky-50 active:bg-sky-100 transition"
                onClick={() => {
                  if (item.href.startsWith("/patient")) setPortal("patient");
                  if (item.href.startsWith("/doctor")) setPortal("doctor");
                  setOpen(false);
                }}
              >
                <span>{item.label}</span>
                <span className="text-sky-500">→</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
