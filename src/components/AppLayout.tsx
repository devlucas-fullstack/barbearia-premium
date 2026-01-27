import { Outlet } from "react-router-dom";
import { Header } from "./Header";

export function AppLayout() {
  return (
    <div className="h-screen w-screen bg-slate-50">
      <Header />
      <Outlet />
    </div>
  );
}
