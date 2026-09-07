import { useState } from "react";
import { ChevronDown, ChevronUp, BookOpen } from "lucide-react";

const references = [
  "Knee Osteoarthritis. JAMA. 2024;332(22):1954.",
  "Osteoarthritis: Epidemiology and Burden. Rheumatol Ther. 2022 Feb;9(1):151-174.",
  "Inflammatory Processes in Knee OA. Front Immunol. 2024 Jun 4;15:1385006.",
  "Knee OA Pathophysiology. J Pain Res. 2018 Oct 5;11:2189-2196.",
  "Stem Cell Fundamentals. Orthop Rev (Pavia). 2022 Aug 25;14(3):37498.",
  "Mesenchymal Stem Cells. Am J Orthop (Belle Mead NJ). 2016;45(5):280-326.",
  "MSC Differentiation Potential. Appl Sci. 2023;13:10617.",
  "Orthobiologics in Knee OA. J Arthrosc Surg Sports Med. 2024;5:119-124.",
  "Gupta PK et al. Clinical Evaluation of Allogenic BMMSCs in Knee OA. Am J Sports Med. 2023;51(9):2254-2266.",
  "Stempeutics Research Pvt. Ltd. Data on File.",
  "NIAMS. Osteoarthritis: Overview, Symptoms & Causes. [niams.nih.gov]",
  "Huffman KF et al. The Critical Role of Physical Activity and Weight Management in Knee and Hip Osteoarthritis. Journal of Rheumatology, 2024. [jrheum.org]",
  "Arthritis Foundation. Why Weight Loss Matters for Arthritis. [arthritis.org]",
  "CDC Walking Resources. [Walking | Physical Activity | CDC]",
  "Mayo Clinic. Walking: Trim Your Waistline, Improve Your Health. [mayoclinic.org]",
  "NHLBI. Sleep Health. [nhlbi.nih.gov]",
  "NIH Office of Dietary Supplements. Calcium Fact Sheet for Consumers. [ods.od.nih.gov]",
  "NIH Office of Dietary Supplements. Calcium Fact Sheet for Health Professionals. [ods.od.nih.gov]",
  "NIH Office of Dietary Supplements. Vitamin D Fact Sheet for Consumers. [ods.od.nih.gov]",
  "NIH Office of Dietary Supplements. Vitamin D Fact Sheet for Health Professionals. [ods.od.nih.gov]",
  "Arthritis Foundation. Why Weight Loss Matters for Arthritis. [arthritis.org]",
  "Journal of Rheumatology. Physical Activity and Weight Management in Knee and Hip Osteoarthritis. [jrheum.org]",
  "CDC. Benefits of Physical Activity and Healthy Weight Management."
];

export default function ReferencesSection() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="bg-[#e0f2fe] border-t border-sky-200 py-10 sm:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="cursor-pointer rounded-2xl bg-white shadow-md ring-1 ring-sky-200/70 hover:shadow-lg hover:ring-sky-300 transition-all duration-300 overflow-hidden"
        >
          <div className="flex items-center justify-between px-5 py-4 sm:px-7 sm:py-5 bg-gradient-to-r from-sky-50 via-sky-50/90 to-white rounded-2xl">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#0b3a66] to-[#1a5a94] shadow-sm shrink-0">
                <BookOpen className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
              <div className="flex flex-col items-start">
                <h2 className="text-xl sm:text-2xl font-bold text-[#0b3a66] leading-tight">
                  References
                </h2>
                <span className="text-[11px] sm:text-xs font-semibold text-slate-500 mt-0.5 tracking-wide">
                  {references.length} cited sources · Click to {isOpen ? "collapse" : "expand"}
                </span>
              </div>
            </div>
            <button
              type="button"
              aria-expanded={isOpen}
              aria-label={isOpen ? "Collapse references" : "Expand references"}
              className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-[#0b3a66]/10 text-[#0b3a66] hover:bg-[#0b3a66]/20 active:scale-95 transition-all duration-200 shrink-0"
            >
              {isOpen ? (
                <ChevronUp className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={2.25} />
              ) : (
                <ChevronDown className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={2.25} />
              )}
            </button>
          </div>

          <div
            className={`transition-all duration-300 ease-out ${
              isOpen ? "max-h-[8000px] opacity-100" : "max-h-0 opacity-0"
            } overflow-hidden`}
          >
            <div className="px-5 sm:px-7 pb-6 sm:pb-8 pt-3 sm:pt-5 border-t border-sky-100">
              <div className="mb-4 h-px w-full bg-gradient-to-r from-sky-200 via-sky-100 to-transparent" />
              <ol className="space-y-3 sm:space-y-3.5 list-none">
                {references.map((ref, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-6 w-6 sm:h-7 sm:w-7 flex-none items-center justify-center rounded-full bg-gradient-to-br from-[#0b3a66] to-[#1a5a94] text-[11px] sm:text-xs font-bold text-white shadow-sm shrink-0">
                      {idx + 1}
                    </span>
                    <span className="text-sm leading-relaxed text-slate-700 sm:text-[15px] pt-0.5">
                      {ref}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
