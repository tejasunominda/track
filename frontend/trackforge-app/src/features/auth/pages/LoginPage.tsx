import { Link } from "react-router-dom";
import { LoginForm } from "@/features/auth/components/LoginForm";

export function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-slate-100 to-blue-50 p-4 animate-fadeIn">
      <div className="mb-8 flex items-center gap-2 text-2xl font-bold text-slate-900">
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 text-lg font-bold text-white shadow-lg transition-transform duration-300 hover:rotate-6">
          TF
        </span>
        TrackForge
      </div>
      <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-8 shadow-2xl transition-all duration-300 hover:shadow-[0_20px_50px_-12px_rgba(0,82,204,0.15)]">
        <h1 className="mb-1 text-center text-xl font-bold text-slate-900">Log in to continue</h1>
        <p className="mb-6 text-center text-sm text-slate-500">
          Enter your organization subdomain and credentials.
        </p>
        <LoginForm />
      </div>
      <p className="mt-6 text-sm text-slate-500">
        Don't have an account?{" "}
        <Link to="/signup" className="font-semibold text-blue-700 hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}
