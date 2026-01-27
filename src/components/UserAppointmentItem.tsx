import { Calendar, Clock } from "lucide-react";

type AppointmentItemProps = {
  id: string;
  barber: string;
  status: string;
  category: string;
  date: string;
};

type Props = React.ComponentProps<"div"> & {
  data: AppointmentItemProps;
};

export function UserAppointmentItem({ data, ...rest }: Props) {
  return (
    <div className="bg-white rounded-lg p-6 border border-slate-200" {...rest}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-slate-900 mb-1">{data.category}</h3>
          <p className="text-sm text-slate-500">Barbeiro: {data.barber}</p>
        </div>
        <span className="px-3 py-1 rounded-full text-xs bg-green-100 text-green-800">
          {data.status}
        </span>
      </div>
      <div className="flex items-center gap-4 text-sm text-slate-600 mb-4">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          {data.date}
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4" />
          {data.date}
        </div>
      </div>
      <button className="w-full px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg trasition-color text-sm cursor-pointer">
        Cancelar Agendamento
      </button>
    </div>
  );
}
