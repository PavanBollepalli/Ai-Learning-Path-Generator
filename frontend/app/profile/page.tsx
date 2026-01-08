"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();

  // Mock State for "Control Panel" feel
  const [activeTab, setActiveTab] = useState("overview");

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
          <Link href="/learning-path" className="hover:text-primary transition-colors">Learning Path</Link>
          <Link href="/profile" className="text-white">Profile</Link>
          <Link href="#" className="hover:text-primary transition-colors">Market Insights</Link>
        </div>

        <div className="flex items-center gap-4">
          <div className="h-8 w-8 rounded-full bg-surface-2 border border-border flex items-center justify-center text-text-muted hover:text-white transition-colors cursor-pointer">
            <span className="material-symbols-outlined text-lg">notifications</span>
          </div>
          <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-primary to-blue-500 border border-border/50 shadow-inner"></div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto p-4 lg:p-8 space-y-8">

        {/* Header Section */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight mb-2">
              Neural Profile
            </h1>
            <p className="text-text-muted max-w-xl">
              Configure your digital twin. Our AI uses this data to map highly optimized career trajectories.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="px-4 py-2 rounded-lg bg-surface-2 border border-border text-xs font-mono text-text-dim flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-success animate-pulse"></span>
              SYNCED
            </div>
          </div>
        </header>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Left Column: Identity & Status (4 cols) */}
          <div className="lg:col-span-4 space-y-6">

            {/* Identity Card */}
            <section className="bg-surface-1 border border-border rounded-2xl p-6 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none"></div>

              <div className="flex items-start justify-between mb-6">
                <div className="h-20 w-20 rounded-2xl bg-surface-2 border border-border flex items-center justify-center relative overflow-hidden">
                  <span className="material-symbols-outlined text-4xl text-text-dim">person</span>
                </div>
                <button className="text-xs font-medium text-primary hover:text-primary-hover uppercase tracking-wider border border-primary/20 px-3 py-1 rounded-full hover:bg-primary/10 transition-colors">
                  Edit
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-text-dim uppercase tracking-wider block mb-1">Full Name</label>
                  <div className="text-lg font-medium text-white">Rahul Sharma</div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-text-dim uppercase tracking-wider block mb-1">Status</label>
                    <div className="flex items-center gap-2 text-sm text-white">
                      <span className="material-symbols-outlined text-base text-info">school</span>
                      Student
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-text-dim uppercase tracking-wider block mb-1">Location</label>
                    <div className="flex items-center gap-2 text-sm text-white">
                      <span className="material-symbols-outlined text-base text-warning">location_on</span>
                      Bangalore
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Profile Completeness - "System Health" style */}
            <section className="bg-surface-1 border border-border rounded-2xl p-6">
              <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">data_usage</span>
                Profile Density
              </h3>

              <div className="relative pt-2 pb-6">
                <div className="flex items-end gap-1 mb-2">
                  <span className="text-4xl font-bold text-white">65%</span>
                  <span className="text-sm text-text-muted mb-1">vectors mapped</span>
                </div>
                <div className="h-2 w-full bg-surface-2 rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-[65%] rounded-full shadow-[0_0_10px_rgba(124,58,237,0.5)]"></div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-text-muted p-3 rounded-lg bg-surface-2/50 border border-border/50">
                  <span className="material-symbols-outlined text-text-dim">check_circle</span>
                  <span>Basic Details</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-text-muted p-3 rounded-lg bg-surface-2/50 border border-border/50">
                  <span className="material-symbols-outlined text-warning">pending</span>
                  <span className="text-white">Add 2 more core skills</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-text-muted p-3 rounded-lg bg-surface-2/50 border border-border/50">
                  <span className="material-symbols-outlined text-text-dim">radio_button_unchecked</span>
                  <span>Verify Phone Number</span>
                </div>
              </div>
            </section>
          </div>

          {/* Middle/Right Column: Skills & Preferences (8 cols) */}
          <div className="lg:col-span-8 space-y-6">

            {/* Skills Matrix */}
            <section className="bg-surface-1 border border-border rounded-2xl p-6 md:p-8">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">memory</span>
                  Skill Matrix
                </h3>
                <button className="h-8 px-4 bg-primary hover:bg-primary-hover text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">add</span>
                  Add Skill
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Technical Skills Category */}
                <div className="space-y-4">
                  <p className="text-xs font-semibold text-text-dim uppercase tracking-wider">Technical & Vocational</p>
                  <div className="space-y-3">
                    <div className="group flex items-center justify-between p-4 bg-surface-2 border border-border rounded-xl hover:border-primary/50 transition-colors cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="h-2 w-2 rounded-full bg-info"></div>
                        <span className="text-white font-medium">Python Programming</span>
                      </div>
                      <span className="text-xs text-text-muted bg-surface-1 px-2 py-1 rounded">2 Years</span>
                    </div>
                    <div className="group flex items-center justify-between p-4 bg-surface-2 border border-border rounded-xl hover:border-primary/50 transition-colors cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="h-2 w-2 rounded-full bg-info"></div>
                        <span className="text-white font-medium">Data Analysis</span>
                      </div>
                      <span className="text-xs text-text-muted bg-surface-1 px-2 py-1 rounded">Beginner</span>
                    </div>
                  </div>
                </div>

                {/* Soft Skills Category */}
                <div className="space-y-4">
                  <p className="text-xs font-semibold text-text-dim uppercase tracking-wider">Cognitive & Soft</p>
                  <div className="space-y-3">
                    <div className="group flex items-center justify-between p-4 bg-surface-2 border border-border rounded-xl hover:border-primary/50 transition-colors cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="h-2 w-2 rounded-full bg-success"></div>
                        <span className="text-white font-medium">Project Management</span>
                      </div>
                      <span className="text-xs text-text-muted bg-surface-1 px-2 py-1 rounded">Verified</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Goals & Parameters */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Targeting */}
              <section className="bg-surface-1 border border-border rounded-2xl p-6">
                <h3 className="text-base font-bold text-white mb-6 flex items-center gap-2">
                  <span className="material-symbols-outlined text-accent">target</span>
                  Career Targeting
                </h3>

                <div className="space-y-5">
                  <div>
                    <label className="text-xs font-semibold text-text-dim uppercase tracking-wider block mb-2">Desired Role</label>
                    <div className="p-3 bg-surface-2 border border-border rounded-lg text-white text-sm">
                      Full Stack Developer
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-text-dim uppercase tracking-wider block mb-2">Income Target</label>
                    <div className="w-full bg-surface-2 rounded-full h-2 mb-2">
                      <div className="bg-success h-2 rounded-full w-[70%]"></div>
                    </div>
                    <div className="flex justify-between text-xs text-text-muted">
                      <span>Current</span>
                      <span>Target: ₹12L+</span>
                    </div>
                  </div>
                </div>
              </section>

              {/* Learning Constraints */}
              <section className="bg-surface-1 border border-border rounded-2xl p-6">
                <h3 className="text-base font-bold text-white mb-6 flex items-center gap-2">
                  <span className="material-symbols-outlined text-warning">tune</span>
                  Learning Parameters
                </h3>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text-muted">Weekly Availability</span>
                    <span className="text-sm font-medium text-white">20 Hours</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text-muted">Preferred Mode</span>
                    <span className="flex items-center gap-1 text-sm font-medium text-white">
                      <span className="material-symbols-outlined text-base">laptop_chromebook</span>
                      Online
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text-muted">Budget Sensitivity</span>
                    <span className="text-sm font-medium text-white">Free / Subsidized</span>
                  </div>

                  <div className="pt-4 border-t border-border mt-4">
                    <button className="w-full py-2 rounded-lg border border-border text-xs font-medium text-text-muted hover:text-white hover:bg-surface-2 transition-colors">
                      Adjust Parameters
                    </button>
                  </div>
                </div>
              </section>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
