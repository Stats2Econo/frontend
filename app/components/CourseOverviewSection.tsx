"use client";

import { useState } from "react";
import { ArrowRight, X, Check } from "lucide-react";

interface Course {
  id: string;
  title: string;
  software: string;
  description: string;
  isCurrent?: boolean;
  syllabus: string[];
}

export default function CourseOverviewSection() {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const courses: Course[] = [
    {
      id: "nsso-unit-level",
      title: "NSSO UNIT-LEVEL DATA UTILIZATION",
      software: "STATA",
      isCurrent: true,
      description:
        "Live course on the complete process of extracting and using unit-level micro-data of Indian National Sample Survey (NSSO) and PLFS surveys using STATA software.",
      syllabus: [
        "Survey architecture, rounds design, schedules, and questionnaires",
        "Extracting fixed-width ASCII text data using STATA infile/dictionaries",
        "Merging household, enterprise, and person-level data blocks",
        "Applying multiplier weights for state and national estimation",
        "Replicating published empirical papers and constructing indicators",
      ],
    },
    {
      id: "basic-econometrics",
      title: "BASIC ECONOMETRIC ANALYSIS",
      software: "STATA",
      description:
        "Live course on Theoretical and Applied Basic Econometrics using STATA software covering classical linear regression and diagnostic testing.",
      syllabus: [
        "Classical linear regression model (OLS) mechanics and assumptions",
        "Hypothesis testing, t-statistics, F-tests, and goodness of fit",
        "Diagnostic tests: Heteroskedasticity, Multicollinearity, Autocorrelation",
        "Dummy variables, interaction terms, and structural breaks",
        "Model specification and reporting regression tables for publication",
      ],
    },
    {
      id: "advanced-econometrics",
      title: "ADVANCED ECONOMETRIC ANALYSIS",
      software: "STATA",
      description:
        "Live course on Theoretical and Applied Advanced Econometric Models with STATA focusing on panel data and microeconometrics.",
      syllabus: [
        "Static Panel Data: Pooled OLS, Fixed Effects (FE) & Random Effects (RE)",
        "Hausman specification test and cluster-robust standard errors",
        "Endogeneity issues: Omitted variables, simultaneity, measurement errors",
        "Instrumental Variables (IV / 2SLS) and GMM estimation",
        "Binary dependent variables: Logit, Probit, and Tobit models",
      ],
    },
    {
      id: "time-series",
      title: "TIME SERIES ANALYSIS",
      software: "STATA & R",
      description:
        "Live course on Theoretical and Applied Time Series Analysis and empirical forecasting with STATA & R.",
      syllabus: [
        "Stationarity, autocorrelation function (ACF/PACF), and Unit Root tests",
        "ARIMA & Seasonal ARIMA time series modeling and forecasting",
        "Vector Autoregression (VAR) & Granger Causality tests",
        "Cointegration (Johansen / Engle-Granger) & Vector Error Correction (VECM)",
        "Volatility modeling with ARCH and GARCH models",
      ],
    },
    {
      id: "statistical-analysis",
      title: "STATISTICAL ANALYSIS",
      software: "STATA & R",
      description:
        "Live course on Theoretical and Applied Statistical Analysis for Health, Business, and Economics using STATA & R.",
      syllabus: [
        "Descriptive statistics, exploratory data analysis, and visualization",
        "Sampling distributions, Central Limit Theorem, and confidence intervals",
        "Parametric hypothesis tests: One-sample, Two-sample, and Paired t-tests",
        "Analysis of Variance (ANOVA) and non-parametric alternatives",
        "Correlation, Chi-Square test of independence, and cross-tabulations",
      ],
    },
  ];

  return (
    <section id="courses" className="border-b border-zinc-200 bg-white py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="text-center">
          <div className="text-xs font-semibold uppercase tracking-widest text-[#2b5672]">
            Course Overview
          </div>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-[#33343f] sm:text-3xl">
            Enhance Your Research &amp; Data Analysis Skills
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-zinc-600">
            Instructor-led live sessions emphasizing practical do-file coding, dataset troubleshooting, and mathematical foundations.
          </p>
        </div>

        {/* Courses Grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <div
              key={course.id}
              className={`flex flex-col justify-between rounded-lg border p-6 transition duration-200 ${
                course.isCurrent
                  ? "border-[#2b5672] bg-[#f8fafc]"
                  : "border-zinc-200 bg-white hover:border-zinc-300"
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded bg-zinc-100 px-2 py-0.5 text-[11px] font-semibold text-[#2b5672]">
                    {course.software}
                  </span>
                  {course.isCurrent && (
                    <span className="text-[11px] font-semibold text-[#d92d20]">
                      Current Course
                    </span>
                  )}
                </div>

                <h3 className="mt-4 text-base font-bold text-[#33343f] leading-snug">
                  {course.title}
                </h3>

                <p className="mt-2.5 text-xs text-zinc-600 leading-relaxed">
                  {course.description}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-zinc-100 pt-4 text-xs">
                <button
                  onClick={() => setSelectedCourse(course)}
                  className="font-medium text-[#2b5672] hover:underline"
                >
                  View Details
                </button>

                <a
                  href={`#connect?course=${encodeURIComponent(course.title)}`}
                  className="inline-flex items-center gap-1 font-medium text-zinc-700 hover:text-zinc-950"
                >
                  <span>Inquire</span>
                  <ArrowRight className="h-3 w-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Minimal Syllabus Modal */}
      {selectedCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs animate-fade-in">
          <div className="relative max-h-[85vh] w-full max-w-xl overflow-y-auto rounded-lg bg-white p-6 shadow-xl">
            <button
              onClick={() => setSelectedCourse(null)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-700"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="text-xs font-semibold text-[#2b5672]">
              {selectedCourse.software}
            </div>
            <h3 className="mt-1 text-lg font-bold text-[#33343f]">
              {selectedCourse.title}
            </h3>
            <p className="mt-2 text-xs text-zinc-600">
              {selectedCourse.description}
            </p>

            <div className="mt-6 border-t border-zinc-200 pt-4">
              <div className="text-xs font-semibold uppercase tracking-wider text-zinc-700">
                Core Modules Covered
              </div>
              <ul className="mt-3 space-y-2 text-xs text-zinc-700">
                {selectedCourse.syllabus.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="h-3.5 w-3.5 text-[#2b5672] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 flex items-center justify-end gap-3 border-t border-zinc-100 pt-4">
              <button
                onClick={() => setSelectedCourse(null)}
                className="rounded border border-zinc-300 px-3 py-1.5 text-xs font-medium text-zinc-700 hover:bg-zinc-50"
              >
                Close
              </button>
              <a
                href="#connect"
                onClick={() => setSelectedCourse(null)}
                className="rounded bg-[#2b5672] px-3.5 py-1.5 text-xs font-medium text-white hover:bg-[#1f4157]"
              >
                Inquire for this Course
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
