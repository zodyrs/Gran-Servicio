import { useState } from "react";
import { Globe, Menu, X, Wrench } from "lucide-react";
import { Button } from "./ui/button";
import type { Lang } from "./translations";
import { translations } from "./translations";

interface NavbarProps {
  lang: Lang;
  setLang: (l: Lang) => void;
  onLoginClient: () => void;
  onRegisterWorker: () => void;
  onScrollTo: (id: string) => void;
}

export function Navbar({ lang, setLang, onLoginClient, onRegisterWorker, onScrollTo }: NavbarProps) {
  const t = translations[lang].nav;
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { label: t.services, id: "services" },
    { label: t.howItWorks, id: "how" },
    { label: t.plans, id: "plans" },
    { label: t.construction, id: "construction" },
    { label: t.admin, id: "admin" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-card/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        <button
          onClick={() => onScrollTo("hero")}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Wrench className="w-4 h-4 text-white" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-xs text-muted-foreground" style={{ fontFamily: "Outfit, sans-serif" }}>
              CorDex
            </span>
            <span className="text-sm text-foreground" style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700 }}>
              Gran Servicio
            </span>
          </div>
        </button>

        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => onScrollTo(link.id)}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </button>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-2">
          <button
            onClick={() => setLang(lang === "es" ? "en" : "es")}
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded border border-border"
          >
            <Globe className="w-3 h-3" />
            {lang === "es" ? "EN" : "ES"}
          </button>

          <Button variant="ghost" size="sm" onClick={onLoginClient} className="text-foreground">
            {t.loginClient}
          </Button>
          <Button size="sm" onClick={onRegisterWorker} className="bg-primary hover:bg-primary/90 text-white">
            {t.registerWorker}
          </Button>
        </div>

        <button className="md:hidden text-foreground" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-card border-t border-border px-4 py-4 flex flex-col gap-3">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                onScrollTo(link.id);
                setMenuOpen(false);
              }}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors text-left"
            >
              {link.label}
            </button>
          ))}
          <div className="flex gap-2 mt-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                onLoginClient();
                setMenuOpen(false);
              }}
              className="text-foreground flex-1"
            >
              {t.loginClient}
            </Button>
            <Button
              size="sm"
              onClick={() => {
                onRegisterWorker();
                setMenuOpen(false);
              }}
              className="bg-primary hover:bg-primary/90 text-white flex-1"
            >
              {t.registerWorker}
            </Button>
          </div>
          <button
            onClick={() => setLang(lang === "es" ? "en" : "es")}
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <Globe className="w-3 h-3" />
            {lang === "es" ? "Switch to English" : "Cambiar a Español"}
          </button>
        </div>
      )}
    </nav>
  );
}
