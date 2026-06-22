import { useState } from "react";
import { MessageCircle, X, Send, Bot } from "lucide-react";
import type { Lang } from "./translations";
import { translations } from "./translations";

interface CustomerSupportChatProps {
  lang: Lang;
}

interface Message {
  id: number;
  from: "user" | "bot";
  text: string;
}

const botReplies = {
  es: [
    "Entendido. Un agente de soporte revisará tu consulta pronto.",
    "Gracias por contactarnos. Te responderemos en menos de 30 minutos.",
    "Para más información, podés llamar al 0800-111-CORDEX o enviarnos un email a soporte@granservicio.com.ar",
    "¿Hay algo más en lo que te pueda ayudar?",
  ],
  en: [
    "Understood. A support agent will review your inquiry shortly.",
    "Thank you for contacting us. We'll respond within 30 minutes.",
    "For more info, call 0800-111-CORDEX or email us at support@granservicio.com.ar",
    "Is there anything else I can help you with?",
  ],
};

export function CustomerSupportChat({ lang }: CustomerSupportChatProps) {
  const t = translations[lang].support;
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([{ id: 0, from: "bot", text: t.greeting }]);
  const [input, setInput] = useState("");
  const [replyIndex, setReplyIndex] = useState(0);

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg: Message = { id: Date.now(), from: "user", text: input };
    const replies = botReplies[lang];
    const botMsg: Message = { id: Date.now() + 1, from: "bot", text: replies[replyIndex % replies.length] };
    setMessages((m) => [...m, userMsg, botMsg]);
    setReplyIndex((i) => i + 1);
    setInput("");
  };

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110 active:scale-95"
        style={{ background: "linear-gradient(135deg, #F97316, #FBBF24)", boxShadow: "0 4px 24px rgba(249,115,22,0.4)" }}
      >
        {open ? <X className="w-5 h-5 text-white" /> : <MessageCircle className="w-6 h-6 text-white" />}
      </button>
      {open && (
        <div className="fixed bottom-24 right-6 z-40 w-80 rounded-2xl border border-border flex flex-col overflow-hidden shadow-2xl" style={{ background: "#0F1328", maxHeight: "420px" }}>
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border" style={{ background: "#151B35" }}>
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <Bot className="w-4 h-4 text-primary" />
            </div>
            <div>
              <div className="text-sm text-foreground" style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700 }}>
                Gran Servicio
              </div>
              <div className="text-xs text-green-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
                {lang === "es" ? "En línea" : "Online"}
              </div>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-2" style={{ minHeight: "200px", maxHeight: "280px" }}>
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
                <div className="px-3 py-2 rounded-xl text-sm max-w-[85%]" style={{ background: msg.from === "user" ? "#F97316" : "#1A2240", color: msg.from === "user" ? "#fff" : "#F0F4FF", borderRadius: msg.from === "user" ? "12px 12px 2px 12px" : "12px 12px 12px 2px" }}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-2 p-3 border-t border-border">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder={t.placeholder}
              className="flex-1 bg-muted rounded-lg px-3 py-2 text-sm text-foreground border border-border outline-none focus:border-primary/50 transition-colors"
            />
            <button onClick={sendMessage} className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: "#F97316" }}>
              <Send className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
