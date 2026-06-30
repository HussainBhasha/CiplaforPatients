import React, { Suspense, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Privacy from "@/pages/Privacy";
import About from "@/pages/About";
import Doctor from "@/pages/Doctor";
import Contact from "@/pages/Contact";
import Admin from "@/pages/Admin";
import Home from "@/pages/Home";
import Patient from "@/pages/Patient";

function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      return;
    }

    const id = decodeURIComponent(location.hash.slice(1));
    if (!id) return;

    const start = Date.now();
    const tryScroll = () => {
      const el = document.getElementById(id);
      if (!el) return false;
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      return true;
    };

    if (tryScroll()) return;
    const timer = window.setInterval(() => {
      if (tryScroll() || Date.now() - start > 2000) {
        window.clearInterval(timer);
      }
    }, 50);

    return () => window.clearInterval(timer);
  }, [location.pathname, location.hash]);

  return null;
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/patient" element={<Patient />} />
          <Route path="/doctor" element={<Doctor />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Suspense>
    </Router>
  );
}
