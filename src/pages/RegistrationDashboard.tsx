import {
  Users,
  School,
  UserCheck,
  UserRound,
  Clock,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { socket } from "../socket";
import { httpService } from "../httpService";
import { useEffect, useState } from "react";

type IDashboard = {
  total: number;
  male: number;
  female: number;
  institutions: number;
  pending: number;
  approved: number;
  rejected: number;
};
function RegistrationDashboard() {
  const [dashboardData, setDashboardData] = useState<IDashboard>({
    total: 0,
    male: 0,
    female: 0,
    institutions: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
  });
  const [connected, setConnected] = useState(false);

  const isOffline = !connected;

  const stats = [
    {
      title: "Total Registered",
      value: dashboardData?.total || 0,
      icon: Users,
      bg: "bg-blue-50",
      text: "text-blue-600",
    },
    {
      title: "Schools Registered",
      value: dashboardData?.institutions || 0,
      icon: School,
      bg: "bg-green-50",
      text: "text-green-600",
    },
    {
      title: "Male Registered",
      value: dashboardData?.male || 0,
      icon: UserCheck,
      bg: "bg-indigo-50",
      text: "text-indigo-600",
    },
    {
      title: "Female Registered",
      value: dashboardData?.female || 0,
      icon: UserRound,
      bg: "bg-pink-50",
      text: "text-pink-600",
    },

    // NEW STATUS CARDS
    {
      title: "Pending",
      value: dashboardData?.pending || 0,
      icon: Clock,
      bg: "bg-yellow-50",
      text: "text-yellow-600",
    },
    {
      title: "Approved",
      value: dashboardData?.approved || 0,
      icon: CheckCircle2,
      bg: "bg-emerald-50",
      text: "text-emerald-600",
    },
    {
      title: "Rejected",
      value: dashboardData?.rejected || 0,
      icon: XCircle,
      bg: "bg-red-50",
      text: "text-red-600",
    },
  ];

  const getData = async () => {
    try {
      const response = await httpService.get("dashboard");
      setDashboardData(response.data);
    } catch (error) {
      // toastError
    }
  };
  useEffect(() => {
    const onConnect = async () => {
      console.log("connected", socket.id);
      setConnected(true);
      await getData();
    };

    const onDisconnect = () => {
      console.log("disconnected");
      setConnected(false);
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    socket.on("reconnect", onConnect);

    socket.on("new-registration", (data) => {
      setDashboardData(data);
    });

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("reconnect", onConnect);
    };
  }, []);
  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">
          Registration Dashboard
        </h1>
        <p className="mt-2 text-slate-500">
          Overview of participant registrations across institutions.
        </p>
      </div>
      <section className="w-full">
        <div
          className={`grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4 transition-all duration-500 ${
            isOffline ? "opacity-50 grayscale pointer-events-none" : ""
          }`}
        >
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.title}
                className={`group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300
  ${isOffline ? "" : "hover:-translate-y-1 hover:shadow-lg"}
`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500">
                      {stat.title}
                    </p>

                    <h2 className="mt-2 text-3xl font-bold text-slate-800">
                      {stat.value}
                    </h2>
                  </div>

                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-xl ${stat.bg}`}
                  >
                    <Icon size={28} className={stat.text} />
                  </div>
                </div>

                <div className="mt-4 h-1 w-0 rounded-full bg-slate-200 transition-all duration-500 group-hover:w-full" />
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default RegistrationDashboard;
