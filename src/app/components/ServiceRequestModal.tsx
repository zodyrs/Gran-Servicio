import { useState } from "react";
import { X, CheckCircle, MapPin, Calendar, FileText } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import type { Lang } from "./translations";

interface ServiceRequestModalProps {
  lang: Lang;
  selectedService?: string;
  onClose: () => void;
  onLoginRequired: () => void;
  isLoggedIn: boolean;
}

const serviceLabels: Record<string, { es: string; en: string }> = {
  plomero: { es: "Plomero", en: "Plumber" },
  gasista: { es: "Gasista", en: "Gas technician" },
  electricista: { es: "Electricista", en: "Electrician" },
  albanil: { es: "Albañil", en: "Mason" },
  cerrajero: { es: "Cerrajero", en: "Locksmith" },
  pintor: { es: "Pintor", en: "Painter" },
  tutor: { es: "Tutor", en: "Tutor" },
  constructor: { es: "Constructor", en: "Builder" },
  carpintero: { es: "Carpintero", en: "Carpenter" },
  jardinero: { es: "Jardinero", en: "Gardener" },
  tecnico: { es: "Técnico de PC", en: "PC Technician" },
  mecanico: { es: "Mecánico", en: "Mechanic" },
  limpieza: { es: "Limpieza", en: "Cleaning" },
  mudanza: { es: "Mudanza", en: "Moving" },
  chef: { es: "Chef a domicilio", en: "Personal Chef" },
  enfermeria: { es: "Enfermería", en: "Nursing" },
};

export function ServiceRequestModal({ lang, selectedService, onClose, onLoginRequired, isLoggedIn }: ServiceRequestModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ service: selectedService || "", description: "", address: "", preferredDate: "", urgency: "normal" });
  const update = (field: string, value: string) => setForm((f) => ({ ...f, [field]: value }));

  if (!isLoggedIn) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(7,9,26,0.85)", backdropFilter: "blur(8px)" }}>
        <div className="bg-card border border-border rounded-2xl p-8 max-w-sm w-full text-center flex flex-col items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
            <FileText className="w-7 h-7 text-primary" />
          </div>
          <h3 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 800, color: "#F0F4FF" }}>
            {lang === "es" ? "Necesitás iniciar sesión" : "You need to sign in"}
          </h3>
          <p className="text-sm text-muted-foreground">
            {lang === "es" ? "Para pedir un servicio, primero iniciá sesión o creá tu cuenta." : "To request a service, please sign in or create your account."}
          </p>
          <div className="flex gap-2 w-full">
            <Button variant="outline" onClick={onClose} className="flex-1 border-border text-foreground">
              {lang === "es" ? "Cancelar" : "Cancel"}
            </Button>
            <Button onClick={() => { onClose(); onLoginRequired(); }} className="flex-1 bg-primary hover:bg-primary/90 text-white" style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700 }}>
              {lang === "es" ? "Iniciar sesión" : "Sign in"}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(7,9,26,0.85)", backdropFilter: "blur(8px)" }}>
        <div className="bg-card border border-border rounded-2xl p-10 max-w-sm w-full text-center flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-green-400" />
          </div>
          <h3 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 800, fontSize: "1.3rem", color: "#F0F4FF" }}>
            {lang === "es" ? "¡Solicitud enviada!" : "Request submitted!"}
          </h3>
          <p className="text-sm text-muted-foreground">
            {lang === "es" ? "Los profesionales de tu zona recibirán tu solicitud." : "Professionals in your area will receive your request."}
          </p>
          <Button onClick={onClose} className="bg-primary hover:bg-primary/90 text-white">
            {lang === "es" ? "Cerrar" : "Close"}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(7,9,26,0.85)", backdropFilter: "blur(8px)" }}>
      <div className="bg-card border border-border rounded-2xl w-full max-w-md">
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-border">
          <h2 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 800, color: "#F0F4FF" }}>
            {lang === "es" ? "Solicitar servicio" : "Request service"}
          </h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="px-6 py-5 flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label className="text-xs text-muted-foreground">{lang === "es" ? "Tipo de servicio" : "Service type"} *</Label>
            <select required value={form.service} onChange={(e) => update("service", e.target.value)} className="w-full h-10 rounded-md px-3 text-sm border text-foreground" style={{ background: "#151B35", borderColor: "rgba(240,244,255,0.1)" }}>
              <option value="">{lang === "es" ? "Seleccioná un servicio" : "Select a service"}</option>
              {Object.keys(serviceLabels).map((k) => (
                <option key={k} value={k}>{serviceLabels[k][lang]}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label className="text-xs text-muted-foreground">{lang === "es" ? "Descripción" : "Description"} *</Label>
            <textarea required rows={3} value={form.description} onChange={(e) => update("description", e.target.value)} className="w-full rounded-md px-3 py-2 text-sm border text-foreground resize-none" style={{ background: "#151B35", borderColor: "rgba(240,244,255,0.1)" }} placeholder={lang === "es" ? "Describí el trabajo que necesitás..." : "Describe the job you need..."} />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label className="text-xs text-muted-foreground flex items-center gap-1"><MapPin className="w-3 h-3" /> {lang === "es" ? "Dirección" : "Address"} *</Label>
            <Input required value={form.address} onChange={(e) => update("address", e.target.value)} className="bg-muted border-border text-foreground" placeholder={lang === "es" ? "Av. Corrientes 1234, CABA" : "Your address"} />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label className="text-xs text-muted-foreground flex items-center gap-1"><Calendar className="w-3 h-3" /> {lang === "es" ? "Fecha preferida" : "Preferred date"}</Label>
            <Input type="date" value={form.preferredDate} onChange={(e) => update("preferredDate", e.target.value)} className="bg-muted border-border text-foreground" />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label className="text-xs text-muted-foreground">{lang === "es" ? "Urgencia" : "Urgency"}</Label>
            <div className="flex gap-2">
              {[{ val: "urgent", label: "🔴 Urgente" }, { val: "normal", label: "🟡 Normal" }, { val: "flexible", label: "🟢 Flexible" }].map((opt) => (
                <button
                  key={opt.val}
                  type="button"
                  onClick={() => update("urgency", opt.val)}
                  className="flex-1 py-2 text-xs rounded-lg border transition-all"
                  style={{
                    borderColor: form.urgency === opt.val ? "#F97316" : "rgba(240,244,255,0.1)",
                    background: form.urgency === opt.val ? "rgba(249,115,22,0.1)" : "#151B35",
                    color: form.urgency === opt.val ? "#F97316" : "#8A9BC0",
                    fontFamily: "Outfit, sans-serif",
                    fontWeight: 600,
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
          <Button type="submit" className="w-full h-11 bg-primary hover:bg-primary/90 text-white mt-1" style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700 }}>
            {lang === "es" ? "Enviar solicitud" : "Submit request"}
          </Button>
        </form>
      </div>
    </div>
  );
}
