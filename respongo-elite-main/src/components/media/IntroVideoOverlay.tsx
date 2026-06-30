import { useEffect, useRef, useState } from "react";

type Props = {
  src: string;
  onDone: () => void;
};

export default function IntroVideoOverlay({ src, onDone }: Props) {
  const ref = useRef<HTMLVideoElement | null>(null);
  const [blocked, setBlocked] = useState(false);
  const [fadingOut, setFadingOut] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const play = async () => {
      try {
        v.currentTime = 0;
        await v.play();
      } catch {
        setBlocked(true);
      }
    };
    play();
  }, []);

  const handleEnd = () => {
    setFadingOut(true);
    setTimeout(onDone, 500);
  };

  return (
    <div
      className={`fixed inset-0 z-[80] bg-black transition-opacity duration-500 ${fadingOut ? "opacity-0" : "opacity-100"}`}
      onClick={() => {
        if (!blocked) return;
        const v = ref.current;
        if (!v) return;
        setBlocked(false);
        void v.play().catch(() => setBlocked(true));
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Intro video"
    >
      <video
        ref={ref}
        src={src}
        muted
        playsInline
        autoPlay
        preload="metadata"
        className="h-full w-full object-cover"
        onEnded={handleEnd}
        onError={handleEnd}
      />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/35" />

      {blocked ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="rounded-full bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur">
            Tap to play intro
          </div>
        </div>
      ) : null}
    </div>
  );
}

