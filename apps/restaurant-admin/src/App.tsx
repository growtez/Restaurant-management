import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Dashboard from "./pages/dashboard";
import Order from "./pages/order";
import Menu from "./pages/menu";
import Payment from "./pages/payment";
import LoginPage from "./pages/Login";

console.log('🚀 App.tsx loaded');

// Protected Route Component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading } = useAuth();

  console.log('🔒 ProtectedRoute - loading:', loading, 'authenticated:', isAuthenticated);

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: '#1a1a2e',
        color: '#fff'
      }}>
        Loading...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

function AppRoutes() {
  console.log('🛤️ AppRoutes rendering');
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/dashboard" element={
        <ProtectedRoute><Dashboard /></ProtectedRoute>
      } />
      <Route path="/orders" element={
        <ProtectedRoute><Order /></ProtectedRoute>
      } />
      <Route path="/menu" element={
        <ProtectedRoute><Menu /></ProtectedRoute>
      } />
      <Route path="/payments" element={
        <ProtectedRoute><Payment /></ProtectedRoute>
      } />
    </Routes>
  );
}

export default function App() {
  console.log('🔥 App component rendering');
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

