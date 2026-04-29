import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";
import { Link } from "@tanstack/react-router";
import type { ChatMessage } from "@/types";
import { mockProducts } from "@/data/mock";
import { useCart } from "@/store/cart";
import { useAutomation } from "@/store/automation";

const greetings: ChatMessage = {
  id: "g1",
  role: "bot",
  content:
    "Welcome to AUREGOLD. I'm your personal concierge. Ask me about watches, fragrance, or our latest arrivals.",
  timestamp: Date.now(),
};

function botReply(input: string): ChatMessage {
  const text = input.toLowerCase();
  let suggestions = mockProducts.slice(0, 0);
  let content = "Allow me a moment — let me find something exquisite for you.";

  if (text.includes("watch")) {
    suggestions = mockProducts.filter((p) => p.category === "watches");
    content = "Our timepieces are crafted in Switzerland. May I suggest the Aurum Chronograph?";
  } else if (text.includes("perfume") || text.includes("fragrance") || text.includes("scent")) {
    suggestions = mockProducts.filter((p) => p.category === "fragrance");
    content = "Noir Élixir is our most coveted signature — oud, amber, and saffron.";
  } else if (text.includes("bag") || text.includes("leather")) {
    suggestions = mockProducts.filter((p) => p.category === "leather");
    content = "The Onyx Tote is hand-stitched in our Florence atelier. A timeless choice.";
  } else if (text.includes("gift") || text.includes("recommend") || text.includes("popular")) {
    suggestions = mockProducts.slice(0, 3);
    content = "These are favorites among our most discerning clients.";
  } else if (text.includes("hello") || text.includes("hi")) {
    content = "Bonsoir. How may I help curate your experience today?";
  } else {
    suggestions = mockProducts.slice(0, 2);
    content = "Here are pieces I think you'll adore.";
  }

  return {
    id: Math.random().toString(36).slice(2),
    role: "bot",
    content,
    productSuggestions: suggestions,
    timestamp: Date.now(),
  };
}

export function ChatbotPopup() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([greetings]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const add = useCart((s) => s.add);
  const trigger = useAutomation((s) => s.trigger);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing, open]);

  const send = (text?: string) => {
    const value = (text ?? input).trim();
    if (!value) return;
    const userMsg: ChatMessage = {
      id: Math.random().toString(36).slice(2),
      role: "user",
      content: value,
      timestamp: Date.now(),
    };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setMessages((m) => [...m, botReply(value)]);
      setTyping(false);
    }, 900);
  };

  return (
    <>
      <motion.button
        onClick={() => setOpen((v) => !v)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-gradient-gold text-primary-foreground shadow-gold flex items-center justify-center"
        aria-label="Chat"
      >
        {open ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)] h-[560px] max-h-[calc(100vh-8rem)] glass rounded-2xl shadow-luxe flex flex-col overflow-hidden"
          >
            <div className="p-4 border-b border-border/50 flex items-center gap-3 bg-gradient-gold-soft">
              <div className="h-9 w-9 rounded-full bg-gradient-gold flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-primary-foreground" />
              </div>
              <div>
                <p className="font-display text-sm">Aurélie · Concierge</p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Online</p>
              </div>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((m) => (
                <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className="max-w-[85%] space-y-2">
                    <div
                      className={`px-3 py-2 rounded-2xl text-sm ${
                        m.role === "user"
                          ? "bg-gradient-gold text-primary-foreground rounded-br-sm"
                          : "bg-muted text-foreground rounded-bl-sm"
                      }`}
                    >
                      {m.content}
                    </div>
                    {m.productSuggestions && m.productSuggestions.length > 0 && (
                      <div className="space-y-2">
                        {m.productSuggestions.map((p) => (
                          <div key={p.id} className="bg-card border border-border rounded-xl p-2 flex gap-2">
                            <img src={p.image} alt={p.name} className="h-14 w-14 rounded-lg object-cover" />
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-medium truncate">{p.name}</p>
                              <p className="text-xs text-primary font-semibold">${p.price.toLocaleString()}</p>
                              <div className="flex gap-1 mt-1">
                                <button
                                  onClick={() => {
                                    add(p);
                                    trigger("Added via concierge");
                                  }}
                                  className="text-[10px] bg-gradient-gold text-primary-foreground px-2 py-1 rounded font-semibold"
                                >
                                  Add
                                </button>
                                <Link
                                  to="/products/$id"
                                  params={{ id: p.id }}
                                  onClick={() => setOpen(false)}
                                  className="text-[10px] border border-border px-2 py-1 rounded text-foreground hover:border-primary"
                                >
                                  View
                                </Link>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {typing && (
                <div className="flex gap-1">
                  <span className="h-2 w-2 rounded-full bg-primary animate-bounce" />
                  <span className="h-2 w-2 rounded-full bg-primary animate-bounce [animation-delay:120ms]" />
                  <span className="h-2 w-2 rounded-full bg-primary animate-bounce [animation-delay:240ms]" />
                </div>
              )}
            </div>

            <div className="p-3 border-t border-border/50 flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="Ask about anything…"
                className="flex-1 bg-input/50 border border-border rounded-full px-4 py-2 text-sm focus:outline-none focus:border-primary"
              />
              <button
                onClick={() => send()}
                className="h-9 w-9 rounded-full bg-gradient-gold flex items-center justify-center text-primary-foreground"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
