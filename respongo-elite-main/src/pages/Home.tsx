import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Stethoscope, User } from "lucide-react";
import { cn } from "@/lib/utils";
import MarketingNavbar from "@/components/layout/MarketingNavbar";
import Footer from "@/components/layout/Footer";
import IntroVideoOverlay from "@/components/media/IntroVideoOverlay";
import HomeHero from "@/components/sections/HomeHero";
import Container from "@/components/ui/Container";
import BottleProductSection from "@/components/sections/BottleProductSection";
import AdvancedFeaturesSection from "@/components/sections/AdvancedFeaturesSection";
import ActionVideoSection from "@/components/sections/ActionVideoSection";
import QualityBadgesSection from "@/components/sections/QualityBadgesSection";
import WorkflowCircularSection from "@/components/sections/WorkflowCircularSection";
import introVideo from "@/assets/introvideo.mp4";
import aboutCiploImage from "@/assets/Aboutciplo.png";
import ciploPreparationImage from "@/assets/ciplo preparation.png";
import postInjectionImage from "@/assets/postinjection.png";
import brandLogo from "@/assets/1157 Ciplostem Logo Final.png";

type LearnMoreCardData = {
  title: string;
  desc: string;
  image: string;
  imageBgClass?: string;
  bullets: string[];
};

function LearnMoreCard({
  card,
  direction,
  enabled,
}: {
  card: LearnMoreCardData;
  direction: "left" | "right" | "up";
  enabled: boolean;
}) {
  const initial =
    direction === "left" ? "-translate-x-12" : direction === "right" ? "translate-x-12" : "translate-y-12";

  return (
    <div
      className={cn(
        "overflow-hidden rounded-[28px] bg-white/85 ring-1 ring-sky-200/60 shadow-soft-xl",
        "transition-all duration-500 ease-out will-change-transform",
        enabled ? "translate-x-0 translate-y-0 opacity-100" : `${initial} pointer-events-none opacity-0`,
      )}
    >
      <div className={cn("relative h-64 w-full sm:h-80", card.imageBgClass ?? "bg-sky-50/60")}>
        <img src={card.image} alt={card.title} className="h-full w-full object-contain" decoding="async" loading="lazy" />
      </div>
      <div className="p-6">
        <div className="text-lg font-semibold text-slate-900">{card.title}</div>
        <div className="mt-2 text-sm leading-relaxed text-slate-600">{card.desc}</div>
        <div className="mt-5 space-y-2 text-sm text-slate-700">
          {card.bullets.map((b) => (
            <div key={b} className="flex items-start gap-3">
              <div className="mt-1.5 h-2 w-2 rounded-full bg-sky-600" />
              <div className="min-w-0">{b}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const location = useLocation();
  const navigate = useNavigate();
  const storageKey = useMemo(() => "ciplostem:introPlayed", []);
  const welcomeKey = useMemo(() => "ciplostem:welcomeGate", []);
  const [learnStepMode, setLearnStepMode] = useState(() => {
    if (typeof window === "undefined") return false;
    const desktop = window.matchMedia?.("(min-width: 1024px)")?.matches ?? true;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
    return desktop && !reduce;
  });
  const [learnStep, setLearnStep] = useState(0);
  const learnScrollRef = useRef<HTMLDivElement | null>(null);
  const [introDone, setIntroDone] = useState(() => {
    try {
      return sessionStorage.getItem(storageKey) === "1";
    } catch {
      return false;
    }
  });
  const [welcomeDone, setWelcomeDone] = useState(() => {
    try {
      return sessionStorage.getItem(welcomeKey) === "1";
    } catch {
      return false;
    }
  });
  const [welcomeMounted, setWelcomeMounted] = useState(false);

  useEffect(() => {
    if (introDone) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [introDone]);

  useEffect(() => {
    if (!introDone || welcomeDone) return;
    setWelcomeMounted(false);
    const t = window.setTimeout(() => setWelcomeMounted(true), 30);
    return () => window.clearTimeout(t);
  }, [introDone, welcomeDone]);

  useEffect(() => {
    if (!introDone) return;
    if (!location.hash) return;
    const id = decodeURIComponent(location.hash.slice(1));
    if (!id) return;
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [introDone, location.hash]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const desktopMql = window.matchMedia?.("(min-width: 1024px)");
    const reduceMql = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!desktopMql || !reduceMql) return;
    const update = () => setLearnStepMode(desktopMql.matches && !reduceMql.matches);
    update();
    desktopMql.addEventListener("change", update);
    reduceMql.addEventListener("change", update);
    return () => {
      desktopMql.removeEventListener("change", update);
      reduceMql.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    if (!learnStepMode) return;
    const onScroll = () => {
      const el = learnScrollRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const raw = (vh * 0.75 - rect.top) / Math.max(1, rect.height);
      const t = Math.max(0, Math.min(1, raw));
      let next = 0;
      if (t > 0.12) next = 1;
      if (t > 0.45) next = 2;
      if (t > 0.78) next = 3;
      setLearnStep(next);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [learnStepMode]);

  if (!introDone) {
    return (
      <IntroVideoOverlay
        src={introVideo}
        onDone={() => {
          try {
            sessionStorage.setItem(storageKey, "1");
          } catch {
            void 0;
          }
          setIntroDone(true);
        }}
      />
    );
  }

  if (!welcomeDone) {
    const go = (nextPortal: "patient" | "doctor") => {
      try {
        sessionStorage.setItem(welcomeKey, "1");
        sessionStorage.setItem("ciplostem:portal", nextPortal);
      } catch {
        void 0;
      }
      setWelcomeDone(true);
      navigate("/");
    };

    return (
      <main className="relative min-h-dvh bg-sky-50 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_circle_at_50%_0%,rgba(56,189,248,0.22),transparent_60%)]" />
        <div className="pointer-events-none absolute -left-32 top-12 h-[420px] w-[420px] rounded-full bg-sky-400/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 bottom-10 h-[520px] w-[520px] rounded-full bg-blue-500/10 blur-3xl" />

        <Container>
          <div className="min-h-dvh flex flex-col items-center justify-center pt-10 pb-12">
            <div
              className={cn(
                "flex flex-col items-center text-center transition-all duration-700",
                welcomeMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
              )}
            >
              <img src={brandLogo} alt="CiploStem" className="h-20 sm:h-24 w-auto object-contain" decoding="async" loading="eager" />
              <div className="mt-6 font-display text-4xl sm:text-5xl font-semibold tracking-[-0.04em] text-slate-900">
                Welcome to <span className="text-[#2f5fbf]">Ciplo</span><span className="text-[#55c2c6]">Stem</span>
              </div>
              <div className="mt-3 text-sm sm:text-base text-slate-600">
                Choose your pathway
              </div>
            </div>

            <div className="mt-10 grid w-full max-w-4xl gap-5 sm:gap-6 md:grid-cols-2">
              <button
                type="button"
                onClick={() => go("patient")}
                className={cn(
                  "group relative overflow-hidden rounded-[28px] bg-white/90 p-8 text-left ring-1 ring-sky-200/70 shadow-soft-xl transition-all duration-500",
                  "hover:-translate-y-1 hover:scale-[1.02] hover:ring-2 hover:ring-sky-500/60 hover:shadow-[0_26px_80px_rgba(2,8,23,0.12)] active:translate-y-0",
                  welcomeMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
                )}
                style={{ transitionDelay: welcomeMounted ? "120ms" : "0ms" }}
              >
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(600px_circle_at_30%_0%,rgba(56,189,248,0.26),transparent_55%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <div className="absolute -inset-16 bg-[radial-gradient(closest-side,rgba(56,189,248,0.10),transparent)] blur-2xl" />
                </div>
                <div className="relative">
                  <div className="flex items-center gap-3">
                    <div className="grid h-12 w-12 place-items-center rounded-2xl bg-sky-600 text-white shadow-button">
                      <User className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="text-xl font-semibold text-slate-900">Patient</div>
                      <div className="mt-0.5 text-sm text-slate-600">Symptoms, assessment, care guidance</div>
                    </div>
                  </div>
                  <div className="mt-6 text-sm leading-relaxed text-slate-700">
                    Explore disease information, take a quick knee OA self-test, and review post-injection precautions.
                  </div>
                  <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-sky-700">
                    Continue <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => go("doctor")}
                className={cn(
                  "group relative overflow-hidden rounded-[28px] bg-white/90 p-8 text-left ring-1 ring-sky-200/70 shadow-soft-xl transition-all duration-500",
                  "hover:-translate-y-1 hover:scale-[1.02] hover:ring-2 hover:ring-blue-500/55 hover:shadow-[0_26px_80px_rgba(2,8,23,0.12)] active:translate-y-0",
                  welcomeMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
                )}
                style={{ transitionDelay: welcomeMounted ? "220ms" : "0ms" }}
              >
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(600px_circle_at_30%_0%,rgba(59,130,246,0.22),transparent_55%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <div className="absolute -inset-16 bg-[radial-gradient(closest-side,rgba(59,130,246,0.10),transparent)] blur-2xl" />
                </div>
                <div className="relative">
                  <div className="flex items-center gap-3">
                    <div className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-600 text-white shadow-button">
                      <Stethoscope className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="text-xl font-semibold text-slate-900">Doctor</div>
                      <div className="mt-0.5 text-sm text-slate-600">Clinical overview, handling essentials</div>
                    </div>
                  </div>
                  <div className="mt-6 text-sm leading-relaxed text-slate-700">
                    View a quick reference for patient selection, preparation workflow, and key safety reminders.
                  </div>
                  <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-700">
                    Continue <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </Container>
      </main>
    );
  }

  const learnCards = [
    {
      title: "What is CiploStem?",
      desc: "An allogeneic mesenchymal stem cell therapy designed to support tissue recovery and improve joint function.",
      image: aboutCiploImage,
      bullets: ["Off-the-shelf product", "Clinician administered", "Designed for recovery support"],
    },
    {
      title: "How it is prepared",
      desc: "The product follows controlled manufacturing, storage, and handling steps to maintain stability before use.",
      image: ciploPreparationImage,
      bullets: ["Cold-chain logistics", "Controlled handling", "Quality checks at each step"],
    },
    {
      title: "Post-injection care",
      desc: "Follow simple precautions after the procedure to protect the treated area and support recovery.",
      image: postInjectionImage,
      imageBgClass: "bg-sky-100/70",
      bullets: ["Rest and hydrate", "Avoid overstrain early", "Follow your doctor’s plan"],
    },
  ] satisfies LearnMoreCardData[];

  const learnMoreEl = (
    <>
      <div className="mx-auto max-w-4xl text-center px-1">
        <div className="text-[11px] font-semibold tracking-[0.32em] text-sky-700/80">LEARN MORE</div>
        <div className="mt-4 sm:mt-5 text-h2 text-slate-900">
          Understand CiploStem in a simple way
        </div>
        <p className="mx-auto mt-3 sm:mt-4 max-w-2xl text-sm sm:text-base leading-relaxed text-slate-600">
          Quick overview of what the therapy is, how it is prepared, and the basic after-care steps.
        </p>
      </div>

      {learnStepMode ? (
        <div ref={learnScrollRef} className="mx-auto mt-8 sm:mt-10 max-w-6xl">
          <div className="relative h-[240vh]">
            <div className="sticky top-28">
              <div className="grid gap-5 sm:gap-6 grid-cols-1 md:grid-cols-3">
                <LearnMoreCard card={learnCards[0]} direction="left" enabled={learnStep >= 1} />
                <LearnMoreCard card={learnCards[1]} direction="up" enabled={learnStep >= 2} />
                <LearnMoreCard card={learnCards[2]} direction="right" enabled={learnStep >= 3} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="mx-auto mt-8 sm:mt-10 grid max-w-6xl gap-5 sm:gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {learnCards.map((card, idx) => (
            <LearnMoreCard
              key={card.title}
              card={card}
              direction={idx === 0 ? "left" : idx === 1 ? "up" : "right"}
              enabled
            />
          ))}
        </div>
      )}
    </>
  );

  return (
    <main className="relative min-h-dvh bg-sky-50">
      <MarketingNavbar />
      <HomeHero />

      <section id="learn-more" className="scroll-mt-32 py-14 sm:py-20">
        <Container>{learnMoreEl}</Container>
      </section>
      <div className="relative">
        <BottleProductSection />
        <AdvancedFeaturesSection />
        <ActionVideoSection />
        <QualityBadgesSection />
        <WorkflowCircularSection />
      </div>

      <Footer />
    </main>
  );
}
