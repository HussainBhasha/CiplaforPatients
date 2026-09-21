import { useState } from "react";
import { ChevronDown, ChevronUp, BookOpen } from "lucide-react";

const references = [
  "Voelker R. What is knee osteoarthritis? JAMA. 2024;332(22):1954.",
  "Al-Saleh JA, Albelooshi AA, Salti AA, Farghaly M, Ghorab AM, Linga S, et al. Burden, treatment patterns and unmet needs of osteoarthritis in Dubai: a retrospective analysis of the Dubai Real-World Claims Database. Rheumatol Ther. 2022;9(1):151-174.",
  "Damerau A, Rosenow E, Alkhoury D, Buttgereit F, Gaber T. Fibrotic pathways and fibroblast-like synoviocyte phenotypes in osteoarthritis. Front Immunol. 2024;15:1385006.",
  "Mora JC, Przkora R, Cruz-Almeida Y. Knee osteoarthritis: pathophysiology and current treatment modalities. J Pain Res. 2018;11:2189-2196.",
  "Poliwoda S, Noor N, Downs E, Schaaf A, Cantwell A, Ganti L, et al. Stem cells: a comprehensive review of origins and emerging clinical roles in medical practice. Orthop Rev (Pavia). 2022;14(3):37498.",
  "Saltzman BM, Kuhns BD, Weber AE, Yanke A, Nho SJ. Stem cells in orthopedics: a comprehensive guide for the general orthopedist. Am J Orthop (Belle Mead NJ). 2016;45(5):280-326.",
  "Gherghel R, Macovei LA, Burlui MA, Cardoneanu A, Rezus II, Mihai IR, et al. Osteoarthritis—the role of mesenchymal stem cells in cartilage regeneration. Appl Sci. 2023;13(19):10617.",
  "Thami T, Kumar P, Gupta A, Patel S. Orthobiologics for knee osteoarthritis: a review of current practice and future directions. J Arthrosc Surg Sports Med. 2024;5(2):119-124.",
  "Gupta PK, Maheshwari S, Cherian JJ, Goni V, Sharma AK, Tripathy SK, et al. Efficacy and safety of Stempeucel in osteoarthritis of the knee: a phase 3 randomized, double-blind, multicenter, placebo-controlled study. Am J Sports Med. 2023;51(9):2254-2266.",
  "Stempeutics Research Pvt. Ltd. Data on file.",
  "National Institute of Arthritis and Musculoskeletal and Skin Diseases (NIAMS). Osteoarthritis: causes, symptoms, diagnosis, and treatment. Bethesda (MD): National Institutes of Health; 2023.",
  "Huffman KF, Ambrose KR, Nelson AE, Allen KD, Golightly YM, Callahan LF. The critical role of physical activity and weight management in knee and hip osteoarthritis: a narrative review. J Rheumatol. 2024;51(3):224-233.",
  "Arthritis Foundation. Why weight loss matters for arthritis. Atlanta (GA): Arthritis Foundation; 2023.",
  "Centers for Disease Control and Prevention (CDC). Walking: physical activity basics. Atlanta (GA): U.S. Department of Health and Human Services; 2023.",
  "Mayo Clinic Staff. Walking: trim your waistline, improve your health. Rochester (MN): Mayo Foundation for Medical Education and Research; 2023.",
  "National Heart, Lung, and Blood Institute (NHLBI). Why is sleep important? Bethesda (MD): National Institutes of Health; 2022.",
  "National Institutes of Health Office of Dietary Supplements. Calcium: fact sheet for consumers. Bethesda (MD): National Institutes of Health; 2022.",
  "National Institutes of Health Office of Dietary Supplements. Calcium: fact sheet for health professionals. Bethesda (MD): National Institutes of Health; 2022.",
  "National Institutes of Health Office of Dietary Supplements. Vitamin D: fact sheet for consumers. Bethesda (MD): National Institutes of Health; 2023.",
  "National Institutes of Health Office of Dietary Supplements. Vitamin D: fact sheet for health professionals. Bethesda (MD): National Institutes of Health; 2023.",
  "Arthritis Foundation. Nutrition and arthritis: weight loss benefits. Atlanta (GA): Arthritis Foundation; 2023.",
  "Huffman KF, Ambrose KR, Nelson AE, Allen KD, Golightly YM, Callahan LF. Physical activity and weight management in knee and hip osteoarthritis. J Rheumatol. 2024;51(3):224-233.",
  "Centers for Disease Control and Prevention (CDC). Benefits of physical activity and healthy weight management. Atlanta (GA): U.S. Department of Health and Human Services; 2023."
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
