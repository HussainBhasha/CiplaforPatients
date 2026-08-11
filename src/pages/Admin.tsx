import { useEffect, useMemo, useState } from "react";
import Button from "@/components/ui/Button";
import ciplaLogo from "@/assets/Cipla_logo.svg.png";

type Contact = {
  id: number;
  full_name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  created_at: string;
  created_at_display?: string;
};

export default function Admin() {
  const apiBase = useMemo(() => "http://localhost:3001", []);
  const [contacts, setContacts] = useState<Contact[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchContacts = async (opts?: { silent?: boolean }) => {
    if (!opts?.silent) setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${apiBase}/api/admin/contacts`);
      if (!res.ok) throw new Error("Failed to fetch contacts");
      setContacts(await res.json());
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to fetch contacts");
    } finally {
      if (!opts?.silent) setLoading(false);
    }
  };

  useEffect(() => {
    document.title = "Cipla";
  }, []);

  useEffect(() => {
    void fetchContacts();

    const tick = () => {
      if (document.visibilityState !== "visible") return;
      void fetchContacts({ silent: true });
    };

    const interval = window.setInterval(tick, 5000);
    window.addEventListener("focus", tick);
    document.addEventListener("visibilitychange", tick);
    return () => {
      window.clearInterval(interval);
      window.removeEventListener("focus", tick);
      document.removeEventListener("visibilitychange", tick);
    };
  }, []);

  const downloadExcel = () => {
    window.open(`${apiBase}/api/admin/contacts/download`, "_blank");
  };

  return (
    <div className="min-h-dvh bg-sky-50">
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur ring-1 ring-slate-200">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:px-6">
          <img src={ciplaLogo} alt="Cipla" className="h-10 w-auto object-contain" decoding="async" loading="eager" />

          <div className="ml-auto flex items-center gap-2">
            <Button onClick={downloadExcel} className="rounded-full px-4 py-2 text-sm">
              Download Excel
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        <div className="overflow-x-auto rounded-2xl bg-white ring-1 ring-slate-200">
          {loading ? <div className="p-8 text-sm text-slate-600">Loading…</div> : null}
          {!loading && error ? <div className="p-8 text-sm text-rose-700">{error}</div> : null}
          {!loading && !error ? (
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700">ID</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700">Name</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700">Email</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700">Phone</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700">Subject</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700">Message</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700">Date</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-200">
                {(contacts ?? []).map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3 text-sm text-slate-600">{c.id}</td>
                    <td className="px-4 py-3 text-sm text-slate-900">{c.full_name}</td>
                    <td className="px-4 py-3 text-sm text-slate-600">{c.email}</td>
                    <td className="px-4 py-3 text-sm text-slate-600">{c.phone || "-"}</td>
                    <td className="px-4 py-3 text-sm text-slate-600">{c.subject || "-"}</td>
                    <td className="px-4 py-3 text-sm text-slate-600">{c.message || "-"}</td>
                    <td className="px-4 py-3 text-sm text-slate-600">{c.created_at}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : null}
        </div>
      </main>
    </div>
  );
}
