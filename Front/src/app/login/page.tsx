"use client"
import Link from "next/link";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context";
import { useRouter } from "next/navigation";

export default function Login() {
  const { login, error, user } = useContext(AuthContext); 
    const router = useRouter();
    const [logar, setLogar] = useState({ email: '', senha: '' });
    const [erro, setErro] = useState<string>();

    useEffect(() => {
        if (user) { // Redireciona apenas se o usuário estiver logado com sucesso
            router.push('/');
        }
    }, [user, router]);

    useEffect(() => {
        setErro("");
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLogar({ ...logar, [name]: value });
        setErro(""); // Limpa o erro ao digitar nos campos
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { email, senha } = logar;

        if (!email || !senha) {
            setErro('Todos os campos devem ser preenchidos.');
            return;
        }

        try {
            setErro(""); // Limpa o erro antes de tentar logar
            await login(logar); // Faz o login
            if (error) {
                setErro(error); // Atualiza o erro quando o contexto for atualizado
            }
        } catch (err) {
            console.error(err);
            setErro('Erro ao tentar fazer login.');
        }
    };

  return (
    <div className="flex flex-col h-screen">
      <main className="flex justify-center items-center flex-grow bg-gray-100">
        <section className="bg-white flex flex-col text-center justify-center items-center w-full md:w-5/12 h-4/6 p-8 m-3 md:m-16 rounded-md">
          <h1 className="text-3xl font-bold pb-2">Login</h1>
          <p>Entre com seu e-mail e senha para acessar sua conta</p>
          <form action="" className="py-4 w-full" onSubmit={handleSubmit}>
          <div id="erro" className="text-red-500 mt-2 text-center">{erro}</div>
            <div className="p-2">
              <label htmlFor="email" className="block text-left">E-mail</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="seu@email.com"
                onChange={handleChange}
                value={logar.email}
                className="border border-gray-400 p-1 px-2 rounded-md w-full"
              />
            </div>
            <div className="p-2">
              <label htmlFor="senha" className="block text-left">Senha</label>
              <input
                type="password"
                name="senha"
                id="senha"
                onChange={handleChange}
                value={logar.senha}
                placeholder="Digite sua senha"
                className="border border-gray-400 p-1 px-2 rounded-md w-full"
              />
            </div>
            <input
              type="submit"
              value="Entrar"
              className="bg-black text-white rounded-md w-full py-2 mt-4"
            />
          </form>
          <Link href="/registro" className="block mt-4 text-gray-600">
            Você não possui uma conta? Registrar
          </Link>
        </section>
      </main>
    </div>
  );
}
