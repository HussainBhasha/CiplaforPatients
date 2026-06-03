import { Activity, TrendingUp, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import Container from "@/components/ui/Container";
import brandLogo from "@/assets/1157 Ciplostem Logo Final.png";
import aboutCiplaVideo from "@/assets/aboutcipla.mp4";
import { useInView } from "@/hooks/useInView";
import type { ReactNode } from "react";

type Props = {
  stacked?: boolean;
};

export default function AdvancedFeaturesSection({ stacked }: Props) {
  const { ref, inView } = useInView({ threshold: 0.2, rootMargin: "0px 0px -15% 0px" });
  const active = stacked ? true : inView;

  return (
    <section
      id="about"
      ref={(node) => { ref.current = node; }}
      className={stacked ? "relative h-full" : "relative section-y"}
    >
      {stacked ? (
        <div className={cn("grid h-full gap-8 lg:gap-10 grid-cols-1 lg:grid-cols-[1.05fr_0.95fr]", "items-stretch")}>
          <div className="relative h-full">
            <div
              className={cn(
                "relative h-full overflow-hidden rounded-[26px] bg-white/80 ring-1 ring-sky-200/60 shadow-soft-xl",
                "transition-opacity duration-700",
                active ? "opacity-100" : "opacity-0",
              )}
            >
              <div className="absolute inset-0 bg-[radial-gradient(900px_circle_at_40%_0%,rgba(56,189,248,0.18),transparent_55%)]" />

              <div className="relative flex h-full flex-col p-6 md:p-7">
                <div className="absolute right-5 top-5 rounded-full bg-sky-600 px-4 py-2 text-xs font-semibold text-white shadow-button">
                  Clinically Proven
                </div>

                <div className="flex items-center gap-3">
                  <img src={brandLogo} alt="CiploStem" className="h-7 w-auto object-contain" />
                </div>

                <div className="mt-5 flex-1 overflow-hidden rounded-2xl bg-white ring-1 ring-sky-100 shadow-[0_18px_60px_rgba(2,8,23,0.08)]">
                  <div className="relative h-full min-h-[360px] w-full bg-sky-50">
                    <video
                      src={aboutCiplaVideo}
                      muted
                      playsInline
                      autoPlay
                      loop
                      preload="auto"
                      className="absolute inset-0 h-full w-full object-contain"
                    />
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between text-xs text-slate-500">
                  <div>Advanced stem cell therapy</div>
                  <div className="text-sky-700 font-semibold">CiploStem</div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex h-full flex-col">
            <div className="text-h1 text-sky-700">
              Advanced Features
            </div>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-600">
              Revolutionary stem cell therapy designed for regeneration, delivered with clarity and modern biotech confidence.
            </p>

            <div className="mt-8 grid flex-1 content-start gap-4">
              <FeatureCard
                icon={<Activity className="h-5 w-5 text-white" />}
                iconBg="bg-sky-600"
                title="Tissue Recovery"
                text="Promotes rapid tissue regeneration and repair with mesenchymal stem cells for optimal recovery outcomes."
                active={active}
                delayMs={0}
              />
              <FeatureCard
                icon={<Zap className="h-5 w-5 text-white" />}
                iconBg="bg-orange-500"
                title="Cell Regeneration"
                text="Harness the power of allogeneic stem cells to regenerate damaged tissues at the cellular level."
                active={active}
                delayMs={110}
              />
              <FeatureCard
                icon={<TrendingUp className="h-5 w-5 text-white" />}
                iconBg="bg-emerald-500"
                title="Faster Healing"
                text="Clinically proven to reduce recovery time and improve healing efficiency by up to 95%."
                active={active}
                delayMs={220}
              />
            </div>
          </div>
        </div>
      ) : (
        <Container>
          <div className={cn("grid gap-8 lg:gap-10 grid-cols-1 lg:grid-cols-[1.05fr_0.95fr]", "items-stretch")}>
          <div className="relative h-full">
            <div
              className={cn(
                "relative h-full overflow-hidden rounded-[26px] bg-white/80 ring-1 ring-sky-200/60 shadow-soft-xl",
                "transition-opacity duration-700",
                active ? "opacity-100" : "opacity-0",
              )}
            >
              <div className="absolute inset-0 bg-[radial-gradient(900px_circle_at_40%_0%,rgba(56,189,248,0.18),transparent_55%)]" />

              <div className="relative flex h-full flex-col p-6 md:p-7">
                <div className="absolute right-5 top-5 rounded-full bg-sky-600 px-4 py-2 text-xs font-semibold text-white shadow-button">
                  Clinically Proven
                </div>

                <div className="flex items-center gap-3">
                  <img src={brandLogo} alt="CiploStem" className="h-7 w-auto object-contain" />
                </div>

                <div className="mt-5 flex-1 overflow-hidden rounded-2xl bg-white ring-1 ring-sky-100 shadow-[0_18px_60px_rgba(2,8,23,0.08)]">
                  <div className="relative h-full min-h-[360px] w-full bg-sky-50">
                    <video
                      src={aboutCiplaVideo}
                      muted
                      playsInline
                      autoPlay
                      loop
                      preload="auto"
                      className="absolute inset-0 h-full w-full object-contain"
                    />
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between text-xs text-slate-500">
                  <div>Advanced stem cell therapy</div>
                  <div className="text-sky-700 font-semibold">CiploStem</div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex h-full flex-col">
            <div className="text-h1 text-sky-700">
              Advanced Features
            </div>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-600">
              Revolutionary stem cell therapy designed for regeneration, delivered with clarity and modern biotech confidence.
            </p>

            <div className="mt-8 grid flex-1 content-start gap-4">
              <FeatureCard
                icon={<Activity className="h-5 w-5 text-white" />}
                iconBg="bg-sky-600"
                title="Tissue Recovery"
                text="Promotes rapid tissue regeneration and repair with mesenchymal stem cells for optimal recovery outcomes."
                active={active}
                delayMs={0}
              />
              <FeatureCard
                icon={<Zap className="h-5 w-5 text-white" />}
                iconBg="bg-orange-500"
                title="Cell Regeneration"
                text="Harness the power of allogeneic stem cells to regenerate damaged tissues at the cellular level."
                active={active}
                delayMs={110}
              />
              <FeatureCard
                icon={<TrendingUp className="h-5 w-5 text-white" />}
                iconBg="bg-emerald-500"
                title="Faster Healing"
                text="Clinically proven to reduce recovery time and improve healing efficiency by up to 95%."
                active={active}
                delayMs={220}
              />
            </div>
          </div>
        </div>
        </Container>
      )}
    </section>
  );
}

function FeatureCard({
  icon,
  iconBg,
  title,
  text,
  active,
  delayMs,
}: {
  icon: ReactNode;
  iconBg: string;
  title: string;
  text: string;
  active: boolean;
  delayMs: number;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl bg-white/80 ring-1 ring-sky-200/60 shadow-soft-xl",
        "transition-opacity duration-700",
        active ? "opacity-100" : "opacity-0",
      )}
      style={{ transitionDelay: `${delayMs}ms` }}
    >
      <div className="flex items-start gap-4 p-5">
        <div className={cn("flex h-11 w-11 items-center justify-center rounded-2xl", iconBg)}>{icon}</div>
        <div className="min-w-0">
          <div className="text-base font-semibold text-slate-900">{title}</div>
          <div className="mt-1 text-sm leading-relaxed text-slate-600">{text}</div>
        </div>
      </div>
    </div>
  );
}
