import { useEffect, useMemo, useState } from "react";
import Patient from "@/pages/Patient";
import IntroVideoOverlay from "@/components/media/IntroVideoOverlay";
import introVideo from "@/assets/Knee Joint Treatment 3sec.mp4";

export default function Home() {
  const storageKey = useMemo(() => "ciplostem:introPlayed", []);
  const [introDone, setIntroDone] = useState(() => {
    try {
      return sessionStorage.getItem(storageKey) === "1";
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      sessionStorage.setItem("ciplostem:portal", "patient");
      sessionStorage.setItem("ciplostem:welcomeGate", "1");
    } catch {
      void 0;
    }
  }, []);

  const handleIntroDone = () => {
    try {
      sessionStorage.setItem(storageKey, "1");
    } catch {
      void 0;
    }
    setIntroDone(true);
    try {
      window.history.replaceState(null, "", "/patient");
    } catch {
      void 0;
    }
  };

  return (
    <div className="relative">
      <Patient />
      {!introDone && (
        <IntroVideoOverlay
          src={introVideo}
          onDone={handleIntroDone}
        />
      )}
    </div>
  );
}

