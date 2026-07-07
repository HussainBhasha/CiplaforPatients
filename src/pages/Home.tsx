import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import IntroVideoOverlay from "@/components/media/IntroVideoOverlay";
import introVideo from "@/assets/introvideo.mp4";

export default function Home() {
  const navigate = useNavigate();
  const storageKey = useMemo(() => "ciplostem:introPlayed", []);
  const [introDone, setIntroDone] = useState(() => {
    try {
      return sessionStorage.getItem(storageKey) === "1";
    } catch {
      return false;
    }
  });

  // ALL useEffect calls first, before any conditional returns!
  useEffect(() => {
    if (introDone) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [introDone]);

  useEffect(() => {
    if (!introDone) return;
    try {
      sessionStorage.setItem("ciplostem:portal", "patient");
      sessionStorage.setItem("ciplostem:welcomeGate", "1");
    } catch {
      void 0;
    }
    navigate("/patient", { replace: true });
  }, [introDone, navigate]);

  if (!introDone) {
    return (
      <IntroVideoOverlay
        src={introVideo}
        onDone={() => {
          try {
            sessionStorage.setItem(storageKey, "1");
          } catch {
            void 0;
          }
          setIntroDone(true);
        }}
      />
    );
  }

  return null;
}
