import { useEffect } from "react";
import Container from "@/components/ui/Container";
import MarketingNavbar from "@/components/layout/MarketingNavbar";
import Footer from "@/components/layout/Footer";

export default function Privacy() {
  useEffect(() => {
    document.title = "Cipla | Privacy Policy";
  }, []);
  return (
    <div className="min-h-dvh">
      <MarketingNavbar />
      <main className="pt-24">
        <Container>
          <div className="mx-auto max-w-3xl rounded-2xl bg-white/85 p-6 ring-1 ring-sky-200/60 shadow-soft-xl">
            <div className="font-display text-3xl font-semibold tracking-[-0.03em] text-sky-700">
              Privacy Policy
            </div>
            <div className="mt-2 text-sm text-slate-600">
              This is a template policy. Replace with your official legal text.
            </div>
            <div className="mt-6 space-y-4 text-sm text-slate-700">
              <section className="space-y-2">
                <div className="font-semibold text-slate-900">Information we collect</div>
                <div>
                  We may collect basic contact details you submit through forms, such as name, phone number, email address, and your inquiry.
                </div>
              </section>
              <section className="space-y-2">
                <div className="font-semibold text-slate-900">How we use information</div>
                <div>
                  We use your details to respond to your request and provide information about CiploStem services.
                </div>
              </section>
              <section className="space-y-2">
                <div className="font-semibold text-slate-900">Contact</div>
                <div>For privacy questions, contact: info@cipla.com</div>
              </section>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
}

