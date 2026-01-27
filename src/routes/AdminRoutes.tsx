import { Routes, Route } from "react-router-dom";
import { AppLayout } from "../components/AppLayout";
import { AdminDashboard } from "../pages/AdminDashboard";

export function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route path="/" element={<AdminDashboard />} />
      </Route>
    </Routes>
  );
}
