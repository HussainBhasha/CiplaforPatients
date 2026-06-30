import Container from "@/components/ui/Container";
import ciplobottle from "@/assets/Ciplobottle2.png";
import { useEffect, useMemo, useRef, useState } from "react";

type Props = {
  stacked?: boolean;
};

export default function BottleProductSection({ stacked }: Props) {
  const targetRef = useRef<HTMLElement | null>(null);
  const bottleInnerRef = useRef<HTMLDivElement | null>(null);
  const bottleWrapRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);
  const canHoverRef = useRef(false);
  const rafRef = useRef<number | null>(null);
  const mouseTarget = useRef({ x: 0, y: 0 });
  const mouseCurrent = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const el = targetRef.current;
    if (!el) return;

    let raf: number | null = null;
    const update = () => {
      raf = null;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const visiblePx = Math.max(0, Math.min(rect.bottom, vh) - Math.max(rect.top, 0));
      const ratio = rect.height > 0 ? visiblePx / rect.height : 0;
      const clamp01 = (n: number) => Math.max(0, Math.min(1, n));
      const pRaw = (ratio - 0.12) / 0.65;
      const p = ratio < 0.02 ? 0 : clamp01(pRaw);
      setProgress(p);
      canHoverRef.current = p > 0.9;
     };

    const onScroll = () => {
      if (raf != null) return;
      raf = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (raf != null) window.cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const bottleClassName = useMemo(() => {
    return "relative mx-auto w-full max-w-sm transition-[transform,opacity] duration-200 ease-out will-change-transform";
  }, []);

  const bottleStyle = useMemo(() => {
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const vw = typeof window === "undefined" ? 1200 : window.innerWidth || 1200;
    const vh = typeof window === "undefined" ? 800 : window.innerHeight || 800;
    const x0 = -Math.min(560, vw * 0.55);
    const y0 = -Math.min(220, vh * 0.25);
    const x = lerp(x0, 0, progress);
    const y = lerp(y0, 0, progress);
    const r = lerp(-12, 0, progress);
    const o = lerp(0, 1, Math.min(1, progress * 1.1));
    return { transform: `translate3d(${x}px, ${y}px, 0) rotate(${r}deg)`, opacity: o };
  }, [progress]);

  const floatyEnabled = progress > 0.9;

  useEffect(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }

    const el = bottleInnerRef.current;
    if (!el) return;

    const hoverCapable = window.matchMedia?.("(hover: hover) and (pointer: fine)")?.matches ?? true;
    if (!hoverCapable || !canHoverRef.current) {
      mouseTarget.current = { x: 0, y: 0 };
      mouseCurrent.current = { x: 0, y: 0 };
      el.style.transform = "translate3d(0px, 0px, 0)";
      return;
    }

    const tick = () => {
      const t = mouseTarget.current;
      const c = mouseCurrent.current;
      mouseCurrent.current = {
        x: c.x + (t.x - c.x) * 0.12,
        y: c.y + (t.y - c.y) * 0.12,
      };

      const m = mouseCurrent.current;
      el.style.transform = `translate3d(${m.x.toFixed(2)}px, ${m.y.toFixed(2)}px, 0)`;
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, [progress]);

  return (
    <section
      ref={targetRef}
      className={stacked ? "relative h-full" : "relative section-y"}
      onMouseMove={(e) => {
        if (!canHoverRef.current) return;
        const wrap = targetRef.current;
        if (!wrap) return;
        const rect = wrap.getBoundingClientRect();
        const x = (e.clientX - rect.left) / Math.max(rect.width, 1);
        const y = (e.clientY - rect.top) / Math.max(rect.height, 1);
        mouseTarget.current = { x: (x - 0.5) * 28, y: (y - 0.5) * 18 };
      }}
      onMouseLeave={() => {
        mouseTarget.current = { x: 0, y: 0 };
      }}
    >
      {stacked ? null : (
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1100px_circle_at_20%_0%,rgba(56,189,248,0.18),transparent_60%)]" />
      )}
      {stacked ? (
        <div className="grid h-full items-center gap-8 md:gap-10 grid-cols-1 md:grid-cols-2">
          <div>
            <div className="text-h1 text-sky-700">
              CiploStem
            </div>
            <div className="mt-3 text-lg font-semibold text-slate-900">
              Allogeneic Mesenchymal Stem Cells
            </div>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-600">
              A next-generation regenerative product designed to support cartilage preservation with a clinically disciplined pathway—from preparation to delivery and recovery guidance.
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {[
                { k: "Cell type", v: "Allogeneic MSCs" },
                { k: "Indication", v: "Cartilage preservation" },
                { k: "Approach", v: "Protocol-driven" },
                { k: "Care model", v: "Guided recovery" },
              ].map((x) => (
                <div
                  key={x.k}
                  className="rounded-2xl bg-white/85 p-4 ring-1 ring-sky-200/60 shadow-soft-xl transition-all duration-300 ease-out cursor-pointer hover:bg-white hover:ring-sky-400/60 hover:shadow-soft-2xl hover:scale-105"
                >
                  <div className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                    {x.k}
                  </div>
                  <div className="mt-1 text-sm font-semibold text-slate-900">{x.v}</div>
                </div>
              ))}
            </div>
          </div>

          <div ref={bottleWrapRef} className={bottleClassName} style={bottleStyle}>
            <div ref={bottleInnerRef} className="will-change-transform">
              <img
                src={ciplobottle}
                alt="CiploStem bottle"
                className={[
                  "relative mx-auto h-[240px] xs:h-[280px] sm:h-[340px] md:h-[400px] lg:h-[460px] w-auto object-contain",
                  stacked ? "drop-shadow-[0_22px_50px_rgba(2,8,23,0.22)]" : "drop-shadow-[0_22px_50px_rgba(2,132,199,0.25)]",
                  floatyEnabled ? "animate-floaty" : "",
                ].join(" ")}
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
      ) : (
        <Container>
          <div className="grid items-center gap-8 md:gap-10 grid-cols-1 md:grid-cols-2">
            <div>
              <div className="text-h1 text-sky-700">
                CiploStem
              </div>
              <div className="mt-3 text-lg font-semibold text-slate-900">
                Allogeneic Mesenchymal Stem Cells
              </div>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-600">
                A next-generation regenerative product designed to support cartilage preservation with a clinically disciplined pathway—from
                preparation to delivery and recovery guidance.
              </p>

              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {[
                  { k: "Cell type", v: "Allogeneic MSCs" },
                  { k: "Indication", v: "Cartilage preservation" },
                  { k: "Approach", v: "Protocol-driven" },
                  { k: "Care model", v: "Guided recovery" },
                ].map((x) => (
                  <div key={x.k} className="rounded-2xl bg-white/85 p-4 ring-1 ring-sky-200/60 shadow-soft-xl transition-all duration-300 ease-out cursor-pointer hover:bg-white hover:ring-sky-400/60 hover:shadow-soft-2xl hover:scale-105">
                    <div className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">{x.k}</div>
                    <div className="mt-1 text-sm font-semibold text-slate-900">{x.v}</div>
                  </div>
                ))}
              </div>
            </div>

            <div ref={bottleWrapRef} className={bottleClassName} style={bottleStyle}>
              <div className="pointer-events-none absolute inset-0 rounded-[36px] bg-gradient-to-r from-sky-300/25 via-blue-300/15 to-sky-300/25 blur-2xl" />
              <div ref={bottleInnerRef} className="will-change-transform">
                <img
                  src={ciplobottle}
                  alt="CiploStem bottle"
                  className={[
                    "relative mx-auto h-[260px] sm:h-[340px] md:h-[400px] lg:h-[460px] w-auto object-contain",
                    "drop-shadow-[0_22px_50px_rgba(2,132,199,0.25)]",
                    floatyEnabled ? "animate-floaty" : "",
                  ].join(" ")}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </Container>
      )}
    </section>
  );
}
