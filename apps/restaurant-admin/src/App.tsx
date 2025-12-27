import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Order from "./pages/order";
import Menu from "./pages/menu";
import Payment from "./pages/payment";  
// import AdminLayout from "./components/layout/AdminLayout";

export default function App() {
  return (
    
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/orders" element={<Order />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/payments" element={<Payment />} />
      </Routes>
    
  );
}
