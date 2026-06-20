//import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";
import { ToastContainer } from "react-toastify";
import MainRoutes from "./routes/MainRoutes";

function App() {
  return (
    <div>
      <MainRoutes />
      {/* <RegistrationPage /> */}
      <ToastContainer />
    </div>
  );
}

export default App;
