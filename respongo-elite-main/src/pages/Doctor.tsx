import { useEffect, useMemo, useState } from "react";
import MarketingNavbar from "@/components/layout/MarketingNavbar";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";
import aboutOAImage from "@/assets/about OA.png";
import ciploPreparationImage from "@/assets/ciplo preparation.png";

export default function Doctor() {
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);
  const previewAlt = useMemo(() => {
    if (previewSrc === aboutOAImage) return "Knee OA information";
    if (previewSrc === ciploPreparationImage) return "CiploStem preparation";
    return "Preview";
  }, [previewSrc]);

  useEffect(() => {
    if (!previewSrc) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPreviewSrc(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [previewSrc]);

  return (
    <div className="min-h-dvh bg-sky-50">
      <MarketingNavbar />
      <main className="pt-20">
        <section className="bg-sky-50/70">
          <div className="min-h-[60vh] sm:h-[70vh] md:h-[calc(100dvh-5rem)] w-full bg-sky-100/60">
            <img
              src={aboutOAImage}
              alt="Knee OA information"
              className="h-[60vh] sm:h-[70vh] md:h-[calc(100dvh-5rem)] w-full object-contain object-center"
              decoding="async"
              loading="eager"
              fetchPriority="high"
              onClick={() => setPreviewSrc(aboutOAImage)}
            />
          </div>
        </section>

        <section className="bg-sky-50/70 py-14 sm:py-20">
          <Container>
            <div className="mx-auto max-w-4xl text-center">
              <div className="text-[11px] font-semibold tracking-[0.32em] text-sky-700/80">FOR DOCTORS</div>
              <div className="mt-5 text-h2 text-slate-900">
                Knee OA clinical overview and CiploStem handling essentials
              </div>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-600">
                Use this page as a quick reference for patient selection, preparation workflow, and post-injection precautions. Always follow
                your hospital protocols and the approved prescribing information.
              </p>
            </div>

            <div className="mx-auto mt-10 grid max-w-6xl gap-6 md:grid-cols-2">
              {[
                {
                  title: "Patient selection (quick)",
                  items: [
                    "Knee osteoarthritis assessment and grading as per clinical judgement",
                    "Review comorbidities and medications",
                    "Set expectations: symptom control + functional improvement",
                    "Counsel on activity modification and rehab plan",
                  ],
                },
                {
                  title: "Clinic checklist",
                  items: [
                    "Verify cold-chain and storage logs",
                    "Confirm identity, consent, and procedure plan",
                    "Aseptic technique and intra-articular injection readiness",
                    "Observation plan and post-care instructions",
                  ],
                },
                {
                  title: "Documentation",
                  items: [
                    "Record baseline pain/function and imaging notes",
                    "Procedure details and any immediate reactions",
                    "Follow-up schedule and rehab guidance",
                    "Adverse event reporting as per policy",
                  ],
                },
                {
                  title: "Safety reminders",
                  items: [
                    "Follow physician discretion and institutional SOPs",
                    "Avoid non-prescribed medicines post-procedure",
                    "Counsel on red flags: fever, severe swelling, worsening pain",
                    "Ensure patients understand do’s/don’ts and timelines",
                  ],
                },
              ].map((card) => (
                <div
                  key={card.title}
                  className="rounded-[28px] bg-white/90 p-7 ring-1 ring-sky-200/60 shadow-soft-xl"
                >
                  <div className="text-lg font-semibold text-slate-900">{card.title}</div>
                  <div className="mt-5 space-y-2 text-sm text-slate-700">
                    {card.items.map((x) => (
                      <div key={x} className="flex items-start gap-3">
                        <div className="mt-1.5 h-2 w-2 rounded-full bg-sky-600" />
                        <div className="min-w-0">{x}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        <section className="bg-sky-50/70 py-14 sm:py-20">
          <Container>
            <div className="grid items-start gap-10 lg:grid-cols-[1fr_520px]">
              <div>
                <div className="text-h2 text-slate-900">
                  Getting ready for CiploStem injection
                </div>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-600">
                  Example workflow steps that match typical handling patterns. Adapt to your hospital protocol and product labeling.
                </p>

                <div className="mt-8 grid gap-6 sm:grid-cols-2">
                  {[
                    { title: "Admission planning", text: "Coordinate admission/discharge and confirm procedure plan." },
                    { title: "Cold chain logistics", text: "Maintain validated cold chain from receipt to preparation." },
                    { title: "Handling readiness", text: "Use appropriate PPE and follow aseptic preparation steps." },
                    { title: "Identity & documentation", text: "Verify patient, consent, and product identifiers." },
                    { title: "Preparation steps", text: "Thaw/prepare per labeling and institutional SOPs." },
                    { title: "Injection setup", text: "Ensure intra-articular technique readiness and monitoring." },
                  ].map((x) => (
                    <div key={x.title} className="rounded-[24px] bg-sky-50/60 p-6 ring-1 ring-sky-100">
                      <div className="text-sm font-semibold text-slate-900">{x.title}</div>
                      <div className="mt-2 text-sm leading-relaxed text-slate-600">{x.text}</div>
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="button"
                className="rounded-[28px] bg-white/90 p-6 text-left ring-1 ring-sky-200/60 shadow-soft-xl lg:sticky lg:top-28"
                onClick={() => setPreviewSrc(ciploPreparationImage)}
              >
                <div className="text-lg font-semibold text-slate-900">How CiploStem is prepared</div>
                <div className="mt-1 text-xs text-slate-600">Preparation workflow overview and key quality checks</div>
                <div className="mt-4 overflow-hidden rounded-[22px] bg-white ring-1 ring-sky-200/60">
                  <img
                    src={ciploPreparationImage}
                    alt="CiploStem preparation"
                    className="h-auto w-full object-contain"
                    decoding="async"
                    loading="eager"
                    fetchPriority="high"
                  />
                </div>
              </button>
            </div>
          </Container>
        </section>
      </main>
      <Footer />

      {previewSrc ? (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-slate-950/70 px-4 py-6"
          onClick={() => setPreviewSrc(null)}
        >
          <div className="max-h-[92vh] max-w-[95vw] overflow-hidden rounded-2xl bg-white shadow-soft-xl">
            <img src={previewSrc} alt={previewAlt} className="max-h-[92vh] w-auto max-w-[95vw] object-contain" />
          </div>
        </div>
      ) : null}
    </div>
  );
}
