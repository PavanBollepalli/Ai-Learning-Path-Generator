"use client";

import { useState } from "react";
import Link from "next/link";

export default function SignupPage() {
  const [language, setLanguage] = useState("en");

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
              <button className="w-full h-12 bg-primary hover:bg-primary-hover text-white font-medium rounded-xl flex items-center justify-center gap-3 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-primary/25">
                <span className="material-symbols-outlined">smartphone</span>
                Sign up with Mobile
              </button>

              <button className="w-full h-12 bg-surface-2 hover:bg-surface-3 text-text-main border border-border hover:border-border-highlight font-medium rounded-xl flex items-center justify-center gap-3 transition-all">
                <span className="material-symbols-outlined text-text-muted">mail</span>
                Sign up with Email
              </button>

              <div className="relative py-4">
                <div aria-hidden="true" className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-surface-1 px-3 text-xs font-medium text-text-dim uppercase tracking-widest">
                    Verification
                  </span>
                </div>
              </div>

              <button className="w-full h-12 bg-transparent hover:bg-surface-2 text-text-muted hover:text-text-main border border-dashed border-border hover:border-primary/50 font-medium rounded-xl flex items-center justify-center gap-3 transition-all">
                <span className="material-symbols-outlined text-info">cloud_done</span>
                DigiLocker / Govt JS
              </button>
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

