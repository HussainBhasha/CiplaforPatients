import { useEffect, useRef, useState } from "react";

type Props = {
  src: string;
  onDone: () => void;
};

export default function IntroVideoOverlay({ src, onDone }: Props) {
  const ref = useRef<HTMLVideoElement | null>(null);
  const [blocked, setBlocked] = useState(false);
  const [fadingOut, setFadingOut] = useState(false);
  const endedRef = useRef(false);

  const startFadeOut = () => {
    if (endedRef.current) return;
    endedRef.current = true;
    // Immediately unlock body scroll so interaction is responsive
    document.body.style.overflow = "";
    setFadingOut(true);
    setTimeout(onDone, 950);
  };

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const v = ref.current;
    if (v) {
      const play = async () => {
        try {
          v.currentTime = 0;
          await v.play();
        } catch {
          setBlocked(true);
        }
      };
      play();
    }

    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const handleTimeUpdate = () => {
    const v = ref.current;
    if (!v) return;
    // Seamless dissolve in the last 0.35s while the video is still in motion
    if (v.duration > 0 && v.currentTime >= v.duration - 0.35) {
      startFadeOut();
    }
  };

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-black transition-all duration-1000 ease-out ${
        fadingOut ? "opacity-0 scale-105 pointer-events-none" : "opacity-100 scale-100"
      }`}
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
        preload="auto"
        className="h-full w-full object-cover"
        onTimeUpdate={handleTimeUpdate}
        onEnded={startFadeOut}
        onError={startFadeOut}
      />

      {/* Gentle gradient vignette to blend edges cleanly */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/35" />

      {/* Skip button for quick access */}
      {!fadingOut && !blocked && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            startFadeOut();
          }}
          className="absolute bottom-6 right-6 z-10 rounded-full bg-black/40 px-4 py-1.5 text-xs font-medium text-white/90 backdrop-blur-md transition-all hover:bg-black/60 hover:text-white"
        >
          Skip
        </button>
      )}

      {blocked ? (
        <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="rounded-full bg-white/20 px-6 py-3 text-sm font-semibold text-white shadow-xl backdrop-blur-md cursor-pointer hover:bg-white/30 transition-colors">
            Tap to start
          </div>
        </div>
      ) : null}
    </div>
  );
}

