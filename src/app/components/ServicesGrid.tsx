import type { ReactNode } from "react";
import { Flame, Droplets, Zap, HardHat, Key, Paintbrush, GraduationCap, Building2, Hammer, Leaf, Monitor, Car, Sparkles, Truck, ChefHat, Heart, ArrowRight } from "lucide-react";
import type { Lang } from "./translations";
import { translations } from "./translations";

interface ServicesGridProps {
  lang: Lang;
  onServiceClick: (service: string) => void;
}

const serviceIcons: Record<string, ReactNode> = {
  plomero: <Droplets className="w-6 h-6" />,
  gasista: <Flame className="w-6 h-6" />,
  electricista: <Zap className="w-6 h-6" />,
  albanil: <HardHat className="w-6 h-6" />,
  cerrajero: <Key className="w-6 h-6" />,
  pintor: <Paintbrush className="w-6 h-6" />,
  tutor: <GraduationCap className="w-6 h-6" />,
  constructor: <Building2 className="w-6 h-6" />,
  carpintero: <Hammer className="w-6 h-6" />,
  jardinero: <Leaf className="w-6 h-6" />,
  tecnico: <Monitor className="w-6 h-6" />,
  mecanico: <Car className="w-6 h-6" />,
  limpieza: <Sparkles className="w-6 h-6" />,
  mudanza: <Truck className="w-6 h-6" />,
  chef: <ChefHat className="w-6 h-6" />,
  enfermeria: <Heart className="w-6 h-6" />,
};

const serviceColors: string[] = [
  "#F97316",
  "#FBBF24",
  "#10B981",
  "#6366F1",
  "#EC4899",
  "#3B82F6",
  "#8B5CF6",
  "#14B8A6",
  "#F59E0B",
  "#22C55E",
  "#EF4444",
  "#0EA5E9",
  "#A78BFA",
  "#34D399",
  "#FB923C",
  "#F472B6",
];

export function ServicesGrid({ lang, onServiceClick }: ServicesGridProps) {
  const t = translations[lang].services;
  const serviceKeys = Object.keys(t.list) as Array<keyof typeof t.list>;

  return (
    <section id="services" className="py-24 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-muted mb-4 text-xs text-muted-foreground" style={{ fontFamily: "Outfit, sans-serif" }}>
          Servicios disponibles
        </div>
        <h2 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem, 4vw, 2.8rem)", color: "#F0F4FF", lineHeight: 1.2 }}>
          {t.title}
        </h2>
        <p className="text-muted-foreground mt-3 max-w-xl mx-auto">{t.subtitle}</p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {serviceKeys.map((key, i) => {
          const color = serviceColors[i % serviceColors.length];
          return (
            <button
              key={key}
              onClick={() => onServiceClick(key)}
              className="group relative flex flex-col items-center gap-3 p-5 rounded-xl border border-border bg-card hover:border-opacity-60 transition-all duration-200 hover:-translate-y-0.5 text-center overflow-hidden"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-200" style={{ background: color }} />
              <div className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200" style={{ background: `${color}20`, color }}>
                {serviceIcons[key]}
              </div>
              <span className="text-sm text-foreground" style={{ fontFamily: "Outfit, sans-serif", fontWeight: 600 }}>
                {t.list[key]}
              </span>
              <div className="flex items-center gap-1 text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                <span>{t.cta.split(" ").slice(0, 2).join(" ")}</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
