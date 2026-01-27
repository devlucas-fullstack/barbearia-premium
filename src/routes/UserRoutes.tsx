import { Routes, Route } from "react-router-dom";
import { UserDashboard } from "../pages/UserDashboard";

export function UserRoutes() {
  return (
    <Routes>
      <Route path="/" element={<UserDashboard />} />
    </Routes>
  );
}
