import { Link, useLocation } from "react-router-dom";
import Container from "@/components/ui/Container";
import brandLogo from "@/assets/1157 Ciplostem Logo Final.png";

export default function Footer() {
  const location = useLocation();
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
  const nav =
    portal === "patient"
      ? ([
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
          { label: "Patient", href: "/patient" },
          { label: "Assessment", href: "/patient#assessment" },
          { label: "Contact", href: "/contact" },
        ] as const)
      : portal === "doctor"
        ? ([
            { label: "Home", href: "/" },
            { label: "About", href: "/about" },
            { label: "Doctor", href: "/doctor" },
            { label: "Contact", href: "/contact" },
          ] as const)
        : ([
            { label: "Home", href: "/" },
            { label: "About", href: "/about" },
            { label: "Patient", href: "/patient" },
            { label: "Doctor", href: "/doctor" },
            { label: "Assessment", href: "/patient#assessment" },
            { label: "Contact", href: "/contact" },
          ] as const);

  return (
    <footer className="mt-10 bg-[#081A2A] text-white">
      <Container>
        <div className="grid gap-10 py-12 sm:py-14 grid-cols-2 sm:grid-cols-2 md:grid-cols-4">
          <div className="space-y-4 col-span-2 md:col-span-1">
            <div className="flex items-center gap-3">
              <img src={brandLogo} alt="CiploStem" className="h-9 sm:h-10 w-auto object-contain" />
            </div>
            <p className="max-w-sm text-sm text-white/70">
              Leading the future of regenerative medicine with advanced allogeneic mesenchymal stem cell therapy for bone healing and tissue recovery.
            </p>
            <div className="space-y-1 text-sm text-white/70">
              <div>info@ciplostem.com</div>
              <div>+1 (555) 123-4567</div>
              <div>123 Biotech Ave, Medical City</div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="text-sm font-semibold text-white/90">Product</div>
            <div className="grid gap-2 text-sm text-white/70">
              <a href="/#about" className="hover:text-white transition-colors">Features</a>
              <a href="/patient#assessment" className="hover:text-white transition-colors">How It Works</a>
              <a href="/patient#assessment" className="hover:text-white transition-colors">Clinical Trials</a>
              <a href="/#assessment" className="hover:text-white transition-colors">Research</a>
            </div>
          </div>

          <div className="space-y-3">
            <div className="text-sm font-semibold text-white/90">Company</div>
            <div className="grid gap-2 text-sm text-white/70">
              <a href="/about" className="hover:text-white transition-colors">About Us</a>
              <a href="/#about" className="hover:text-white transition-colors">Careers</a>
              <a href="/#about" className="hover:text-white transition-colors">News</a>
              <a href="/contact" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>

          <div className="space-y-3">
            <div className="text-sm font-semibold text-white/90">Navigation</div>
            <div className="grid gap-2 text-sm text-white/70">
              {nav.map((item) => (
                <Link key={item.label} to={item.href} className="hover:text-white transition-colors">
                  {item.label}
                </Link>
              ))}
              <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/10 py-6 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <div>© {new Date().getFullYear()} CiploStem. All rights reserved.</div>
          <div className="flex flex-wrap items-center gap-4">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <a href="/patient#assessment" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
