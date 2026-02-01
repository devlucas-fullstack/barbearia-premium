import { Calendar, Clock } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export type AppointmentItemProps = {
  id: string;
  barbeiro: { nome: string };
  cliente: { nome: string };
  status: string;
  servico: string;
  data: string;
  criado_em: string;
};

type Props = React.ComponentProps<"div"> & {
  data: AppointmentItemProps;
  onCancel: (id: string) => void;
};

export function UserAppointmentItem({ data, onCancel, ...rest }: Props) {
  const date = new Date(data.data);

  const dataFormat = format(date, "dd/MM/yyyy", { locale: ptBR });
  const horaFormat = format(date, "HH:mm", { locale: ptBR });

  return (
    <div className="bg-white rounded-lg p-6 border border-slate-200" {...rest}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-slate-900 mb-1">{data.servico}</h3>
          <p className="text-sm text-slate-500">
            Barbeiro: {data.barbeiro.nome}
          </p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs  ${data.status === "Confirmado" ? "bg-green-100 text-green-800" : ""} ${data.status === "Pendente" ? "bg-yellow-100 text-yellow-800" : ""} ${data.status === "Cancelado" ? "bg-red-100 text-red-800" : ""}`}
        >
          {data.status}
        </span>
      </div>
      <div className="flex items-center gap-4 text-sm text-slate-600 mb-4">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          {dataFormat}
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4" />
          {horaFormat}
        </div>
      </div>
      <button
        className="w-full px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg trasition-colors text-sm cursor-pointer"
        onClick={() => onCancel(data.id)}
      >
        Cancelar Agendamento
      </button>
    </div>
  );
}
