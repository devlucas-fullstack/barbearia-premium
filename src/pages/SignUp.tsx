import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { Link } from "react-router-dom";
import { api } from "../services/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z, ZodError } from "zod";
import { AxiosError } from "axios";

const signUpSchema = z
  .object({
    name: z.string().min(3, { message: "Informe um nome válido!" }),
    email: z.string().email({ message: "Informe um email válido!" }),
    password: z
      .string()
      .min(6, { message: "Informe uma senha com no mínimo 6 dígitos!" }),
    confirmPassword: z.string({ message: "Confirme a senha!" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas são diferentes!",
    path: ["confirmPassword"],
  });

export function SignUp() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formErrors, setFormErrors] = useState<Record<string, string[]>>({});

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      const data = signUpSchema.parse({
        name,
        email,
        password,
        confirmPassword,
      });

      await api.post("/users", data);

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

      setFormErrors({ api: ["Não foi possível cadastrar!"] });
    }
  }

  return (
    <form
      className="bg-white rounded-lg p-8 shadow-lg flex flex-col gap-6"
      onSubmit={onSubmit}
    >
      <Input
        required
        legend="Nome"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      {formErrors.name && (
        <span className="text-sm font-semibold text-red-500">
          {formErrors.name[0]}
        </span>
      )}

      <Input
        required
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
        required
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

      <Input
        required
        legend="Confirme a senha"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      {formErrors.confirmPassword && (
        <span className="text-sm font-semibold text-red-500">
          {formErrors.confirmPassword[0]}
        </span>
      )}

      <Button type="submit">Cadastrar</Button>

      <Link
        to="/"
        className="text-slate-400 hover:text-slate-500 text-sm text-center"
      >
        Já tenho uma conta
      </Link>
    </form>
  );
}
