import logo from "../assets/logo.svg";
import logout from "../assets/logout.svg";
import { useAuth } from "../hooks/auth";

export function Header() {
  const { remove, session } = useAuth();

  return (
    <header className="bg-white border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Logo" className="w-10 h-10" />
          <div>
            <p className="text-lg text-slate-900">Barbearia Premium</p>
            <p className="text-sm text-slate-500">Olá, {session?.user.name}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer">
          <img
            src={logout}
            alt="Ícone de sair"
            className="w-4 h-4"
            onClick={remove}
          />
          <span>Sair</span>
        </div>
      </div>
    </header>
  );
}
