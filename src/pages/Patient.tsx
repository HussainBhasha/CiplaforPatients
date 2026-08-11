import { memo, useEffect, useMemo, useRef, useState } from "react";
import Container from "@/components/ui/Container";
import MarketingNavbar from "@/components/layout/MarketingNavbar";
import Footer from "@/components/layout/Footer";
import ReferencesSection from "@/components/ReferencesSection";
import Button from "@/components/ui/Button";
import patientLandingBg from "@/assets/patient landing.png";
import patientLandingMobileBg from "@/assets/patient 2.png";
import oaComparisonImage from "@/assets/OA.png";
import mobileOAImage from "@/assets/mobile OA.png";
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
import stemCellImageJpg from "@/assets/stemcellimage.jpg";
import advanceStemCellImage from "@/assets/Advance stem cell.png";
import mscImage from "@/assets/newstemcell.png";
import mscPreparationImage from "@/assets/MSC preparation.png";
import stemCellPreparationImage from "@/assets/stem cell preparation.png";
import walkingImage from "@/assets/walking image.png";
import climbingImage from "@/assets/climbing.png";
import sittingImage from "@/assets/sitting.png";
import cryoshipperImage from "@/assets/cryoshipper.png";
import img1 from "@/assets/img1.png";
import img2 from "@/assets/img2.png";
import img3 from "@/assets/img3.png";
import img4 from "@/assets/img4.png";
import img5 from "@/assets/img5.png";
import img6 from "@/assets/img6.png";
import cellVialImage from "@/assets/cell_vial.png";
import waterBathImage from "@/assets/water_bath.png";
import plasmalyteBagImage from "@/assets/plasmalyte_bag.png";
import syringesImage from "@/assets/syringes.png";
import injectionImage from "@/assets/Intra-articular Injection.png";
import prep1 from "@/assets/1.png";
import prep2 from "@/assets/2.png";
import prep3 from "@/assets/3.png";
import prep4 from "@/assets/4.png";
import prep5 from "@/assets/5.png";
import prep6 from "@/assets/6.png";
import prep7 from "@/assets/7.png";
import { Armchair, ArrowRight, Droplets, Footprints, Send, TrendingUp, Phone, Mail, MapPin, ShieldCheck } from "lucide-react";
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

const RevealWords = memo(function RevealWords({ text, active, stagger = 0.04, delay = 0 }: RevealWordsProps) {
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
});

const oaSymptomHighlights = [
  {
    title: "Pain While Walking",
    text: "Discomfort or pain in the knee while walking, especially on longer distances.",
    icon: <Footprints className="h-6 w-6" />,
    image: walkingImage,
    color: "orange",
  },
  {
    title: "Difficulty Climbing Stairs",
    text: "Pain or difficulty while climbing up or down stairs.",
    icon: <TrendingUp className="h-6 w-6" />,
    image: climbingImage,
    color: "blue",
  },
  {
    title: "Difficulty in getting up from a chair",
    text: "Pain or stiffness when getting up from a chair.",
    icon: <Armchair className="h-6 w-6" />,
    image: sittingImage,
    color: "green",
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
    treatment: "Information and advice\nEducation, weight loss, exercise, lifestyle changes, pain killers & supplements",
    treatmentImage: informationImage
  },
  {
    k: "Grade III",
    title: "Advanced changes",
    text: "Noticeable cartilage loss and inflammation; mobility reduces.",
    image: gradeStage3Image,
    treatment: "Simple and advanced non-surgical options\nPrescription oral painkillers, physiotherapy, supportive devices, and Hyaluronic Acid Injections.",
    treatmentImage: nonSurgicalImage
  },
  {
    k: "Grade IV",
    title: "Severe changes",
    text: "Joint-space narrowing; significant pain and stiffness.",
    image: gradeStage4Image,
    treatment: "Surgical options\npartial or total knee replacement (TKR)",
    treatmentImage: surgicalImage
  },
];

const highFetchPriority = { fetchpriority: "high" } as const;

export default function Patient() {
  useEffect(() => {
    document.title = "Cipla";
  }, []);
  const { ref: oaRef, inView: oaInView } = useInView({ threshold: 0.18, rootMargin: "0px 0px -10% 0px" });
  const { ref: symptomsRef, inView: symptomsInView } = useInView({ threshold: 0.18, rootMargin: "0px 0px -10% 0px" });
  const { ref: gradeRef, inView: gradeInView } = useInView({ threshold: 0.18, rootMargin: "0px 0px -10% 0px" });
  const stemSectionRef = useRef<HTMLElement | null>(null);
  const stemVisualRef = useRef<HTMLDivElement | null>(null);
  const [contactSent, setContactSent] = useState(false);
  const [contactLoading, setContactLoading] = useState(false);
  const [contactSubmitError, setContactSubmitError] = useState("");


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



  return (
    <div className="min-h-dvh bg-sky-50">
      <MarketingNavbar />
      <main className="pt-20">
        <section className="relative h-[calc(100dvh-5rem)] w-full overflow-hidden">
          {/* Mobile Image */}
          <img
            src={patientLandingMobileBg}
            alt=""
            width={1200}
            height={1600}
            className="block md:hidden h-full w-full object-cover object-center"
            decoding="async"
            loading="eager"
            aria-hidden="true"
            {...highFetchPriority}
          />
          {/* Desktop Image */}
          <img
            src={patientLandingBg}
            alt=""
            width={1920}
            height={1080}
            className="hidden md:block h-full w-full object-cover object-center"
            decoding="async"
            loading="eager"
            aria-hidden="true"
            {...highFetchPriority}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/85 via-white/45 to-transparent md:from-white/85 md:via-white/45" />
          <Container>
            <div className="absolute inset-0">
              <div className="h-full flex items-center">
                <div className="max-w-3xl pl-6 sm:pl-10 md:pl-14 -translate-y-4 sm:translate-y-0">
                  <div>
                    <div className="font-display text-4xl sm:text-5xl md:text-6xl font-semibold tracking-[-0.04em] text-[#0b3a66]">
                      Knee Osteoarthritis (OA)
                    </div>
                    <p className="mt-4 max-w-2xl text-sm sm:text-base leading-relaxed text-slate-700">
                      Knee Osteoarthritis is a common joint condition where knee cartilage gradually wears down, causing pain, stiffness, and reduced
                      mobility. Early awareness and assessment can help you understand your knee health better.
                    </p>
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
                  Healthy Knee vs. Osteoarthritic Knee: Understand the Key Differences
                </div>
                <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-600">
                  Knee Osteoarthritis is a chronic joint degenerative where the protective cartilage between bones gradually wears down. This can
                  lead to pain, stiffness, swelling, and reduced movement.
                </p>

                <div className="hidden md:grid md:grid-cols-2 mt-8 gap-4">
                  <div className="rounded-[24px] bg-white/85 p-6 ring-1 ring-sky-200/60 shadow-soft-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:ring-sky-300 cursor-default">
                    <div className="text-sm font-semibold text-slate-900">Normal Knee</div>
                    <div className="mt-2 text-sm leading-relaxed text-slate-600">
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Smooth Cartilage</li>
                        <li>Synovial Membrane</li>
                        <li>Synovial Cavity</li>
                        <li>Healthy Ligament</li>
                        <li>Normal Bone</li>
                      </ul>
                    </div>
                  </div>

                  <div className="rounded-[24px] bg-white/85 p-6 ring-1 ring-sky-200/60 shadow-soft-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:ring-sky-300 cursor-default">
                    <div className="text-sm font-semibold text-slate-900">Osteoarthritis Knee</div>
                    <div className="mt-2 text-sm leading-relaxed text-slate-600">
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Cartilage Breakdown</li>
                        <li>Bone Spurs</li>
                        <li>Synovial Membrane</li>
                        <li>Synovial Cavity</li>
                        <li>Ligament Changes</li>
                        <li>Bone Changes</li>
                      </ul>
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
                <div className="relative md:h-[360px] lg:h-[520px]">
                  <img
                    src={oaComparisonImage}
                    alt="Healthy knee vs osteoarthritis comparison"
                    width={1200}
                    height={800}
                    className="hidden md:block h-full w-full object-contain"
                    decoding="async"
                    loading="eager"
                  />

                  {/* Mobile Image with Text Overlays */}
                  <div className="md:hidden relative w-full h-auto">
                    <img
                      src={mobileOAImage}
                      alt="Healthy knee vs osteoarthritis comparison mobile"
                      width={1200}
                      height={800}
                      className="w-full h-auto object-contain"
                      decoding="async"
                      loading="eager"
                    />

                    {/* Normal Knee Labels */}
                    <div className="absolute top-[40%] left-[43%] -translate-y-1/2 text-[9px] sm:text-[11px] font-bold text-slate-800 bg-white px-2 py-1 rounded shadow-sm border border-slate-100 whitespace-nowrap">
                      Smooth Cartilage
                    </div>
                    <div className="absolute top-[51%] left-[43%] -translate-y-1/2 text-[9px] sm:text-[11px] font-bold text-slate-800 bg-white px-2 py-1 rounded shadow-sm border border-slate-100 whitespace-nowrap">
                      Healthy Ligament
                    </div>
                    <div className="absolute top-[64%] left-[43%] -translate-y-1/2 text-[9px] sm:text-[11px] font-bold text-slate-800 bg-white px-2 py-1 rounded shadow-sm border border-slate-100 whitespace-nowrap">
                      Normal Bone
                    </div>

                    {/* OA Knee Labels */}
                    <div className="absolute top-[33%] right-[5%] -translate-y-1/2 text-[9px] sm:text-[11px] font-bold text-slate-800 bg-white px-2 py-1 rounded shadow-sm border border-slate-100 whitespace-nowrap">
                      Cartilage Breakdown
                    </div>
                    <div className="absolute top-[46%] right-[5%] -translate-y-1/2 text-[9px] sm:text-[11px] font-bold text-slate-800 bg-white px-2 py-1 rounded shadow-sm border border-slate-100 whitespace-nowrap">
                      Bone Spurs
                    </div>
                    <div className="absolute top-[54%] right-[5%] -translate-y-1/2 text-[9px] sm:text-[11px] font-bold text-slate-800 bg-white px-2 py-1 rounded shadow-sm border border-slate-100 whitespace-nowrap">
                      Inflamed Synovium
                    </div>
                    <div className="absolute top-[68%] right-[5%] -translate-y-1/2 text-[9px] sm:text-[11px] font-bold text-slate-800 bg-white px-2 py-1 rounded shadow-sm border border-slate-100 whitespace-nowrap">
                      Bone Changes
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        <section ref={(node) => { symptomsRef.current = node; }} className="relative py-14 sm:py-20">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_circle_at_15%_20%,rgba(11,58,102,0.06),transparent_55%)]" />
          <Container>
            <div className="mx-auto max-w-6xl">
              <div className="max-w-3xl mx-auto text-center">
                <h1 className={cn("text-5xl font-extrabold text-[#0b3a66] reveal-fade", symptomsInView && "reveal-fade-visible")}>Knee OA: Symptoms</h1>
                <div className="mt-3 font-display text-3xl font-semibold tracking-[-0.03em] text-[#0b3a66] sm:text-4xl">
                  <RevealWords text="Signs Your Knee May Be Telling You" active={symptomsInView} />
                </div>
                <p className={cn("mt-4 max-w-3xl mx-auto text-sm leading-relaxed text-slate-600 sm:text-base font-medium reveal-fade", symptomsInView && "reveal-fade-visible")}>
                  Symptoms of knee osteoarthritis often develop gradually and can significantly impact your daily activities. Recognizing these symptoms early can help you take the right steps toward better joint health.
                </p>
              </div>

              <div className="mt-12 grid gap-6 md:grid-cols-3 max-w-5xl mx-auto px-4">
                {oaSymptomHighlights.map((item, idx) => {
                  const colors = {
                    orange: {
                      cardBorder: "border-orange-200 hover:border-orange-300",
                      ringBorder: "border-orange-200",
                      dot: "bg-orange-500",
                      badgeBg: "bg-orange-500",
                      iconBg: "bg-orange-50",
                      iconColor: "text-orange-500",
                    },
                    blue: {
                      cardBorder: "border-blue-200 hover:border-blue-300",
                      ringBorder: "border-blue-200",
                      dot: "bg-blue-500",
                      badgeBg: "bg-blue-500",
                      iconBg: "bg-blue-50",
                      iconColor: "text-blue-500",
                    },
                    green: {
                      cardBorder: "border-green-200 hover:border-green-300",
                      ringBorder: "border-green-200",
                      dot: "bg-green-500",
                      badgeBg: "bg-green-500",
                      iconBg: "bg-green-50",
                      iconColor: "text-green-500",
                    }
                  }[item.color as "orange" | "blue" | "green"];

                  return (
                    <div
                      key={item.title}
                      className={cn(
                        "flex flex-col items-center text-center rounded-[24px] bg-white p-8 shadow-sm border transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-md cursor-pointer",
                        colors?.cardBorder,
                        symptomsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                      )}
                      style={{ transitionDelay: `${idx * 90}ms` }}
                    >
                      {/* Image Circle Area */}
                      <div className={cn("relative w-48 h-48 rounded-full border-[1.5px] flex items-center justify-center mb-6", colors?.ringBorder)}>

                        {/* Image Placeholder */}
                        <div className="w-[calc(100%-16px)] h-[calc(100%-16px)] rounded-full bg-slate-50 overflow-hidden flex items-center justify-center text-slate-400 text-sm">
                          {item.image ? (
                            <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                          ) : (
                            "Image Area"
                          )}
                        </div>

                        {/* Number Badge */}
                        <div className={cn("absolute -bottom-4 px-5 py-1 rounded-full text-sm font-bold text-white shadow-sm", colors?.badgeBg)}>
                          {String(idx + 1).padStart(2, "0")}
                        </div>
                      </div>

                      <h3 className="mt-4 text-[17px] font-bold text-[#0b3a66] mb-4">
                        {item.title}
                      </h3>

                      <p className="text-[14px] leading-relaxed text-slate-500 mb-8 flex-1 px-2">
                        {item.text}
                      </p>
                    </div>
                  );
                })}
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
                      width={800}
                      height={600}
                      className="h-full w-full object-contain p-2"
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
                          <div className="relative h-40 w-full overflow-hidden rounded-xl mb-4 bg-white">
                            <img
                              src={g.treatmentImage}
                              alt={`${g.k} treatment`}
                              width={800}
                              height={400}
                              className="h-full w-full object-cover"
                              decoding="async"
                              loading="lazy"
                            />
                            {g.k === "Grade I" && (
                              <>
                                <div className="absolute top-[28%] left-[56%] -translate-x-1/2 -translate-y-1/2 text-center text-[8px] sm:text-[9.5px] font-black text-black leading-[1.1] tracking-tighter">
                                  Analgesic<br />Gel
                                </div>
                                <div className="absolute top-[58%] left-[82%] -translate-x-1/2 -translate-y-1/2 text-center text-[10px] sm:text-[12px] font-black text-black tracking-tight">
                                  Oil
                                </div>
                              </>
                            )}
                          </div>
                        )}
                        <div className="space-y-1">
                          {g.treatment.split('\n').map((line, i) => (
                            <div
                              key={i}
                              className={
                                i === 0
                                  ? "min-h-[56px] text-sm font-semibold text-sky-700"
                                  : "text-[14px] leading-relaxed text-slate-500 px-2"
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


          </Container>
        </section>

        <section ref={(node) => { stemSectionRef.current = node; }} className="relative overflow-hidden py-14 sm:py-20">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_circle_at_20%_20%,rgba(56,189,248,0.18),transparent_55%)]" />
          <div className="pointer-events-none absolute inset-0 opacity-70 hero-dots" />
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-[2%] top-[24%] h-2 w-2 rounded-full bg-sky-400/40 blur-[1px] node-pulse" />
            <div className="absolute left-[18%] top-[62%] h-1.5 w-1.5 rounded-full bg-sky-300/35 blur-[1px] node-pulse" />
            <div className="absolute right-[18%] top-[22%] h-2.5 w-2.5 rounded-full bg-sky-300/35 blur-[1px] node-pulse" />
            <div className="absolute right-[2%] top-[58%] h-2 w-2 rounded-full bg-sky-400/35 blur-[1px] node-pulse" />
          </div>

          <Container>
            <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2 md:items-center">
              <div className="order-2 md:order-1">
                <div className="relative mx-auto w-full md:mx-0">
                  <div className="relative">
                    <img
                      src={advanceStemCellImage}
                      alt="Advanced stem cell visual"
                      width={800}
                      height={800}
                      className="mx-auto w-full max-w-[280px] sm:max-w-[380px] md:max-w-[480px] lg:max-w-[650px] select-none object-contain origin-center transition-all duration-300"
                      decoding="async"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>

              <div className="order-1 md:order-2">
                <div className="font-display text-4xl font-semibold tracking-[-0.03em] text-slate-900 sm:text-5xl">
                  Advanced Stem Cell Therapy for Knee Joint Preservation
                </div>
                <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base">
                  Stem cell therapy supports the body's natural healing processes by promoting tissue repair, preserving cartilage integrity, enhancing joint function, and improving mobility in individuals with knee osteoarthritis.
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
                  ].map((card) => (
                    <div
                      key={card.title}
                      className="rounded-[24px] bg-white/60 p-6 ring-1 ring-sky-200/60 shadow-soft-xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-2xl hover:ring-sky-300/80 cursor-pointer"
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
                How do stem cells work in Knee OA?
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
                  <h2 className="mt-4 font-display text-3xl font-bold tracking-[-0.03em] text-black sm:text-4xl">
                    What Are Stem Cells?
                  </h2>
                  <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
                    Stem cells are the body's natural repair cells. They are unique because they can renew themselves, develop into different specialized cell types, help repair and restore damaged tissues, and play an important role in maintaining healthy organs throughout life.
                  </p>
                  <div className="mt-6 flex flex-wrap justify-center gap-4">
                    {[
                      { title: "Self-Renewal", desc: "Ability of stem cell to undergo repeated cell division while maintaining its identity." },
                      { title: "Repair & Restoration", desc: "Support the body's natural healing by helping repair damaged tissues." },
                      { title: "Differentiation", desc: "Can develop into different specialized cell types." },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="w-full sm:w-[calc(50%-0.5rem)] group cursor-pointer rounded-2xl bg-gradient-to-br from-white to-sky-50/30 p-6 ring-1 ring-slate-100 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:ring-sky-300"
                      >
                        <div className="mb-3">
                          <div className="text-base font-bold text-slate-900 transition-colors duration-300 group-hover:text-sky-700">
                            {item.title}
                          </div>
                        </div>
                        <div className="text-sm text-slate-700">{item.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="order-1 lg:order-2">
                  <div className="relative mx-auto max-w-md">
                    <div className="relative h-80 w-full">
                      <img
                        src={stemCellImageJpg}
                        alt="Stem cells"
                        width={800}
                        height={800}
                        className="h-full w-full object-cover rounded-[24px] shadow-xl ring-1 ring-slate-100"
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
                  <div className="mx-auto max-w-sm">
                    <img
                      src={mscImage}
                      alt="Mesenchymal Stem Cells"
                      width={1200}
                      height={800}
                      className="w-full h-auto animate-[spin_30s_linear_infinite]"
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
                    Mesenchymal Stem Cells (MSCs) are adult stem cells with the unique ability to develop into different specialized tissues. They play an important role in repairing, regenerating, and healing damaged tissues while supporting the body's natural healing process.
                  </p>
                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { title: "Unique Cells", desc: "Specialized adult stem cells capable of supporting tissue repair and regeneration." },
                      { title: "Differentiation Potential", desc: "Can develop into bone, cartilage, muscle, and connective tissue." },
                      { title: "Repair & Preservation", desc: "Supports the body's natural repair process and helps to preserve the damaged tissue" },
                      { title: "Natural Healing", desc: "Promote a healthier tissue environment that supports regeneration." },
                    ].map((cell, i) => (
                      <div
                        key={i}
                        className="group cursor-pointer rounded-2xl bg-gradient-to-br from-white to-sky-50/30 p-6 ring-1 ring-slate-100 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:ring-sky-300"
                      >
                        <div className="text-base font-bold text-slate-900 transition-colors duration-300 group-hover:text-sky-700 mb-3">
                          {cell.title}
                        </div>
                        <div className="text-sm text-slate-700">{cell.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* --- Part 3: Properties of Mesenchymal Stem Cells (MSCs) --- */}
            <div className="mt-20 relative">
              <div className="grid gap-12 lg:grid-cols-2 lg:items-stretch pt-4">
                {/* Visual Flow side */}
                <div className="order-1 lg:order-2 h-full flex flex-col justify-center">
                  <div className="grid grid-cols-2 gap-x-2 sm:gap-x-8 gap-y-6 lg:gap-y-10 lg:gap-x-20">
                    {[
                      { title: "SELF-REPLICATION", img: img1 },
                      { title: "DIFFERENTIATION", img: img2 },
                      { title: "ANTI-INFLAMMATORY", img: img3 },
                      { title: "IMMUNOMODULATORY", img: img4 },
                      { title: "ANTI-CATABOLIC", img: img5 },
                      { title: "LOW IMMUNOGENICITY", img: img6 }
                    ].map((item, idx) => (
                      <div key={idx} className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-2 sm:gap-4 relative group">
                        <div className="w-20 h-20 sm:w-28 sm:h-28 lg:w-36 lg:h-36 shrink-0 rounded-full overflow-hidden flex items-center justify-center relative shadow-sm">
                           {item.img ? (
                             <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                           ) : (
                             <span className="text-[10px] sm:text-xs text-slate-400 font-medium">Image</span>
                           )}
                        </div>
                        <div className="font-bold text-[10px] sm:text-sm lg:text-[15px] text-[#0b3a66] leading-tight break-words hyphens-auto w-full">
                          {item.title}
                        </div>
                        
                        {/* Optional Arrow between first two items (visible only on md+) */}
                        {idx === 0 && (
                          <div className="hidden md:flex absolute -right-3 sm:-right-4 lg:-right-10 top-1/2 -translate-y-1/2 z-10 text-[#3a75c4]">
                            <svg className="w-6 h-6 sm:w-8 sm:h-8 lg:w-12 lg:h-12" fill="currentColor" viewBox="0 0 32 24">
                              <path d="M 7 6 L 0 12 L 7 18 V 14.5 H 25 V 18 L 32 12 L 25 6 V 9.5 H 7 V 6 Z" />
                            </svg>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Text side */}
                <div className="order-2 lg:order-1">
                  <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-4 py-2 text-xs font-semibold text-indigo-700 ring-1 ring-indigo-200">
                    <div className="h-2 w-2 rounded-full bg-indigo-500" />
                    Part 03
                  </div>
                  <h2 className="mt-4 font-display text-3xl font-bold tracking-[-0.03em] text-black sm:text-4xl">
                    Properties of Mesenchymal Stem Cells (MSCs) in Knee OA
                  </h2>
                  <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
                    Mesenchymal Stem Cells possess several unique biological properties that make them valuable in regenerative medicine and tissue repair.
                  </p>
                  
                  <div className="mt-8 flex flex-wrap justify-center gap-4">
                    {[
                      {
                        title: "Differentiation",
                        desc: "Can develop into specialized cells of cartilage, bone, muscle, and connective tissue.",
                        icon: (
                          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="miter" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                          </svg>
                        )
                      },
                      {
                        title: "Anti-Inflammatory",
                        desc: "Help reduce inflammation and create a healthier environment for tissue repair.",
                        icon: (
                          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="miter" strokeWidth={2} d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                        )
                      },
                      {
                        title: "Immunomodulatory",
                        desc: "Help regulate the body's immune response to support healing.",
                        icon: (
                          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="miter" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                        )
                      },
                      {
                        title: "Anti-Catabolic",
                        desc: "Help reduce cartilage breakdown and preserve healthy joint structures.",
                        icon: (
                          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="miter" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                        )
                      },
                      {
                        title: "Low Immunogenicity",
                        desc: "Have a lower likelihood of triggering an immune reaction, making them suitable for regenerative therapies.",
                        icon: (
                          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="miter" strokeWidth={2} d="M4 11a9 9 0 019-9m0 0a9 9 0 019 9m-9-9v18" />
                          </svg>
                        )
                      }
                    ].map((feature, i) => (
                      <div
                        key={i}
                        className="w-full sm:w-[calc(50%-0.5rem)] group cursor-pointer rounded-2xl bg-gradient-to-br from-white to-sky-50/30 p-5 ring-1 ring-slate-100 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:ring-sky-300 flex flex-col h-full"
                      >
                        <div className="mb-3">
                          <div className="text-base font-bold text-slate-900 transition-colors duration-300 group-hover:text-sky-700">
                            {feature.title}
                          </div>
                        </div>
                        <div className="text-sm text-slate-700 mt-auto">{feature.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* --- Part 4: Preparation of Stem Cells --- */}
            <div className="mt-20 relative">
              {/* Full-width header */}
              <div className="flex flex-col items-center text-center">
                <div className="inline-flex items-center gap-2 rounded-full bg-sky-50 px-4 py-2 text-xs font-semibold text-sky-700 ring-1 ring-sky-200">
                  <div className="h-2 w-2 rounded-full bg-sky-500" />
                  Part 04
                </div>
                <h2 className="mt-4 font-display text-3xl font-semibold tracking-[-0.03em] text-slate-900 sm:text-4xl">
                  Stem Cell Preparation
                </h2>
                <p className="mt-4 max-w-3xl mx-auto text-sm leading-relaxed text-slate-600 sm:text-base">
                  Allogeneic Bone Marrow-Derived Mesenchymal Stem Cells (BMMSCs) undergo a carefully controlled
                  multi-stage manufacturing process, including isolation, expansion, cell banking,
                  and cryopreservation, to ensure quality, safety, and therapeutic effectiveness.
                </p>
              </div>

              {/* Image (Top) + Step cards (Bottom) for better readability */}
              <div className="mt-12 w-full max-w-[1400px] mx-auto px-4">
                {/* Desktop Grid Layout (Hidden on Mobile) */}
                <div className="hidden lg:grid grid-cols-5 gap-x-[3.5rem] gap-y-16 relative w-full items-start">
                  
                  {/* Row 1 */}
                  <div className="col-span-2 relative">
                    <div className="bg-white rounded-2xl ring-2 ring-sky-300 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:ring-sky-400 cursor-default flex flex-col overflow-hidden h-[280px]">
                      <div className="flex-1 flex justify-center items-center p-1 relative bg-white">
                         <img src={prep1} alt="Bone Marrow Aspiration" className="w-full h-auto object-contain max-h-[170px] scale-[1.15]" />
                      </div>
                      <div className="border-t-2 border-sky-300 p-2 bg-white relative z-10 flex flex-col items-center justify-center min-h-[85px]">
                        <h4 className="font-bold text-black text-[14px] leading-tight text-center">Bone Marrow Aspiration</h4>
                        <ul className="text-[12px] text-blue-700 mt-1 space-y-0.5 font-bold leading-tight text-center">
                          <li>- Already done from "Healthy Adult donors"</li>
                          <li>- Through the Informed Consent process:</li>
                        </ul>
                      </div>
                    </div>
                    {/* Right Arrow */}
                    <div className="absolute -right-[2.5rem] top-[130px] -translate-y-1/2 z-10 text-red-500">
                      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}><path strokeLinecap="round" strokeLinejoin="miter" d="M13 5l7 7-7 7M6 5l7 7-7 7" /></svg>
                    </div>
                  </div>

                  {/* Box 2 */}
                  <div className="col-span-1 relative">
                    <div className="bg-white rounded-2xl ring-2 ring-sky-300 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:ring-sky-400 cursor-default flex flex-col overflow-hidden h-[280px]">
                      <div className="flex-1 flex justify-center items-center p-1 relative bg-white">
                        <img src={prep2} alt="Isolation & Culture" className="w-full h-auto object-contain max-h-[170px] scale-[1.15]" />
                        <span className="absolute top-[2%] left-1/2 -translate-x-1/2 font-extrabold text-black text-[13px] tracking-wide z-10 drop-shadow-md">Donor 1</span>
                        <span className="absolute top-[36%] left-[2%] font-extrabold text-black text-[13px] tracking-wide z-10 drop-shadow-md">Donor 2</span>
                        <span className="absolute top-[36%] right-[2%] font-extrabold text-black text-[13px] tracking-wide z-10 drop-shadow-md">Donor 3</span>
                      </div>
                      <div className="border-t-2 border-sky-300 p-2 bg-white relative z-10 flex items-center justify-center min-h-[85px]">
                        <p className="font-bold text-black text-[13.5px] leading-tight text-center">Isolation & Culture of BMMSCs<br/><span className="text-xs font-bold">(In GLP-certified lab)</span></p>
                      </div>
                    </div>
                    <div className="absolute -right-[2.5rem] top-[130px] -translate-y-1/2 z-10 text-red-500">
                      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}><path strokeLinecap="round" strokeLinejoin="miter" d="M13 5l7 7-7 7M6 5l7 7-7 7" /></svg>
                    </div>
                  </div>

                  {/* Box 3 */}
                  <div className="col-span-1 relative">
                    <div className="bg-white rounded-2xl ring-2 ring-sky-300 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:ring-sky-400 cursor-default flex flex-col overflow-hidden h-[280px]">
                      <div className="flex-1 flex justify-center items-center p-1 relative bg-white">
                        <img src={prep3} alt="Expansion" className="w-full h-auto object-contain max-h-[170px] scale-[1.15]" />
                      </div>
                      <div className="border-t-2 border-sky-300 p-2 bg-white relative z-10 flex items-center justify-center min-h-[85px]">
                        <p className="font-bold text-black text-[14px] leading-tight text-center">Expansion of BMMSCs</p>
                      </div>
                    </div>
                    <div className="absolute -right-[2.5rem] top-[130px] -translate-y-1/2 z-10 text-red-500">
                      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}><path strokeLinecap="round" strokeLinejoin="miter" d="M13 5l7 7-7 7M6 5l7 7-7 7" /></svg>
                    </div>
                  </div>

                  {/* Box 4 */}
                  <div className="col-span-1 relative">
                    <div className="bg-white rounded-2xl ring-2 ring-sky-300 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:ring-sky-400 cursor-default flex flex-col overflow-hidden h-[280px]">
                      <div className="flex-1 flex justify-center items-center p-1 relative bg-white">
                        <img src={prep4} alt="Master Cell Bank" className="w-full h-auto object-contain max-h-[170px] scale-[1.15]" />
                      </div>
                      <div className="border-t-2 border-sky-300 p-2 bg-white relative z-10 flex items-center justify-center min-h-[85px]">
                        <p className="font-bold text-black text-[14px] leading-tight text-center">Stored in<br/>Master Cell Bank (MCB)</p>
                      </div>
                    </div>
                    {/* Arrow Down to Row 2 */}
                    <div className="absolute left-1/2 -bottom-[3.5rem] -translate-x-1/2 z-10 text-red-500">
                      <svg className="w-10 h-10 rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}><path strokeLinecap="round" strokeLinejoin="miter" d="M13 5l7 7-7 7M6 5l7 7-7 7" /></svg>
                    </div>
                  </div>

                  {/* Row 2 */}
                  {/* Row 2 - Col 1 */}
                  <div className="col-start-1 relative h-[280px]">
                    <div className="bg-white rounded-2xl ring-2 ring-sky-300 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:ring-sky-400 cursor-default h-full flex flex-col items-center justify-center p-4">
                      <p className="font-bold text-black text-[17px] leading-snug text-center">Cryopreserved<br/><span className="text-[15px] font-bold mt-1 block">(-185°C to -195°C)</span></p>
                    </div>
                  </div>

                  {/* Row 2 - Col 2 */}
                  <div className="col-start-2 relative h-[280px]">
                    <div className="bg-white rounded-2xl ring-2 ring-sky-300 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:ring-sky-400 cursor-default h-full flex flex-col items-center justify-center p-4">
                      <p className="font-bold text-black text-[17px] leading-snug text-center">Quantified into<br/>25M cells in Vials</p>
                    </div>
                    <div className="absolute -left-[2.5rem] top-1/2 -translate-y-1/2 z-10 text-red-500 rotate-180">
                      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}><path strokeLinecap="round" strokeLinejoin="miter" d="M13 5l7 7-7 7M6 5l7 7-7 7" /></svg>
                    </div>
                  </div>

                  {/* Row 2 - Col 3 */}
                  <div className="col-start-3 relative h-[280px]">
                    <div className="bg-white rounded-2xl ring-2 ring-sky-300 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:ring-sky-400 cursor-default flex flex-col overflow-hidden h-full">
                      <div className="flex-1 flex justify-center items-center p-1 relative bg-white">
                        <img src={prep7} alt="Large Scale" className="w-full h-auto object-contain max-h-[170px] scale-[1.15]" />
                      </div>
                      <div className="border-t-2 border-sky-300 p-2 bg-white relative z-10 flex items-center justify-center min-h-[85px]">
                        <p className="font-bold text-black text-[14px] leading-tight text-center">Large scale expansion</p>
                      </div>
                    </div>
                    <div className="absolute -left-[2.5rem] top-1/2 -translate-y-1/2 z-10 text-red-500 rotate-180">
                      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}><path strokeLinecap="round" strokeLinejoin="miter" d="M13 5l7 7-7 7M6 5l7 7-7 7" /></svg>
                    </div>
                  </div>

                  {/* Row 2 - Col 4 (WCB) */}
                  <div className="col-start-4 relative h-[280px]">
                    <div className="bg-white rounded-2xl ring-2 ring-sky-300 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:ring-sky-400 cursor-default flex flex-col overflow-hidden h-full">
                      <div className="flex-1 flex justify-center items-center p-1 relative bg-white">
                        <img src={prep4} alt="Working Cell Bank" className="w-full h-auto object-contain max-h-[170px] scale-[1.15]" />
                      </div>
                      <div className="border-t-2 border-sky-300 p-2 bg-white relative z-10 flex items-center justify-center min-h-[85px]">
                        <p className="font-bold text-black text-[14px] leading-tight text-center">Stored in<br/>Working Cell Bank (WCB)</p>
                      </div>
                    </div>
                    {/* Main Arrow between WCB and Large Scale */}
                    <div className="absolute -left-[2.5rem] top-1/2 -translate-y-1/2 z-10 text-red-500 rotate-180">
                      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}><path strokeLinecap="round" strokeLinejoin="miter" d="M13 5l7 7-7 7M6 5l7 7-7 7" /></svg>
                    </div>

                    {/* Circular Icon (prep6) floating over the top border */}
                    <div className="absolute -left-[80px] top-[15px] -translate-y-1/2 z-20">
                      <div className="w-[110px] h-[110px] rounded-full shadow-md border-[3px] border-sky-300 bg-gradient-to-b from-cyan-100 to-cyan-300 flex justify-center items-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-sky-400 hover:scale-105 cursor-pointer relative">
                      <img src={prep6} alt="Vials" className="w-[75px] h-[75px] object-contain z-10" />
                      
                      {/* Small Red Arrow Left (INSIDE CIRCLE) */}
                      <div className="absolute -left-[50px] top-1/2 -translate-y-1/2 text-red-500 rotate-[155deg] z-20">
                        <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}><path strokeLinecap="round" strokeLinejoin="miter" d="M13 5l7 7-7 7M6 5l7 7-7 7" /></svg>
                      </div>
                      
                      {/* Small Red Arrow Right (INSIDE CIRCLE) */}
                      <div className="absolute -right-[50px] top-1/2 -translate-y-1/2 text-red-500 rotate-[205deg] z-20">
                        <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}><path strokeLinecap="round" strokeLinejoin="miter" d="M13 5l7 7-7 7M6 5l7 7-7 7" /></svg>
                      </div>
                    </div>
                    </div>
                  </div>

                  {/* Row 2 - Col 5 */}
                  <div className="col-start-5 relative h-[280px]">
                    <div className="bg-white rounded-2xl ring-2 ring-sky-300 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:ring-sky-400 cursor-default flex flex-col overflow-hidden h-full">
                      <div className="flex-1 flex justify-center items-center p-1 relative bg-white">
                        <img src={prep5} alt="Pooled & Expanded" className="w-full h-auto object-contain max-h-[170px] scale-[1.15]" />
                        <span className="absolute top-[2%] left-[2%] font-extrabold text-black text-[11px] tracking-wide z-10 drop-shadow-md">Donor 1</span>
                        <span className="absolute top-[2%] left-1/2 -translate-x-1/2 font-extrabold text-black text-[11px] tracking-wide z-10 drop-shadow-md">Donor 2</span>
                        <span className="absolute top-[2%] right-[2%] font-extrabold text-black text-[11px] tracking-wide z-10 drop-shadow-md">Donor 3</span>
                      </div>
                      <div className="border-t-2 border-sky-300 p-2 bg-white relative z-10 flex items-center justify-center min-h-[85px]">
                        <p className="font-bold text-black text-[14px] leading-tight text-center">Pooled & Expanded</p>
                      </div>
                    </div>
                    <div className="absolute -left-[2.5rem] top-1/2 -translate-y-1/2 z-10 text-red-500 rotate-180">
                      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}><path strokeLinecap="round" strokeLinejoin="miter" d="M13 5l7 7-7 7M6 5l7 7-7 7" /></svg>
                    </div>
                  </div>
                </div>

                {/* Mobile version (Vertical Flow) */}
                <div className="flex lg:hidden flex-col items-center gap-6 w-full px-2">
                  <div className="w-full max-w-sm bg-white rounded-2xl ring-2 ring-sky-300 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:ring-sky-400 cursor-default flex flex-col overflow-hidden">
                      <div className="flex justify-center p-1 bg-white relative"><img src={prep1} alt="Bone Marrow Aspiration" className="w-full h-auto object-contain max-h-[170px] scale-[1.15]" /></div>
                      <div className="border-t-2 border-sky-300 p-3 bg-white relative z-10 flex flex-col items-center justify-center">
                        <p className="font-bold text-black text-[15px] leading-tight text-center">Bone Marrow Aspiration</p>
                        <ul className="text-[13px] text-blue-700 mt-1 space-y-0.5 font-bold leading-tight text-center">
                          <li>- Already done from "Healthy Adult donors"</li>
                          <li>- Through the Informed Consent process:</li>
                        </ul>
                      </div>
                  </div>
                  <div className="text-red-500 flex flex-col items-center -my-2"><svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}><path strokeLinecap="round" strokeLinejoin="miter" d="M19 13l-7 7-7-7m14-8l-7 7-7-7" /></svg></div>

                  <div className="w-full max-w-sm bg-white rounded-2xl ring-2 ring-sky-300 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:ring-sky-400 cursor-default flex flex-col overflow-hidden">
                      <div className="flex justify-center p-1 bg-white relative"><img src={prep2} alt="Isolation & Culture" className="w-full h-auto object-contain max-h-[170px] scale-[1.15]" />
                        <span className="absolute top-[2%] left-1/2 -translate-x-1/2 font-extrabold text-black text-[13px] tracking-wide z-10 drop-shadow-md">Donor 1</span>
                        <span className="absolute top-[36%] left-[2%] font-extrabold text-black text-[13px] tracking-wide z-10 drop-shadow-md">Donor 2</span>
                        <span className="absolute top-[36%] right-[2%] font-extrabold text-black text-[13px] tracking-wide z-10 drop-shadow-md">Donor 3</span></div>
                      <div className="border-t-2 border-sky-300 p-3 bg-white relative z-10 flex items-center justify-center">
                        <p className="font-bold text-black text-[15px] leading-tight text-center">Isolation & Culture of BMMSCs<br/><span className="text-sm font-bold">(In GLP-certified lab)</span></p>
                      </div>
                  </div>
                  <div className="text-red-500 flex flex-col items-center -my-2"><svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}><path strokeLinecap="round" strokeLinejoin="miter" d="M19 13l-7 7-7-7m14-8l-7 7-7-7" /></svg></div>

                  <div className="w-full max-w-sm bg-white rounded-2xl ring-2 ring-sky-300 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:ring-sky-400 cursor-default flex flex-col overflow-hidden">
                      <div className="flex justify-center p-1 bg-white relative"><img src={prep3} alt="Expansion" className="w-full h-auto object-contain max-h-[170px] scale-[1.15]" /></div>
                      <div className="border-t-2 border-sky-300 p-3 bg-white relative z-10 flex items-center justify-center">
                        <p className="font-bold text-black text-[15px] leading-tight text-center">Expansion of BMMSCs</p>
                      </div>
                  </div>
                  <div className="text-red-500 flex flex-col items-center -my-2"><svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}><path strokeLinecap="round" strokeLinejoin="miter" d="M19 13l-7 7-7-7m14-8l-7 7-7-7" /></svg></div>

                  <div className="w-full max-w-sm bg-white rounded-2xl ring-2 ring-sky-300 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:ring-sky-400 cursor-default flex flex-col overflow-hidden">
                      <div className="flex justify-center p-1 bg-white relative"><img src={prep4} alt="Master Cell Bank" className="w-full h-auto object-contain max-h-[170px] scale-[1.15]" /></div>
                      <div className="border-t-2 border-sky-300 p-3 bg-white relative z-10 flex items-center justify-center">
                        <p className="font-bold text-black text-[15px] leading-tight text-center">Stored in<br/>Master Cell Bank (MCB)</p>
                      </div>
                  </div>
                  <div className="text-red-500 flex flex-col items-center -my-2"><svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}><path strokeLinecap="round" strokeLinejoin="miter" d="M19 13l-7 7-7-7m14-8l-7 7-7-7" /></svg></div>

                  <div className="w-full max-w-sm bg-white rounded-2xl ring-2 ring-sky-300 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:ring-sky-400 cursor-default flex flex-col overflow-hidden">
                      <div className="flex justify-center p-1 bg-white relative"><img src={prep5} alt="Pooled & Expanded" className="w-full h-auto object-contain max-h-[170px] scale-[1.15]" />
                        <span className="absolute top-[2%] left-[2%] font-extrabold text-black text-[11px] tracking-wide z-10 drop-shadow-md">Donor 1</span>
                        <span className="absolute top-[2%] left-1/2 -translate-x-1/2 font-extrabold text-black text-[11px] tracking-wide z-10 drop-shadow-md">Donor 2</span>
                        <span className="absolute top-[2%] right-[2%] font-extrabold text-black text-[11px] tracking-wide z-10 drop-shadow-md">Donor 3</span></div>
                      <div className="border-t-2 border-sky-300 p-3 bg-white relative z-10 flex items-center justify-center">
                        <p className="font-bold text-black text-[15px] leading-tight text-center">Pooled & Expanded</p>
                      </div>
                  </div>
                  <div className="text-red-500 flex flex-col items-center -my-2"><svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}><path strokeLinecap="round" strokeLinejoin="miter" d="M19 13l-7 7-7-7m14-8l-7 7-7-7" /></svg></div>

                  <div className="w-full max-w-sm bg-white rounded-2xl ring-2 ring-sky-300 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:ring-sky-400 cursor-default flex flex-col overflow-hidden">
                      <div className="flex justify-center p-1 bg-white relative"><img src={prep4} alt="Working Cell Bank" className="w-full h-auto object-contain max-h-[170px] scale-[1.15]" /></div>
                      <div className="border-t-2 border-sky-300 p-3 bg-white relative z-10 flex items-center justify-center">
                        <p className="font-bold text-black text-[15px] leading-tight text-center">Stored in<br/>Working Cell Bank (WCB)</p>
                      </div>
                  </div>
                  
                  <div className="text-red-500 flex flex-col items-center my-2"><svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}><path strokeLinecap="round" strokeLinejoin="miter" d="M19 13l-7 7-7-7m14-8l-7 7-7-7" /></svg></div>

                  <div className="z-20 flex justify-center relative my-1">
                     <div className="w-[110px] h-[110px] rounded-full shadow-md border-[3px] border-sky-300 bg-gradient-to-b from-cyan-100 to-cyan-300 flex justify-center items-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-sky-400 hover:scale-105 cursor-pointer relative">
                        <img src={prep6} alt="Vials" className="w-[75px] h-[75px] object-contain z-10" />
                     </div>
                  </div>

                  <div className="text-red-500 flex flex-col items-center my-2"><svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}><path strokeLinecap="round" strokeLinejoin="miter" d="M19 13l-7 7-7-7m14-8l-7 7-7-7" /></svg></div>

                  <div className="w-full max-w-sm bg-white rounded-2xl ring-2 ring-sky-300 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:ring-sky-400 cursor-default flex flex-col overflow-hidden">
                      <div className="flex justify-center p-1 bg-white relative"><img src={prep7} alt="Large Scale" className="w-full h-auto object-contain max-h-[170px] scale-[1.15]" /></div>
                      <div className="border-t-2 border-sky-300 p-3 bg-white relative z-10 flex items-center justify-center">
                        <p className="font-bold text-black text-[15px] leading-tight text-center">Large scale expansion</p>
                      </div>
                  </div>
                  <div className="text-red-500 flex flex-col items-center -my-2"><svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}><path strokeLinecap="round" strokeLinejoin="miter" d="M19 13l-7 7-7-7m14-8l-7 7-7-7" /></svg></div>

                  <div className="w-full max-w-sm bg-white rounded-2xl ring-2 ring-sky-300 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:ring-sky-400 cursor-default p-8 flex flex-col items-center text-center justify-center">
                      <p className="font-bold text-black text-[18px] leading-snug">Quantified into<br/>25M cells in Vials</p>
                  </div>
                  <div className="text-red-500 flex flex-col items-center -my-2"><svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}><path strokeLinecap="round" strokeLinejoin="miter" d="M19 13l-7 7-7-7m14-8l-7 7-7-7" /></svg></div>

                  <div className="w-full max-w-sm bg-white rounded-2xl ring-2 ring-sky-300 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:ring-sky-400 cursor-default p-8 flex flex-col items-center text-center justify-center">
                      <p className="font-bold text-black text-[18px] leading-snug">Cryopreserved<br/><span className="text-[16px] font-bold block mt-1">(-185°C to -195°C)</span></p>
                  </div>
                </div>
              </div>
            </div>

            {/* --- Part 5: Injection Procedure (Redesigned) --- */}
            <div className="mt-24 relative bg-[#F5FAFF] py-16 px-6 sm:px-12 rounded-[40px] shadow-sm ring-1 ring-sky-100/50">
              {/* Full-width header */}
              <div className="flex flex-col items-center text-center">
                <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-sky-700 ring-1 ring-sky-200 shadow-sm">
                  <div className="h-2 w-2 rounded-full bg-sky-500" />
                  Part 05
                </div>
                <h2 className="mt-6 font-display text-4xl font-bold tracking-[-0.03em] text-[#0b3a66] sm:text-5xl">
                  Injection Procedure
                </h2>
                <p className="mt-4 max-w-3xl mx-auto text-sm leading-relaxed text-slate-600 sm:text-base font-medium">
                  The Mesenchymal Stem Cells vial is transported, thawed, reconstituted with PlasmaLyte A, and administered via intra-articular injection together with Hyaluronic Acid.
                </p>
              </div>

              {/* Horizontal Workflow timeline */}
              <div className="mt-16 w-full max-w-5xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 relative">
                  {[
                    {
                      step: "STEP 01",
                      title: "Cryoshipper Storage",
                      desc: "Mesenchymal Stem Cells are transported inside a validated cryoshipper maintained between –185°C and –196°C.",
                      image: cryoshipperImage,
                    },
                    {
                      step: "STEP 02",
                      title: "Controlled Thawing",
                      desc: "The cryopreserved vial is thawed in a sterile warm water bath at 37 degree celsius for 3–4 minutes.",
                      image: waterBathImage,
                    },
                    {
                      step: "STEP 03",
                      title: "Reconstitution",
                      desc: "1 ml of Plasmalyte A (Multiple Electrolyte solution) is added to prepare the stem cell suspension for administration.",
                      image: plasmalyteBagImage,
                    },
                    {
                      step: "STEP 04",
                      title: "Intra-articular Injection",
                      desc: "2 mL of BMMSCs together with 1 mL of PlasmaLyte is injected into the affected knee. Administer 2 mL of Hyaluronic Acid, which acts as the biological scaffold.",
                      image: injectionImage,
                    }
                  ].map((item, i) => (
                    <div key={i} className="flex flex-col relative group cursor-default">
                      {/* Gradient Connector Arrow - Desktop (Between columns) */}
                      {(i + 1) % 2 !== 0 && (
                        <div className="hidden md:block absolute top-[40%] -right-10 w-12 text-sky-300 z-20">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="miter" className="w-12 h-12 drop-shadow-sm"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                        </div>
                      )}
                      
                      <div className="w-full bg-white/80 backdrop-blur-xl rounded-[28px] p-6 ring-1 ring-sky-100 shadow-[0_8px_30px_rgba(2,132,199,0.06)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_15px_40px_rgba(2,132,199,0.12)] hover:ring-sky-300 relative z-10 flex flex-col h-full overflow-hidden">
                        
                        <div className="relative w-full aspect-[4/3] rounded-[20px] mb-6 overflow-hidden">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-contain p-2 transition-transform duration-700 group-hover:scale-105"
                          />
                        </div>

                        <div className="flex flex-col flex-1">
                          <div className="inline-block w-fit text-[11px] font-bold tracking-widest text-sky-600 bg-sky-50 px-3 py-1.5 rounded-full ring-1 ring-sky-100 mb-4">
                            {item.step}
                          </div>
                          <h3 className="text-xl font-bold text-[#0b3a66] mb-3 leading-tight">{item.title}</h3>
                          <p className="text-[14px] text-slate-600 leading-relaxed font-medium">{item.desc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
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
                    Post-injection
                  </h3>

                  <div className="grid gap-4 flex-1">
                    <div className="rounded-2xl bg-white/70 p-6 ring-1 ring-sky-100 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:ring-sky-300">
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

                    <div className="rounded-2xl bg-white/70 p-6 ring-1 ring-sky-100 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:ring-sky-300">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="h-3 w-3 rounded-full bg-rose-500" />
                        <span className="text-sm font-bold text-slate-900">Don’ts</span>
                      </div>
                      <div className="space-y-2">
                        {[
                          "Avoid overstraining or early weight-bearing",
                          "Do not take medicines unless prescribed",
                          "Avoid massage or hot pack on the area",
                          "Avoid very hot baths",
                          "Avoid self medication with pain killers or NSAIDs for 2-3 days post injection",
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
                    <div className="rounded-2xl bg-white/70 p-6 ring-1 ring-sky-100 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:ring-sky-300">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="h-3 w-3 rounded-full bg-emerald-500" />
                        <span className="text-sm font-bold text-slate-900">Do’s</span>
                      </div>
                      <div className="space-y-2">
                        {["Gradually return to normal activities", "Follow the rehab plan recommended by your doctor"].map((x, i) => (
                          <div key={i} className="flex items-start gap-3 text-sm text-slate-700">
                            <div className="mt-1.5 h-2 w-2 flex-none rounded-full bg-emerald-600" />
                            <span>{x}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-2xl bg-white/70 p-6 ring-1 ring-sky-100 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:ring-sky-300">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="h-3 w-3 rounded-full bg-rose-500" />
                        <span className="text-sm font-bold text-slate-900">Don’ts</span>
                      </div>
                      <div className="space-y-2">
                        {["Avoid smoking and alcohol for the first 7 days", "Avoid aggressive exercise unless advised by your doctor"].map((x, i) => (
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
                          If you experience swelling, severe pain, fever or any allergic reactions, contact your doctor immediately.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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

                {contactSent ? (
                  <div className="mt-6 rounded-2xl bg-sky-50 p-5 ring-1 ring-sky-100">
                    <div className="text-sm font-semibold text-slate-900">Message sent</div>
                    <div className="mt-1 text-sm text-slate-600">We’ll get back to you soon.</div>
                    <div className="mt-5">
                      <Button
                        variant="secondary"
                        onClick={() => {
                          setContactSent(false);
                          setContactSubmitError("");
                        }}
                      >
                        Send another
                      </Button>
                    </div>
                  </div>
                ) : (
                  <form
                    className="mt-6 space-y-3"
                    onSubmit={async (e) => {
                      e.preventDefault();
                      setContactSubmitError("");
                      setContactLoading(true);
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
                          setContactSent(true);
                          e.currentTarget.reset();
                        } else {
                          const msg = await response.json().catch(() => null);
                          setContactSubmitError(msg?.message || "Failed to send message");
                        }
                      } catch (error) {
                        console.error("Error sending message:", error);
                        setContactSubmitError("Failed to send message, please try again");
                      } finally {
                        setContactLoading(false);
                      }
                    }}
                  >
                    {contactSubmitError ? (
                      <div className="rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-700 ring-1 ring-rose-100">
                        {contactSubmitError}
                      </div>
                    ) : null}
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
                      <Button type="submit" className="w-full" disabled={contactLoading}>
                        {contactLoading ? "Sending..." : "Send message"} <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </form>
                )}
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
