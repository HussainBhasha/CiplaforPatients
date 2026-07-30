import { useEffect } from "react";
import Container from "@/components/ui/Container";
import MarketingNavbar from "@/components/layout/MarketingNavbar";
import Footer from "@/components/layout/Footer";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function Disclaimer() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Cipla | Disclaimer";
  }, []);
  return (
    <div className="min-h-dvh flex flex-col bg-slate-50/50">
      <MarketingNavbar />
      <main className="pt-32 flex-grow pb-16">
        <Container>
          <div className="mx-auto max-w-4xl mb-6">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-sky-700 transition-colors bg-white/60 hover:bg-white px-4 py-2 rounded-full ring-1 ring-slate-200 shadow-sm"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>
          </div>
          <div className="mx-auto max-w-4xl rounded-3xl bg-white/80 backdrop-blur-xl p-8 sm:p-12 ring-1 ring-sky-200/60 shadow-soft-xl">
            <h1 className="font-display text-4xl font-bold tracking-[-0.03em] text-[#0b3a66] mb-8">
              Disclaimer
            </h1>
            <ul className="space-y-4 text-[15px] leading-relaxed text-slate-700 font-medium list-disc pl-5">
              <li>The content provided herein is intended solely for health awareness and educational purposes and should be used responsibly and ethically.</li>
              <li>The content does not promote, advertise, or endorse any specific product or brand.</li>
              <li>The content is intended to provide relevant information about usage and precautions during and after Mesenchymal Stem Cell treatment by a Registered Medical Practitioner.</li>
              <li>The content is not a substitute for medical advice, diagnosis, or treatment and should not be considered medical guidance or a treatment recommendation.</li>
              <li>Always consult a qualified healthcare professional for any health-related decisions.</li>
              <li>Medical knowledge and guidelines are continually evolving. While every effort has been made to ensure the accuracy of this content, Cipla makes no representations or warranties regarding its completeness or accuracy.</li>
              <li>Cipla shall not be responsible for any consequences, losses, injuries, or damages, whether direct or indirect, arising from the use, misuse, misinterpretation, or inaccurate application of this content.</li>
            </ul>
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
