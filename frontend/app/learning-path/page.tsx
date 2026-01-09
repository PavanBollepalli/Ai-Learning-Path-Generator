"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LearningPathPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background text-text-main font-sans selection:bg-primary selection:text-white">
      {/* Top Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-surface-1/80 backdrop-blur-md border-b border-border h-16 flex items-center justify-between px-4 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center shadow-lg shadow-primary/20">
            <span className="material-symbols-outlined text-white text-lg">hub</span>
          </div>
          <span className="font-bold text-lg tracking-tight">Skillvector</span>
        </div>

        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-text-muted">
          <Link href="/learning-path" className="text-text-main font-semibold">Learning Path</Link>
          <Link href="/profile" className="hover:text-primary transition-colors">Profile</Link>
          <Link href="#" className="hover:text-primary transition-colors">Market Insights</Link>
        </div>

        <div className="flex items-center gap-4">
          <div className="h-8 w-8 rounded-full bg-surface-2 border border-border flex items-center justify-center text-text-muted hover:text-text-main transition-colors cursor-pointer">
            <span className="material-symbols-outlined text-lg">notifications</span>
          </div>
          <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-primary to-blue-500 border border-border/50 shadow-inner"></div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto p-4 lg:p-8 space-y-10">

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-mono font-bold text-primary uppercase tracking-wider">
                AI Generated
              </span>
              <span className="text-xs font-mono font-bold text-text-dim uppercase tracking-wider">
                Confidence: 94%
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-text-main tracking-tight mb-4">
              Full Stack <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">Engineering</span>
            </h1>
            <p className="text-lg text-text-muted max-w-2xl leading-relaxed">
              From foundational computer science to distributed systems. This path is calibrated to your current skill matrix and career velocity goals.
            </p>
          </div>

          {/* Stats Card */}
          <div className="bg-surface-1 border border-border rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full pointer-events-none"></div>
            <div>
              <h3 className="text-sm font-semibold text-text-dim uppercase tracking-wider mb-1">Estimated Velocity</h3>
              <div className="text-3xl font-bold text-text-main">24 Weeks</div>
              <p className="text-xs text-text-muted mt-2">At 15 hours/week pace</p>
            </div>

            <div className="mt-8 pt-6 border-t border-border flex justify-between items-end">
              <div>
                <h3 className="text-sm font-semibold text-text-dim uppercase tracking-wider mb-1">Target Role</h3>
                <div className="text-xl font-bold text-text-main">Senior Dev</div>
              </div>
              <div className="h-10 w-10 bg-surface-2 rounded-lg flex items-center justify-center border border-border">
                <span className="material-symbols-outlined text-success">trending_up</span>
              </div>
            </div>
          </div>
        </div>

        {/* Roadmap */}
        <div className="relative border-l-2 border-border ml-4 md:ml-10 space-y-12 pb-12">

          {/* Phase 1: Active */}
          <div className="relative pl-8 md:pl-12">
            {/* Node */}
            <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-primary border-4 border-background shadow-[0_0_0_4px_rgba(124,58,237,0.2)]"></div>

            <div className="flex flex-col gap-6">
              <h2 className="text-2xl font-bold text-text-main flex items-center gap-3">
                Phase 1: Foundations
                <span className="px-2 py-0.5 rounded text-xs font-medium bg-primary text-white">IN PROGRESS</span>
              </h2>

              {/* Module Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* Active Card */}
                <div className="group bg-surface-1 border border-primary/50 rounded-xl p-5 shadow-[0_0_20px_rgba(124,58,237,0.05)] hover:shadow-[0_0_30px_rgba(124,58,237,0.1)] transition-all cursor-pointer relative overflow-hidden">
                  <div className="absolute top-0 left-0 h-1 w-full bg-primary"></div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="h-10 w-10 rounded-lg bg-surface-2 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      <span className="material-symbols-outlined">code</span>
                    </div>
                    <span className="text-xs font-mono text-text-dim">45% Complete</span>
                  </div>
                  <h3 className="text-lg font-bold text-text-main mb-2">CS Fundamentals</h3>
                  <p className="text-sm text-text-muted mb-4">Data structures, algorithms, and complexity analysis.</p>
                  <div className="w-full bg-surface-2 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-primary keyframes-pulse h-full w-[45%]"></div>
                  </div>
                </div>

                {/* Locked/Queue Card */}
                <div className="group bg-surface-1 border border-border rounded-xl p-5 hover:border-border-highlight transition-all cursor-pointer opacity-80 hover:opacity-100">
                  <div className="flex justify-between items-start mb-4">
                    <div className="h-10 w-10 rounded-lg bg-surface-2 flex items-center justify-center text-text-muted">
                      <span className="material-symbols-outlined">dns</span>
                    </div>
                    <span className="text-xs font-mono text-text-dim">Queue</span>
                  </div>
                  <h3 className="text-lg font-bold text-text-main mb-2">System Design</h3>
                  <p className="text-sm text-text-muted mb-4">Scalability patterns and database schema design.</p>
                  <div className="w-full bg-surface-2 h-1.5 rounded-full overflow-hidden"></div>
                </div>

              </div>
            </div>
          </div>

          {/* Phase 2: Locked */}
          <div className="relative pl-8 md:pl-12 opacity-50 grayscale transition-all hover:opacity-75 hover:grayscale-0">
            {/* Node */}
            <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-surface-2 border-4 border-background"></div>

            <div className="flex flex-col gap-6">
              <h2 className="text-2xl font-bold text-text-main flex items-center gap-3">
                Phase 2: Advanced Engineering
                <span className="px-2 py-0.5 rounded text-xs font-medium bg-surface-2 text-text-muted border border-border">LOCKED</span>
              </h2>

              {/* Module Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div className="bg-surface-1 border border-border rounded-xl p-5">
                  <div className="flex justify-between items-start mb-4">
                    <div className="h-10 w-10 rounded-lg bg-surface-2 flex items-center justify-center text-text-muted">
                      <span className="material-symbols-outlined">cloud</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-text-main mb-2">Cloud Native</h3>
                  <p className="text-sm text-text-muted">Microservices, Kubernetes, and AWS architecture.</p>
                </div>

                <div className="bg-surface-1 border border-border rounded-xl p-5">
                  <div className="flex justify-between items-start mb-4">
                    <div className="h-10 w-10 rounded-lg bg-surface-2 flex items-center justify-center text-text-muted">
                      <span className="material-symbols-outlined">security</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-text-main mb-2">App Security</h3>
                  <p className="text-sm text-text-muted">OWASP Top 10, AuthN/AuthZ, and encryption.</p>
                </div>

              </div>
            </div>
          </div>

          {/* Phase 3: Locked */}
          <div className="relative pl-8 md:pl-12 opacity-50 grayscale">
            {/* Node */}
            <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-surface-2 border-4 border-background"></div>

            <div className="flex flex-col gap-6">
              <h2 className="text-2xl font-bold text-text-main flex items-center gap-3">
                Phase 3: Mastery
                <span className="px-2 py-0.5 rounded text-xs font-medium bg-surface-2 text-text-muted border border-border">LOCKED</span>
              </h2>
            </div>
          </div>

        </div>

      </main>
    </div>
  );
}
