"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:8000";

type Lead = {
  id: number;
  name: string;
  email: string;
  company: string;
  job_title: string;
  industry: string;
  company_size: number;
  budget: number;
  timeline: string;
  need: string;
  message: string;
  created_at: string;

  score?: number;
  category?: "HOT" | "WARM" | "COLD";
  reason?: string;
};

type Stats = {
  total: number;
  hot: number;
  warm: number;
  cold: number;
};

export default function DashboardPage() {

  const router = useRouter();

  const [leads, setLeads] =
    useState<Lead[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [refreshing, setRefreshing] =
    useState(false);

  const [error, setError] =
    useState("");

  const [stats, setStats] =
    useState<Stats>({
      total: 0,
      hot: 0,
      warm: 0,
      cold: 0,
    });


  // ==========================================
  // GET LEADS
  // ==========================================

  async function fetchLeads() {

    try {

      setError("");

      const response = await fetch(
        `${API_URL}/leads`,
        {
          method: "GET",
          cache: "no-store",
        }
      );

      if (!response.ok) {
        throw new Error(
          "Failed to load leads."
        );
      }

      const data =
        await response.json();

      console.log(
        "Leads from backend:",
        data
      );

      const leadsData: Lead[] =
        Array.isArray(data)
          ? data
          : data.leads || [];


      // Sort by score
      const sortedLeads =
        [...leadsData].sort(
          (a, b) =>
            (b.score || 0) -
            (a.score || 0)
        );


      setLeads(sortedLeads);

      calculateStats(
        sortedLeads
      );

    } catch (error) {

      console.error(
        "Failed to fetch leads:",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );

    } finally {

      setLoading(false);

      setRefreshing(false);
    }
  }


  // ==========================================
  // CALCULATE STATS
  // ==========================================

  function calculateStats(
    leadsData: Lead[]
  ) {

    const hot =
      leadsData.filter(
        (lead) =>
          lead.category === "HOT"
      ).length;

    const warm =
      leadsData.filter(
        (lead) =>
          lead.category === "WARM"
      ).length;

    const cold =
      leadsData.filter(
        (lead) =>
          lead.category === "COLD"
      ).length;


    setStats({
      total: leadsData.length,
      hot,
      warm,
      cold,
    });
  }


  // ==========================================
  // REFRESH
  // ==========================================

  function handleRefresh() {

    setRefreshing(true);

    fetchLeads();
  }


  // ==========================================
  // OPEN LEAD DETAILS
  // ==========================================

  function openLeadDetails(
    leadId: number
  ) {

    router.push(
      `/dashboard/leads/${leadId}`
    );
  }


  // ==========================================
  // INITIAL LOAD
  // ==========================================

  useEffect(() => {

    fetchLeads();

  }, []);


  // ==========================================
  // CATEGORY STYLE
  // ==========================================

  function getCategoryStyle(
    category?: "HOT" | "WARM" | "COLD"
  ) {

    switch (category) {

      case "HOT":
        return "bg-red-100 text-red-700 border-red-200";

      case "WARM":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";

      case "COLD":
        return "bg-blue-100 text-blue-700 border-blue-200";

      default:
        return "bg-slate-100 text-slate-600 border-slate-200";
    }
  }


  // ==========================================
  // CATEGORY ICON
  // ==========================================

  function getCategoryIcon(
    category?: "HOT" | "WARM" | "COLD"
  ) {

    switch (category) {

      case "HOT":
        return "🔥";

      case "WARM":
        return "🟡";

      case "COLD":
        return "❄️";

      default:
        return "•";
    }
  }


  // ==========================================
  // FORMAT DATE
  // ==========================================

  function formatDate(
    date: string
  ) {

    return new Date(
      date
    ).toLocaleString(
      "en-US",
      {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
      }
    );
  }


  return (

    <main className="min-h-screen bg-slate-50">

      <div className="flex min-h-screen">


        {/* ==========================================
            SIDEBAR
        ========================================== */}

        <aside className="hidden w-64 border-r border-slate-200 bg-white lg:block">

          <div className="sticky top-0 flex h-screen flex-col">


            {/* Logo */}

            <div className="border-b border-slate-200 px-6 py-6">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-lg font-bold text-white">
                  L
                </div>

                <div>

                  <h1 className="text-lg font-bold text-slate-900">
                    LeadFlow
                  </h1>

                  <p className="text-xs text-slate-500">
                    Sales Automation
                  </p>

                </div>

              </div>

            </div>


            {/* Navigation */}

            <nav className="flex-1 px-4 py-6">

              <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                Workspace
              </p>


              {/* Dashboard */}

              <button
                className="mb-2 flex w-full items-center gap-3 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white"
              >
                <span>📊</span>

                Dashboard
              </button>


              {/* Leads */}

              <button
                onClick={() =>
                  document
                    .getElementById(
                      "leads-section"
                    )
                    ?.scrollIntoView({
                      behavior: "smooth",
                    })
                }
                className="mb-2 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
              >
                <span>👥</span>

                Leads
              </button>


              {/* Company Profile */}

              <button
                className="mb-2 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
              >
                <span>🏢</span>

                Company Profile
              </button>


              {/* Settings */}

              <button
                className="mb-2 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
              >
                <span>⚙️</span>

                Settings
              </button>

            </nav>


            {/* Company */}

            <div className="border-t border-slate-200 p-4">

              <div className="rounded-xl bg-slate-50 p-4">

                <p className="text-xs text-slate-500">
                  Current company
                </p>

                <p className="mt-1 font-semibold text-slate-900">
                  AI Solutions
                </p>

              </div>

            </div>

          </div>

        </aside>


        {/* ==========================================
            MAIN CONTENT
        ========================================== */}

        <section className="flex-1">


          {/* Top Bar */}

          <header className="border-b border-slate-200 bg-white">

            <div className="flex items-center justify-between px-6 py-5 lg:px-10">

              <div>

                <h2 className="text-2xl font-bold text-slate-900">
                  Dashboard
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Monitor and prioritize your sales leads.
                </p>

              </div>


              {/* Refresh */}

              <button
                onClick={handleRefresh}
                disabled={refreshing}
                className="flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
              >

                <span>
                  {refreshing
                    ? "⟳"
                    : "↻"}
                </span>

                {refreshing
                  ? "Refreshing..."
                  : "Refresh"}

              </button>

            </div>

          </header>


          <div className="px-6 py-8 lg:px-10">


            {/* ==========================================
                STATS
            ========================================== */}

            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">


              {/* Total */}

              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                <div className="flex items-center justify-between">

                  <p className="text-sm font-medium text-slate-500">
                    Total Leads
                  </p>

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100">
                    👥
                  </div>

                </div>

                <p className="mt-4 text-3xl font-bold text-slate-900">
                  {stats.total}
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  All incoming leads
                </p>

              </div>


              {/* HOT */}

              <div className="rounded-2xl border border-red-100 bg-white p-6 shadow-sm">

                <div className="flex items-center justify-between">

                  <p className="text-sm font-medium text-slate-500">
                    Hot Leads
                  </p>

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100">
                    🔥
                  </div>

                </div>

                <p className="mt-4 text-3xl font-bold text-red-600">
                  {stats.hot}
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  Highest priority
                </p>

              </div>


              {/* WARM */}

              <div className="rounded-2xl border border-yellow-100 bg-white p-6 shadow-sm">

                <div className="flex items-center justify-between">

                  <p className="text-sm font-medium text-slate-500">
                    Warm Leads
                  </p>

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-100">
                    🟡
                  </div>

                </div>

                <p className="mt-4 text-3xl font-bold text-yellow-600">
                  {stats.warm}
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  Worth following up
                </p>

              </div>


              {/* COLD */}

              <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">

                <div className="flex items-center justify-between">

                  <p className="text-sm font-medium text-slate-500">
                    Cold Leads
                  </p>

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100">
                    ❄️
                  </div>

                </div>

                <p className="mt-4 text-3xl font-bold text-blue-600">
                  {stats.cold}
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  Low priority
                </p>

              </div>

            </div>


            {/* ==========================================
                LEADS SECTION
            ========================================== */}

            <div
              id="leads-section"
              className="mt-8 rounded-2xl border border-slate-200 bg-white shadow-sm"
            >


              {/* Section Header */}

              <div className="flex flex-col gap-4 border-b border-slate-200 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">

                <div>

                  <h3 className="text-lg font-bold text-slate-900">
                    Leads
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    Sorted by qualification score.
                  </p>

                </div>

                <div className="text-sm text-slate-500">
                  {leads.length} leads
                </div>

              </div>


              {/* Error */}

              {error && (

                <div className="m-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                  {error}
                </div>

              )}


              {/* Loading */}

              {loading ? (

                <div className="px-6 py-16 text-center">

                  <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-slate-900" />

                  <p className="mt-4 text-sm text-slate-500">
                    Loading leads...
                  </p>

                </div>

              ) : leads.length === 0 ? (

                <div className="px-6 py-16 text-center">

                  <div className="text-5xl">
                    📭
                  </div>

                  <h4 className="mt-4 text-lg font-semibold text-slate-900">
                    No leads yet
                  </h4>

                  <p className="mt-2 text-sm text-slate-500">
                    New leads will appear here when they
                    are submitted.
                  </p>

                </div>

              ) : (

                <div className="divide-y divide-slate-100">

                  {leads.map(
                    (lead) => (

                      <div
                        key={lead.id}
                        onClick={() =>
                          openLeadDetails(
                            lead.id
                          )
                        }
                        className="cursor-pointer px-6 py-5 transition hover:bg-slate-50"
                      >

                        <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">


                          {/* Lead Info */}

                          <div className="min-w-0 flex-1">

                            <div className="flex flex-wrap items-center gap-3">

                              <h4 className="text-base font-bold text-slate-900">
                                {lead.name}
                              </h4>

                              <span
                                className={`rounded-full border px-2.5 py-1 text-xs font-bold ${getCategoryStyle(
                                  lead.category
                                )}`}
                              >

                                {getCategoryIcon(
                                  lead.category
                                )}{" "}

                                {lead.category ||
                                  "UNQUALIFIED"}

                              </span>

                            </div>


                            <p className="mt-1 text-sm text-slate-600">

                              {lead.job_title} at{" "}

                              <span className="font-medium">
                                {lead.company}
                              </span>

                            </p>


                            <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-500">

                              <span className="rounded-lg bg-slate-100 px-3 py-1.5">
                                {lead.industry}
                              </span>

                              <span className="rounded-lg bg-slate-100 px-3 py-1.5">
                                {lead.company_size} employees
                              </span>

                              <span className="rounded-lg bg-slate-100 px-3 py-1.5">
                                ${lead.budget?.toLocaleString()}
                              </span>

                              <span className="rounded-lg bg-slate-100 px-3 py-1.5">
                                {lead.timeline}
                              </span>

                            </div>


                            <p className="mt-3 text-sm text-slate-600">
                              {lead.need}
                            </p>

                          </div>


                          {/* Score */}

                          <div className="flex items-center gap-6 xl:min-w-[180px] xl:justify-end">

                            <div className="text-right">

                              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                                Score
                              </p>

                              <p className="mt-1 text-3xl font-bold text-slate-900">
                                {lead.score ?? "-"}
                              </p>

                              <p className="text-xs text-slate-400">
                                / 100
                              </p>

                            </div>


                            <div className="hidden text-right xl:block">

                              <p className="text-xs text-slate-400">
                                Received
                              </p>

                              <p className="mt-1 text-xs font-medium text-slate-600">
                                {formatDate(
                                  lead.created_at
                                )}
                              </p>

                            </div>


                            <span className="text-xl text-slate-300">
                              →
                            </span>

                          </div>

                        </div>

                      </div>

                    )
                  )}

                </div>

              )}

            </div>

          </div>

        </section>

      </div>

    </main>
  );
}