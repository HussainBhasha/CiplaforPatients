const doctorReferences = [
  "J Arthrosc Surg Sports Med. 2024;5:119-124. Role of Orthobiologics in Preventing OA Progression.",
  "Clin J Sport Med. 2021;31(6):530-541. Orthobiologics and Regenerative Medicine.",
  "Orthop Rev (Pavia). 2022 Aug 25;14(3):37498. Stem Cell Fundamentals.",
  "Bioengineering (Basel). 2025 Feb;12(2):161. Recent Clinical Advances in Bone Marrow Cellular Therapies.",
  "J Clin Orthop Trauma. 2022 Feb 9;26:101804.",
  "Transplantation. 2015;99:1681-1690.",
  "Am J Orthop (Belle Mead NJ). 2016;45(5):280-326. Mesenchymal Stem Cells.",
  "Appl Sci. 2023;13:10617. MSC Differentiation Potential.",
  "Stem Cell Res Ther. 2022;13:70. Sources of Mesenchymal Stem Cells.",
  "J Pain Res. 2018 Oct 5;11:2189-2196. Knee OA Pathophysiology.",
  "Front Immunol. 2024 Jun 4;15:1385006. Inflammatory Processes in Knee Osteoarthritis.",
  "Gupta PK et al. Arthritis Research & Therapy. 2016;18:301.",
  "Gupta PK et al. Am J Sports Med. 2023;51(9):2254-2266. Clinical Evaluation of Allogenic Bone Marrow Derived Mesenchymal Stem Cells in Knee Osteoarthritis.",
  "Cell Biosci. 2021;11:187. Allogeneic vs Autologous Mesenchymal Stem/Stromal Cells in Clinical Practice.",
  "World J Orthop. 2024;15(10):908-917. Level of Evidence for Orthobiologics in Knee Osteoarthritis.",
  "Stempeutics Research Pvt. Ltd. Data on File.",
];

export default function DoctorReferencesSection() {
  return (
    <section className="bg-[#e0f2fe] border-t border-sky-200 py-10 sm:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <h2 className="text-2xl font-bold text-[#0b3a66] sm:text-3xl">
          References
        </h2>
        <div className="mt-3 h-px w-full bg-slate-300" />

        {/* Numbered list */}
        <ol className="mt-6 space-y-3 list-none">
          {doctorReferences.map((ref, idx) => (
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
