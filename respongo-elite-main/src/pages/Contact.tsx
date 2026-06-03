import { useState } from "react";
import Container from "@/components/ui/Container";
import MarketingNavbar from "@/components/layout/MarketingNavbar";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";
import { Mail, MapPin, Phone, Send } from "lucide-react";

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  return (
    <div className="min-h-dvh bg-sky-50">
      <MarketingNavbar />
      <main className="pt-24">
        <section className="bg-sky-50/70">
          <Container>
            <div className="py-14 text-center sm:py-20">
              <div className="text-[11px] font-semibold tracking-[0.32em] text-sky-700/80">CONTACT</div>
              <div className="mx-auto mt-5 max-w-4xl text-display text-slate-900">
                Get in touch with{" "}
                <span className="bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">Ciplostem</span>.
              </div>
            </div>
          </Container>
        </section>

        <section className="py-14 sm:py-20">
          <Container>
            <div className="grid gap-8 lg:grid-cols-[380px_1fr]">
              <div className="space-y-5">
                <div className="rounded-[22px] bg-white/90 p-6 ring-1 ring-sky-200/60 shadow-soft-xl">
                  <div className="flex items-start gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-xl bg-sky-50 ring-1 ring-sky-100 text-sky-700">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-900">Toll-Free Support</div>
                      <div className="mt-1 text-sm text-sky-700">1-800-123-4567</div>
                    </div>
                  </div>
                </div>

                <div className="rounded-[22px] bg-white/90 p-6 ring-1 ring-sky-200/60 shadow-soft-xl">
                  <div className="flex items-start gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-xl bg-sky-50 ring-1 ring-sky-100 text-sky-700">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-900">Email</div>
                      <div className="mt-1 text-sm text-sky-700">info@ciplostem.com</div>
                    </div>
                  </div>
                </div>

                <div className="rounded-[22px] bg-white/90 p-6 ring-1 ring-sky-200/60 shadow-soft-xl">
                  <div className="flex items-start gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-xl bg-sky-50 ring-1 ring-sky-100 text-sky-700">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-900">Headquarters</div>
                      <div className="mt-1 text-xs leading-relaxed text-slate-600">
                        Bandra Kurla Complex, Mumbai 400051, India
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-[28px] bg-white/90 p-6 ring-1 ring-sky-200/60 shadow-soft-xl sm:p-8">
                <div className="text-lg font-semibold text-slate-900">Send us a message</div>

                {sent ? (
                  <div className="mt-6 rounded-2xl bg-sky-50 p-6 ring-1 ring-sky-100">
                    <div className="text-sm font-semibold text-slate-900">Message sent</div>
                    <div className="mt-1 text-sm text-slate-600">We’ll get back to you soon.</div>
                    <div className="mt-5">
                      <Button
                        variant="secondary"
                        onClick={() => {
                          setSent(false);
                          setFullName("");
                          setEmail("");
                          setPhone("");
                          setMessage("");
                        }}
                      >
                        Send another
                      </Button>
                    </div>
                  </div>
                ) : (
                  <form
                    className="mt-6 space-y-4"
                    onSubmit={(e) => {
                      e.preventDefault();
                      setSent(true);
                    }}
                  >
                    <div className="grid gap-4 sm:grid-cols-2">
                      <input
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Full name"
                        className="w-full rounded-2xl border border-slate-200 bg-slate-50/40 px-5 py-4 text-sm outline-none ring-sky-200 focus:ring-2"
                        required
                      />
                      <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email address"
                        className="w-full rounded-2xl border border-slate-200 bg-slate-50/40 px-5 py-4 text-sm outline-none ring-sky-200 focus:ring-2"
                        required
                        inputMode="email"
                      />
                    </div>

                    <input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Phone number (optional)"
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50/40 px-5 py-4 text-sm outline-none ring-sky-200 focus:ring-2"
                      inputMode="tel"
                    />

                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Your message"
                      className="min-h-[140px] w-full resize-none rounded-2xl border border-slate-200 bg-slate-50/40 px-5 py-4 text-sm outline-none ring-sky-200 focus:ring-2"
                      required
                    />

                    <div className="pt-2">
                      <Button type="submit" className="w-full">
                        Send message <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            </div>

            <div className="mt-10 overflow-hidden rounded-[28px] bg-white ring-1 ring-sky-200/60 shadow-soft-xl">
              <iframe
                title="CiploStem HQ"
                src="https://www.google.com/maps?q=Bandra%20Kurla%20Complex%20Mumbai%20400051%20India&output=embed"
                className="h-[260px] sm:h-[340px] md:h-[420px] w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  );
}
