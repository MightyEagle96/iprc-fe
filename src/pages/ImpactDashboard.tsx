import React, { useEffect, useState } from "react";
import { httpService } from "../httpService";
import { toast } from "react-toastify";

type ClassCategory = "A" | "B" | "C";

interface Participant {
  registrationNumber: number;
  firstName: string;
  lastName: string;
  gender: string;
  ageGrade: string;
  email: string;
  phoneNumber: string;
  memberOfRccg: boolean;
  classCategory: ClassCategory;
  createdAt: string;
}

interface DashboardStats {
  total: number;
  members: number;
  nonMembers: number;

  classes: {
    category: ClassCategory;
    count: number;
  }[];

  ageGrades: {
    ageGrade: string;
    count: number;
  }[];

  genders: {
    gender: string;
    count: number;
  }[];
}

interface ParticipantsResponse {
  success: boolean;
  message: string;
  data: {
    participants: Participant[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
      hasNextPage: boolean;
      hasPreviousPage: boolean;
    };
  };
}

function ImpactDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [participants, setParticipants] = useState<Participant[]>([]);

  const [loadingStats, setLoadingStats] = useState(true);
  const [loadingParticipants, setLoadingParticipants] = useState(true);

  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState("");
  const [ageFilter, setAgeFilter] = useState("");

  const [page, setPage] = useState(1);

  const [pagination, setPagination] =
    useState<ParticipantsResponse["data"]["pagination"]>();

  // ---------------------------------------------------------
  // Statistics
  // ---------------------------------------------------------

  const fetchStats = async () => {
    try {
      setLoadingStats(true);

      const response = await httpService.get<{
        success: boolean;
        data: DashboardStats;
      }>("/impact/stats");

      if (response.data.success) {
        setStats(response.data.data);
      }
    } catch (error) {
      console.error(error);
      toast.error("Unable to load dashboard statistics");
    } finally {
      setLoadingStats(false);
    }
  };

  // ---------------------------------------------------------
  // Participants
  // ---------------------------------------------------------

  const fetchParticipants = async () => {
    try {
      setLoadingParticipants(true);

      const params = new URLSearchParams();

      params.set("page", String(page));
      params.set("limit", "20");

      if (search.trim()) {
        params.set("search", search.trim());
      }

      if (classFilter) {
        params.set("classCategory", classFilter);
      }

      if (ageFilter) {
        params.set("ageGrade", ageFilter);
      }

      const response = await httpService.get<ParticipantsResponse>(
        `/impact/participants?${params.toString()}`,
      );

      if (response.data.success) {
        setParticipants(response.data.data.participants);
        setPagination(response.data.data.pagination);
      }
    } catch (error) {
      console.error(error);
      toast.error("Unable to load participants");
    } finally {
      setLoadingParticipants(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  useEffect(() => {
    fetchParticipants();
  }, [page, search, classFilter, ageFilter]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchStats();
      fetchParticipants();
    }, 30_000);

    return () => {
      clearInterval(interval);
    };
  }, [page, search, classFilter, ageFilter]);

  // ---------------------------------------------------------
  // Helpers
  // ---------------------------------------------------------

  const formatName = (value: string) => {
    return value
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  const getClassCount = (category: ClassCategory) => {
    return (
      stats?.classes.find((item) => item.category === category)?.count ?? 0
    );
  };

  // ---------------------------------------------------------
  // UI
  // ---------------------------------------------------------

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Background glow */}
        <div className="pointer-events-none fixed -left-40 top-20 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />

        <div className="relative">
          {/* Header */}
          <div className="mb-8">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              IMPACT 2026
            </div>

            <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
              Registration <span className="text-emerald-400">Dashboard.</span>
            </h1>

            <p className="mt-2 text-sm text-white/40">
              Monitor registrations and participant distribution.
            </p>
          </div>

          {/* Stats */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              label="Total Registrations"
              value={stats?.total ?? 0}
              loading={loadingStats}
            />

            <StatCard
              label="RCCG Members"
              value={stats?.members ?? 0}
              loading={loadingStats}
            />

            <StatCard
              label="Non Members"
              value={stats?.nonMembers ?? 0}
              loading={loadingStats}
            />

            <StatCard
              label="Class A / B / C"
              value={`${getClassCount("A")} / ${getClassCount("B")} / ${getClassCount("C")}`}
              loading={loadingStats}
            />
          </div>

          {/* Distribution */}
          <div className="mt-6 grid gap-6 lg:grid-cols-3">
            {/* Classes */}
            <DistributionCard title="Class Distribution">
              {stats?.classes.map((item) => (
                <DistributionRow
                  key={item.category}
                  label={`Class ${item.category}`}
                  count={item.count}
                  total={stats.total}
                />
              ))}
            </DistributionCard>

            {/* Age */}
            <DistributionCard title="Age Distribution">
              {stats?.ageGrades.map((item) => (
                <DistributionRow
                  key={item.ageGrade}
                  label={item.ageGrade}
                  count={item.count}
                  total={stats.total}
                />
              ))}
            </DistributionCard>

            {/* Gender */}
            <DistributionCard title="Gender Distribution">
              {stats?.genders.map((item) => (
                <DistributionRow
                  key={item.gender}
                  label={formatName(item.gender)}
                  count={item.count}
                  total={stats.total}
                />
              ))}
            </DistributionCard>
          </div>

          {/* Participants */}
          <div className="mt-6 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] shadow-2xl backdrop-blur-xl">
            {/* Table header */}
            <div className="border-b border-white/10 p-5 sm:p-6">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h2 className="text-xl font-black">
                    Registered Participants
                  </h2>

                  <p className="mt-1 text-xs text-white/35">
                    {pagination?.total ?? 0} participants registered
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  {/* Search */}
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => {
                      setPage(1);
                      setSearch(e.target.value);
                    }}
                    placeholder="Search participant..."
                    className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none placeholder:text-white/25 focus:border-emerald-400/40 sm:w-64"
                  />

                  {/* Class */}
                  <select
                    value={classFilter}
                    onChange={(e) => {
                      setPage(1);
                      setClassFilter(e.target.value);
                    }}
                    className="rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none focus:border-emerald-400/40"
                  >
                    <option value="">All Classes</option>
                    <option value="A">Class A</option>
                    <option value="B">Class B</option>
                    <option value="C">Class C</option>
                  </select>

                  {/* Age */}
                  <select
                    value={ageFilter}
                    onChange={(e) => {
                      setPage(1);
                      setAgeFilter(e.target.value);
                    }}
                    className="rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none focus:border-emerald-400/40"
                  >
                    <option value="">All Ages</option>
                    <option value="10-19">10-19</option>
                    <option value="20-25">20-25</option>
                    <option value="26-30">26-30</option>
                    <option value="31-36">31-36</option>
                    <option value="37+">37+</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full min-w-[950px] text-left">
                <thead>
                  <tr className="border-b border-white/10 text-[10px] uppercase tracking-[0.18em] text-white/30">
                    <th className="px-6 py-4">Reg. No.</th>
                    <th className="px-6 py-4">Participant</th>
                    <th className="px-6 py-4">Gender</th>
                    <th className="px-6 py-4">Age</th>
                    <th className="px-6 py-4">Contact</th>
                    <th className="px-6 py-4">RCCG</th>
                    <th className="px-6 py-4">Class</th>
                    <th className="px-6 py-4">Registered</th>
                  </tr>
                </thead>

                <tbody>
                  {loadingParticipants ? (
                    <tr>
                      <td
                        colSpan={8}
                        className="px-6 py-16 text-center text-sm text-white/30"
                      >
                        Loading participants...
                      </td>
                    </tr>
                  ) : participants.length === 0 ? (
                    <tr>
                      <td
                        colSpan={8}
                        className="px-6 py-16 text-center text-sm text-white/30"
                      >
                        No participants found.
                      </td>
                    </tr>
                  ) : (
                    participants.map((participant) => (
                      <tr
                        key={participant.registrationNumber}
                        className="border-b border-white/[0.06] transition hover:bg-white/[0.03]"
                      >
                        <td className="px-6 py-5">
                          <span className="font-mono text-sm font-bold text-emerald-400">
                            #
                            {String(participant.registrationNumber).padStart(
                              6,
                              "0",
                            )}
                          </span>
                        </td>

                        <td className="px-6 py-5">
                          <p className="font-semibold">
                            {formatName(participant.firstName)}{" "}
                            {formatName(participant.lastName)}
                          </p>
                        </td>

                        <td className="px-6 py-5 text-sm capitalize text-white/60">
                          {participant.gender}
                        </td>

                        <td className="px-6 py-5">
                          <span className="rounded-lg bg-white/[0.05] px-3 py-1.5 text-xs font-semibold text-white/60">
                            {participant.ageGrade}
                          </span>
                        </td>

                        <td className="px-6 py-5">
                          <p className="text-xs text-white/60">
                            {participant.email}
                          </p>
                          <p className="mt-1 text-xs text-white/30">
                            {participant.phoneNumber}
                          </p>
                        </td>

                        <td className="px-6 py-5">
                          <span
                            className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase ${
                              participant.memberOfRccg
                                ? "bg-emerald-400/10 text-emerald-400"
                                : "bg-white/[0.06] text-white/40"
                            }`}
                          >
                            {participant.memberOfRccg ? "Yes" : "No"}
                          </span>
                        </td>

                        <td className="px-6 py-5">
                          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-400/10 font-black text-emerald-400">
                            {participant.classCategory}
                          </span>
                        </td>

                        <td className="whitespace-nowrap px-6 py-5 text-xs text-white/35">
                          {new Date(participant.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {pagination && pagination.totalPages > 0 && (
              <div className="flex items-center justify-between border-t border-white/10 px-5 py-5 sm:px-6">
                <p className="text-xs text-white/30">
                  Page{" "}
                  <span className="font-bold text-white/60">
                    {pagination.page}
                  </span>{" "}
                  of{" "}
                  <span className="font-bold text-white/60">
                    {pagination.totalPages}
                  </span>
                </p>

                <div className="flex gap-2">
                  <button
                    disabled={!pagination.hasPreviousPage}
                    onClick={() => setPage((current) => current - 1)}
                    className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-bold text-white/60 transition hover:bg-white/[0.08] disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    Previous
                  </button>

                  <button
                    disabled={!pagination.hasNextPage}
                    onClick={() => setPage((current) => current + 1)}
                    className="rounded-xl bg-emerald-500 px-4 py-2 text-xs font-bold text-white transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

interface StatCardProps {
  label: string;
  value: string | number;
  loading?: boolean;
}

function StatCard({ label, value, loading }: StatCardProps) {
  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.05] p-6 backdrop-blur-xl">
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/35">
        {label}
      </p>

      <p className="mt-3 text-3xl font-black tracking-tight">
        {loading ? "—" : value}
      </p>
    </div>
  );
}

function DistributionCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.05] p-6 backdrop-blur-xl">
      <h3 className="mb-5 text-sm font-bold text-white/80">{title}</h3>

      <div className="space-y-4">{children}</div>
    </div>
  );
}

function DistributionRow({
  label,
  count,
  total,
}: {
  label: string;
  count: number;
  total: number;
}) {
  const percentage = total ? Math.round((count / total) * 100) : 0;

  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-xs">
        <span className="text-white/50">{label}</span>

        <span className="font-bold text-white/70">
          {count}{" "}
          <span className="font-normal text-white/25">({percentage}%)</span>
        </span>
      </div>

      <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
        <div
          className="h-full rounded-full bg-emerald-400 transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

export default ImpactDashboard;
