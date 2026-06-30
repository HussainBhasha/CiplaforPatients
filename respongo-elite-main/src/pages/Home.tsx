import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Stethoscope, User } from "lucide-react";
import { cn } from "@/lib/utils";
import IntroVideoOverlay from "@/components/media/IntroVideoOverlay";
import Container from "@/components/ui/Container";
import introVideo from "@/assets/introvideo.mp4";
import patientImage from "@/assets/patient.png";
import doctorImage from "@/assets/doctor.png";
import ciplaLogo from "@/assets/Cipla_logo.svg.png";

export default function Home() {
  const navigate = useNavigate();
  const storageKey = useMemo(() => "ciplostem:introPlayed", []);
  const welcomeKey = useMemo(() => "ciplostem:welcomeGate", []);
  const [introDone, setIntroDone] = useState(() => {
    try {
      return sessionStorage.getItem(storageKey) === "1";
    } catch {
      return false;
    }
  });
  const [welcomeDone, setWelcomeDone] = useState(() => {
    try {
      return sessionStorage.getItem(welcomeKey) === "1";
    } catch {
      return false;
    }
  });
  const [welcomeMounted, setWelcomeMounted] = useState(false);
  const [doctorModalOpen, setDoctorModalOpen] = useState(false);
  const [doctorName, setDoctorName] = useState("");
  const [doctorMciCode, setDoctorMciCode] = useState("");
  const [doctorCity, setDoctorCity] = useState("");
  const [doctorPhone, setDoctorPhone] = useState("");
  const [doctorErrors, setDoctorErrors] = useState<Record<string, string>>({});

  // ALL useEffect calls first, before any conditional returns!
  useEffect(() => {
    if (introDone) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [introDone]);

  useEffect(() => {
    if (!introDone || welcomeDone) return;
    setWelcomeMounted(false);
    const t = window.setTimeout(() => setWelcomeMounted(true), 30);
    return () => window.clearTimeout(t);
  }, [introDone, welcomeDone]);

  useEffect(() => {
    if (!doctorModalOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDoctorModalOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [doctorModalOpen]);

  useEffect(() => {
    if (!doctorModalOpen) return;
    try {
      const raw = sessionStorage.getItem("ciplostem:doctorInfo");
      if (!raw) return;
      const parsed = JSON.parse(raw) as Partial<{ name: string; mciCode: string; city: string; phone: string }>;
      if (typeof parsed.name === "string") setDoctorName(parsed.name);
      if (typeof parsed.mciCode === "string") setDoctorMciCode(parsed.mciCode);
      if (typeof parsed.city === "string") setDoctorCity(parsed.city);
      if (typeof parsed.phone === "string") setDoctorPhone(parsed.phone);
    } catch {
      void 0;
    }
  }, [doctorModalOpen]);

  // If both intro and welcome are done, redirect to patient
  useEffect(() => {
    if (introDone && welcomeDone) {
      const portal = sessionStorage.getItem("ciplostem:portal");
      if (portal === "doctor") {
        navigate("/doctor");
      } else {
        navigate("/patient");
      }
    }
  }, [introDone, welcomeDone, navigate]);

  const validateDoctor = () => {
    const next: Record<string, string> = {};
    const cleanName = doctorName.trim();
    const cleanMci = doctorMciCode.trim();
    const cleanCity = doctorCity.trim();
    const digits = doctorPhone.replace(/[^\d]/g, "");

    if (cleanName.length < 2) next.name = "Enter your name.";
    
    // Updated Medical Registration Number validation
    if (!cleanMci) {
      next.mciCode = "Medical Registration Number is required.";
    } else if (!/^[A-Za-z0-9\/\-\s]{5,30}$/.test(cleanMci)) {
      next.mciCode = "Enter a valid Medical Registration Number.";
    }
    
    if (cleanCity.length < 2) next.city = "Enter your city.";
    if (digits.length !== 10) next.phone = "Enter a valid 10-digit contact number.";

    return next;
  };

  const enterPortal = (nextPortal: "patient" | "doctor", targetPath: "/patient" | "/doctor") => {
    try {
      sessionStorage.setItem(welcomeKey, "1");
      sessionStorage.setItem("ciplostem:portal", nextPortal);
    } catch {
      void 0;
    }
    setWelcomeDone(true);
    navigate(targetPath);
  };

  if (!introDone) {
    return (
      <IntroVideoOverlay
        src={introVideo}
        onDone={() => {
          try {
            sessionStorage.setItem(storageKey, "1");
          } catch {
            void 0;
          }
          setIntroDone(true);
        }}
      />
    );
  }

  if (!welcomeDone) {
    const submitDoctor = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const nextErrors = validateDoctor();
      if (Object.keys(nextErrors).length > 0) {
        setDoctorErrors(nextErrors);
        return;
      }

      const payload = {
        name: doctorName.trim(),
        mciCode: doctorMciCode.trim(),
        city: doctorCity.trim(),
        phone: doctorPhone.trim(),
        at: Date.now(),
      };

      try {
        sessionStorage.setItem("ciplostem:doctorInfo", JSON.stringify(payload));
      } catch {
        void 0;
      }

      setDoctorErrors({});
      setDoctorModalOpen(false);
      enterPortal("doctor", "/doctor");
    };

    return (
      <main className="relative min-h-dvh bg-sky-50 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_circle_at_50%_0%,rgba(56,189,248,0.22),transparent_60%)]" />
        <div className="pointer-events-none absolute -left-32 top-12 h-[420px] w-[420px] rounded-full bg-sky-400/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 bottom-10 h-[520px] w-[520px] rounded-full bg-blue-500/10 blur-3xl" />

        <div className="absolute top-4 sm:top-6 left-0 sm:top-8 pl-3 sm:pl-6 lg:pl-8 z-20">
          <img
            src={ciplaLogo}
            alt="Cipla"
            className="h-8 sm:h-10 md:h-12 lg:h-14 w-auto object-contain object-left"
            decoding="async"
            loading="eager"
          />
        </div>
        <Container>
          <div className="relative min-h-dvh flex flex-col items-center justify-center pt-20 pb-12">
            <div
              className={cn(
                "flex flex-col items-center text-center transition-all duration-700",
                welcomeMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
              )}
            >
              <div className="mt-8 sm:mt-12 font-display text-3xl sm:text-4xl md:text-5xl font-semibold tracking-[-0.04em] text-slate-900">
                Welcome to <span className="text-[#2f5fbf]">next step</span> in <span className="text-[#55c2c6]">Knee OA Management</span>
              </div>
              <div className="mt-2 sm:mt-3 text-xs sm:text-sm md:text-base text-slate-600">
                Choose your pathway
              </div>
            </div>

            <div className="mt-6 sm:mt-10 grid w-full max-w-5xl gap-4 sm:gap-6 md:grid-cols-2">
              <button
                type="button"
                onClick={() => enterPortal("patient", "/patient")}
                className={cn(
                  "group relative overflow-hidden rounded-[20px] sm:rounded-[28px] min-h-[320px] sm:min-h-[480px] text-left ring-1 ring-sky-200/70 shadow-soft-xl transition-all duration-500",
                  "hover:-translate-y-1 hover:scale-[1.02] hover:ring-2 hover:ring-sky-500/60 hover:shadow-[0_26px_80px_rgba(2,8,23,0.12)] active:translate-y-0",
                  welcomeMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
                )}
                style={{ transitionDelay: welcomeMounted ? "120ms" : "0ms" }}
              >
                <img 
                  src={patientImage} 
                  alt="Patient" 
                  className="absolute inset-0 h-full w-full object-cover object-right will-change-auto"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />
                <div className="absolute inset-0 bg-[radial-gradient(600px_circle_at_30%_0%,rgba(56,189,248,0.26),transparent_55%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative h-full flex flex-col justify-end p-8">
                  <div className="flex items-center gap-3">
                    <div className="grid h-12 w-12 place-items-center rounded-2xl bg-sky-600 text-white shadow-button">
                      <User className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="text-2xl font-semibold text-white">Patient</div>
                      <div className="mt-0.5 text-sm text-slate-200">Symptoms, assessment, care guidance</div>
                    </div>
                  </div>
                  <div className="mt-6 text-sm leading-relaxed text-slate-200">
                    Explore disease information, take a quick knee OA self-test, and review post-injection precautions.
                  </div>
                  <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-sky-300">
                    Continue <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setDoctorModalOpen(true)}
                className={cn(
                  "group relative overflow-hidden rounded-[20px] sm:rounded-[28px] min-h-[320px] sm:min-h-[480px] text-left ring-1 ring-blue-200/70 shadow-soft-xl transition-all duration-500",
                  "hover:-translate-y-1 hover:scale-[1.02] hover:ring-2 hover:ring-blue-500/55 hover:shadow-[0_26px_80px_rgba(2,8,23,0.12)] active:translate-y-0",
                  welcomeMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
                )}
                style={{ transitionDelay: welcomeMounted ? "220ms" : "0ms" }}
              >
                <img 
                  src={doctorImage} 
                  alt="Doctor" 
                  className="absolute inset-0 h-full w-full object-cover object-right will-change-auto"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />
                <div className="absolute inset-0 bg-[radial-gradient(600px_circle_at_30%_0%,rgba(59,130,246,0.22),transparent_55%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative h-full flex flex-col justify-end p-8">
                  <div className="flex items-center gap-3">
                    <div className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-600 text-white shadow-button">
                      <Stethoscope className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="text-2xl font-semibold text-white">Doctor</div>
                      <div className="mt-0.5 text-sm text-slate-200">Clinical overview, handling essentials</div>
                    </div>
                  </div>
                  <div className="mt-6 text-sm leading-relaxed text-slate-200">
                    View a quick reference for patient selection, preparation workflow, and key safety reminders.
                  </div>
                  <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-300">
                    Continue <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </Container>

        {doctorModalOpen ? (
          <div className="fixed inset-0 z-[60] grid place-items-center bg-slate-950/60 px-4 py-6">
            <div className="w-full max-w-lg overflow-hidden rounded-[28px] bg-white shadow-soft-xl ring-1 ring-sky-200/60">
              <div className="p-7 sm:p-8">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="text-[11px] font-semibold tracking-[0.32em] text-sky-700/80">DOCTOR ACCESS</div>
                    <div className="mt-3 text-2xl font-semibold tracking-[-0.02em] text-slate-900">Enter details to continue</div>
                    <div className="mt-2 text-sm text-slate-600">This information is used only to validate access.</div>
                  </div>
                  <button
                    type="button"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-50 ring-1 ring-slate-200 text-slate-700 transition hover:bg-slate-100"
                    onClick={() => setDoctorModalOpen(false)}
                    aria-label="Close"
                  >
                    ✕
                  </button>
                </div>

                <form className="mt-6 grid gap-4" onSubmit={submitDoctor}>
                  <div>
                    <div className="text-xs font-semibold text-slate-700">Name</div>
                    <input
                      value={doctorName}
                      onChange={(e) => {
                        setDoctorName(e.target.value);
                        setDoctorErrors((p) => ({ ...p, name: "" }));
                      }}
                      className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
                      placeholder="Enter your name"
                    />
                    {doctorErrors.name ? <div className="mt-2 text-xs text-rose-600">{doctorErrors.name}</div> : null}
                  </div>

                  <div>
                    <div className="text-xs font-semibold text-slate-700">Medical Registration Number</div>
                    <input
                      value={doctorMciCode}
                      onChange={(e) => {
                        setDoctorMciCode(e.target.value);
                        setDoctorErrors((p) => ({ ...p, mciCode: "" }));
                      }}
                      className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
                      placeholder="APMC/FMR/12345"
                    />
                    {doctorErrors.mciCode ? <div className="mt-2 text-xs text-rose-600">{doctorErrors.mciCode}</div> : null}
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <div className="text-xs font-semibold text-slate-700">City</div>
                      <input
                        value={doctorCity}
                        onChange={(e) => {
                          setDoctorCity(e.target.value);
                          setDoctorErrors((p) => ({ ...p, city: "" }));
                        }}
                        className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
                        placeholder="Enter city"
                      />
                      {doctorErrors.city ? <div className="mt-2 text-xs text-rose-600">{doctorErrors.city}</div> : null}
                    </div>

                    <div>
                      <div className="text-xs font-semibold text-slate-700">Contact number</div>
                      <input
                        value={doctorPhone}
                        onChange={(e) => {
                          setDoctorPhone(e.target.value);
                          setDoctorErrors((p) => ({ ...p, phone: "" }));
                        }}
                        inputMode="numeric"
                        className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
                        placeholder="10-digit number"
                      />
                      {doctorErrors.phone ? <div className="mt-2 text-xs text-rose-600">{doctorErrors.phone}</div> : null}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-sky-600 to-sky-400 px-5 py-3 text-sm font-semibold text-white shadow-button hover:brightness-110 transition"
                  >
                    Continue
                  </button>
                </form>
              </div>
            </div>
          </div>
        ) : null}
      </main>
    );
  }

  return null;
}
