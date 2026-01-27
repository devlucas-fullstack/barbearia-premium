import { Plus } from "lucide-react";
import { UserAppointmentItem } from "../components/UserAppointmentItem";
import { Link } from "react-router-dom";

const appointment = {
  id: "11",
  category: "Corte + Barba",
  barber: "Carlos",
  date: "27/01/2026|18:00",
  status: "Confirmado",
};

export function UserDashboard() {
  return (
    <main className="max-w-6xl mx-auto py-8 px-4">
      <section className="mb-8">
        <h2 className="text-xl text-slate-900 mb-4">Nossos Serviços</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg p-4 border border-slate-200">
            <h3 className="text-slate-900 mb-2">Corte Simples</h3>
            <p className="text-amber-600 mb-1">R$ 40</p>
            <p className="text-sm text-slate-500">30 min</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-slate-200">
            <h3 className="text-slate-900 mb-2">Corte + Barba</h3>
            <p className="text-amber-600 mb-1">R$ 60</p>
            <p className="text-sm text-slate-500">45 min</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-slate-200">
            <h3 className="text-slate-900 mb-2">Barba</h3>
            <p className="text-amber-600 mb-1">R$ 30</p>
            <p className="text-sm text-slate-500">20 min</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-slate-200">
            <h3 className="text-slate-900 mb-2">Corte + Barba + Sobrancelha</h3>
            <p className="text-amber-600 mb-1">R$ 80</p>
            <p className="text-sm text-slate-500">60 min</p>
          </div>
        </div>
      </section>
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl text-slate-900">Meus Agendamentos</h2>
          <Link
            to="/create"
            className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg transition-colors cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            Novo Agendamento
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <UserAppointmentItem data={appointment} />
          <UserAppointmentItem data={appointment} />
        </div>
      </section>
    </main>
  );
}
