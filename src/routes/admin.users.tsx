import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/users")({
  component: AdminUsers,
});

const users = [
  { name: "Alexandra Vance", email: "alex@auregold.com", tier: "Connoisseur", spend: 24580 },
  { name: "Kenji Sato", email: "kenji@auregold.com", tier: "Patron", spend: 12200 },
  { name: "Lila Moreau", email: "lila@auregold.com", tier: "Member", spend: 3400 },
  { name: "Hugo Bauer", email: "hugo@auregold.com", tier: "Patron", spend: 18920 },
  { name: "Camille Laurent", email: "camille@auregold.com", tier: "Connoisseur", spend: 41200 },
];

function AdminUsers() {
  return (
    <div className="space-y-6">
      <header>
        <p className="text-xs uppercase tracking-[0.3em] text-primary mb-3">Clientèle</p>
        <h1 className="font-display text-4xl">Users</h1>
      </header>
      <div className="glass rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/40 text-xs uppercase tracking-widest text-muted-foreground">
            <tr>
              <th className="text-left p-4">Name</th>
              <th className="text-left p-4">Email</th>
              <th className="text-left p-4">Tier</th>
              <th className="text-right p-4">Lifetime spend</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.email} className="border-t border-border/40 hover:bg-muted/20">
                <td className="p-4 flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-gradient-gold flex items-center justify-center text-primary-foreground text-xs font-bold">{u.name[0]}</div>
                  {u.name}
                </td>
                <td className="p-4 text-muted-foreground">{u.email}</td>
                <td className="p-4">{u.tier}</td>
                <td className="p-4 text-right text-gradient-gold font-semibold">${u.spend.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
