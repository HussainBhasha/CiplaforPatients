import Container from "@/components/ui/Container";
import MarketingNavbar from "@/components/layout/MarketingNavbar";
import Footer from "@/components/layout/Footer";
import aboutImage from "@/assets/ciplostem2.png";
import aboutCiplaImage from "@/assets/about cipla.png";
import { Award, Globe, Lightbulb, Users } from "lucide-react";

const milestones = [
  {
    year: "2016",
    title: "Clinical Trials Begin",
    text: "Phase I trials in knee OA patients.",
  },
  {
    year: "2018",
    title: "Foundational Research",
    text: "Early-stage cell biology work begins in Mumbai.",
  },
  {
    year: "2020",
    title: "Phase III Success",
    text: "Pivotal trial demonstrates safety and efficacy.",
  },
  {
    year: "2022",
    title: "Regulatory Approval",
    text: "DCGI approval for knee osteoarthritis.",
  },
  {
    year: "2023",
    title: "CiploStem Launch",
    text: "Nationwide rollout to certified centers.",
  },
];

const team = [
  { name: "Dr. Aarya Sharma", role: "Lead Scientist" },
  { name: "Mr. Raj Patel", role: "Head of Operations" },
  { name: "Dr. Jian Li", role: "Medical Advisor" },
  { name: "Ms. Sara Khan", role: "Patient Relations" },
];

export default function About() {
  return (
    <div className="min-h-dvh bg-sky-50">
      <MarketingNavbar />
      <main className="pt-20">
        <section className="bg-sky-50/70">
          <div className="min-h-[60vh] sm:h-[70vh] md:h-[calc(100dvh-5rem)] w-full overflow-hidden bg-sky-100/60">
            <img
              src={aboutCiplaImage}
              alt="CiploStem overview"
              className="h-[60vh] sm:h-[70vh] md:h-[calc(100dvh-5rem)] w-full object-contain object-center"
              decoding="async"
              loading="eager"
              fetchPriority="high"
            />
          </div>
        </section>

        <section className="py-14 sm:py-20">
          <Container>
            <div className="grid items-center gap-8 md:gap-10 grid-cols-1 md:grid-cols-2">
              <div className="relative overflow-hidden rounded-[28px] bg-white ring-1 ring-sky-200/60 shadow-soft-xl">
                <img src={aboutImage} alt="CiploStem clinic" className="h-[240px] sm:h-[340px] md:h-[420px] w-full object-cover" />
              </div>

              <div>
                <div className="text-h2 text-slate-900">
                  Our Mission
                </div>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-600">
                  To bring regenerative therapies within reach of every patient suffering from joint disease — combining clinical rigor,
                  supply-chain reliability, and compassionate care.
                </p>
                <div className="mt-6 space-y-3 text-sm text-slate-700">
                  {[
                    "Standardized, off-the-shelf product",
                    "Backed by Phase III evidence",
                    "Trained orthopedic network across India",
                  ].map((x) => (
                    <div key={x} className="flex items-start gap-3">
                      <div className="mt-1.5 h-2 w-2 rounded-full bg-sky-600" />
                      <div className="min-w-0">{x}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </section>

        <section className="py-14 sm:py-20">
          <Container>
            <div className="text-center">
              <div className="text-h1 text-sky-700">
                Our Values
              </div>
              <div className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-600">
                The principles that drive our mission and innovation
              </div>
            </div>

            <div className="mx-auto mt-10 grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  title: "Excellence",
                  text: "Committed to the highest standards in stem cell research and therapy",
                  icon: <Award className="h-6 w-6 text-white" />,
                },
                {
                  title: "Innovation",
                  text: "Pioneering breakthrough solutions in regenerative medicine",
                  icon: <Lightbulb className="h-6 w-6 text-white" />,
                },
                {
                  title: "Global Impact",
                  text: "Transforming healthcare worldwide through advanced therapies",
                  icon: <Globe className="h-6 w-6 text-white" />,
                },
                {
                  title: "Patient First",
                  text: "Dedicated to improving patient outcomes and quality of life",
                  icon: <Users className="h-6 w-6 text-white" />,
                },
              ].map((v) => (
                <div key={v.title} className="rounded-[28px] bg-white/85 p-7 ring-1 ring-sky-200/60 shadow-soft-xl">
                  <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-blue-600 to-sky-400 shadow-button">
                    {v.icon}
                  </div>
                  <div className="mt-6 text-2xl font-semibold tracking-[-0.02em] text-slate-900">{v.title}</div>
                  <div className="mt-4 text-sm leading-relaxed text-slate-600">{v.text}</div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        <section className="bg-sky-50/60 py-14 sm:py-20">
          <Container>
            <div className="text-center">
              <div className="text-h2 text-slate-900">Milestones</div>
            </div>

            <div className="relative mx-auto mt-12 max-w-5xl">
              <div className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-sky-200 sm:block" />
              <div className="grid gap-8 sm:gap-10">
                {milestones.map((m, idx) => {
                  const right = idx % 2 === 1;
                  return (
                    <div key={m.year} className="grid items-center gap-4 sm:grid-cols-[1fr_32px_1fr]">
                      <div className={right ? "order-3" : "order-1"}>
                        <div className="rounded-2xl bg-white/85 p-6 ring-1 ring-sky-200/60 shadow-soft-xl">
                          <div className="text-sm font-semibold text-slate-900">{m.title}</div>
                          <div className="mt-1 text-xs text-slate-600">{m.text}</div>
                        </div>
                      </div>

                      <div className="order-2 grid place-items-center">
                        <div className="h-3.5 w-3.5 rounded-full bg-sky-600 ring-4 ring-sky-100" />
                      </div>

                      <div className={right ? "order-1 text-left sm:text-right" : "order-3 text-left"}>
                        <div className="text-h1 text-sky-700">
                          {m.year}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Container>
        </section>

        <section className="py-14 sm:py-20">
          <Container>
            <div className="text-center">
              <div className="text-h2 text-slate-900">
                Meet the Team
              </div>
            </div>

            <div className="mx-auto mt-10 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {team.map((p) => (
                <div key={p.name} className="rounded-3xl bg-white/85 p-6 text-center ring-1 ring-sky-200/60 shadow-soft-xl">
                  <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-sky-600/15 text-lg font-semibold text-sky-800">
                    {p.name.split(" ").slice(-1)[0]?.[0] ?? "C"}
                  </div>
                  <div className="mt-4 text-sm font-semibold text-slate-900">{p.name}</div>
                  <div className="mt-1 text-xs text-slate-600">{p.role}</div>
                </div>
              ))}
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  );
}
