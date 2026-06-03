import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import HoverFullscreenVideo from "@/components/media/HoverFullscreenVideo";
import introVideo from "@/assets/introvideo.mp4";

export default function HomeHero() {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden pt-24 pb-12 sm:pt-28 sm:pb-16 md:pt-32 md:pb-20 lg:pt-36 lg:pb-24">
      <div className="pointer-events-none absolute inset-0 hero-dots opacity-60" />
      <div className="pointer-events-none absolute -right-32 top-24 h-[320px] w-[320px] sm:h-[420px] sm:w-[420px] lg:h-[520px] lg:w-[520px] rounded-full bg-sky-400/20 blur-3xl" />
      <div className="pointer-events-none absolute right-4 top-32 h-[260px] w-[260px] sm:h-[360px] sm:w-[360px] lg:h-[420px] lg:w-[420px] rounded-full bg-blue-500/10 blur-3xl" />

      <Container>
        <div className="grid items-center gap-10 md:gap-12 lg:gap-16 md:grid-cols-2">
          <div className="md:pl-2 lg:pl-6 text-center md:text-left">
            <div className="text-display">
              <span className="text-[#2f5fbf]">Ciplo</span>
              <span className="text-[#55c2c6]">Stem</span>
            </div>

            <div className="mt-3 sm:mt-4 text-base sm:text-lg font-medium text-slate-600">
              Allogeneic Mesenchymal Stem Cells
            </div>

            <p className="mt-5 sm:mt-6 mx-auto md:mx-0 max-w-xl text-sm sm:text-base leading-relaxed text-slate-600">
              Pioneering regenerative medicine through advanced stem cell therapy. Experience breakthrough technology in bone healing and tissue recovery with our next-generation allogeneic mesenchymal stem cells.
            </p>

            <div className="mt-7 sm:mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center md:justify-start">
              <Button
                type="button"
                className="w-full sm:w-auto"
                onClick={() => {
                  const el = document.getElementById("learn-more");
                  if (!el) return;
                  const top = el.getBoundingClientRect().top + window.scrollY - 96;
                  window.scrollTo({ top: Math.max(0, top), left: 0, behavior: "smooth" });
                }}
              >
                Learn More <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant="secondary"
                className="w-full sm:w-auto"
                onClick={() => navigate("/contact")}
              >
                Contact Us
              </Button>
            </div>
          </div>

          <div className="relative order-first md:order-none">
            <div className="relative mx-auto w-full max-w-[320px] sm:max-w-sm md:max-w-md lg:max-w-lg">
              <HoverFullscreenVideo
                src={introVideo}
                className="mx-auto aspect-[4/5] w-full"
              />
            </div>

            <div className="pointer-events-none absolute -right-6 -top-6 h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-sky-400/20 blur-xl" />
            <div className="pointer-events-none absolute left-6 bottom-2 h-20 w-20 sm:h-24 sm:w-24 rounded-full bg-blue-500/10 blur-2xl" />
          </div>
        </div>
      </Container>
    </section>
  );
}
