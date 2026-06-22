import { useState, type FormEvent } from "react";
import { X, CheckCircle, Upload, User, Briefcase, Star, AlertCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import type { Lang } from "./translations";
import { translations } from "./translations";

interface WorkerRegistrationModalProps {
  lang: Lang;
  onClose: () => void;
}

const categories = {
  es: ["Plomero","Gasista","Electricista","Albañil","Cerrajero","Pintor","Tutor","Constructor","Carpintero","Jardinero","Técnico de PC","Mecánico","Limpieza","Mudanza","Chef a domicilio","Enfermería"],
  en: ["Plumber","Gas technician","Electrician","Mason","Locksmith","Painter","Tutor","Builder","Carpenter","Gardener","PC Technician","Mechanic","Cleaning","Moving","Personal Chef","Nursing"],
};

const zones = {
  es: ["CABA","Gran Buenos Aires Norte","Gran Buenos Aires Sur","Gran Buenos Aires Oeste","Córdoba","Rosario","Mendoza","La Plata","Mar del Plata","Tucumán"],
  en: ["CABA","Greater Buenos Aires North","Greater Buenos Aires South","Greater Buenos Aires West","Córdoba","Rosario","Mendoza","La Plata","Mar del Plata","Tucumán"],
};

export function WorkerRegistrationModal({ lang, onClose }: WorkerRegistrationModalProps) {
  const t = translations[lang].workerReg;
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    firstName: "", lastName: "", title: "", dni: "", phone: "", email: "", category: "", experience: "", zone: "", bio: "", certifications: "", emergencyContact: "", references: "", terms: false,
  });

  const update = (field: string, value: string | boolean) => setForm((f) => ({ ...f, [field]: value }));
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.terms) return;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(7,9,26,0.85)", backdropFilter: "blur(8px)" }}>
        <div className="bg-card border border-border rounded-2xl p-10 max-w-sm w-full text-center flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-green-400" />
          </div>
          <h3 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 800, fontSize: "1.4rem", color: "#F0F4FF" }}>
            {lang === "es" ? "¡Solicitud enviada!" : "Application submitted!"}
          </h3>
          <p className="text-muted-foreground text-sm">{t.form.success}</p>
          <Button onClick={onClose} className="bg-primary hover:bg-primary/90 text-white mt-2">
            {lang === "es" ? "Cerrar" : "Close"}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(7,9,26,0.85)", backdropFilter: "blur(8px)" }}>
      <div className="bg-card border border-border rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-card border-b border-border px-6 py-4 flex items-center justify-between z-10">
          <div>
            <h2 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 800, color: "#F0F4FF" }}>{t.title}</h2>
            <p className="text-xs text-muted-foreground">{t.subtitle}</p>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors p-1">
            <X className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="px-6 py-5 flex flex-col gap-5">
          <div className="flex items-center gap-2 border-b border-border pb-2">
            <User className="w-4 h-4 text-primary" />
            <span className="text-sm" style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, color: "#F0F4FF" }}>
              {lang === "es" ? "Datos personales" : "Personal data"}
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="firstName" className="text-xs text-muted-foreground">{t.form.firstName} *</Label>
              <Input id="firstName" required value={form.firstName} onChange={(e) => update("firstName", e.target.value)} className="bg-muted border-border text-foreground" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="lastName" className="text-xs text-muted-foreground">{t.form.lastName} *</Label>
              <Input id="lastName" required value={form.lastName} onChange={(e) => update("lastName", e.target.value)} className="bg-muted border-border text-foreground" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="dni" className="text-xs text-muted-foreground">{t.form.dni} *</Label>
              <Input id="dni" required value={form.dni} onChange={(e) => update("dni", e.target.value)} className="bg-muted border-border text-foreground" placeholder="XX.XXX.XXX" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="phone" className="text-xs text-muted-foreground">{t.form.phone} *</Label>
              <Input id="phone" required type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} className="bg-muted border-border text-foreground" placeholder="+54 9 11 XXXX-XXXX" />
            </div>
            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <Label htmlFor="email" className="text-xs text-muted-foreground">{t.form.email} *</Label>
              <Input id="email" required type="email" value={form.email} onChange={(e) => update("email", e.target.value)} className="bg-muted border-border text-foreground" />
            </div>
          </div>

          <div className="flex items-center gap-2 border-b border-border pb-2 mt-2">
            <Briefcase className="w-4 h-4 text-primary" />
            <span className="text-sm" style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, color: "#F0F4FF" }}>
              {lang === "es" ? "Información profesional" : "Professional information"}
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="profTitle" className="text-xs text-muted-foreground">{t.form.title} *</Label>
              <Input id="profTitle" required value={form.title} onChange={(e) => update("title", e.target.value)} className="bg-muted border-border text-foreground" placeholder={lang === "es" ? "Ej: Plomero matriculado" : "E.g: Licensed plumber"} />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs text-muted-foreground">{t.form.category} *</Label>
              <select required value={form.category} onChange={(e) => update("category", e.target.value)} className="w-full h-10 rounded-md px-3 text-sm border text-foreground" style={{ background: "#151B35", borderColor: "rgba(240,244,255,0.1)" }}>
                <option value="">{lang === "es" ? "Seleccioná una categoría" : "Select a category"}</option>
                {categories[lang].map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs text-muted-foreground">{t.form.experience} *</Label>
              <select required value={form.experience} onChange={(e) => update("experience", e.target.value)} className="w-full h-10 rounded-md px-3 text-sm border text-foreground" style={{ background: "#151B35", borderColor: "rgba(240,244,255,0.1)" }}>
                <option value="">{lang === "es" ? "Seleccioná" : "Select"}</option>
                {['1-2','3-5','6-10','10+'].map((y) => (
                  <option key={y} value={y}>{y} {lang === "es" ? "años" : "years"}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs text-muted-foreground">{t.form.zone} *</Label>
              <select required value={form.zone} onChange={(e) => update("zone", e.target.value)} className="w-full h-10 rounded-md px-3 text-sm border text-foreground" style={{ background: "#151B35", borderColor: "rgba(240,244,255,0.1)" }}>
                <option value="">{lang === "es" ? "Seleccioná tu zona" : "Select your zone"}</option>
                {zones[lang].map((z) => (
                  <option key={z} value={z}>{z}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label className="text-xs text-muted-foreground">{t.form.bio} *</Label>
            <textarea required rows={3} value={form.bio} onChange={(e) => update("bio", e.target.value)} className="w-full rounded-md px-3 py-2 text-sm border text-foreground resize-none" style={{ background: "#151B35", borderColor: "rgba(240,244,255,0.1)" }} placeholder={lang === "es" ? "Contanos sobre tu experiencia..." : "Tell us about your experience..."} />
          </div>

          <div className="flex items-center gap-2 border-b border-border pb-2 mt-2">
            <Star className="w-4 h-4 text-accent" />
            <span className="text-sm" style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, color: "#F0F4FF" }}>
              {lang === "es" ? "Certificaciones y referencias" : "Certifications and references"}
            </span>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs text-muted-foreground">{t.form.certifications}</Label>
              <textarea rows={2} value={form.certifications} onChange={(e) => update("certifications", e.target.value)} className="w-full rounded-md px-3 py-2 text-sm border text-foreground resize-none" style={{ background: "#151B35", borderColor: "rgba(240,244,255,0.1)" }} placeholder={lang === "es" ? "Ej: Matrícula 12345, Certificado IRAM..." : "E.g: License 12345, IRAM Certificate..."} />
            </div>
            <div className="border border-dashed border-border rounded-xl p-6 flex flex-col items-center gap-2 cursor-pointer hover:border-primary/40 transition-colors">
              <Upload className="w-6 h-6 text-muted-foreground" />
              <span className="text-sm text-muted-foreground text-center">{lang === "es" ? "Subir foto de certificados, títulos o licencias" : "Upload photos of certificates, degrees or licenses"}</span>
              <span className="text-xs text-muted-foreground">JPG, PNG, PDF — {lang === "es" ? "Máx 10MB" : "Max 10MB"}</span>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs text-muted-foreground">{t.form.emergencyContact} *</Label>
              <Input required value={form.emergencyContact} onChange={(e) => update("emergencyContact", e.target.value)} className="bg-muted border-border text-foreground" placeholder={lang === "es" ? "Nombre y teléfono" : "Name and phone"} />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs text-muted-foreground">{t.form.references}</Label>
              <textarea rows={2} value={form.references} onChange={(e) => update("references", e.target.value)} className="w-full rounded-md px-3 py-2 text-sm border text-foreground resize-none" style={{ background: "#151B35", borderColor: "rgba(240,244,255,0.1)" }} placeholder={lang === "es" ? "Nombre, empresa, teléfono..." : "Name, company, phone..."} />
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-xl border border-border bg-muted/50">
            <AlertCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
            <label className="flex items-start gap-2 cursor-pointer">
              <input type="checkbox" checked={form.terms} onChange={(e) => update("terms", e.target.checked)} className="mt-0.5 accent-orange-500" />
              <span className="text-xs text-muted-foreground">{t.form.terms}</span>
            </label>
          </div>

          <Button type="submit" disabled={!form.terms} className="w-full h-12 bg-primary hover:bg-primary/90 text-white disabled:opacity-50" style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: "1rem" }}>
            {t.form.submit}
          </Button>
        </form>
      </div>
    </div>
  );
}
