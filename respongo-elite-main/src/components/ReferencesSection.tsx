const references = [
  "JAMA. 2024;332(22):1954. Knee Osteoarthritis.",
  "Rheumatol Ther. 2022 Feb;9(1):151-174. Osteoarthritis: Epidemiology and Burden.",
  "Front Immunol. 2024 Jun 4;15:1385006. Inflammatory Processes in Knee OA.",
  "J Pain Res. 2018 Oct 5;11:2189-2196. Knee OA Pathophysiology.",
  "Orthop Rev (Pavia). 2022 Aug 25;14(3):37498. Stem Cell Fundamentals.",
  "Am J Orthop (Belle Mead NJ). 2016;45(5):280-326. Mesenchymal Stem Cells.",
  "Appl Sci. 2023;13:10617. MSC Differentiation Potential.",
  "J Arthrosc Surg Sports Med. 2024;5:119-124. Orthobiologics in Knee OA.",
  "Gupta PK et al. Am J Sports Med. 2023;51(9):2254-2266. Clinical Evaluation of Allogenic BMMSCs in Knee OA.",
  "Stempeutics Research Pvt. Ltd. Data on File.",
];

export default function ReferencesSection() {
  return (
    <section className="bg-[#e0f2fe] border-t border-sky-200 py-10 sm:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <h2 className="text-2xl font-bold text-[#0b3a66] sm:text-3xl">
          References:
        </h2>
        <div className="mt-3 h-px w-full bg-slate-300" />

        {/* Numbered list */}
        <ol className="mt-6 space-y-3 list-none">
          {references.map((ref, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <span className="mt-0.5 flex-none text-sm font-semibold text-[#0b3a66] leading-relaxed min-w-[1.5rem]">
                {idx + 1}.
              </span>
              <span className="text-sm leading-relaxed text-slate-700 sm:text-[15px]">
                {ref}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
