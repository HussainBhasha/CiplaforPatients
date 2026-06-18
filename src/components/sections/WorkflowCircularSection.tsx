import Container from "@/components/ui/Container";
import workflowCycle from "@/assets/workflow cycle.mp4";

type Props = {
  stacked?: boolean;
};

export default function WorkflowCircularSection({ stacked }: Props) {
  return (
    <section className={stacked ? "relative h-full" : "relative py-16 md:py-20"}>
      {stacked ? null : (
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1100px_circle_at_50%_0%,rgba(56,189,248,0.16),transparent_60%)]" />
      )}
      {stacked ? (
        <div className="flex h-full flex-col justify-center">
          <div className="pt-4 text-center">
            <div className="text-h1 text-sky-700">Our Process</div>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-600">
              A step-by-step regenerative journey—from inflammation to repair—visualized as a dynamic circular flow.
            </p>
          </div>

          <div className="mt-2 flex items-center justify-center">
            <div className="relative w-full max-w-[520px] aspect-square">
              <div className="pointer-events-none absolute inset-0 rounded-full ring-2 ring-sky-200/80 shadow-soft-xl" />
              <div className="pointer-events-none absolute inset-3 rounded-full ring-1 ring-sky-200/45" />
              <div className="absolute inset-0 overflow-hidden rounded-full bg-transparent">
                <div className="absolute inset-0 p-5 sm:p-6">
                  <video
                    src={workflowCycle}
                    muted
                    playsInline
                    autoPlay
                    loop
                    preload="auto"
                    className="h-full w-full object-contain opacity-[0.92]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Container>
          <div className="text-center">
            <div className="text-h1 text-sky-700">Our Process</div>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-600">
              A step-by-step regenerative journey—from inflammation to repair—visualized as a dynamic circular flow.
            </p>
          </div>

          <div className="mt-5 grid place-items-center">
            <div className="relative w-full max-w-[920px]">
              <div className="mx-auto grid place-items-center">
                <div className="relative w-full max-w-[420px] aspect-square sm:max-w-[520px]">
                  <div className="pointer-events-none absolute inset-0 rounded-full ring-2 ring-sky-200/80 shadow-soft-xl" />
                  <div className="pointer-events-none absolute inset-3 rounded-full ring-1 ring-sky-200/45" />
                  <div className="absolute inset-0 overflow-hidden rounded-full bg-transparent">
                    <div className="absolute inset-0 p-5 sm:p-6">
                      <video
                        src={workflowCycle}
                        muted
                        playsInline
                        autoPlay
                        loop
                        preload="auto"
                        className="h-full w-full object-contain opacity-[0.92]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      )}
    </section>
  );
}
