import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Loader2, Workflow } from "lucide-react";
import { useAutomation } from "@/store/automation";

export function AutomationToasts() {
  const events = useAutomation((s) => s.events);
  return (
    <div className="fixed bottom-6 left-6 z-40 flex flex-col gap-2 max-w-xs">
      <AnimatePresence>
        {events.slice(0, 3).map((e) => (
          <motion.div
            key={e.id}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            className="glass rounded-xl px-3 py-2 flex items-center gap-2 text-xs shadow-soft"
          >
            <Workflow className="h-3.5 w-3.5 text-primary" />
            <span className="flex-1 truncate">{e.label}</span>
            {e.status === "running" ? (
              <Loader2 className="h-3.5 w-3.5 text-muted-foreground animate-spin" />
            ) : (
              <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
