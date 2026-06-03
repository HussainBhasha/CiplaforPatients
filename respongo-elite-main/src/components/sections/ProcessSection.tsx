import { Droplet, Cpu, HeartPulse, Sparkles } from "lucide-react";
import Container from "@/components/ui/Container";

const steps = [
  {
    n: 1,
    title: "Cell Extraction",
    text: "Carefully extracted mesenchymal stem cells from premium sources ensuring maximum viability and potency.",
    icon: Droplet,
    color: "bg-sky-600",
  },
  {
    n: 2,
    title: "Cell Processing",
    text: "Advanced laboratory processing and purification using cutting-edge biotechnology for optimal quality.",
    icon: Cpu,
    color: "bg-fuchsia-600",
  },
  {
    n: 3,
    title: "Regeneration Therapy",
    text: "Precise administration of stem cells targeting damaged bone and tissue areas for regeneration.",
    icon: HeartPulse,
    color: "bg-emerald-600",
  },
  {
    n: 4,
    title: "Recovery",
    text: "Monitored healing process with accelerated tissue regeneration and enhanced recovery outcomes.",
    icon: Sparkles,
    color: "bg-orange-500",
  },
];

export default function ProcessSection() {
  return (
    <section id="assessment" className="relative py-16 md:py-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1000px_circle_at_50%_0%,rgba(56,189,248,0.16),transparent_60%)]" />
      <Container>
        <div className="text-center">
          <div className="text-h1 text-sky-700">
            Our Process
          </div>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-600">
            A scientifically advanced four-step journey from cell extraction to complete recovery
          </p>
        </div>

        <div className="relative mt-12">
          <div className="pointer-events-none absolute left-0 right-0 top-7 hidden h-[2px] bg-sky-200 sm:block" />

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.n}
                  className="relative rounded-2xl bg-white/85 p-6 ring-1 ring-sky-200/60 shadow-soft-xl"
                >
                  <div className="absolute -top-5 left-6">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-600 text-sm font-semibold text-white shadow-button">
                      {s.n}
                    </div>
                  </div>
                  <div className="mt-6 flex items-center justify-center">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${s.color}`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="mt-4 text-center text-base font-semibold text-slate-900">
                    {s.title}
                  </div>
                  <p className="mt-2 text-center text-xs leading-relaxed text-slate-600">
                    {s.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}

