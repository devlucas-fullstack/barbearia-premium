import { CircleX, CircleCheckBig } from "lucide-react";

type AppointmentItemProps = {
  id: string;
  client: string;
  category: string;
  barber: string;
  date: string;
  status: string;
};

type Props = React.ComponentProps<"section"> & {
  data: AppointmentItemProps;
};

export function AdminAppointmentItem({ data, ...rest }: Props) {
  return (
    <section
      className="bg-white overflow-hidden rounded-lg border border-slate-200"
      {...rest}
    >
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
            <tr className="hover:bg-slate-50">
              <td className="px-6 py-4 text-sm text-slate-900">
                {data.client}
              </td>
              <td className="px-6 py-4 text-sm text-slate-900">
                {data.category}
              </td>
              <td className="px-6 py-4 text-sm text-slate-900">
                {data.barber}
              </td>
              <td className="px-6 py-4 text-sm text-slate-900">{data.date}</td>
              <td className="px-6 py-4 text-sm text-slate-900">{data.date}</td>
              <td className="px-6 py-4">
                <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                  {data.status}
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <button className="px-3 py-1 text-xs bg-red-50 hover:bg-red-100 text-red-600 rounded transition-colors cursor-pointer">
                    Cancelar
                  </button>
                </div>
              </td>
            </tr>
            <tr className="hover:bg-slate-50">
              <td className="px-6 py-4 text-sm text-slate-900">
                {data.client}
              </td>
              <td className="px-6 py-4 text-sm text-slate-900">
                Corte Simples
              </td>
              <td className="px-6 py-4 text-sm text-slate-900">
                {data.barber}
              </td>
              <td className="px-6 py-4 text-sm text-slate-900">{data.date}</td>
              <td className="px-6 py-4 text-sm text-slate-900">{data.date}</td>
              <td className="px-6 py-4">
                <span className="px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">
                  {data.status}
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <button
                    className="p-1 text-green-600 hover:bg-green-50 rounded transition-colors"
                    title="Confirmar"
                  >
                    <CircleCheckBig className="w-5 h-5 cursor-pointer" />
                  </button>
                  <button
                    className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                    title="Cancelar"
                  >
                    <CircleX className="w-5 h-5 cursor-pointer" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
