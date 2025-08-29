import React from "react";
import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-sky-50">
      {/* Soft blobs */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-[32rem] w-[32rem] rounded-full bg-indigo-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-48 -right-40 h-[32rem] w-[32rem] rounded-full bg-sky-200/40 blur-3xl" />

      {/* Grid accent */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(2,6,23,.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(2,6,23,.06)_1px,transparent_1px)] bg-[size:40px_40px]"
      />

      <main className="relative z-10 flex min-h-screen items-center justify-center px-4">
        <div className="mx-auto w-full max-w-3xl">
          {/* Card */}
          <div className="group rounded-3xl border border-slate-200/60 bg-white/80 p-8 shadow-[0_10px_40px_-10px_rgba(2,6,23,0.15)] backdrop-blur-md transition-all duration-300 hover:shadow-[0_20px_60px_-15px_rgba(2,6,23,0.25)] md:p-12">
            {/* Heading */}
            <h1 className="mb-3 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-sky-600 bg-clip-text text-transparent">
                Have a Used Car?
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-base leading-relaxed text-slate-600 sm:text-lg">
              Curious what it's worth?
            </p>
            <p className="mb-8 text-base leading-relaxed text-slate-600 sm:text-lg">
              Get a fast, fair market estimate in seconds.
            </p>

            {/* CTA */}
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:justify-start">
              <button
                onClick={() => navigate("/estimate")}
                className="inline-flex items-center justify-center rounded-2xl bg-indigo-600 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition-transform duration-200 hover:scale-[1.02] hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 active:scale-95"
              >
                Let's Estimate
                <svg
                  className="ml-2 h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Decorative car line art */}
            <div className="mt-10 flex justify-center">
              <svg
                viewBox="0 0 500 120"
                className="h-24 w-full max-w-xl text-slate-300"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M20 90 C60 70, 120 60, 160 60 C200 60, 220 80, 260 80 C300 80, 340 60, 380 60 C420 60, 460 70, 480 90" />
                <circle cx="160" cy="90" r="12" />
                <circle cx="360" cy="90" r="12" />
                <path d="M120 75 L200 75 M240 75 L320 75" />
              </svg>
            </div>
          </div>

          {/* Bottom wave */}
          <div className="pointer-events-none mx-auto mt-10 w-full max-w-4xl opacity-70">
            <svg
              viewBox="0 0 1440 120"
              className="h-16 w-full text-indigo-100"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M0,64L48,74.7C96,85,192,107,288,106.7C384,107,480,85,576,80C672,75,768,85,864,85.3C960,85,1056,75,1152,74.7C1248,75,1344,85,1392,90.7L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z" />
            </svg>
          </div>
        </div>
      </main>
    </div>
  );
}
export default Landing;