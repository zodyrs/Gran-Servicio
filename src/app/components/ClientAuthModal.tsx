import { useState, type FormEvent } from "react";
import { X, Wrench } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import type { Lang } from "./translations";
import { translations } from "./translations";

interface ClientAuthModalProps {
  lang: Lang;
  onClose: () => void;
  onSuccess: (name: string) => void;
}

export function ClientAuthModal({ lang, onClose, onSuccess }: ClientAuthModalProps) {
  const t = translations[lang].clientAuth;
  const [mode, setMode] = useState<"login" | "register">("login");
  const [form, setForm] = useState({ name: "", email: "", password: "", phone: "", address: "" });
  const update = (field: string, value: string) => setForm((f) => ({ ...f, [field]: value }));
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSuccess(form.name || form.email.split("@")[0]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(7,9,26,0.85)", backdropFilter: "blur(8px)" }}>
      <div className="bg-card border border-border rounded-2xl w-full max-w-md">
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-border">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
              <Wrench className="w-3.5 h-3.5 text-white" />
            </div>
            <span style={{ fontFamily: "Outfit, sans-serif", fontWeight: 800, color: "#F0F4FF" }}>
              {mode === "login" ? t.loginTitle : t.registerTitle}
            </span>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="px-6 py-5 flex flex-col gap-4">
          {mode === "register" && (
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs text-muted-foreground">{t.name} *</Label>
              <Input required value={form.name} onChange={(e) => update("name", e.target.value)} className="bg-muted border-border text-foreground" />
            </div>
          )}
          <div className="flex flex-col gap-1.5">
            <Label className="text-xs text-muted-foreground">{t.email} *</Label>
            <Input required type="email" value={form.email} onChange={(e) => update("email", e.target.value)} className="bg-muted border-border text-foreground" />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label className="text-xs text-muted-foreground">{t.password} *</Label>
            <Input required type="password" value={form.password} onChange={(e) => update("password", e.target.value)} className="bg-muted border-border text-foreground" />
          </div>
          {mode === "register" && (
            <>
              <div className="flex flex-col gap-1.5">
                <Label className="text-xs text-muted-foreground">{t.phone}</Label>
                <Input type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} className="bg-muted border-border text-foreground" placeholder="+54 9 11 XXXX-XXXX" />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label className="text-xs text-muted-foreground">{t.address}</Label>
                <Input value={form.address} onChange={(e) => update("address", e.target.value)} className="bg-muted border-border text-foreground" />
              </div>
            </>
          )}
          <Button type="submit" className="w-full h-11 bg-primary hover:bg-primary/90 text-white mt-1" style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700 }}>
            {mode === "login" ? t.loginBtn : t.registerBtn}
          </Button>
          <button type="button" onClick={() => setMode(mode === "login" ? "register" : "login")} className="text-xs text-center text-muted-foreground hover:text-primary transition-colors">
            {mode === "login" ? t.switchToRegister : t.switchToLogin}
          </button>
        </form>
      </div>
    </div>
  );
}
