import { Link } from "react-router-dom";
import { LoginForm } from "@/features/auth/components/LoginForm";

export function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 p-4">
      <div className="mb-8 flex items-center gap-2 text-2xl font-bold text-slate-900">
        <span className="flex h-10 w-10 items-center justify-center rounded bg-blue-700 text-lg font-bold text-white">
          TF
        </span>
        TrackForge
      </div>
      <div className="w-full max-w-sm rounded-lg border border-slate-200 bg-white p-8 shadow-lg">
        <h1 className="mb-1 text-center text-xl font-bold text-slate-900">Log in to continue</h1>
        <p className="mb-6 text-center text-sm text-slate-500">
          Enter your organization subdomain and credentials.
        </p>
        <LoginForm />
      </div>
      <p className="mt-6 text-sm text-slate-500">
        Don't have an account?{" "}
        <Link to="/signup" className="font-medium text-blue-700 hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}
