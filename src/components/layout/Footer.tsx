import { Link, useLocation } from "react-router-dom";
import Container from "@/components/ui/Container";
import ciplaLogo from "@/assets/Cipla_logo.svg.png";
import brandLogo from "@/assets/ciplostem-logo.png";
import { Mail, Phone, MapPin } from "lucide-react";

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
          { label: "Patient", href: "/patient" },
          { label: "Assessment", href: "/patient#assessment" },
          { label: "Contact", href: "/contact" },
        ] as const)
      : portal === "doctor"
        ? ([
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
    <footer className="bg-white text-slate-900">
      <Container>
        <div className="flex flex-col gap-8 py-8 sm:py-10">
          {/* Desktop Layout: Logo left, nav middle, contact/address right */}
          <div className="grid gap-6 lg:grid-cols-[1fr_auto_1fr] items-center">
            {/* Left: Logo */}
            <div className="hidden lg:flex justify-start">
              {portal === "patient" ? (
                <img src={ciplaLogo} alt="Cipla" className="h-10 sm:h-14 lg:h-16 w-auto object-contain contrast-125" />
              ) : (
               <img
  src={brandLogo}
  alt="CiploStem"
  className="h-14 sm:h-16 w-auto shrink-0 max-w-full"
/>
              )}
            </div>

            {/* Middle: Nav */}
            <div className="hidden lg:flex flex-wrap justify-center gap-6 text-sm text-slate-600">
              {nav.map((item) => {
                if (item.label === "Patient" || item.label === "Privacy") return null;
                return (
                  <Link key={item.label} to={item.href} className="hover:text-sky-600 transition-colors font-medium">
                    {item.label}
                  </Link>
                );
              })}
            </div>

            {/* Right: Contact & Address */}
            <div className="hidden lg:flex flex-col items-end gap-3 text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-sky-700" />
                <div>info@cipla.com</div>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-sky-700" />
                <div>Toll Free: 1800-123-4567</div>
              </div>
              <div className="text-right flex items-start gap-2">
                <MapPin className="h-4 w-4 text-sky-700 mt-0.5 flex-none" />
                <div>
                  <div className="font-semibold">CIPLA LTD HEAD OFFICE-MUMBAI</div>
                  <div>PENINSULA BUSINESS PARK, GANPATRAO KADAM</div>
                  <div>MARG, LOWER PAREL, MUMBAI.</div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile layout for small screens */}
          <div className="flex flex-col gap-4 lg:hidden">
            {/* Logo first for mobile */}
            <div className="flex justify-center">
              {portal === "patient" ? (
                <img src={ciplaLogo} alt="Cipla" className="h-10 sm:h-14 lg:h-16 w-auto object-contain" />
              ) : (
                <img
  src={brandLogo}
  alt="CiploStem"
  className="h-20 lg:h-24 w-auto shrink-0"
/>
              )}
            </div>
            <div className="flex flex-col items-center gap-3 text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-sky-700" />
                <div>info@cipla.com</div>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-sky-700" />
                <div>Toll Free: 1800-123-4567</div>
              </div>
              <div className="text-center flex flex-col items-center gap-2">
                <MapPin className="h-4 w-4 text-sky-700" />
                <div>
                  <div className="font-semibold">CIPLA LTD HEAD OFFICE-MUMBAI</div>
                  <div>PENINSULA BUSINESS PARK, GANPATRAO KADAM</div>
                  <div>MARG, LOWER PAREL, MUMBAI.</div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-200 pt-6 text-center text-xs text-slate-500">
            © {new Date().getFullYear()} {portal === "patient" ? "Cipla" : "CiploStem"}. All rights reserved.
          </div>
        </div>
      </Container>
    </footer>
  );
}
