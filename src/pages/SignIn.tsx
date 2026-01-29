import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { Link } from "react-router-dom";
import { z, ZodError } from "zod";
import { AxiosError } from "axios";
import { useState } from "react";
import { api } from "../services/api";
import { useAuth } from "../hooks/auth";

const signInSchema = z.object({
  email: z.string().email({ message: "Email inválido!" }),
  password: z
    .string()
    .trim()
    .min(6, { message: "Senha deve ter no mínimo 6 dígitos!" }),
});

export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState<Record<string, string[]>>({});

  const { save } = useAuth();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      const data = signInSchema.parse({
        email,
        password,
      });

      const response = await api.post("/sessions", data);
      save(response.data);
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
      }

      setFormErrors({ api: ["Não foi possível entrar!"] });
    }
  }

  return (
    <form
      className="bg-white rounded-lg p-8 shadow-lg flex flex-col gap-6"
      onSubmit={onSubmit}
    >
      <Input
        legend="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      {formErrors.email && (
        <span className="text-sm font-semibold text-red-500">
          {formErrors.email[0]}
        </span>
      )}

      <Input
        legend="Senha"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {formErrors.password && (
        <span className="text-sm font-semibold text-red-500">
          {formErrors.password[0]}
        </span>
      )}

      {formErrors.api && (
        <span className="text-sm font-semibold text-red-500">
          {formErrors.api[0]}
        </span>
      )}

      <Button type="submit">Entrar</Button>

      <Link
        to="/signup"
        className="text-slate-400 hover:text-slate-500 text-sm text-center"
      >
        Criar conta
      </Link>
    </form>
  );
}
