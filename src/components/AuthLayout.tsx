import { Outlet } from "react-router-dom";
import logo from "../assets/logo.svg";

export function AuthLayout() {
  return (
    <div className="h-screen w-screen bg-linear-to-br from-slate-900 via-slate-900 to-slate-900 flex justify-center items-center p-4">
      <main className="w-full max-w-md">
        <div className="text-center mb-8">
          <img src={logo} alt="Logo" className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-3xl text-white mb-2 text-center">
            Barbearia Premium
          </h1>
          <p className="text-slate-400 text-center">Sistema de Agendamento</p>
        </div>
        <Outlet />
      </main>
    </div>
  );
}
