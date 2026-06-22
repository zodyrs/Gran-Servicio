import { useState } from "react";
import type { Lang } from "./components/translations";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { ServicesGrid } from "./components/ServicesGrid";
import { HowItWorks } from "./components/HowItWorks";
import { SubscriptionPlans } from "./components/SubscriptionPlans";
import { ConstructionSection } from "./components/ConstructionSection";
import { WorkerRegistrationModal } from "./components/WorkerRegistrationModal";
import { ClientAuthModal } from "./components/ClientAuthModal";
import { ServiceRequestModal } from "./components/ServiceRequestModal";
import { CustomerSupportChat } from "./components/CustomerSupportChat";
import { ConstructionContactModal } from "./components/ConstructionContactModal";
import { Footer } from "./components/Footer";
import { AdminPanel } from "./components/AdminPanel";

type Modal = "none" | "clientAuth" | "workerReg" | "serviceRequest" | "constructionContact";

export default function App() {
  const [lang, setLang] = useState<Lang>("es");
  const [modal, setModal] = useState<Modal>("none");
  const [selectedService, setSelectedService] = useState<string | undefined>(undefined);
  const [user, setUser] = useState<{ name: string } | null>(null);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleServiceClick = (service: string) => {
    setSelectedService(service);
    setModal("serviceRequest");
  };

  const handleChoosePlan = (plan: string) => {
    if (!user) {
      setModal("clientAuth");
    } else {
      alert(lang === "es" ? `¡Plan ${plan} seleccionado! Redirigiendo al pago...` : `Plan ${plan} selected! Redirecting to payment...`);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar lang={lang} setLang={setLang} onLoginClient={() => setModal("clientAuth")} onRegisterWorker={() => setModal("workerReg")} onScrollTo={scrollTo} />
      <main>
        <Hero lang={lang} onRequestService={() => setModal("serviceRequest")} onRegisterWorker={() => setModal("workerReg")} />
        <ServicesGrid lang={lang} onServiceClick={handleServiceClick} />
        <HowItWorks lang={lang} />
        <SubscriptionPlans lang={lang} onChoosePlan={handleChoosePlan} />
        <ConstructionSection lang={lang} onContact={() => setModal("constructionContact")} />
        <AdminPanel lang={lang} />
      </main>
      <Footer lang={lang} onScrollTo={scrollTo} />
      <CustomerSupportChat lang={lang} />
      {modal === "clientAuth" && <ClientAuthModal lang={lang} onClose={() => setModal("none")} onSuccess={(name) => { setUser({ name }); setModal("none"); }} />}
      {modal === "workerReg" && <WorkerRegistrationModal lang={lang} onClose={() => setModal("none")} />}
      {modal === "serviceRequest" && <ServiceRequestModal lang={lang} selectedService={selectedService} onClose={() => { setModal("none"); setSelectedService(undefined); }} onLoginRequired={() => setModal("clientAuth")} isLoggedIn={!!user} />}
      {modal === "constructionContact" && <ConstructionContactModal lang={lang} onClose={() => setModal("none")} />}
      {user && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 text-xs text-foreground" style={{ background: "rgba(249,115,22,0.1)", backdropFilter: "blur(8px)" }}>
          <span className="w-2 h-2 rounded-full bg-green-400" />
          {lang === "es" ? `Bienvenido, ${user.name}` : `Welcome, ${user.name}`}
          <button onClick={() => setUser(null)} className="text-muted-foreground hover:text-foreground ml-1" style={{ fontSize: "10px" }}>
            {lang === "es" ? "Salir" : "Logout"}
          </button>
        </div>
      )}
    </div>
  );
}
