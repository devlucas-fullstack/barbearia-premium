import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { Link } from "react-router-dom";

export function SignUp() {
  return (
    <form className="bg-white rounded-lg p-8 shadow-lg flex flex-col gap-6">
      <Input required legend="Nome" type="text" />
      <Input required legend="Email" type="email" />
      <Input required legend="Senha" type="password" />
      <Input required legend="Confirme a senha" type="password" />
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
