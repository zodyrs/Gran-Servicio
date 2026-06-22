import { useState } from "react";
import { X, CheckCircle, Building2 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import type { Lang } from "./translations";

interface ConstructionContactModalProps {
  lang: Lang;
  onClose: () => void;
}

const projectTypes = {
  es: ["Edificio residencial","Local comercial","Oficinas","Planta industrial","Galpón","Remodelación","Otro"],
  en: ["Residential building","Commercial space","Offices","Industrial plant","Warehouse","Renovation","Other"],
};

export function ConstructionContactModal({ lang, onClose }: ConstructionContactModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", company: "", phone: "", email: "", projectType: "", budget: "", description: "" });
  const update = (f: string, v: string) => setForm((prev) => ({ ...prev, [f]: v }));

  if (submitted) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(7,9,26,0.85)", backdropFilter: "blur(8px)" }}>
        <div className="bg-card border border-border rounded-2xl p-10 max-w-sm w-full text-center flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.3)" }}>
            <CheckCircle className="w-8 h-8" style={{ color: "#818CF8" }} />
          </div>
          <h3 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 800, fontSize: "1.3rem", color: "#F0F4FF" }}>
            {lang === "es" ? "¡Consulta enviada!" : "Inquiry submitted!"}
          </h3>
          <p className="text-sm text-muted-foreground">
            {lang === "es" ? "Nuestro equipo de construcción se pondrá en contacto dentro de las 48 horas hábiles." : "Our construction team will contact you within 48 business hours."}
          </p>
          <Button onClick={onClose} style={{ background: "linear-gradient(135deg, #6366F1, #818CF8)", color: "#fff", fontFamily: "Outfit, sans-serif", fontWeight: 700 }}>
            {lang === "es" ? "Cerrar" : "Close"}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(7,9,26,0.85)", backdropFilter: "blur(8px)" }}>
      <div className="bg-card border border-border rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-card flex items-center justify-between px-6 pt-6 pb-4 border-b border-border z-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(99,102,241,0.2)", border: "1px solid rgba(99,102,241,0.3)" }}>
              <Building2 className="w-4 h-4" style={{ color: "#818CF8" }} />
            </div>
            <div>
              <div style={{ fontFamily: "Outfit, sans-serif", fontWeight: 800, color: "#F0F4FF", fontSize: "0.95rem" }}>CorDex Construction</div>
              <div className="text-xs text-muted-foreground">{lang === "es" ? "Consulta gratuita" : "Free consultation"}</div>
            </div>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="px-6 py-5 flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs text-muted-foreground">{lang === "es" ? "Nombre completo" : "Full name"} *</Label>
              <Input required value={form.name} onChange={(e) => update("name", e.target.value)} className="bg-muted border-border text-foreground" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs text-muted-foreground">{lang === "es" ? "Empresa (opcional)" : "Company (optional)"}</Label>
              <Input value={form.company} onChange={(e) => update("company", e.target.value)} className="bg-muted border-border text-foreground" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs text-muted-foreground">{lang === "es" ? "Teléfono" : "Phone"} *</Label>
              <Input required type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} className="bg-muted border-border text-foreground" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs text-muted-foreground">Email *</Label>
              <Input required type="email" value={form.email} onChange={(e) => update("email", e.target.value)} className="bg-muted border-border text-foreground" />
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label className="text-xs text-muted-foreground">{lang === "es" ? "Tipo de proyecto" : "Project type"} *</Label>
            <select required value={form.projectType} onChange={(e) => update("projectType", e.target.value)} className="w-full h-10 rounded-md px-3 text-sm border text-foreground" style={{ background: "#151B35", borderColor: "rgba(240,244,255,0.1)" }}>
              <option value="">{lang === "es" ? "Seleccioná el tipo" : "Select type"}</option>
              {projectTypes[lang].map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label className="text-xs text-muted-foreground">{lang === "es" ? "Presupuesto estimado (ARS)" : "Estimated budget (ARS)"}</Label>
            <select value={form.budget} onChange={(e) => update("budget", e.target.value)} className="w-full h-10 rounded-md px-3 text-sm border text-foreground" style={{ background: "#151B35", borderColor: "rgba(240,244,255,0.1)" }}>
              <option value="">{lang === "es" ? "Seleccioná rango" : "Select range"}</option>
              {['< $5.000.000','$5M - $20M','$20M - $100M','$100M - $500M','> $500M'].map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label className="text-xs text-muted-foreground">{lang === "es" ? "Descripción del proyecto" : "Project description"}</Label>
            <textarea rows={3} value={form.description} onChange={(e) => update("description", e.target.value)} className="w-full rounded-md px-3 py-2 text-sm border text-foreground resize-none" style={{ background: "#151B35", borderColor: "rgba(240,244,255,0.1)" }} placeholder={lang === "es" ? "Contanos sobre tu proyecto..." : "Tell us about your project..."} />
          </div>
          <Button type="submit" className="w-full h-11 mt-1" style={{ background: "linear-gradient(135deg, #6366F1, #818CF8)", color: "#fff", fontFamily: "Outfit, sans-serif", fontWeight: 700 }}>
            {lang === "es" ? "Solicitar consulta gratuita" : "Request free consultation"}
          </Button>
        </form>
      </div>
    </div>
  );
}
