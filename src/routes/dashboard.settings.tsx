import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/dashboard/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  const [notifications, setNotifications] = useState(true);
  const [newsletter, setNewsletter] = useState(true);
  return (
    <div className="space-y-6">
      <header>
        <p className="text-xs uppercase tracking-[0.3em] text-primary mb-3">Preferences</p>
        <h1 className="font-display text-4xl">Settings</h1>
      </header>
      <div className="glass rounded-2xl p-6 space-y-5">
        <Toggle label="Order notifications" desc="SMS & email updates on every order" value={notifications} onChange={setNotifications} />
        <Toggle label="Private newsletter" desc="Atelier stories, twice monthly" value={newsletter} onChange={setNewsletter} />
      </div>
      <div className="glass rounded-2xl p-6">
        <h3 className="font-display text-lg mb-4">Change password</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <input type="password" placeholder="Current" className="bg-input/50 border border-border rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-primary" />
          <input type="password" placeholder="New" className="bg-input/50 border border-border rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-primary" />
        </div>
        <button className="mt-5 bg-gradient-gold text-primary-foreground px-5 py-2.5 rounded-full text-xs uppercase tracking-widest font-semibold shadow-gold">
          Update
        </button>
      </div>
    </div>
  );
}

function Toggle({ label, desc, value, onChange }: { label: string; desc: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm">{label}</p>
        <p className="text-xs text-muted-foreground">{desc}</p>
      </div>
      <button
        onClick={() => onChange(!value)}
        className={`h-6 w-11 rounded-full p-0.5 transition ${value ? "bg-gradient-gold" : "bg-muted"}`}
      >
        <span className={`block h-5 w-5 rounded-full bg-background transition ${value ? "translate-x-5" : ""}`} />
      </button>
    </div>
  );
}
