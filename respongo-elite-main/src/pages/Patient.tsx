import Container from "@/components/ui/Container";
import MarketingNavbar from "@/components/layout/MarketingNavbar";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";
import heroImage from "@/assets/ciplostem2.png";
import postInjectionImage from "@/assets/postinjection.png";
import { Activity, ArrowRight, BadgeCheck, CheckCircle2, ClipboardList, Pill, Stethoscope } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const symptoms = [
  {
    title: "Joint pain",
    text: "Pain from deep within the joint; worse with use, better with rest.",
  },
  {
    title: "Stiffness",
    text: "Limited range of motion and a sensation of the joint freezing.",
  },
  {
    title: "Swelling & warmth",
    text: "Response to cartilage damage and irritation.",
  },
  {
    title: "Cracking sounds",
    text: "Crunching when moving, due to roughened cartilage.",
  },
];

const grades = [
  { k: "Grade I", title: "Mild changes", text: "Early cartilage irritation with minimal pain." },
  { k: "Grade II", title: "Moderate changes", text: "Cartilage damage begins; pain may increase with activity." },
  { k: "Grade III", title: "Advanced changes", text: "Noticeable cartilage loss and inflammation; mobility reduces." },
  { k: "Grade IV", title: "Severe changes", text: "Joint-space narrowing; significant pain and stiffness." },
];

const journey = [
  { icon: <Pill className="h-7 w-7" />, title: "Self-help", text: "Simple painkillers, external applications, supplements" },
  {
    icon: <ClipboardList className="h-7 w-7" />,
    title: "Information and advice",
    text: "Education, weight loss, exercise, lifestyle changes",
  },
  {
    icon: <Activity className="h-7 w-7" />,
    title: "Simple non-surgical options",
    text: "Prescribed oral painkillers, physiotherapy, supporting devices",
  },
  {
    icon: <Stethoscope className="h-7 w-7" />,
    title: "Advanced non-surgical options",
    text: "Intra articular injections",
  },
  {
    icon: <BadgeCheck className="h-7 w-7" />,
    title: "Surgical options",
    text: "Repair/partial or total joint replacement",
  },
];

export default function Patient() {
  const [step, setStep] = useState(1);
  const totalSteps = 4;
  const [frequency, setFrequency] = useState<string | null>(null);
  const [pain, setPain] = useState(5);
  const [stiffness, setStiffness] = useState<string | null>(null);
  const [swelling, setSwelling] = useState<string | null>(null);
  const [cracking, setCracking] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [result, setResult] = useState<{ score: number; max: number; label: string } | null>(null);
  const [postPreviewOpen, setPostPreviewOpen] = useState(false);

  useEffect(() => {
    if (!postPreviewOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPostPreviewOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [postPreviewOpen]);

  const percent = useMemo(() => Math.round((step / totalSteps) * 100), [step]);

  const scoreMax = 22;

  const calcScore = () => {
    const freqScore =
      frequency === "Daily"
        ? 3
        : frequency === "Several times a week"
          ? 2
          : frequency === "Occasionally"
            ? 1
            : 0;
    const stiffScore =
      stiffness === "Severe" ? 3 : stiffness === "Moderate" ? 2 : stiffness === "Mild" ? 1 : 0;
    const swellScore =
      swelling === "Constant" ? 3 : swelling === "Frequent" ? 2 : swelling === "Occasional" ? 1 : 0;
    const crackScore =
      cracking === "Always" ? 3 : cracking === "Often" ? 2 : cracking === "Sometimes" ? 1 : 0;
    const total = freqScore + pain + stiffScore + swellScore + crackScore;
    const label = total <= 7 ? "Low" : total <= 14 ? "Moderate" : "High";
    return { total, label };
  };

  const validate = (targetStep: number) => {
    const nextErrors: Record<string, string> = {};
    if (targetStep >= 1) {
      if (!frequency) nextErrors.frequency = "Select one option to continue.";
    }
    if (targetStep >= 3) {
      if (!stiffness) nextErrors.stiffness = "Select stiffness to continue.";
      if (!swelling) nextErrors.swelling = "Select swelling to continue.";
    }
    if (targetStep >= 4) {
      if (!cracking) nextErrors.cracking = "Select one option to continue.";
      if (!name.trim()) nextErrors.name = "Name is required.";
      const ageNum = Number(age);
      if (!age.trim() || !Number.isFinite(ageNum) || ageNum < 1 || ageNum > 120) nextErrors.age = "Enter a valid age.";
      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
      if (!emailOk) nextErrors.email = "Enter a valid email.";
    }
    return nextErrors;
  };

  const goNext = () => {
    const nextErrors = validate(step);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }
    setErrors({});
    setStep((s) => Math.min(totalSteps, s + 1));
  };

  const goBack = () => {
    setErrors({});
    setStep((s) => Math.max(1, s - 1));
  };

  const submit = () => {
    const nextErrors = validate(4);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }
    const { total, label } = calcScore();
    setResult({ score: total, max: scoreMax, label });
  };

  const reset = () => {
    setResult(null);
    setStep(1);
    setFrequency(null);
    setPain(5);
    setStiffness(null);
    setSwelling(null);
    setCracking(null);
    setName("");
    setAge("");
    setEmail("");
    setErrors({});
  };

  return (
    <div className="min-h-dvh bg-sky-50">
      <MarketingNavbar />
      <main className="pt-24">
        <section className="bg-sky-50/70">
          <Container>
            <div className="grid items-center gap-10 py-14 md:grid-cols-2 md:py-20">
              <div>
                <div className="text-[11px] font-semibold tracking-[0.32em] text-sky-700/80">FOR PATIENTS</div>
                <div className="mt-5 font-display text-5xl font-semibold leading-[1.03] tracking-[-0.04em] text-slate-900 sm:text-6xl">
                  Disease information & your treatment{" "}
                  <span className="bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">journey</span>.
                </div>
                <p className="mt-5 max-w-xl text-sm leading-relaxed text-slate-600">
                  The prevalence of knee OA in India is nearly 30%. Knowing the signs early lets you act before joint damage becomes severe.
                </p>
                <div className="mt-7">
                  <Button
                    onClick={() => {
                      const el = document.getElementById("assessment");
                      el?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }}
                  >
                    Take Knee OA Self-Test <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="relative overflow-hidden border border-slate-200 bg-white">
                <img src={heroImage} alt="Patients walking" className="h-[360px] w-full object-cover sm:h-[460px]" />
              </div>
            </div>
          </Container>
        </section>

        <section className="py-14 sm:py-20">
          <Container>
            <div className="rounded-[32px] bg-sky-50/80 p-8 ring-1 ring-sky-200/60 shadow-soft-xl sm:p-10">
              <div className="font-display text-5xl font-semibold tracking-[-0.03em] text-slate-900 sm:text-6xl">
                Key Benefits
              </div>

              <div className="mt-10 grid gap-6 md:grid-cols-2">
                {[
                  "Accelerated bone healing",
                  "Reduced recovery time",
                  "Minimal invasive procedure",
                  "Natural regeneration process",
                  "Clinically proven results",
                  "FDA approved therapy",
                ].map((x) => (
                  <div
                    key={x}
                    className="flex items-center gap-4 rounded-[22px] bg-sky-100/60 p-7 ring-1 ring-sky-200/60"
                  >
                    <CheckCircle2 className="h-7 w-7 flex-none text-emerald-600" />
                    <div className="text-xl font-semibold text-slate-900">{x}</div>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>

        <section className="py-14 sm:py-20">
          <Container>
            <div className="text-center">
              <div className="font-display text-4xl font-semibold tracking-[-0.03em] text-slate-900 sm:text-5xl">
                Signs & symptoms
              </div>
            </div>

            <div className="mx-auto mt-10 grid max-w-6xl gap-6 md:grid-cols-2">
              {symptoms.map((s) => (
                <div key={s.title} className="rounded-[28px] bg-white/90 p-7 ring-1 ring-sky-200/60 shadow-soft-xl">
                  <div className="flex items-start gap-4">
                    <div className="grid h-14 w-14 place-items-center rounded-2xl bg-sky-50 ring-1 ring-sky-100">
                      <div className="grid h-8 w-8 place-items-center rounded-xl bg-white ring-1 ring-sky-200/60">
                        <div className="h-3 w-3 rounded-full bg-sky-700" />
                      </div>
                    </div>
                    <div className="min-w-0">
                      <div className="text-xl font-semibold text-slate-900">{s.title}</div>
                      <div className="mt-2 text-sm leading-relaxed text-slate-600">{s.text}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        <section className="bg-sky-50/60 py-14 sm:py-20">
          <Container>
            <div className="text-left">
              <div className="text-sm font-semibold text-sky-700">You just can’t afford to ignore it</div>
              <div className="mt-1 text-sm text-slate-600">
                If you ignore knee OA, it could progress from grade I to grade IV, the latter being the most severe in terms of joint damage.
              </div>
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {grades.map((g) => (
                <div key={g.k} className="rounded-[26px] bg-white/90 p-6 ring-1 ring-sky-200/70 shadow-soft-xl">
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">{g.k}</div>
                  <div className="mt-2 text-base font-semibold text-slate-900">{g.title}</div>
                  <div className="mt-2 text-sm text-slate-600">{g.text}</div>
                </div>
              ))}
            </div>

            <div className="mt-10 text-center text-sm text-slate-600">Progression of Knee OA from Grade I to Grade IV</div>
          </Container>
        </section>

        <section className="py-14 sm:py-20">
          <Container>
            <div className="text-center">
              <div className="text-h2 text-slate-900">
                This is what your OA treatment journey could look like
              </div>
            </div>

            <div className="mx-auto mt-10 max-w-6xl">
              <div className="hidden items-center justify-between gap-6 lg:flex">
                <div className="text-sm font-semibold text-slate-900">Mild OA</div>
                <div className="h-px flex-1 bg-slate-200" />
                <div className="text-sm font-semibold text-slate-900">Disease Progression</div>
                <div className="h-px flex-1 bg-slate-200" />
                <div className="text-sm font-semibold text-slate-900">Severe OA</div>
              </div>

              <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-5">
                {journey.map((j) => (
                  <div
                    key={j.title}
                    className="border-t border-slate-200 pt-6 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-6 lg:first:border-l-0 lg:first:pl-0"
                  >
                    <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-sky-50 text-sky-700 ring-1 ring-sky-100">
                      {j.icon}
                    </div>
                    <div className="mt-4 text-center text-base font-semibold text-slate-900">{j.title}</div>
                    <div className="mt-2 text-center text-sm leading-relaxed text-slate-600">{j.text}</div>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>

        <section className="bg-sky-50/70 py-14 sm:py-20">
          <Container>
            <div className="grid items-stretch gap-10 lg:grid-cols-2">
              <button
                type="button"
                className="flex h-full items-center justify-center overflow-hidden border border-slate-200 bg-sky-100/70"
                onClick={() => setPostPreviewOpen(true)}
              >
                <img
                  src={postInjectionImage}
                  alt="Post injection precautions"
                  className="h-full w-full object-contain"
                  decoding="async"
                  loading="eager"
                  fetchPriority="high"
                />
              </button>

              <div className="h-full">
                <div className="font-display text-3xl font-semibold tracking-[-0.03em] text-sky-700 sm:text-4xl">
                  Post-injection care precautions
                </div>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-sky-700/70">
                  Follow your doctor’s instructions. These are general do’s and don’ts to help protect the treated area and support recovery.
                </p>

                <div className="mt-8 space-y-10">
                  <div className="border-t border-slate-200 pt-8">
                    <div className="text-sm font-semibold text-sky-800">0–3 days</div>
                    <div className="mt-5 grid gap-8 sm:grid-cols-2">
                      <div>
                        <div className="text-sm font-semibold text-emerald-800">Do’s</div>
                        <div className="mt-3 space-y-2 text-sm text-slate-700">
                          {[
                            "Rest for 24 hours (except washroom breaks)",
                            "Use only a cold pack if needed",
                            "Take a lukewarm bath after 24 hours",
                            "Stay hydrated and eat healthy",
                          ].map((x) => (
                            <div key={x} className="flex items-start gap-3">
                              <div className="mt-1.5 h-2 w-2 flex-none rounded-full bg-emerald-600" />
                              <div className="min-w-0">{x}</div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <div className="text-sm font-semibold text-rose-800">Don’ts</div>
                        <div className="mt-3 space-y-2 text-sm text-slate-700">
                          {[
                            "Avoid overstraining/weight-bearing early",
                            "Do not take medicines unless prescribed",
                            "Avoid massage or hot pack on the area",
                            "Avoid very hot baths",
                          ].map((x) => (
                            <div key={x} className="flex items-start gap-3">
                              <div className="mt-1.5 h-2 w-2 flex-none rounded-full bg-rose-600" />
                              <div className="min-w-0">{x}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-slate-200 pt-8">
                    <div className="text-sm font-semibold text-sky-800">3–14 days</div>
                    <div className="mt-5 grid gap-8 sm:grid-cols-2">
                      <div>
                        <div className="text-sm font-semibold text-emerald-800">Do’s</div>
                        <div className="mt-3 space-y-2 text-sm text-slate-700">
                          {["Gradually return to normal activities", "Follow rehab plan recommended by your doctor"].map((x) => (
                            <div key={x} className="flex items-start gap-3">
                              <div className="mt-1.5 h-2 w-2 flex-none rounded-full bg-emerald-600" />
                              <div className="min-w-0">{x}</div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <div className="text-sm font-semibold text-rose-800">Don’ts</div>
                        <div className="mt-3 space-y-2 text-sm text-slate-700">
                          {["Avoid smoking and alcohol (first 7 days)", "Avoid aggressive exercise unless advised"].map((x) => (
                            <div key={x} className="flex items-start gap-3">
                              <div className="mt-1.5 h-2 w-2 flex-none rounded-full bg-rose-600" />
                              <div className="min-w-0">{x}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 border-l-4 border-sky-200 pl-4 text-sm text-slate-700">
                      If you have severe swelling, fever, or worsening pain, contact your doctor immediately.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {postPreviewOpen ? (
          <div
            className="fixed inset-0 z-50 grid place-items-center bg-slate-950/70 px-4 py-6"
            onClick={() => setPostPreviewOpen(false)}
          >
            <div className="max-h-[92vh] max-w-[95vw] overflow-hidden rounded-2xl bg-sky-100/70 shadow-soft-xl">
              <img
                src={postInjectionImage}
                alt="Post injection precautions"
                className="max-h-[92vh] w-auto max-w-[95vw] object-contain"
                decoding="async"
                loading="eager"
              />
            </div>
          </div>
        ) : null}

        <section id="assessment" className="bg-sky-50/60 py-14 sm:py-20">
          <Container>
            <div className="text-center">
              <div className="text-[11px] font-semibold tracking-[0.32em] text-sky-700/80">SELF-ASSESSMENT</div>
              <div className="mt-5 font-display text-4xl font-semibold tracking-[-0.03em] text-slate-900 sm:text-6xl">
                Understand your <span className="text-sky-700">knee health</span>.
              </div>
              <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-600">A 4-step quiz. Private. Takes under 2 minutes.</p>
            </div>

            <div className="mx-auto mt-10 max-w-5xl border border-slate-200 bg-white px-6 py-8 sm:px-10 sm:py-10">
              {result ? (
                <div className="text-center">
                  <div className="text-[11px] font-semibold tracking-[0.32em] text-sky-700/80">RESULT</div>
                  <div className="mt-4 font-display text-4xl font-semibold tracking-[-0.03em] text-slate-900 sm:text-5xl">
                    Assessment complete
                  </div>
                  <div className="mt-6 text-sm text-slate-600">Your score</div>
                  <div className="mt-2 font-display text-6xl font-semibold tracking-[-0.04em] text-sky-700 sm:text-7xl">
                    {result.score}
                    <span className="text-2xl text-slate-400">/{result.max}</span>
                  </div>
                  <div className="mt-4 inline-flex items-center rounded-full bg-sky-50 px-5 py-2 text-sm font-semibold text-sky-800 ring-1 ring-sky-100">
                    Risk level: {result.label}
                  </div>
                  <div className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-slate-600">
                    This result is a quick screening indicator. For medical decisions, consult an orthopedic specialist.
                  </div>
                  <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                    <Button onClick={reset}>Start again</Button>
                    <Button variant="secondary" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                      Back to top
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
                    <div>STEP {step} / {totalSteps}</div>
                    <div>{percent}%</div>
                  </div>
                  <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-100">
                    <div className="h-full bg-gradient-to-r from-sky-700 to-sky-400" style={{ width: `${percent}%` }} />
                  </div>

                  {step === 1 ? (
                    <div className="mt-10">
                      <div className="text-h2 text-slate-900">
                        How often do you experience knee pain?
                      </div>
                      <div className="mt-6 grid gap-4">
                        {["Daily", "Several times a week", "Occasionally", "Rarely"].map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => {
                              setFrequency(opt);
                              setErrors((e) => ({ ...e, frequency: "" }));
                            }}
                            className={[
                              "w-full rounded-2xl border px-6 py-5 text-left text-base font-medium transition-colors",
                              frequency === opt
                                ? "border-sky-400 bg-sky-50 text-slate-900"
                                : "border-slate-200 bg-white text-slate-800 hover:border-sky-200",
                            ].join(" ")}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                      {errors.frequency ? <div className="mt-3 text-xs text-rose-600">{errors.frequency}</div> : null}
                    </div>
                  ) : null}

                  {step === 2 ? (
                    <div className="mt-10">
                      <div className="text-h2 text-slate-900">
                        Pain intensity
                      </div>
                      <div className="mt-1 text-sm text-slate-600">0 = none, 10 = severe</div>

                      <div className="mt-10 text-center font-display text-7xl font-semibold tracking-[-0.04em] text-sky-700">
                        {pain}
                      </div>

                      <div className="mt-8">
                        <input
                          type="range"
                          min={0}
                          max={10}
                          value={pain}
                          onChange={(e) => setPain(Number(e.target.value))}
                          className="w-full accent-sky-700"
                        />
                        <div className="mt-2 flex items-center justify-between text-sm text-slate-600">
                          <div>Mild</div>
                          <div>Severe</div>
                        </div>
                      </div>
                    </div>
                  ) : null}

                  {step === 3 ? (
                    <div className="mt-10">
                      <div className="text-h2 text-slate-900">
                        Joint stiffness?
                      </div>
                      <div className="mt-5 grid gap-4 sm:grid-cols-2">
                        {["None", "Mild", "Moderate", "Severe"].map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => {
                              setStiffness(opt);
                              setErrors((e) => ({ ...e, stiffness: "" }));
                            }}
                            className={[
                              "rounded-2xl border px-6 py-4 text-center text-sm font-semibold transition-colors",
                              stiffness === opt
                                ? "border-sky-400 bg-sky-50 text-slate-900"
                                : "border-slate-200 bg-white text-slate-800 hover:border-sky-200",
                            ].join(" ")}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                      {errors.stiffness ? <div className="mt-3 text-xs text-rose-600">{errors.stiffness}</div> : null}

                      <div className="mt-10 text-h2 text-slate-900">
                        Swelling around the joint?
                      </div>
                      <div className="mt-5 grid gap-4 sm:grid-cols-2">
                        {["None", "Occasional", "Frequent", "Constant"].map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => {
                              setSwelling(opt);
                              setErrors((e) => ({ ...e, swelling: "" }));
                            }}
                            className={[
                              "rounded-2xl border px-6 py-4 text-center text-sm font-semibold transition-colors",
                              swelling === opt
                                ? "border-sky-400 bg-sky-50 text-slate-900"
                                : "border-slate-200 bg-white text-slate-800 hover:border-sky-200",
                            ].join(" ")}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                      {errors.swelling ? <div className="mt-3 text-xs text-rose-600">{errors.swelling}</div> : null}
                    </div>
                  ) : null}

                  {step === 4 ? (
                    <div className="mt-10">
                      <div className="text-h2 text-slate-900">
                        Cracking sounds when moving?
                      </div>
                      <div className="mt-5 grid gap-4 sm:grid-cols-2">
                        {["No", "Sometimes", "Often", "Always"].map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => {
                              setCracking(opt);
                              setErrors((e) => ({ ...e, cracking: "" }));
                            }}
                            className={[
                              "rounded-2xl border px-6 py-4 text-center text-sm font-semibold transition-colors",
                              cracking === opt
                                ? "border-sky-400 bg-sky-50 text-slate-900"
                                : "border-slate-200 bg-white text-slate-800 hover:border-sky-200",
                            ].join(" ")}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                      {errors.cracking ? <div className="mt-3 text-xs text-rose-600">{errors.cracking}</div> : null}

                      <div className="mt-8 border-t border-slate-200 pt-6">
                        <div className="text-sm text-slate-600">Tell us a bit about you so we can share your score.</div>
                        <div className="mt-5 grid gap-4 sm:grid-cols-2">
                          <div>
                            <input
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              placeholder="Name"
                              className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm outline-none ring-sky-200 focus:ring-2"
                            />
                            {errors.name ? <div className="mt-2 text-xs text-rose-600">{errors.name}</div> : null}
                          </div>
                          <div>
                            <input
                              value={age}
                              onChange={(e) => setAge(e.target.value)}
                              placeholder="Age"
                              inputMode="numeric"
                              className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm outline-none ring-sky-200 focus:ring-2"
                            />
                            {errors.age ? <div className="mt-2 text-xs text-rose-600">{errors.age}</div> : null}
                          </div>
                        </div>
                        <div className="mt-4">
                          <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            inputMode="email"
                            className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm outline-none ring-sky-200 focus:ring-2"
                          />
                          {errors.email ? <div className="mt-2 text-xs text-rose-600">{errors.email}</div> : null}
                        </div>
                      </div>
                    </div>
                  ) : null}

                  <div className="mt-10 flex items-center justify-between">
                    <Button variant="secondary" onClick={goBack} disabled={step === 1}>
                      Back
                    </Button>
                    {step === 4 ? (
                      <Button onClick={submit}>
                        See my result <ArrowRight className="h-4 w-4" />
                      </Button>
                    ) : (
                      <Button onClick={goNext}>
                        Next <ArrowRight className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </>
              )}
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  );
}
