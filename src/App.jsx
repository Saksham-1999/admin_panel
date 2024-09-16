import React from 'react'
// import Component1 from './component1/Component1'
// import Component2 from './component2/Component2'
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import AppRoutes from './routes/AppRoutes';
import PluginPopup from './popup/plugin_activity_popup/PluginPopupController';
import { useLocation } from 'react-router-dom';



function App() {

  const ConditionalPluginPopup = () => {
    const location = useLocation();
    // Do not show PluginPopup on the login page
    if (location.pathname === '/login') {
      return null;
    }
    return <PluginPopup/>;
  };
  
  return (
    <AuthProvider>
      <BrowserRouter>
        <ConditionalPluginPopup/>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
   
    
  )
}

export default App

