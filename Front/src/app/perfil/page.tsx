'use client';

import Link from "next/link";
import { useContext } from "react";
import { AuthContext } from "../context";


export default function Perfil() {
  const { user, logout } = useContext(AuthContext)

  return (
    <section className="p-8 flex justify-center bg-gray-100">
      <section className="p-6 bg-white rounded-lg shadow w-full md:w-3/5">
        <header className="text-xl md:text-2xl font-bold mb-4 text-center">Perfil</header>
        <form className="flex flex-col">
          <label>Nome Completo</label>
          <input type="text"  className="p-2 border rounded mb-2" value={user?.nome} readOnly />
          <label>Cep</label>
          <input type="text" className="p-2 border rounded mb-2" value={user?.cep} readOnly />
          <label>CPF</label>
          <input type="tel" className="p-2 border rounded mb-2" value={user?.cpf} readOnly />
          <label>Email</label>
          <input type="email" className="p-2 border rounded mb-2" value={user?.email} readOnly />
          <Link href="/">
            <button type="button" className="bg-black text-white p-2 rounded w-full" onClick={logout}>
              Sair
            </button>
          </Link>
        </form>
      </section>
    </section>
  );
}
