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
  const [registrationData, setRegistrationData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const handleNext = () => setActiveStep((s) => s + 1);
  const handleBack = () => setActiveStep((s) => s - 1);

  const navigate = useNavigate();
  const handleReset = () => {
    setActiveStep(0);
    setRegistrationData(initialState);
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setRegistrationData((prev) => ({
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

    setRegistrationData((prev) => ({
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

    setRegistrationData((prev) => ({
      ...prev,
      INName: value,
      INID: selected?.INID || "",
    }));
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
                setRegistrationData((prev) => ({
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

  const registerParticipant = async () => {
    //
    // toast.success("button clicked");
    setLoading(true);
    try {
      const { data } = await httpService.post(
        "/registerparticipant",
        registrationData,
      );

      if (data) {
        navigate("/registrationinfo");
        toast.success(data);
      }
    } catch (error) {
      console.log(error);
      toastError(error);
    }

    setLoading(false);
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
          <Button
            onClick={registerParticipant}
            variant="contained"
            loading={loading}
            //onClick={handleReset}
          >
            Submit
          </Button>
        ) : (
          <Button variant="contained" onClick={handleNext}>
            Next
          </Button>
        )}
      </Box>
    </div>
  );
}

export default AcademicRegistration;
