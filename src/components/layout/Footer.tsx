import { Link, useLocation } from "react-router-dom";
import Container from "@/components/ui/Container";
import ciplaLogo from "@/assets/Cipla_logo.svg.png";
import brandLogo from "@/assets/ciplostem-logo.png";
import { Mail, MapPin } from "lucide-react";

export default function Footer() {
  const location = useLocation();
  const portal = "patient" as const;
  const nav = [
    { label: "Home", href: "/patient" },
    { label: "Disclaimer", href: "/disclaimer" },
  ] as const;

  return (
    <footer className="bg-white text-slate-900">
      <Container>
        <div className="flex flex-col gap-8 py-8 sm:py-10">
          {/* Desktop Layout: Logo left, nav middle (if any), contact/address right */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
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
            {nav.length > 0 && (
              <div className="hidden lg:flex flex-wrap justify-center gap-6 text-sm text-slate-600">
                {nav.map((item) => (
                  <Link key={item.label} to={item.href} className="hover:text-sky-600 transition-colors font-medium">
                    {item.label}
                  </Link>
                ))}
              </div>
            )}

            {/* Right: Contact & Address */}
            <div className="hidden lg:flex justify-end">
              <div className="flex flex-col items-start gap-3.5 text-sm text-slate-700 text-left">
                <div className="flex items-center gap-2.5">
                  <Mail className="h-4 w-4 shrink-0 text-slate-800" />
                  <a href="mailto:info@cipla.com" className="hover:text-sky-600 transition-colors text-slate-800">info@cipla.com</a>
                </div>
                <div className="flex items-start gap-2.5 leading-snug">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-slate-800" />
                  <div className="space-y-1">
                    <div className="font-semibold text-slate-900">Cipla Ltd Head Office - Mumbai</div>
                    <div className="text-slate-800">Peninsula Business Park,</div>
                    <div className="text-slate-800">Ganpatrao Kadam Marg,</div>
                    <div className="text-slate-800">Lower Parel, Mumbai.</div>
                  </div>
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
            {/* Mobile Nav */}
            {nav.length > 0 && (
              <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm text-slate-600 my-4">
                {nav.map((item) => (
                  <Link key={item.label} to={item.href} className="hover:text-sky-600 transition-colors font-medium">
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
            <div className="flex justify-center">
              <div className="flex flex-col items-start gap-3.5 text-sm text-slate-700 text-left">
                <div className="flex items-center gap-2.5">
                  <Mail className="h-4 w-4 shrink-0 text-slate-800" />
                  <a href="mailto:info@cipla.com" className="hover:text-sky-600 transition-colors text-slate-800">info@cipla.com</a>
                </div>
                <div className="flex items-start gap-2.5 leading-snug">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-slate-800" />
                  <div className="space-y-1">
                    <div className="font-semibold text-slate-900">Cipla Ltd Head Office - Mumbai</div>
                    <div className="text-slate-800">Peninsula Business Park,</div>
                    <div className="text-slate-800">Ganpatrao Kadam Marg,</div>
                    <div className="text-slate-800">Lower Parel, Mumbai.</div>
                  </div>
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
