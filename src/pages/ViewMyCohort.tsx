import { FormEvent, useState } from "react";
import { httpService } from "../httpService";
import { toast } from "react-toastify";

interface CohortResponse {
  success: boolean;
  message: string;
  data?: {
    registrationNumber: number;
    classCategory: "A" | "B" | "C";
    firstName: string;
    lastName: string;
    ageGrade: "10-19" | "20-25" | "31-36" | "37+";
    email: string;
    phoneNumber: string;
    memberOfRccg: boolean;
  };
}

function ViewMyCohort() {
  const [identifier, setIdentifier] = useState("");
  const [loading, setLoading] = useState(false);
  const [cohort, setCohort] = useState<CohortResponse["data"]>();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!identifier.trim()) {
      toast.error("Please enter your email or phone number");
      return;
    }

    try {
      setLoading(true);
      setCohort(undefined);

      const response = await httpService.post<CohortResponse>("/cohort", {
        identifier: identifier.trim(),
      });

      if (!response.data.success || !response.data.data) {
        toast.error(
          response.data.message || "Participant record could not be found",
        );
        return;
      }

      setCohort(response.data.data);
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        "We couldn't find a registration with those details.";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 px-4 py-12 text-white">
      {/* Background glows */}
      <div className="pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full bg-emerald-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-10 h-96 w-96 rounded-full bg-emerald-400/10 blur-3xl" />

      <div className="relative mx-auto flex min-h-[80vh] w-full max-w-xl items-center justify-center">
        <div className="w-full">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              IMPACT 2026
            </div>

            <h1 className="text-4xl font-black tracking-tight sm:text-5xl">
              Find My <span className="text-emerald-400">Cohort.</span>
            </h1>

            <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-white/50 sm:text-base">
              Enter the email address or phone number you used during
              registration to view your assigned cohort.
            </p>
          </div>

          {/* Lookup card */}
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 shadow-2xl backdrop-blur-xl sm:p-8">
            <form onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="identifier"
                  className="mb-3 block text-xs font-bold uppercase tracking-[0.2em] text-white/50"
                >
                  Email or Phone Number
                </label>

                <input
                  id="identifier"
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="Enter email or phone number"
                  autoComplete="email"
                  className="w-full rounded-2xl border border-white/10 bg-black/20 px-5 py-4 text-white outline-none transition placeholder:text-white/25 focus:border-emerald-400/50 focus:ring-2 focus:ring-emerald-400/10"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-5 flex w-full items-center justify-center gap-3 rounded-2xl bg-emerald-500 px-6 py-4 font-bold text-white shadow-lg shadow-emerald-500/10 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <svg
                      className="h-5 w-5 animate-spin"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="9"
                        stroke="currentColor"
                        strokeWidth="3"
                        className="opacity-25"
                      />
                      <path
                        d="M21 12a9 9 0 0 0-9-9"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                    </svg>
                    Finding Your Cohort...
                  </>
                ) : (
                  <>
                    View My Cohort
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </>
                )}
              </button>
            </form>

            {/* Result */}
            {cohort && (
              <div className="mt-8 overflow-hidden rounded-3xl border border-emerald-400/20 bg-emerald-400/[0.06]">
                <div className="border-b border-white/10 px-6 py-5">
                  <p className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-400">
                    Registration Found
                  </p>

                  <h2 className="mt-2 text-2xl font-black">
                    Welcome, {cohort.firstName}!
                  </h2>
                </div>

                <div className="grid gap-px bg-white/10 sm:grid-cols-2">
                  <div className="bg-slate-950/70 p-5">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
                      Registration Number
                    </p>
                    <p className="mt-2 text-xl font-black text-white">
                      #{String(cohort.registrationNumber).padStart(6, "0")}
                    </p>
                  </div>

                  <div className="bg-slate-950/70 p-5">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
                      Your Cohort
                    </p>
                    <p className="mt-2 text-xl font-black text-emerald-400">
                      Class {cohort.classCategory}
                    </p>
                  </div>

                  <div className="bg-slate-950/70 p-5">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
                      Age Grade
                    </p>
                    <p className="mt-2 font-bold text-white">
                      {cohort.ageGrade}
                    </p>
                  </div>

                  <div className="bg-slate-950/70 p-5">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
                      RCCG Member
                    </p>
                    <p className="mt-2 font-bold text-white">
                      {cohort.memberOfRccg ? "Yes" : "No"}
                    </p>
                  </div>
                </div>

                <div className="px-6 py-5">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-center">
                    <p className="text-sm leading-6 text-white/50">
                      Your cohort has been automatically assigned for IMPACT
                      2026. Please keep your registration number safe.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer note */}
          <p className="mt-6 text-center text-xs text-white/25">
            RCCG New Life Youth & Young Adults Convention
          </p>
        </div>
      </div>
    </div>
  );
}

export default ViewMyCohort;
