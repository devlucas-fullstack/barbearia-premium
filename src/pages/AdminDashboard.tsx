import { Calendar, Clock, CircleCheckBig, CircleX, Funnel } from "lucide-react";
import { AdminAppointmentItem } from "../components/AdminAppointmentItem";
import { useEffect, useState } from "react";
import { api } from "../services/api";
import { useAuth } from "../hooks/auth";
import type { AppointmentItemProps } from "../components/UserAppointmentItem";
import { AxiosError } from "axios";

export function AdminDashboard() {
  const { session } = useAuth();
  const [appointments, setAppointments] = useState<AppointmentItemProps[]>([]);
  const [count, setCount] = useState({
    total: 0,
    confirmed: 0,
    pending: 0,
    canceled: 0,
  });
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("");

  async function fetchAppointments() {
    try {
      const params = new URLSearchParams();

      if (date) params.append("date", date);
      if (status) params.append("status", status);

      const response = await api.get(`/appointments?${params.toString()}`);
      setAppointments(response.data);
    } catch (error) {
      if (error instanceof AxiosError) {
        setErrors({
          api: [error.response?.data.message || "Erro no servidor!"],
        });
        return;
      }
    }
  }

  async function handleCancelAppointment(id: string) {
    try {
      await api.patch(`/appointments/${id}/canceled`);
      await fetchAppointments();
      await countDashboard();
    } catch (error) {
      console.error(error);
      alert("Erro ao cancelar agendamento!");
    }
  }

  async function handleConfirmAppointment(id: string) {
    try {
      await api.patch(`/appointments/${id}/confirm`);
      await fetchAppointments();
      await countDashboard();
    } catch (error) {
      console.error(error);
      alert("Erro ao confirmar agendamento!");
    }
  }

  async function countDashboard() {
    try {
      const response = await api.get(`/appointments/dashboard`);
      setCount(response.data);
    } catch (error) {
      console.error(error);
      alert("Erro ao carregar dashboard!");
    }
  }

  useEffect(() => {
    if (!session) return;

    fetchAppointments();
    countDashboard();
  }, [session, date, status]);

  return (
    <main className="max-w-6xl mx-auto py-8 px-4">
      <section className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg p-6 border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500 mb-1">Total</p>
              <p className="text-2xl text-slate-900">{count.total}</p>
            </div>
            <Calendar className="w-8 h-8 text-slate-400" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500 mb-1">Pedentes</p>
              <p className="text-2xl text-yellow-600">{count.pending}</p>
            </div>
            <Clock className="w-8 h-8 text-yellow-400" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500 mb-1">Confirmados</p>
              <p className="text-2xl text-green-600">{count.confirmed}</p>
            </div>
            <CircleCheckBig className="w-8 h-8 text-green-400" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500 mb-1">Cancelados</p>
              <p className="text-2xl text-red-600">{count.canceled}</p>
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
              <select
                className="px-3 py-1 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="">Todos</option>
                <option value="PENDING">Pendente</option>
                <option value="CONFIRMED">Confirmado</option>
                <option value="CANCELED">Cancelado</option>
              </select>
            </div>
            <div>
              <label className="text-sm text-slate-600 mr-2">Data:</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="px-3 py-1 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
              />
            </div>
          </div>
        </div>
      </section>

      {errors.api && (
        <div className="text-sm text-red-500 font-semibold">
          {errors.api[0]}
        </div>
      )}

      <section className="bg-white overflow-hidden rounded-lg border border-slate-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
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
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {appointments.map((appointment) => (
                <AdminAppointmentItem
                  data={appointment}
                  key={appointment.id}
                  onCancel={handleCancelAppointment}
                  onConfirm={handleConfirmAppointment}
                />
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
