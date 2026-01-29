import { BrowserRouter } from "react-router-dom";
import { AuthRoutes } from "./AuthRoutes";
import { UserRoutes } from "./UserRoutes";
import { AdminRoutes } from "./AdminRoutes";
import { useAuth } from "../hooks/auth";

export function Routes() {
  const { session } = useAuth();

  function AppRoutes() {
    switch (session?.user.role) {
      case "ADMIN":
      case "BARBER":
        return <AdminRoutes />;
      case "CLIENT":
        return <UserRoutes />;
      default:
        return <AuthRoutes />;
    }
  }

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
