import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type Props = {
  src: string;
  className?: string;
  poster?: string;
};

export default function HoverFullscreenVideo({ src, className, poster }: Props) {
  const inlineRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const inline = inlineRef.current;
    if (!inline) return;

    const play = async () => {
      try {
        await inline.play();
      } catch {
        void 0;
      }
    };

    play();
  }, []);

  return (
    <div className={cn("relative select-none", className)}>
      <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[36px] bg-white/45 blur-2xl" />
      <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[36px] bg-gradient-to-r from-sky-300/40 via-blue-300/25 to-sky-300/40 blur-xl" />

      <video
        ref={inlineRef}
        src={src}
        muted
        playsInline
        autoPlay
        loop
        preload="auto"
        poster={poster}
        className="relative z-10 h-full w-full rounded-[28px] object-cover bg-black/5"
      />
      <div className="pointer-events-none absolute inset-0 z-10 rounded-[28px] ring-1 ring-sky-200/60" />
    </div>
  );
}
