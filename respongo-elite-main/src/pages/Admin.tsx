import { useState, useEffect } from "react";
import Container from "@/components/ui/Container";
import MarketingNavbar from "@/components/layout/MarketingNavbar";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";
import { Download, ClipboardList, Mail } from "lucide-react";

type Assessment = {
  id: number;
  full_name: string;
  email: string;
  phone: string;
  age: string;
  pain_frequency: string;
  pain_severity: string;
  stiffness: string;
  swelling: string;
  cracking: string;
  previous_treatments: string;
  other_symptoms: string;
  created_at: string;
};

type Contact = {
  id: number;
  full_name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  created_at: string;
};

export default function Admin() {
  const [activeTab, setActiveTab] = useState<"assessments" | "contacts">("assessments");
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [assessmentsRes, contactsRes] = await Promise.all([
        fetch("http://localhost:3001/api/admin/assessments"),
        fetch("http://localhost:3001/api/admin/contacts"),
      ]);

      if (assessmentsRes.ok) {
        setAssessments(await assessmentsRes.json());
      }
      if (contactsRes.ok) {
        setContacts(await contactsRes.json());
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = "Ciplostem";
    fetchData();
  }, []);

  const downloadCSV = (type: "assessments" | "contacts") => {
    window.open(`http://localhost:3001/api/admin/${type}/download`, "_blank");
  };

  return (
    <div className="min-h-dvh bg-sky-50">
      <MarketingNavbar />
      <main className="pt-24 pb-16">
        <Container>
          <div className="text-center mb-12">
            <div className="text-[11px] font-semibold tracking-[0.32em] text-sky-700/80">ADMIN DASHBOARD</div>
            <h1 className="font-display text-4xl sm:text-5xl font-semibold tracking-[-0.03em] text-slate-900 mt-4">
              Patient Data
            </h1>
          </div>

          {/* Tabs */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex rounded-2xl bg-white p-1 shadow-soft-xl ring-1 ring-sky-200/60">
              <button
                onClick={() => setActiveTab("assessments")}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all ${
                  activeTab === "assessments"
                    ? "bg-gradient-to-r from-sky-600 to-sky-400 text-white shadow-sm"
                    : "text-slate-600 hover:bg-sky-50"
                }`}
              >
                <ClipboardList className="h-4 w-4" />
                Assessments
              </button>
              <button
                onClick={() => setActiveTab("contacts")}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all ${
                  activeTab === "contacts"
                    ? "bg-gradient-to-r from-sky-600 to-sky-400 text-white shadow-sm"
                    : "text-slate-600 hover:bg-sky-50"
                }`}
              >
                <Mail className="h-4 w-4" />
                Contacts
              </button>
            </div>
          </div>

          {/* Download Button */}
          <div className="text-right mb-6">
            <Button onClick={() => downloadCSV(activeTab)}>
              <Download className="h-4 w-4 mr-2" />
              Download CSV
            </Button>
          </div>

          {/* Data Table */}
          <div className="overflow-x-auto rounded-2xl bg-white shadow-soft-xl ring-1 ring-sky-200/60">
            {loading ? (
              <div className="p-12 text-center text-slate-600">Loading...</div>
            ) : (
              <table className="w-full">
                <thead className="bg-gradient-to-r from-sky-50 to-sky-100">
                  <tr>
                    {activeTab === "assessments" ? (
                      <>
                        <th className="px-4 py-4 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider">ID</th>
                        <th className="px-4 py-4 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider">Name</th>
                        <th className="px-4 py-4 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider">Email</th>
                        <th className="px-4 py-4 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider">Phone</th>
                        <th className="px-4 py-4 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider">Age</th>
                        <th className="px-4 py-4 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider">Pain Frequency</th>
                        <th className="px-4 py-4 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider">Pain Severity</th>
                        <th className="px-4 py-4 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider">Stiffness</th>
                        <th className="px-4 py-4 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider">Swelling</th>
                        <th className="px-4 py-4 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider">Cracking</th>
                        <th className="px-4 py-4 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider">Previous Treatments</th>
                        <th className="px-4 py-4 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider">Other Symptoms</th>
                        <th className="px-4 py-4 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider">Date</th>
                      </>
                    ) : (
                      <>
                        <th className="px-4 py-4 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider">ID</th>
                        <th className="px-4 py-4 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider">Name</th>
                        <th className="px-4 py-4 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider">Email</th>
                        <th className="px-4 py-4 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider">Phone</th>
                        <th className="px-4 py-4 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider">Subject</th>
                        <th className="px-4 py-4 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider">Message</th>
                        <th className="px-4 py-4 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider">Date</th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {activeTab === "assessments" ? (
                    assessments.map((a) => (
                      <tr key={a.id} className="hover:bg-sky-50 transition-colors">
                        <td className="px-4 py-4 text-sm text-slate-600">{a.id}</td>
                        <td className="px-4 py-4 text-sm text-slate-900">{a.full_name}</td>
                        <td className="px-4 py-4 text-sm text-slate-600">{a.email}</td>
                        <td className="px-4 py-4 text-sm text-slate-600">{a.phone || "-"}</td>
                        <td className="px-4 py-4 text-sm text-slate-600">{a.age || "-"}</td>
                        <td className="px-4 py-4 text-sm text-slate-600">{a.pain_frequency || "-"}</td>
                        <td className="px-4 py-4 text-sm text-slate-600">{a.pain_severity || "-"}</td>
                        <td className="px-4 py-4 text-sm text-slate-600">{a.stiffness || "-"}</td>
                        <td className="px-4 py-4 text-sm text-slate-600">{a.swelling || "-"}</td>
                        <td className="px-4 py-4 text-sm text-slate-600">{a.cracking || "-"}</td>
                        <td className="px-4 py-4 text-sm text-slate-600">{a.previous_treatments || "-"}</td>
                        <td className="px-4 py-4 text-sm text-slate-600">{a.other_symptoms || "-"}</td>
                        <td className="px-4 py-4 text-sm text-slate-600">{new Date(a.created_at).toLocaleString()}</td>
                      </tr>
                    ))
                  ) : (
                    contacts.map((c) => (
                      <tr key={c.id} className="hover:bg-sky-50 transition-colors">
                        <td className="px-4 py-4 text-sm text-slate-600">{c.id}</td>
                        <td className="px-4 py-4 text-sm text-slate-900">{c.full_name}</td>
                        <td className="px-4 py-4 text-sm text-slate-600">{c.email}</td>
                        <td className="px-4 py-4 text-sm text-slate-600">{c.phone || "-"}</td>
                        <td className="px-4 py-4 text-sm text-slate-600">{c.subject || "-"}</td>
                        <td className="px-4 py-4 text-sm text-slate-600">{c.message || "-"}</td>
                        <td className="px-4 py-4 text-sm text-slate-600">{new Date(c.created_at).toLocaleString()}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
