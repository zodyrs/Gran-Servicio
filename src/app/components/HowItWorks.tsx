import { Search, MessageSquare, CheckCircle } from "lucide-react";
import type { Lang } from "./translations";
import { translations } from "./translations";

interface HowItWorksProps {
  lang: Lang;
}

const stepIcons = [
  <Search className="w-7 h-7" key="icon-1" />, 
  <MessageSquare className="w-7 h-7" key="icon-2" />,
  <CheckCircle className="w-7 h-7" key="icon-3" />,
];

export function HowItWorks({ lang }: HowItWorksProps) {
  const t = translations[lang].how;

  return (
    <section id="how" className="py-24 px-4 sm:px-6" style={{ background: "linear-gradient(180deg, #07091A 0%, #0F1328 50%, #07091A 100%)" }}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <h2 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem, 4vw, 2.8rem)", color: "#F0F4FF", lineHeight: 1.2 }}>
            {t.title}
          </h2>
          <p className="text-muted-foreground mt-3 max-w-lg mx-auto">{t.subtitle}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          <div className="hidden md:block absolute top-12 left-1/4 right-1/4 h-px bg-gradient-to-r from-primary/50 via-accent/50 to-primary/50" />
          {t.steps.map((step, i) => (
            <div key={i} className="flex flex-col items-center text-center gap-4 relative">
              <div className="relative">
                <div
                  className="w-20 h-20 rounded-2xl flex items-center justify-center relative z-10 border"
                  style={{
                    background: `linear-gradient(135deg, ${i === 0 ? "#F97316" : i === 1 ? "#FBBF24" : "#10B981"}20, ${i === 0 ? "#F97316" : i === 1 ? "#FBBF24" : "#10B981"}05)`,
                    borderColor: `${i === 0 ? "#F97316" : i === 1 ? "#FBBF24" : "#10B981"}40`,
                    color: i === 0 ? "#F97316" : i === 1 ? "#FBBF24" : "#10B981",
                  }}
                >
                  {stepIcons[i]}
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs text-white z-20" style={{ background: i === 0 ? "#F97316" : i === 1 ? "#FBBF24" : "#10B981", fontFamily: "Outfit, sans-serif", fontWeight: 800 }}>
                  {i + 1}
                </div>
              </div>
              <h3 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, color: "#F0F4FF" }}>
                {step.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
