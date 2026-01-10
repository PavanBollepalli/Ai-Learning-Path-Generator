"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LearningPathResponse } from "./types";
import { API_BASE_URL, getToken, removeToken } from "@/lib/auth";

export default function LearningPathPage() {
  const router = useRouter();
  const [data, setData] = useState<LearningPathResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchLearningPath() {
      const token = getToken();
      if (!token) {
        router.push("/login");
        return;
      }

      try {
        const res = await fetch(`${API_BASE_URL}/generate-path`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status === 401) {
          removeToken();
          router.push("/login");
          return;
        }

        if (!res.ok) {
          throw new Error("Failed to fetch learning path");
        }
        const json: LearningPathResponse = await res.json();
        setData(json);
      } catch (err: any) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    }

    fetchLearningPath();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-text-main font-sans flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center animate-spin">
            <span className="material-symbols-outlined text-white text-lg">hub</span>
          </div>
          <p className="text-text-muted animate-pulse">Generating your personalized path...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background text-text-main font-sans flex items-center justify-center">
        <div className="text-center space-y-4">
          <span className="material-symbols-outlined text-4xl text-red-500">error</span>
          <h2 className="text-xl font-bold">Something went wrong</h2>
          <p className="text-text-muted">{error}</p>
          <button onClick={() => window.location.reload()} className="px-4 py-2 bg-surface-2 hover:bg-surface-3 rounded-lg transition-colors">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!data) return null;

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
                {data.meta.level}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-text-main tracking-tight mb-4">
              {data.meta.goal} <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">Path</span>
            </h1>
            <p className="text-lg text-text-muted max-w-2xl leading-relaxed">
              Personalized roadmap generated based on your goal to become a {data.meta.goal}.
            </p>
          </div>

          {/* Stats Card */}
          <div className="bg-surface-1 border border-border rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full pointer-events-none"></div>
            <div>
              <h3 className="text-sm font-semibold text-text-dim uppercase tracking-wider mb-1">Estimated Velocity</h3>
              <div className="text-3xl font-bold text-text-main">{data.meta.duration_months} Months</div>
              <p className="text-xs text-text-muted mt-2">At {data.meta.weekly_time_hours} hours/week pace</p>
            </div>

            <div className="mt-8 pt-6 border-t border-border flex justify-between items-end">
              <div>
                <h3 className="text-sm font-semibold text-text-dim uppercase tracking-wider mb-1">Target</h3>
                <div className="text-xl font-bold text-text-main">{data.meta.goal}</div>
              </div>
              <div className="h-10 w-10 bg-surface-2 rounded-lg flex items-center justify-center border border-border">
                <span className="material-symbols-outlined text-success">trending_up</span>
              </div>
            </div>
          </div>
        </div>

        {/* Roadmap */}
        <div className="relative border-l-2 border-border ml-4 md:ml-10 space-y-12 pb-12">

          {data.learning_path.map((stage, index) => (
            <div key={index} className="relative pl-8 md:pl-12">
              {/* Node */}
              <div className={`absolute -left-[9px] top-0 h-4 w-4 rounded-full border-4 border-background ${index === 0 ? 'bg-primary shadow-[0_0_0_4px_rgba(124,58,237,0.2)]' : 'bg-surface-2'}`}></div>

              <div className="flex flex-col gap-6">
                <h2 className="text-2xl font-bold text-text-main flex items-center gap-3">
                  Phase {index + 1}: {stage.stage}
                  {index === 0 && <span className="px-2 py-0.5 rounded text-xs font-medium bg-primary text-white">IN PROGRESS</span>}
                </h2>

                {/* Metadata for Stage */}
                <div className="flex flex-wrap gap-4 text-sm text-text-muted">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-lg">schedule</span>
                    {stage.duration_months} Months
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-lg">school</span>
                    Focus: {stage.focus.join(", ")}
                  </div>
                </div>

                {/* Module Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                  {/* Resources Column */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-text-dim uppercase tracking-wider">Resources</h3>
                    {stage.resources.map((resource, rIndex) => (
                      <div key={rIndex} className="group bg-surface-1 border border-border rounded-xl p-5 hover:border-primary/50 transition-all cursor-pointer relative overflow-hidden">
                        <div className="flex justify-between items-start mb-2">
                          <div className="h-8 w-8 rounded-lg bg-surface-2 flex items-center justify-center text-primary">
                            <span className="material-symbols-outlined text-lg">menu_book</span>
                          </div>
                          <span className="text-xs font-mono text-text-dim">{resource.platform}</span>
                        </div>
                        <h4 className="text-base font-bold text-text-main mb-1 line-clamp-1">{resource.title}</h4>
                        <a href={resource.link} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline flex items-center gap-1">
                          Go to Course <span className="material-symbols-outlined text-[10px]">open_in_new</span>
                        </a>
                      </div>
                    ))}
                  </div>

                  {/* Projects Column */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-text-dim uppercase tracking-wider">Projects</h3>
                    {stage.projects.map((project, pIndex) => (
                      <div key={pIndex} className="group bg-surface-1 border border-border rounded-xl p-5 hover:border-primary/50 transition-all cursor-pointer">
                        <div className="flex justify-between items-start mb-2">
                          <div className="h-8 w-8 rounded-lg bg-surface-2 flex items-center justify-center text-success">
                            <span className="material-symbols-outlined text-lg">code_blocks</span>
                          </div>
                        </div>
                        <h4 className="text-base font-bold text-text-main mb-1">{project.title}</h4>
                        <p className="text-sm text-text-muted line-clamp-2">{project.description}</p>
                      </div>
                    ))}
                  </div>

                </div>

                {/* Skills Tags */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {stage.skills.map((skill, sIndex) => (
                    <span key={sIndex} className="px-3 py-1 rounded-full bg-surface-2 border border-border text-xs font-medium text-text-muted hover:text-text-main hover:border-primary/50 transition-colors cursor-default">
                      {skill}
                    </span>
                  ))}
                </div>

              </div>
            </div>
          ))}

        </div>

      </main>
    </div>
  );
}
