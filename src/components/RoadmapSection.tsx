import React, { useEffect, useRef, useState } from 'react';
import { FlaskConical, Microscope, TrendingUp, FileCheck, Rocket } from 'lucide-react';
import { motion } from 'framer-motion';

// Scroll reveal helper component
const ScrollReveal = ({ children, className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95 pointer-events-none'} ${className}`}
    >
      {children}
    </div>
  );
};

const milestones = [
  {
    year: "2016",
    title: "Clinical Trials Begin",
    description: "Phase I trials in knee OA patients.",
  },
  {
    year: "2018",
    title: "Foundational Research",
    description: "Early-stage cell biology work begins in Mumbai.",
  },
  {
    year: "2020",
    title: "Phase III Success",
    description: "Pivotal trial demonstrates safety and efficacy.",
  },
  {
    year: "2022",
    title: "Regulatory Approval",
    description: "DCGI approval for knee osteoarthritis.",
  },
  {
    year: "2023",
    title: "CiploStem Launch",
    description: "Nationwide rollout to certified centers.",
  },
];
// DNA Helix illustration background
const DNAHelix = ({ className }: { className?: string }) => {
  const points = 18;
  const height = 450;
  const width = 120;
  const amplitude = 25;
  const wavelength = 150;

  const rungs = [] as { x1: number; x2: number; y: number }[];
  for (let i = 0; i < points; i++) {
    const y = (i / points) * height;
    const phase = (y / wavelength) * 2 * Math.PI;
    const x1 = width / 2 + Math.sin(phase) * amplitude;
    const x2 = width / 2 - Math.sin(phase) * amplitude;
    rungs.push({ x1, x2, y });
  }

  return (
    <svg className={className} viewBox={`0 0 ${width} ${height}`} fill="none" stroke="currentColor">
      {/* Helix strands */}
      <path
        d={rungs.map((r, idx) => `${idx === 0 ? 'M' : 'L'} ${r.x1} ${r.y}`).join(' ')}
        strokeWidth={2.5}
        className="text-[#2F5FCF]/40"
      />
      <path
        d={rungs.map((r, idx) => `${idx === 0 ? 'M' : 'L'} ${r.x2} ${r.y}`).join(' ')}
        strokeWidth={2.5}
        className="text-[#34BCD4]/40"
      />
      {rungs.map((r, idx) => (
        <line
          key={idx}
          x1={r.x1}
          y1={r.y}
          x2={r.x2}
          y2={r.y}
          strokeWidth={1.5}
          strokeOpacity={0.3}
          className="text-[#34BCD4]/50"
        />
      ))}
    </svg>
  );
};

// Molecular background illustration
const MolecularBackground = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="1.5">
    {/* Nodes */}
    <circle cx="40" cy="50" r="5" className="fill-[#2F5FCF]/10 stroke-[#2F5FCF]/40" />
    <circle cx="100" cy="30" r="7" className="fill-[#34BCD4]/10 stroke-[#34BCD4]/40 stroke-2" />
    <circle cx="160" cy="60" r="4" className="fill-[#2F5FCF]/10 stroke-[#2F5FCF]/40" />
    <circle cx="130" cy="120" r="6" className="fill-[#34BCD4]/10 stroke-[#34BCD4]/40" />
    <circle cx="70" cy="150" r="8" className="fill-[#2F5FCF]/10 stroke-[#2F5FCF]/40 stroke-2" />
    <circle cx="30" cy="110" r="4" className="fill-[#34BCD4]/10 stroke-[#34BCD4]/40" />
    {/* Connections */}
    <line x1="40" y1="50" x2="100" y2="30" className="stroke-slate-300/30 dark:stroke-slate-700/30" />
    <line x1="100" y1="30" x2="160" y2="60" className="stroke-[#34BCD4]/30" />
    <line x1="160" y1="60" x2="130" y2="120" className="stroke-slate-300/30 dark:stroke-slate-700/30" strokeWidth="1" strokeDasharray="3 3" />
    <line x1="130" y1="120" x2="70" y2="150" className="stroke-[#2F5FCF]/30" />
    <line x1="70" y1="150" x2="30" y2="110" className="stroke-slate-300/30 dark:stroke-slate-700/30" strokeWidth="1" strokeDasharray="3 3" />
    <line x1="30" y1="110" x2="40" y2="50" className="stroke-[#34BCD4]/30" />
  </svg>
);

// Stem cell illustration
const StemCellGraphic = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none">
    <circle cx="50" cy="50" r="45" className="stroke-[#34BCD4]/30" strokeWidth="1" strokeDasharray="4 2" />
    <circle cx="50" cy="50" r="38" className="stroke-[#2F5FCF]/20 fill-[#2F5FCF]/5" strokeWidth="1" />
    <circle cx="46" cy="46" r="14" className="fill-[#0B1635] stroke-[#34BCD4]/50" strokeWidth="1.5" />
    <circle cx="42" cy="42" r="5" className="fill-[#34BCD4] opacity-60" />
    <circle cx="68" cy="38" r="2.5" className="fill-[#34BCD4]/40" />
    <circle cx="62" cy="58" r="3" className="fill-[#2F5FCF]/40" />
    <radialGradient id="cytoplasm" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stopColor="#34BCD4" stopOpacity="0.15" />
      <stop offset="100%" stopColor="#2F5FCF" stopOpacity="0" />
    </radialGradient>
    <circle cx="50" cy="50" r="38" fill="url(#cytoplasm)" />
  </svg>
);

// Roadmap pin component
const RoadmapPin = ({ year, icon }: { year: string; icon: React.ReactNode }) => (
  <div className="relative group cursor-pointer">
    {/* Glow ring */}
    <div className="absolute -inset-3 rounded-full bg-gradient-to-r from-[#2F5FCF] to-[#34BCD4] opacity-0 group-hover:opacity-70 group-hover:blur-md transition-all duration-500 animate-pulse-glow" />
    <div className="absolute -inset-1.5 rounded-full bg-[#34BCD4] opacity-20 blur-[2px]" />
    <div className="relative w-14 h-14 rounded-full bg-[#0B1635] border-2 border-[#34BCD4] flex items-center justify-center shadow-[0_0_15px_rgba(52,188,212,0.25)] transition-all duration-300 group-hover:scale-110 group-hover:border-white">
      {icon}
    </div>
    <div className="absolute -top-9 left-1/2 -translate-x-1/2 bg-[#0B1635] text-[#34BCD4] px-2.5 py-0.5 rounded-full text-xs font-bold border border-[#34BCD4]/30 shadow-md group-hover:text-white group-hover:border-white transition-colors duration-300">
      {year}
    </div>
  </div>
);

// Milestone card with glassmorphism
const MilestoneCard = ({ year, title, description }: { year: string; title: string; description: string }) => (
  <div className="group relative rounded-[16px] md:rounded-[24px] p-3 md:p-6 bg-white/85 md:bg-white/70 backdrop-blur-sm md:backdrop-blur-md border border-white/60 md:border-white/50 shadow-[0_4px_12px_rgba(0,0,0,0.05)] md:shadow-[0_8px_30px_rgba(0,0,0,0.02)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_45px_rgba(47,95,207,0.12)] hover:bg-white/80">
    <div className="absolute inset-0 rounded-[16px] md:rounded-[24px] border border-transparent group-hover:border-[#34BCD4]/20 pointer-events-none" />
    <span className="text-xs md:text-sm font-extrabold text-[#34BCD4] tracking-wider uppercase">{year}</span>
    <h4 className="text-base md:text-lg xl:text-xl font-bold text-[#0B1635] mt-1 group-hover:text-[#2F5FCF] transition-colors duration-300">{title}</h4>
    <p className="text-slate-600 mt-1.5 md:mt-2 text-[10px] md:text-xs xl:text-sm leading-relaxed">{description}</p>
  </div>
);

// Mobile milestone list item
const MobileMilestoneItem = ({ year, title, description, icon }: { year: string; title: string; description: string; icon: React.ReactNode }) => (
  <div className="relative pl-8">
    <div className="absolute -left-4 top-1 w-9 h-9 rounded-full bg-[#0B1635] border-2 border-[#34BCD4] flex items-center justify-center shadow-md z-10">
      <div className="scale-75 text-white will-change-auto">{icon}</div>
    </div>
    <div className="rounded-[14px] md:rounded-[20px] p-3 md:p-5 bg-white/90 md:bg-white/80 backdrop-blur-none md:backdrop-blur-sm border border-white/60 md:border-white/40 shadow-sm">
      <span className="text-[10px] md:text-xs font-bold text-[#34BCD4]">{year}</span>
      <h4 className="text-base md:text-lg font-bold text-[#0B1635] mt-0.5">{title}</h4>
      <p className="text-slate-600 mt-1 md:mt-1.5 text-[9px] md:text-xs leading-relaxed">{description}</p>
    </div>
  </div>
);

export const RoadmapSection: React.FC = () => {
   
  return (
    <section className="relative w-full pt-16 sm:pt-20 md:pt-24 pb-6 px-3 sm:px-4 overflow-x-hidden bg-sky-100">
      {/* Global Animations */}
      <style>{`
        @keyframes float { 0%,100%{transform:translateY(0) rotate(0);} 50%{transform:translateY(-15px) rotate(3deg);} }
        @keyframes pulseGlow {0%,100%{opacity:0.3;transform:scale(1);}50%{opacity:0.7;transform:scale(1.08);} }
        @keyframes connectorDraw { from { stroke-dashoffset: 100; } to { stroke-dashoffset: 0; } }
        .animate-float-slow{animation:float 8s ease-in-out infinite;}
        .animate-float-delayed{animation:float 10s ease-in-out infinite;animation-delay:2s;}
        .animate-pulse-glow{animation:pulseGlow 4s ease-in-out infinite;}
        .milestone-hover:hover { transform: scale(1.08) !important; filter: drop-shadow(0 0 12px rgba(52, 188, 212, 0.6)); }
        .card-hover:hover { transform: translateY(-4px) !important; }
        .roadmap-connector { animation: connectorDraw 1.5s ease-out forwards; }
      `}</style>
      
      <div className="relative w-full mx-auto z-10">
        {/* Title */}
        <div className="text-center mb-12 sm:mb-16 md:mb-24">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-[#2F5FCF] via-[#34BCD4] to-[#2F5FCF] bg-clip-text text-transparent">
            Milestones
          </h2>
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="h-[2px] w-16 sm:w-24 bg-gradient-to-r from-transparent to-[#34BCD4]" />
            <div className="w-3 h-3 rounded-full border-2 border-[#34BCD4] bg-white flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-[#2F5FCF]" />
            </div>
            <div className="w-2 h-2 rounded-full bg-[#2F5FCF]" />
            <div className="w-3 h-3 rounded-full border-2 border-[#34BCD4] bg-white flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-[#2F5FCF]" />
            </div>
            <div className="h-[2px] w-16 sm:w-24 bg-gradient-to-l from-transparent to-[#34BCD4]" />
          </div>
        </div>
        
  {/* DESKTOP ROADMAP */}

<div className="hidden lg:block relative max-w-[1400px] mx-auto px-20 xl:px-28">

  <svg
    viewBox="0 0 1000 1700"
    className="absolute inset-0 w-full h-full"
    preserveAspectRatio="none"
  >
    <defs>
      <linearGradient
        id="roadGradient"
        x1="0%"
        y1="0%"
        x2="0%"
        y2="100%"
      >
        <stop offset="0%" stopColor="#2F5FCF" />
        <stop offset="50%" stopColor="#34BCD4" />
        <stop offset="100%" stopColor="#0B1635" />
      </linearGradient>
    </defs>

    {/* Glow */}
    <path
      d="
      M500 50
      C500 180 760 180 760 350
      C760 520 240 520 240 700
      C240 880 760 880 760 1060
      C760 1240 240 1240 240 1420
      C240 1550 760 1550 760 1650
      "
      stroke="#34BCD4"
      strokeWidth="28"
      opacity="0.15"
      fill="none"
    />

    {/* Main Road */}
    <path
      d="
      M500 50
      C500 180 760 180 760 350
      C760 520 240 520 240 700
      C240 880 760 880 760 1060
      C760 1240 240 1240 240 1420
     C240 1550 760 1550 760 1650 
      "
      stroke="url(#roadGradient)"
      strokeWidth="18"
      fill="none"
      strokeLinecap="round"
    />

    {/* Road Center Line */}
    <path
      d="
      M500 50
      C500 180 760 180 760 350
      C760 520 240 520 240 700
      C240 880 760 880 760 1060
      C760 1240 240 1240 240 1420
      C240 1550 760 1550 760 1650
      
      "
      stroke="#fff"
      strokeWidth="3"
      fill="none"
      strokeDasharray="10 10"
      strokeLinecap="round"
    />
  </svg>

  <div className="relative h-[1650px] xl:h-[1700px]">

    {/* 2016 */}

    <div
      className="absolute"
      style={{
        left: "68%",
        top: "220px",
      }}
    >
      <RoadmapPin
        year="2016"
        icon={<FlaskConical className="w-6 h-6 text-white" />}
      />

      <div className="absolute left-14 xl:left-16 top-7 w-16 xl:w-24 h-[2px] bg-[#34BCD4]" />

      <div className="absolute left-24 xl:left-36 top-[-30px] w-[260px] xl:w-[320px]">
        <MilestoneCard
          year="2016"
          title="Clinical Trials Begin"
          description="Phase I trials in knee OA patients."
        />
      </div>
    </div>

    {/* 2018 */}

    <div
      className="absolute"
      style={{
        left: "32%",
        top: "540px",
      }}
    >
      <RoadmapPin
        year="2018"
        icon={<Microscope className="w-6 h-6 text-white" />}
      />

      <div className="absolute right-14 xl:right-16 top-7 w-16 xl:w-24 h-[2px] bg-[#34BCD4]" />

      <div className="absolute right-24 xl:right-36 top-[-30px] w-[260px] xl:w-[320px]">
        <MilestoneCard
          year="2018"
          title="Foundational Research"
          description="Early-stage cell biology work begins in Mumbai."
        />
      </div>
    </div>

    {/* 2020 */}

    <div
      className="absolute"
      style={{
        left: "68%",
        top: "900px",
      }}
    >
      <RoadmapPin
        year="2020"
        icon={<TrendingUp className="w-6 h-6 text-white" />}
      />

      <div className="absolute left-14 xl:left-16 top-7 w-16 xl:w-24 h-[2px] bg-[#34BCD4]" />

      <div className="absolute left-24 xl:left-36 top-[-30px] w-[260px] xl:w-[320px]">
        <MilestoneCard
          year="2020"
          title="Phase III Success"
          description="Pivotal trial demonstrates safety and efficacy."
        />
      </div>
    </div>

    {/* 2022 */}

    <div
      className="absolute"
      style={{
        left: "32%",
        top: "1260px",
      }}
    >
      <RoadmapPin
        year="2022"
        icon={<FileCheck className="w-6 h-6 text-white" />}
      />

      <div className="absolute right-14 xl:right-16 top-7 w-16 xl:w-24 h-[2px] bg-[#34BCD4]" />

      <div className="absolute right-24 xl:right-36 top-[-30px] w-[260px] xl:w-[320px]">
        <MilestoneCard
          year="2022"
          title="Regulatory Approval"
          description="DCGI approval for knee osteoarthritis."
        />
      </div>
    </div>

    {/* 2023 */}

    <div
  className="absolute"
  style={{
    left: "78%",
    top: "1580px",
  }}
>
      <RoadmapPin
        year="2023"
        icon={<Rocket className="w-6 h-6 text-white" />}
      />

      <div className="absolute left-14 xl:left-16 top-7 w-16 xl:w-24 h-[2px] bg-[#34BCD4]" />
<div className="absolute left-24 xl:left-36 top-[-30px] w-[260px] xl:w-[320px]">
        <MilestoneCard
          year="2023"
          title="CiploStem Launch"
          description="Nationwide rollout to certified centers."
        />
      </div>
    </div>

  </div>
</div>
        
        {/* ========== TABLET: Simplified Horizontal Layout (768px-1023px) ========== */}
        <div className="hidden md:block lg:hidden max-w-3xl mx-auto px-2 sm:px-4">
          <div className="relative min-h-[900px] py-8">
            {/* Central vertical line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1.5 bg-gradient-to-b from-[#2F5FCF] via-[#34BCD4] to-[#0B1635] -translate-x-1/2 rounded-full opacity-90 z-0" />
            
            <div className="space-y-8 relative z-10">
              {/* 2016 - Right */}
              <div className="flex items-center gap-4">
                <div className="w-[calc(50%-20px)] text-right">
                  <ScrollReveal>
                    <div className="card-hover transition-all duration-300 inline-block">
                      <MilestoneCard year="2016" title="Clinical Trials Begin" description="Phase I trials in knee OA patients." />
                    </div>
                  </ScrollReveal>
                </div>
                <div className="w-10 flex justify-center">
                  <ScrollReveal>
                    <div className="milestone-hover transition-all duration-300 cursor-pointer">
                      <RoadmapPin year="2016" icon={<FlaskConical className="w-5 h-5 text-white" />} />
                    </div>
                  </ScrollReveal>
                </div>
                <div className="w-[calc(50%-20px)]" />
              </div>
              
              {/* 2018 - Left */}
              <div className="flex items-center gap-4">
                <div className="w-[calc(50%-20px)]" />
                <div className="w-10 flex justify-center">
                  <ScrollReveal>
                    <div className="milestone-hover transition-all duration-300 cursor-pointer">
                      <RoadmapPin year="2018" icon={<Microscope className="w-5 h-5 text-white" />} />
                    </div>
                  </ScrollReveal>
                </div>
                <div className="w-[calc(50%-20px)]">
                  <ScrollReveal>
                    <div className="card-hover transition-all duration-300 inline-block">
                      <MilestoneCard year="2018" title="Foundational Research" description="Early-stage cell biology work begins in Mumbai." />
                    </div>
                  </ScrollReveal>
                </div>
              </div>
              
              {/* 2020 - Right */}
              <div className="flex items-center gap-4">
                <div className="w-[calc(50%-20px)] text-right">
                  <ScrollReveal>
                    <div className="card-hover transition-all duration-300 inline-block">
                      <MilestoneCard year="2020" title="Phase III Success" description="Pivotal trial demonstrates safety and efficacy." />
                    </div>
                  </ScrollReveal>
                </div>
                <div className="w-10 flex justify-center">
                  <ScrollReveal>
                    <div className="milestone-hover transition-all duration-300 cursor-pointer">
                      <RoadmapPin year="2020" icon={<TrendingUp className="w-5 h-5 text-white" />} />
                    </div>
                  </ScrollReveal>
                </div>
                <div className="w-[calc(50%-20px)]" />
              </div>
              
              {/* 2022 - Left */}
              <div className="flex items-center gap-4">
                <div className="w-[calc(50%-20px)]" />
                <div className="w-10 flex justify-center">
                  <ScrollReveal>
                    <div className="milestone-hover transition-all duration-300 cursor-pointer">
                      <RoadmapPin year="2022" icon={<FileCheck className="w-5 h-5 text-white" />} />
                    </div>
                  </ScrollReveal>
                </div>
                <div className="w-[calc(50%-20px)]">
                  <ScrollReveal>
                    <div className="card-hover transition-all duration-300 inline-block">
                      <MilestoneCard year="2022" title="Regulatory Approval" description="DCGI approval for knee osteoarthritis." />
                    </div>
                  </ScrollReveal>
                </div>
              </div>
              
              {/* 2023 - Right */}
              <div className="flex items-center gap-4">
                <div className="w-[calc(50%-20px)] text-right">
                  <ScrollReveal>
                    <div className="card-hover transition-all duration-300 inline-block">
                      <MilestoneCard year="2023" title="CiploStem Launch" description="Nationwide rollout to certified centers." />
                    </div>
                  </ScrollReveal>
                </div>
                <div className="w-10 flex justify-center">
                  <ScrollReveal>
                    <div className="milestone-hover transition-all duration-300 cursor-pointer">
                      <RoadmapPin year="2023" icon={<Rocket className="w-5 h-5 text-white" />} />
                    </div>
                  </ScrollReveal>
                </div>
                <div className="w-[calc(50%-20px)]" />
              </div>
            </div>
          </div>
        </div>
        
        {/* MOBILE ROADMAP */}
<div className="md:hidden max-w-sm mx-auto relative py-10 min-h-[1400px]">

  {/* ROAD SVG */}
  <svg
    className="absolute left-0 top-0 w-full h-full"
    viewBox="0 0 350 1400"
    fill="none"
  >
    {/* Glow */}
    <path
      d="
      M175 50
C300 120 300 180 175 250
C50 320 50 380 175 450
C300 520 300 580 175 650
C50 720 50 780 175 950
C250 1080 250 1180 175 1280
      "
      stroke="#34BCD4"
      strokeWidth="24"
      opacity="0.15"
      fill="none"
    />

    {/* Main Road */}
    <path
      d="
     M175 50
C300 120 300 180 175 250
C50 320 50 380 175 450
C300 520 300 580 175 650
C50 720 50 780 175 950
C250 1080 250 1180 175 1280
      "
      stroke="#2F5FCF"
      strokeWidth="14"
      fill="none"
      strokeLinecap="round"
    />

    {/* Center Line */}
    <path
      d="
      
     M175 50
C300 120 300 180 175 250
C50 320 50 380 175 450
C300 520 300 580 175 650
C50 720 50 780 175 950
C250 1080 250 1180 175 1280
      "
      stroke="white"
      strokeWidth="2"
      strokeDasharray="8 8"
      fill="none"
    />
  </svg>

  {/* Positions Container */}
<div className="relative z-10 h-[1500px]">

  {[
    { top: "80px", side: "right" },
    { top: "320px", side: "left" },
    { top: "560px", side: "right" },
    { top: "820px", side: "left" },
    { top: "1250px", side: "right" },
  ].map((pos, index) => {
    const item = milestones[index];

    return (
      <div
        key={item.year}
        className={`absolute w-full flex ${
          pos.side === "right"
            ? "justify-end"
            : "justify-start"
        }`}
        style={{
          top: pos.top,
        }}
      >
        <div className="relative w-[240px]">

          {/* Road Dot */}
          <div
            className="
              absolute
              top-1/2
              -translate-y-1/2
              w-5
              h-5
              rounded-full
              bg-[#34BCD4]
              border-4
              border-white
              shadow-lg
              z-20
            "
            style={{
              left:
                pos.side === "right"
                  ? "-28px"
                  : "calc(100% + 8px)",
            }}
          />

          {/* Card */}
          <div className="bg-white rounded-2xl p-4 shadow-lg transition-all duration-300 hover:scale-105">

            <span className="text-[#34BCD4] font-bold text-sm">
              {item.year}
            </span>

            <h4 className="font-bold text-[#0B1635] mt-1">
              {item.title}
            </h4>

            <p className="text-xs text-slate-600 mt-2">
              {item.description}
            </p>

          </div>

        </div>
      </div>
    );
  })}

</div>

</div>
    </div>
             
    </section>
  );
};
