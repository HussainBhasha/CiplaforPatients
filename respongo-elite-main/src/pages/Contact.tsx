import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Container from "@/components/ui/Container";
import MarketingNavbar from "@/components/layout/MarketingNavbar";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";
import { Mail, MapPin, Phone, Send } from "lucide-react";

export default function Contact() {
  const location = useLocation();
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  // Detect portal type
  const portal = (() => {
    if (location.pathname.startsWith("/patient")) return "patient" as const;
    if (location.pathname.startsWith("/doctor")) return "doctor" as const;
    try {
      const v = sessionStorage.getItem("ciplostem:portal");
      if (v === "patient" || v === "doctor") return v;
    } catch {
      void 0;
    }
    return null;
  })();

  const contactName = portal === "patient" ? "Cipla" : "Ciplostem";
  
  useEffect(() => {
    document.title = `${contactName} | Contact`;
  }, [contactName]);

  return (
    <div className="min-h-dvh bg-sky-50">
      <MarketingNavbar />
      <main className="pt-16">
        <section className="bg-sky-50/70">
          <Container>
            <div className="py-8 text-center sm:py-12">
              <div className="text-[11px] font-semibold tracking-[0.32em] text-sky-700/80">CONTACT</div>
              <div className="mx-auto mt-3 max-w-4xl text-3xl sm:text-4xl md:text-5xl font-semibold tracking-[-0.03em] text-slate-900">
                Get in touch with{" "}
                <span className="bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">{contactName}</span>.
              </div>
            </div>
          </Container>
        </section>

        <section className="py-8 sm:py-12">
          <Container>
            <div className="grid gap-8 lg:grid-cols-[380px_1fr]">
              <div className="space-y-5">
                <div className="rounded-[22px] bg-white/90 p-5 ring-1 ring-sky-200/60 shadow-soft-xl transition-all duration-300 hover:shadow-[0_10px_40px_rgba(2,132,199,0.15)] hover:ring-sky-300">
                  <div className="flex items-start gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-xl bg-sky-50 ring-1 ring-sky-100 text-sky-700">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-900">Toll-Free Support</div>
                      <a href="tel:18001234567" className="mt-1 block text-sm text-sky-700 hover:text-sky-800">1800-123-4567</a>
                    </div>
                  </div>
                </div>

                <div className="rounded-[22px] bg-white/90 p-5 ring-1 ring-sky-200/60 shadow-soft-xl transition-all duration-300 hover:shadow-[0_10px_40px_rgba(2,132,199,0.15)] hover:ring-sky-300">
                  <div className="flex items-start gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-xl bg-sky-50 ring-1 ring-sky-100 text-sky-700">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-900">Email</div>
                      <a href="mailto:info@cipla.com" className="mt-1 block text-sm text-sky-700 hover:text-sky-800">info@cipla.com</a>
                    </div>
                  </div>
                </div>

                <div className="rounded-[22px] bg-white/90 p-5 ring-1 ring-sky-200/60 shadow-soft-xl transition-all duration-300 hover:shadow-[0_10px_40px_rgba(2,132,199,0.15)] hover:ring-sky-300">
                  <div className="flex items-start gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-xl bg-sky-50 ring-1 ring-sky-100 text-sky-700">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-900">Headquarters</div>
                      <a
                        href="https://www.google.com/maps?q=PENINSULA%20BUSINESS%20PARK%20GANPATRAO%20KADAM%20MARG%20LOWER%20PAREL%20MUMBAI"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1 block text-xs leading-relaxed text-slate-600 hover:text-sky-700"
                      >
                        CIPLA LTD HEAD OFFICE-MUMBAI<br/>
                        PENINSULA BUSINESS PARK, GANPATRAO KADAM<br/>
                        MARG, LOWER PAREL, MUMBAI.
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-[28px] bg-white/90 p-5 ring-1 ring-sky-200/60 shadow-soft-xl transition-all duration-300 hover:shadow-[0_10px_40px_rgba(2,132,199,0.15)] hover:ring-sky-300 sm:p-6">
                <div className="text-lg font-semibold text-slate-900">Send us a message</div>

                {sent ? (
                  <div className="mt-6 rounded-2xl bg-sky-50 p-5 ring-1 ring-sky-100">
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
                    className="mt-6 space-y-3"
                    onSubmit={async (e) => {
                      e.preventDefault();
                      setLoading(true);
                      
                      try {
                        const response = await fetch("http://localhost:3001/api/contact", {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json"
                          },
                          body: JSON.stringify({
                            full_name: fullName,
                            email,
                            phone,
                            subject,
                            message
                          })
                        });
                        
                        if (response.ok) {
                          setSent(true);
                        } else {
                          alert("Failed to send message");
                        }
                      } catch (error) {
                        console.error("Error sending message:", error);
                        alert("Failed to send message, please try again");
                      } finally {
                        setLoading(false);
                      }
                    }}
                  >
                    <div className="grid gap-3 sm:grid-cols-2">
                      <input
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Full name"
                        className="w-full rounded-2xl border border-slate-200 bg-slate-50/40 px-4 py-3 text-sm outline-none ring-sky-200 focus:ring-2"
                        required
                      />
                      <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email address"
                        className="w-full rounded-2xl border border-slate-200 bg-slate-50/40 px-4 py-3 text-sm outline-none ring-sky-200 focus:ring-2"
                        required
                        inputMode="email"
                      />
                    </div>

                    <input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Phone number (optional)"
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50/40 px-4 py-3 text-sm outline-none ring-sky-200 focus:ring-2"
                      inputMode="tel"
                    />

                    <input
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="Subject (optional)"
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50/40 px-4 py-3 text-sm outline-none ring-sky-200 focus:ring-2"
                    />

                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Your message"
                      className="min-h-[120px] w-full resize-none rounded-2xl border border-slate-200 bg-slate-50/40 px-4 py-3 text-sm outline-none ring-sky-200 focus:ring-2"
                      required
                    />

                    <div className="pt-2">
                      <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? "Sending..." : "Send message"} <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            </div>

            <div className="mt-10 overflow-hidden rounded-[28px] bg-white ring-1 ring-sky-200/60 shadow-soft-xl">
              <iframe
                title="CiploStem HQ"
                src="https://www.google.com/maps?q=PENINSULA%20BUSINESS%20PARK%20GANPATRAO%20KADAM%20MARG%20LOWER%20PAREL%20MUMBAI&output=embed"
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
