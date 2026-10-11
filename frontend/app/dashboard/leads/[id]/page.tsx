// "use client";

// import { useEffect, useState } from "react";
// import { useParams, useRouter } from "next/navigation";

// const API_URL =
//   process.env.NEXT_PUBLIC_API_URL ||
//   "http://localhost:8000";

// type Lead = {
//   id: number;
//   name: string;
//   email: string;
//   company: string;
//   job_title: string;
//   industry: string;
//   company_size: number;
//   budget: number;
//   timeline: string;
//   need: string;
//   message: string;
//   created_at: string;
// };

// type Qualification = {
//   id: number;
//   lead_id: number;
//   company_fit: number;
//   need: number;
//   intent: number;
//   budget_fit: number;
//   authority: number;
//   urgency: number;
//   score: number;
//   category: "HOT" | "WARM" | "COLD";
//   reason: string;
//   created_at: string;
// };

// type LeadResponse = {
//   lead: Lead;
//   qualification: Qualification | null;
// };

// export default function LeadDetailsPage() {
//   const params = useParams();
//   const router = useRouter();

//   const leadId = params.id;

//   const [data, setData] =
//     useState<LeadResponse | null>(null);

//   const [loading, setLoading] =
//     useState(true);

//   const [error, setError] =
//     useState("");

//   useEffect(() => {
//     if (!leadId) {
//       return;
//     }

//     async function fetchLead() {
//       try {
//         setLoading(true);
//         setError("");

//         const response = await fetch(
//           `${API_URL}/leads/${leadId}`
//         );

//         const result = await response.json();

//         if (!response.ok) {
//           throw new Error(
//             result?.detail ||
//               result?.message ||
//               "Failed to load lead."
//           );
//         }

//         setData(result);

//       } catch (error) {
//         console.error(
//           "Failed to load lead:",
//           error
//         );

//         setError(
//           error instanceof Error
//             ? error.message
//             : "Something went wrong."
//         );

//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchLead();

//   }, [leadId]);

//   function categoryStyle(
//     category?: "HOT" | "WARM" | "COLD"
//   ) {
//     if (category === "HOT") {
//       return "bg-red-50 text-red-700 border-red-200";
//     }

//     if (category === "WARM") {
//       return "bg-yellow-50 text-yellow-700 border-yellow-200";
//     }

//     if (category === "COLD") {
//       return "bg-blue-50 text-blue-700 border-blue-200";
//     }

//     return "bg-slate-50 text-slate-600 border-slate-200";
//   }

//   function formatDate(date: string) {
//     return new Date(date).toLocaleString(
//       "en-US",
//       {
//         month: "short",
//         day: "numeric",
//         year: "numeric",
//         hour: "numeric",
//         minute: "2-digit",
//       }
//     );
//   }

//   function ScoreCard({
//     title,
//     value,
//   }: {
//     title: string;
//     value: number;
//   }) {
//     return (
//       <div className="rounded-xl border border-slate-200 p-4">

//         <div className="flex justify-between">

//           <p className="text-sm text-slate-500">
//             {title}
//           </p>

//           <p className="font-bold text-slate-900">
//             {value}/10
//           </p>

//         </div>

//         <div className="mt-3 h-2 rounded-full bg-slate-100">

//           <div
//             className="h-2 rounded-full bg-slate-900"
//             style={{
//               width: `${value * 10}%`,
//             }}
//           />

//         </div>

//       </div>
//     );
//   }

//   if (loading) {
//     return (
//       <main className="flex min-h-screen items-center justify-center bg-slate-50">

//         <div className="text-center">

//           <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-slate-900" />

//           <p className="mt-4 text-sm text-slate-500">
//             Loading lead...
//           </p>

//         </div>

//       </main>
//     );
//   }

//   if (error || !data) {
//     return (
//       <main className="min-h-screen bg-slate-50 p-6">

//         <div className="mx-auto max-w-4xl">

//           <button
//             onClick={() =>
//               router.push("/dashboard")
//             }
//             className="mb-6 text-sm font-semibold text-slate-600 hover:text-slate-900"
//           >
//             ← Back to Dashboard
//           </button>

//           <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-red-700">
//             {error || "Lead not found."}
//           </div>

//         </div>

//       </main>
//     );
//   }

//   const {
//     lead,
//     qualification,
//   } = data;

//   return (
//     <main className="min-h-screen bg-slate-50">

//       {/* Header */}

//       <header className="border-b border-slate-200 bg-white">

//         <div className="mx-auto max-w-6xl px-6 py-6">

//           <button
//             onClick={() =>
//               router.push("/dashboard")
//             }
//             className="mb-5 text-sm font-semibold text-slate-500 hover:text-slate-900"
//           >
//             ← Back to Dashboard
//           </button>

//           <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

//             <div>

//               <div className="flex flex-wrap items-center gap-3">

//                 <h1 className="text-3xl font-bold text-slate-900">
//                   {lead.name}
//                 </h1>

//                 {qualification && (
//                   <span
//                     className={`rounded-full border px-3 py-1 text-sm font-bold ${categoryStyle(
//                       qualification.category
//                     )}`}
//                   >
//                     {qualification.category}
//                   </span>
//                 )}

//               </div>

//               <p className="mt-2 text-slate-600">
//                 {lead.job_title} at{" "}
//                 <span className="font-semibold">
//                   {lead.company}
//                 </span>
//               </p>

//             </div>

//             {qualification && (
//               <div className="rounded-xl border border-slate-200 bg-white px-6 py-4 text-center shadow-sm">

//                 <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
//                   Score
//                 </p>

//                 <p className="mt-1 text-4xl font-bold text-slate-900">
//                   {qualification.score}
//                   <span className="text-lg text-slate-400">
//                     /100
//                   </span>
//                 </p>

//               </div>
//             )}

//           </div>

//         </div>

//       </header>

//       {/* Content */}

//       <div className="mx-auto max-w-6xl px-6 py-8">

//         <div className="grid gap-6 lg:grid-cols-3">

//           {/* Main Content */}

//           <div className="space-y-6 lg:col-span-2">

//             {/* Contact */}

//             <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

//               <h2 className="text-lg font-bold text-slate-900">
//                 Contact Information
//               </h2>

//               <div className="mt-5 grid gap-5 sm:grid-cols-2">

//                 <div>
//                   <p className="text-xs font-semibold uppercase text-slate-400">
//                     Email
//                   </p>

//                   <p className="mt-1 break-all font-medium text-slate-900">
//                     {lead.email}
//                   </p>
//                 </div>

//                 <div>
//                   <p className="text-xs font-semibold uppercase text-slate-400">
//                     Company
//                   </p>

//                   <p className="mt-1 font-medium text-slate-900">
//                     {lead.company}
//                   </p>
//                 </div>

//                 <div>
//                   <p className="text-xs font-semibold uppercase text-slate-400">
//                     Job Title
//                   </p>

//                   <p className="mt-1 font-medium text-slate-900">
//                     {lead.job_title}
//                   </p>
//                 </div>

//                 <div>
//                   <p className="text-xs font-semibold uppercase text-slate-400">
//                     Industry
//                   </p>

//                   <p className="mt-1 font-medium text-slate-900">
//                     {lead.industry}
//                   </p>
//                 </div>

//               </div>

//             </section>

//             {/* Lead Information */}

//             <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

//               <h2 className="text-lg font-bold text-slate-900">
//                 Lead Information
//               </h2>

//               <div className="mt-5 grid gap-5 sm:grid-cols-2">

//                 <div>
//                   <p className="text-xs font-semibold uppercase text-slate-400">
//                     Company Size
//                   </p>

//                   <p className="mt-1 font-medium text-slate-900">
//                     {lead.company_size.toLocaleString()} employees
//                   </p>
//                 </div>

//                 <div>
//                   <p className="text-xs font-semibold uppercase text-slate-400">
//                     Budget
//                   </p>

//                   <p className="mt-1 font-medium text-slate-900">
//                     ${lead.budget.toLocaleString()}
//                   </p>
//                 </div>

//                 <div>
//                   <p className="text-xs font-semibold uppercase text-slate-400">
//                     Timeline
//                   </p>

//                   <p className="mt-1 font-medium text-slate-900">
//                     {lead.timeline}
//                   </p>
//                 </div>

//                 <div>
//                   <p className="text-xs font-semibold uppercase text-slate-400">
//                     Submitted
//                   </p>

//                   <p className="mt-1 font-medium text-slate-900">
//                     {formatDate(lead.created_at)}
//                   </p>
//                 </div>

//               </div>

//               <div className="mt-6 border-t border-slate-100 pt-6">

//                 <p className="text-xs font-semibold uppercase text-slate-400">
//                   Need
//                 </p>

//                 <p className="mt-2 text-lg font-semibold text-slate-900">
//                   {lead.need}
//                 </p>

//               </div>

//               <div className="mt-6 border-t border-slate-100 pt-6">

//                 <p className="text-xs font-semibold uppercase text-slate-400">
//                   Message
//                 </p>

//                 <p className="mt-2 leading-7 text-slate-600">
//                   {lead.message}
//                 </p>

//               </div>

//             </section>

//             {/* AI Qualification */}

//             {qualification && (
//               <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

//                 <div>
//                   <h2 className="text-lg font-bold text-slate-900">
//                     AI Qualification
//                   </h2>

//                   <p className="mt-1 text-sm text-slate-500">
//                     Evaluation based on the company ICP.
//                   </p>
//                 </div>

//                 <div className="mt-6 grid gap-4 sm:grid-cols-2">

//                   <ScoreCard
//                     title="Company Fit"
//                     value={qualification.company_fit}
//                   />

//                   <ScoreCard
//                     title="Need"
//                     value={qualification.need}
//                   />

//                   <ScoreCard
//                     title="Intent"
//                     value={qualification.intent}
//                   />

//                   <ScoreCard
//                     title="Budget Fit"
//                     value={qualification.budget_fit}
//                   />

//                   <ScoreCard
//                     title="Authority"
//                     value={qualification.authority}
//                   />

//                   <ScoreCard
//                     title="Urgency"
//                     value={qualification.urgency}
//                   />

//                 </div>

//               </section>
//             )}

//           </div>

//           {/* Sidebar */}

//           <aside className="space-y-6">

//             {/* Status */}

//             <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

//               <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
//                 Lead Status
//               </p>

//               {qualification ? (

//                 <div
//                   className={`mt-4 rounded-xl border p-5 ${categoryStyle(
//                     qualification.category
//                   )}`}
//                 >

//                   <p className="text-2xl font-bold">
//                     {qualification.category}
//                   </p>

//                   <p className="mt-1 text-sm">
//                     Qualification score:{" "}
//                     {qualification.score}/100
//                   </p>

//                 </div>

//               ) : (

//                 <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-5">

//                   <p className="font-semibold text-slate-700">
//                     Not Qualified
//                   </p>

//                   <p className="mt-1 text-sm text-slate-500">
//                     This lead has not been analyzed yet.
//                   </p>

//                 </div>

//               )}

//             </section>

//             {/* AI Reason */}

//             {qualification && (

//               <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

//                 <h2 className="font-bold text-slate-900">
//                   Why this score?
//                 </h2>

//                 <p className="mt-4 text-sm leading-7 text-slate-600">
//                   {qualification.reason}
//                 </p>

//               </section>

//             )}

//             {/* Actions */}

//             <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

//               <h2 className="font-bold text-slate-900">
//                 Actions
//               </h2>

//               <div className="mt-4 space-y-3">

//                 <button
//                   type="button"
//                   className="w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-700"
//                 >
//                   Contact Lead
//                 </button>

//                 <button
//                   type="button"
//                   className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
//                 >
//                   Add Follow-up
//                 </button>

//               </div>

//             </section>

//           </aside>

//         </div>

//       </div>

//     </main>
//   );
// }


"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

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
};

type Qualification = {
  company_fit: number;
  need: number;
  intent: number;
  budget_fit: number;
  authority: number;
  urgency: number;
  score: number;
  category: "HOT" | "WARM" | "COLD";
  reason: string;
  created_at?: string;
};

type FollowUp = {
  id: number;
  lead_id: number;
  method: "email" | "call" | "meeting";
  follow_up_date: string;
  notes: string;
  status: "pending" | "completed" | "cancelled";
  created_at: string;
};

type LeadResponse = {
  lead: Lead;
  qualification: Qualification | null;
};

function formatDate(value: string) {
  if (!value) return "-";

  return new Date(value).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function getCategoryStyle(category?: string) {
  switch (category) {
    case "HOT":
      return "border-red-200 bg-red-50 text-red-700";
    case "WARM":
      return "border-yellow-200 bg-yellow-50 text-yellow-700";
    case "COLD":
      return "border-blue-200 bg-blue-50 text-blue-700";
    default:
      return "border-slate-200 bg-slate-100 text-slate-600";
  }
}

function todayLocal() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export default function LeadDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const rawId = params.id;
  const leadId = Array.isArray(rawId) ? rawId[0] : rawId;

  const [data, setData] = useState<LeadResponse | null>(null);
  const [followUps, setFollowUps] = useState<FollowUp[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [followUpsError, setFollowUpsError] = useState("");
  const [showFollowUpForm, setShowFollowUpForm] = useState(false);
  const [savingFollowUp, setSavingFollowUp] = useState(false);
  const [followUpSuccess, setFollowUpSuccess] = useState("");

  const [followUpMethod, setFollowUpMethod] =
    useState<"email" | "call" | "meeting">("email");

  const [followUpDate, setFollowUpDate] = useState(todayLocal);
  const [followUpNotes, setFollowUpNotes] = useState("");

  const fetchLead = useCallback(async () => {
    if (!leadId) return;

    const id = leadId;

    const response = await fetch(
      `${API_URL}/leads/${encodeURIComponent(id)}`,
      { cache: "no-store" }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(
        result?.detail || result?.message || "Failed to load lead."
      );
    }

    const lead = result.lead ?? result;

    setData({
      lead,
      qualification: result.qualification ?? null,
    });
  }, [leadId]);

  const fetchFollowUps = useCallback(async () => {
    if (!leadId) return;

    const id = leadId;

    setFollowUpsError("");

    try {
      const response = await fetch(
        `${API_URL}/leads/${encodeURIComponent(id)}/follow-ups`,
        { cache: "no-store" }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result?.detail || "Failed to load follow-ups."
        );
      }

      setFollowUps(result.follow_ups ?? []);
    } catch (err) {
      setFollowUpsError(
        err instanceof Error
          ? err.message
          : "Failed to load follow-ups."
      );
    }
  }, [leadId]);

  useEffect(() => {
    if (!leadId) {
      setLoading(false);
      setError("Lead ID is missing.");
      return;
    }

    const id = leadId;
    let active = true;

    async function loadPage() {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(
          `${API_URL}/leads/${encodeURIComponent(id)}`,
          { cache: "no-store" }
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error(
            result?.detail || result?.message || "Failed to load lead."
          );
        }

        if (!active) return;

        const lead = result.lead ?? result;

        setData({
          lead,
          qualification: result.qualification ?? null,
        });

        try {
          const followUpsResponse = await fetch(
            `${API_URL}/leads/${encodeURIComponent(id)}/follow-ups`,
            { cache: "no-store" }
          );

          const followUpsResult = await followUpsResponse.json();

          if (!followUpsResponse.ok) {
            throw new Error(
              followUpsResult?.detail || "Failed to load follow-ups."
            );
          }

          if (active) {
            setFollowUps(followUpsResult.follow_ups ?? []);
            setFollowUpsError("");
          }
        } catch (err) {
          if (active) {
            setFollowUpsError(
              err instanceof Error
                ? err.message
                : "Failed to load follow-ups."
            );
          }
        }
      } catch (err) {
        if (active) {
          setError(
            err instanceof Error
              ? err.message
              : "Something went wrong."
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadPage();

    return () => {
      active = false;
    };
  }, [leadId]);

  function contactLead() {
    if (!data?.lead) return;

    const lead = data.lead;

    const subject = `Following up on your ${lead.need || "inquiry"}`;

    const body = [
      `Hi ${lead.name},`,
      "",
      `Thank you for your interest in our services at ${lead.company}.`,
      `We would like to discuss your requirements for ${
        lead.need || "your project"
      } and explore how we can help.`,
      "",
      "Would you be available for a short meeting?",
      "",
      "Best regards,",
      "AI Solutions Team",
    ].join("\n");

    const mailtoUrl =
      `mailto:${lead.email}` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoUrl;
  }

  async function handleCreateFollowUp(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (!leadId) return;

    const id = leadId;

    setSavingFollowUp(true);
    setFollowUpSuccess("");
    setFollowUpsError("");

    try {
      const response = await fetch(
        `${API_URL}/leads/${encodeURIComponent(id)}/follow-ups`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            method: followUpMethod,
            follow_up_date: followUpDate,
            notes: followUpNotes.trim(),
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result?.detail || "Failed to save follow-up."
        );
      }

      setFollowUpSuccess("Follow-up saved successfully.");
      setFollowUpNotes("");
      setFollowUpDate(todayLocal());
      setFollowUpMethod("email");
      setShowFollowUpForm(false);

      await fetchFollowUps();
    } catch (err) {
      setFollowUpsError(
        err instanceof Error
          ? err.message
          : "Failed to save follow-up."
      );
    } finally {
      setSavingFollowUp(false);
    }
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-slate-600">Loading lead details...</p>
      </main>
    );
  }

  if (error || !data?.lead) {
    return (
      <main className="min-h-screen bg-slate-50 p-8">
        <div className="mx-auto max-w-3xl rounded-2xl border border-red-200 bg-white p-6">
          <h1 className="text-xl font-bold text-slate-900">
            Could not load lead
          </h1>

          <p className="mt-2 text-sm text-red-600">
            {error || "Lead not found."}
          </p>

          <button
            onClick={() => router.push("/dashboard")}
            className="mt-5 rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
          >
            Back to Dashboard
          </button>
        </div>
      </main>
    );
  }

  const lead = data.lead;
  const qualification = data.qualification;

  const factors = [
    { label: "Company Fit", value: qualification?.company_fit },
    { label: "Need", value: qualification?.need },
    { label: "Intent", value: qualification?.intent },
    { label: "Budget Fit", value: qualification?.budget_fit },
    { label: "Authority", value: qualification?.authority },
    { label: "Urgency", value: qualification?.urgency },
  ];

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <button
              onClick={() => router.push("/dashboard")}
              className="mb-3 text-sm font-medium text-slate-500 hover:text-slate-900"
            >
              ← Back to Dashboard
            </button>

            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-bold">{lead.name}</h1>

              <span
                className={`rounded-full border px-3 py-1 text-xs font-bold ${getCategoryStyle(
                  qualification?.category
                )}`}
              >
                {qualification?.category ?? "UNQUALIFIED"}
              </span>
            </div>

            <p className="mt-1 text-sm text-slate-600">
              {lead.job_title} at {lead.company}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-right shadow-sm">
            <p className="text-xs uppercase tracking-wide text-slate-400">
              Score
            </p>

            <p className="text-2xl font-bold">
              {qualification?.score ?? "-"}
              <span className="text-sm font-medium text-slate-400">
                /100
              </span>
            </p>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-6 px-6 py-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-6">
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-bold">Contact Information</h2>

            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <Info label="Email" value={lead.email} />
              <Info label="Company" value={lead.company} />
              <Info label="Job Title" value={lead.job_title} />
              <Info label="Industry" value={lead.industry} />
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-bold">Lead Information</h2>

            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <Info
                label="Company Size"
                value={`${lead.company_size} employees`}
              />
              <Info
                label="Budget"
                value={`$${Number(lead.budget).toLocaleString()}`}
              />
              <Info label="Timeline" value={lead.timeline} />
              <Info label="Submitted" value={formatDate(lead.created_at)} />
            </div>

            <div className="mt-6 border-t border-slate-100 pt-5">
              <Info label="Need" value={lead.need} />
            </div>

            <div className="mt-5 border-t border-slate-100 pt-5">
              <Info label="Message" value={lead.message} />
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-bold">AI Qualification</h2>

            <p className="mt-1 text-sm text-slate-500">
              Evaluation based on the company ICP.
            </p>

            {!qualification ? (
              <div className="mt-5 rounded-xl border border-yellow-200 bg-yellow-50 p-4 text-sm text-yellow-800">
                This lead has not been qualified yet.
              </div>
            ) : (
              <>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {factors.map((factor) => (
                    <div
                      key={factor.label}
                      className="rounded-xl border border-slate-200 p-3"
                    >
                      <div className="flex justify-between gap-3 text-sm">
                        <span className="text-slate-600">
                          {factor.label}
                        </span>

                        <strong>{factor.value}/10</strong>
                      </div>

                      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full bg-slate-900"
                          style={{
                            width: `${(factor.value ?? 0) * 10}%`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-5 border-t border-slate-100 pt-5">
                  <h3 className="font-semibold">Why this score?</h3>

                  <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-600">
                    {qualification.reason}
                  </p>
                </div>
              </>
            )}
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="font-bold">Follow-up History</h2>

                <p className="mt-1 text-sm text-slate-500">
                  Planned and previous follow-ups for this lead.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setFollowUpSuccess("");
                  setFollowUpsError("");
                  setShowFollowUpForm((current) => !current);
                }}
                className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-700"
              >
                {showFollowUpForm ? "Cancel" : "+ Add Follow-up"}
              </button>
            </div>

            {followUpSuccess && (
              <p className="mt-4 rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-700">
                {followUpSuccess}
              </p>
            )}

            {followUpsError && (
              <p className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                {followUpsError}
              </p>
            )}

            {showFollowUpForm && (
              <form
                onSubmit={handleCreateFollowUp}
                className="mt-5 space-y-4 rounded-xl border border-slate-200 bg-slate-50 p-4"
              >
                <div>
                  <label
                    htmlFor="follow-up-method"
                    className="mb-1.5 block text-sm font-medium"
                  >
                    Follow-up method
                  </label>

                  <select
                    id="follow-up-method"
                    value={followUpMethod}
                    onChange={(event) =>
                      setFollowUpMethod(
                        event.target.value as "email" | "call" | "meeting"
                      )
                    }
                    className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm"
                  >
                    <option value="email">Email</option>
                    <option value="call">Phone call</option>
                    <option value="meeting">Meeting</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="follow-up-date"
                    className="mb-1.5 block text-sm font-medium"
                  >
                    Follow-up date
                  </label>

                  <input
                    id="follow-up-date"
                    type="date"
                    required
                    min={todayLocal()}
                    value={followUpDate}
                    onChange={(event) => setFollowUpDate(event.target.value)}
                    className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm"
                  />
                </div>

                <div>
                  <label
                    htmlFor="follow-up-notes"
                    className="mb-1.5 block text-sm font-medium"
                  >
                    Notes
                  </label>

                  <textarea
                    id="follow-up-notes"
                    rows={3}
                    maxLength={2000}
                    value={followUpNotes}
                    onChange={(event) => setFollowUpNotes(event.target.value)}
                    placeholder="What should the sales team follow up on?"
                    className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm"
                  />
                </div>

                <button
                  type="submit"
                  disabled={savingFollowUp || !followUpDate}
                  className="w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {savingFollowUp ? "Saving..." : "Save Follow-up"}
                </button>
              </form>
            )}

            {followUps.length === 0 ? (
              <div className="mt-5 rounded-xl bg-slate-50 px-4 py-8 text-center">
                <p className="font-medium">No follow-ups yet</p>

                <p className="mt-1 text-sm text-slate-500">
                  Add a follow-up to plan the next contact.
                </p>
              </div>
            ) : (
              <div className="mt-5 space-y-3">
                {followUps.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-xl border border-slate-200 p-4"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="font-semibold capitalize">
                        {item.method === "call"
                          ? "Phone call"
                          : item.method}
                      </span>

                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                          item.status === "completed"
                            ? "bg-green-100 text-green-700"
                            : item.status === "cancelled"
                              ? "bg-slate-200 text-slate-600"
                              : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>

                    <p className="mt-2 text-sm text-slate-500">
                      Scheduled for: {item.follow_up_date}
                    </p>

                    {item.notes && (
                      <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-slate-700">
                        {item.notes}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>

        <aside className="space-y-5">
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Lead Status
            </p>

            <div
              className={`mt-3 rounded-xl border p-4 ${getCategoryStyle(
                qualification?.category
              )}`}
            >
              <p className="text-lg font-bold">
                {qualification?.category ?? "UNQUALIFIED"}
              </p>

              <p className="mt-1 text-xs">
                {qualification
                  ? `Qualification score: ${qualification.score}/100`
                  : "Awaiting qualification"}
              </p>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="font-bold">Actions</h2>

            <button
              type="button"
              onClick={contactLead}
              className="mt-4 w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-700"
            >
              Contact Lead
            </button>

            <button
              type="button"
              onClick={() => {
                setFollowUpSuccess("");
                setFollowUpsError("");
                setShowFollowUpForm(true);

                document
                  .getElementById("follow-up-method")
                  ?.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                  });
              }}
              className="mt-3 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Add Follow-up
            </button>
          </section>
        </aside>
      </div>
    </main>
  );
}

function Info({
  label,
  value,
}: {
  label: string;
  value: string | number | null | undefined;
}) {
  return (
    <div className="min-w-0">
      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p className="mt-1 break-words text-sm leading-6 text-slate-800">
        {value === null || value === undefined || value === ""
          ? "-"
          : value}
      </p>
    </div>
  );
}
