import { Input } from "../components/Input";
import { Select } from "../components/Select";
import { Button } from "../components/Button";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { z, ZodError } from "zod";
import { AxiosError } from "axios";
import { api } from "../services/api";

const appointmentSchema = z.object({
  date: z.string({ message: "Informe uma data e um horário!" }),
  category: z.string({ message: "Informe o tipo de serviço!" }),
  barberId: z.string().uuid({ message: "Informe um barbeiro!" }),
});

export function CreateAppointment() {
  const navigate = useNavigate();

  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [barberId, setBarberId] = useState("");
  const [time, setTime] = useState("");
  const [formErrors, setFormErrors] = useState<Record<string, string[]>>({});

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      const data = appointmentSchema.parse({
        date: `${date}T${time}`,
        category,
        barberId,
      });

      await api.post("/appointments", data);
      navigate("/");
    } catch (error) {
      if (error instanceof ZodError) {
        const { fieldErrors } = error.flatten();
        setFormErrors(fieldErrors);
        return;
      }

      if (error instanceof AxiosError) {
        setFormErrors({
          api: [error.response?.data.message || "Erro no servidor!"],
        });
        return;
      }

      setFormErrors({ api: ["Não foi possível realizar o agendamento!"] });
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <h2 className="text-xl text-slate-900 mb-6">Novo Agendamento</h2>
        <form className="flex flex-col gap-4" onSubmit={onSubmit}>
          <Select
            required
            legend="Serviço"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="CUT">Corte</option>
            <option value="CUT_BEARD">Corte + Barba</option>
            <option value="BEARD">Barba</option>
            <option value="CUT_BEARD_EYEBROW">
              Corte + Barba + Sobrancelha
            </option>
          </Select>

          {formErrors.category && (
            <span className="text-sm font-semibold text-red-500">
              {formErrors.category[0]}
            </span>
          )}

          <Select
            required
            legend="Barbeiro"
            value={barberId}
            onChange={(e) => setBarberId(e.target.value)}
          >
            <option value="3907e909-16bc-4630-b3da-efdbfe18b9f0">João</option>
            <option value="732206db-d92a-4cd1-a9df-98a68f7b1711">Marcos</option>
            <option value="e106dcae-bcb5-42c7-8d81-01664bc590d5">Carlos</option>
          </Select>

          {formErrors.barberId && (
            <span className="text-sm font-semibold text-red-500">
              {formErrors.barberId[0]}
            </span>
          )}

          <Input
            required
            type="date"
            legend="Data"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          {formErrors.date && (
            <span className="text-sm font-semibold text-red-500">
              {formErrors.date[0]}
            </span>
          )}

          <Select
            required
            legend="Horário"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          >
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

          {formErrors.date && (
            <span className="text-sm font-semibold text-red-500">
              {formErrors.date[0]}
            </span>
          )}

          <div className="flex gap-3 mt-2">
            <Button
              className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
              onClick={() => navigate("/")}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="flex-1 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg transition-colors"
            >
              Agendar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
