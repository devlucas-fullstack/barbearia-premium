import { Input } from "../components/Input";
import { Select } from "../components/Select";
import { Button } from "../components/Button";
import { useNavigate } from "react-router-dom";

export function CreateAppointment() {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <h2 className="text-xl text-slate-900 mb-6">Novo Agendamento</h2>
        <form className="flex flex-col gap-4">
          <Select legend="Serviço">
            <option value="CUT">Corte</option>
            <option value="CUT_BEARD">Corte + Barba</option>
            <option value="BEARD">Barba</option>
            <option value="CUT_BEARD_EYEBROW">
              Corte + Barba + Sobrancelha
            </option>
          </Select>
          <Select legend="Barbeiro">
            <option value="">Barber</option>
            <option value="">Barber</option>
            <option value="">Barber</option>
          </Select>
          <Input type="date" legend="Data" />
          <Select legend="Horário">
            <option value="09:00">09:00</option>
            <option value="10:00">10:00</option>
            <option value="11:00">11:00</option>
            <option value="12:00">12:00</option>
            <option value="13:00">13:00</option>
            <option value="14:00">14:00</option>
            <option value="15:00">15:00</option>
            <option value="16:00">16:00</option>
            <option value="17:00">17:00</option>
            <option value="18:00">18:00</option>
            <option value="19:00">19:00</option>
          </Select>

          <div className="flex gap-3 mt-2">
            <Button
              className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
              onClick={() => navigate("/")}
            >
              Cancelar
            </Button>
            <Button
              className="flex-1 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg transition-colors"
              onClick={() => navigate("/")}
            >
              Agendar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
