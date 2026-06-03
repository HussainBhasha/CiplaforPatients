import Container from "@/components/ui/Container";
import kneeAnimated from "@/assets/knee animated.mp4";

type Props = {
  stacked?: boolean;
};

export default function QualityBadgesSection({ stacked }: Props) {
  return (
    <section className={stacked ? "relative h-full" : "relative py-16 md:py-20"}>
      {stacked ? (
        <div className="grid h-full items-center gap-8 md:gap-10 grid-cols-1 md:grid-cols-2">
          <div className="relative overflow-hidden rounded-[28px] bg-white/85 ring-1 ring-sky-200/60 shadow-soft-xl">
            <div className="relative w-full aspect-[4/3] bg-sky-50">
              <video
                src={kneeAnimated}
                muted
                playsInline
                autoPlay
                loop
                preload="auto"
                className="absolute inset-0 h-full w-full object-contain"
              />
            </div>
          </div>

          <div className="text-center md:text-left">
            <div className="font-display text-5xl font-semibold tracking-[-0.03em] text-sky-700 sm:text-6xl">
              Knee Regeneration
            </div>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-600 md:mx-0">
              A clear visual pathway showing how CiploStem supports joint recovery—designed to feel modern, clinical, and premium.
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {[
                { k: "Targeted delivery", v: "Precise joint focus" },
                { k: "Cell signaling", v: "Repair activation" },
                { k: "Reduced inflammation", v: "Comfort support" },
                { k: "Mobility outcomes", v: "Function improvement" },
              ].map((x) => (
                <div key={x.k} className="rounded-2xl bg-white/85 p-4 ring-1 ring-sky-200/60 shadow-soft-xl">
                  <div className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">{x.k}</div>
                  <div className="mt-1 text-sm font-semibold text-slate-900">{x.v}</div>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl bg-sky-50 p-4 ring-1 ring-sky-100 text-xs text-slate-600">
              Note: Visual representation for education. Clinical outcomes vary by case and eligibility.
            </div>
          </div>
        </div>
      ) : (
        <Container>
          <div className="grid items-center gap-8 md:gap-10 grid-cols-1 md:grid-cols-2">
            <div className="relative overflow-hidden rounded-[28px] bg-white/85 ring-1 ring-sky-200/60 shadow-soft-xl">
              <div className="relative w-full aspect-[4/3] bg-sky-50">
                <video
                  src={kneeAnimated}
                  muted
                  playsInline
                  autoPlay
                  loop
                  preload="auto"
                  className="absolute inset-0 h-full w-full object-contain"
                />
              </div>
            </div>

            <div className="text-center md:text-left">
              <div className="font-display text-5xl font-semibold tracking-[-0.03em] text-sky-700 sm:text-6xl">
                Knee Regeneration
              </div>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-600 md:mx-0">
                A clear visual pathway showing how CiploStem supports joint recovery—designed to feel modern, clinical, and premium.
              </p>

              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {[
                  { k: "Targeted delivery", v: "Precise joint focus" },
                  { k: "Cell signaling", v: "Repair activation" },
                  { k: "Reduced inflammation", v: "Comfort support" },
                  { k: "Mobility outcomes", v: "Function improvement" },
                ].map((x) => (
                  <div key={x.k} className="rounded-2xl bg-white/85 p-4 ring-1 ring-sky-200/60 shadow-soft-xl">
                    <div className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">{x.k}</div>
                    <div className="mt-1 text-sm font-semibold text-slate-900">{x.v}</div>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-2xl bg-sky-50 p-4 ring-1 ring-sky-100 text-xs text-slate-600">
                Note: Visual representation for education. Clinical outcomes vary by case and eligibility.
              </div>
            </div>
          </div>
        </Container>
      )}
    </section>
  );
}
