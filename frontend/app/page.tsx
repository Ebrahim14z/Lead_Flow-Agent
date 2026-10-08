// "use client";

// import { FormEvent, useState } from "react";

// const API_URL =
//   process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// const industries = [
//   "SaaS",
//   "E-commerce",
//   "Technology",
//   "Healthcare",
//   "Finance",
//   "Education",
//   "Manufacturing",
//   "Other",
// ];

// const timelines = [
//   "Immediately",
//   "This month",
//   "1-3 months",
//   "3-6 months",
//   "6-12 months",
//   "Next year",
// ];

// export default function Home() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     company: "",
//     job_title: "",
//     industry: "",
//     company_size: "",
//     budget: "",
//     timeline: "",
//     need: "",
//     message: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false);
//   const [error, setError] = useState("");

//   function handleChange(
//     event: React.ChangeEvent<
//       HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
//     >
//   ) {
//     const { name, value } = event.target;

//     setFormData((previous) => ({
//       ...previous,
//       [name]: value,
//     }));
//   }

//   async function handleSubmit(event: FormEvent<HTMLFormElement>) {
//     event.preventDefault();

//     setLoading(true);
//     setError("");
//     setSuccess(false);

//     try {
//       const response = await fetch(`${API_URL}/webhooks/leads`, {
//         method: "POST",

//         headers: {
//           "Content-Type": "application/json",
//         },

//         body: JSON.stringify({
//           name: formData.name,
//           email: formData.email,
//           company: formData.company,
//           job_title: formData.job_title,
//           industry: formData.industry,
//           company_size: Number(formData.company_size),
//           budget: Number(formData.budget),
//           timeline: formData.timeline,
//           need: formData.need,
//           message: formData.message,
//         }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(
//           data?.detail || "Something went wrong. Please try again."
//         );
//       }

//       console.log("Lead created:", data);

//       setSuccess(true);

//       setFormData({
//         name: "",
//         email: "",
//         company: "",
//         job_title: "",
//         industry: "",
//         company_size: "",
//         budget: "",
//         timeline: "",
//         need: "",
//         message: "",
//       });
//     } catch (error) {
//       console.error(error);

//       setError(
//         error instanceof Error
//           ? error.message
//           : "Something went wrong. Please try again."
//       );
//     } finally {
//       setLoading(false);
//     }
//   }

//   if (success) {
//     return (
//       <main className="min-h-screen bg-slate-50 px-6 py-12">
//         <div className="mx-auto flex min-h-[80vh] max-w-2xl items-center justify-center">
//           <div className="w-full rounded-3xl bg-white p-10 text-center shadow-xl">

//             <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
//               <span className="text-4xl text-green-600">
//                 ✓
//               </span>
//             </div>

//             <h1 className="text-3xl font-bold text-slate-900">
//               Request Received
//             </h1>

//             <p className="mx-auto mt-4 max-w-lg text-lg leading-8 text-slate-600">
//               Thank you for contacting AI Solutions.
//               Your request has been successfully submitted.
//             </p>

//             <p className="mt-3 text-slate-500">
//               Our team will review your request and contact
//               you by email.
//             </p>

//             <button
//               onClick={() => setSuccess(false)}
//               className="mt-8 rounded-xl bg-slate-900 px-8 py-3 font-semibold text-white transition hover:bg-slate-700"
//             >
//               Submit Another Request
//             </button>

//           </div>
//         </div>
//       </main>
//     );
//   }

//   return (
//     <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6">

//       <div className="mx-auto max-w-3xl">

//         {/* Header */}

//         <div className="mb-8 text-center">

//           <div className="mb-4 inline-flex rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
//             AI Solutions
//           </div>

//           <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
//             Tell us how we can help
//           </h1>

//           <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-slate-600">
//             Tell us about your business and your needs.
//             Our team will review your request and get back
//             to you.
//           </p>

//         </div>

//         {/* Form */}

//         <div className="rounded-3xl bg-white p-6 shadow-xl sm:p-10">

//           <form
//             onSubmit={handleSubmit}
//             className="space-y-7"
//           >

//             {/* Name */}

//             <div>
//               <label
//                 htmlFor="name"
//                 className="mb-2 block text-sm font-semibold text-slate-700"
//               >
//                 Full Name *
//               </label>

//               <input
//                 id="name"
//                 name="name"
//                 type="text"
//                 value={formData.name}
//                 onChange={handleChange}
//                 placeholder="Ahmed Mohamed"
//                 required
//                 className="form-input"
//               />
//             </div>

//             {/* Email */}

//             <div>
//               <label
//                 htmlFor="email"
//                 className="mb-2 block text-sm font-semibold text-slate-700"
//               >
//                 Work Email *
//               </label>

//               <input
//                 id="email"
//                 name="email"
//                 type="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 placeholder="ahmed@company.com"
//                 required
//                 className="form-input"
//               />
//             </div>

//             {/* Company + Job */}

//             <div className="grid gap-6 sm:grid-cols-2">

//               <div>
//                 <label
//                   htmlFor="company"
//                   className="mb-2 block text-sm font-semibold text-slate-700"
//                 >
//                   Company *
//                 </label>

//                 <input
//                   id="company"
//                   name="company"
//                   type="text"
//                   value={formData.company}
//                   onChange={handleChange}
//                   placeholder="TechVision Solutions"
//                   required
//                   className="form-input"
//                 />
//               </div>

//               <div>
//                 <label
//                   htmlFor="job_title"
//                   className="mb-2 block text-sm font-semibold text-slate-700"
//                 >
//                   Job Title *
//                 </label>

//                 <input
//                   id="job_title"
//                   name="job_title"
//                   type="text"
//                   value={formData.job_title}
//                   onChange={handleChange}
//                   placeholder="CTO"
//                   required
//                   className="form-input"
//                 />
//               </div>

//             </div>

//             {/* Industry */}

//             <div>
//               <label
//                 htmlFor="industry"
//                 className="mb-2 block text-sm font-semibold text-slate-700"
//               >
//                 Industry *
//               </label>

//               <select
//                 id="industry"
//                 name="industry"
//                 value={formData.industry}
//                 onChange={handleChange}
//                 required
//                 className="form-input"
//               >
//                 <option value="">
//                   Select your industry
//                 </option>

//                 {industries.map((industry) => (
//                   <option
//                     key={industry}
//                     value={industry}
//                   >
//                     {industry}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Company Size + Budget */}

//             <div className="grid gap-6 sm:grid-cols-2">

//               <div>
//                 <label
//                   htmlFor="company_size"
//                   className="mb-2 block text-sm font-semibold text-slate-700"
//                 >
//                   Company Size *
//                 </label>

//                 <input
//                   id="company_size"
//                   name="company_size"
//                   type="number"
//                   min="1"
//                   value={formData.company_size}
//                   onChange={handleChange}
//                   placeholder="200"
//                   required
//                   className="form-input"
//                 />
//               </div>

//               <div>
//                 <label
//                   htmlFor="budget"
//                   className="mb-2 block text-sm font-semibold text-slate-700"
//                 >
//                   Budget (USD) *
//                 </label>

//                 <input
//                   id="budget"
//                   name="budget"
//                   type="number"
//                   min="0"
//                   step="0.01"
//                   value={formData.budget}
//                   onChange={handleChange}
//                   placeholder="15000"
//                   required
//                   className="form-input"
//                 />
//               </div>

//             </div>

//             {/* Timeline */}

//             <div>
//               <label
//                 htmlFor="timeline"
//                 className="mb-2 block text-sm font-semibold text-slate-700"
//               >
//                 Timeline *
//               </label>

//               <select
//                 id="timeline"
//                 name="timeline"
//                 value={formData.timeline}
//                 onChange={handleChange}
//                 required
//                 className="form-input"
//               >
//                 <option value="">
//                   Select your timeline
//                 </option>

//                 {timelines.map((timeline) => (
//                   <option
//                     key={timeline}
//                     value={timeline}
//                   >
//                     {timeline}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Need */}

//             <div>
//               <label
//                 htmlFor="need"
//                 className="mb-2 block text-sm font-semibold text-slate-700"
//               >
//                 What do you need? *
//               </label>

//               <input
//                 id="need"
//                 name="need"
//                 type="text"
//                 value={formData.need}
//                 onChange={handleChange}
//                 placeholder="AI Customer Support"
//                 required
//                 className="form-input"
//               />
//             </div>

//             {/* Message */}

//             <div>
//               <label
//                 htmlFor="message"
//                 className="mb-2 block text-sm font-semibold text-slate-700"
//               >
//                 Tell us more
//               </label>

//               <textarea
//                 id="message"
//                 name="message"
//                 value={formData.message}
//                 onChange={handleChange}
//                 placeholder="Tell us more about your requirements..."
//                 rows={6}
//                 className="form-input resize-none"
//               />
//             </div>

//             {/* Error */}

//             {error && (
//               <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
//                 {error}
//               </div>
//             )}

//             {/* Submit */}

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full rounded-xl bg-slate-900 px-6 py-4 text-base font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
//             >
//               {loading
//                 ? "Submitting..."
//                 : "Submit Request"}
//             </button>

//             <p className="text-center text-sm text-slate-500">
//               By submitting this form, you agree to be
//               contacted by our team regarding your request.
//             </p>

//           </form>

//         </div>

//         <p className="mt-6 text-center text-sm text-slate-400">
//           Powered by LeadFlow
//         </p>

//       </div>

//     </main>
//   );
// }


"use client";

import { FormEvent, useState } from "react";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const industries = [
  "SaaS",
  "E-commerce",
  "Technology",
  "Healthcare",
  "Finance",
  "Education",
  "Manufacturing",
  "Other",
];

const timelines = [
  "Immediately",
  "This month",
  "1-3 months",
  "3-6 months",
  "6-12 months",
  "Next year",
];

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    job_title: "",
    industry: "",
    company_size: "",
    budget: "",
    timeline: "",
    need: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  function handleChange(
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    console.log("FORM SUBMITTED");

    setLoading(true);
    setError("");

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        company: formData.company,
        job_title: formData.job_title,
        industry: formData.industry,
        company_size: Number(formData.company_size),
        budget: Number(formData.budget),
        timeline: formData.timeline,
        need: formData.need,
        message: formData.message,
      };

      console.log("Sending to backend:", payload);
      console.log("API URL:", `${API_URL}/webhooks/leads`);

      const response = await fetch(
        `${API_URL}/webhooks/leads`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      console.log("Backend status:", response.status);

      const data = await response.json();

      console.log("Backend response:", data);

      if (!response.ok) {
        throw new Error(
          data?.detail ||
            "Something went wrong. Please try again."
        );
      }

      setSuccess(true);

      setFormData({
        name: "",
        email: "",
        company: "",
        job_title: "",
        industry: "",
        company_size: "",
        budget: "",
        timeline: "",
        need: "",
        message: "",
      });
    } catch (error) {
      console.error("SUBMIT ERROR:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-12">
        <div className="mx-auto flex min-h-[80vh] max-w-2xl items-center justify-center">
          <div className="w-full rounded-3xl bg-white p-10 text-center shadow-xl">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
              <span className="text-4xl text-green-600">
                ✓
              </span>
            </div>

            <h1 className="text-3xl font-bold text-slate-900">
              Request Received
            </h1>

            <p className="mx-auto mt-4 max-w-lg text-lg leading-8 text-slate-600">
              Thank you for contacting AI Solutions.
              Your request has been successfully submitted.
            </p>

            <p className="mt-3 text-slate-500">
              Our team will review your request and contact
              you by email.
            </p>

            <button
              type="button"
              onClick={() => setSuccess(false)}
              className="mt-8 rounded-xl bg-slate-900 px-8 py-3 font-semibold text-white transition hover:bg-slate-700"
            >
              Submit Another Request
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-3xl">

        {/* Header */}

        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
            AI Solutions
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Tell us how we can help
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-slate-600">
            Tell us about your business and your needs.
            Our team will review your request and get back
            to you.
          </p>
        </div>

        {/* Form */}

        <div className="rounded-3xl bg-white p-6 shadow-xl sm:p-10">
          <form
            onSubmit={handleSubmit}
            className="space-y-7"
          >

            {/* Name */}

            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Full Name *
              </label>

              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Ahmed Mohamed"
                required
                className="form-input"
              />
            </div>

            {/* Email */}

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Work Email *
              </label>

              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="ahmed@company.com"
                required
                className="form-input"
              />
            </div>

            {/* Company + Job */}

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="company"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Company *
                </label>

                <input
                  id="company"
                  name="company"
                  type="text"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="TechVision Solutions"
                  required
                  className="form-input"
                />
              </div>

              <div>
                <label
                  htmlFor="job_title"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Job Title *
                </label>

                <input
                  id="job_title"
                  name="job_title"
                  type="text"
                  value={formData.job_title}
                  onChange={handleChange}
                  placeholder="CTO"
                  required
                  className="form-input"
                />
              </div>
            </div>

            {/* Industry */}

            <div>
              <label
                htmlFor="industry"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Industry *
              </label>

              <select
                id="industry"
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                required
                className="form-input"
              >
                <option value="">
                  Select your industry
                </option>

                {industries.map((industry) => (
                  <option key={industry} value={industry}>
                    {industry}
                  </option>
                ))}
              </select>
            </div>

            {/* Company Size + Budget */}

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="company_size"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Company Size *
                </label>

                <input
                  id="company_size"
                  name="company_size"
                  type="number"
                  min="1"
                  value={formData.company_size}
                  onChange={handleChange}
                  placeholder="200"
                  required
                  className="form-input"
                />
              </div>

              <div>
                <label
                  htmlFor="budget"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Budget (USD) *
                </label>

                <input
                  id="budget"
                  name="budget"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.budget}
                  onChange={handleChange}
                  placeholder="15000"
                  required
                  className="form-input"
                />
              </div>
            </div>

            {/* Timeline */}

            <div>
              <label
                htmlFor="timeline"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Timeline *
              </label>

              <select
                id="timeline"
                name="timeline"
                value={formData.timeline}
                onChange={handleChange}
                required
                className="form-input"
              >
                <option value="">
                  Select your timeline
                </option>

                {timelines.map((timeline) => (
                  <option key={timeline} value={timeline}>
                    {timeline}
                  </option>
                ))}
              </select>
            </div>

            {/* Need */}

            <div>
              <label
                htmlFor="need"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                What do you need? *
              </label>

              <input
                id="need"
                name="need"
                type="text"
                value={formData.need}
                onChange={handleChange}
                placeholder="AI Customer Support"
                required
                className="form-input"
              />
            </div>

            {/* Message */}

            <div>
              <label
                htmlFor="message"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Tell us more
              </label>

              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us more about your requirements..."
                rows={6}
                className="form-input resize-none"
              />
            </div>

            {/* Error */}

            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                {error}
              </div>
            )}

            {/* Submit */}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-slate-900 px-6 py-4 text-base font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "Submitting..."
                : "Submit Request"}
            </button>

            <p className="text-center text-sm text-slate-500">
              By submitting this form, you agree to be
              contacted by our team regarding your request.
            </p>

          </form>
        </div>

        <p className="mt-6 text-center text-sm text-slate-400">
          Powered by LeadFlow
        </p>

      </div>
    </main>
  );
}