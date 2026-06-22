import {
  Users,
  Clock,
  CheckCircle2,
  XCircle,
  RefreshCcw,
  User,
} from "lucide-react";
import { socket } from "../socket";
import { httpService } from "../httpService";
import { useEffect, useState } from "react";

import { DataGrid } from "@mui/x-data-grid";
import { StatusBadge } from "./RegistrationDashboard";
import { Button, Stack, Typography } from "@mui/material";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

type status = "pending" | "approved" | "rejected";

type IDashboard = {
  total: number;
  male: number;
  female: number;
  institutions: number;
  pending: number;
  approved: number;
  rejected: number;
};

export interface IParticipant {
  firstName: string;
  lastName: string;
  middleName: string;
  email: string;
  phone: string;
  rrr: string;
  tagId: string;
  rank: string;
  title: string;
  gender: string;
  dateOfBirth: string;
  ST_NAME: string;
  ST_ID: number;
  REGION: string;
  INName: string;
  INID: number;
  name: string;
  status: status;
  createdAt: Date;
  updatedAt: Date;
}

function ApprovalPage() {
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
  const [participants, setParticipants] = useState([]);
  const [total, setTotal] = useState(0);
  const [participant, setParticipant] = useState<IParticipant | null>(null);

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 50,
  });

  const isOffline = !connected;

  const stats = [
    {
      title: "Total Registered",
      value: dashboardData?.total || 0,
      icon: Users,
      bg: "bg-blue-50",
      text: "text-blue-600",
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
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    try {
      const response = await httpService.get("dashboard");
      setDashboardData(response.data);
    } catch (error) {
      // toastError
    }
  };

  const getParticipants = async () => {
    setLoading(true);
    try {
      const response = await httpService.get("participants", {
        params: {
          page: paginationModel.page + 1,
          limit: paginationModel.pageSize,
        },
      });

      console.log(response.data);
      setParticipants(response.data.participants);
      setTotal(response.data.total);
    } catch (error) {
      // toastError
    }
    setLoading(false);
  };
  useEffect(() => {
    const onConnect = async () => {
      console.log("connected", socket.id);
      setConnected(true);
      await getData();
      await getParticipants();
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
      field: "firstName",
      headerName: "First Name",
      flex: 1,
      renderCell: (param: any) => (
        <span className="capitalize">{param.row?.firstName}</span>
      ),
    },
    {
      field: "lastName",
      headerName: "Last Name",
      flex: 1,
      renderCell: (param: any) => (
        <span className="capitalize">{param.row?.lastName}</span>
      ),
    },
    {
      field: "rrr",
      headerName: "RRR",
      flex: 1,
      renderCell: (param: any) => (
        <span className="capitalize">{param.row?.rrr}</span>
      ),
    },

    {
      field: "status",
      headerName: "Status",
      width: 180,
      renderCell: (params: any) => <StatusBadge status={params.row?.status} />,
    },
    {
      field: "action",
      headerName: "Action",
      width: 180,
      renderCell: (params: any) => (
        <Button
          sx={{ textTransform: "capitalize" }}
          onClick={() => setParticipant(params.row)}
        >
          Action
        </Button>
      ),
    },
  ];

  return (
    <div>
      <div className="min-h-screen p-4 md:p-6 lg:p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">
            Finance Dashboard
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
        <section className="w-full mt-30">
          <div className="text-end">
            <Button onClick={getParticipants} endIcon={<RefreshCcw />}>
              Refresh
            </Button>
          </div>
          <DataGrid
            loading={loading}
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
        </section>
      </div>

      <Dialog
        open={participant !== null}
        onClose={() => setParticipant(null)}
        fullWidth
        maxWidth="sm"
      >
        {/* HEADER */}
        <DialogTitle className="border-b border-slate-100">
          <Stack direction="row" sx={{ alignItems: "center" }} spacing={2}>
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-slate-100 to-slate-200 text-slate-600">
              <User size={20} />
            </div>

            <div>
              <Typography
                variant="h6"
                className="font-semibold text-slate-800 capitalize"
              >
                {participant?.firstName} {participant?.lastName}
              </Typography>

              <Typography variant="caption" className="text-slate-500">
                Participant Verification Panel
              </Typography>
            </div>
          </Stack>
        </DialogTitle>

        {/* BODY */}
        <DialogContent className="mt-4 space-y-6">
          {/* RRR CARD */}
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <Typography variant="overline" className="text-slate-500">
              Payment Reference (RRR)
            </Typography>

            <Typography
              variant="h5"
              className="mt-1 font-bold tracking-wider text-slate-800"
            >
              {participant?.rrr}
            </Typography>
          </div>

          {/* STATUS INFO (optional but powerful UX) */}
          <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-3">
            <Typography className="text-sm text-slate-500">
              Current Status
            </Typography>

            <span className="rounded-full bg-yellow-50 px-3 py-1 text-xs font-semibold text-yellow-600">
              Pending
            </span>
          </div>

          {/* ACTIONS */}
          <div className="flex gap-3 pt-2">
            <Button
              variant="contained"
              color="success"
              fullWidth
              className="!rounded-xl !py-2 !font-semibold"
            >
              Approve
            </Button>

            <Button
              variant="contained"
              color="error"
              fullWidth
              className="!rounded-xl !py-2 !font-semibold"
            >
              Reject
            </Button>
          </div>
        </DialogContent>

        {/* FOOTER */}
        <DialogActions className="border-t border-slate-100 px-6 py-3">
          <Button
            onClick={() => setParticipant(null)}
            className="text-slate-600"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ApprovalPage;
