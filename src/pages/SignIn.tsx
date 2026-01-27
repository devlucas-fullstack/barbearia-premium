import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { Link } from "react-router-dom";

export function SignIn() {
  return (
    <form className="bg-white rounded-lg p-8 shadow-lg flex flex-col gap-6">
      <Input legend="Email" type="email" />
      <Input legend="Senha" type="password" />
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
