import { Routes, Route } from "react-router-dom";
import { AppLayout } from "../components/AppLayout";
import { UserDashboard } from "../pages/UserDashboard";

export function UserRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route path="/" element={<UserDashboard />} />
      </Route>
    </Routes>
  );
}
