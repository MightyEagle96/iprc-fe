import React, { FormEvent, useState } from "react";
import { httpService } from "../httpService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

type AgeGrade = "10-19" | "20-25" | "26-30" | "31-36" | "37+";

interface RegistrationForm {
  firstName: string;
  lastName: string;
  gender: string;
  ageGrade: AgeGrade | "";
  email: string;
  phoneNumber: string;
  memberOfRccg: boolean;
}

interface RegistrationResponse {
  success: boolean;
  message: string;
  data?: {
    registrationNumber: number;
    classCategory: "A" | "B" | "C";
    participant: RegistrationForm;
  };
}

const ageGrades: {
  value: AgeGrade;
  label: string;
}[] = [
  {
    value: "10-19",
    label: "10 – 19",
  },
  {
    value: "20-25",
    label: "20 – 25",
  },
  {
    value: "26-30",
    label: "26 – 30",
  },
  {
    value: "31-36",
    label: "31 – 36",
  },
  {
    value: "37+",
    label: "37+",
  },
];

function ImpactRegistration() {
  const navigate = useNavigate();
  const [form, setForm] = useState<RegistrationForm>({
    firstName: "",
    lastName: "",
    gender: "",
    ageGrade: "",
    email: "",
    phoneNumber: "",
    memberOfRccg: false,
  });

  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const [registration, setRegistration] =
    useState<RegistrationResponse["data"]>(undefined);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRccgChange = (value: boolean) => {
    setForm((prev) => ({
      ...prev,
      memberOfRccg: value,
    }));
  };

  const handleAgeGradeChange = (ageGrade: AgeGrade) => {
    setForm((prev) => ({
      ...prev,
      ageGrade,
    }));
  };

  /**
   * Validate form and open preview
   */
  const handleReview = (e: FormEvent) => {
    e.preventDefault();

    if (
      !form.firstName.trim() ||
      !form.lastName.trim() ||
      !form.gender ||
      !form.ageGrade ||
      !form.email.trim() ||
      !form.phoneNumber.trim()
    ) {
      toast.error("Please complete all required fields.");
      return;
    }

    setShowPreview(true);
  };

  /**
   * Actually submit registration
   */
  const handleSubmit = async () => {
    try {
      setLoading(true);

      const response = await httpService.post<RegistrationResponse>(
        "/impact-registration",
        form,
      );

      if (response.data.success && response.data.data) {
        setShowPreview(false);
        setRegistration(response.data.data);

        toast.success("Registration successful!");

        setForm({
          firstName: "",
          lastName: "",
          gender: "",
          ageGrade: "",
          email: "",
          phoneNumber: "",
          memberOfRccg: false,
        });
      }
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        "Unable to complete registration. Please try again.";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  /**
   * =========================================================
   * SUCCESS SCREEN
   * =========================================================
   */

  if (registration) {
    return (
      <div className="relative min-h-screen overflow-hidden bg-slate-950 px-4 py-12 text-white">
        {/* Background glow */}
        <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-emerald-500/20 blur-3xl" />

        <div className="pointer-events-none absolute -right-40 bottom-20 h-96 w-96 rounded-full bg-emerald-400/10 blur-3xl" />

        <div className="relative mx-auto flex min-h-[80vh] max-w-2xl items-center justify-center">
          <div className="w-full rounded-[2rem] border border-white/10 bg-white/[0.06] p-8 text-center shadow-2xl backdrop-blur-xl sm:p-12">
            {/* Success Icon */}
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/10 ring-1 ring-emerald-400/30">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500">
                <svg
                  className="h-7 w-7 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>

            <p className="mt-7 text-xs font-bold uppercase tracking-[0.3em] text-emerald-400">
              Registration Successful
            </p>

            <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">
              Welcome to IMPACT 2026
            </h1>

            <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-white/50">
              Your registration has been successfully completed. We look forward
              to experiencing IMPACT with you.
            </p>

            {/* Registration details */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">
                  Registration Number
                </p>

                <p className="mt-3 text-3xl font-black tracking-wider">
                  #{String(registration.registrationNumber).padStart(6, "0")}
                </p>
              </div>

              <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-400">
                  Your Class
                </p>

                <p className="mt-2 text-5xl font-black text-emerald-400">
                  {registration.classCategory}
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white/50">
              Your class has been automatically assigned. Please keep your
              registration number safe.
            </div>

            <div className="mt-8 space-y-3">
              <button
                type="button"
                onClick={() => navigate("/cohort")}
                className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-emerald-500 px-6 py-4 font-bold text-white shadow-lg shadow-emerald-500/10 transition hover:bg-emerald-400"
              >
                View My Cohort
                <svg
                  className="h-5 w-5 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </button>

              <button
                type="button"
                onClick={() => navigate("/")}
                className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-3.5 font-semibold text-white/60 transition hover:bg-white/[0.08] hover:text-white"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /**
   * =========================================================
   * REGISTRATION PAGE
   * =========================================================
   */

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      {/* Background decoration */}
      <div className="pointer-events-none absolute left-[-180px] top-[15%] h-[400px] w-[400px] rounded-full bg-emerald-500/10 blur-[120px]" />

      <div className="pointer-events-none absolute right-[-180px] top-[45%] h-[450px] w-[450px] rounded-full bg-emerald-400/10 blur-[120px]" />

      {/* =====================================================
          PAGE HEADER
      ====================================================== */}

      <section className="relative px-5 pb-8 pt-28 sm:px-8 sm:pt-32">
        <div className="mx-auto max-w-5xl">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-500/10 px-4 py-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />

              <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-400">
                IMPACT 2026
              </span>
            </div>

            <h1 className="text-4xl font-black tracking-tight sm:text-6xl">
              Register for <span className="text-emerald-400">IMPACT.</span>
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-white/50 sm:text-lg">
              Join the RCCG New Life Youth & Young Adults Convention as we
              gather to encounter God, discover purpose and make kingdom impact.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          FORM
      ====================================================== */}

      <main className="relative px-4 pb-20 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.06] shadow-2xl backdrop-blur-xl">
            {/* Form Header */}
            <div className="border-b border-white/10 bg-white/[0.03] px-6 py-7 sm:px-10">
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 ring-1 ring-emerald-400/20">
                  <svg
                    className="h-5 w-5 text-emerald-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>

                <div>
                  <h2 className="text-xl font-bold">Participant Information</h2>

                  <p className="mt-1 text-sm text-white/40">
                    Tell us a little about yourself.
                  </p>
                </div>
              </div>
            </div>

            <form
              onSubmit={handleReview}
              className="px-6 py-8 sm:px-10 sm:py-10"
            >
              {/* =================================================
                  PERSONAL INFORMATION
              ================================================== */}

              <FormSection number="01" title="Personal Information">
                <div className="grid gap-5 sm:grid-cols-2">
                  <InputField
                    label="First Name"
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    placeholder="Enter your first name"
                  />

                  <InputField
                    label="Last Name"
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    placeholder="Enter your last name"
                  />
                </div>

                {/* Gender */}
                <div className="mt-5">
                  <label className="mb-3 block text-sm font-semibold text-white/80">
                    Gender
                  </label>

                  <div className="grid grid-cols-2 gap-3">
                    <ChoiceButton
                      selected={form.gender === "male"}
                      onClick={() =>
                        setForm((prev) => ({
                          ...prev,
                          gender: "male",
                        }))
                      }
                      label="Male"
                    />

                    <ChoiceButton
                      selected={form.gender === "female"}
                      onClick={() =>
                        setForm((prev) => ({
                          ...prev,
                          gender: "female",
                        }))
                      }
                      label="Female"
                    />
                  </div>
                </div>

                {/* Age Grade */}
                <div className="mt-6">
                  <label className="mb-3 block text-sm font-semibold text-white/80">
                    Age Grade
                  </label>

                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {ageGrades.map((grade) => (
                      <button
                        key={grade.value}
                        type="button"
                        onClick={() => handleAgeGradeChange(grade.value)}
                        className={`rounded-2xl border px-4 py-4 text-center transition ${
                          form.ageGrade === grade.value
                            ? "border-emerald-400 bg-emerald-500 text-white shadow-lg shadow-emerald-500/10"
                            : "border-white/10 bg-white/[0.03] text-white/60 hover:border-white/20 hover:bg-white/[0.06]"
                        }`}
                      >
                        <span className="text-sm font-bold">{grade.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </FormSection>

              {/* =================================================
                  CONTACT
              ================================================== */}

              <FormSection number="02" title="Contact Information">
                <div className="grid gap-5 sm:grid-cols-2">
                  <InputField
                    label="Email Address"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                  />

                  <InputField
                    label="Phone Number"
                    name="phoneNumber"
                    type="tel"
                    value={form.phoneNumber}
                    onChange={handleChange}
                    placeholder="08012345678"
                  />
                </div>
              </FormSection>

              {/* =================================================
                  CHURCH INFORMATION
              ================================================== */}

              <FormSection number="03" title="Church Information">
                <label className="mb-3 block text-sm font-semibold text-white/80">
                  Are you a member of RCCG?
                </label>

                <div className="grid gap-3 sm:grid-cols-2">
                  <ChoiceButton
                    selected={form.memberOfRccg === true}
                    onClick={() => handleRccgChange(true)}
                    label="Yes, I am"
                  />

                  <ChoiceButton
                    selected={form.memberOfRccg === false}
                    onClick={() => handleRccgChange(false)}
                    label="No, I am not"
                  />
                </div>
              </FormSection>

              {/* =================================================
                  CLASS NOTICE
              ================================================== */}

              <div className="mb-8 rounded-2xl border border-emerald-400/10 bg-emerald-500/[0.06] p-5">
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10">
                    <svg
                      className="h-5 w-5 text-emerald-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z"
                      />
                    </svg>
                  </div>

                  <div>
                    <p className="font-bold text-emerald-300">
                      Automatic Class Assignment
                    </p>

                    <p className="mt-1 text-sm leading-6 text-white/40">
                      Your IMPACT class will be assigned automatically when you
                      complete your registration. You do not need to select a
                      class.
                    </p>
                  </div>
                </div>
              </div>

              {/* =================================================
                  REVIEW BUTTON
              ================================================== */}

              <button
                type="submit"
                className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-emerald-500 px-6 py-4 text-base font-black text-white shadow-xl shadow-emerald-500/10 transition hover:bg-emerald-400"
              >
                Review Registration
                <svg
                  className="h-5 w-5 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </button>

              <p className="mt-4 text-center text-xs text-white/25">
                You will have an opportunity to review your information before
                completing registration.
              </p>
            </form>
          </div>
        </div>
      </main>

      {/* =====================================================
          PREVIEW MODAL
      ====================================================== */}

      {showPreview && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-4 backdrop-blur-md"
          onClick={() => !loading && setShowPreview(false)}
        >
          <div
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[2rem] border border-white/10 bg-slate-950 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="border-b border-white/10 px-6 py-6 sm:px-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="inline-flex rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-400">
                      Final Review
                    </span>
                  </div>

                  <h2 className="mt-3 text-2xl font-black text-white sm:text-3xl">
                    Confirm Your Details
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-white/40">
                    Please make sure everything below is correct before
                    registering.
                  </p>
                </div>

                <button
                  type="button"
                  disabled={loading}
                  onClick={() => setShowPreview(false)}
                  className="rounded-xl border border-white/10 bg-white/[0.04] p-2.5 text-white/40 transition hover:bg-white/10 hover:text-white disabled:opacity-50"
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="space-y-6 px-6 py-6 sm:px-8">
              <PreviewSection title="Personal Information">
                <PreviewItem label="First Name" value={form.firstName} />

                <PreviewItem label="Last Name" value={form.lastName} />

                <PreviewItem label="Gender" value={capitalize(form.gender)} />

                <PreviewItem label="Age Grade" value={form.ageGrade} />
              </PreviewSection>

              <PreviewSection title="Contact Information">
                <PreviewItem label="Email Address" value={form.email} />

                <PreviewItem label="Phone Number" value={form.phoneNumber} />
              </PreviewSection>

              <PreviewSection title="Church Information">
                <PreviewItem
                  label="RCCG Member"
                  value={form.memberOfRccg ? "Yes" : "No"}
                />
              </PreviewSection>

              {/* Assignment Notice */}
              <div className="rounded-2xl border border-emerald-400/10 bg-emerald-500/[0.06] p-5">
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10">
                    <svg
                      className="h-5 w-5 text-emerald-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z"
                      />
                    </svg>
                  </div>

                  <div>
                    <p className="font-bold text-emerald-300">
                      Class Assignment
                    </p>

                    <p className="mt-1 text-sm leading-6 text-white/40">
                      Your class will be automatically assigned after successful
                      registration.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="border-t border-white/10 bg-white/[0.02] px-6 py-5 sm:px-8">
              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  disabled={loading}
                  onClick={() => setShowPreview(false)}
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-3.5 font-bold text-white/70 transition hover:bg-white/10 hover:text-white disabled:opacity-50 sm:w-auto"
                >
                  Back & Edit
                </button>

                <button
                  type="button"
                  disabled={loading}
                  onClick={handleSubmit}
                  className="w-full rounded-2xl bg-emerald-500 px-6 py-3.5 font-black text-white shadow-lg shadow-emerald-500/10 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                >
                  {loading ? "Registering..." : "Confirm & Register"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ============================================================
   REUSABLE COMPONENTS
============================================================ */

function FormSection({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-10 border-b border-white/10 pb-10 last:mb-0 last:border-b-0">
      <div className="mb-6 flex items-center gap-3">
        <span className="text-xs font-black text-emerald-400">{number}</span>

        <div className="h-px w-6 bg-emerald-400/30" />

        <h3 className="text-lg font-bold text-white">{title}</h3>
      </div>

      {children}
    </section>
  );
}

function InputField({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2.5 block text-sm font-semibold text-white/80"
      >
        {label}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-sm text-white outline-none placeholder:text-white/20 transition focus:border-emerald-400/50 focus:bg-white/[0.06] focus:ring-4 focus:ring-emerald-500/10"
      />
    </div>
  );
}

function ChoiceButton({
  selected,
  onClick,
  label,
}: {
  selected: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-3 rounded-2xl border px-4 py-4 text-left transition ${
        selected
          ? "border-emerald-400 bg-emerald-500/10 text-white"
          : "border-white/10 bg-white/[0.03] text-white/50 hover:border-white/20 hover:bg-white/[0.06]"
      }`}
    >
      <span
        className={`flex h-5 w-5 items-center justify-center rounded-full border ${
          selected ? "border-emerald-400 bg-emerald-500" : "border-white/20"
        }`}
      >
        {selected && <span className="h-2 w-2 rounded-full bg-white" />}
      </span>

      <span className="text-sm font-semibold">{label}</span>
    </button>
  );
}

function PreviewSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">
        {title}
      </p>

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
        <div className="grid sm:grid-cols-2">{children}</div>
      </div>
    </div>
  );
}

function PreviewItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-b border-white/10 p-4 last:border-b-0 sm:border-r sm:nth-last-child(-n+2):border-b-0 sm:odd:border-r-0">
      <p className="text-[10px] font-bold uppercase tracking-wider text-white/25">
        {label}
      </p>

      <p className="mt-1.5 break-words text-sm font-semibold text-white/80">
        {value}
      </p>
    </div>
  );
}

function capitalize(value: string) {
  if (!value) return "";

  return value.charAt(0).toUpperCase() + value.slice(1);
}

export default ImpactRegistration;
