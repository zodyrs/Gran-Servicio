import { Building2, Award, CheckCircle, ArrowRight, Shield } from "lucide-react";
import { Button } from "./ui/button";
import type { Lang } from "./translations";
import { translations } from "./translations";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface ConstructionSectionProps {
  lang: Lang;
  onContact: () => void;
}

const certifications = ["ISO 9001:2015", "IRAM 30100", "CIRSOC", "Registro Nacional de Constructores"];
const projects = [
  { name: "Torre Belgrano", type: "Residencial · 22 pisos", img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&h=300&fit=crop&auto=format", year: "2024" },
  { name: "Centro Comercial Palermo", type: "Comercial · 8.000 m2", img: "https://images.unsplash.com/photo-1555636222-cae831e670b3?w=400&h=300&fit=crop&auto=format", year: "2023" },
  { name: "Planta Industrial Tigre", type: "Industrial · 15.000 m2", img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=300&fit=crop&auto=format", year: "2024" },
];

export function ConstructionSection({ lang, onContact }: ConstructionSectionProps) {
  const t = translations[lang].construction;

  return (
    <section id="construction" className="py-24 px-4 sm:px-6 relative overflow-hidden" style={{ background: "linear-gradient(180deg, #07091A 0%, #080C1E 50%, #07091A 100%)" }}>
      <div className="absolute inset-0 opacity-3 pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(99,102,241,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.15) 1px, transparent 1px)", backgroundSize: "80px 80px" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-5 blur-3xl pointer-events-none" style={{ background: "radial-gradient(circle, #6366F1, transparent)" }} />
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border mb-5" style={{ borderColor: "rgba(99,102,241,0.4)", background: "rgba(99,102,241,0.1)" }}>
              <Building2 className="w-3.5 h-3.5" style={{ color: "#818CF8" }} />
              <span className="text-xs" style={{ fontFamily: "Outfit, sans-serif", fontWeight: 600, color: "#818CF8" }}>{t.badge}</span>
            </div>
            <h2 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 900, fontSize: "clamp(2rem, 4.5vw, 3.2rem)", color: "#F0F4FF", lineHeight: 1.1, marginBottom: "1rem" }}>
              {t.title}
            </h2>
            <p className="text-muted-foreground mb-8" style={{ lineHeight: 1.8, maxWidth: "480px" }}>{t.subtitle}</p>
            <Button
              onClick={onContact}
              className="group flex items-center gap-2 h-12 px-6"
              style={{ background: "linear-gradient(135deg, #6366F1, #818CF8)", color: "#fff", fontFamily: "Outfit, sans-serif", fontWeight: 700 }}
            >
              {t.cta}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <div className="flex gap-8 mt-8">
              {[
                { value: "15+", label: lang === "es" ? "Años de experiencia" : "Years of experience" },
                { value: "120+", label: lang === "es" ? "Proyectos completados" : "Projects completed" },
                { value: "98%", label: lang === "es" ? "Satisfacción" : "Satisfaction" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div style={{ fontFamily: "Outfit, sans-serif", fontWeight: 900, fontSize: "1.8rem", color: "#818CF8" }}>{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative rounded-2xl overflow-hidden border" style={{ borderColor: "rgba(99,102,241,0.2)", aspectRatio: "4/3" }}>
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1541976590-713941681591?w=800&h=600&fit=crop&auto=format"
              alt="Construcción de edificio CorDex"
              className="w-full h-full object-cover opacity-75"
            />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #07091A 0%, transparent 60%)" }} />
            <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ background: "rgba(99,102,241,0.2)", border: "1px solid rgba(99,102,241,0.4)" }}>
                <Shield className="w-5 h-5" style={{ color: "#818CF8" }} />
              </div>
              <div>
                <div className="text-sm text-foreground" style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700 }}>CorDex Construction</div>
                <div className="text-xs text-muted-foreground">Empresa certificada ISO 9001</div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {t.features.map((feat, i) => (
            <div key={i} className="rounded-xl p-5 border transition-all duration-200 hover:-translate-y-0.5" style={{ borderColor: "rgba(99,102,241,0.15)", background: "rgba(99,102,241,0.05)" }}>
              <CheckCircle className="w-5 h-5 mb-3" style={{ color: "#818CF8" }} />
              <h4 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, color: "#F0F4FF", marginBottom: "0.5rem" }}>{feat.title}</h4>
              <p className="text-sm text-muted-foreground">{feat.desc}</p>
            </div>
          ))}
        </div>
        <div className="mb-12">
          <h3 className="mb-6 text-center" style={{ fontFamily: "Outfit, sans-serif", fontWeight: 800, fontSize: "1.5rem", color: "#F0F4FF" }}>
            {lang === "es" ? "Proyectos destacados" : "Featured projects"}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {projects.map((proj) => (
              <div key={proj.name} className="group relative rounded-xl overflow-hidden border" style={{ borderColor: "rgba(99,102,241,0.15)", aspectRatio: "4/3", background: "#0F1328" }}>
                <ImageWithFallback src={proj.img} alt={proj.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-70" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(7,9,26,0.95) 0%, transparent 60%)" }} />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="text-sm text-foreground" style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700 }}>{proj.name}</div>
                  <div className="text-xs text-muted-foreground">{proj.type} · {proj.year}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="text-center">
          <div className="text-xs text-muted-foreground mb-4" style={{ fontFamily: "Outfit, sans-serif", fontWeight: 600, letterSpacing: "0.1em" }}>
            {t.certTitle.toUpperCase()}
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {certifications.map((cert) => (
              <div key={cert} className="flex items-center gap-1.5 px-4 py-2 rounded-full border text-sm" style={{ borderColor: "rgba(99,102,241,0.25)", background: "rgba(99,102,241,0.05)", color: "#A5B4FC" }}>
                <Award className="w-3.5 h-3.5" />
                {cert}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
