import { useEffect } from "react";
import Container from "@/components/ui/Container";
import MarketingNavbar from "@/components/layout/MarketingNavbar";
import Footer from "@/components/layout/Footer";
import ciplobottleImage from "@/assets/Ciplobottle2.png";
import brandLogo from "@/assets/logo.png";
import { useInView } from "@/hooks/useInView";
import { Award, Globe, Lightbulb, Users } from "lucide-react";
import { RoadmapSection } from '@/components/RoadmapSection';

const features = [
  { label: "CELL TYPE", value: "Allogeneic MSCs" },
  { label: "INDICATION", value: "Cartilage preservation" },
  { label: "APPROACH", value: "Protocol-driven" },
  { label: "CARE MODEL", value: "Guided recovery" },
];

const values = [
  {
    title: "Purpose Inspired",
    text: "Cipla has been built brick by brick on the foundation of Care. We are driven by this purpose – a purpose that lies at the center of all our thoughts and plans, driving our actions.",
    icon: <Users className="h-10 w-10" />,
    iconBg: "from-sky-400 to-sky-600",
    accentColor: "bg-sky-500",
    titleColor: "text-sky-600",
    delay: "0ms",
  },
  {
    title: "Responsibility Centered",
    text: "We are accountable for our actions and results – sharing the accolades and shouldering the responsibility. Ownership and accountability matter the most.",
    icon: <Award className="h-10 w-10" />,
    iconBg: "from-blue-400 to-blue-600",
    accentColor: "bg-blue-500",
    titleColor: "text-blue-600",
    delay: "150ms",
  },
  {
    title: "Innovation Driven",
    text: "We believe that innovation is transformational and a critical component in leading the organization towards its goal.",
    icon: <Lightbulb className="h-10 w-10" />,
    iconBg: "from-cyan-400 to-cyan-600",
    accentColor: "bg-cyan-500",
    titleColor: "text-cyan-600",
    delay: "300ms",
  },
  {
    title: "Integrity & Trust-Anchored",
    text: "We do the right thing, the right way. We place integrity at the core of our endeavours and take pride in the trust our stakeholders place in us.",
    icon: <Globe className="h-10 w-10" />,
    iconBg: "from-blue-500 to-indigo-600",
    accentColor: "bg-blue-600",
    titleColor: "text-blue-700",
    delay: "450ms",
  },
  {
    title: "Excellence Focused",
    text: "We always aim at setting the gold standard in healthcare and going above and beyond to stay true to our purpose.",
    icon: <Award className="h-10 w-10" />,
    iconBg: "from-sky-500 to-indigo-600",
    accentColor: "bg-indigo-600",
    titleColor: "text-indigo-700",
    delay: "600ms",
  },
];

export default function About() {
  useEffect(() => {
    document.title = "Ciplostem";
  }, []);

  const { ref: heroRef, inView: heroInView } = useInView({ threshold: 0.25, rootMargin: "0px 0px -10% 0px" });

  return (
    <div className="min-h-dvh bg-sky-100">
      <MarketingNavbar />
      <main className="pt-20">
        <section
          ref={(node) => { heroRef.current = node; }}
          className="relative overflow-hidden bg-sky-100"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_circle_at_80%_0%,rgba(56,189,248,0.18),transparent_60%)]" />

          <Container>
            <div className="mx-auto grid min-h-auto md:min-h-[calc(100dvh-5rem)] max-w-6xl items-center gap-6 md:gap-12 py-8 md:py-14 lg:grid-cols-2">
              <div className="max-w-xl">
                <div className={heroInView ? "reveal-fade reveal-fade-visible" : "reveal-fade"}>
                  <div className="mb-2 md:mb-4">
                    <img
                      src={brandLogo}
                      alt="CiploStem"
                      width={1000}
                      height={300}
                      className="w-[260px] sm:w-[320px] md:w-[380px] lg:w-[450px] xl:w-[500px] h-auto object-contain"
                    />
                  </div>
                </div>

                <div className={heroInView ? "reveal-fade reveal-fade-visible" : "reveal-fade"}>
                  <div className="mt-0 text-lg md:text-xl font-medium text-slate-700">
                    Allogeneic Mesenchymal Stem Cells
                  </div>
                </div>

                <p className={heroInView ? "reveal-fade reveal-fade-visible mt-3 md:mt-4 text-xs md:text-sm leading-relaxed text-slate-600 sm:text-base" : "reveal-fade mt-3 md:mt-4 text-xs md:text-sm leading-relaxed text-slate-600 sm:text-base"}>
                  A next-generation regenerative product designed to support cartilage preservation with a clinically disciplined pathway—from preparation to delivery and recovery guidance.
                </p>

                <div className="mt-6 md:mt-8 grid gap-2 md:gap-3 sm:grid-cols-2">
                  {features.map((x, idx) => (
                    <div
                      key={x.label}
                      className={[
                        "rounded-lg md:rounded-xl bg-white px-3 md:px-5 py-3 md:py-4 shadow-soft-xl ring-1 ring-sky-100",
                        "transition-all duration-300 ease-out",
                        "cursor-pointer hover:ring-sky-300 hover:shadow-soft-2xl hover:scale-105",
                        heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
                      ].join(" ")}
                      style={{ transitionDelay: `${140 + idx * 60}ms` }}
                    >
                      <div className="text-[9px] md:text-[11px] font-semibold tracking-[0.16em] text-sky-700/80 uppercase">
                        {x.label}
                      </div>
                      <div className="mt-1 text-xs md:text-sm font-semibold text-slate-900">
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
                  width={800}
                  height={1000}
                  className="h-[280px] md:h-[450px] w-auto select-none object-contain drop-shadow-[0_20px_60px_rgba(0,0,0,0.15)]"
                  decoding="async"
                  loading="eager"
                  fetchPriority="high"
                />
              </div>
            </div>
          </Container>
        </section>
        <section className="bg-sky-100 relative overflow-visible py-20 sm:py-32">
          {/* Blue Gradient Background with Floating Bubbles */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-sky-50 to-sky-100" />

            {/* Large Floating Bubbles */}
            <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute top-40 right-20 w-96 h-96 bg-purple-300/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
            <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-cyan-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
            <div className="absolute bottom-40 right-1/3 w-64 h-64 bg-pink-300/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />

            {/* Small Floating Dots */}
            <div className="absolute top-32 left-1/4 w-3 h-3 bg-white/60 rounded-full bubble-float" style={{ animationDelay: '0s' }} />
            <div className="absolute top-48 right-1/3 w-2 h-2 bg-white/50 rounded-full bubble-float" style={{ animationDelay: '0.5s' }} />
            <div className="absolute top-1/2 left-1/3 w-2.5 h-2.5 bg-white/55 rounded-full bubble-float" style={{ animationDelay: '1s' }} />
            <div className="absolute top-2/3 right-1/4 w-3 h-3 bg-white/60 rounded-full bubble-float" style={{ animationDelay: '1.5s' }} />
            <div className="absolute bottom-32 left-1/2 w-2 h-2 bg-white/50 rounded-full bubble-float" style={{ animationDelay: '2s' }} />
            <div className="absolute top-1/3 right-1/2 w-2.5 h-2.5 bg-white/55 rounded-full bubble-float" style={{ animationDelay: '0.8s' }} />
          </div>

          <Container>
            <div className="relative text-center mb-16">
              <style>{`
                @keyframes bubble-float {
                  0%, 100% { 
                    transform: translateY(0px) translateX(0px);
                    opacity: 0.6;
                  }
                  50% { 
                    transform: translateY(-20px) translateX(10px);
                    opacity: 1;
                  }
                }
                .bubble-float {
                  animation: bubble-float 4s ease-in-out infinite;
                }
                @keyframes float-gentle {
                  0%, 100% { transform: translateY(0px); }
                  50% { transform: translateY(-10px); }
                }
                .float-gentle {
                  animation: float-gentle 3s ease-in-out infinite;
                }
              `}</style>

              <div className="space-y-4">
                <div className="text-sm font-bold tracking-[0.3em] text-blue-600 uppercase">
                  • OUR VALUES •
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900">
                  The principles that <span className="text-blue-600">drive our mission</span>
                </h2>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900">
                  and innovation in regenerative medicine
                </h3>
                <div className="flex justify-center mt-4">
                  <div className="w-20 h-1 bg-blue-600 rounded-full" />
                </div>
              </div>
            </div>
            <div className="relative z-50 mx-auto max-w-4xl text-center mb-24 px-6">
              <p className="text-lg md:text-xl leading-relaxed font-medium text-slate-700">
                Our core values guide every conversation, organizational decision and anchor the actions of our employees.
                We consistently revisit them and recalibrate strategies to stay ever-relevant to our stakeholders.
              </p>
            </div>

            <div className="relative z-20 mx-auto max-w-7xl mt-10 mb-24">
              <div className="flex flex-wrap justify-center gap-8 lg:gap-12">
                {values.map((v) => (
                  <div
                    key={v.title}
                    className="group relative w-full sm:w-[calc(50%-1rem)] lg:w-[300px]"
                    style={{
                      animation: `slideUpAbout 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards`,
                      animationDelay: v.delay,
                      opacity: 1,
                    }}
                  >
                    {/* Tall Glass Bubble (ellipse) */}
                    <div className="relative mx-auto w-full max-w-[300px] aspect-[2/3]">
                      {/* Frosted glass ellipse */}
                      <div className="absolute inset-0 rounded-[50%] bg-white/20 backdrop-blur-2xl border border-white/60 shadow-[0_18px_50px_-10px_rgba(37,99,235,0.18),inset_0_2px_2px_rgba(255,255,255,0.7),inset_0_-10px_30px_rgba(255,255,255,0.25)] transition-all duration-500 group-hover:scale-[1.03] group-hover:bg-white/25 group-hover:shadow-[0_26px_60px_-10px_rgba(37,99,235,0.28),inset_0_2px_2px_rgba(255,255,255,0.8)]" />

                      {/* Glossy top highlight */}
                      <div className="pointer-events-none absolute inset-x-8 top-4 h-1/3 rounded-[50%] bg-gradient-to-b from-white/60 to-transparent blur-md" />

                      {/* Content */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center px-10 text-center">
                        {/* Icon with glow halo */}
                        <div className="relative mb-5">
                          <div className={`absolute -inset-2 rounded-full bg-gradient-to-br ${v.iconBg} opacity-40 blur-xl transition-all duration-500 group-hover:opacity-60`} />
                          <div className={`relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br ${v.iconBg} shadow-lg ring-4 ring-white/40 transition-all duration-500 group-hover:scale-110`}>
                            <div className="text-white">{v.icon}</div>
                          </div>
                        </div>

                        {/* Title */}
                        <h3 className={`text-xl font-bold ${v.titleColor} mb-3`}>
                          {v.title}
                        </h3>

                        {/* Description */}
                        <p className="text-sm leading-relaxed text-slate-600">
                          {v.text}
                        </p>

                        {/* Bottom Accent Line */}
                        <div className={`mt-5 h-1 w-12 ${v.accentColor} rounded-full transition-all duration-500 group-hover:w-16`} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </Container>

          <style>{`
            @keyframes slideUpAbout {
              from {
                opacity: 0;
                transform: translateY(30px) scale(0.95);
              }
              to {
                opacity: 1;
                transform: translateY(0) scale(1);
              }
            }
          `}</style>
        </section>

        <section className="bg-sky-100 pt-10 pb-0 sm:pt-16 sm:pb-0">
          <RoadmapSection />
        </section>
      </main>
      <Footer />
    </div>
  );
}
