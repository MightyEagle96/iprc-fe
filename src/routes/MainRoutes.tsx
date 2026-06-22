import { BrowserRouter, Route, Routes } from "react-router-dom";

import RegistrationPage from "../pages/RegistrationPage";
import RegistrationSuccessful from "../pages/RegistrationSuccessful";
import RegistrationDashboard from "../pages/RegistrationDashboard";
import NotFoundpage from "../pages/NotFoundpage";

function MainRoutes() {
  const routes = [
    { path: "/", component: <RegistrationPage /> },
    { path: "/registrationinfo", component: <RegistrationSuccessful /> },
    { path: "/dashboard", component: <RegistrationDashboard /> },
    { path: "*", component: <NotFoundpage /> },
  ];
  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={route.component} />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default MainRoutes;
