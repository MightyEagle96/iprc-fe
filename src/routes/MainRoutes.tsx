import { BrowserRouter, Route, Routes } from "react-router-dom";

import RegistrationPage from "../pages/RegistrationPage";
import RegistrationSuccessful from "../pages/RegistrationSuccessful";

function MainRoutes() {
  const routes = [
    { path: "/", component: <RegistrationPage /> },
    { path: "/registrationinfo", component: <RegistrationSuccessful /> },
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
