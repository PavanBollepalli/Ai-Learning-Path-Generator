"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { loginUser, setToken } from "@/lib/auth";

export default function LoginPage() {
  const [language, setLanguage] = useState("en");
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (searchParams.get("registered") === "true") {
      // You could show a success toast here
    }
  }, [searchParams]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = await loginUser(formData.email, formData.password);
      setToken(data.access_token);
      router.push("/profile");
    } catch (err: any) {
      setError(err.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-background text-text-main relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[40%] bg-primary/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 bg-surface-1 border border-border rounded-3xl overflow-hidden shadow-2xl relative z-10">

        {/* Left Side: Brand/Visual */}
        <div className="hidden md:flex flex-col justify-between p-12 bg-surface-2 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />

          <div className="relative z-10">
            <div className="h-10 w-10 bg-primary rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-primary/20">
              <span className="material-symbols-outlined text-white text-2xl">
                hub
              </span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-text-main mb-2">
              Skillvector
            </h2>
            <p className="text-text-muted">
              AI-driven career orchestration for the modern professional.
            </p>
          </div>

          <div className="relative z-10 space-y-6">
            <div className="p-4 rounded-xl bg-surface-1 border border-border/50 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-2">
                <span className="material-symbols-outlined text-primary text-xl">
                  psychology
                </span>
                <span className="font-semibold text-text-main">Intelligent Mapping</span>
              </div>
              <p className="text-sm text-text-muted">
                Our AI analyzes your skills against millions of market data points.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-surface-1 border border-border/50 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-2">
                <span className="material-symbols-outlined text-success text-xl">
                  trending_up
                </span>
                <span className="font-semibold text-text-main">Accelerated Growth</span>
              </div>
              <p className="text-sm text-text-muted">
                Navigate the fastest path to your goal with real-time adjustments.
              </p>
            </div>
          </div>

          <div className="relative z-10 text-xs text-text-dim">
            © 2025 Skillvector Inc.
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="p-8 md:p-12 flex flex-col justify-center bg-surface-1">
          <div className="w-full max-w-sm mx-auto">
            <div className="flex justify-end mb-8 md:mb-12">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-surface-2 border border-border text-text-muted text-xs py-1.5 px-3 rounded-lg focus:outline-none focus:border-primary transition-colors cursor-pointer"
              >
                <option value="en">English (EN)</option>
                <option value="hi">हिंदी (HI)</option>
              </select>
            </div>

            <div className="mb-8">
              <h1 className="text-2xl md:text-3xl font-bold text-text-main mb-2">
                Welcome back
              </h1>
              <p className="text-text-muted">
                Access your personalized learning ecosystem.
              </p>
            </div>

            <div className="space-y-4">
              {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-3 rounded-xl text-sm mb-4">
                  {error}
                </div>
              )}

              {searchParams.get("registered") === "true" && !error && (
                <div className="bg-green-500/10 border border-green-500/20 text-green-500 p-3 rounded-xl text-sm mb-4">
                  Account created successfully. Please log in.
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-muted mb-1.5">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-surface-2 border border-border text-text-main rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-muted mb-1.5">Password</label>
                  <input
                    type="password"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full bg-surface-2 border border-border text-text-main rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                    placeholder="••••••••"
                  />
                </div>

                <div className="flex justify-end">
                  <Link href="/forgot-password" className="text-xs text-primary hover:text-primary-hover hover:underline">
                    Forgot password?
                  </Link>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 bg-primary hover:bg-primary-hover text-white font-medium rounded-xl flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-primary/25 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Sign In</span>
                      <span className="material-symbols-outlined">login</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            <p className="mt-8 text-center text-sm text-text-muted">
              New to Skillvector?{" "}
              <Link href="/signup" className="text-primary hover:text-primary-hover font-medium underline-offset-4 hover:underline">
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

