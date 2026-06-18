import Container from "@/components/ui/Container";
import MarketingNavbar from "@/components/layout/MarketingNavbar";
import Footer from "@/components/layout/Footer";
import aboutImage from "@/assets/ciplostem2.jpeg";
import ciplobottleImage from "@/assets/Ciplobottle2.png";
import { useInView } from "@/hooks/useInView";
import { useNavigate } from "react-router-dom";
import { Award, Globe, Lightbulb, Users } from "lucide-react";
import { RoadmapSection } from '@/components/RoadmapSection';

export default function About() {
  const navigate = useNavigate();
  const { ref: heroRef, inView: heroInView } = useInView({ threshold: 0.25, rootMargin: "0px 0px -10% 0px" });

  return (
    <div className="min-h-dvh bg-sky-50">
      <MarketingNavbar />
      <main className="pt-20">
        <section
          ref={(node) => { heroRef.current = node; }}
          className="relative overflow-hidden bg-gradient-to-br from-sky-50 via-white to-sky-100"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_circle_at_80%_0%,rgba(56,189,248,0.18),transparent_60%)]" />

          <Container>
            <div className="mx-auto grid min-h-[calc(100dvh-5rem)] max-w-6xl items-center gap-12 py-14 lg:grid-cols-2">
              <div className="max-w-xl">
                <div className={heroInView ? "reveal-fade reveal-fade-visible" : "reveal-fade"}>
                  <div className="mt-5 font-display text-[clamp(2.5rem,5vw,4rem)] font-semibold leading-[1.05] tracking-[-0.03em]">
                    <span style={{ color: 'rgb(41 87 186)' }}>Ciplo</span><span className="text-cyan-500">Stem</span>
                  </div>
                </div>

                <div className={heroInView ? "reveal-fade reveal-fade-visible" : "reveal-fade"}>
                  <div className="mt-3 text-lg font-medium text-slate-700">
                    Allogeneic Mesenchymal Stem Cells
                  </div>
                </div>

                <p className={heroInView ? "reveal-fade reveal-fade-visible mt-4 text-sm leading-relaxed text-slate-600 sm:text-base" : "reveal-fade mt-4 text-sm leading-relaxed text-slate-600 sm:text-base"}>
                  A next-generation regenerative product designed to support cartilage preservation with a clinically disciplined pathway—from preparation to delivery and recovery guidance.
                </p>

                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  {[
                    { label: "CELL TYPE", value: "Allogeneic MSCs" },
                    { label: "INDICATION", value: "Cartilage preservation" },
                    { label: "APPROACH", value: "Protocol-driven" },
                    { label: "CARE MODEL", value: "Guided recovery" },
                  ].map((x, idx) => (
                    <div
                      key={x.label}
                      className={[
                        "rounded-xl bg-white px-5 py-4 shadow-soft-xl ring-1 ring-sky-100",
                        "transition-all duration-300 ease-out",
                        "cursor-pointer hover:ring-sky-300 hover:shadow-soft-2xl hover:scale-105",
                        heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
                      ].join(" ")}
                      style={{ transitionDelay: `${140 + idx * 60}ms` }}
                    >
                      <div className="text-[11px] font-semibold tracking-[0.16em] text-sky-700/80 uppercase">
                        {x.label}
                      </div>
                      <div className="mt-1 text-sm font-semibold text-slate-900">
                        {x.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative mx-auto w-full max-w-md flex justify-center">
                <img
                  src={ciplobottleImage}
                  alt="CiploStem vial"
                  className="h-[450px] w-auto select-none object-contain drop-shadow-[0_20px_60px_rgba(0,0,0,0.15)]"
                  decoding="async"
                  loading="eager"
                />
              </div>
            </div>
          </Container>
        </section>

        <section id="mission" className="py-14 sm:py-20">
          <Container>
            <div className="grid items-center gap-8 md:gap-10 grid-cols-1 md:grid-cols-2">
              <div className="relative overflow-hidden rounded-[28px] bg-white ring-1 ring-sky-200/60 shadow-soft-xl">
                <img src={aboutImage} alt="CiploStem clinic" className="h-[240px] sm:h-[340px] md:h-[420px] w-full object-cover" />
              </div>

              <div>
                <div className="text-h2 text-slate-900">
                  Our Mission
                </div>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-600">
                  To bring regenerative therapies within reach of every patient suffering from joint disease — combining clinical rigor,
                  supply-chain reliability, and compassionate care.
                </p>
                <div className="mt-6 space-y-3 text-sm text-slate-700">
                  {[
                    "Standardized, off-the-shelf product",
                    "Backed by Phase III evidence",
                    "Trained orthopedic network across India",
                  ].map((x) => (
                    <div key={x} className="flex items-start gap-3">
                      <div className="mt-1.5 h-2 w-2 rounded-full bg-sky-600" />
                      <div className="min-w-0">{x}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </section>

        <section className="relative overflow-hidden py-20 sm:py-32">
          {/* Premium Biotech Background */}
          <div className="pointer-events-none absolute inset-0">
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-blue-50 via-white to-slate-50" />
            
            {/* Floating Color Orbs */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-300/15 to-cyan-300/5 rounded-full blur-3xl animate-pulse" />
            <div className="absolute top-1/3 right-0 w-96 h-96 bg-gradient-to-bl from-cyan-300/10 to-blue-300/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
            <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-gradient-to-tr from-blue-300/10 to-slate-300/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
            
            {/* Molecular Grid Pattern */}
            <svg className="absolute inset-0 w-full h-full opacity-5" preserveAspectRatio="none">
              <defs>
                <pattern id="molecular" x="50" y="50" width="100" height="100" patternUnits="userSpaceOnUse">
                  <circle cx="10" cy="10" r="1.5" fill="url(#gradMol)" />
                  <circle cx="90" cy="10" r="1.5" fill="url(#gradMol)" />
                  <circle cx="50" cy="90" r="1.5" fill="url(#gradMol)" />
                  <line x1="10" y1="10" x2="90" y2="10" stroke="url(#gradMol)" strokeWidth="0.5" opacity="0.5" />
                  <line x1="50" y1="10" x2="50" y2="90" stroke="url(#gradMol)" strokeWidth="0.5" opacity="0.5" />
                  <linearGradient id="gradMol" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#2F5FCF" />
                    <stop offset="100%" stopColor="#34BCD4" />
                  </linearGradient>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#molecular)" />
            </svg>
          </div>

          <Container>
            {/* Premium Heading with Decorative Element */}
            <div className="relative text-center mb-16">
              <style>{`
                @keyframes gradientShift {
                  0%, 100% { background-position: 0% 50%; }
                  50% { background-position: 100% 50%; }
                }
                .gradient-heading {
                  background: linear-gradient(90deg, #2F5FCF 0%, #34BCD4 50%, #2F5FCF 100%);
                  background-size: 200% auto;
                  animation: gradientShift 6s ease infinite;
                  -webkit-background-clip: text;
                  -webkit-text-fill-color: transparent;
                  background-clip: text;
                }
                @keyframes pulse-glow {
                  0%, 100% { box-shadow: 0 0 0 0 rgba(47, 95, 207, 0.4); }
                  50% { box-shadow: 0 0 0 10px rgba(47, 95, 207, 0); }
                }
                .icon-pulse:hover {
                  animation: pulse-glow 1.5s infinite;
                }
                @keyframes float {
                  0%, 100% { transform: translateY(0px); }
                  50% { transform: translateY(-8px); }
                }
                .float-animate {
                  animation: float 3s ease-in-out infinite;
                }
              `}</style>
              <div className="space-y-6">
                <h2 className="gradient-heading text-5xl sm:text-6xl font-black tracking-tight">
                  Our Values
                </h2>
                <div className="flex justify-center">
                  <div className="w-24 h-1 bg-gradient-to-r from-[#2F5FCF] via-[#34BCD4] to-[#2F5FCF] rounded-full" />
                </div>
              </div>
              <p className="mt-6 mx-auto max-w-2xl text-lg text-slate-600 font-medium">
                The principles that drive our mission and innovation
              </p>
            </div>

            {/* Glassmorphism Cards Grid */}
            <div className="relative mx-auto max-w-7xl">
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    title: "Excellence",
                    text: "Committed to the highest standards in stem cell research and therapy",
                    icon: <Award className="h-7 w-7" />,
                    delay: "0ms",
                  },
                  {
                    title: "Innovation",
                    text: "Pioneering breakthrough solutions in regenerative medicine",
                    icon: <Lightbulb className="h-7 w-7" />,
                    delay: "100ms",
                  },
                  {
                    title: "Global Impact",
                    text: "Transforming healthcare worldwide through advanced therapies",
                    icon: <Globe className="h-7 w-7" />,
                    delay: "200ms",
                  },
                  {
                    title: "Patient First",
                    text: "Dedicated to improving patient outcomes and quality of life",
                    icon: <Users className="h-7 w-7" />,
                    delay: "300ms",
                  },
                ].map((v) => (
                  <div
                    key={v.title}
                    className="group relative"
                    style={{
                      animation: `slideUp 0.7s ease-out forwards`,
                      animationDelay: v.delay,
                      opacity: 0,
                    }}
                  >
                    {/* Glassmorphism Card */}
                    <div className="relative overflow-hidden rounded-[28px] h-full transition-all duration-500">
                      {/* Glass Base with Backdrop Blur */}
                      <div className="absolute inset-0 bg-white/70 backdrop-blur-xl" />
                      
                      {/* Gradient Border Effect */}
                      <div className="absolute inset-0 rounded-[28px] bg-gradient-to-br from-blue-400/20 via-cyan-400/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                      
                      {/* Soft Shadow Border */}
                      <div className="absolute inset-0 rounded-[28px] ring-1 ring-white/50 shadow-2xl transition-all duration-500 group-hover:ring-cyan-400/30 group-hover:shadow-[0_20px_40px_rgba(47,95,207,0.15)]" />
                      
                      {/* Inner Glow on Hover */}
                      <div className="pointer-events-none absolute inset-0 rounded-[28px] bg-gradient-to-br from-blue-50/0 to-cyan-50/0 opacity-0 transition-all duration-500 group-hover:opacity-100" />
                      
                      {/* Animated Gradient Orb */}
                      <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-to-br from-cyan-400/20 to-blue-400/10 blur-3xl transition-all duration-700 group-hover:scale-150 group-hover:opacity-100 opacity-40" />
                      
                      {/* Content */}
                      <div className="relative z-10 p-8 h-full flex flex-col">
                        {/* Icon Container - Circular Gradient */}
                        <div className="mb-6">
                          <div className="icon-pulse relative w-16 h-16 rounded-full bg-gradient-to-br from-[#2F5FCF] to-[#34BCD4] flex items-center justify-center shadow-lg transition-all duration-500 group-hover:shadow-2xl group-hover:scale-110">
                            <div className="text-white">{v.icon}</div>
                          </div>
                        </div>
                        
                        {/* Title */}
                        <h3 className="text-2xl font-bold text-slate-900 tracking-tight transition-all duration-300 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-[#2F5FCF] group-hover:to-[#34BCD4] group-hover:bg-clip-text">
                          {v.title}
                        </h3>
                        
                        {/* Description */}
                        <p className="mt-4 text-sm leading-relaxed text-slate-600 transition-all duration-300 group-hover:text-slate-700 flex-grow">
                          {v.text}
                        </p>
                        
                        {/* Bottom Accent Line */}
                        <div className="mt-6 h-1 w-0 rounded-full bg-gradient-to-r from-[#2F5FCF] to-[#34BCD4] transition-all duration-500 group-hover:w-12" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Container>

          <style>{`
            @keyframes slideUp {
              from {
                opacity: 0;
                transform: translateY(20px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
          `}</style>
        </section>

        <section className="py-20 sm:py-32">
          <RoadmapSection />
        </section>
      </main>
      <Footer />
    </div>
  );
}
