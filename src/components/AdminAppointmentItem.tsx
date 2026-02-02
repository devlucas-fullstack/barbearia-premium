import { CircleX, CircleCheckBig } from "lucide-react";
import type { AppointmentItemProps } from "./UserAppointmentItem";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

type Props = React.ComponentProps<"tr"> & {
  data: AppointmentItemProps;
  onCancel: (id: string) => void;
};

export function AdminAppointmentItem({ data, onCancel, ...rest }: Props) {
  const date = new Date(data.data);
  const dataFormat = format(date, "dd/MM/yyyy", { locale: ptBR });
  const horaFormat = format(date, "HH:mm", { locale: ptBR });

  return (
    <tr className="hover:bg-slate-50" {...rest}>
      <td className="px-6 py-4 text-sm text-slate-900">{data.cliente.nome}</td>
      <td className="px-6 py-4 text-sm text-slate-900">Corte Simples</td>
      <td className="px-6 py-4 text-sm text-slate-900">{data.barbeiro.nome}</td>
      <td className="px-6 py-4 text-sm text-slate-900">{dataFormat}</td>
      <td className="px-6 py-4 text-sm text-slate-900">{horaFormat}</td>
      <td className="px-6 py-4">
        <span
          className={`px-2 py-1 rounded-full text-xs ${data.status === "Confirmado" ? "bg-green-100 text-green-800" : ""} ${data.status === "Pendente" ? "bg-yellow-100 text-yellow-800" : ""} ${data.status === "Cancelado" ? "bg-red-100 text-red-800" : ""}`}
        >
          {data.status}
        </span>
      </td>
      <td className="px-6 py-4">
        {data.status === "Cancelado" ? (
          <span className="text-xs text-slate-400">Sem ações</span>
        ) : (
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
              onClick={() => onCancel(data.id)}
            >
              <CircleX className="w-5 h-5 cursor-pointer" />
            </button>
          </div>
        )}
      </td>
    </tr>
  );
}
