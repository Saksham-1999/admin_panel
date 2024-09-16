import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';
import Login from '../login/Login';
import Dashboard from '../pages/dashboard/Dashboard';
import Plugin from '../pages/plugin/Plugin'; 
import PhishingMails from '../pages/phishingmails/PhishingMails'; 
import SandBox from '../pages/sandbox/Sandbox'; 
import Quarantine from '../pages/quarantine/Quarantine'; 
import Sirts from '../pages/sirts/SIRTs'; 
import RogueDB from '../pages/rogue-db/RogueDb'; 
import CDR from '../pages/cdr/CDR'; 
import Contact from '../pages/contacts/Contacts'; 
import Reports from '../pages/reports/Reports'; 
import Profile from '../pages/profile/Profile'; 
import Settings from '../pages/settings/Settings';
import EditProfile from '../pages/profile/EditProfile';

const AppRoutes = () => {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/plugin"
          element={
            <ProtectedRoute>
              <Plugin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/phishing-mails"
          element={
            <ProtectedRoute>
              <PhishingMails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/sandbox"
          element={
            <ProtectedRoute>
              <SandBox />
            </ProtectedRoute>
          }
        />
        <Route
          path="/quarantine"
          element={
            <ProtectedRoute>
              <Quarantine />
            </ProtectedRoute>
          }
        />
        <Route
          path="/sirts"
          element={
            <ProtectedRoute>
              <Sirts />
            </ProtectedRoute>
          }
        />
        <Route
          path="/rogue-db"
          element={
            <ProtectedRoute>
              <RogueDB />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cdr"
          element={
            <ProtectedRoute>
              <CDR />
            </ProtectedRoute>
          }
        />
        <Route
          path="/contact"
          element={
            <ProtectedRoute>
              <Contact />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <Reports />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-profile"
          element={
            <ProtectedRoute>
              <EditProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />
      </Routes>
    );
};

export default AppRoutes;
