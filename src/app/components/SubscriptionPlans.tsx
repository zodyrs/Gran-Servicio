import { useState, type FormEvent } from "react";
import { Check, Zap } from "lucide-react";
import { Button } from "./ui/button";
import { supabase } from "../../lib/supabaseClient";
import type { Lang } from "./translations";
import { translations } from "./translations";

interface SubscriptionPlansProps {
  lang: Lang;
  onChoosePlan: (plan: string) => void;
}

const planColors = ["#8A9BC0", "#F97316", "#FBBF24"];

export function SubscriptionPlans({ lang, onChoosePlan }: SubscriptionPlansProps) {
  const t = translations[lang].plans;
  const [subscriberName, setSubscriberName] = useState("");
  const [subscriberEmail, setSubscriberEmail] = useState("");
  const [subscribeState, setSubscribeState] = useState<"idle" | "success" | "error">("idle");
  const [subscribeMessage, setSubscribeMessage] = useState<string>("");

  const handleSubscribe = async (e: FormEvent) => {
    e.preventDefault();
    setSubscribeState("idle");
    setSubscribeMessage("");

    try {
      const { error } = await supabase.from("suscriptores").insert([
        { nombre: subscriberName, email: subscriberEmail },
      ]);

      if (error) throw error;

      setSubscribeState("success");
      setSubscribeMessage(t.subscribeSuccess);
      setSubscriberName("");
      setSubscriberEmail("");
    } catch (err: any) {
      setSubscribeState("error");
      setSubscribeMessage(err.message || t.subscribeError);
    }
  };

  return (
    <section id="plans" className="py-24 px-4 sm:px-6 max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 mb-4">
          <Zap className="w-3.5 h-3.5 text-primary" />
          <span className="text-xs text-primary" style={{ fontFamily: "Outfit, sans-serif", fontWeight: 600 }}>
            {lang === "es" ? "Suscripciones" : "Subscriptions"}
          </span>
        </div>
        <h2 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem, 4vw, 2.8rem)", color: "#F0F4FF", lineHeight: 1.2 }}>
          {t.title}
        </h2>
        <p className="text-muted-foreground mt-3 max-w-lg mx-auto">{t.subtitle}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        {t.list.map((plan, i) => {
          const isPopular = (plan as any).popular;
          const color = planColors[i];

          return (
            <div
              key={plan.name}
              className="relative flex flex-col rounded-2xl border p-6 transition-all duration-200 hover:-translate-y-1"
              style={{
                borderColor: isPopular ? "#F97316" : i === 2 ? "#FBBF24" : "rgba(240,244,255,0.1)",
                background: isPopular ? "linear-gradient(135deg, #1A1010, #200D00)" : "#0F1328",
                boxShadow: isPopular ? "0 0 40px rgba(249,115,22,0.15)" : "none",
              }}
            >
              {isPopular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-primary text-white text-xs" style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700 }}>
                  {t.popular}
                </div>
              )}
              <div className="mb-4">
                <div className="text-sm text-muted-foreground mb-1" style={{ fontFamily: "Outfit, sans-serif" }}>
                  {plan.name}
                </div>
                <div style={{ fontFamily: "Outfit, sans-serif", fontWeight: 900, fontSize: "2rem", color }}>
                  {plan.price}
                </div>
                {plan.price !== "Gratis" && plan.price !== "Free" && (
                  <div className="text-xs text-muted-foreground">{t.monthly}</div>
                )}
              </div>
              <div className="flex flex-col gap-2.5 flex-1 mb-6">
                {plan.features.map((feat) => (
                  <div key={feat} className="flex items-start gap-2">
                    <Check className="w-4 h-4 shrink-0 mt-0.5" style={{ color }} />
                    <span className="text-sm text-foreground">{feat}</span>
                  </div>
                ))}
              </div>
              <Button
                onClick={() => onChoosePlan(plan.name)}
                className="w-full h-10"
                style={
                  isPopular
                    ? { background: "#F97316", color: "#fff", fontFamily: "Outfit, sans-serif", fontWeight: 700 }
                    : i === 2
                    ? { background: "#FBBF24", color: "#07091A", fontFamily: "Outfit, sans-serif", fontWeight: 700 }
                    : { background: "#1A2240", color: "#F0F4FF", fontFamily: "Outfit, sans-serif", fontWeight: 600 }
                }
              >
                {t.choose}
              </Button>
            </div>
          );
        })}
      </div>

      <div className="mt-16 rounded-3xl border border-border bg-card p-8">
        <div className="mb-6">
          <h3 className="text-2xl font-semibold text-foreground">{t.subscribeTitle}</h3>
          <p className="text-muted-foreground mt-2 max-w-2xl">{t.subscribeDescription}</p>
        </div>

        <form onSubmit={handleSubscribe} className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-muted-foreground mb-2">{t.subscribeName}</label>
            <input
              value={subscriberName}
              onChange={(e) => setSubscriberName(e.target.value)}
              placeholder={lang === "es" ? "Tu nombre" : "Your name"}
              className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              required
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-muted-foreground mb-2">{t.subscribeEmail}</label>
            <input
              type="email"
              value={subscriberEmail}
              onChange={(e) => setSubscriberEmail(e.target.value)}
              placeholder={lang === "es" ? "correo@ejemplo.com" : "email@example.com"}
              className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              required
            />
          </div>

          <div className="sm:col-span-2 flex flex-col gap-3">
            <button
              type="submit"
              className="w-full rounded-2xl bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary/90"
            >
              {t.subscribeButton}
            </button>
            {subscribeState !== "idle" && (
              <div className={subscribeState === "success" ? "text-green-400" : "text-red-400"}>
                {subscribeMessage}
              </div>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
