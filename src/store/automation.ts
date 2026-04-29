import { create } from "zustand";
import type { AutomationEvent } from "@/types";

interface AutomationState {
  events: AutomationEvent[];
  trigger: (label: string) => void;
}

export const useAutomation = create<AutomationState>((set) => ({
  events: [],
  trigger: (label) => {
    const id = Math.random().toString(36).slice(2);
    const event: AutomationEvent = { id, label, status: "running", timestamp: Date.now() };
    set((s) => ({ events: [event, ...s.events].slice(0, 6) }));
    setTimeout(() => {
      set((s) => ({
        events: s.events.map((e) => (e.id === id ? { ...e, status: "success" } : e)),
      }));
    }, 1400);
  },
}));
