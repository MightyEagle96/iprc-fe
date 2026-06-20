import { useMemo, useState } from "react";
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  TextField,
  Typography,
  useMediaQuery,
  MenuItem,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { genders, ranks, states, titles } from "./pageData";
import institutions from "./institutionData.json";
import { toastError } from "../components/ErrorToast";
import { httpService } from "../httpService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
} from "@mui/material";

const steps = [
  "Institution",
  "Names and Contact",
  //"Image Upload",
  "RRR Number",
];

const initialState = {
  ST_NAME: "",
  ST_ID: "",
  REGION: "",
  INName: "",
  INID: "",
  rank: "",
  title: "",
  gender: "",
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  rrr: "",
  file: null as File | null,
};

function AcademicRegistration() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [activeStep, setActiveStep] = useState(0);
  const [registrationData, setRegistrationData] = useState<any>(initialState);
  const [loading, setLoading] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  // const handleNext = () => setActiveStep((s) => s + 1);

  const handleNext = () => {
    const valid = validateCurrentStep();

    if (valid === true) {
      setActiveStep((s) => s + 1);
    }
  };

  const handlePreview = () => {
    if (!validateForm()) return;

    setPreviewOpen(true);
  };

  const handleBack = () => setActiveStep((s) => s - 1);

  const validateForm = () => {
    const requiredFields = [
      "ST_NAME",
      "ST_ID",
      "INName",
      "INID",
      "rank",
      "title",
      "gender",
      "firstName",
      "lastName",
      "phone",
      "email",
      "rrr",
    ];

    for (const field of requiredFields) {
      if (!registrationData[field]?.toString().trim()) {
        toast.error("All fields are required");
        return false;
      }
    }

    if (!isValidEmail(registrationData.email)) {
      toast.error("Please enter a valid email address");
      return false;
    }

    if (!isValidPhone(registrationData.phone)) {
      toast.error("Phone number must be exactly 11 digits");
      return false;
    }

    if (!isValidRRR(registrationData.rrr)) {
      toast.error("RRR must be exactly 12 digits");
      return false;
    }

    return true;
  };

  const navigate = useNavigate();
  // const handleReset = () => {
  //   setActiveStep(0);
  //   setRegistrationData(initialState);
  // };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setRegistrationData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ derived values (prevents repeated filtering inside JSX)
  const selectedState = useMemo(
    () => states.find((s) => s.ST_NAME === registrationData.ST_NAME),
    [registrationData.ST_NAME],
  );

  const filteredInstitutions = useMemo(() => {
    if (!selectedState?.ST_ID) return [];

    return institutions
      .filter((i) => i.InSt === selectedState.ST_ID)
      .sort((a, b) => a.INName.localeCompare(b.INName));
  }, [selectedState]);

  const handleStateChange = (value: string) => {
    const selected = states.find((s) => s.ST_NAME === value);

    setRegistrationData((prev: any) => ({
      ...prev,
      ST_NAME: value,
      ST_ID: selected?.ST_ID || "",
      REGION: selected?.REGION || "",
      INName: "",
      INID: "",
    }));
  };

  const handleInstitutionChange = (value: string) => {
    const selected = institutions.find((i) => i.INName === value);

    setRegistrationData((prev: any) => ({
      ...prev,
      INName: value,
      INID: selected?.INID || "",
    }));
  };

  const validateCurrentStep = () => {
    switch (activeStep) {
      case 0:
        if (!registrationData.ST_NAME)
          return toast.error("Please select a state");

        if (!registrationData.INName)
          return toast.error("Please select an institution");

        if (!registrationData.rank) return toast.error("Please select a rank");

        return true;

      case 1:
        if (!registrationData.title)
          return toast.error("Please select a title");

        if (!registrationData.gender)
          return toast.error("Please select a gender");

        if (!registrationData.firstName.trim())
          return toast.error("First name is required");

        if (!registrationData.lastName.trim())
          return toast.error("Last name is required");

        if (!registrationData.phone.trim())
          return toast.error("Phone number is required");

        if (!isValidPhone(registrationData.phone))
          return toast.error("Phone number must be exactly 11 digits");

        if (!registrationData.email.trim())
          return toast.error("Email address is required");

        if (!isValidEmail(registrationData.email))
          return toast.error("Please enter a valid email address");

        return true;

      case 2:
        if (!registrationData.rrr.trim())
          return toast.error("RRR number is required");

        if (!isValidRRR(registrationData.rrr))
          return toast.error("RRR must be exactly 12 digits");

        return true;

      default:
        return true;
    }
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Box className="flex flex-col gap-4">
            <TextField
              select
              fullWidth
              label="State"
              value={registrationData.ST_NAME}
              onChange={(e) => handleStateChange(e.target.value)}
            >
              {states.map((state) => (
                <MenuItem key={state.ST_ID} value={state.ST_NAME}>
                  {state.ST_NAME}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              select
              fullWidth
              label="Institution"
              value={registrationData.INName}
              onChange={(e) => handleInstitutionChange(e.target.value)}
              disabled={!selectedState?.ST_ID}
            >
              {filteredInstitutions.map((inst) => (
                <MenuItem key={inst.INID} value={inst.INName}>
                  {inst.INName}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              select
              fullWidth
              label="Rank"
              name="rank"
              value={registrationData.rank}
              onChange={handleChange}
            >
              {ranks.map((rank) => (
                <MenuItem key={rank} value={rank}>
                  {rank}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        );

      case 1:
        return (
          <Box className="flex flex-col gap-4">
            <TextField
              select
              fullWidth
              label="Title"
              name="title"
              value={registrationData.title}
              onChange={handleChange}
            >
              {titles.map((t) => (
                <MenuItem key={t} value={t}>
                  {t}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              select
              fullWidth
              label="Gender"
              name="gender"
              value={registrationData.gender}
              onChange={handleChange}
            >
              {genders.map((g) => (
                <MenuItem key={g} value={g}>
                  {g}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              fullWidth
              label="First Name"
              name="firstName"
              value={registrationData.firstName}
              onChange={handleChange}
            />

            <TextField
              fullWidth
              label="Last Name"
              name="lastName"
              value={registrationData.lastName}
              onChange={handleChange}
            />

            <TextField
              fullWidth
              label="Phone Number"
              name="phone"
              value={registrationData.phone}
              onChange={handleChange}
            />

            <TextField
              fullWidth
              label="Email Address"
              name="email"
              value={registrationData.email}
              onChange={handleChange}
            />
          </Box>
        );

        return (
          <Box className="flex flex-col gap-4">
            <Typography>Upload Passport Photograph</Typography>
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setRegistrationData((prev: any) => ({
                  ...prev,
                  file: e.target.files?.[0] || null,
                }))
              }
            />
          </Box>
        );

      case 2:
        return (
          <Box className="flex flex-col gap-4">
            <TextField
              fullWidth
              label="RRR Number"
              name="rrr"
              value={registrationData.rrr}
              onChange={handleChange}
            />

            <Typography variant="body2" color="text.secondary">
              Enter your Remita Retrieval Reference (RRR)
            </Typography>
          </Box>
        );

      default:
        return null;
    }
  };

  // const registerParticipant = async () => {
  //   //
  //   // toast.success("button clicked");
  //   setLoading(true);
  //   try {
  //     const { data } = await httpService.post(
  //       "/registerparticipant",
  //       registrationData,
  //     );

  //     if (data) {
  //       navigate("/registrationinfo");
  //       toast.success(data);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     toastError(error);
  //   }

  //   setLoading(false);
  // };

  const submitRegistration = async () => {
    setLoading(true);

    try {
      const { data } = await httpService.post(
        "/registerparticipant",
        registrationData,
      );

      if (data) {
        setPreviewOpen(false);
        navigate("/registrationinfo");
        toast.success(data);
      }
    } catch (error) {
      console.log(error);
      toastError(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <div
        className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-10 rounded"
        role="alert"
      >
        <p className="font-bold">Important Information</p>
        <p>Please have your RRR number ready before you proceed.</p>
      </div>

      <Stepper
        activeStep={activeStep}
        orientation={isMobile ? "vertical" : "horizontal"}
        alternativeLabel={!isMobile}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box className="mt-10">{renderStepContent(activeStep)}</Box>

      <Box className="flex justify-between mt-10">
        <Button disabled={activeStep === 0} onClick={handleBack}>
          Back
        </Button>

        {activeStep === steps.length - 1 ? (
          // <Button
          //   onClick={registerParticipant}
          //   variant="contained"
          //   loading={loading}
          //   //onClick={handleReset}
          // >
          //   Submit
          // </Button>
          <Button onClick={handlePreview} variant="contained">
            Review & Submit
          </Button>
        ) : (
          <Button variant="contained" onClick={handleNext}>
            Next
          </Button>
        )}
      </Box>

      <Dialog
        open={previewOpen}
        onClose={() => setPreviewOpen(false)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>Confirm Registration Details</DialogTitle>

        <DialogContent dividers>
          <Typography variant="h6" gutterBottom>
            Institution Information
          </Typography>

          <PreviewRow label="State" value={registrationData.ST_NAME} />

          <PreviewRow label="Institution" value={registrationData.INName} />

          <PreviewRow label="Rank" value={registrationData.rank} />

          <Divider sx={{ my: 2 }} />

          <Typography variant="h6" gutterBottom>
            Personal Information
          </Typography>

          <PreviewRow label="Title" value={registrationData.title} />

          <PreviewRow label="Gender" value={registrationData.gender} />

          <PreviewRow label="First Name" value={registrationData.firstName} />

          <PreviewRow label="Last Name" value={registrationData.lastName} />

          <PreviewRow label="Phone Number" value={registrationData.phone} />

          <PreviewRow label="Email Address" value={registrationData.email} />

          <Divider sx={{ my: 2 }} />

          <Typography variant="h6" gutterBottom>
            Payment Information
          </Typography>

          <PreviewRow label="RRR Number" value={registrationData.rrr} />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setPreviewOpen(false)}>
            Edit Information
          </Button>

          <Button
            variant="contained"
            onClick={submitRegistration}
            loading={loading}
          >
            Confirm & Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AcademicRegistration;

const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const isValidPhone = (phone: string) => /^\d{11}$/.test(phone);

const isValidRRR = (rrr: string) => /^\d{12}$/.test(rrr);

const PreviewRow = ({ label, value }: { label: string; value: string }) => (
  <Box className="flex justify-between py-2">
    <Typography sx={{ fontWeight: 600 }}>{label}</Typography>
    <Typography>{value || "-"}</Typography>
  </Box>
);
