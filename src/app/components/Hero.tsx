import { ArrowRight, Star, Shield, Zap } from "lucide-react";
import { Button } from "./ui/button";
import type { Lang } from "./translations";
import { translations } from "./translations";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface HeroProps {
  lang: Lang;
  onRequestService: () => void;
  onRegisterWorker: () => void;
}

export function Hero({ lang, onRequestService, onRegisterWorker }: HeroProps) {
  const t = translations[lang].hero;
  const stats = [
    { value: "2.400+", label: t.stats.workers },
    { value: "18.000+", label: t.stats.clients },
    { value: "54.000+", label: t.stats.services },
    { value: "4.9 ★", label: t.stats.rating },
  ];

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden pt-16">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-24 w-96 h-96 rounded-full opacity-20 blur-3xl" style={{ background: "radial-gradient(circle, #F97316, transparent)" }} />
        <div className="absolute bottom-1/4 -right-24 w-96 h-96 rounded-full opacity-15 blur-3xl" style={{ background: "radial-gradient(circle, #FBBF24, transparent)" }} />
        <div className="absolute top-3/4 left-1/3 w-64 h-64 rounded-full opacity-10 blur-3xl" style={{ background: "radial-gradient(circle, #6366F1, transparent)" }} />
      </div>
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "linear-gradient(rgba(240,244,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(240,244,255,0.3) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col gap-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10 w-fit">
            <Zap className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs text-primary" style={{ fontFamily: "Outfit, sans-serif", fontWeight: 600 }}>
              {t.badge}
            </span>
          </div>
          <div>
            <h1 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 800, fontSize: "clamp(2.5rem, 5vw, 4rem)", lineHeight: 1.1, color: "#F0F4FF" }}>
              {t.title}
              <br />
              <span style={{ color: "#F97316" }}>{t.titleHighlight}</span>
            </h1>
          </div>
          <p className="text-muted-foreground max-w-md" style={{ fontSize: "1.05rem", lineHeight: 1.7 }}>
            {t.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={onRequestService}
              className="group bg-primary hover:bg-primary/90 text-white px-6 py-3 h-auto flex items-center gap-2"
              style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: "1rem" }}
            >
              {t.ctaRequest}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              onClick={onRegisterWorker}
              variant="outline"
              className="border-border hover:border-primary/50 text-foreground px-6 py-3 h-auto"
              style={{ fontFamily: "Outfit, sans-serif", fontWeight: 600, fontSize: "1rem" }}
            >
              {t.ctaWork}
            </Button>
          </div>
          <div className="flex items-center gap-4 pt-2">
            <div className="flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-primary" />
              <span className="text-xs text-muted-foreground">Profesionales verificados</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Star className="w-4 h-4 text-accent" />
              <span className="text-xs text-muted-foreground">4.9/5 calificación</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <div className="relative rounded-2xl overflow-hidden border border-border" style={{ aspectRatio: "4/3", background: "#0F1328" }}>
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=800&h=600&fit=crop&auto=format"
              alt="Profesional trabajando en una instalación eléctrica"
              className="w-full h-full object-cover opacity-80"
            />
            <div className="absolute bottom-4 left-4 right-4">
              <div className="bg-card/90 backdrop-blur-sm border border-border rounded-xl p-3 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center shrink-0">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm text-foreground" style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700 }}>
                    Profesional verificado
                  </div>
                  <div className="text-xs text-muted-foreground">CorDex certifica cada profesional</div>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-xl border border-border bg-card p-4 text-center hover:border-primary/30 transition-colors">
                <div style={{ fontFamily: "Outfit, sans-serif", fontWeight: 800, fontSize: "1.5rem", color: "#F97316" }}>
                  {stat.value}
                </div>
                <div className="text-xs text-muted-foreground mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
