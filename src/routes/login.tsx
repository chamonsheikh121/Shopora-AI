import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { api } from "@/services/api";
import { useAuth } from "@/store/auth";

export const Route = createFileRoute("/login")({
  component: Login,
});

function Login() {
  const setUser = useAuth((s) => s.setUser);
  const navigate = useNavigate();
  const [email, setEmail] = useState("alex@auregold.com");
  const [pw, setPw] = useState("•••••••");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const u = await api.login(email, pw);
    setUser(u);
    setLoading(false);
    navigate({ to: "/dashboard" });
  };

  return (
    <SiteLayout hideFooter>
      <section className="mx-auto max-w-md px-6 py-20">
        <div className="text-center mb-10">
          <p className="text-xs uppercase tracking-[0.3em] text-primary mb-3">Welcome Back</p>
          <h1 className="font-display text-4xl">Sign In</h1>
        </div>
        <form onSubmit={submit} className="glass rounded-2xl p-8 space-y-5">
          <label className="block">
            <span className="text-xs text-muted-foreground uppercase tracking-widest">Email</span>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required className="mt-1 w-full bg-input/50 border border-border rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-primary" />
          </label>
          <label className="block">
            <span className="text-xs text-muted-foreground uppercase tracking-widest">Password</span>
            <input value={pw} onChange={(e) => setPw(e.target.value)} type="password" required className="mt-1 w-full bg-input/50 border border-border rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-primary" />
          </label>
          <button disabled={loading} className="w-full inline-flex items-center justify-center gap-2 bg-gradient-gold text-primary-foreground px-6 py-3 rounded-full text-sm uppercase tracking-widest font-semibold shadow-gold disabled:opacity-60">
            {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Signing in</> : "Sign In"}
          </button>
          <p className="text-center text-xs text-muted-foreground">
            New here?{" "}
            <Link to="/register" className="text-primary">Create account</Link>
          </p>
        </form>
      </section>
    </SiteLayout>
  );
}
