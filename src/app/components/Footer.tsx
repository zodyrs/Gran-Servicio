import { Wrench, Globe, Link2, Mail, Phone } from "lucide-react";
import type { Lang } from "./translations";
import { translations } from "./translations";

interface FooterProps {
  lang: Lang;
  onScrollTo: (id: string) => void;
}

export function Footer({ lang, onScrollTo }: FooterProps) {
  const t = translations[lang].footer;
  return (
    <footer className="border-t border-border py-12 px-4 sm:px-6" style={{ background: "#07091A" }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          <div className="sm:col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Wrench className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground" style={{ fontFamily: "Outfit, sans-serif" }}>CorDex</div>
                <div className="text-sm text-foreground" style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700 }}>Gran Servicio</div>
              </div>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-xs">{t.desc}</p>
            <div className="flex gap-3 mt-4">
              {[Globe, Link2, Mail, Phone].map((Icon, i) => (
                <button key={i} className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all">
                  <Icon className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider mb-3" style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700 }}>{t.links}</div>
            <div className="flex flex-col gap-2">
              {[{ label: lang === "es" ? "Servicios" : "Services", id: "services" }, { label: lang === "es" ? "¿Cómo funciona?" : "How it works", id: "how" }, { label: lang === "es" ? "Planes" : "Plans", id: "plans" }, { label: lang === "es" ? "Construcción" : "Construction", id: "construction" }].map((link) => (
                <button key={link.id} onClick={() => onScrollTo(link.id)} className="text-xs text-muted-foreground hover:text-foreground transition-colors text-left">{link.label}</button>
              ))}
            </div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider mb-3" style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700 }}>{t.company}</div>
            <div className="flex flex-col gap-2">
              {[lang === "es" ? "Acerca de CorDex" : "About CorDex", lang === "es" ? "Trabaja con nosotros" : "Work with us", "Blog", lang === "es" ? "Prensa" : "Press"].map((item) => (
                <button key={item} className="text-xs text-muted-foreground hover:text-foreground transition-colors text-left">{item}</button>
              ))}
            </div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider mb-3" style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700 }}>{t.legal}</div>
            <div className="flex flex-col gap-2">
              {[lang === "es" ? "Términos de uso" : "Terms of use", lang === "es" ? "Política de privacidad" : "Privacy policy", "Cookies", lang === "es" ? "Soporte" : "Support"].map((item) => (
                <button key={item} className="text-xs text-muted-foreground hover:text-foreground transition-colors text-left">{item}</button>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} CorDex. {t.rights}</p>
          <p className="text-xs text-muted-foreground">{lang === "es" ? "Hecho con ❤️ en Argentina" : "Made with ❤️ in Argentina"}</p>
        </div>
      </div>
    </footer>
  );
}
