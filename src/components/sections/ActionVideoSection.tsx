import { useMemo } from "react";
import Container from "@/components/ui/Container";
import HoverFullscreenVideo from "@/components/media/HoverFullscreenVideo";
import ciplostemVideo from "@/assets/ciplostem.mp4";

type Props = {
  stacked?: boolean;
};

export default function ActionVideoSection({ stacked }: Props) {
  const title = useMemo(() => "See CiploStem in Action", []);

  return (
    <section className={stacked ? "relative h-full" : "relative py-16 md:py-20"}>
      {stacked ? null : (
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1000px_circle_at_50%_0%,rgba(56,189,248,0.18),transparent_60%)]" />
      )}
      {stacked ? (
        <div className="flex h-full flex-col pt-3 sm:pt-6">
          <div className="text-center">
            <div className="text-h1 text-sky-700">{title}</div>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-600">
              Watch how our revolutionary stem cell therapy transforms regenerative medicine
            </p>
          </div>

          <div className="mt-8 sm:mt-10">
            <HoverFullscreenVideo
              src={ciplostemVideo}
              className="mx-auto aspect-video w-full max-w-4xl rounded-[26px]"
            />
          </div>
        </div>
      ) : (
        <Container>
          <div className="text-center">
            <div className="text-h1 text-sky-700">{title}</div>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-600">
              Watch how our revolutionary stem cell therapy transforms regenerative medicine
            </p>
          </div>

          <div className="mt-10">
            <HoverFullscreenVideo
              src={ciplostemVideo}
              className="mx-auto aspect-video w-full max-w-5xl rounded-[26px]"
            />
          </div>
        </Container>
      )}
    </section>
  );
}
