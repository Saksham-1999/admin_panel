import React from "react";
// import Component1 from './component1/Component1'
// import Component2 from './component2/Component2'
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import AppRoutes from "./routes/AppRoutes";
import PluginPopup from "./popup/plugin_activity_popup/PluginPopupController";
import { useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const ConditionalPluginPopup = () => {
    const location = useLocation();
    // Do not show PluginPopup on the login page
    if (location.pathname === "/login") {
      return null;
    }
    return <PluginPopup />;
  };

  return (
    <AuthProvider>
      <BrowserRouter>
        <ConditionalPluginPopup />
        <AppRoutes />
        <ToastContainer
          position="bottom-left"
          autoClose={2000}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition:Bounce
        />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
