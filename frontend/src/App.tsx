import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import HomePage from './components/HomePage';
import Register from './components/Register';
import Login from './components/Login';
import AdminLogin from './components/AdminLogin';
import Survey from './components/Survey';
import UserDashboard from './components/UserDashboard';
import Responses from './components/Responses';
import AdminDashboard from './components/AdminDashboard';
import AdminQuestionnaire from './components/AdminQuestionnaire';
import AdminResponses from './components/AdminResponses';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import SurveyBuilder from './components/SurveyBuilder';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/survey" element={<ProtectedUserRoute><Survey /></ProtectedUserRoute>} />
            <Route path="/dashboard" element={<ProtectedUserRoute><UserDashboard /></ProtectedUserRoute>} />
            <Route path="/responses/:token" element={<Responses />} />
            <Route path="/admin" element={<ProtectedAdminRoute><AdminDashboard /></ProtectedAdminRoute>} />
            <Route path="/admin/questionnaire" element={<ProtectedAdminRoute><AdminQuestionnaire /></ProtectedAdminRoute>} />
            <Route path="/admin/responses" element={<ProtectedAdminRoute><AdminResponses /></ProtectedAdminRoute>} />
            <Route path="/admin/surveys/new/*" element={<ProtectedAdminRoute><SurveyBuilder /></ProtectedAdminRoute>} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

function ProtectedUserRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
}

function ProtectedAdminRoute({ children }: { children: React.ReactNode }) {
  const { user, isAdmin } = useAuth();
  
  if (!user || !isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }
  
  return <>{children}</>;
}

export default App;
