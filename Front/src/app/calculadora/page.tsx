'use client'

import { useState, useContext } from "react";
import { AuthContext } from "@/app/context";

export default function Calculadora() {
  // Iniciando os estados com valores numéricos 0
  const [watt1, setWatt1] = useState<number>(0); 
  const [watt2, setWatt2] = useState<number>(0); 
  const [watt3, setWatt3] = useState<number>(0); 
  const [media, setMedia] = useState<number | null>(null); 
  const [erro, setErro] = useState<string | null>(null);

  // Obter o usuário a partir do contexto
  const { user } = useContext(AuthContext);

  // Função para lidar com a mudança dos valores dos inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numero = Number(value); // Convertendo o valor para número

    // Garantir que o valor seja um número válido
    if (!isNaN(numero)) {
      if (name === "watt1") {
        setWatt1(numero);
      } else if (name === "watt2") {
        setWatt2(numero);
      } else if (name === "watt3") {
        setWatt3(numero);
      }
    }
  };

  // Função para calcular a média
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Verificar se todos os campos foram preenchidos
    if (watt1 === 0 || watt2 === 0 || watt3 === 0) {
      setErro("Por favor, preencha todos os campos com valores maiores que 0.");
      setMedia(null); // Limpar a média em caso de erro
      return;
    }

    // Calcular a média
    const watts = [watt1, watt2, watt3];
    const mediaCalculada = watts.reduce((acc, watt) => acc + watt, 0) / watts.length;
    setErro(null); // Limpar a mensagem de erro
    setMedia(mediaCalculada);

    // Se o usuário estiver autenticado, enviar os dados para a API
    if (user?.email) {
      try {
         await fetch("http://localhost:8080/gerenciamento/createGrup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: user.email,
            kWh1: watt1,
            kWh2: watt2,
            kWh3: watt3,
          }),
        });
      } catch (erro) {
        console.error("Erro ao enviar os dados:", erro);
        setErro("Houve um erro ao enviar os dados para a API.");
      }
    }
  };

  // Função para classificar o consumo
  const classificarConsumo = (media: number) => {
    if (media <= 150) {
      return "Consumo baixo! Excelente eficiência energética.";
    } else if (media <= 350) {
      return "Consumo médio. Considere otimizar o uso de energia.";
    } else {
      return "Consumo alto. Verifique maneiras de reduzir o consumo.";
    }
  };

  return (
    <div className="flex flex-col">
      <main className="flex justify-center items-center bg-gray-100 flex-1">
        <section className="bg-white flex flex-col text-left justify-center items-start w-full md:w-5/12 h-auto m-7 p-8 rounded-md">
          <h1 className="text-3xl font-bold pb-2 mx-auto">Calculadora de Watts</h1>
          {erro && <p className="text-red-500 mt-2 mx-auto">{erro}</p>}
          <form onSubmit={handleSubmit} className="py-4 w-full">
            <div className="p-2">
              <label htmlFor="watt1" className="block text-left">Potência Mês 1 (Watts)</label>
              <input
                type="number"
                name="watt1"
                id="watt1"
                placeholder="150"
                className="border border-gray-400 p-1 px-2 rounded-md w-full"
                value={watt1}
                onChange={handleChange}
              />
            </div>
            <div className="p-2">
              <label htmlFor="watt2" className="block text-left">Potência Mês 2 (Watts)</label>
              <input
                type="number"
                name="watt2"
                id="watt2"
                placeholder="250"
                className="border border-gray-400 p-1 px-2 rounded-md w-full"
                value={watt2}
                onChange={handleChange}
              />
            </div>
            <div className="p-2">
              <label htmlFor="watt3" className="block text-left">Potência Mês 3 (Watts)</label>
              <input
                type="number"
                name="watt3"
                id="watt3"
                placeholder="200"
                className="border border-gray-400 p-1 px-2 rounded-md w-full"
                value={watt3}
                onChange={handleChange}
              />
            </div>
            <input
              type="submit"
              value="Calcular Média"
              className="bg-black text-white rounded-md w-full py-2 mt-4"
            />
          </form>

          {media !== null && !erro && (
            <div className="mt-4 p-4 bg-gray-100 rounded-md w-full">
              <div>
                <h1 className="text-xl font-semibold">Resultado:</h1>
                <p className="text-gray-500">Consumo Médio Mensal: {media.toFixed(2)} kWh</p>
                <p className="text-gray-500">{classificarConsumo(media)}</p>
              </div>
              <div className="pt-5">
                <h1 className="text-xl font-semibold">Recomendações:</h1>
                <p className="text-gray-500">Mantenha o hábito de desligar aparelhos em standby.</p>
                <p className="text-gray-500">Investir em equipamentos eficientes pode ajudar a reduzir o consumo.</p>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
