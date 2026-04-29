import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone, Award } from "lucide-react";
import { useAuth } from "@/store/auth";

export const Route = createFileRoute("/dashboard/")({
  component: ProfileIndex,
});

function ProfileIndex() {
  const user = useAuth((s) => s.user);
  return (
    <div className="space-y-8">
      <header>
        <p className="text-xs uppercase tracking-[0.3em] text-primary mb-3">Account</p>
        <h1 className="font-display text-4xl">Bonjour, {user?.name?.split(" ")[0] ?? "Guest"}</h1>
      </header>

      <div className="grid sm:grid-cols-3 gap-4">
        {[
          { label: "Member since", value: "2024" },
          { label: "Lifetime spend", value: "$24,580" },
          { label: "Status", value: "Connoisseur" },
        ].map((s) => (
          <div key={s.label} className="glass rounded-2xl p-5">
            <p className="text-xs text-muted-foreground uppercase tracking-widest">{s.label}</p>
            <p className="font-display text-2xl text-gradient-gold mt-2">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="glass rounded-2xl p-6">
        <h2 className="font-display text-xl mb-6 flex items-center gap-2">
          <Award className="h-4 w-4 text-primary" /> Personal details
        </h2>
        <div className="grid sm:grid-cols-2 gap-4 text-sm">
          <Detail icon={Mail} label="Email" value={user?.email ?? ""} />
          <Detail icon={Phone} label="Phone" value="+33 1 42 60 38 30" />
          <Detail icon={MapPin} label="Address" value="1 Rue Saint-Honoré, Paris" />
          <Detail icon={Award} label="Tier" value="Connoisseur · Gold" />
        </div>
      </div>
    </div>
  );
}

function Detail({ icon: Icon, label, value }: { icon: typeof Mail; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
      <Icon className="h-4 w-4 text-primary mt-0.5" />
      <div>
        <p className="text-xs text-muted-foreground uppercase tracking-widest">{label}</p>
        <p className="mt-0.5">{value}</p>
      </div>
    </div>
  );
}
