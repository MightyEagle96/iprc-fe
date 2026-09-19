import { BrowserRouter, Route, Routes } from "react-router-dom";

import NotFoundpage from "../pages/NotFoundpage";
import ImpactRegistration from "../pages/ImpactRegistration";
import Home from "../pages/ImpactHomePage";
import ImpactEvents from "../pages/EventsSection";
import Navbar from "../components/NavigationBar";
import ViewMyCohort from "../pages/ViewMyCohort";
import ImpactDashboard from "../pages/ImpactDashboard";
import DayOneGallery from "../pages/DayOneGallery";

function MainRoutes() {
  const routes = [
    { path: "/", component: <Home /> },
    { path: "/events", component: <ImpactEvents /> },
    { path: "/register", component: <ImpactRegistration /> },
    { path: "/cohort", component: <ViewMyCohort /> },
    { path: "/dashboard", component: <ImpactDashboard /> },
    { path: "/gallery", component: <DayOneGallery /> },

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
