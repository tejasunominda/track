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
    <form onSubmit={submit} className="mx-auto mt-12 max-w-sm space-y-4 rounded border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold">Log in to TrackForge</h2>
      {error && <p className="text-sm text-danger">{error}</p>}
      <input
        placeholder="subdomain"
        value={subdomain}
        onChange={(e) => setSubdomain(e.target.value)}
        className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
      />
      <input
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
      />
      <button type="submit" className="w-full rounded bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-hover">
        Log in
      </button>
    </form>
  );
}
