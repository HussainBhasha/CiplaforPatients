import React from 'react';
import { FlaskConical, Microscope, TrendingUp, FileCheck, Rocket } from 'lucide-react';

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

export const RoadmapSection: React.FC = () => {
  return (
    <section className="relative w-full pt-16 sm:pt-20 md:pt-24 pb-6 px-3 sm:px-4 overflow-x-hidden bg-[#e0f2fe]">
      {/* Global Animations */}
      <style>{`
        @keyframes float { 
          0%,100%{transform:translateY(0) rotate(0);} 
          50%{transform:translateY(-15px) rotate(3deg);} 
        }
        @keyframes pulseGlow {
          0%,100%{opacity:0.3;transform:scale(1);}
          50%{opacity:0.7;transform:scale(1.08);} 
        }
        @keyframes connectorDraw { 
          from { stroke-dashoffset: 100; } 
          to { stroke-dashoffset: 0; } 
        }
        .animate-float-slow{animation:float 8s ease-in-out infinite;}
        .animate-float-delayed{animation:float 10s ease-in-out infinite;animation-delay:2s;}
        .animate-pulse-glow{animation:pulseGlow 4s ease-in-out infinite;}
        .milestone-hover:hover { 
          transform: scale(1.08) !important; 
          filter: drop-shadow(0 0 12px rgba(52, 188, 212, 0.6)); 
        }
        .card-hover:hover { 
          transform: translateY(-4px) !important; 
        }
        .roadmap-connector { 
          animation: connectorDraw 1.5s ease-out forwards; 
        }
      `}</style>

      <div className="relative w-full mx-auto z-10">
        {/* Title */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
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

        {/* DESKTOP VERSION - Hidden on mobile/tablet */}
        <div className="hidden lg:block w-full overflow-x-auto pb-12 overflow-y-hidden" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <div className="relative h-[800px] w-[1400px] mx-auto shrink-0" style={{ minWidth: '1400px' }}>
            {/* ROAD - Rendered FIRST so it appears behind */}
            <svg
              viewBox="0 0 1400 250"
              className="absolute top-[200px] left-0 w-full h-[280px]"
              style={{ zIndex: 1 }}
            >
              {/* Glow */}
              <path
                d="M 60 125 C 198 125, 198 25, 336 25 C 518 25, 518 125, 700 125 C 882 125, 882 25, 1064 25 C 1202 25, 1202 125, 1340 125"
                stroke="#34BCD4"
                strokeWidth="70"
                opacity="0.15"
                fill="none"
              />
              {/* Border PATH */}
              <path
                d="M 60 125 C 198 125, 198 25, 336 25 C 518 25, 518 125, 700 125 C 882 125, 882 25, 1064 25 C 1202 25, 1202 125, 1340 125"
                stroke="#CBD5E1"
                strokeWidth="56"
                fill="none"
              />
              {/* Main Road */}
              <path
                d="M 60 125 C 198 125, 198 25, 336 25 C 518 25, 518 125, 700 125 C 882 125, 882 25, 1064 25 C 1202 25, 1202 125, 1340 125"
                stroke="#0B1635"
                strokeWidth="48"
                fill="none"
                strokeLinecap="round"
              />
              {/* White Dashed Line */}
              <path
                d="M 60 125 C 198 125, 198 25, 336 25 C 518 25, 518 125, 700 125 C 882 125, 882 25, 1064 25 C 1202 25, 1202 125, 1340 125"
                stroke="white"
                strokeWidth="3"
                fill="none"
                strokeDasharray="12 12"
              />
            </svg>

            {/* MILESTONES - Rendered AFTER so dots appear on top */}
            <div className="absolute inset-0" style={{ zIndex: 10 }}>
              {milestones.map((item, index) => {
                const icons = [
                  <FlaskConical key="icon-1" className="w-10 h-10 text-[#1E5EFF]" />,
                  <Microscope key="icon-2" className="w-10 h-10 text-[#1E5EFF]" />,
                  <TrendingUp key="icon-3" className="w-10 h-10 text-[#1E5EFF]" />,
                  <FileCheck key="icon-4" className="w-10 h-10 text-[#1E5EFF]" />,
                  <Rocket key="icon-5" className="w-10 h-10 text-[#1E5EFF]" />,
                ];

                const positions = [
                  { left: "60px", top: 50, roadDotTop: 340 },
                  { left: "336px", top: 0, roadDotTop: 228 },
                  { left: "700px", top: 50, roadDotTop: 340 },
                  { left: "1064px", top: 0, roadDotTop: 228 },
                  { left: "1340px", top: 50, roadDotTop: 340 },
                ];

                const position = positions[index];

                return (
                  <div key={item.year}>
                    {/* Top part: Year + Icon */}
                    <div
                      className="absolute flex flex-col items-center -translate-x-1/2 z-10"
                      style={{
                        left: position.left,
                        top: `${position.top}px`,
                      }}
                    >
                      {/* YEAR */}
                      <div className="text-[#2F5FCF] font-bold mb-3 text-2xl">{item.year}</div>

                      {/* CIRCLE */}
                      <div className="w-24 h-24 rounded-full bg-white border-[5px] border-[#1E5EFF] flex items-center justify-center shadow-lg">
                        {icons[index]}
                      </div>
                    </div>

                    {/* Connector line from icon to road */}
                    <div
                      className="absolute -translate-x-1/2 z-10"
                      style={{
                        left: position.left,
                        top: `${position.top + 134}px`,
                        height: `${position.roadDotTop - position.top - 134}px`,
                      }}
                    >
                      <div className="w-[2px] h-full bg-[#14B8C4] mx-auto" />
                    </div>

                    {/* ROAD DOT */}
                    <div
                      className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
                      style={{
                        left: position.left,
                        top: `${position.roadDotTop}px`,
                      }}
                    >
                      <div className="w-8 h-8 rounded-full bg-white border-[5px] border-[#1E5EFF] flex items-center justify-center shadow-md relative z-20">
                        <div className="w-3 h-3 rounded-full bg-[#14B8C4]" />
                      </div>
                    </div>

                    {/* Connector from road to card */}
                    <div
                      className="absolute -translate-x-1/2 z-10"
                      style={{
                        left: position.left,
                        top: `${position.roadDotTop + 16}px`,
                      }}
                    >
                      <div className="w-[2px] h-24 bg-[#14B8C4] mx-auto" />
                    </div>

                    {/* CARD */}
                    <div
                      className="absolute -translate-x-1/2 z-10"
                      style={{
                        left: position.left,
                        top: `${position.roadDotTop + 112}px`,
                      }}
                    >
                      <div className="relative w-60 bg-white rounded-[20px] p-5 shadow-xl border-b-[6px] border-[#1E5EFF] transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-2xl hover:border-[#14B8C4] hover:bg-blue-50">
                        {/* Triangle */}
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-0 h-0
                          border-l-[14px]
                          border-r-[14px]
                          border-b-[14px]
                          border-l-transparent
                          border-r-transparent
                          border-b-white"
                        />
                        <h4 className="font-bold text-[#0B1635] text-lg">{item.title}</h4>
                        <div className="w-12 h-[3px] bg-[#14B8C4] my-3" />
                        <p className="text-slate-600 text-sm">{item.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* MOBILE VERSION - Vertical Timeline (shown on mobile/tablet) */}
        <div className="lg:hidden max-w-2xl mx-auto px-4">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[30px] top-0 bottom-0 w-[3px] bg-gradient-to-b from-[#2F5FCF] via-[#34BCD4] to-[#2F5FCF]" />

            {/* Milestones */}
            <div className="space-y-8 md:space-y-12">
              {milestones.map((item, index) => {
                const icons = [
                  <FlaskConical key="mobile-icon-1" className="w-6 h-6 sm:w-7 sm:h-7 text-white" />,
                  <Microscope key="mobile-icon-2" className="w-6 h-6 sm:w-7 sm:h-7 text-white" />,
                  <TrendingUp key="mobile-icon-3" className="w-6 h-6 sm:w-7 sm:h-7 text-white" />,
                  <FileCheck key="mobile-icon-4" className="w-6 h-6 sm:w-7 sm:h-7 text-white" />,
                  <Rocket key="mobile-icon-5" className="w-6 h-6 sm:w-7 sm:h-7 text-white" />,
                ];

                return (
                  <div key={item.year} className="relative flex items-start gap-6 md:gap-8 group">
                    {/* Icon Circle - positioned on the line */}
                    <div className="relative flex-shrink-0 z-10">
                      <div className="w-[60px] h-[60px] sm:w-[70px] sm:h-[70px] rounded-full bg-gradient-to-br from-[#1E5EFF] to-[#2F5FCF] border-[4px] sm:border-[5px] border-white shadow-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:shadow-xl">
                        {icons[index]}
                      </div>
                      {/* Year badge */}
                      <div className="absolute -top-2 -right-2 bg-[#0B1635] text-[#34BCD4] px-2 py-0.5 rounded-full text-xs font-bold border-2 border-[#34BCD4] shadow-md">
                        {item.year}
                      </div>
                    </div>

                    {/* Content Card */}
                    <div className="flex-1 pb-2">
                      <div className="relative bg-white rounded-[16px] sm:rounded-[20px] p-4 sm:p-6 shadow-lg border-b-[4px] sm:border-b-[5px] border-[#1E5EFF] transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
                        {/* Arrow pointing to circle */}
                        <div className="absolute left-0 top-6 -translate-x-full w-0 h-0
                          border-t-[10px] border-t-transparent
                          border-b-[10px] border-b-transparent
                          border-r-[12px] border-r-white
                        "/>

                        <h4 className="font-bold text-[#0B1635] text-base sm:text-lg mb-2 group-hover:text-[#2F5FCF] transition-colors">
                          {item.title}
                        </h4>
                        <div className="w-12 h-[3px] bg-[#14B8C4] mb-3" />
                        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
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
      </div>
    </section>
  );
};