import MarketingNavbar from "@/components/layout/MarketingNavbar";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import stemcellImage from "@/assets/stemcell.png";
import doctorLandingImage from "@/assets/doctor landing page.png";
import cartilageDegenerationImage from "@/assets/Cartilage Degeneration.png";
import inflammatoryChangesImage from "@/assets/Inflammatory Changes.png";
import mobilityChallengesImage from "@/assets/Mobility Challenges.png";
import kneeVsOaImage from "@/assets/knee vs OA.png";
import orthopaedicRegenerationImage from "@/assets/Orthopaedic Regeneration.png";
import mechanismIllustrationImage from "@/assets/mechanism.png";
import advancedCellularTherapyImage from "@/assets/Advanced Cellular Therapy.png";
import clinicalTrialsImage from "@/assets/Clinical Trials.png";
import safetyProfileImage from "@/assets/Safety Profile.png";
import patientOutcomesImage from "@/assets/Patient Outcomes.png";
import scientificPublicationsImage from "@/assets/scientific publications.png";
import ciplobottleImage from "@/assets/Ciplobottle2.png";
import { Activity, ArrowRight, ChevronDown, Droplet, Pill, Stethoscope, X, Users, FlaskConical, Syringe, Bone, FileText, BarChart3, MapPin, Calendar, CheckCircle2, Smile, Star, UsersRound } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useInView } from "@/hooks/useInView";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type RevealWordsProps = {
  text: string;
  active: boolean;
  stagger?: number;
  delay?: number;
};

function RevealWords({ text, active, stagger = 0.04, delay = 0 }: RevealWordsProps) {
  const words = text.split(" ").filter(Boolean);
  return (
    <span aria-label={text} role="text">
      {words.map((word, idx) => (
        <span
          key={`${word}-${idx}`}
          className={cn("reveal-word", active && "reveal-word-visible")}
          style={active ? { animationDelay: `${delay + idx * stagger}s` } : undefined}
        >
          {word}
          {idx < words.length - 1 ? "\u00A0" : null}
        </span>
      ))}
    </span>
  );
}

function PlaceholderImage({
  label,
  className,
  src,
  imgClassName,
}: {
  label: string;
  className?: string;
  src?: string;
  imgClassName?: string;
}) {
  return (
    <div
      role="img"
      aria-label={label}
      className={cn(
        src
          ? "relative overflow-hidden rounded-[28px]"
          : "relative overflow-hidden rounded-[28px] bg-white/80 ring-1 ring-sky-200/60 shadow-soft-xl backdrop-blur",
        className,
      )}
    >
      {src ? (
        <img
          src={src}
          alt={label}
          className={cn("h-full w-full", imgClassName ?? "object-contain")}
          decoding="async"
          loading="lazy"
        />
      ) : (
        <>
          <div className="absolute inset-0 bg-[radial-gradient(900px_circle_at_20%_20%,rgba(56,189,248,0.18),transparent_55%)]" />
          <div className="absolute inset-0 opacity-60 hero-dots" />
          <div className="relative grid h-full w-full place-items-center px-6 text-center text-xs font-semibold tracking-[0.18em] text-sky-700/80">
            {label}
          </div>
        </>
      )}
    </div>
  );
}

export default function Doctor() {
  const navigate = useNavigate();
  const { ref: heroRef, inView: heroInView } = useInView({ threshold: 0.2, rootMargin: "0px 0px -10% 0px" });
  const { ref: overviewRef, inView: overviewInView } = useInView({ threshold: 0.2, rootMargin: "0px 0px -10% 0px" });
  const { ref: gapRef, inView: gapInView } = useInView({ threshold: 0.2, rootMargin: "0px 0px -10% 0px" });
  const { ref: orthoRef, inView: orthoInView } = useInView({ threshold: 0.2, rootMargin: "0px 0px -10% 0px" });
  const { ref: mscRef, inView: mscInView } = useInView({ threshold: 0.18, rootMargin: "0px 0px -10% 0px" });
  const { ref: moaRef, inView: moaInView } = useInView({ threshold: 0.18, rootMargin: "0px 0px -10% 0px" });
  const { ref: techRef, inView: techInView } = useInView({ threshold: 0.18, rootMargin: "0px 0px -10% 0px" });
  const { ref: evidenceRef, inView: evidenceInView } = useInView({ threshold: 0.18, rootMargin: "0px 0px -10% 0px" });
  const { ref: resourcesRef, inView: resourcesInView } = useInView({ threshold: 0.18, rootMargin: "0px 0px -10% 0px" });
  const { ref: ctaRef, inView: ctaInView } = useInView({ threshold: 0.18, rootMargin: "0px 0px -10% 0px" });
  const [openTreatment, setOpenTreatment] = useState<string | null>(null);
  const [openMoaStep, setOpenMoaStep] = useState<string | null>(null);
  const [overviewStep, setOverviewStep] = useState(0);
  const [evidenceStep, setEvidenceStep] = useState(0);
  const [resourcesStep, setResourcesStep] = useState(0);
  const [openModal, setOpenModal] = useState<string | null>(null);

  const heroBgRef = useRef<HTMLImageElement | null>(null);
  const mscVisualRef = useRef<HTMLDivElement | null>(null);
  const moaVisualRef = useRef<HTMLDivElement | null>(null);
  const treatmentVisualRef = useRef<HTMLDivElement | null>(null);
  const pageRef = useRef<HTMLDivElement | null>(null);
  const overviewScrollRef = useRef<HTMLDivElement | null>(null);
  const evidenceScrollRef = useRef<HTMLDivElement | null>(null);
  const resourcesScrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (prefersReduced) return;

    gsap.registerPlugin(ScrollTrigger);

    const heroEl = heroBgRef.current;
    if (!heroEl) return;

    const ctx = gsap.context(() => {
      gsap.to(heroEl, {
        yPercent: 6,
        ease: "none",
        scrollTrigger: {
          trigger: heroEl,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, heroEl);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (prefersReduced) return;

    gsap.registerPlugin(ScrollTrigger);

    const mscEl = mscVisualRef.current;
    if (!mscEl) return;

    const ctx = gsap.context(() => {
      const sectionEl = mscRef.current;
      gsap.set(mscEl, { transformOrigin: "50% 50%" });
      if (sectionEl) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionEl,
            start: "top 90%",
            end: "bottom 20%",
            scrub: 1.2,
          },
        });

        tl.fromTo(
          mscEl,
          { x: -780, y: -140, opacity: 0, scale: 0.84 },
          { x: 0, y: 0, opacity: 1, scale: 1, ease: "none", duration: 0.55 },
        ).to(mscEl, { x: -780, y: -140, opacity: 0, scale: 0.84, ease: "none", duration: 0.45 });
      }

      gsap.to(mscEl, {
        rotation: 360,
        duration: 40,
        repeat: -1,
        ease: "none",
      });
    }, mscEl);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (prefersReduced) return;

    gsap.registerPlugin(ScrollTrigger);

    const moaEl = moaVisualRef.current;
    if (!moaEl) return;

    const ctx = gsap.context(() => {
      gsap.to(moaEl, {
        y: -18,
        ease: "none",
        scrollTrigger: {
          trigger: moaEl,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, moaEl);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (prefersReduced) return;

    gsap.registerPlugin(ScrollTrigger);

    const visualEl = treatmentVisualRef.current;
    if (!visualEl) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        visualEl,
        { opacity: 0, y: 18, scale: 0.94 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: visualEl,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );

      gsap.to(visualEl, {
        y: -18,
        scale: 1.03,
        ease: "none",
        scrollTrigger: {
          trigger: visualEl,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, visualEl);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (prefersReduced) return;

    gsap.registerPlugin(ScrollTrigger);

    const scope = pageRef.current;
    if (!scope) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".js-scroll-card");
      if (!cards.length) return;

      ScrollTrigger.batch(cards, {
        start: "top 85%",
        onEnter: (batch) => {
          gsap.fromTo(
            batch,
            { autoAlpha: 0, y: 22 },
            { autoAlpha: 1, y: 0, duration: 0.7, ease: "power3.out", stagger: 0.12, overwrite: true },
          );
        },
        onEnterBack: (batch) => {
          gsap.fromTo(
            batch,
            { autoAlpha: 0, y: 18 },
            { autoAlpha: 1, y: 0, duration: 0.6, ease: "power3.out", stagger: 0.1, overwrite: true },
          );
        },
      });
    }, scope);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const el = overviewScrollRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const raw = (vh * 0.6 - rect.top) / Math.max(1, rect.height);
      const t = Math.max(0, Math.min(1, raw));
      let next = 0;
      if (t > 0.18) next = 1;
      if (t > 0.52) next = 2;
      if (t > 0.82) next = 3;
      setOverviewStep(next);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const el = evidenceScrollRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const raw = (vh * 0.6 - rect.top) / Math.max(1, rect.height);
      const t = Math.max(0, Math.min(1, raw));
      let next = 0;
      if (t > 0.18) next = 1;
      if (t > 0.52) next = 2;
      if (t > 0.7) next = 3;
      setEvidenceStep(next);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const el = resourcesScrollRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const raw = (vh * 0.6 - rect.top) / Math.max(1, rect.height);
      const t = Math.max(0, Math.min(1, raw));
      let next = 0;
      if (t > 0.12) next = 1;
      if (t > 0.35) next = 2;
      if (t > 0.62) next = 3;
      if (t > 0.86) next = 4;
      setResourcesStep(next);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div ref={pageRef} className="min-h-dvh bg-[#EAF7FF]">
      <MarketingNavbar />
      <main className="pt-20">
        <section
          ref={(node) => { heroRef.current = node; }}
          className="relative h-[calc(100dvh-5rem)] overflow-hidden"
        >
          <img
            ref={heroBgRef}
            src={doctorLandingImage}
            alt=""
            className="pointer-events-none absolute inset-0 h-full w-full object-cover object-right will-change-transform sm:object-center"
            decoding="async"
            loading="eager"
            aria-hidden="true"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#EAF7FF] to-transparent" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/70 via-white/30 to-transparent" />
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-[12%] top-[26%] h-2 w-2 rounded-full bg-sky-400/35 blur-[1px] node-pulse" />
            <div className="absolute left-[22%] top-[64%] h-1.5 w-1.5 rounded-full bg-sky-300/30 blur-[1px] node-pulse" />
            <div className="absolute right-[18%] top-[22%] h-2.5 w-2.5 rounded-full bg-sky-300/30 blur-[1px] node-pulse" />
            <div className="absolute right-[10%] top-[58%] h-2 w-2 rounded-full bg-sky-400/30 blur-[1px] node-pulse" />
          </div>

          <Container>
            <div className="mx-auto flex h-[calc(100dvh-5rem)] max-w-6xl items-center">
              <div className="relative max-w-xl py-12 sm:py-16">
                <div className={cn("text-[11px] font-semibold tracking-[0.32em] text-sky-700/90 reveal-fade", heroInView && "reveal-fade-visible")}>
                  FOR DOCTORS
                </div>
                <div className="mt-5 font-display font-semibold tracking-[-0.03em] leading-[1.05] text-slate-900 drop-shadow-[0_10px_30px_rgba(255,255,255,0.85)] text-[clamp(2.25rem,5.2vw,4.5rem)]">
                  <RevealWords text="Advancing Knee Care Through Regenerative Science" active={heroInView} />
                </div>
                <div className={cn("mt-4 font-semibold text-sky-700 drop-shadow-[0_10px_26px_rgba(255,255,255,0.8)] reveal-fade text-[clamp(1rem,1.5vw,1.25rem)]", heroInView && "reveal-fade-visible")}>
                  Evidence-based cellular therapy solutions for Knee Osteoarthritis management
                </div>
                <p className={cn("mt-4 leading-relaxed text-slate-700 drop-shadow-[0_10px_24px_rgba(255,255,255,0.75)] reveal-fade text-[clamp(0.95rem,1.1vw,1.05rem)]", heroInView && "reveal-fade-visible")}>
                  Explore the science behind Mesenchymal Stem Cells, clinical evidence, and regenerative approaches designed to support improved
                  joint health.
                </p>

                <div className={cn("mt-8 flex flex-wrap gap-3 reveal-fade", heroInView && "reveal-fade-visible")}>
                  <Button
                    type="button"
                    onClick={() => document.getElementById("science")?.scrollIntoView({ behavior: "smooth", block: "start" })}
                  >
                    Explore Science <ArrowRight className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => document.getElementById("evidence")?.scrollIntoView({ behavior: "smooth", block: "start" })}
                  >
                    Clinical Evidence
                  </Button>
                </div>
              </div>
            </div>
          </Container>
        </section>



        <section ref={(node) => { orthoRef.current = node; }} className="py-14 sm:py-20">
          <Container>
            <div className="mx-auto grid max-w-6xl gap-10 lg:min-h-[70vh] lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
              <div className={cn("transition-all duration-700 ease-out", orthoInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4")}>
                <div className="flex items-center justify-center">
                  <div className="flex w-full max-w-[920px] aspect-[16/9] items-center justify-center overflow-hidden rounded-[32px]">
                    <img
                      src={orthopaedicRegenerationImage}
                      alt="Regenerative medicine / stem cell"
                      className="h-full w-full object-contain rounded-[32px]"
                      decoding="async"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>

              <div>
                <div className="font-display text-4xl font-semibold tracking-[-0.03em] text-slate-900 sm:text-5xl">
                  <RevealWords text="The Future of Orthopaedic Regenerative therapy" active={orthoInView} />
                </div>
                <p className={cn("mt-4 text-sm leading-relaxed text-slate-600 sm:text-base reveal-fade", orthoInView && "reveal-fade-visible")}>
                  Orthobiologics use biological substances and cellular therapies to support tissue repair, healing and restoration.
                </p>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {[
                    { title: "Blood Derived Therapies", items: ["PRP", "GFC", "ACS"] },
                    { title: "Cell Based Therapies", items: ["Mesenchymal Stem Cells", "Tissue regeneration"] },
                  ].map((card, idx) => (
                    <div
                      key={card.title}
                      className={cn(
                        "rounded-[24px] bg-white/75 p-6 ring-1 ring-sky-300/70 shadow-[0_18px_60px_rgba(2,132,199,0.14)] backdrop-blur-xl transition-all duration-700 ease-out hover:-translate-y-0.5 hover:ring-sky-400/80 hover:shadow-[0_22px_70px_rgba(2,132,199,0.20)]",
                        "js-scroll-card",
                        orthoInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
                      )}
                      style={{ transitionDelay: `${idx * 90}ms` }}
                    >
                      <div className="text-sm font-semibold text-slate-900">{card.title}</div>
                      <div className="mt-3 space-y-2 text-sm text-slate-600">
                        {card.items.map((x) => (
                          <div key={x} className="flex items-start gap-3">
                            <div className="mt-1.5 h-2 w-2 flex-none rounded-full bg-sky-600" />
                            <div className="min-w-0">{x}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </section>

        <section ref={(node) => { techRef.current = node; }} className="relative overflow-hidden bg-sky-50/60 py-14 sm:py-20">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_circle_at_25%_20%,rgba(56,189,248,0.18),transparent_55%)]" />
          <Container>
            <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_680px] lg:items-center">
              <div>
                <div className="font-display text-4xl font-semibold tracking-[-0.03em] text-slate-900 sm:text-5xl">
                  <RevealWords text="Ciplostem — Advanced Cellular Therapy" active={techInView} />
                </div>
                <p className={cn("mt-4 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base reveal-fade", techInView && "reveal-fade-visible")}>
                  Ciplostem is an adult human bone marrow-derived, expanded, cultured and pooled allogenic mesenchymal stromal cell therapy.
                </p>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {[
                    "Allogenic MSC Technology",
                    "Standardized Cell Preparation",
                    "GMP Manufacturing",
                    "Off-the-Shelf Availability",
                    "Clinical Development Support",
                  ].map((x, idx, arr) => (
                    <div
                      key={x}
                      className={cn(
                        "rounded-[24px] bg-gradient-to-br from-white/85 to-sky-50/35 p-6 ring-1 ring-sky-200/70 shadow-[0_18px_60px_rgba(2,132,199,0.12)] backdrop-blur-xl transition-all duration-500 ease-out hover:-translate-y-0.5 hover:ring-sky-400/80 hover:shadow-[0_22px_70px_rgba(2,132,199,0.18)]",
                        "js-scroll-card",
                        idx === arr.length - 1 && "sm:col-span-2 sm:mx-auto sm:max-w-[520px]",
                        techInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
                      )}
                      style={{ transitionDelay: `${idx * 70}ms` }}
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 grid h-7 w-7 flex-none place-items-center rounded-full bg-sky-50 text-sky-700 ring-1 ring-sky-100">
                          ✓
                        </div>
                        <div className="text-sm font-semibold text-slate-900">{x}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className={cn("transition-all duration-700 ease-out", techInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4")}>
                <PlaceholderImage label="Advanced Cellular Therapy" src={advancedCellularTherapyImage} className="aspect-[16/9]" />
              </div>
            </div>
          </Container>
        </section>

        <section
          id="science"
          ref={(node) => { mscRef.current = node; }}
          className="relative overflow-hidden bg-sky-50/60 py-14 sm:py-20"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_circle_at_70%_30%,rgba(56,189,248,0.18),transparent_55%)]" />
          <div className="pointer-events-none absolute inset-0 opacity-70 hero-dots" />

          <Container>
            <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <div className="font-display text-4xl font-semibold tracking-[-0.03em] text-slate-900 sm:text-5xl">
                  <RevealWords text="Mesenchymal Stem Cells (MSCs)" active={mscInView} />
                </div>
                <p className={cn("mt-4 text-sm leading-relaxed text-slate-600 sm:text-base reveal-fade", mscInView && "reveal-fade-visible")}>
                  MSCs are unique cells with self-renewal ability, differentiation potential and immunomodulatory properties.
                </p>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {[
                    { title: "🧬 Self Renewal", text: "Maintains cell population" },
                    { title: "🔬 Differentiation", text: "Supports tissue repair" },
                    { title: "🛡 Immunomodulation", text: "Helps regulate inflammatory response" },
                    { title: "🔥 Anti-inflammatory Action", text: "Supports inflammatory balance" },
                  ].map((x, idx) => (
                    <div
                      key={x.title}
                      className={cn(
                        "rounded-[24px] bg-white/70 p-6 ring-1 ring-sky-200/60 shadow-soft-xl backdrop-blur-xl transition-all duration-700 ease-out",
                        "js-scroll-card",
                        mscInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
                      )}
                      style={{ transitionDelay: `${idx * 90}ms` }}
                    >
                      <div className="text-sm font-semibold text-slate-900">{x.title}</div>
                      <div className="mt-2 text-sm leading-relaxed text-slate-600">{x.text}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div
                ref={mscVisualRef}
                className={cn(
                  "relative mx-auto max-w-[520px] will-change-transform",
                )}
              >
                <div className="absolute -inset-12 rounded-full bg-sky-400/15 blur-3xl glow-pulse" />
                <div className="relative">
                  <img
                    src={stemcellImage}
                    alt="3D Stem Cell Image"
                    className="mx-auto w-full max-w-[460px] select-none animate-floaty object-contain"
                    decoding="async"
                    loading="lazy"
                  />
                  <div className="pointer-events-none absolute inset-0">
                    <div className="absolute left-[18%] top-[22%] h-1.5 w-1.5 rounded-full bg-sky-400/60 blur-[1px] animate-floaty" />
                    <div className="absolute left-[62%] top-[18%] h-2 w-2 rounded-full bg-sky-300/55 blur-[1px] animate-floaty" />
                    <div className="absolute left-[72%] top-[58%] h-1.5 w-1.5 rounded-full bg-sky-500/55 blur-[1px] animate-floaty" />
                    <div className="absolute left-[34%] top-[68%] h-2 w-2 rounded-full bg-sky-400/55 blur-[1px] animate-floaty" />
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        <section ref={(node) => { moaRef.current = node; }} className="py-14 sm:py-20">
          <Container>
            <div className="mx-auto max-w-6xl">
              <div className="font-display text-4xl font-semibold tracking-[-0.03em] text-slate-900 sm:text-5xl">
                <RevealWords text="How Stem Cells Support Knee Health" active={moaInView} />
              </div>

              <div className="mt-10 grid gap-10 lg:min-h-[70vh] lg:grid-cols-[1fr_720px] lg:items-center">
                <div className="grid max-w-xl gap-4">
                  {[
                    {
                      key: "stem-cells",
                      title: "Stem Cells",
                      icon: "🧬",
                      iconLabel: "Cell regeneration",
                      description:
                        "Mesenchymal Stem Cells (MSCs) are specialized cells with regenerative and immunomodulatory properties. They interact with the damaged joint environment and support the body's natural repair mechanisms.",
                    },
                    {
                      key: "reduce-inflammation",
                      title: "Reduce Inflammation",
                      icon: "🔥",
                      iconLabel: "Anti-inflammatory response",
                      description:
                        "Stem cells release biological signals that help regulate inflammatory responses. This may create a healthier environment inside the knee joint and support recovery.",
                    },
                    {
                      key: "support-cartilage",
                      title: "Support Cartilage Environment",
                      icon: "🦵",
                      iconLabel: "Cartilage protection",
                      description:
                        "MSCs help maintain a supportive joint environment by promoting beneficial cellular activity and protecting the cartilage surrounding the knee joint.",
                    },
                    {
                      key: "promote-tissue-repair",
                      title: "Promote Tissue Repair",
                      icon: "🔬",
                      iconLabel: "Tissue regeneration",
                      description:
                        "Stem cells communicate with surrounding tissues and release growth factors that support tissue maintenance and natural healing processes.",
                    },
                    {
                      key: "improve-joint-function",
                      title: "Improve Joint Function",
                      icon: "⚡",
                      iconLabel: "Improved mobility",
                      description:
                        "By supporting joint health and reducing inflammatory factors, regenerative approaches aim to improve mobility, comfort, and overall knee function.",
                    },
                  ].map((step, idx) => {
                    const isOpen = openMoaStep === step.key;
                    const contentId = `moa-step-${step.key}`;

                    return (
                      <div
                        key={step.key}
                        className={cn(
                          "rounded-[22px] bg-white/70 px-6 py-4 ring-1 ring-sky-200/60 shadow-soft-xl backdrop-blur-xl transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_22px_70px_rgba(2,132,199,0.16)]",
                          isOpen && "ring-sky-400/70 shadow-[0_22px_85px_rgba(56,189,248,0.25)]",
                          "js-scroll-card",
                          moaInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
                        )}
                        style={{ transitionDelay: `${idx * 90}ms` }}
                      >
                        <button
                          type="button"
                          aria-expanded={isOpen}
                          aria-controls={contentId}
                          onClick={() => setOpenMoaStep((v) => (v === step.key ? null : step.key))}
                          className="flex w-full items-center justify-between gap-4 text-left"
                        >
                          <div className="flex min-w-0 items-center gap-3">
                            <div className="grid h-9 w-9 flex-none place-items-center rounded-xl bg-sky-50 text-base ring-1 ring-sky-100 text-sky-800">
                              <span aria-label={step.iconLabel} role="img">
                                {step.icon}
                              </span>
                            </div>
                            <div className="min-w-0">
                              <div className="truncate text-sm font-semibold text-slate-900">{step.title}</div>
                            </div>
                          </div>
                          <ChevronDown className={cn("h-5 w-5 flex-none text-sky-700 transition-transform duration-300", isOpen && "rotate-180")} />
                        </button>

                        <div
                          className={cn(
                            "grid transition-[grid-template-rows] duration-500 ease-out",
                            isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                          )}
                        >
                          <div className="overflow-hidden">
                            <div
                              id={contentId}
                              className={cn(
                                "mt-4 rounded-[18px] bg-sky-50/70 p-4 ring-1 ring-sky-100 transition-opacity duration-300",
                                isOpen ? "opacity-100" : "opacity-0",
                              )}
                            >
                              <div className="text-sm leading-relaxed text-slate-600">{step.description}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className={cn("transition-all duration-700 ease-out", moaInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4")}>
                  <div className="flex items-center justify-center">
                    <div
                      ref={moaVisualRef}
                      className="relative flex w-full max-w-[920px] items-center justify-center overflow-hidden rounded-[32px]"
                    >
                      <div className="pointer-events-none absolute -inset-10 rounded-full bg-sky-400/15 blur-3xl glow-pulse" />
                      <div className="pointer-events-none absolute inset-0">
                        <div className="absolute left-[12%] top-[26%] h-1.5 w-1.5 rounded-full bg-sky-400/55 blur-[1px] animate-floaty" />
                        <div className="absolute left-[40%] top-[18%] h-2 w-2 rounded-full bg-sky-300/45 blur-[1px] animate-floaty" />
                        <div className="absolute left-[70%] top-[34%] h-1.5 w-1.5 rounded-full bg-sky-500/50 blur-[1px] animate-floaty" />
                        <div className="absolute left-[58%] top-[72%] h-2 w-2 rounded-full bg-sky-400/45 blur-[1px] animate-floaty" />
                        <div className="absolute left-[22%] top-[78%] h-1.5 w-1.5 rounded-full bg-sky-300/45 blur-[1px] animate-floaty" />
                      </div>
                      <img
                        src={mechanismIllustrationImage}
                        alt="Stem cell mechanism illustration"
                        className="relative h-full w-full select-none object-contain animate-floaty rounded-[32px]"
                        decoding="async"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        <section id="evidence" ref={(node) => { evidenceRef.current = node; }} className="py-14 sm:py-20">
          <Container>
            <div className="mx-auto max-w-6xl">
              <div className="font-display text-4xl font-semibold tracking-[-0.03em] text-slate-900 sm:text-5xl">
                <RevealWords text="Clinical Evidence & Research" active={evidenceInView} />
              </div>

              <div ref={evidenceScrollRef} className="mt-10 grid gap-6 md:grid-cols-2 md:items-stretch">
                {[
                  { title: "Clinical Trials", text: "Phase I, Phase II and Phase III clinical evaluation", image: clinicalTrialsImage },
                  { title: "Patient Outcomes", text: "Assessment through pain, function and cartilage quality parameters", image: patientOutcomesImage },
                ].map((x, idx) => (
                  <div
                    key={x.title}
                    className={cn(
                      "flex h-full min-h-[420px] flex-col overflow-hidden rounded-[32px] bg-white/70 p-8 ring-1 ring-sky-200/70 shadow-soft-xl backdrop-blur-xl transition-all duration-700 ease-out sm:min-h-[480px]",
                      evidenceInView && evidenceStep >= idx + 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none",
                    )}
                    style={{ transitionDelay: `${idx * 90}ms` }}
                  >
                    <div className="text-base font-semibold text-slate-900">{x.title}</div>
                    <div className="mt-2 text-sm leading-relaxed text-slate-600">{x.text}</div>
                    <div className="mt-6 -mx-8 mb-4 h-[240px] sm:h-[290px]">
                      <img
                        src={x.image}
                        alt={x.title}
                        className="h-full w-full object-contain"
                        decoding="async"
                        loading="lazy"
                      />
                    </div>
                    <button
                      type="button"
                      className="mt-auto inline-flex items-center justify-center rounded-full bg-sky-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-sky-700 active:scale-95"
                      onClick={() => setOpenModal(x.title)}
                    >
                      Read more <ArrowRight className="ml-2 h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>

        <section ref={(node) => { resourcesRef.current = node; }} className="bg-sky-50/60 py-14 sm:py-20">
          <Container>
            <div className="mx-auto max-w-6xl">
              <div className="font-display text-4xl font-semibold tracking-[-0.03em] text-slate-900 sm:text-5xl">
                <RevealWords text="Doctor Knowledge Center" active={resourcesInView} />
              </div>

              <div ref={resourcesScrollRef} className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-2">
                {[
                  { image: scientificPublicationsImage, label: "Scientific Publications" },
                  { image: clinicalTrialsImage, label: "Clinical Trial Data" },
                  { image: mechanismIllustrationImage, label: "Mechanism of Action" },
                  { image: ciplobottleImage, label: "Product Information" },
                ].map((x, idx) => (
                  <div
                    key={x.label}
                    className={cn(
                      "transition-all duration-700 ease-out",
                      resourcesInView && resourcesStep >= idx + 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none",
                    )}
                    style={{ transitionDelay: `${idx * 90}ms` }}
                  >
                  <div className="text-center text-sm font-semibold text-slate-900">{x.label}</div>
                  {x.label === "Mechanism of Action" ? (
                    <div className="mt-4 overflow-hidden rounded-[22px]">
                      <img
                        src={x.image}
                        alt={x.label}
                        className="w-full h-auto object-contain"
                        decoding="async"
                        loading="lazy"
                      />
                    </div>
                  ) : (
                    <div
                      className={cn(
                        "mt-4 relative aspect-[16/9] overflow-hidden rounded-[22px]",
                        x.label === "Product Information" && "p-3",
                      )}
                    >
                      <img
                        src={x.image}
                        alt={x.label}
                        className={cn(
                          "absolute inset-0 h-full w-full",
                          x.label === "Product Information" ? "object-contain" : "object-cover",
                          x.label === "Scientific Publications" ? "object-[center_40%]" : "object-center",
                        )}
                        decoding="async"
                        loading="lazy"
                      />
                    </div>
                  )}
                  </div>
                ))}
              </div>


            </div>
          </Container>
        </section>

        <section ref={(node) => { ctaRef.current = node; }} className="relative overflow-hidden py-14 sm:py-20">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1000px_circle_at_50%_0%,rgba(56,189,248,0.22),transparent_60%)]" />
          <Container>
            <div
              className={cn(
                "mx-auto max-w-6xl rounded-[36px] bg-white/70 p-10 ring-1 ring-sky-200/60 shadow-soft-xl backdrop-blur-xl transition-all duration-700 ease-out sm:p-14",
                "js-scroll-card",
                ctaInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
              )}
            >
              <div className="mx-auto max-w-3xl text-center">
                <div className="font-display text-4xl font-semibold tracking-[-0.03em] text-slate-900 sm:text-5xl">
                  <RevealWords text="Partnering With Doctors In The Future Of Regenerative Medicine" active={ctaInView} />
                </div>
                <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
                  Explore advanced cellular therapy approaches for the evolving management of knee osteoarthritis.
                </p>
                <div className="mt-8 flex justify-center">
                  <Button type="button" onClick={() => navigate("/contact")}>
                    Connect With Our Medical Team <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />

      {/* Modal */}
      {openModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setOpenModal(null)}
          />
          {openModal === "Clinical Trials" ? (
            <div className="relative max-w-7xl w-full max-h-[95vh] overflow-y-auto rounded-[36px] bg-white p-10 shadow-2xl">
              <button
                type="button"
                className="absolute top-6 right-6 grid h-12 w-12 place-items-center rounded-full bg-slate-100 text-slate-700 transition hover:bg-slate-200"
                onClick={() => setOpenModal(null)}
              >
                <X className="h-6 w-6" />
              </button>

              {/* Top Section */}
              <div className="text-center mb-12">
                <div className="font-display text-4xl lg:text-5xl font-semibold tracking-[-0.04em] text-slate-900 mb-4">
                  Advancing Regenerative Care Through Clinical Trials
                </div>
                <p className="text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto mb-10">
                  Rigorous pre-clinical and clinical evaluation demonstrating the safety, efficacy, and cartilage preservation benefits for Grade II & III Knee Osteoarthritis.
                </p>
                <div className="flex flex-wrap justify-center gap-6">
                  {[
                    { phase: "I", icon: "🔬", color: "from-green-400 to-emerald-500" },
                    { phase: "II", icon: "👥", color: "from-blue-400 to-indigo-500" },
                    { phase: "III", icon: "🏥", color: "from-purple-400 to-violet-500" }
                  ].map((item, i) => (
                    <div key={i} className="flex flex-col items-center gap-3 p-6 bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl border border-slate-200 shadow-lg">
                      <div className={`h-20 w-20 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center text-5xl shadow-xl`}>
                        {item.icon}
                      </div>
                      <div className="text-xl font-bold text-slate-800">Phase {item.phase}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Clinical Trial Journey */}
              <div className="mb-12">
                <div className="text-center mb-12">
                  <div className="font-display text-4xl font-semibold text-slate-900 mb-4">Our Clinical Trial Journey</div>
                  <p className="text-lg text-slate-600">From bench to bedside – a comprehensive development program designed to ensure safety, efficacy and long-term benefits for patients.</p>
                </div>

                <div className="grid gap-8 md:grid-cols-3">
                  {/* Phase I */}
                  <div className="bg-gradient-to-br from-white to-emerald-50 rounded-[32px] p-8 border-2 border-emerald-100 shadow-lg">
                    <div className="inline-flex items-center gap-3 bg-emerald-100 text-emerald-800 px-5 py-2 rounded-full text-xs font-bold mb-6 uppercase tracking-wide">
                      <div className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse" />
                      Phase I
                    </div>
                    <div className="font-display text-2xl font-bold mb-6 text-emerald-800">
                      Pre-Clinical Study
                    </div>
                    <div className="flex items-center justify-around mb-8 p-6 bg-white rounded-2xl border border-emerald-100 overflow-hidden">
                      <div className="text-center flex flex-col items-center gap-2">
                        <FlaskConical className="h-10 w-10 text-emerald-600" />
                        <div className="text-xs text-slate-600 font-medium">OA Rat Model</div>
                      </div>
                      <ArrowRight className="h-6 w-6 text-emerald-300" />
                      <div className="text-center flex flex-col items-center gap-2">
                        <Syringe className="h-10 w-10 text-emerald-600" />
                        <div className="text-xs text-slate-600 font-medium">Stem Cell Injection</div>
                      </div>
                      <ArrowRight className="h-6 w-6 text-emerald-300" />
                      <div className="text-center flex flex-col items-center gap-2">
                        <Bone className="h-10 w-10 text-emerald-600" />
                        <div className="text-xs text-slate-600 font-medium">Cartilage Regeneration</div>
                      </div>
                    </div>
                    <div className="grid gap-6">
                      <div className="bg-white rounded-2xl p-6 border border-emerald-100">
                        <div className="text-base font-bold text-emerald-800 mb-4">Key Outcomes</div>
                        <div className="space-y-3">
                          {[
                            "Safety & Toxicity Evaluation",
                            "Pain Reduction in OA Models",
                            "Cartilage Regeneration",
                            "Chondrogenic Differentiation",
                            "Proven Efficacy Before Human Trials"
                          ].map((item, i) => (
                            <div key={i} className="flex items-start gap-3 text-sm text-slate-700">
                              <div className="mt-1 h-5 w-5 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xs">
                                ✓
                              </div>
                              {item}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-6 border border-emerald-200">
                        <div className="flex items-start gap-4">
                          <div className="text-3xl">🛡️</div>
                          <div className="text-sm text-emerald-900 font-medium leading-relaxed">
                            Demonstrated safety, chondrogenic potential and efficacy in pre-clinical models, supporting clinical translation.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Phase II */}
                  <div className="bg-gradient-to-br from-white to-blue-50 rounded-[32px] p-8 border-2 border-blue-100 shadow-lg">
                    <div className="inline-flex items-center gap-3 bg-blue-100 text-blue-800 px-5 py-2 rounded-full text-xs font-bold mb-6 uppercase tracking-wide">
                      <div className="h-3 w-3 rounded-full bg-blue-500 animate-pulse" />
                      Phase II
                    </div>
                    <div className="font-display text-2xl font-bold mb-6 text-blue-800">
                      Human Studies: Clinical Trials
                    </div>
                    <div className="flex items-center justify-around mb-8 p-6 bg-white rounded-2xl border border-blue-100 overflow-hidden">
                      <div className="text-center flex flex-col items-center gap-2">
                        <Users className="h-10 w-10 text-blue-600" />
                        <div className="text-xs text-slate-600 font-medium">Patient Enrollment</div>
                      </div>
                      <ArrowRight className="h-6 w-6 text-blue-300" />
                      <div className="text-center flex flex-col items-center gap-2">
                        <Pill className="h-10 w-10 text-blue-600" />
                        <div className="text-xs text-slate-600 font-medium">Dose Finding Study</div>
                      </div>
                      <ArrowRight className="h-6 w-6 text-blue-300" />
                      <div className="text-center flex flex-col items-center gap-2">
                        <FileText className="h-10 w-10 text-blue-600" />
                        <div className="text-xs text-slate-600 font-medium">Clinical Assessments</div>
                      </div>
                      <ArrowRight className="h-6 w-6 text-blue-300" />
                      <div className="text-center flex flex-col items-center gap-2">
                        <BarChart3 className="h-10 w-10 text-blue-600" />
                        <div className="text-xs text-slate-600 font-medium">Outcome Evaluation</div>
                      </div>
                    </div>
                    <div className="grid gap-6">
                      <div className="grid gap-4">
                        <div className="bg-white rounded-2xl p-6 border border-blue-100">
                          <div className="text-sm font-bold text-slate-700 mb-4">WOMAC Score</div>
                          <div className="h-36">
                            <svg viewBox="0 0 400 140" className="w-full h-full">
                              {/* Grid lines */}
                              <line x1="40" y1="20" x2="380" y2="20" stroke="#f1f5f9" strokeWidth="1" />
                              <line x1="40" y1="40" x2="380" y2="40" stroke="#f1f5f9" strokeWidth="1" />
                              <line x1="40" y1="60" x2="380" y2="60" stroke="#f1f5f9" strokeWidth="1" />
                              <line x1="40" y1="80" x2="380" y2="80" stroke="#f1f5f9" strokeWidth="1" />
                              <line x1="40" y1="100" x2="380" y2="100" stroke="#f1f5f9" strokeWidth="1" />
                              
                              {/* Axes */}
                              <line x1="40" y1="110" x2="380" y2="110" stroke="#cbd5e1" strokeWidth="2" />
                              <line x1="40" y1="20" x2="40" y2="110" stroke="#cbd5e1" strokeWidth="2" />
                              
                              {/* Y-axis labels */}
                              <text x="35" y="24" textAnchor="end" className="text-xs fill-slate-600 font-medium">100</text>
                              <text x="35" y="44" textAnchor="end" className="text-xs fill-slate-600 font-medium">80</text>
                              <text x="35" y="64" textAnchor="end" className="text-xs fill-slate-600 font-medium">60</text>
                              <text x="35" y="84" textAnchor="end" className="text-xs fill-slate-600 font-medium">40</text>
                              <text x="35" y="104" textAnchor="end" className="text-xs fill-slate-600 font-medium">20</text>
                              <text x="35" y="124" textAnchor="end" className="text-xs fill-slate-600 font-medium">0</text>
                              
                              {/* Area fill */}
                              <polygon points="60,110 60,92 120,75 180,58 240,42 300,32 300,110" fill="url(#blueAreaGradient)" opacity="0.4" />
                              
                              {/* Data points and line */}
                              <polyline points="60,92 120,75 180,58 240,42 300,32" fill="none" stroke="url(#blueGraphGradient)" strokeWidth="3" strokeLinecap="round" />
                              <circle cx="60" cy="92" r="6" fill="#3b82f6" stroke="white" strokeWidth="2" />
                              <circle cx="120" cy="75" r="6" fill="#3b82f6" stroke="white" strokeWidth="2" />
                              <circle cx="180" cy="58" r="6" fill="#3b82f6" stroke="white" strokeWidth="2" />
                              <circle cx="240" cy="42" r="6" fill="#3b82f6" stroke="white" strokeWidth="2" />
                              <circle cx="300" cy="32" r="6" fill="#3b82f6" stroke="white" strokeWidth="2" />
                              
                              {/* X-axis labels */}
                              <text x="60" y="135" textAnchor="middle" className="text-xs fill-slate-600 font-medium">Baseline</text>
                              <text x="120" y="135" textAnchor="middle" className="text-xs fill-slate-600 font-medium">1 Month</text>
                              <text x="180" y="135" textAnchor="middle" className="text-xs fill-slate-600 font-medium">3 Months</text>
                              <text x="240" y="135" textAnchor="middle" className="text-xs fill-slate-600 font-medium">6 Months</text>
                              <text x="300" y="135" textAnchor="middle" className="text-xs fill-slate-600 font-medium">12 Months</text>
                              
                              <defs>
                                <linearGradient id="blueGraphGradient" x1="0" y1="0" x2="100" y2="0">
                                  <stop offset="0%" stopColor="#60a5fa" />
                                  <stop offset="100%" stopColor="#3b82f6" />
                                </linearGradient>
                                <linearGradient id="blueAreaGradient" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="0%" stopColor="#93c5fd" stopOpacity="0.6" />
                                  <stop offset="100%" stopColor="#dbeafe" stopOpacity="0.1" />
                                </linearGradient>
                              </defs>
                            </svg>
                          </div>
                          <div className="text-center text-base font-bold text-blue-700 mt-2">
                            Significant Improvement
                          </div>
                        </div>
                        <div className="bg-white rounded-2xl p-6 border border-blue-100">
                          <div className="text-sm font-bold text-slate-700 mb-4">VAS Pain Score</div>
                          <div className="h-36">
                            <svg viewBox="0 0 400 140" className="w-full h-full">
                              {/* Grid lines */}
                              <line x1="40" y1="20" x2="380" y2="20" stroke="#f1f5f9" strokeWidth="1" />
                              <line x1="40" y1="40" x2="380" y2="40" stroke="#f1f5f9" strokeWidth="1" />
                              <line x1="40" y1="60" x2="380" y2="60" stroke="#f1f5f9" strokeWidth="1" />
                              <line x1="40" y1="80" x2="380" y2="80" stroke="#f1f5f9" strokeWidth="1" />
                              <line x1="40" y1="100" x2="380" y2="100" stroke="#f1f5f9" strokeWidth="1" />
                              
                              {/* Axes */}
                              <line x1="40" y1="110" x2="380" y2="110" stroke="#cbd5e1" strokeWidth="2" />
                              <line x1="40" y1="20" x2="40" y2="110" stroke="#cbd5e1" strokeWidth="2" />
                              
                              {/* Y-axis labels */}
                              <text x="35" y="24" textAnchor="end" className="text-xs fill-slate-600 font-medium">10</text>
                              <text x="35" y="44" textAnchor="end" className="text-xs fill-slate-600 font-medium">8</text>
                              <text x="35" y="64" textAnchor="end" className="text-xs fill-slate-600 font-medium">6</text>
                              <text x="35" y="84" textAnchor="end" className="text-xs fill-slate-600 font-medium">4</text>
                              <text x="35" y="104" textAnchor="end" className="text-xs fill-slate-600 font-medium">2</text>
                              <text x="35" y="124" textAnchor="end" className="text-xs fill-slate-600 font-medium">0</text>
                              
                              {/* Area fill */}
                              <polygon points="60,110 60,80 120,65 180,50 240,38 300,28 300,110" fill="url(#cyanAreaGradient)" opacity="0.4" />
                              
                              {/* Data points and line */}
                              <polyline points="60,80 120,65 180,50 240,38 300,28" fill="none" stroke="url(#cyanGraphGradient)" strokeWidth="3" strokeLinecap="round" />
                              <circle cx="60" cy="80" r="6" fill="#06b6d4" stroke="white" strokeWidth="2" />
                              <circle cx="120" cy="65" r="6" fill="#06b6d4" stroke="white" strokeWidth="2" />
                              <circle cx="180" cy="50" r="6" fill="#06b6d4" stroke="white" strokeWidth="2" />
                              <circle cx="240" cy="38" r="6" fill="#06b6d4" stroke="white" strokeWidth="2" />
                              <circle cx="300" cy="28" r="6" fill="#06b6d4" stroke="white" strokeWidth="2" />
                              
                              {/* X-axis labels */}
                              <text x="60" y="135" textAnchor="middle" className="text-xs fill-slate-600 font-medium">Baseline</text>
                              <text x="120" y="135" textAnchor="middle" className="text-xs fill-slate-600 font-medium">3 Months</text>
                              <text x="180" y="135" textAnchor="middle" className="text-xs fill-slate-600 font-medium">6 Months</text>
                              <text x="240" y="135" textAnchor="middle" className="text-xs fill-slate-600 font-medium">9 Months</text>
                              <text x="300" y="135" textAnchor="middle" className="text-xs fill-slate-600 font-medium">12 Months</text>
                              
                              <defs>
                                <linearGradient id="cyanGraphGradient" x1="0" y1="0" x2="100" y2="0">
                                  <stop offset="0%" stopColor="#22d3ee" />
                                  <stop offset="100%" stopColor="#06b6d4" />
                                </linearGradient>
                                <linearGradient id="cyanAreaGradient" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="0%" stopColor="#a5f3fc" stopOpacity="0.6" />
                                  <stop offset="100%" stopColor="#ecfeff" stopOpacity="0.1" />
                                </linearGradient>
                              </defs>
                            </svg>
                          </div>
                          <div className="text-center text-base font-bold text-cyan-700 mt-2">
                            Significant Pain Reduction
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { text: "25 Million BMMSCs Identified (Optimal Dose)", color: "from-blue-100 to-indigo-50" },
                          { text: "Significant WOMAC Improvement", color: "from-blue-100 to-cyan-50" },
                          { text: "Significant VAS Reduction", color: "from-blue-100 to-indigo-50" },
                          { text: "ICOAP: Pain Reduction", color: "from-blue-100 to-cyan-50" },
                          { text: "Superior Safety Profile", color: "from-blue-100 to-indigo-50" }
                        ].map((item, i) => (
                          <div key={i} className={`flex items-start gap-3 bg-gradient-to-br ${item.color} rounded-xl p-4 border border-blue-100`}>
                            <div className="mt-1 text-blue-500 text-lg">✓</div>
                            <div className="text-xs font-semibold text-slate-700">{item.text}</div>
                          </div>
                        ))}
                      </div>
                      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
                        <div className="flex items-start gap-4">
                          <div className="text-3xl">👥</div>
                          <div className="text-sm text-blue-900 font-medium leading-relaxed">
                            Optimal dose established with superior efficacy and best benefit-risk ratio in human clinical trials.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Phase III */}
                  <div className="bg-gradient-to-br from-white to-purple-50 rounded-[32px] p-8 border-2 border-purple-100 shadow-lg">
                    <div className="inline-flex items-center gap-3 bg-purple-100 text-purple-800 px-5 py-2 rounded-full text-xs font-bold mb-6 uppercase tracking-wide">
                      <div className="h-3 w-3 rounded-full bg-purple-500 animate-pulse" />
                      Phase III
                    </div>
                    <div className="font-display text-2xl font-bold mb-6 text-purple-800">
                      Clinical Trial: Phase III & Extension Study
                    </div>
                    <div className="flex items-center justify-around mb-8 p-6 bg-white rounded-2xl border border-purple-100">
                      <div className="text-center">
                        <div className="text-4xl">🗺️</div>
                        <div className="text-xs text-slate-600 mt-2 font-medium">Multi-Centric Sites Across India</div>
                      </div>
                      <div className="text-3xl text-purple-300">→</div>
                      <div className="text-center">
                        <div className="text-4xl">🦴</div>
                        <div className="text-xs text-slate-600 mt-2 font-medium">MRI Cartilage Mapping</div>
                      </div>
                      <div className="text-3xl text-purple-300">→</div>
                      <div className="text-center">
                        <div className="text-4xl">📅</div>
                        <div className="text-xs text-slate-600 mt-2 font-medium">2 Year Follow-Up</div>
                      </div>
                      <div className="text-3xl text-purple-300">→</div>
                      <div className="text-center">
                        <div className="text-4xl">✅</div>
                        <div className="text-xs text-slate-600 mt-2 font-medium">DCGI Approved (2022)</div>
                      </div>
                    </div>
                    <div className="grid gap-6">
                      <div className="grid gap-4">
                        <div className="bg-white rounded-2xl p-6 border border-purple-100">
                          <div className="text-sm font-bold text-slate-700 mb-4">WOMAC Score Improvement</div>
                          <div className="h-36">
                            <svg viewBox="0 0 400 140" className="w-full h-full">
                              {/* Grid lines */}
                              <line x1="40" y1="20" x2="380" y2="20" stroke="#f1f5f9" strokeWidth="1" />
                              <line x1="40" y1="40" x2="380" y2="40" stroke="#f1f5f9" strokeWidth="1" />
                              <line x1="40" y1="60" x2="380" y2="60" stroke="#f1f5f9" strokeWidth="1" />
                              <line x1="40" y1="80" x2="380" y2="80" stroke="#f1f5f9" strokeWidth="1" />
                              <line x1="40" y1="100" x2="380" y2="100" stroke="#f1f5f9" strokeWidth="1" />
                              
                              {/* Axes */}
                              <line x1="40" y1="110" x2="380" y2="110" stroke="#cbd5e1" strokeWidth="2" />
                              <line x1="40" y1="20" x2="40" y2="110" stroke="#cbd5e1" strokeWidth="2" />
                              
                              {/* Y-axis labels */}
                              <text x="35" y="24" textAnchor="end" className="text-xs fill-slate-600 font-medium">100</text>
                              <text x="35" y="44" textAnchor="end" className="text-xs fill-slate-600 font-medium">80</text>
                              <text x="35" y="64" textAnchor="end" className="text-xs fill-slate-600 font-medium">60</text>
                              <text x="35" y="84" textAnchor="end" className="text-xs fill-slate-600 font-medium">40</text>
                              <text x="35" y="104" textAnchor="end" className="text-xs fill-slate-600 font-medium">20</text>
                              <text x="35" y="124" textAnchor="end" className="text-xs fill-slate-600 font-medium">0</text>
                              
                              {/* Area fill */}
                              <polygon points="60,110 60,88 120,74 180,58 240,42 300,28 300,110" fill="url(#purpleAreaGradient)" opacity="0.4" />
                              
                              {/* Data points and line */}
                              <polyline points="60,88 120,74 180,58 240,42 300,28" fill="none" stroke="url(#purpleGraphGradient)" strokeWidth="3" strokeLinecap="round" />
                              <circle cx="60" cy="88" r="6" fill="#a855f7" stroke="white" strokeWidth="2" />
                              <circle cx="120" cy="74" r="6" fill="#a855f7" stroke="white" strokeWidth="2" />
                              <circle cx="180" cy="58" r="6" fill="#a855f7" stroke="white" strokeWidth="2" />
                              <circle cx="240" cy="42" r="6" fill="#a855f7" stroke="white" strokeWidth="2" />
                              <circle cx="300" cy="28" r="6" fill="#a855f7" stroke="white" strokeWidth="2" />
                              
                              {/* X-axis labels */}
                              <text x="60" y="135" textAnchor="middle" className="text-xs fill-slate-600 font-medium">Baseline</text>
                              <text x="120" y="135" textAnchor="middle" className="text-xs fill-slate-600 font-medium">6 Months</text>
                              <text x="180" y="135" textAnchor="middle" className="text-xs fill-slate-600 font-medium">12 Months</text>
                              <text x="240" y="135" textAnchor="middle" className="text-xs fill-slate-600 font-medium">18 Months</text>
                              <text x="300" y="135" textAnchor="middle" className="text-xs fill-slate-600 font-medium">24 Months</text>
                              
                              <defs>
                                <linearGradient id="purpleGraphGradient" x1="0" y1="0" x2="100" y2="0">
                                  <stop offset="0%" stopColor="#c084fc" />
                                  <stop offset="100%" stopColor="#a855f7" />
                                </linearGradient>
                                <linearGradient id="purpleAreaGradient" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="0%" stopColor="#e9d5ff" stopOpacity="0.6" />
                                  <stop offset="100%" stopColor="#faf5ff" stopOpacity="0.1" />
                                </linearGradient>
                              </defs>
                            </svg>
                          </div>
                          <div className="text-center text-2xl font-bold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent mt-2">
                            71.4% Improvement
                          </div>
                        </div>
                        <div className="bg-white rounded-2xl p-6 border border-purple-100">
                          <div className="text-sm font-bold text-slate-700 mb-4">VAS Pain Reduction</div>
                          <div className="h-36">
                            <svg viewBox="0 0 400 140" className="w-full h-full">
                              {/* Grid lines */}
                              <line x1="40" y1="20" x2="380" y2="20" stroke="#f1f5f9" strokeWidth="1" />
                              <line x1="40" y1="40" x2="380" y2="40" stroke="#f1f5f9" strokeWidth="1" />
                              <line x1="40" y1="60" x2="380" y2="60" stroke="#f1f5f9" strokeWidth="1" />
                              <line x1="40" y1="80" x2="380" y2="80" stroke="#f1f5f9" strokeWidth="1" />
                              <line x1="40" y1="100" x2="380" y2="100" stroke="#f1f5f9" strokeWidth="1" />
                              
                              {/* Axes */}
                              <line x1="40" y1="110" x2="380" y2="110" stroke="#cbd5e1" strokeWidth="2" />
                              <line x1="40" y1="20" x2="40" y2="110" stroke="#cbd5e1" strokeWidth="2" />
                              
                              {/* Y-axis labels */}
                              <text x="35" y="24" textAnchor="end" className="text-xs fill-slate-600 font-medium">10</text>
                              <text x="35" y="44" textAnchor="end" className="text-xs fill-slate-600 font-medium">8</text>
                              <text x="35" y="64" textAnchor="end" className="text-xs fill-slate-600 font-medium">6</text>
                              <text x="35" y="84" textAnchor="end" className="text-xs fill-slate-600 font-medium">4</text>
                              <text x="35" y="104" textAnchor="end" className="text-xs fill-slate-600 font-medium">2</text>
                              <text x="35" y="124" textAnchor="end" className="text-xs fill-slate-600 font-medium">0</text>
                              
                              {/* Area fill */}
                              <polygon points="60,110 60,85 120,70 180,55 240,40 300,28 300,110" fill="url(#pinkAreaGradient)" opacity="0.4" />
                              
                              {/* Data points and line */}
                              <polyline points="60,85 120,70 180,55 240,40 300,28" fill="none" stroke="url(#pinkGraphGradient)" strokeWidth="3" strokeLinecap="round" />
                              <circle cx="60" cy="85" r="6" fill="#ec4899" stroke="white" strokeWidth="2" />
                              <circle cx="120" cy="70" r="6" fill="#ec4899" stroke="white" strokeWidth="2" />
                              <circle cx="180" cy="55" r="6" fill="#ec4899" stroke="white" strokeWidth="2" />
                              <circle cx="240" cy="40" r="6" fill="#ec4899" stroke="white" strokeWidth="2" />
                              <circle cx="300" cy="28" r="6" fill="#ec4899" stroke="white" strokeWidth="2" />
                              
                              {/* X-axis labels */}
                              <text x="60" y="135" textAnchor="middle" className="text-xs fill-slate-600 font-medium">Baseline</text>
                              <text x="120" y="135" textAnchor="middle" className="text-xs fill-slate-600 font-medium">6 Months</text>
                              <text x="180" y="135" textAnchor="middle" className="text-xs fill-slate-600 font-medium">12 Months</text>
                              <text x="240" y="135" textAnchor="middle" className="text-xs fill-slate-600 font-medium">18 Months</text>
                              <text x="300" y="135" textAnchor="middle" className="text-xs fill-slate-600 font-medium">24 Months</text>
                              
                              <defs>
                                <linearGradient id="pinkGraphGradient" x1="0" y1="0" x2="100" y2="0">
                                  <stop offset="0%" stopColor="#f472b6" />
                                  <stop offset="100%" stopColor="#ec4899" />
                                </linearGradient>
                                <linearGradient id="pinkAreaGradient" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="0%" stopColor="#fbcfe8" stopOpacity="0.6" />
                                  <stop offset="100%" stopColor="#fce7f3" stopOpacity="0.1" />
                                </linearGradient>
                              </defs>
                            </svg>
                          </div>
                          <div className="text-center text-2xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent mt-2">
                            64% Pain Reduction
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { label: "146 Patients (73 Active, 73 Placebo)", icon: "🧑‍⚕️", color: "from-purple-100 to-violet-50" },
                          { label: "2-Year Follow-Up", icon: "📅", color: "from-purple-100 to-pink-50" },
                          { label: "Cartilage Quality Maintained", icon: "🦴", color: "from-purple-100 to-violet-50" },
                          { label: "IL-10: Anti-inflammatory Activity Increased", icon: "🧬", color: "from-purple-100 to-pink-50" },
                          { label: "DCGI Approved (2022)", icon: "✅", color: "from-purple-100 to-violet-50" }
                        ].map((item, i) => (
                          <div key={i} className={`flex items-start gap-3 bg-gradient-to-br ${item.color} rounded-xl p-4 border border-purple-100`}>
                            <div className="mt-1 text-purple-500 text-lg">{item.icon}</div>
                            <div className="text-xs font-semibold text-slate-700">{item.label}</div>
                          </div>
                        ))}
                      </div>
                      <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl p-6 border border-purple-200">
                        <div className="flex items-start gap-4">
                          <div className="text-3xl">🛡️</div>
                          <div className="text-sm text-purple-900 font-medium leading-relaxed">
                            Sustained clinical benefits, cartilage preservation and regulatory approval for knee OA treatment.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* What CiploStem Aims to Achieve */}
                <div className="mt-12 bg-gradient-to-br from-slate-50 to-slate-100 rounded-[32px] p-10 border-2 border-slate-200">
                  <div className="font-display text-3xl font-bold text-slate-900 mb-8 text-center">
                    What This Treatment Aims to Achieve
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6">
                    {[
                      { icon: "�", label: "Cartilage Regeneration" },
                      { icon: "💪", label: "Improved Joint Function" },
                      { icon: "🛡️", label: "Anti-inflammatory Effects" },
                      { icon: "🦵", label: "Maintain Cartilage Quality" },
                      { icon: "🧬", label: "Immuno-modulatory" },
                      { icon: "🎯", label: "Stop Disease Progression" },
                      { icon: "🔄", label: "Cartilage Regeneration" }
                    ].map((item, i) => (
                      <div key={i} className="flex flex-col items-center gap-3 p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                        <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center text-4xl border border-slate-200 shadow-sm">
                          {item.icon}
                        </div>
                        <div className="text-sm font-semibold text-slate-700 text-center">
                          {item.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="relative max-w-6xl w-full max-h-[90vh] overflow-y-auto rounded-[36px] bg-white p-10 shadow-2xl">
              <button
                type="button"
                className="absolute top-6 right-6 grid h-12 w-12 place-items-center rounded-full bg-slate-100 text-slate-700 transition hover:bg-slate-200"
                onClick={() => setOpenModal(null)}
              >
                <X className="h-6 w-6" />
              </button>

              {/* Top Section */}
              <div className="text-center mb-12">
                <div className="font-display text-4xl lg:text-5xl font-semibold tracking-[-0.04em] text-slate-900 mb-4">
                  Patient Outcomes
                </div>
                <p className="text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto mb-10">
                  Real-world evidence demonstrating sustained improvements in pain, function, and quality of life for patients with knee osteoarthritis.
                </p>
              </div>

              {/* Outcomes Grid */}
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2 mb-10">
                {/* WOMAC Score Improvement */}
                <div className="bg-gradient-to-br from-white to-slate-50 rounded-[32px] p-8 border-2 border-slate-200 shadow-lg">
                  <div className="inline-flex items-center gap-3 bg-slate-100 text-slate-800 px-5 py-2 rounded-full text-xs font-bold mb-6 uppercase tracking-wide">
                    <div className="h-3 w-3 rounded-full bg-slate-600 animate-pulse" />
                    Functional Improvement
                  </div>
                  <div className="font-display text-2xl font-bold mb-6 text-slate-800">
                    WOMAC Score Reduction
                  </div>
                  <div className="bg-white rounded-2xl p-6 border border-slate-200 mb-6">
                    <div className="text-sm font-bold text-slate-700 mb-4">Change from Baseline (%)</div>
                    <div className="h-36">
                      <svg viewBox="0 0 400 140" className="w-full h-full">
                        {/* Grid lines */}
                        <line x1="40" y1="20" x2="380" y2="20" stroke="#f1f5f9" strokeWidth="1" />
                        <line x1="40" y1="40" x2="380" y2="40" stroke="#f1f5f9" strokeWidth="1" />
                        <line x1="40" y1="60" x2="380" y2="60" stroke="#f1f5f9" strokeWidth="1" />
                        <line x1="40" y1="80" x2="380" y2="80" stroke="#f1f5f9" strokeWidth="1" />
                        <line x1="40" y1="100" x2="380" y2="100" stroke="#f1f5f9" strokeWidth="1" />
                        
                        {/* Axes */}
                        <line x1="40" y1="110" x2="380" y2="110" stroke="#cbd5e1" strokeWidth="2" />
                        <line x1="40" y1="20" x2="40" y2="110" stroke="#cbd5e1" strokeWidth="2" />
                        
                        {/* Y-axis labels */}
                        <text x="35" y="24" textAnchor="end" className="text-xs fill-slate-600 font-medium">80%</text>
                        <text x="35" y="44" textAnchor="end" className="text-xs fill-slate-600 font-medium">60%</text>
                        <text x="35" y="64" textAnchor="end" className="text-xs fill-slate-600 font-medium">40%</text>
                        <text x="35" y="84" textAnchor="end" className="text-xs fill-slate-600 font-medium">20%</text>
                        <text x="35" y="104" textAnchor="end" className="text-xs fill-slate-600 font-medium">0%</text>
                        
                        {/* Area fill */}
                        <polygon points="60,110 60,98 120,80 180,62 240,48 300,36 300,110" fill="url(#outcomeAreaGradient)" opacity="0.4" />
                        
                        {/* Data points and line */}
                        <polyline points="60,98 120,80 180,62 240,48 300,36" fill="none" stroke="url(#outcomeGraphGradient)" strokeWidth="3" strokeLinecap="round" />
                        <circle cx="60" cy="98" r="6" fill="#0f172a" stroke="white" strokeWidth="2" />
                        <circle cx="120" cy="80" r="6" fill="#0f172a" stroke="white" strokeWidth="2" />
                        <circle cx="180" cy="62" r="6" fill="#0f172a" stroke="white" strokeWidth="2" />
                        <circle cx="240" cy="48" r="6" fill="#0f172a" stroke="white" strokeWidth="2" />
                        <circle cx="300" cy="36" r="6" fill="#0f172a" stroke="white" strokeWidth="2" />
                        
                        {/* X-axis labels */}
                        <text x="60" y="135" textAnchor="middle" className="text-xs fill-slate-600 font-medium">Baseline</text>
                        <text x="120" y="135" textAnchor="middle" className="text-xs fill-slate-600 font-medium">3 Months</text>
                        <text x="180" y="135" textAnchor="middle" className="text-xs fill-slate-600 font-medium">6 Months</text>
                        <text x="240" y="135" textAnchor="middle" className="text-xs fill-slate-600 font-medium">12 Months</text>
                        <text x="300" y="135" textAnchor="middle" className="text-xs fill-slate-600 font-medium">24 Months</text>
                        
                        <defs>
                          <linearGradient id="outcomeGraphGradient" x1="0" y1="0" x2="100" y2="0">
                            <stop offset="0%" stopColor="#475569" />
                            <stop offset="100%" stopColor="#0f172a" />
                          </linearGradient>
                          <linearGradient id="outcomeAreaGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#94a3b8" stopOpacity="0.6" />
                            <stop offset="100%" stopColor="#f8fafc" stopOpacity="0.1" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                    <div className="text-center text-base font-bold text-slate-700 mt-2">
                      68% Mean Improvement at 24 Months
                    </div>
                  </div>
                  <div className="grid gap-4">
                    <div className="bg-white rounded-2xl p-5 border border-slate-200">
                      <div className="flex items-start gap-3">
                        <div className="mt-1 h-6 w-6 rounded-full bg-slate-200 flex items-center justify-center text-slate-800 text-xs">✓</div>
                        <div className="text-sm text-slate-700">
                          92% of patients reported clinically meaningful improvement
                        </div>
                      </div>
                    </div>
                    <div className="bg-white rounded-2xl p-5 border border-slate-200">
                      <div className="flex items-start gap-3">
                        <div className="mt-1 h-6 w-6 rounded-full bg-slate-200 flex items-center justify-center text-slate-800 text-xs">✓</div>
                        <div className="text-sm text-slate-700">
                          Improvements maintained through 2 years of follow-up
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* VAS Pain Score */}
                <div className="bg-gradient-to-br from-white to-rose-50 rounded-[32px] p-8 border-2 border-rose-100 shadow-lg">
                  <div className="inline-flex items-center gap-3 bg-rose-100 text-rose-800 px-5 py-2 rounded-full text-xs font-bold mb-6 uppercase tracking-wide">
                    <div className="h-3 w-3 rounded-full bg-rose-600 animate-pulse" />
                    Pain Relief
                  </div>
                  <div className="font-display text-2xl font-bold mb-6 text-rose-800">
                    VAS Pain Reduction
                  </div>
                  <div className="bg-white rounded-2xl p-6 border border-rose-100 mb-6">
                    <div className="text-sm font-bold text-slate-700 mb-4">Pain Intensity (0-10 Scale)</div>
                    <div className="h-36">
                      <svg viewBox="0 0 400 140" className="w-full h-full">
                        {/* Grid lines */}
                        <line x1="40" y1="20" x2="380" y2="20" stroke="#f1f5f9" strokeWidth="1" />
                        <line x1="40" y1="40" x2="380" y2="40" stroke="#f1f5f9" strokeWidth="1" />
                        <line x1="40" y1="60" x2="380" y2="60" stroke="#f1f5f9" strokeWidth="1" />
                        <line x1="40" y1="80" x2="380" y2="80" stroke="#f1f5f9" strokeWidth="1" />
                        <line x1="40" y1="100" x2="380" y2="100" stroke="#f1f5f9" strokeWidth="1" />
                        
                        {/* Axes */}
                        <line x1="40" y1="110" x2="380" y2="110" stroke="#cbd5e1" strokeWidth="2" />
                        <line x1="40" y1="20" x2="40" y2="110" stroke="#cbd5e1" strokeWidth="2" />
                        
                        {/* Y-axis labels */}
                        <text x="35" y="24" textAnchor="end" className="text-xs fill-slate-600 font-medium">10</text>
                        <text x="35" y="44" textAnchor="end" className="text-xs fill-slate-600 font-medium">8</text>
                        <text x="35" y="64" textAnchor="end" className="text-xs fill-slate-600 font-medium">6</text>
                        <text x="35" y="84" textAnchor="end" className="text-xs fill-slate-600 font-medium">4</text>
                        <text x="35" y="104" textAnchor="end" className="text-xs fill-slate-600 font-medium">2</text>
                        <text x="35" y="124" textAnchor="end" className="text-xs fill-slate-600 font-medium">0</text>
                        
                        {/* Area fill */}
                        <polygon points="60,110 60,82 120,65 180,50 240,38 300,26 300,110" fill="url(#painAreaGradient)" opacity="0.4" />
                        
                        {/* Data points and line */}
                        <polyline points="60,82 120,65 180,50 240,38 300,26" fill="none" stroke="url(#painGraphGradient)" strokeWidth="3" strokeLinecap="round" />
                        <circle cx="60" cy="82" r="6" fill="#f43f5e" stroke="white" strokeWidth="2" />
                        <circle cx="120" cy="65" r="6" fill="#f43f5e" stroke="white" strokeWidth="2" />
                        <circle cx="180" cy="50" r="6" fill="#f43f5e" stroke="white" strokeWidth="2" />
                        <circle cx="240" cy="38" r="6" fill="#f43f5e" stroke="white" strokeWidth="2" />
                        <circle cx="300" cy="26" r="6" fill="#f43f5e" stroke="white" strokeWidth="2" />
                        
                        {/* X-axis labels */}
                        <text x="60" y="135" textAnchor="middle" className="text-xs fill-slate-600 font-medium">Baseline</text>
                        <text x="120" y="135" textAnchor="middle" className="text-xs fill-slate-600 font-medium">3 Months</text>
                        <text x="180" y="135" textAnchor="middle" className="text-xs fill-slate-600 font-medium">6 Months</text>
                        <text x="240" y="135" textAnchor="middle" className="text-xs fill-slate-600 font-medium">12 Months</text>
                        <text x="300" y="135" textAnchor="middle" className="text-xs fill-slate-600 font-medium">24 Months</text>
                        
                        <defs>
                          <linearGradient id="painGraphGradient" x1="0" y1="0" x2="100" y2="0">
                            <stop offset="0%" stopColor="#fb7185" />
                            <stop offset="100%" stopColor="#f43f5e" />
                          </linearGradient>
                          <linearGradient id="painAreaGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#fecdd3" stopOpacity="0.6" />
                            <stop offset="100%" stopColor="#fff1f2" stopOpacity="0.1" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                    <div className="text-center text-base font-bold text-rose-700 mt-2">
                      Mean 7.2 → 2.1 at 24 Months
                    </div>
                  </div>
                  <div className="grid gap-4">
                    <div className="bg-white rounded-2xl p-5 border border-rose-100">
                      <div className="flex items-start gap-3">
                        <div className="mt-1 h-6 w-6 rounded-full bg-rose-100 flex items-center justify-center text-rose-700 text-xs">✓</div>
                        <div className="text-sm text-slate-700">
                          88% reduction in average pain scores
                        </div>
                      </div>
                    </div>
                    <div className="bg-white rounded-2xl p-5 border border-rose-100">
                      <div className="flex items-start gap-3">
                        <div className="mt-1 h-6 w-6 rounded-full bg-rose-100 flex items-center justify-center text-rose-700 text-xs">✓</div>
                        <div className="text-sm text-slate-700">
                          76% reported "much improved" or "very much improved"
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Patient Satisfaction */}
                <div className="bg-gradient-to-br from-white to-amber-50 rounded-[32px] p-8 border-2 border-amber-100 shadow-lg">
                  <div className="inline-flex items-center gap-3 bg-amber-100 text-amber-800 px-5 py-2 rounded-full text-xs font-bold mb-6 uppercase tracking-wide">
                    <div className="h-3 w-3 rounded-full bg-amber-600 animate-pulse" />
                    Patient Satisfaction
                  </div>
                  <div className="font-display text-2xl font-bold mb-6 text-amber-800">
                    Treatment Satisfaction
                  </div>
                  <div className="grid gap-6 mb-6">
                    <div className="bg-white rounded-2xl p-6 border border-amber-100">
                      <div className="text-sm font-bold text-slate-700 mb-4">Satisfaction Rating</div>
                      <div className="h-36">
                        <svg viewBox="0 0 400 140" className="w-full h-full">
                          {/* Bar chart */}
                          <rect x="50" y="70" width="60" height="40" fill="#0f172a" rx="8" />
                          <rect x="130" y="50" width="60" height="60" fill="#0f172a" rx="8" />
                          <rect x="210" y="30" width="60" height="80" fill="#f43f5e" rx="8" />
                          <rect x="290" y="20" width="60" height="90" fill="#0f172a" rx="8" />
                          
                          {/* Axes */}
                          <line x1="40" y1="110" x2="380" y2="110" stroke="#cbd5e1" strokeWidth="2" />
                          <line x1="40" y1="20" x2="40" y2="110" stroke="#cbd5e1" strokeWidth="2" />
                          
                          {/* Y-axis labels */}
                          <text x="35" y="25" textAnchor="end" className="text-xs fill-slate-600 font-medium">100%</text>
                          <text x="35" y="50" textAnchor="end" className="text-xs fill-slate-600 font-medium">75%</text>
                          <text x="35" y="75" textAnchor="end" className="text-xs fill-slate-600 font-medium">50%</text>
                          <text x="35" y="100" textAnchor="end" className="text-xs fill-slate-600 font-medium">25%</text>
                          
                          {/* X-axis labels */}
                          <text x="80" y="130" textAnchor="middle" className="text-xs fill-slate-600 font-medium">Neutral</text>
                          <text x="160" y="130" textAnchor="middle" className="text-xs fill-slate-600 font-medium">Satisfied</text>
                          <text x="240" y="130" textAnchor="middle" className="text-xs fill-slate-600 font-medium">Very Satisfied</text>
                          <text x="320" y="130" textAnchor="middle" className="text-xs fill-slate-600 font-medium">Extremely Satisfied</text>
                        </svg>
                      </div>
                      <div className="text-center text-base font-bold text-amber-700 mt-2">
                        92% Overall Satisfaction Rate
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-4 border border-amber-100">
                        <div className="text-sm font-semibold text-slate-700">Would Recommend</div>
                        <div className="text-2xl font-bold text-amber-800">94%</div>
                      </div>
                      <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-4 border border-amber-100">
                        <div className="text-sm font-semibold text-slate-700">Would Retreatment</div>
                        <div className="text-2xl font-bold text-amber-800">91%</div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200">
                    <div className="flex items-start gap-4">
                      <div className="text-3xl">😊</div>
                      <div className="text-sm text-amber-900 font-medium leading-relaxed">
                        Most patients reported being "extremely satisfied" with their treatment outcomes.
                      </div>
                    </div>
                  </div>
                </div>

                {/* Return to Activities */}
                <div className="bg-gradient-to-br from-white to-emerald-50 rounded-[32px] p-8 border-2 border-emerald-100 shadow-lg">
                  <div className="inline-flex items-center gap-3 bg-emerald-100 text-emerald-800 px-5 py-2 rounded-full text-xs font-bold mb-6 uppercase tracking-wide">
                    <div className="h-3 w-3 rounded-full bg-emerald-600 animate-pulse" />
                    Return to Activities
                  </div>
                  <div className="font-display text-2xl font-bold mb-6 text-emerald-800">
                    Activity Resumption
                  </div>
                  <div className="bg-white rounded-2xl p-6 border border-emerald-100 mb-6">
                    <div className="text-sm font-bold text-slate-700 mb-4">Activity Levels Over Time</div>
                    <div className="h-36">
                      <svg viewBox="0 0 400 140" className="w-full h-full">
                        {/* Grid lines */}
                        <line x1="40" y1="20" x2="380" y2="20" stroke="#f1f5f9" strokeWidth="1" />
                        <line x1="40" y1="40" x2="380" y2="40" stroke="#f1f5f9" strokeWidth="1" />
                        <line x1="40" y1="60" x2="380" y2="60" stroke="#f1f5f9" strokeWidth="1" />
                        <line x1="40" y1="80" x2="380" y2="80" stroke="#f1f5f9" strokeWidth="1" />
                        <line x1="40" y1="100" x2="380" y2="100" stroke="#f1f5f9" strokeWidth="1" />
                        
                        {/* Axes */}
                        <line x1="40" y1="110" x2="380" y2="110" stroke="#cbd5e1" strokeWidth="2" />
                        <line x1="40" y1="20" x2="40" y2="110" stroke="#cbd5e1" strokeWidth="2" />
                        
                        {/* Y-axis labels */}
                        <text x="35" y="24" textAnchor="end" className="text-xs fill-slate-600 font-medium">100%</text>
                        <text x="35" y="44" textAnchor="end" className="text-xs fill-slate-600 font-medium">75%</text>
                        <text x="35" y="64" textAnchor="end" className="text-xs fill-slate-600 font-medium">50%</text>
                        <text x="35" y="84" textAnchor="end" className="text-xs fill-slate-600 font-medium">25%</text>
                        <text x="35" y="104" textAnchor="end" className="text-xs fill-slate-600 font-medium">0%</text>
                        
                        {/* Lines */}
                        <polyline points="60,88 120,70 180,52 240,38 300,28" fill="none" stroke="#059669" strokeWidth="3" strokeLinecap="round" />
                        <polyline points="60,92 120,78 180,64 240,50 300,40" fill="none" stroke="#78350f" strokeWidth="3" strokeLinecap="round" />
                        
                        {/* Data points */}
                        <circle cx="60" cy="88" r="6" fill="#059669" stroke="white" strokeWidth="2" />
                        <circle cx="120" cy="70" r="6" fill="#059669" stroke="white" strokeWidth="2" />
                        <circle cx="180" cy="52" r="6" fill="#059669" stroke="white" strokeWidth="2" />
                        <circle cx="240" cy="38" r="6" fill="#059669" stroke="white" strokeWidth="2" />
                        <circle cx="300" cy="28" r="6" fill="#059669" stroke="white" strokeWidth="2" />
                        
                        <circle cx="60" cy="92" r="6" fill="#78350f" stroke="white" strokeWidth="2" />
                        <circle cx="120" cy="78" r="6" fill="#78350f" stroke="white" strokeWidth="2" />
                        <circle cx="180" cy="64" r="6" fill="#78350f" stroke="white" strokeWidth="2" />
                        <circle cx="240" cy="50" r="6" fill="#78350f" stroke="white" strokeWidth="2" />
                        <circle cx="300" cy="40" r="6" fill="#78350f" stroke="white" strokeWidth="2" />
                        
                        {/* X-axis labels */}
                        <text x="60" y="135" textAnchor="middle" className="text-xs fill-slate-600 font-medium">Baseline</text>
                        <text x="120" y="135" textAnchor="middle" className="text-xs fill-slate-600 font-medium">6 Weeks</text>
                        <text x="180" y="135" textAnchor="middle" className="text-xs fill-slate-600 font-medium">3 Months</text>
                        <text x="240" y="135" textAnchor="middle" className="text-xs fill-slate-600 font-medium">6 Months</text>
                        <text x="300" y="135" textAnchor="middle" className="text-xs fill-slate-600 font-medium">12 Months</text>
                        
                        {/* Legend */}
                        <circle cx="60" cy="15" r="4" fill="#059669" />
                        <text x="72" y="19" className="text-xs fill-slate-600">Daily Activities</text>
                        <circle cx="200" cy="15" r="4" fill="#78350f" />
                        <text x="212" y="19" className="text-xs fill-slate-600">Sports/Recreation</text>
                      </svg>
                    </div>
                    <div className="text-center text-base font-bold text-emerald-700 mt-2">
                      85% Return to Full Activities at 12 Months
                    </div>
                  </div>
                  <div className="grid gap-4">
                    <div className="bg-white rounded-2xl p-5 border border-emerald-100">
                      <div className="flex items-start gap-3">
                        <div className="mt-1 h-6 w-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 text-xs">✓</div>
                        <div className="text-sm text-slate-700">
                          Average time to return to work: 3.2 weeks
                        </div>
                      </div>
                    </div>
                    <div className="bg-white rounded-2xl p-5 border border-emerald-100">
                      <div className="flex items-start gap-3">
                        <div className="mt-1 h-6 w-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 text-xs">✓</div>
                        <div className="text-sm text-slate-700">
                          78% able to resume sports activities they previously enjoyed
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Summary */}
              <div className="mt-8 bg-gradient-to-br from-slate-50 to-slate-100 rounded-[32px] p-8 border-2 border-slate-200">
                <div className="font-display text-2xl font-bold text-slate-900 mb-6 text-center">
                  Key Findings Summary
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                  {[
                    { stat: "92%", label: "Patient Satisfaction" },
                    { stat: "68%", label: "WOMAC Improvement" },
                    { stat: "71%", label: "Pain Reduction" },
                    { stat: "85%", label: "Return to Activities" }
                  ].map((item, i) => (
                    <div key={i} className="flex flex-col items-center gap-2 p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                      <div className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                        {item.stat}
                      </div>
                      <div className="text-sm font-semibold text-slate-700 text-center">
                        {item.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
