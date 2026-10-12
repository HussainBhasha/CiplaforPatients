import { useState } from "react";
import { ChevronDown, ChevronUp, BookOpen, ExternalLink } from "lucide-react";

const references = [
  "Voelker R. What Is Knee Osteoarthritis? JAMA. 2024 Dec 10;332(22):1954. doi: 10.1001/jama.2024.17482.",
  "Al-Saleh JA, Albelooshi AA, Salti AA, Farghaly M, Ghorab AM, Linga S, et al. Burden, treatment patterns and unmet needs of osteoarthritis in Dubai: a retrospective analysis of the Dubai Real-World Claims Database. Rheumatol Ther. 2022;9(1):151-174.",
  "Damerau A, Rosenow E, Alkhoury D, Buttgereit F, Gaber T. Fibrotic pathways and fibroblast-like synoviocyte phenotypes in osteoarthritis. Front Immunol. 2024;15:1385006. doi: 10.1007/s40744-021-00391-z.",
  "Mora JC, Przkora R, Cruz-Almeida Y. Knee osteoarthritis: pathophysiology and current treatment modalities. J Pain Res. 2018;11:2189-2196. doi: 10.2147/JPR.S154002.",
  "Poliwoda S, Noor N, Downs E, Schaaf A, Cantwell A, Ganti L, et al. Stem cells: a comprehensive review of origins and emerging clinical roles in medical practice. Orthop Rev (Pavia). 2022;14(3):37498. doi: 10.52965/001c.37498.",
  "Saltzman BM, Kuhns BD, Weber AE, Yanke A, Nho SJ. Stem cells in orthopedics: a comprehensive guide for the general orthopedist. Am J Orthop (Belle Mead NJ). 2016;45(5):280-326.",
  "Gherghel R, Macovei LA, Burlui MA, Cardoneanu A, Rezus II, Mihai IR, et al. Osteoarthritis—the role of mesenchymal stem cells in cartilage regeneration. Appl Sci. 2023;13(19):10617. doi: 10.3390/app131910617.",
  "Thami T, Kumar P, Gupta A, Patel S. Orthobiologics for knee osteoarthritis: a review of current practice and future directions. J Arthrosc Surg Sports Med. 2024;5(2):119-124. doi: 10.25259/JASSM_22_2024",
  "Gupta PK, Maheshwari S, Cherian JJ, Goni V, Sharma AK, Tripathy SK, et al. Efficacy and safety of Stempeucel in osteoarthritis of the knee: a phase 3 randomized, double-blind, multicenter, placebo-controlled study. Am J Sports Med. 2023;51(9):2254-2266. doi: 10.1177/03635465231180323.",
  "Stempeutics Research Pvt Ltd. Home | Stempeutics [Internet]. Bengaluru (India): Stempeutics Research Pvt Ltd.; [cited 2026 Oct 8]. Available from: https://www.stempeutics.com/ (accessed on: 2026 Oct 8).",
  "National Institute of Arthritis and Musculoskeletal and Skin Diseases (NIAMS). Osteoarthritis: causes, symptoms, diagnosis, and treatment [Internet]. Bethesda (MD): National Institutes of Health; 2023 [cited 2026 Oct 6]. Available from: https://www.niams.nih.gov/health-topics/osteoarthritis",
  "Huffman KF, Ambrose KR, Nelson AE, Allen KD, Golightly YM, Callahan LF. The critical role of physical activity and weight management in knee and hip osteoarthritis: a narrative review. J Rheumatol. 2024;51(3):224-233. doi: 10.3899/jrheum.2023-0819.",
  "Arthritis Foundation. Why weight loss matters for arthritis [Internet]. Atlanta (GA): Arthritis Foundation; 2023 [cited 2026 Oct 6]. Available from: https://www.arthritis.org/health-wellness/healthy-living/nutrition/weight-loss/oa-diagnosis-why-weight-loss-matters",
  "Centers for Disease Control and Prevention (CDC). Walking: physical activity basics [Internet]. Atlanta (GA): U.S. Department of Health and Human Services; 2023 [cited 2026 Oct 6]. Available from: https://www.cdc.gov/physical-activity/php/about/index.html",
  "Mayo Clinic Staff. Walking: trim your waistline, improve your health [Internet]. Rochester (MN): Mayo Foundation for Medical Education and Research; 2023 [cited 2026 Oct 6]. Available from: https://www.mayoclinic.org/healthy-lifestyle/weight-loss/in-depth/walking/art-20046261",
  "National Institutes of Health Office of Dietary Supplements. Calcium: fact sheet for consumers [Internet]. Bethesda (MD): National Institutes of Health; 2022 [cited 2026 Oct 6]. Available from: https://ods.od.nih.gov/factsheets/Calcium-Consumer/",
  "National Institutes of Health Office of Dietary Supplements. Calcium: fact sheet for health professionals [Internet]. Bethesda (MD): National Institutes of Health; 2022 [cited 2026 Oct 6]. Available from: https://ods.od.nih.gov/factsheets/Calcium-HealthProfessional/",
  "National Institutes of Health Office of Dietary Supplements. Vitamin D: fact sheet for consumers [Internet]. Bethesda (MD): National Institutes of Health; 2023 [cited 2026 Oct 6]. Available from: https://ods.od.nih.gov/factsheets/VitaminD-Consumer/",
  "National Institutes of Health Office of Dietary Supplements. Vitamin D: fact sheet for health professionals [Internet]. Bethesda (MD): National Institutes of Health; 2023 [cited 2026 Oct 6]. Available from: https://ods.od.nih.gov/factsheets/VitaminD-HealthProfessional/",
  "Weight Loss and Arthritis: How Every Pound Matters [Internet]. Joint Pain Authority; [date unknown] [cited 2026 Oct 6]. Available from: https://jointpainauthority.com/blog/weight-loss-arthritis-pain-reduction/",
  "Bannuru RR, Osani MC, Vaysbrot EE, Arden NK, Bennell K, Bierma-Zeinstra SMA, et al. OARSI guidelines for the non-surgical management of knee, hip, and polyarticular osteoarthritis. Osteoarthritis Cartilage. 2019;27(11):1578-1589. doi: 10.1016/j.joca.2019.06.011."
];

function renderReferenceContent(text: string) {
  const regex = /(doi:\s*(10\.\d{4,9}\/[^\s,;\)]+))|(https?:\/\/[^\s\)]+)/gi;
  const parts: (string | JSX.Element)[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }

    if (match[1] && match[2]) {
      let doiId = match[2];
      let trailingPunct = "";
      while (/[.,;]$/.test(doiId)) {
        trailingPunct = doiId.slice(-1) + trailingPunct;
        doiId = doiId.slice(0, -1);
      }
      parts.push(
        <span key={match.index}>
          doi:{" "}
          <a
            href={`https://doi.org/${doiId}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="text-sky-600 hover:text-sky-800 underline underline-offset-2 break-all font-medium transition-colors inline-flex items-center gap-0.5"
          >
            <span>{doiId}</span>
            <ExternalLink className="inline h-3 w-3 opacity-70" />
          </a>
          {trailingPunct}
        </span>
      );
    } else if (match[3]) {
      let url = match[3];
      let trailingPunct = "";
      while (/[.,;)]$/.test(url)) {
        trailingPunct = url.slice(-1) + trailingPunct;
        url = url.slice(0, -1);
      }
      parts.push(
        <span key={match.index}>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="text-sky-600 hover:text-sky-800 underline underline-offset-2 break-all font-medium transition-colors inline-flex items-center gap-0.5"
          >
            <span>{url}</span>
            <ExternalLink className="inline h-3 w-3 opacity-70" />
          </a>
          {trailingPunct}
        </span>
      );
    }

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts.length > 0 ? parts : text;
}

export default function ReferencesSection() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="bg-[#e0f2fe] border-t border-sky-200 py-10 sm:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-white shadow-md ring-1 ring-sky-200/70 hover:shadow-lg hover:ring-sky-300 transition-all duration-300 overflow-hidden">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="w-full text-left flex items-center justify-between px-5 py-4 sm:px-7 sm:py-5 bg-gradient-to-r from-sky-50 via-sky-50/90 to-white rounded-2xl transition-colors cursor-pointer"
          >
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
            <div
              aria-label={isOpen ? "Collapse references" : "Expand references"}
              className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-[#0b3a66]/10 text-[#0b3a66] hover:bg-[#0b3a66]/20 active:scale-95 transition-all duration-200 shrink-0"
            >
              {isOpen ? (
                <ChevronUp className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={2.25} />
              ) : (
                <ChevronDown className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={2.25} />
              )}
            </div>
          </button>

          <div
            className={`transition-all duration-300 ease-out ${
              isOpen ? "max-h-[8000px] opacity-100" : "max-h-0 opacity-0"
            } overflow-hidden`}
          >
            <div className="px-5 sm:px-7 pb-6 sm:pb-8 pt-3 sm:pt-5 border-t border-sky-100">
              <div className="mb-4 h-px w-full bg-gradient-to-r from-sky-200 via-sky-100 to-transparent" />
              <ol className="space-y-3.5 sm:space-y-4 list-none">
                {references.map((ref, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-6 w-6 sm:h-7 sm:w-7 flex-none items-center justify-center rounded-full bg-gradient-to-br from-[#0b3a66] to-[#1a5a94] text-[11px] sm:text-xs font-bold text-white shadow-sm shrink-0">
                      {idx + 1}
                    </span>
                    <span className="text-sm leading-relaxed text-slate-700 sm:text-[15px] pt-0.5">
                      {renderReferenceContent(ref)}
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
