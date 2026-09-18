import { BrowserRouter, Route, Routes } from "react-router-dom";

//import RegistrationPage from "../pages/RegistrationPage";
// import RegistrationSuccessful from "../pages/RegistrationSuccessful";
// import RegistrationDashboard from "../pages/RegistrationDashboard";

// import ApprovalPage from "../pages/ApprovalPage";
// import AccreditationPage from "../pages/AccreditationPage";
// import AddParticipantPage from "../pages/AddNewParticipant";
import NotFoundpage from "../pages/NotFoundpage";
import ImpactRegistration from "../pages/ImpactRegistration";
import Home from "../pages/ImpactHomePage";
import ImpactEvents from "../pages/EventsSection";
import Navbar from "../components/NavigationBar";
import ViewMyCohort from "../pages/ViewMyCohort";

function MainRoutes() {
  const routes = [
    { path: "/", component: <Home /> },
    { path: "/events", component: <ImpactEvents /> },
    { path: "/register", component: <ImpactRegistration /> },
    { path: "/cohort", component: <ViewMyCohort /> },

    // { path: "/registrationinfo", component: <RegistrationSuccessful /> },
    // { path: "/dashboard", component: <RegistrationDashboard /> },
    // { path: "/approval", component: <ApprovalPage /> },
    // { path: "/accreditation", component: <AccreditationPage /> },
    // { path: "/register", component: <AddParticipantPage /> },
    { path: "*", component: <NotFoundpage /> },
  ];
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={route.component} />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default MainRoutes;
