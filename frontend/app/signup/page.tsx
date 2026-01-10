"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { registerUser } from "@/lib/auth";

export default function SignupPage() {
  const [language, setLanguage] = useState("en");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await registerUser(formData.username, formData.email, formData.password);
      router.push("/login?registered=true");
    } catch (err: any) {
      setError(err.message || "Something went wrong during signup");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-background text-text-main relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[40%] h-[40%] bg-primary/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 bg-surface-1 border border-border rounded-3xl overflow-hidden shadow-2xl relative z-10">

        {/* Left Side: Brand/Visual */}
        <div className="hidden md:flex flex-col justify-between p-12 bg-surface-2 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-bl from-primary/5 to-transparent" />

          <div className="relative z-10">
            <div className="h-10 w-10 bg-primary rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-primary/20">
              <span className="material-symbols-outlined text-white text-2xl">
                hub
              </span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-text-main mb-2">
              Start building
            </h2>
            <p className="text-text-muted">
              Join thousands of professionals mastering their domains.
            </p>
          </div>

          <div className="relative z-10 space-y-6">
            <div className="p-4 rounded-xl bg-surface-1 border border-border/50 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-2">
                <span className="material-symbols-outlined text-primary text-xl">
                  rocket_launch
                </span>
                <span className="font-semibold text-text-main">Career Acceleration</span>
              </div>
              <p className="text-sm text-text-muted">
                From 0 to 1 in record time with curated, high-impact paths.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-surface-1 border border-border/50 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-2">
                <span className="material-symbols-outlined text-success text-xl">
                  verified
                </span>
                <span className="font-semibold text-text-main">Verified Skills</span>
              </div>
              <p className="text-sm text-text-muted">
                Prove your worth with NSQF-aligned certifications and tests.
              </p>
            </div>
          </div>

          <div className="relative z-10 text-xs text-text-dim">
            © 2025 Skillvector Inc.
          </div>
        </div>

        {/* Right Side: Signup Form */}
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
                Create account
              </h1>
              <p className="text-text-muted">
                Begin your personalized journey today.
              </p>
            </div>

            <div className="space-y-4">
              {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-3 rounded-xl text-sm mb-4">
                  {error}
                </div>
              )}

              <form onSubmit={handleSignup} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-muted mb-1.5">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    className="w-full bg-surface-2 border border-border text-text-main rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                    placeholder="John Doe"
                  />
                </div>

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

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 bg-primary hover:bg-primary-hover text-white font-medium rounded-xl flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-primary/25 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Create Account</span>
                      <span className="material-symbols-outlined">arrow_forward</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            <p className="mt-8 text-center text-sm text-text-muted">
              Already have an account?{" "}
              <Link href="/login" className="text-primary hover:text-primary-hover font-medium underline-offset-4 hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

