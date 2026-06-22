import Container from "@/components/ui/Container";
import MarketingNavbar from "@/components/layout/MarketingNavbar";
import Footer from "@/components/layout/Footer";
import ReferencesSection from "@/components/ReferencesSection";
import Button from "@/components/ui/Button";
import patientLandingBg from "@/assets/patient landing.png";
import patientLandingMobileBg from "@/assets/patient 2.png";
import oaComparisonImage from "@/assets/OA.png";
import symptomsImage from "@/assets/symptoms.png";
import gradeStage1Image from "@/assets/stage 1.png";
import gradeStage2Image from "@/assets/stage 2.png";
import gradeStage3Image from "@/assets/stage 3.png";
import gradeStage4Image from "@/assets/stage 4.png";
import selfHelpImage from "@/assets/self help.png";
import informationImage from "@/assets/information.jpeg";
import nonSurgicalImage from "@/assets/non surgical (2).png";
import surgicalImage from "@/assets/surgical.jpeg";
import stemcellImage from "@/assets/stemcell.png";
import newStemCellImage from "@/assets/newstemcell.png";
import mscImage from "@/assets/MSC.png";
import mscPreparationImage from "@/assets/MSC preparation.png";
import { Activity, Armchair, ArrowRight, BadgeCheck, ClipboardList, Droplets, Footprints, TrendingUp, Stethoscope, Pill, Mail, Phone, MapPin, Send } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
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

const oaSymptomHighlights = [
  {
    title: "Pain While Walking",
    text: "Discomfort or pain in the knee while walking, especially on longer distances.",
    icon: <Footprints className="h-6 w-6" />,
  },
  {
    title: "Difficulty Climbing Stairs",
    text: "Pain or difficulty while climbing up or down stairs.",
    icon: <TrendingUp className="h-6 w-6" />,
  },
  {
    title: "Getting Up from a Chair",
    text: "Pain or stiffness when standing up after sitting for a while.",
    icon: <Armchair className="h-6 w-6" />,
  },
  {
    title: "Stiffness & Swelling",
    text: "Morning stiffness, knee swelling, or a feeling of buckling.",
    icon: <Droplets className="h-6 w-6" />,
  },
];

const grades = [
  {
    k: "Grade I",
    title: "Mild changes",
    text: "Early cartilage irritation with minimal pain.",
    image: gradeStage1Image,
    treatment: "Self-help\nSimple painkillers, external applications, supplements",
    treatmentImage: selfHelpImage
  },
  {
    k: "Grade II",
    title: "Moderate changes",
    text: "Cartilage damage begins; pain may increase with activity.",
    image: gradeStage2Image,
    treatment: "Information and advice\nEducation, weight loss, exercise, lifestyle changes",
    treatmentImage: informationImage
  },
  {
    k: "Grade III",
    title: "Advanced changes",
    text: "Noticeable cartilage loss and inflammation; mobility reduces.",
    image: gradeStage3Image,
    treatment: "Simple and advanced non-surgical options\nPrescribed oral painkillers, physiotherapy, supporting devices, Intra articular injections",
    treatmentImage: nonSurgicalImage
  },
  {
    k: "Grade IV",
    title: "Severe changes",
    text: "Joint-space narrowing; significant pain and stiffness.",
    image: gradeStage4Image,
    treatment: "Surgical options\nRepair/partial or total joint replacement",
    treatmentImage: surgicalImage
  },
];

export default function Patient() {
  const { ref: oaRef, inView: oaInView } = useInView({ threshold: 0.18, rootMargin: "0px 0px -10% 0px" });
  const { ref: symptomsRef, inView: symptomsInView } = useInView({ threshold: 0.18, rootMargin: "0px 0px -10% 0px" });
  const { ref: gradeRef, inView: gradeInView } = useInView({ threshold: 0.18, rootMargin: "0px 0px -10% 0px" });
  const stemSectionRef = useRef<HTMLElement | null>(null);
  const stemVisualRef = useRef<HTMLDivElement | null>(null);
  const [step, setStep] = useState(1);
  const totalSteps = 4;
  const [frequency, setFrequency] = useState<string | null>(null);
  const [pain, setPain] = useState(5);
  const [stiffness, setStiffness] = useState<string | null>(null);
  const [swelling, setSwelling] = useState<string | null>(null);
  const [cracking, setCracking] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [previousTreatments, setPreviousTreatments] = useState("");
  const [otherSymptoms, setOtherSymptoms] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [result, setResult] = useState<{ score: number; max: number; label: string } | null>(null);
  const [postPreviewOpen, setPostPreviewOpen] = useState(false);

  useEffect(() => {
    if (!postPreviewOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPostPreviewOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [postPreviewOpen]);

  useEffect(() => {
    const section = stemSectionRef.current;
    const visual = stemVisualRef.current;
    if (!section || !visual) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.set(visual, { x: -140, opacity: 0 });

      const enter = () => {
        gsap.to(visual, {
          x: 0,
          opacity: 1,
          duration: 0.85,
          ease: "power3.out",
          overwrite: true,
        });
      };

      const leave = () => {
        gsap.to(visual, {
          x: -140,
          opacity: 0,
          duration: 0.6,
          ease: "power3.in",
          overwrite: true,
        });
      };

      ScrollTrigger.create({
        trigger: section,
        start: "top 75%",
        end: "bottom 25%",
        onEnter: enter,
        onEnterBack: enter,
        onLeave: leave,
        onLeaveBack: leave,
        onRefresh: (self) => {
          if (self.isActive) enter();
          else leave();
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const percent = useMemo(() => Math.round((step / totalSteps) * 100), [step]);

  const scoreMax = 22;

  const calcScore = () => {
    const freqScore =
      frequency === "Daily"
        ? 3
        : frequency === "Several times a week"
          ? 2
          : frequency === "Occasionally"
            ? 1
            : 0;
    const stiffScore =
      stiffness === "Severe" ? 3 : stiffness === "Moderate" ? 2 : stiffness === "Mild" ? 1 : 0;
    const swellScore =
      swelling === "Constant" ? 3 : swelling === "Frequent" ? 2 : swelling === "Occasional" ? 1 : 0;
    const crackScore =
      cracking === "Always" ? 3 : cracking === "Often" ? 2 : cracking === "Sometimes" ? 1 : 0;
    const total = freqScore + pain + stiffScore + swellScore + crackScore;
    const label = total <= 7 ? "Low" : total <= 14 ? "Moderate" : "High";
    return { total, label };
  };

  const validate = (targetStep: number) => {
    const nextErrors: Record<string, string> = {};
    if (targetStep >= 1) {
      if (!frequency) nextErrors.frequency = "Select one option to continue.";
    }
    if (targetStep >= 3) {
      if (!stiffness) nextErrors.stiffness = "Select stiffness to continue.";
      if (!swelling) nextErrors.swelling = "Select swelling to continue.";
    }
    if (targetStep >= 4) {
      if (!cracking) nextErrors.cracking = "Select one option to continue.";
      if (!name.trim()) nextErrors.name = "Name is required.";
      const ageNum = Number(age);
      if (!age.trim() || !Number.isFinite(ageNum) || ageNum < 1 || ageNum > 120) nextErrors.age = "Enter a valid age.";
      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
      if (!emailOk) nextErrors.email = "Enter a valid email.";
    }
    return nextErrors;
  };

  const goNext = () => {
    const nextErrors = validate(step);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }
    setErrors({});
    setStep((s) => Math.min(totalSteps, s + 1));
  };

  const goBack = () => {
    setErrors({});
    setStep((s) => Math.max(1, s - 1));
  };

  const submit = async () => {
    const nextErrors = validate(4);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:3001/api/assessment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          full_name: name,
          email,
          phone,
          age,
          pain_frequency: frequency,
          pain_severity: pain.toString(),
          stiffness,
          swelling,
          cracking,
          previous_treatments: previousTreatments,
          other_symptoms: otherSymptoms
        })
      });

      if (response.ok) {
        const { total, label } = calcScore();
        setResult({ score: total, max: scoreMax, label });
      } else {
        alert("Failed to submit assessment. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting assessment:", error);
      alert("Failed to submit assessment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setResult(null);
    setStep(1);
    setFrequency(null);
    setPain(5);
    setStiffness(null);
    setSwelling(null);
    setCracking(null);
    setName("");
    setAge("");
    setEmail("");
    setPhone("");
    setPreviousTreatments("");
    setOtherSymptoms("");
    setLoading(false);
    setErrors({});
  };

  return (
    <div className="min-h-dvh bg-sky-50">
      <MarketingNavbar />
      <main className="pt-20">
        <section className="relative h-[calc(100dvh-5rem)] w-full overflow-hidden">
          {/* Mobile Image */}
          <img
            src={patientLandingMobileBg}
            alt=""
            className="block md:hidden h-full w-full object-cover object-center"
            decoding="async"
            loading="eager"
            aria-hidden="true"
          />
          {/* Desktop Image */}
          <img
            src={patientLandingBg}
            alt=""
            className="hidden md:block h-full w-full object-cover object-center"
            decoding="async"
            loading="eager"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/85 via-white/45 to-transparent md:from-white/85 md:via-white/45" />
          <Container>
            <div className="absolute inset-0">
              <div className="h-full flex items-center">
                <div className="max-w-3xl pl-6 sm:pl-10 md:pl-14 -translate-y-4 sm:translate-y-0">
                  {/* Mobile Text */}
                  <div className="md:hidden">
                    <div className="font-display text-4xl sm:text-5xl font-semibold tracking-[-0.04em] text-[#0b3a66]">
                      Your Knee Health Journey
                    </div>
                    <p className="mt-4 max-w-2xl text-sm sm:text-base leading-relaxed text-slate-700">
                      Understand your knee condition better with our personalized assessment. Get insights into your knee health and discover solutions tailored for you.
                    </p>
                  </div>

                  {/* Desktop Text */}
                  <div className="hidden md:block">
                    <div className="font-display text-5xl sm:text-6xl font-semibold tracking-[-0.04em] text-[#0b3a66]">
                      Knee Osteoarthritis (OA)
                    </div>
                    <p className="mt-4 max-w-2xl text-sm sm:text-base leading-relaxed text-slate-700">
                      Osteoarthritis is a common joint condition where knee cartilage gradually wears down, causing pain, stiffness, and reduced
                      mobility. Early awareness and assessment can help you understand your knee health better.
                    </p>
                  </div>

                  <div className="mt-6">
                    <button
                      type="button"
                      className="inline-flex items-center justify-center rounded-full bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white shadow-button transition hover:brightness-110"
                      onClick={() => {
                        const el = document.getElementById("assessment");
                        el?.scrollIntoView({ behavior: "smooth", block: "start" });
                      }}
                    >
                      Take an Assessment
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        <section ref={(node) => { oaRef.current = node; }} className="relative py-14 sm:py-20">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_circle_at_22%_0%,rgba(56,189,248,0.16),transparent_60%)]" />
          <Container>
            <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] md:items-center">
              <div
                className={cn(
                  "transition-all duration-700 ease-out",
                  oaInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
                )}
              >
                <div className="font-display text-4xl sm:text-5xl font-semibold tracking-[-0.03em] text-slate-900">
                  Understanding Knee Osteoarthritis
                </div>
                <div className="mt-4 text-sm sm:text-base font-medium text-slate-600">
                  Know the difference between a healthy knee and an osteoarthritic knee
                </div>
                <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-600">
                  Knee Osteoarthritis is a chronic joint condition where the protective cartilage between bones gradually wears down. This can
                  lead to pain, stiffness, swelling, and reduced movement.
                </p>

                <div className="mt-8 grid gap-4">
                  <div className="rounded-[24px] bg-white/85 p-6 ring-1 ring-sky-200/60 shadow-soft-xl">
                    <div className="text-sm font-semibold text-slate-900">Healthy Knee</div>
                    <div className="mt-2 text-sm leading-relaxed text-slate-600">
                      Smooth cartilage, healthy joint space, and flexible movement support normal knee function.
                    </div>
                  </div>

                  <div className="rounded-[24px] bg-white/85 p-6 ring-1 ring-sky-200/60 shadow-soft-xl">
                    <div className="text-sm font-semibold text-slate-900">Osteoarthritis Knee</div>
                    <div className="mt-2 text-sm leading-relaxed text-slate-600">
                      Cartilage breakdown, bone changes, and inflammation may cause pain and reduced mobility.
                    </div>
                  </div>
                </div>

              </div>

              <div
                className={cn(
                  "transition-all duration-700 ease-out delay-100",
                  oaInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
                )}
              >
                <div className="relative h-[360px] sm:h-[440px] lg:h-[520px]">
                  <img
                    src={oaComparisonImage}
                    alt="Healthy knee vs osteoarthritis comparison"
                    className="h-full w-full object-contain"
                    decoding="async"
                    loading="eager"
                  />
                </div>
              </div>
            </div>
          </Container>
        </section>

        <section ref={(node) => { symptomsRef.current = node; }} className="relative py-14 sm:py-20">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_circle_at_15%_20%,rgba(11,58,102,0.06),transparent_55%)]" />
          <Container>
            <div className="mx-auto max-w-6xl">
              <div className="max-w-xl">
                <div className={cn("text-sm font-semibold text-[#0b3a66] reveal-fade", symptomsInView && "reveal-fade-visible")}>
                  Knee OA: Symptoms
                </div>
                <div className="mt-3 font-display text-3xl font-semibold tracking-[-0.03em] text-[#0b3a66] sm:text-4xl">
                  <RevealWords text="Signs Your Knee May Be Telling You" active={symptomsInView} />
                </div>
                <p className={cn("mt-4 text-sm leading-relaxed text-slate-600 reveal-fade", symptomsInView && "reveal-fade-visible")}>
                  Knee osteoarthritis symptoms often develop gradually and can impact your daily activities. Recognizing them early can help
                  you take the right steps towards better joint health.
                </p>
              </div>

              <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-stretch">
                {/* Left Side: Symptom Cards */}
                <div className="flex flex-col gap-4">
                  {oaSymptomHighlights.map((item, idx) => (
                    <div
                      key={item.title}
                      className={cn(
                        "flex items-center gap-4 rounded-[22px] bg-white p-4 shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-slate-100/80 transition-all duration-300 ease-out hover:shadow-[0_20px_50px_rgba(11,58,102,0.08)] hover:border-[#0b3a66]/60 hover:-translate-y-1 cursor-pointer",
                        symptomsInView
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-4"
                      )}
                      style={{ transitionDelay: `${idx * 90}ms` }}
                    >

                      {/* Icon */}
                      <div className="flex h-12 w-12 flex-none items-center justify-center rounded-xl bg-[#0b3a66]/5 text-[#0b3a66] ring-1 ring-[#0b3a66]/10">
                        {item.icon}
                      </div>

                      {/* Text */}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-[#0b3a66]">
                            {String(idx + 1).padStart(2, "0")}
                          </span>

                          <h3 className="text-sm font-semibold text-slate-900">
                            {item.title}
                          </h3>
                        </div>

                        <p className="mt-1 text-xs leading-relaxed text-slate-500">
                          {item.text}
                        </p>
                      </div>

                    </div>
                  ))}
                </div>

                {/* Right Side: Circular Infographic Image */}
                <div
                  className={cn(
                    "flex items-center justify-center transition-all duration-700 ease-out lg:self-center",
                    symptomsInView
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  )}
                >
                  <img
                    src={symptomsImage}
                    alt="Knee OA symptoms wheel"
                    className="h-full w-full max-w-[430px] object-contain"
                    decoding="async"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </Container>
        </section>

        <section ref={(node) => { gradeRef.current = node; }} className="py-14 sm:py-20">
          <Container>
            <div className="text-center">
              <div className="font-display text-4xl font-semibold tracking-[-0.03em] text-[#0b3a66] sm:text-5xl">
                <RevealWords text="Stages of Knee OA - Severity" active={gradeInView} />
              </div>
              <div className="mt-3 font-display text-3xl font-semibold tracking-[-0.03em] text-slate-900 sm:text-4xl">
                <RevealWords text="Kellgren-Lawrence Classification" active={gradeInView} delay={0.15} />
              </div>
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {grades.map((g, idx) => (
                <div
                  key={g.k}
                  className={cn(
                    "flex flex-col h-full overflow-hidden rounded-[26px] bg-white/90 ring-1 ring-sky-200/70 shadow-soft-xl transition-all duration-300 ease-out hover:shadow-xl hover:ring-sky-400 hover:-translate-y-2 cursor-pointer",
                  )}
                  style={{ transitionDelay: `${idx * 90}ms` }}
                >
                  <div
                    className={cn(
                      "h-56 w-full bg-white sm:h-64 flex-shrink-0",
                    )}
                  >
                    <img
                      src={g.image}
                      alt={`${g.k} illustration`}
                      className="h-full w-full object-cover"
                      decoding="async"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-7 flex flex-col flex-1">
                    <div className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-700">{g.k}</div>
                    <div className="mt-2 text-lg font-semibold text-slate-900">{g.title}</div>
                    <div className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">{g.text}</div>

                    {/* Treatment section */}
                    {"treatment" in g && g.treatment && (
                      <div className="mt-6 pt-6 border-t border-slate-200">
                        {g.treatmentImage && (
                          <div className="h-40 w-full overflow-hidden rounded-xl mb-4">
                            <img
                              src={g.treatmentImage}
                              alt={`${g.k} treatment`}
                              className="h-full w-full object-cover"
                              decoding="async"
                              loading="lazy"
                            />
                          </div>
                        )}
                        <div className="space-y-1">
                          {g.treatment.split('\n').map((line, i) => (
                            <div
                              key={i}
                              className={
                                i === 0
                                  ? "min-h-[56px] text-sm font-semibold text-sky-700"
                                  : "text-xs text-slate-600"
                              }
                            >
                              {line}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 text-center text-sm text-slate-600">Progression of Knee OA from Grade I to Grade IV</div>
          </Container>
        </section>

        <section ref={(node) => { stemSectionRef.current = node; }} className="relative overflow-hidden py-14 sm:py-20">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_circle_at_20%_20%,rgba(56,189,248,0.18),transparent_55%)]" />
          <div className="pointer-events-none absolute inset-0 opacity-70 hero-dots" />
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-[12%] top-[24%] h-2 w-2 rounded-full bg-sky-400/40 blur-[1px] node-pulse" />
            <div className="absolute left-[18%] top-[62%] h-1.5 w-1.5 rounded-full bg-sky-300/35 blur-[1px] node-pulse" />
            <div className="absolute right-[18%] top-[22%] h-2.5 w-2.5 rounded-full bg-sky-300/35 blur-[1px] node-pulse" />
            <div className="absolute right-[12%] top-[58%] h-2 w-2 rounded-full bg-sky-400/35 blur-[1px] node-pulse" />
          </div>

          <Container>
            <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2 md:items-center">
              <div className="order-2 md:order-1">
                <div
                  ref={stemVisualRef}
                  className="relative mx-auto max-w-[520px] opacity-0 md:mx-0"
                >
                  <div className="absolute -inset-10 rounded-full bg-sky-400/15 blur-3xl glow-pulse" />
                  <div className="relative">
                    <img
                      src={stemcellImage}
                      alt="3D stem cell visual"
                      className="mx-auto w-full max-w-[420px] select-none animate-floaty animate-rotate-slow object-contain"
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

              <div className="order-1 md:order-2">
                <div className="font-display text-4xl font-semibold tracking-[-0.03em] text-slate-900 sm:text-5xl">
                  Advanced Stem Cell Therapy for Knee Regeneration
                </div>
                <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base">
                  Stem cell technology supports the body's natural healing process by helping regenerate damaged tissues, improve joint
                  function, and promote better mobility.
                </p>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {[
                    {
                      title: "Cartilage Preservation",
                      text: "Supports natural tissue repair and recovery.",
                    },
                    {
                      title: "Knee Cartilage Support",
                      text: "Helps maintain healthy joint structure and movement.",
                    },
                    {
                      title: "Mobility Enhancement",
                      text: "Designed to support flexibility and comfortable movement.",
                    },
                  ].map((card) => (
                    <div
                      key={card.title}
                      className="rounded-[24px] bg-white/60 p-6 ring-1 ring-sky-200/60 shadow-soft-xl backdrop-blur-xl"
                    >
                      <div className="text-sm font-semibold text-slate-900">{card.title}</div>
                      <div className="mt-2 text-sm leading-relaxed text-slate-600">{card.text}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Premium Medical Infographic Section */}
        <section className="relative overflow-hidden py-16 sm:py-24">
          {/* Background decorative elements */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-32 top-20 h-96 w-96 rounded-full bg-sky-200/30 blur-3xl" />
            <div className="absolute right-0 top-1/3 h-80 w-80 rounded-full bg-sky-300/20 blur-3xl" />
            <div className="absolute bottom-10 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-sky-100/40 blur-3xl" />
          </div>

          <Container>
            {/* Section Header */}
            <div className="mx-auto max-w-4xl text-center">
              <div className="text-[11px] font-semibold tracking-[0.32em] text-sky-700/80">STEM CELL THERAPY</div>
              <div className="mt-4 font-display text-4xl font-semibold tracking-[-0.03em] text-slate-900 sm:text-5xl">
                How Stem Cells Work
              </div>
            </div>

            {/* --- Part 1: What are Stem Cells? --- */}
            <div className="mt-16">
              <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
                <div className="order-2 lg:order-1">
                  <div className="inline-flex items-center gap-2 rounded-full bg-sky-50 px-4 py-2 text-xs font-semibold text-sky-700 ring-1 ring-sky-200">
                    <div className="h-2 w-2 rounded-full bg-sky-500" />
                    Part 01
                  </div>
                  <h2 className="mt-4 font-display text-3xl font-semibold tracking-[-0.03em] text-slate-900 sm:text-4xl">
                    What Are Stem Cells?
                  </h2>
                  <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
                    Stem cells are the body's raw materials — cells from which all other specialized cells are generated. They have two unique properties: the ability to self-renew through cell division, and the potential to develop into many different cell types.
                  </p>
                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { title: "Self‑Renewal", desc: "Can divide and replicate indefinitely", color: "sky" },
                      { title: "Differentiation", desc: "Transform into specialized cell types", color: "teal" },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="group cursor-pointer rounded-2xl bg-gradient-to-br from-white to-sky-50/30 p-6 ring-1 ring-slate-100 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:ring-sky-300"
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <div className={`h-2 w-2 rounded-full bg-${item.color}-500`} />
                          <div className="text-base font-bold text-slate-900 transition-colors duration-300 group-hover:text-sky-700">
                            {item.title}
                          </div>
                        </div>
                        <div className="text-sm text-slate-600">{item.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="order-1 lg:order-2">
                  <div className="relative mx-auto max-w-md">
                    <div className="relative h-80 w-full">
                      <img
                        src={newStemCellImage}
                        alt="Stem cells"
                        className="h-full w-full object-contain"
                        decoding="async"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* --- Part 2: What are Mesenchymal Stem Cells (MSCs)? --- */}
            <div className="mt-20 relative">
              <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
                <div>
                  <div className="relative mx-auto max-w-2xl">
                    {/* Glowing effects */}
                    <div className="absolute -inset-16 rounded-full bg-gradient-to-tr from-teal-300/20 to-sky-300/20 blur-3xl" />
                    <img
                      src={mscImage}
                      alt="Mesenchymal Stem Cells"
                      className="relative w-full h-auto"
                      decoding="async"
                      loading="lazy"
                    />
                  </div>
                </div>
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-teal-50 px-4 py-2 text-xs font-semibold text-teal-700 ring-1 ring-teal-200">
                    <div className="h-2 w-2 rounded-full bg-teal-500" />
                    Part 02
                  </div>
                  <h2 className="mt-4 font-display text-3xl font-semibold tracking-[-0.03em] text-slate-900 sm:text-4xl">
                    Mesenchymal Stem Cells (MSCs)
                  </h2>
                  <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
                    Mesenchymal stem cells are multipotent stromal cells that can differentiate into a variety of cell types. They are found in bone marrow, adipose tissue, and other tissues, and play a crucial role in tissue repair and regeneration.
                  </p>
                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { title: "Cartilage Cells", desc: "Form flexible connective tissue" },
                      { title: "Bone Cells", desc: "Provide structural support and strength" },
                      { title: "Muscle Cells", desc: "Enable movement and flexibility" },
                      { title: "Connective Tissue", desc: "Support and connect body structures" },
                    ].map((cell, i) => (
                      <div
                        key={i}
                        className="group cursor-pointer rounded-2xl bg-gradient-to-br from-white to-sky-50/30 p-6 ring-1 ring-slate-100 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:ring-sky-300"
                      >
                        <div className="text-base font-bold text-slate-900 transition-colors duration-300 group-hover:text-sky-700 mb-3">
                          {cell.title}
                        </div>
                        <div className="text-sm text-slate-600">{cell.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* --- Part 3: Preparation of Stem Cells --- */}
            <div className="mt-20 relative">
              {/* Full-width header */}
              <div className="inline-flex items-center gap-2 rounded-full bg-sky-50 px-4 py-2 text-xs font-semibold text-sky-700 ring-1 ring-sky-200">
                <div className="h-2 w-2 rounded-full bg-sky-500" />
                Part 03
              </div>
              <h2 className="mt-4 font-display text-3xl font-semibold tracking-[-0.03em] text-slate-900 sm:text-4xl">
                Stem Cell Preparation
              </h2>
              <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base">
                Bone marrow-derived mesenchymal stem cells (BMMSCs) undergo a carefully controlled
                multi-stage manufacturing process including isolation, expansion, cell banking,
                and cryopreservation to ensure quality, safety, and therapeutic effectiveness.
              </p>

              {/* Step cards (left) + Image (right) side by side */}
              <div className="mt-8 grid gap-8 lg:grid-cols-2 lg:items-center">
                {/* Left: 9 Step Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    {
                      step: "01",
                      title: "Bone Marrow Aspiration",
                      desc: "Collection of bone marrow samples for stem cell extraction.",
                    },
                    {
                      step: "02",
                      title: "Isolation & Culture of BMMSCs",
                      desc: "Isolation and culture of Bone Marrow Mesenchymal Stem Cells.",
                    },
                    {
                      step: "03",
                      title: "Expansion of BMMSCs",
                      desc: "Controlled expansion to increase stem cell quantity.",
                    },
                    {
                      step: "04",
                      title: "Master Cell Bank (MCB)",
                      desc: "Expanded cells are stored and preserved in the Master Cell Bank.",
                    },
                    {
                      step: "05",
                      title: "Pooled & Expanded",
                      desc: "Selected cell batches are pooled and further expanded.",
                    },
                    {
                      step: "06",
                      title: "Working Cell Bank (WCB)",
                      desc: "Final stem cell batches are stored in the Working Cell Bank.",
                    },
                    {
                      step: "07",
                      title: "Large Scale Expansion",
                      desc: "Advanced expansion process for large-scale cell production.",
                    },
                    {
                      step: "08",
                      title: "Quantified into 25M Cells in Vials",
                      desc: "Cells are quantified and filled into therapeutic-dose vials.",
                    },
                    {
                      step: "09",
                      title: "Cryopreserved (-185°C to -195°C)",
                      desc: "Stored under ultra-low temperatures to maintain viability.",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="group flex items-start gap-3 cursor-pointer rounded-xl bg-gradient-to-br from-white to-sky-50/30 p-3 ring-1 ring-sky-100 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:ring-sky-300"
                    >
                      <div className="flex h-9 w-9 flex-none items-center justify-center rounded-xl bg-sky-600 text-xs font-bold text-white transition-all duration-300 group-hover:bg-sky-700 group-hover:scale-110">
                        {item.step}
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm font-semibold text-slate-900 transition-colors duration-300 group-hover:text-sky-700">
                          {item.title}
                        </div>
                        <div className="mt-0.5 text-xs text-slate-500 leading-relaxed">{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Right: MSC Preparation Image — beside the 9 cards */}
                <div className="flex items-center justify-center">
                  <img
                    src={mscPreparationImage}
                    alt="MSC Preparation"
                    className="w-full h-auto object-contain"
                    decoding="async"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Post-injection Care Section */}
        <section className="relative overflow-hidden py-16 sm:py-24">
          {/* Background decorative elements */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-32 top-20 h-96 w-96 rounded-full bg-sky-200/30 blur-3xl" />
            <div className="absolute right-0 top-1/3 h-80 w-80 rounded-full bg-sky-300/20 blur-3xl" />
            <div className="absolute bottom-10 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-sky-100/40 blur-3xl" />
          </div>

          <Container>
            <div className="mx-auto max-w-4xl text-center mb-12">
              <div className="text-[11px] font-semibold tracking-[0.32em] text-sky-700/80">POST-INJECTION CARE</div>
              <div className="mt-4 font-display text-4xl font-semibold tracking-[-0.03em] text-slate-900 sm:text-5xl">
                Post-injection Care Precautions
              </div>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
                Follow your doctor’s instructions. These are general do’s and don’ts to help protect the treated area and support recovery.
              </p>
            </div>

            {/* Side-by-Side Timeline Comparison */}
            <div className="relative">
              <div className="grid gap-8 lg:grid-cols-2 lg:items-stretch">
                {/* 0-3 Days */}
                <div className="flex flex-col rounded-[32px] bg-gradient-to-br from-white to-sky-50/40 p-8 ring-1 ring-sky-200 shadow-[0_10px_40px_rgba(2,132,199,0.08)]">
                  <div className="inline-flex items-center gap-3 rounded-full bg-sky-600 text-white px-6 py-3 text-sm font-semibold mb-6 shadow-button w-fit">
                    <div className="h-3 w-3 rounded-full bg-white" />
                    0–3 Days
                  </div>
                  <h3 className="font-display text-2xl font-semibold tracking-[-0.03em] text-slate-900 sm:text-3xl mb-6">
                    First Phase
                  </h3>

                  <div className="grid gap-4 flex-1">
                    <div className="rounded-2xl bg-white/70 p-6 ring-1 ring-sky-100 shadow-sm">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="h-3 w-3 rounded-full bg-emerald-500" />
                        <span className="text-sm font-bold text-slate-900">Do’s</span>
                      </div>
                      <div className="space-y-2">
                        {[
                          "Rest for 24 hours (except washroom breaks)",
                          "Use only a cold pack if needed",
                          "Take a lukewarm bath after 24 hours",
                          "Stay hydrated and eat healthy",
                        ].map((x, i) => (
                          <div key={i} className="flex items-start gap-3 text-sm text-slate-700">
                            <div className="mt-1.5 h-2 w-2 flex-none rounded-full bg-emerald-600" />
                            <span>{x}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-2xl bg-white/70 p-6 ring-1 ring-sky-100 shadow-sm">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="h-3 w-3 rounded-full bg-rose-500" />
                        <span className="text-sm font-bold text-slate-900">Don’ts</span>
                      </div>
                      <div className="space-y-2">
                        {[
                          "Avoid overstraining/weight-bearing early",
                          "Do not take medicines unless prescribed",
                          "Avoid massage or hot pack on the area",
                          "Avoid very hot baths",
                        ].map((x, i) => (
                          <div key={i} className="flex items-start gap-3 text-sm text-slate-700">
                            <div className="mt-1.5 h-2 w-2 flex-none rounded-full bg-rose-600" />
                            <span>{x}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3-14 Days */}
                <div className="flex flex-col rounded-[32px] bg-gradient-to-br from-white to-sky-50/40 p-8 ring-1 ring-sky-200 shadow-[0_10px_40px_rgba(2,132,199,0.08)]">
                  <div className="inline-flex items-center gap-3 rounded-full bg-sky-600 text-white px-6 py-3 text-sm font-semibold mb-6 shadow-button w-fit">
                    <div className="h-3 w-3 rounded-full bg-white" />
                    3–14 Days
                  </div>
                  <h3 className="font-display text-2xl font-semibold tracking-[-0.03em] text-slate-900 sm:text-3xl mb-6">
                    Continuing Recovery
                  </h3>

                  <div className="grid gap-4 flex-1">
                    <div className="rounded-2xl bg-white/70 p-6 ring-1 ring-sky-100 shadow-sm">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="h-3 w-3 rounded-full bg-emerald-500" />
                        <span className="text-sm font-bold text-slate-900">Do’s</span>
                      </div>
                      <div className="space-y-2">
                        {["Gradually return to normal activities", "Follow rehab plan recommended by your doctor"].map((x, i) => (
                          <div key={i} className="flex items-start gap-3 text-sm text-slate-700">
                            <div className="mt-1.5 h-2 w-2 flex-none rounded-full bg-emerald-600" />
                            <span>{x}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-2xl bg-white/70 p-6 ring-1 ring-sky-100 shadow-sm">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="h-3 w-3 rounded-full bg-rose-500" />
                        <span className="text-sm font-bold text-slate-900">Don’ts</span>
                      </div>
                      <div className="space-y-2">
                        {["Avoid smoking and alcohol (first 7 days)", "Avoid aggressive exercise unless advised"].map((x, i) => (
                          <div key={i} className="flex items-start gap-3 text-sm text-slate-700">
                            <div className="mt-1.5 h-2 w-2 flex-none rounded-full bg-rose-600" />
                            <span>{x}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Important Note */}
              <div className="mt-10">
                <div className="relative mx-auto max-w-4xl">
                  <div className="absolute -inset-8 rounded-full bg-gradient-to-tr from-sky-300/20 to-sky-400/20 blur-3xl" />
                  <div className="relative rounded-[32px] bg-gradient-to-br from-sky-50 to-sky-100/50 p-8 ring-1 ring-sky-100 shadow-[0_30px_80px_rgba(2,132,199,0.15)]">
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                      <div className="h-14 w-14 rounded-full bg-sky-600 flex items-center justify-center text-white text-3xl flex-none">
                        ⚠️
                      </div>
                      <div className="flex-1 text-center sm:text-left">
                        <div className="text-base font-bold text-sky-800 mb-1">Important Note</div>
                        <div className="text-sm text-slate-600">
                          If you have severe swelling, fever, or worsening pain, contact your doctor immediately.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        <section id="assessment" className="py-14 sm:py-20">
          <Container>
            <div className="text-center">
              <div className="text-[11px] font-semibold tracking-[0.32em] text-sky-700/80">SELF-ASSESSMENT</div>
              <div className="mt-5 font-display text-4xl font-semibold tracking-[-0.03em] text-slate-900 sm:text-6xl">
                Understand your <span className="text-sky-700">knee health</span>.
              </div>
              <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-600">A 4-step quiz. Private. Takes under 2 minutes.</p>
            </div>

            <div className="mx-auto mt-10 max-w-5xl border border-slate-200 bg-white px-6 py-8 sm:px-10 sm:py-10">
              {result ? (
                <div className="text-center">
                  <div className="text-[11px] font-semibold tracking-[0.32em] text-sky-700/80">RESULT</div>
                  <div className="mt-4 font-display text-4xl font-semibold tracking-[-0.03em] text-slate-900 sm:text-5xl">
                    Assessment complete
                  </div>
                  <div className="mt-6 text-sm text-slate-600">Your score</div>
                  <div className="mt-2 font-display text-6xl font-semibold tracking-[-0.04em] text-sky-700 sm:text-7xl">
                    {result.score}
                    <span className="text-2xl text-slate-400">/{result.max}</span>
                  </div>
                  <div className="mt-4 inline-flex items-center rounded-full bg-sky-50 px-5 py-2 text-sm font-semibold text-sky-800 ring-1 ring-sky-100">
                    Risk level: {result.label}
                  </div>
                  <div className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-slate-600">
                    This result is a quick screening indicator. For medical decisions, consult an orthopedic specialist.
                  </div>
                  <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                    <Button onClick={reset}>Start again</Button>
                    <Button variant="secondary" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                      Back to top
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
                    <div>STEP {step} / {totalSteps}</div>
                    <div>{percent}%</div>
                  </div>
                  <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-100">
                    <div className="h-full bg-gradient-to-r from-sky-700 to-sky-400" style={{ width: `${percent}%` }} />
                  </div>

                  {step === 1 ? (
                    <div className="mt-10">
                      <div className="text-h2 text-slate-900">
                        How often do you experience knee pain?
                      </div>
                      <div className="mt-6 grid gap-4">
                        {["Daily", "Several times a week", "Occasionally", "Rarely"].map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => {
                              setFrequency(opt);
                              setErrors((e) => ({ ...e, frequency: "" }));
                            }}
                            className={[
                              "w-full rounded-2xl border px-6 py-5 text-left text-base font-medium transition-colors",
                              frequency === opt
                                ? "border-sky-400 bg-sky-50 text-slate-900"
                                : "border-slate-200 bg-white text-slate-800 hover:border-sky-200",
                            ].join(" ")}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                      {errors.frequency ? <div className="mt-3 text-xs text-rose-600">{errors.frequency}</div> : null}
                    </div>
                  ) : null}

                  {step === 2 ? (
                    <div className="mt-10">
                      <div className="text-h2 text-slate-900">
                        Pain intensity
                      </div>
                      <div className="mt-1 text-sm text-slate-600">0 = none, 10 = severe</div>

                      <div className="mt-10 text-center font-display text-7xl font-semibold tracking-[-0.04em] text-sky-700">
                        {pain}
                      </div>

                      <div className="mt-8">
                        <input
                          type="range"
                          min={0}
                          max={10}
                          value={pain}
                          onChange={(e) => setPain(Number(e.target.value))}
                          className="w-full accent-sky-700"
                        />
                        <div className="mt-2 flex items-center justify-between text-sm text-slate-600">
                          <div>Mild</div>
                          <div>Severe</div>
                        </div>
                      </div>
                    </div>
                  ) : null}

                  {step === 3 ? (
                    <div className="mt-10">
                      <div className="text-h2 text-slate-900">
                        Joint stiffness?
                      </div>
                      <div className="mt-5 grid gap-4 sm:grid-cols-2">
                        {["None", "Mild", "Moderate", "Severe"].map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => {
                              setStiffness(opt);
                              setErrors((e) => ({ ...e, stiffness: "" }));
                            }}
                            className={[
                              "rounded-2xl border px-6 py-4 text-center text-sm font-semibold transition-colors",
                              stiffness === opt
                                ? "border-sky-400 bg-sky-50 text-slate-900"
                                : "border-slate-200 bg-white text-slate-800 hover:border-sky-200",
                            ].join(" ")}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                      {errors.stiffness ? <div className="mt-3 text-xs text-rose-600">{errors.stiffness}</div> : null}

                      <div className="mt-10 text-h2 text-slate-900">
                        Swelling around the joint?
                      </div>
                      <div className="mt-5 grid gap-4 sm:grid-cols-2">
                        {["None", "Occasional", "Frequent", "Constant"].map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => {
                              setSwelling(opt);
                              setErrors((e) => ({ ...e, swelling: "" }));
                            }}
                            className={[
                              "rounded-2xl border px-6 py-4 text-center text-sm font-semibold transition-colors",
                              swelling === opt
                                ? "border-sky-400 bg-sky-50 text-slate-900"
                                : "border-slate-200 bg-white text-slate-800 hover:border-sky-200",
                            ].join(" ")}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                      {errors.swelling ? <div className="mt-3 text-xs text-rose-600">{errors.swelling}</div> : null}
                    </div>
                  ) : null}

                  {step === 4 ? (
                    <div className="mt-10">
                      <div className="text-h2 text-slate-900">
                        Cracking sounds when moving?
                      </div>
                      <div className="mt-5 grid gap-4 sm:grid-cols-2">
                        {["No", "Sometimes", "Often", "Always"].map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => {
                              setCracking(opt);
                              setErrors((e) => ({ ...e, cracking: "" }));
                            }}
                            className={[
                              "rounded-2xl border px-6 py-4 text-center text-sm font-semibold transition-colors",
                              cracking === opt
                                ? "border-sky-400 bg-sky-50 text-slate-900"
                                : "border-slate-200 bg-white text-slate-800 hover:border-sky-200",
                            ].join(" ")}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                      {errors.cracking ? <div className="mt-3 text-xs text-rose-600">{errors.cracking}</div> : null}

                      <div className="mt-8 border-t border-slate-200 pt-6">
                        <div className="text-sm text-slate-600">Tell us a bit about you so we can share your score.</div>
                        <div className="mt-5 grid gap-4 sm:grid-cols-2">
                          <div>
                            <input
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              placeholder="Name"
                              className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm outline-none ring-sky-200 focus:ring-2"
                            />
                            {errors.name ? <div className="mt-2 text-xs text-rose-600">{errors.name}</div> : null}
                          </div>
                          <div>
                            <input
                              value={age}
                              onChange={(e) => setAge(e.target.value)}
                              placeholder="Age"
                              inputMode="numeric"
                              className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm outline-none ring-sky-200 focus:ring-2"
                            />
                            {errors.age ? <div className="mt-2 text-xs text-rose-600">{errors.age}</div> : null}
                          </div>
                        </div>
                        <div className="mt-4">
                          <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            inputMode="email"
                            className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm outline-none ring-sky-200 focus:ring-2"
                          />
                          {errors.email ? <div className="mt-2 text-xs text-rose-600">{errors.email}</div> : null}
                        </div>
                        <div className="mt-4">
                          <input
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="Phone (optional)"
                            inputMode="tel"
                            className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm outline-none ring-sky-200 focus:ring-2"
                          />
                        </div>
                        <div className="mt-4">
                          <textarea
                            value={previousTreatments}
                            onChange={(e) => setPreviousTreatments(e.target.value)}
                            placeholder="Previous treatments (optional)"
                            className="min-h-[80px] w-full resize-none rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm outline-none ring-sky-200 focus:ring-2"
                          />
                        </div>
                        <div className="mt-4">
                          <textarea
                            value={otherSymptoms}
                            onChange={(e) => setOtherSymptoms(e.target.value)}
                            placeholder="Other symptoms or notes (optional)"
                            className="min-h-[80px] w-full resize-none rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm outline-none ring-sky-200 focus:ring-2"
                          />
                        </div>
                      </div>
                    </div>
                  ) : null}

                  <div className="mt-10 flex items-center justify-between">
                    <Button variant="secondary" onClick={goBack} disabled={step === 1}>
                      Back
                    </Button>
                    {step === 4 ? (
                      <Button onClick={submit} disabled={loading}>
                        {loading ? "Submitting..." : "See my result"} <ArrowRight className="h-4 w-4" />
                      </Button>
                    ) : (
                      <Button onClick={goNext}>
                        Next <ArrowRight className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </>
              )}
            </div>
          </Container>
        </section>

        <section className="py-14 sm:py-20 bg-sky-50/50">
          <Container>
            <div className="text-center mb-10">
              <div className="text-[11px] font-semibold tracking-[0.32em] text-sky-700/80">CONTACT</div>
              <div className="mt-5 font-display text-4xl font-semibold tracking-[-0.03em] text-slate-900 sm:text-6xl">
                Need help? <span className="text-sky-700">We're here</span>.
              </div>
            </div>

            <div className="grid gap-8 lg:grid-cols-[380px_1fr] max-w-6xl mx-auto">
              <div className="space-y-5">
                <div className="rounded-[22px] bg-white/90 p-5 ring-1 ring-sky-200/60 shadow-soft-xl transition-all duration-300 hover:shadow-[0_10px_40px_rgba(2,132,199,0.15)] hover:ring-sky-300">
                  <div className="flex items-start gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-xl bg-sky-50 ring-1 ring-sky-100 text-sky-700">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-900">Toll-Free Support</div>
                      <a href="tel:18001234567" className="mt-1 block text-sm text-sky-700 hover:text-sky-800">
                        1800-123-4567
                      </a>
                    </div>
                  </div>
                </div>

                <div className="rounded-[22px] bg-white/90 p-5 ring-1 ring-sky-200/60 shadow-soft-xl transition-all duration-300 hover:shadow-[0_10px_40px_rgba(2,132,199,0.15)] hover:ring-sky-300">
                  <div className="flex items-start gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-xl bg-sky-50 ring-1 ring-sky-100 text-sky-700">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-900">Email Us</div>
                      <a href="mailto:info@cipla.com" className="mt-1 block text-sm text-sky-700 hover:text-sky-800">
                        info@cipla.com
                      </a>
                    </div>
                  </div>
                </div>

                <div className="rounded-[22px] bg-white/90 p-5 ring-1 ring-sky-200/60 shadow-soft-xl transition-all duration-300 hover:shadow-[0_10px_40px_rgba(2,132,199,0.15)] hover:ring-sky-300">
                  <div className="flex items-start gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-xl bg-sky-50 ring-1 ring-sky-100 text-sky-700">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-900">Headquarters</div>
                      <a
                        href="https://www.google.com/maps?q=PENINSULA%20BUSINESS%20PARK%20GANPATRAO%20KADAM%20MARG%20LOWER%20PAREL%20MUMBAI"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1 block text-xs leading-relaxed text-slate-600 hover:text-sky-700"
                      >
                        CIPLA LTD HEAD OFFICE-MUMBAI<br />
                        PENINSULA BUSINESS PARK, GANPATRAO KADAM<br />
                        MARG, LOWER PAREL, MUMBAI.
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-[28px] bg-white/90 p-5 ring-1 ring-sky-200/60 shadow-soft-xl transition-all duration-300 hover:shadow-[0_10px_40px_rgba(2,132,199,0.15)] hover:ring-sky-300 sm:p-6">
                <div className="text-lg font-semibold text-slate-900">Send us a message</div>

                <form
                  className="mt-6 space-y-3"
                  onSubmit={async (e) => {
                    e.preventDefault();
                    try {
                      const response = await fetch("http://localhost:3001/api/contact", {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                          full_name: e.currentTarget.fullName.value,
                          email: e.currentTarget.email.value,
                          phone: e.currentTarget.phone.value,
                          subject: e.currentTarget.subject.value,
                          message: e.currentTarget.message.value
                        })
                      });

                      if (response.ok) {
                        alert("Message sent! We'll get back to you soon.");
                        e.currentTarget.reset();
                      } else {
                        alert("Failed to send message");
                      }
                    } catch (error) {
                      console.error("Error sending message:", error);
                      alert("Failed to send message, please try again");
                    }
                  }}
                >
                  <div className="grid gap-3 sm:grid-cols-2">
                    <input
                      name="fullName"
                      placeholder="Full name"
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50/40 px-4 py-3 text-sm outline-none ring-sky-200 focus:ring-2"
                      required
                    />
                    <input
                      name="email"
                      placeholder="Email address"
                      type="email"
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50/40 px-4 py-3 text-sm outline-none ring-sky-200 focus:ring-2"
                      required
                    />
                  </div>

                  <input
                    name="phone"
                    placeholder="Phone number (optional)"
                    type="tel"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50/40 px-4 py-3 text-sm outline-none ring-sky-200 focus:ring-2"
                  />

                  <input
                    name="subject"
                    placeholder="Subject (optional)"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50/40 px-4 py-3 text-sm outline-none ring-sky-200 focus:ring-2"
                  />

                  <textarea
                    name="message"
                    placeholder="Your message"
                    className="min-h-[120px] w-full resize-none rounded-2xl border border-slate-200 bg-slate-50/40 px-4 py-3 text-sm outline-none ring-sky-200 focus:ring-2"
                    required
                  />

                  <div className="pt-2">
                    <Button type="submit" className="w-full">
                      Send message <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <ReferencesSection />
      <Footer />
    </div>
  );
}
