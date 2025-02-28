"use client"

import { useState } from "react";

export default function Simulador() {
  const [id, setId] = useState(1);

  const [eletrodomesticos, setEletrodomesticos] = useState<
    { id: number; nome: string; watt: number; tempo: number }[]
  >([
    { id: 1, nome: 'Geladeira', watt: 150, tempo: 8 },
  ]);

  const [eletrodomestico, setEletrodomestico] = useState({
    nome: '',
    watt: 0,
    tempo: 0,
    id: 0
  });

  const addEletrodomestico = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setEletrodomesticos([...eletrodomesticos, eletrodomestico]);
    setEletrodomestico({ id: id + 1, nome: '', watt: 0, tempo: 0 });
    setId(id + 1);
  };

  const captura = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEletrodomestico({ ...eletrodomestico, [name]: value });
  };

  const removeEletrodomestico = (id: number) => {
    setEletrodomesticos(eletrodomesticos.filter(e => e.id !== id));
  };

  const calcularConsumoMensal = () => {
    const totalConsumo = eletrodomesticos.reduce((acc, { watt, tempo }) => {
      // Calculando o consumo mensal de cada eletrodoméstico
      return acc + (watt * tempo * 30) / 1000; // em kWh
    }, 0);

    return totalConsumo;
  };

  return (
    <main className="bg-gray-100 p-3">
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-md">
      <h1 className="text-3xl font-semibold text-center mb-6">Simulador de Consumo de Energia</h1>

      {/* Formulário para adicionar novos eletrodomésticos */}
      <form onSubmit={addEletrodomestico} className="space-y-4 mb-6">
        <div>
          <label>Nome do Eletrodoméstico</label>
          <input
            name="nome"
            placeholder="Geladeira"
            value={eletrodomestico.nome}
            onChange={captura}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label>Valor do Watt</label>
          <input
            name="watt"
            type="number"
            placeholder="Valor do Watt"
            value={eletrodomestico.watt}
            onChange={captura}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label>Tempo de uso diário (horas)</label>
          <input
            name="tempo"
            type="number"
            placeholder="Tempo de uso diário (horas)"
            value={eletrodomestico.tempo}
            onChange={captura}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full p-2 bg-sky-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Adicionar Eletrodoméstico
        </button>
      </form>

      {/* Exibindo o consumo mensal total */}
      <h3 className="text-xl font-medium mb-4">
        Consumo mensal total de energia: 
        <span className="font-semibold">{calcularConsumoMensal().toFixed(2)} kWh</span>
      </h3>

      {/* Listando os eletrodomésticos adicionados */}
      <div className="space-y-4">
        {eletrodomesticos.map((e) => (
          <div key={e.id} className="p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-lg">
            <h2 className="text-2xl font-semibold">{e.nome}</h2>
            <p><span className="font-semibold">Watt:</span> {e.watt} W</p>
            <p><span className="font-semibold">Tempo de uso diário:</span> {e.tempo} horas</p>
            <p><span className="font-semibold">Consumo mensal: </span> {((e.watt * e.tempo * 30) / 1000).toFixed(2)} kWh</p>
            <button
              onClick={() => removeEletrodomestico(e.id)}
              className="mt-2 text-white p-2 rounded-md bg-red-600 hover:text-red-800 focus:outline-none"
            >
              Remover
            </button>
          </div>
        ))}
      </div>
    </div>
    </main>
    
  );
}
