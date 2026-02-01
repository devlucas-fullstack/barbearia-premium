import { Calendar, Clock, CircleCheckBig, CircleX, Funnel } from "lucide-react";
import { AdminAppointmentItem } from "../components/AdminAppointmentItem";
import { useEffect, useState } from "react";
import { api } from "../services/api";
import { useAuth } from "../hooks/auth";
import type { AppointmentItemProps } from "../components/UserAppointmentItem";

export function AdminDashboard() {
  const { session } = useAuth();
  const [appointments, setAppointments] = useState<AppointmentItemProps[]>([]);

  async function fetchAppointments() {
    try {
      const response = await api.get("/appointments");
      setAppointments(response.data);
    } catch (error) {}
  }

  useEffect(() => {
    if (!session) return;

    fetchAppointments();
  }, [session]);

  return (
    <main className="max-w-6xl mx-auto py-8 px-4">
      <section className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg p-6 border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500 mb-1">Total</p>
              <p className="text-2xl text-slate-900">2</p>
            </div>
            <Calendar className="w-8 h-8 text-slate-400" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500 mb-1">Pedentes</p>
              <p className="text-2xl text-yellow-600">2</p>
            </div>
            <Clock className="w-8 h-8 text-yellow-400" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500 mb-1">Confirmados</p>
              <p className="text-2xl text-green-600">2</p>
            </div>
            <CircleCheckBig className="w-8 h-8 text-green-400" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500 mb-1">Cancelados</p>
              <p className="text-2xl text-red-600">2</p>
            </div>
            <CircleX className="w-8 h-8 text-red-400" />
          </div>
        </div>
      </section>
      <section className="bg-white rounded-lg p-4 border border-slate-200 mb-6">
        <div className="flex items-center gap-4">
          <Funnel className="w-5 h-5 text-slate-400" />
          <div className="flex items-center gap-4 flex-1">
            <div>
              <label className="text-sm text-slate-600 mr-2">Status:</label>
              <select className="px-3 py-1 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm">
                <option value="" selected>
                  Todos
                </option>
                <option value="PENDING">Pendente</option>
                <option value="CONFIRMED">Confirmado</option>
                <option value="CANCELED">Cancelado</option>
              </select>
            </div>
            <div>
              <label className="text-sm text-slate-600 mr-2">Status:</label>
              <input
                type="date"
                className="px-3 py-1 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="bg-white overflow-hidden rounded-lg border border-slate-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <th className="px-6 py-3 uppercase text-left text-xs text-slate-500 tracking-wider">
                Cliente
              </th>
              <th className="px-6 py-3 uppercase text-left text-xs text-slate-500 tracking-wider">
                Serviço
              </th>
              <th className="px-6 py-3 uppercase text-left text-xs text-slate-500 tracking-wider">
                Barbeiro
              </th>
              <th className="px-6 py-3 uppercase text-left text-xs text-slate-500 tracking-wider">
                Data
              </th>
              <th className="px-6 py-3 uppercase text-left text-xs text-slate-500 tracking-wider">
                Horário
              </th>
              <th className="px-6 py-3 uppercase text-left text-xs text-slate-500 tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 uppercase text-left text-xs text-slate-500 tracking-wider">
                Ações
              </th>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {appointments.map((appointment) => (
                <AdminAppointmentItem data={appointment} key={appointment.id} />
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
