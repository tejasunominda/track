import { useState } from "react";
import { useAuthStore } from "../store";
import { AuthResponse, login } from "../api/login";

export function LoginForm() {
  const [subdomain, setSubdomain] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const setTokens = useAuthStore((s) => s.setTokens);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const res: AuthResponse = await login({ subdomain, email, password, deviceFingerprint: null });
      setTokens(res.accessToken, res.refreshToken);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    }
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      {error && (
        <div className="rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </div>
      )}

      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">Subdomain</label>
        <div className="flex rounded border border-slate-200 bg-white focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
          <input
            placeholder="acme"
            value={subdomain}
            onChange={(e) => setSubdomain(e.target.value)}
            className="flex-1 rounded-l px-3 py-2 text-sm outline-none"
          />
          <span className="flex items-center rounded-r bg-slate-50 px-3 text-sm text-slate-500">
            .trackforge.io
          </span>
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">Email</label>
        <input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">Password</label>
        <input
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        className="w-full rounded bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Continue
      </button>
    </form>
  );
}
