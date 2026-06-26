import { Users, UserCheck, UserRound, Verified } from "lucide-react";
import { socket } from "../socket";
import { httpService } from "../httpService";
import { useEffect, useState } from "react";

import { DataGrid } from "@mui/x-data-grid";

type IDashboard = {
  total: number;
  male: number;
  female: number;
  accredited: number;
};

interface Attendee {
  _id: string;
  username: string;
  name: string;
  gender: string;
  email: string;
  province: string;
  phoneNumber: string;
  accredited: boolean;
  timeAccredited?: string;
}

// import { StatusBadge } from "./RegistrationDashboard";
import { toast } from "react-toastify";
import { toastError } from "../components/ErrorToast";

function AccreditationPage() {
  const [dashboardData, setDashboardData] = useState<IDashboard>({
    total: 0,
    male: 0,
    female: 0,
    accredited: 0,
  });
  const [connected, setConnected] = useState(false);
  const [participants, setParticipants] = useState([]);
  const [total, setTotal] = useState(0);
  const [notFound, setNotFound] = useState(false);

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 50,
  });

  const isOffline = !connected;

  // const statusStyles = {
  //   pending: {
  //     bg: "bg-yellow-50",
  //     text: "text-yellow-600",
  //     dot: "bg-yellow-500",
  //   },
  //   approved: {
  //     bg: "bg-emerald-50",
  //     text: "text-emerald-600",
  //     dot: "bg-emerald-500",
  //   },
  //   rejected: {
  //     bg: "bg-red-50",
  //     text: "text-red-600",
  //     dot: "bg-red-500",
  //   },
  // };

  const stats = [
    {
      title: "Total Registered",
      value: dashboardData?.total || 0,
      icon: Users,
      bg: "bg-blue-50",
      text: "text-blue-600",
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
    {
      title: "Accredited",
      value: dashboardData?.accredited || 0,
      icon: Verified,
      bg: "bg-pink-50",
      text: "text-teal-600",
    },
  ];

  const getData = async () => {
    try {
      const response = await httpService.get("attendancedashboard");
      console.log(response.data);
      setDashboardData(response.data);
    } catch (error) {
      toastError(error);
    }
  };

  const getAccreditedParticipants = async () => {
    try {
      const response = await httpService.get("getaccreditedparticipants", {
        params: {
          page: paginationModel.page + 1,
          limit: paginationModel.pageSize,
        },
      });

      setParticipants(response.data.participants);
      setTotal(response.data.total);
    } catch (error) {
      toastError(error);
    }
  };

  useEffect(() => {
    //getData();
    const onConnect = async () => {
      console.log("connected", socket.id);
      setConnected(true);
      await getData();
      await getAccreditedParticipants();
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

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    {
      field: "name",
      headerName: "Name",
      width: 300,
      renderCell: (param: any) => (
        <span className="capitalize">{param.row?.name}</span>
      ),
    },
    {
      field: "gender",
      headerName: "Gender",
      width: 100,
      renderCell: (param: any) => (
        <span className="capitalize">{param.row?.gender}</span>
      ),
    },
    {
      field: "email",
      headerName: "Email",
      width: 300,
      renderCell: (param: any) => (
        <span className="lowercase">{param.row?.email}</span>
      ),
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      width: 150,
      renderCell: (param: any) => (
        <span className="capitalize">{param.row?.phoneNumber}</span>
      ),
    },
    {
      field: "province",
      headerName: "Province",
      width: 100,
      renderCell: (param: any) => (
        <span className="capitalize">{param.row?.province}</span>
      ),
    },

    {
      field: "timeAccredited",
      headerName: "Time Accredited",
      width: 150,
      renderCell: (param: any) => (
        <span className="capitalize">
          {new Date(param.row?.timeAccredited).toTimeString()}
        </span>
      ),
      //renderCell: (params: any) => <StatusBadge status={params.row?.status} />,
    },
  ];

  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [participant, setParticipant] = useState<Attendee | null>(null);

  const searchParticipant = async () => {
    if (!search.trim()) return;

    setLoading(true);
    setNotFound(false);
    setParticipant(null);
    try {
      setLoading(true);

      const { data } = await httpService("/searchparticipant", {
        params: { q: search },
      });

      if (data) {
        console.log(data);
        setParticipant(data);
      }

      if (!data) {
        setNotFound(true);
        return;
      }
    } catch (err) {
      setParticipant(null);
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  };

  const accreditParticipant = async () => {
    try {
      const { data } = await httpService.post("/accreditparticipant", {
        _id: participant?._id,
      });

      toast.success(data);
      getAccreditedParticipants();
      setParticipant(null);
    } catch (error) {
      toastError(error);
    }
  };
  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Accreditation</h1>

        <p className="mt-2 text-slate-500">
          Overview of participant registrations across provinces.
        </p>
      </div>

      {/* Statistics */}
      <section>
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
                className={`group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 ${
                  isOffline ? "" : "hover:-translate-y-1 hover:shadow-lg"
                }`}
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

      {/* Search Section */}
      <section className="mt-10">
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          {/* Search Header */}
          <div className="border-b border-slate-200 p-6">
            <h2 className="text-2xl font-bold text-slate-800">
              Participant Search
            </h2>

            <p className="mt-1 text-slate-500">
              Search using Name, Username, Email or Phone Number.
            </p>

            <div className="mt-6 flex flex-col gap-3 md:flex-row">
              <input
                className="flex-1 rounded-xl border border-slate-300 px-5 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                placeholder="Search participant..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && searchParticipant()}
              />

              <button
                onClick={searchParticipant}
                disabled={loading}
                className="rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Searching..." : "Search"}
              </button>
            </div>
          </div>

          {/* Participant Details */}
          {participant && (
            <div className="p-8">
              {/* Header */}
              <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-5">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-2xl font-bold text-blue-600">
                    {participant.name.charAt(0).toUpperCase()}
                  </div>

                  <div>
                    <h2 className="text-3xl font-bold text-slate-800">
                      {participant.name}
                    </h2>

                    <p className="mt-1 text-slate-500">
                      @{participant.username}
                    </p>
                  </div>
                </div>

                <span
                  className={`rounded-full px-5 py-2 text-sm font-semibold ${
                    participant.accredited
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {participant.accredited ? "✓ Accredited" : "Pending"}
                </span>
              </div>

              {/* Details */}
              <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
                <Info label="Email" value={participant.email} />

                <Info label="Phone Number" value={participant.phoneNumber} />

                <Info label="Gender" value={participant.gender} />

                <Info label="Province" value={participant.province} />
              </div>

              {/* Accreditation */}
              {!participant.accredited && (
                <button
                  onClick={accreditParticipant}
                  className="mt-8 w-full rounded-xl bg-green-600 py-3 text-lg font-semibold text-white transition hover:bg-green-700"
                >
                  Accredit Participant
                </button>
              )}

              {participant.accredited && (
                <div className="mt-8 rounded-xl border border-green-200 bg-green-50 p-4 text-center text-green-700 font-semibold">
                  Participant has already been accredited.
                </div>
              )}
            </div>
          )}

          {notFound && (
            <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                <span className="text-red-600 text-xl">✕</span>
              </div>

              <h3 className="text-lg font-semibold text-red-700">
                No Match Found
              </h3>

              <p className="mt-1 text-sm text-red-600">
                No participant matches your search. Try name, email, username or
                phone number.
              </p>
            </div>
          )}
        </div>
      </section>
      <DataGrid
        rows={participants}
        pageSizeOptions={[10, 20, 50]}
        onPaginationModelChange={setPaginationModel}
        paginationMode="server"
        rowCount={total}
        columns={columns}
        //checkboxSelection
        className="!border-none !text-slate-700"
        sx={{
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#f8fafc",
            fontWeight: "bold",
          },
          "& .MuiDataGrid-cell": {
            borderColor: "#f1f5f9",
          },
        }}
      />
    </div>
  );
}

export default AccreditationPage;

interface InfoProps {
  label: string;
  value: string;
}

const Info = ({ label, value }: InfoProps) => {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
        {label}
      </p>

      <p className="mt-2 text-lg font-semibold text-slate-800 break-words">
        {value}
      </p>
    </div>
  );
};
