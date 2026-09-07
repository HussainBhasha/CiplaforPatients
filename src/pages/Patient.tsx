import { memo, useEffect, useMemo, useRef } from "react";
import Container from "@/components/ui/Container";
import MarketingNavbar from "@/components/layout/MarketingNavbar";
import Footer from "@/components/layout/Footer";
import ReferencesSection from "@/components/ReferencesSection";
import patientLandingBg from "@/assets/patient landing.png";
import patientLandingMobileBg from "@/assets/patient 2.png";
import oaComparisonImage from "@/assets/OA.png";
import symptomsImage from "@/assets/symptoms.png";
import gradeStage1Image from "@/assets/stage 1.png";
import gradeStage2Image from "@/assets/stage 2.png";
import gradeStage3Image from "@/assets/stage 3.png";
import gradeStage4Image from "@/assets/stage 4.png";
import stemcellImage from "@/assets/stemcell.png";
import newStemCellImage from "@/assets/newstemcell.png";
import stemCellImageJpg from "@/assets/stemcellimage.jpg";
import advanceStemCellImage from "@/assets/Advance stem cell.png";
import mscImage from "@/assets/newstemcell.png";
import walkingImage from "@/assets/walking image.png";
import climbingImage from "@/assets/climbing.png";
import sittingImage from "@/assets/sitting.png";
import img1 from "@/assets/img1.png";
import img2 from "@/assets/img2.png";
import img3 from "@/assets/img3.png";
import img4 from "@/assets/img4.png";
import img5 from "@/assets/img5.png";
import img6 from "@/assets/img6.png";
import patientVideo from "@/assets/videopatient.mp4";
import gmpImage from "@/assets/GMP.png";
import chonImage from "@/assets/CHON.png";
import sinImage from "@/assets/SIN.png";
import walkImage from "@/assets/walk.png";
import exeImage from "@/assets/exe.png";
import strImage from "@/assets/str.png";
import sitImage from "@/assets/sit.png";
import helImage from "@/assets/hel.png";
import jointImage from "@/assets/joint.png";
import sleepImage from "@/assets/sleep.png";
import proteinImage from "@/assets/protein.png";
import calciumImage from "@/assets/calcium.png";
import vitaminDImage from "@/assets/vitamin D.png";
import vegesImage from "@/assets/veges.png";
import fatsImage from "@/assets/fats.png";
import gainImage from "@/assets/GAIN.png";
import { Armchair, ArrowRight, Droplets, Footprints, TrendingUp, ShieldCheck, Info, CheckCircle2, HeartPulse, Lightbulb, Image as ImageIcon, Utensils, Bone, Sun, Salad, Heart, Scale, AlertTriangle } from "lucide-react";
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
    citation: "1",
    icon: <Footprints className="h-6 w-6" />,
    image: walkingImage,
    color: "orange",
  },
  {
    title: "Difficulty Climbing Stairs",
    text: "Pain or difficulty while climbing up or down stairs.",
    citation: "1",
    icon: <TrendingUp className="h-6 w-6" />,
    image: climbingImage,
    color: "blue",
  },
  {
    title: "Difficulty in getting up from a chair",
    text: "Pain or stiffness when getting up from a chair.",
    citation: "1",
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
  },
  {
    k: "Grade II",
    title: "Moderate changes",
    text: "Cartilage damage begins; pain may increase with activity.",
    image: gradeStage2Image,
  },
  {
    k: "Grade III",
    title: "Advanced changes",
    text: "Noticeable cartilage loss and inflammation; mobility reduces.",
    image: gradeStage3Image,
  },
  {
    k: "Grade IV",
    title: "Severe changes",
    text: "Joint-space narrowing; significant pain and stiffness.",
    image: gradeStage4Image,
  },
];

type LifestyleTip = {
  id: number;
  number: string;
  title: string;
  description: string;
  citation?: string;
  listTitle?: string;
  items?: string[];
  patientTip?: string | null;
  image?: string;
};

const lifestyleTips: LifestyleTip[] = [
  {
    id: 1,
    number: "01",
    title: "Walk Regularly",
    description: "Walking is one of the safest and most effective exercises for people with knee osteoarthritis. Regular walking helps improve joint mobility, reduce stiffness, maintain muscle strength, and support overall health.",
    citation: "12,14,15",
    listTitle: "Key Benefits",
    items: [
      "Improves joint mobility",
      "Reduces stiffness",
      "Builds muscle strength",
    ],
    patientTip: "Start with 10-15 minutes and gradually build to 30 minutes most days of the week. Walk at a comfortable pace.",
    image: walkImage,
  },
  {
    id: 2,
    number: "02",
    title: "Strengthen Your Thigh Muscles",
    description: "Strong thigh (quadriceps) muscles help support the knee joint and reduce stress on the joint surfaces. Strengthening exercises are strongly recommended for knee OA.",
    citation: "11,12",
    listTitle: "Exercises",
    items: [
      "Straight leg raises",
      "Seated knee extensions",
      "Chair sit-to-stand",
      "Wall-supported mini squats",
    ],
    patientTip: "Perform 8-12 repetitions and progress gradually under healthcare guidance.",
    image: exeImage,
  },
  {
    id: 3,
    number: "03",
    title: "Stretch Daily",
    description: "Gentle stretching helps reduce stiffness and maintain knee flexibility.",
    citation: "11",
    listTitle: "Examples",
    items: [
      "Hamstring stretch",
      "Calf stretch",
      "Knee bends while seated",
    ],
    patientTip: "Stretch slowly and never force a painful movement.",
    image: strImage,
  },
  {
    id: 4,
    number: "04",
    title: "Maintain a Healthy Weight",
    description: "Excess body weight increases load on the knee joint and may worsen symptoms. Weight reduction in overweight individuals can improve pain and physical function.",
    citation: "12,13",
    listTitle: "Key Benefits",
    items: [
      "Reduces joint load",
      "Improves pain relief",
      "Enhances physical function",
    ],
    patientTip: "Even modest weight loss can help reduce pressure on the knees.",
    image: helImage,
  },
  {
    id: 5,
    number: "05",
    title: "Avoid Long Periods of Sitting",
    description: "Extended sitting may increase joint stiffness and discomfort. Regular movement throughout the day helps keep joints mobile.",
    citation: "11",
    listTitle: "Helpful Habits",
    items: [
      "Stand up every 30 to 60 mins",
      "Take short walking breaks",
      "Perform gentle knee stretches",
    ],
    patientTip: "Stand up, stretch, or walk around every 30 to 60 minutes.",
    image: sitImage,
  },
  {
    id: 6,
    number: "06",
    title: "Choose Joint-Friendly Activities",
    description: "Low-impact activities can improve fitness while minimizing stress on the knees.",
    citation: "11,12",
    listTitle: "Good Choices",
    items: [
      "Walking",
      "Cycling",
      "Swimming",
      "Yoga",
    ],
    patientTip: "Choose low-impact activities that feel comfortable and avoid sudden twisting.",
    image: jointImage,
  },
  {
    id: 7,
    number: "07",
    title: "Sleep Well",
    description: "Good sleep supports overall health and may help with pain management and daily functioning.",
    citation: "16",
    listTitle: "Healthy Habits",
    items: [
      "Regular sleep timings",
      "Supportive knee pillow",
      "Minimize bedtime screen time",
    ],
    patientTip: "Aim for regular sleep timings and minimize screen exposure before bedtime.",
    image: sleepImage,
  },
];

const dietTips = [
  {
    id: 1,
    number: "01",
    title: "Include Protein at Every Meal",
    icon: Utensils,
    description: "Protein supports muscle health, which is important for knee stability and physical function.",
    citations: ["11", "12"],
    groups: [
      {
        title: "Vegetarian Sources",
        type: "veg" as const,
        items: ["Dal", "Rajma", "Chole", "Soy chunks", "Tofu", "Paneer", "Greek yogurt (hung curd)"],
      },
      {
        title: "Non-Vegetarian Sources",
        type: "nonveg" as const,
        items: ["Eggs", "Fish", "Chicken", "Lean meat"],
      },
    ],
    patientTip: "Include one protein-rich food with every meal.",
    supportingRef: null,
    supportingCitations: [],
    image: proteinImage,
  },
  {
    id: 2,
    number: "02",
    title: "Eat Calcium-Rich Foods",
    icon: Bone,
    description: "Calcium supports bone health. Adequate intake is important for maintaining bone strength.",
    citations: ["17", "18"],
    groups: [
      {
        title: "Vegetarian Sources",
        type: "veg" as const,
        items: ["Milk", "Curd", "Paneer", "Ragi", "Sesame seeds (til)", "Broccoli", "Spinach"],
      },
      {
        title: "Non-Vegetarian Sources",
        type: "nonveg" as const,
        items: ["Fish with edible bones", "Eggs"],
      },
    ],
    patientTip: null,
    supportingRef: null,
    supportingCitations: [],
    image: calciumImage,
  },
  {
    id: 3,
    number: "03",
    title: "Get Enough Vitamin D",
    icon: Sun,
    description: "Vitamin D helps the body absorb calcium and supports bone health.",
    citations: ["19", "20"],
    groups: [
      {
        title: "Sources",
        type: "general" as const,
        items: ["Safe sunlight exposure", "Eggs", "Fatty fish", "Fortified milk", "Fortified foods"],
      },
    ],
    patientTip: null,
    supportingRef: null,
    supportingCitations: [],
    image: vitaminDImage,
  },
  {
    id: 4,
    number: "04",
    title: "Fill Half Your Plate with Vegetables",
    icon: Salad,
    description: "Vegetables provide vitamins, minerals, and fiber while helping support healthy weight management.",
    citations: ["21"],
    groups: [
      {
        title: "Good Indian Options",
        type: "veg" as const,
        items: ["Lauki", "Tori", "Bhindi", "Beans", "Cabbage", "Carrot", "Spinach", "Methi"],
      },
    ],
    patientTip: "Try to include vegetables in lunch and dinner every day.",
    supportingRef: null,
    supportingCitations: [],
    image: vegesImage,
  },
  {
    id: 5,
    number: "05",
    title: "Choose Healthy Fats",
    icon: Heart,
    description: "Replacing fried foods with healthier fat sources may support overall cardiovascular and metabolic health.",
    citations: ["21", "22", "23"],
    groups: [
      {
        title: "Better Choices",
        type: "veg" as const,
        items: ["Groundnuts", "Almonds", "Walnuts", "Flax seeds", "Mustard oil", "Groundnut oil (in moderation)"],
      },
      {
        title: "Non-Veg Option",
        type: "nonveg" as const,
        items: ["Oily fish such as salmon, sardines, and mackerel"],
      },
    ],
    patientTip: null,
    supportingRef: null,
    supportingCitations: [],
    image: fatsImage,
  },
  {
    id: 6,
    number: "06",
    title: "Limit Foods That Promote Weight Gain",
    icon: Scale,
    description: "Maintaining a healthy weight is one of the most important lifestyle measures for knee OA.",
    citations: ["21", "22"],
    groups: [
      {
        title: "Limit",
        type: "limit" as const,
        items: ["Sugar-sweetened beverages", "Excess sweets", "Bakery products", "Deep-fried snacks", "Ultra-processed foods"],
      },
    ],
    patientTip: "Choose homemade meals more often.",
    supportingRef: null,
    supportingCitations: [],
    image: gainImage,
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
  const patientVideoRef = useRef<HTMLVideoElement | null>(null);
  const videoContainerRef = useRef<HTMLDivElement | null>(null);
  const isFullscreenTransitionRef = useRef(false);
  const lastScrollPosRef = useRef(0);

  useEffect(() => {
    const video = patientVideoRef.current;
    if (!video) return;

    const handleFullscreenChange = () => {
      const isFullscreen = !!(
        document.fullscreenElement ||
        (document as any).webkitFullscreenElement ||
        (document as any).mozFullScreenElement ||
        (document as any).msFullscreenElement
      );

      if (isFullscreen) {
        // Entering fullscreen: record current scroll position
        lastScrollPosRef.current = window.scrollY;
      } else {
        // Exiting fullscreen (minimizing): lock observer and keep in same place
        isFullscreenTransitionRef.current = true;

        requestAnimationFrame(() => {
          if (videoContainerRef.current) {
            videoContainerRef.current.scrollIntoView({ block: "center", behavior: "instant" as ScrollBehavior });
          } else if (lastScrollPosRef.current) {
            window.scrollTo({ top: lastScrollPosRef.current, behavior: "instant" as ScrollBehavior });
          }
        });

        // Release guard once browser layout has stabilized
        setTimeout(() => {
          isFullscreenTransitionRef.current = false;
        }, 600);
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("MSFullscreenChange", handleFullscreenChange);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const isFullscreen = !!(
            document.fullscreenElement ||
            (document as any).webkitFullscreenElement ||
            (document as any).mozFullScreenElement ||
            (document as any).msFullscreenElement
          );

          // Prevent resetting when in fullscreen or during minimize transition
          if (isFullscreen || isFullscreenTransitionRef.current) return;

          if (!entry.isIntersecting) {
            // When scrolled up or down out of view: stop and reset to start
            if (!video.paused) {
              video.pause();
            }
            video.currentTime = 0;
          }
        });
      },
      {
        threshold: 0.15,
      }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("webkitfullscreenchange", handleFullscreenChange);
      document.removeEventListener("mozfullscreenchange", handleFullscreenChange);
      document.removeEventListener("MSFullscreenChange", handleFullscreenChange);
    };
  }, []);


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
      <main className="pt-16 sm:pt-20">
        <section className="relative h-[calc(100dvh-4rem)] sm:h-[calc(100dvh-5rem)] w-full overflow-hidden">
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
                    <div className="font-display text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-[#0b3a66]">
                      Knee Osteoarthritis (OA)
                    </div>
                    <p className="mt-4 max-w-2xl text-sm sm:text-base leading-relaxed text-slate-700">
                      Knee Osteoarthritis is a common joint condition where knee cartilage gradually wears down, causing pain, stiffness, and reduced
                      mobility. Early awareness and assessment can help you understand your knee health better.<sup>1</sup>
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
                <div className="font-display text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-slate-900">
                  Understanding Knee Osteoarthritis
                </div>
                <div className="mt-3 text-sm sm:text-base font-medium text-slate-600">
                  Healthy Knee vs. Osteoarthritic Knee: Understand the Key Differences
                </div>
                <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-600">
                  Knee Osteoarthritis is a chronic joint degenerative disease where the protective cartilage between bones gradually wears down. This can
                  lead to pain, stiffness, swelling, and reduced movement.<sup>1,2,4</sup>
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 mt-8 gap-4">
                  <div className="rounded-[24px] bg-white/85 p-6 ring-1 ring-sky-200/60 shadow-soft-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:ring-sky-300 cursor-default">
                    <div className="text-sm font-semibold text-slate-900">Normal Knee</div>
                    <div className="mt-2 text-sm leading-relaxed text-slate-600">
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Smooth Cartilage</li>
                        <li>Synovial Membrane</li>
                        <li>Synovial Cavity</li>
                      </ul>
                    </div>
                  </div>

                  <div className="rounded-[24px] bg-white/85 p-6 ring-1 ring-sky-200/60 shadow-soft-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:ring-sky-300 cursor-default">
                    <div className="text-sm font-semibold text-slate-900">Osteoarthritis Knee</div>
                    <div className="mt-2 text-sm leading-relaxed text-slate-600">
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Cartilage Breakdown</li>
                        <li>Bone Spurs</li>
                        <li>Synovial inflammation</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="mt-4 rounded-[24px] bg-white/85 p-5 sm:p-6 ring-1 ring-sky-200/60 shadow-soft-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:ring-sky-300 cursor-default">
                  <div className="text-sm leading-relaxed text-slate-600">
                    <span className="font-bold text-slate-900">Synovial inflammation (synovitis):</span>{" "}
                    The synovium becomes inflamed and thickened, producing excess synovial fluid. This can cause joint swelling, pain, stiffness, and difficulty in knee movement.<sup>3,4</sup>
                  </div>
                </div>

              </div>

              <div
                className={cn(
                  "hidden md:block transition-all duration-700 ease-out delay-100",
                  oaInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
                )}
              >
                <div className="relative md:h-[360px] lg:h-[520px]">
                  <img
                    src={oaComparisonImage}
                    alt="Healthy knee vs osteoarthritis comparison"
                    width={1200}
                    height={800}
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
              <div className="max-w-3xl mx-auto text-center">
                <h1 className={cn("text-3xl sm:text-4xl font-semibold text-[#0b3a66] reveal-fade", symptomsInView && "reveal-fade-visible")}>Knee OA: Symptoms</h1>
                <div className="mt-2 font-display text-xl sm:text-2xl md:text-3xl font-medium tracking-tight text-[#0b3a66]">
                  <RevealWords text="Signs Your Knee May Be Telling You" active={symptomsInView} />
                </div>
                <p className={cn("mt-4 max-w-3xl mx-auto text-sm leading-relaxed text-slate-600 sm:text-base font-medium reveal-fade", symptomsInView && "reveal-fade-visible")}>
                  Symptoms of knee osteoarthritis often develop gradually and can significantly impact your daily activities. Recognizing these symptoms early can help you take the right steps toward better joint health.<sup>1,4</sup>
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
                        {item.citation && <sup>{item.citation}</sup>}
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
              <div className="font-display text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-[#0b3a66]">
                <RevealWords text="Stages of Knee OA - Severity" active={gradeInView} />
              </div>
              <div className="mt-2 font-display text-lg sm:text-xl md:text-2xl font-normal tracking-tight text-slate-700">
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
                  </div>
                </div>
              ))}
            </div>

            {/* Note Callout */}
            <div className="mt-10 max-w-3xl mx-auto">
              <div className="group relative cursor-pointer overflow-hidden rounded-[24px] bg-gradient-to-r from-sky-50 via-white to-blue-50/70 p-5 sm:p-6 ring-1 ring-sky-200/80 shadow-soft-xl transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.025] hover:shadow-[0_20px_40px_-12px_rgba(11,58,102,0.22)] hover:ring-2 hover:ring-sky-400 flex items-center gap-4 sm:gap-5">
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-[#0b3a66] to-[#0284c7] transition-all duration-300 group-hover:w-2" />
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0b3a66] to-[#0284c7] text-white shadow-md shadow-sky-900/15 transition-transform duration-300 ease-out group-hover:scale-110 group-hover:rotate-3">
                  <Info className="h-6 w-6" />
                </div>
                <div className="flex-1 text-left">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#0b3a66] bg-sky-100/90 px-2.5 py-0.5 rounded-full ring-1 ring-sky-200 transition-colors duration-300 group-hover:bg-sky-200 group-hover:ring-sky-300">
                      Important Note
                    </span>
                  </div>
                  <p className="text-sm sm:text-[15px] font-medium leading-relaxed text-slate-700">
                    If you experience swelling, severe pain and difficulty in daily activities, <span className="font-semibold text-[#0b3a66]">consult your doctor.</span>
                  </p>
                </div>
              </div>
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
                <div className="font-display text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-slate-900">
                  Advanced Stem Cell Therapy for Knee Joint Preservation
                </div>
                <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base">
                  Stem cell therapy supports the body's natural healing processes by promoting tissue repair, preserving cartilage integrity, enhancing joint function, and improving mobility in individuals with knee osteoarthritis.<sup>5,8</sup>
                </p>

                <div className="mt-8">
                  <div className="rounded-[24px] bg-white/60 p-6 ring-1 ring-sky-200/60 shadow-soft-xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-2xl hover:ring-sky-300/80 cursor-pointer max-w-md">
                    <div className="text-sm font-semibold text-slate-900">Cartilage Preservation</div>
                    <div className="mt-2 text-sm leading-relaxed text-slate-600">Supports natural tissue repair and recovery.</div>
                  </div>
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
              <div className="mt-3 font-display text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-slate-900">
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
                  <h2 className="mt-3 font-display text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight text-slate-900">
                    What Are Stem Cells?
                  </h2>
                  <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
                    Stem cells are the body's natural repair cells. They are unique because they can renew themselves, develop into different specialized cell types, help repair and restore damaged tissues, and play an important role in maintaining healthy organs throughout life.<sup>5</sup>
                  </p>
                  <div className="mt-6 flex flex-wrap justify-center gap-4">
                    {[
                      { title: "Self-Renewal", desc: "Ability of stem cell to undergo repeated cell division while maintaining its identity.", citation: "5" },
                      { title: "Repair & Restoration", desc: "Support the body's natural healing by helping repair damaged tissues.", citation: "5" },
                      { title: "Differentiation", desc: "Can develop into different specialized cell types.", citation: "5" },
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
                        <div className="text-sm text-slate-700">
                          {item.desc}
                          {item.citation && <sup>{item.citation}</sup>}
                        </div>
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
                  <h2 className="mt-3 font-display text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight text-slate-900">
                    Mesenchymal Stem Cells (MSCs)
                  </h2>
                  <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
                    Mesenchymal Stem Cells (MSCs) are adult stem cells with the unique ability to develop into different specialized tissues. They play an important role in repairing, regenerating, and healing damaged tissues while supporting the body's natural healing process.<sup>6,7</sup>
                  </p>
                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { title: "Unique Cells", desc: "Specialized adult stem cells capable of supporting tissue repair and regeneration.", citation: "6" },
                      { title: "Differentiation Potential", desc: "Can develop into bone, cartilage, muscle, and other connective tissues.", citation: "6,7" },
                      { title: "Repair & Preservation", desc: "Supports the body's natural repair process and helps to preserve the connective tissue.", citation: "6" },
                      { title: "Natural Healing", desc: "Promote a healthier tissue environment that supports regeneration.", citation: "5,6" },
                    ].map((cell, i) => (
                      <div
                        key={i}
                        className="group cursor-pointer rounded-2xl bg-gradient-to-br from-white to-sky-50/30 p-6 ring-1 ring-slate-100 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:ring-sky-300"
                      >
                        <div className="text-base font-bold text-slate-900 transition-colors duration-300 group-hover:text-sky-700 mb-3">
                          {cell.title}
                        </div>
                        <div className="text-sm text-slate-700">
                          {cell.desc}
                          {cell.citation && <sup>{cell.citation}</sup>}
                        </div>
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
                  <h2 className="mt-3 font-display text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight text-slate-900">
                    Properties of Allogeneic Bone Marrow Derived Mesenchymal Stem Cells
                  </h2>
                  <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
                    Mesenchymal Stem Cells possess several unique biological properties that make them valuable in regenerative medicine and tissue repair.<sup>6,7</sup>
                  </p>
                  
                  <div className="mt-8 flex flex-wrap justify-center gap-4">
                    {[
                      {
                        title: "Differentiation",
                        desc: "Can develop into specialized cells of cartilage, bone, muscle, and other connective tissues.",
                        citation: "6,7",
                        icon: (
                          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="miter" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                          </svg>
                        )
                      },
                      {
                        title: "Anti-Inflammatory",
                        desc: "Help reduce inflammation and create a healthier environment for tissue repair.",
                        citation: "6",
                        icon: (
                          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="miter" strokeWidth={2} d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                        )
                      },
                      {
                        title: "Immunomodulatory",
                        desc: "Help regulate the body's immune response to support healing.",
                        citation: "6",
                        icon: (
                          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="miter" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                        )
                      },
                      {
                        title: "Anti-Catabolic",
                        desc: "Help reduce cartilage breakdown and preserve healthy joint structures.",
                        citation: "5,6",
                        icon: (
                          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="miter" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                        )
                      },
                      {
                        title: "Low Immunogenicity",
                        desc: "Have a lower likelihood of triggering an immune reaction, making them suitable for regenerative therapies.",
                        citation: "6",
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
                        <div className="text-sm text-slate-700 mt-auto">
                          {feature.desc}
                          {feature.citation && <sup>{feature.citation}</sup>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </Container>
        </section>

        {/* Video Guide Section */}
        <section className="relative overflow-hidden py-16 sm:py-24 bg-gradient-to-b from-sky-50/40 via-white to-sky-50/20">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/2 -top-24 h-96 w-96 -translate-x-1/2 rounded-full bg-sky-200/30 blur-3xl" />
          </div>

          <Container>
            <div className="mx-auto max-w-4xl text-center mb-10 sm:mb-12">
              <div className="text-[11px] font-semibold tracking-[0.32em] text-sky-700/80 uppercase">PROCEDURAL OVERVIEW</div>
              <h2 className="mt-3 font-display text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-[#0b3a66]">
                CiploStem® Handling & Administration Guide
              </h2>
              <p className="mt-3 max-w-2xl mx-auto text-sm leading-relaxed text-slate-600 sm:text-base">
                A comprehensive step-by-step visual overview of storage, preparation, and intra-articular administration.
              </p>
            </div>

            <div ref={videoContainerRef} className="mx-auto max-w-5xl">
              <div className="relative overflow-hidden rounded-[28px] sm:rounded-[36px] bg-slate-900/95 shadow-2xl ring-1 ring-sky-200/70 p-2 sm:p-3.5 backdrop-blur-xl">
                <div className="relative aspect-video w-full overflow-hidden rounded-[20px] sm:rounded-[26px] bg-black">
                  <video
                    ref={patientVideoRef}
                    src={patientVideo}
                    controls
                    controlsList="nodownload noplaybackrate"
                    disablePictureInPicture
                    playsInline
                    preload="metadata"
                    className="h-full w-full object-contain"
                    onContextMenu={(e) => e.preventDefault()}
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Regulatory Indication & Key Advantages Section */}
        <section className="relative overflow-hidden py-16 sm:py-24 bg-gradient-to-b from-sky-50/40 via-white to-sky-50/30">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/2 -top-24 h-96 w-96 -translate-x-1/2 rounded-full bg-sky-200/20 blur-3xl" />
          </div>

          <Container>
            {/* Header */}
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-[#0b3a66]">
                Allogeneic Bone Marrow-Derived Mesenchymal Stem Cells
              </h2>
              <p className="mt-4 max-w-3xl mx-auto text-base sm:text-lg font-medium leading-relaxed text-slate-700">
                DCGI/CDSCO Approved stem cell therapy for grade II and grade III Knee Osteoarthritis<sup>8,9</sup>
              </p>
            </div>

            {/* 3 Cards */}
            <div className="mt-14 grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
              {/* Card 1 */}
              <div className="group relative rounded-[28px] bg-white/95 p-8 sm:p-9 ring-1 ring-sky-200 shadow-soft-xl transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-2xl hover:ring-sky-400 flex flex-col items-center text-center">
                <div className="w-28 h-28 sm:w-32 sm:h-32 mb-6 rounded-full overflow-hidden shadow-lg ring-2 ring-sky-200/60 transition-transform duration-300 group-hover:scale-105 flex items-center justify-center bg-white">
                  <img
                    src={gmpImage}
                    alt="GMP & GLP Compliant Manufacturing"
                    className="w-full h-full object-cover rounded-full scale-[1.03]"
                  />
                </div>

                <h3 className="text-base sm:text-lg font-bold uppercase tracking-wider text-[#0b3a66] min-h-[50px] flex items-center justify-center">
                  GMP & GLP COMPLIANT MANUFACTURING
                </h3>

                <div className="w-16 h-0.5 bg-sky-400 my-4 relative rounded-full">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-sky-500" />
                </div>

                <p className="text-sm leading-relaxed text-slate-600 font-medium">
                  Manufactured under state-of-the-art GMP-compliant conditions in GLP-certified laboratories ensuring the highest standards of quality, safety and consistency.<sup>10</sup>
                </p>
              </div>

              {/* Card 2 */}
              <div className="group relative rounded-[28px] bg-white/95 p-8 sm:p-9 ring-1 ring-sky-200 shadow-soft-xl transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-2xl hover:ring-sky-400 flex flex-col items-center text-center">
                <div className="w-28 h-28 sm:w-32 sm:h-32 mb-6 rounded-full overflow-hidden shadow-lg ring-2 ring-sky-200/60 transition-transform duration-300 group-hover:scale-105 flex items-center justify-center bg-white">
                  <img
                    src={chonImage}
                    alt="Chondroprotective Action"
                    className="w-full h-full object-cover rounded-full scale-[1.03]"
                  />
                </div>

                <h3 className="text-base sm:text-lg font-bold uppercase tracking-wider text-[#0b3a66] min-h-[50px] flex items-center justify-center">
                  CHONDROPROTECTIVE ACTION
                </h3>

                <div className="w-16 h-0.5 bg-sky-400 my-4 relative rounded-full">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-sky-500" />
                </div>

                <p className="text-sm leading-relaxed text-slate-600 font-medium">
                  Designed to help preserve cartilage quality and support joint function by acting at the cellular level.<sup>8,9</sup>
                </p>
              </div>

              {/* Card 3 */}
              <div className="group relative rounded-[28px] bg-white/95 p-8 sm:p-9 ring-1 ring-sky-200 shadow-soft-xl transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-2xl hover:ring-sky-400 flex flex-col items-center text-center">
                <div className="w-28 h-28 sm:w-32 sm:h-32 mb-6 rounded-full overflow-hidden shadow-lg ring-2 ring-sky-200/60 transition-transform duration-300 group-hover:scale-105 flex items-center justify-center bg-white">
                  <img
                    src={sinImage}
                    alt="Sterile Single-Dose Injection"
                    className="w-full h-full object-cover rounded-full scale-[1.03]"
                  />
                </div>

                <h3 className="text-base sm:text-lg font-bold uppercase tracking-wider text-[#0b3a66] min-h-[50px] flex items-center justify-center">
                  STERILE SINGLE-DOSE INJECTION
                </h3>

                <div className="w-16 h-0.5 bg-sky-400 my-4 relative rounded-full">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-sky-500" />
                </div>

                <p className="text-sm leading-relaxed text-slate-600 font-medium">
                  Administered as a sterile, single intra-articular injection directly into the knee joint for a convenient and precise treatment.<sup>9,10</sup>
                </p>
              </div>
            </div>
          </Container>
        </section>

        {/* Exercises & Lifestyle Tips Section */}
        <section className="relative py-16 sm:py-24 bg-gradient-to-b from-sky-50/40 via-white to-sky-50/40">
          <Container>
            {/* Header */}
            <div className="mx-auto max-w-5xl text-center">
              <div className="text-[11px] font-semibold tracking-[0.32em] text-sky-700/80 uppercase">
                Lifestyle Management
              </div>
              <h2 className="mt-3 font-display text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-[#0b3a66]">
                Exercises & Lifestyle Tips to Manage Knee Osteoarthritis at Home
              </h2>
              <p className="mt-5 max-w-3xl mx-auto text-base sm:text-lg font-medium leading-relaxed text-slate-700">
                Knee osteoarthritis does not mean you have to stop moving.
              </p>

              {/* Key Strategy Pills */}
              <div className="mt-7 flex flex-wrap justify-center gap-2.5 sm:gap-3 max-w-4xl mx-auto">
                {[
                  "Regular Activity",
                  "Muscle Strengthening",
                  "Healthy Weight Management",
                  "Joint Protection Strategies",
                ].map((strategy, i) => (
                  <span
                    key={strategy}
                    className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full bg-white text-[13px] sm:text-sm font-bold text-[#0b3a66] ring-1 ring-sky-200 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:ring-sky-300"
                  >
                    <span className="w-2 h-2 rounded-full bg-gradient-to-br from-sky-500 to-[#0b3a66]" />
                    {strategy}
                  </span>
                ))}
              </div>

              <p className="mt-7 max-w-3xl mx-auto text-sm sm:text-base leading-relaxed text-slate-600 font-medium">
                These evidence-based strategies can help <span className="font-semibold text-slate-800">reduce pain</span>,{" "}
                <span className="font-semibold text-slate-800">improve mobility</span>, and{" "}
                <span className="font-semibold text-slate-800">maintain independence</span>.<sup>11,12</sup>
              </p>

              {/* Guideline Recommendation Callout */}
              <div className="mt-8 max-w-3xl mx-auto">
                <div className="group relative inline-flex items-center gap-3 sm:gap-4 rounded-[20px] bg-gradient-to-r from-emerald-50 via-white to-sky-50 px-5 sm:px-6 py-4 ring-1 ring-emerald-200/70 shadow-soft-xl">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-md shadow-emerald-900/10 transition-transform duration-300 group-hover:scale-105">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                  <div className="text-left">
                    <div className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-emerald-800 mb-0.5">
                      Recommended by International Guidelines
                    </div>
                    <p className="text-[13px] sm:text-[15px] font-semibold leading-relaxed text-slate-800">
                      Exercise is recommended as a <span className="text-emerald-700">core treatment</span> for knee osteoarthritis by leading international guidelines.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5 max-w-6xl mx-auto">
              {lifestyleTips.map((tip, idx) => (
                <div
                  key={tip.id}
                  className={cn(
                    "group relative flex flex-col lg:flex-row items-stretch rounded-[18px] bg-white ring-1 ring-slate-200 shadow-md transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl hover:ring-sky-300 overflow-hidden",
                    idx === lifestyleTips.length - 1 && "md:col-span-2 md:max-w-[30rem] md:mx-auto lg:!max-w-none lg:!mx-0 lg:!col-span-2 lg:flex-row lg:max-w-[38rem] !lg:mx-auto"
                  )}
                >
                  {/* Left: Image Column - narrower on lg (wider content), full-width top on mobile/tablet */}
                  <div className="w-full lg:w-[34%] lg:shrink-0 min-h-[180px] sm:min-h-[200px] lg:min-h-[240px] bg-gradient-to-br from-slate-50 via-sky-50/60 to-blue-50/60 relative overflow-hidden border-b lg:border-b-0 lg:border-r border-slate-200 flex items-center">
                    {tip.image ? (
                      <>
                        {/* Premium blurred backdrop fill */}
                        <img
                          src={tip.image}
                          alt=""
                          aria-hidden="true"
                          className="absolute inset-0 w-full h-full object-cover scale-110 blur-2xl opacity-35"
                        />
                        {/* Main sharp image - FULLY VISIBLE, never cropped */}
                        <img
                          src={tip.image}
                          alt={tip.title}
                          className="relative z-10 w-full h-full object-contain object-center transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                      </>
                    ) : (
                      <div className="flex flex-col items-center justify-center p-4 w-full h-full relative z-10">
                        <div className="w-12 h-12 rounded-2xl bg-white shadow-sm ring-1 ring-sky-200/70 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                          <ImageIcon className="h-6 w-6 text-sky-600" />
                        </div>
                      </div>
                    )}
                    {/* Tip number badge */}
                    <div className="absolute top-0 left-0 z-20">
                      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-[#0b3a66] to-sky-700 text-white rounded-br-xl shadow-lg">
                        <span className="text-[10px] font-bold uppercase tracking-wide opacity-90">Tip</span>
                        <span className="text-sm font-black">{tip.number}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Content Column (full-width on mobile/tablet) */}
                  <div className="p-4 sm:p-[1.05rem] lg:p-4 flex flex-col justify-between flex-1 gap-3 min-w-0">
                    <div className="space-y-2">
                      {/* Title */}
                      <h3 className="text-base sm:text-lg font-bold text-[#0b3a66] leading-snug">
                        {tip.title}
                      </h3>

                      {/* Description */}
                      <p className="text-[12px] sm:text-[13px] leading-relaxed text-slate-600 font-medium">
                        {tip.description}
                        {tip.citation && <sup>{tip.citation}</sup>}
                      </p>

                      {/* Optional Items / Benefits / Exercises - ONE-PER-ROW stacked list */}
                      {tip.items && tip.items.length > 0 && (
                        <div className="pt-0.5">
                          {tip.listTitle && (
                            <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-sky-700 mb-2">
                              {tip.listTitle}
                            </div>
                          )}
                          <div className="flex flex-col gap-[7px] items-stretch">
                            {tip.items.map((item, i) => (
                              <span
                                key={i}
                                className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-gradient-to-r from-sky-50 to-sky-50/60 text-[12px] sm:text-[13px] font-semibold text-slate-700 ring-1 ring-sky-100 w-full"
                              >
                                <span className="w-5 h-5 shrink-0 rounded-full bg-white flex items-center justify-center shadow-[0_1px_2px_rgba(11,58,102,0.12)] ring-1 ring-sky-200/70">
                                  <CheckCircle2 className="h-3.5 w-3.5 text-sky-600" />
                                </span>
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Patient Tip Callout */}
                    {tip.patientTip && (
                      <div className="rounded-xl bg-gradient-to-br from-amber-50 to-orange-50/60 p-2.5 sm:p-3 border-l-[3px] border-amber-500 ring-1 ring-amber-100 flex items-start gap-2 mt-auto">
                        <Lightbulb className="h-3.5 w-3.5 text-amber-600 shrink-0 mt-0.5" />
                        <div className="text-[11px] sm:text-[12px] text-slate-700 leading-relaxed font-medium min-w-0">
                          <span className="font-bold text-amber-800 mr-1">
                            Tip:
                          </span>
                          {tip.patientTip}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Diet Tips for Managing Knee Osteoarthritis Section */}
        <section className="relative py-16 sm:py-24 bg-gradient-to-b from-sky-50/50 via-white to-sky-50/40 border-t border-sky-100">
          <Container>
            {/* Header */}
            <div className="mx-auto max-w-5xl text-center">
              <div className="text-[11px] font-semibold tracking-[0.32em] text-sky-700/80 uppercase">
                Nutritional Guidance
              </div>
              <h2 className="mt-3 font-display text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-[#0b3a66]">
                Diet Tips for Managing Knee Osteoarthritis at Home
              </h2>
              <p className="mt-5 max-w-3xl mx-auto text-base sm:text-lg font-medium leading-relaxed text-slate-700">
                No single food can cure osteoarthritis.
              </p>

              {/* Key Benefit Pills */}
              <div className="mt-7 flex flex-wrap justify-center gap-2.5 sm:gap-3 max-w-4xl mx-auto">
                {[
                  "Balanced Diet",
                  "Healthy Weight",
                  "Essential Nutrients",
                  "Joint Health Support",
                  "Improved Quality of Life",
                ].map((benefit, i) => (
                  <span
                    key={benefit}
                    className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full bg-white text-[13px] sm:text-sm font-bold text-[#0b3a66] ring-1 ring-sky-200 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:ring-sky-300"
                  >
                    <span className="w-2 h-2 rounded-full bg-gradient-to-br from-sky-500 to-[#0b3a66]" />
                    {benefit}
                  </span>
                ))}
              </div>

              <p className="mt-7 max-w-3xl mx-auto text-sm sm:text-base leading-relaxed text-slate-600 font-medium">
                A balanced diet that supports a <span className="font-semibold text-slate-800">healthy body weight</span> and provides{" "}
                <span className="font-semibold text-slate-800">essential nutrients</span> may help maintain{" "}
                <span className="font-semibold text-slate-800">overall joint health</span> and improve quality of life.<sup>12,13</sup>
              </p>

              {/* Weight Management Callout */}
              <div className="mt-8 max-w-3xl mx-auto">
                <div className="group relative inline-flex items-center gap-3 sm:gap-4 rounded-[20px] bg-gradient-to-r from-amber-50 via-white to-sky-50 px-5 sm:px-6 py-4 ring-1 ring-amber-200/70 shadow-soft-xl">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-md shadow-amber-900/10 transition-transform duration-300 group-hover:scale-105">
                    <Scale className="h-6 w-6" />
                  </div>
                  <div className="text-left">
                    <div className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-amber-800 mb-0.5">
                      Particularly Important
                    </div>
                    <p className="text-[13px] sm:text-[15px] font-semibold leading-relaxed text-slate-800">
                      <span className="text-amber-700">Weight management</span> is particularly important in individuals with knee osteoarthritis.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 6 Cards Grid */}
            <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-7 max-w-7xl mx-auto">
              {dietTips.map((tip, idx) => {
                const IconComponent = tip.icon;
                return (
                  <div
                    key={tip.id}
                    className="group relative flex flex-col items-stretch rounded-[22px] sm:rounded-[26px] bg-white ring-1 ring-slate-200 shadow-soft-xl transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-2xl hover:ring-sky-300 overflow-hidden"
                  >
                    {/* Top Accent Line */}
                    <div className="absolute top-0 left-0 right-0 z-20 h-1.5 bg-gradient-to-r from-sky-400 via-sky-500 to-blue-600 opacity-80" />

                    {/* Tip Number Badge (top-left of image) */}
                    <div className="absolute top-3 left-3 z-20">
                      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-[#0b3a66] to-sky-700 text-white rounded-br-xl rounded-tl-xl shadow-lg">
                        <span className="text-[10px] font-bold uppercase tracking-wide opacity-90">Tip</span>
                        <span className="text-sm font-black">{tip.number}</span>
                      </div>
                    </div>

                    {/* Image Area */}
                    <div className="w-full min-h-[240px] sm:min-h-[270px] bg-gradient-to-br from-slate-50 via-sky-50/60 to-blue-50/60 relative overflow-hidden flex items-center">
                      {tip.image ? (
                        <>
                          {/* Premium blurred backdrop fill - prevents letterboxing */}
                          <img
                            src={tip.image}
                            alt=""
                            aria-hidden="true"
                            className="absolute inset-0 w-full h-full object-cover scale-110 blur-2xl opacity-35"
                          />
                          {/* Main sharp image - FULLY VISIBLE, never cropped */}
                          <img
                            src={tip.image}
                            alt={tip.title}
                            className="relative z-10 w-full h-full object-contain object-center p-3 sm:p-4 transition-transform duration-500 group-hover:scale-[1.03]"
                            loading="lazy"
                            decoding="async"
                          />
                        </>
                      ) : (
                        <div className="flex flex-col items-center justify-center p-4 w-full h-full relative z-10">
                          <div className="w-12 h-12 rounded-2xl bg-white shadow-sm ring-1 ring-sky-200/70 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                            <ImageIcon className="h-6 w-6 text-sky-600" />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Content Area */}
                    <div className="p-[1.1rem] sm:p-5 lg:p-[1.35rem] flex flex-col flex-1 gap-3">
                      <div className="space-y-2.5">
                        {/* Title */}
                        <h3 className="text-base sm:text-lg font-bold text-[#0b3a66] leading-snug">
                          {tip.title}
                        </h3>

                        {/* Description & Citations */}
                        <p className="text-[12px] sm:text-[13px] leading-relaxed text-slate-600 font-medium">
                          {tip.description}
                          {tip.citations && tip.citations.length > 0 && (
                            <sup>{tip.citations.join(",")}</sup>
                          )}
                        </p>

                        {/* Food Groups */}
                        {tip.groups && tip.groups.length > 0 && (
                          <div className="pt-0.5 space-y-3">
                            {tip.groups.map((grp, gIdx) => (
                              <div key={gIdx} className="space-y-2">
                                <div className="flex items-center gap-1.5">
                                  {grp.type === "veg" ? (
                                    <span className="h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-emerald-200" />
                                  ) : grp.type === "nonveg" ? (
                                    <span className="h-2 w-2 rounded-full bg-amber-500 ring-2 ring-amber-200" />
                                  ) : grp.type === "limit" ? (
                                    <span className="h-2 w-2 rounded-full bg-rose-500 ring-2 ring-rose-200" />
                                  ) : (
                                    <span className="h-2 w-2 rounded-full bg-sky-500 ring-2 ring-sky-200" />
                                  )}
                                  <h4 className={cn(
                                    "text-[10px] font-bold uppercase tracking-[0.14em]",
                                    grp.type === "limit" ? "text-rose-700" : "text-slate-800"
                                  )}>
                                    {grp.title}
                                  </h4>
                                </div>

                                <div className="flex flex-wrap gap-1.5">
                                  {grp.items.map((item, iIdx) => (
                                    <span
                                      key={iIdx}
                                      className={cn(
                                        "inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-[11px] sm:text-xs font-semibold transition-colors",
                                        grp.type === "veg" && "bg-gradient-to-r from-emerald-50 to-emerald-50/80 text-emerald-900 ring-1 ring-emerald-200/70",
                                        grp.type === "nonveg" && "bg-gradient-to-br from-amber-50/90 to-amber-50/60 text-amber-950 ring-1 ring-amber-200/70",
                                        grp.type === "limit" && "bg-gradient-to-r from-rose-50 to-rose-50/70 text-rose-900 ring-1 ring-rose-200/80",
                                        grp.type === "general" && "bg-gradient-to-r from-sky-50 to-sky-50/70 text-sky-950 ring-1 ring-sky-200/70"
                                      )}
                                    >
                                      {grp.type === "limit" ? (
                                        <AlertTriangle className="h-3 w-3 text-rose-500 shrink-0" />
                                      ) : (
                                        <CheckCircle2 className={cn(
                                          "h-3 w-3 shrink-0",
                                          grp.type === "veg" && "text-emerald-600",
                                          grp.type === "nonveg" && "text-amber-600",
                                          grp.type === "general" && "text-sky-600"
                                        )} />
                                      )}
                                      {item}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Bottom: Patient Tip & Supporting Reference */}
                      <div className="mt-auto pt-3 space-y-2.5">
                        {tip.patientTip && (
                          <div className="rounded-xl bg-gradient-to-br from-amber-50 to-orange-50/60 p-2.5 sm:p-3 border-l-[3px] border-amber-500 ring-1 ring-amber-100 flex items-start gap-2">
                            <Lightbulb className="h-3.5 w-3.5 text-amber-600 shrink-0 mt-0.5" />
                            <div className="text-[11px] sm:text-[12px] text-slate-700 leading-relaxed font-medium min-w-0">
                              <span className="font-bold text-amber-800 mr-1">Patient Tip:</span>
                              {tip.patientTip}
                            </div>
                          </div>
                        )}

                        {tip.supportingRef && (
                          <div className="rounded-xl bg-gradient-to-br from-sky-50/80 to-sky-50/50 p-2.5 sm:p-3 border-l-[3px] border-sky-500 ring-1 ring-sky-100">
                            <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-sky-900 mb-0.5">
                              Supporting Reference
                            </div>
                            <p className="text-[11px] sm:text-xs text-slate-700 leading-relaxed">
                              {tip.supportingRef}
                              {tip.supportingCitations && tip.supportingCitations.length > 0 && (
                                <span className="ml-1 font-semibold text-sky-700">
                                  {tip.supportingCitations.join(", ")}
                                </span>
                              )}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Container>
        </section>

      </main>
      <ReferencesSection />
      <Footer />
    </div>
  );
}
