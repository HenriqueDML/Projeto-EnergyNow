'use client'

import Image from "next/image";
import energiasolar from "../../images/energia-solar.jpg"
import energiaeolica from "../../images/energia-eolica.jpg"

export default function EnergiaLimpa() {
  return (
    <div className="flex flex-col bg-gray-100 min-h-screen">
      <main className="flex justify-center items-center bg-gray-100 flex-1">
        <section className="bg-white w-full md:w-8/12 h-auto m-3 p-8 rounded-md shadow-md">
          <h1 className="text-2xl text-center text-gray-900">Energia Limpa</h1>
          <p className="text-gray-600 mt-4 text-lg">
            A energia limpa é uma alternativa sustentável às fontes tradicionais de energia, como combustíveis fósseis. Ela busca minimizar o impacto ambiental, utilizando recursos renováveis e naturais, como o sol e o vento.
          </p>
          
          <h2 className="text-2xl mt-6 text-gray-900 text-center mb-2">Energia Eólica</h2>
          <Image src={energiaeolica} alt="Energia Eólica" className="mx-auto rounded-md"/>
          <p className="text-gray-600 mt-2 text-lg">
            A energia eólica é gerada a partir do vento. As turbinas eólicas convertem o movimento do ar em eletricidade. É uma fonte renovável, limpa e abundante. Além disso, não gera poluição e ajuda a reduzir a emissão de gases do efeito estufa.
          </p>
          <p className="text-gray-600 mt-2 text-lg">
            A energia eólica pode ser instalada em terra ou no mar, dependendo das condições climáticas e geográficas. Países como Dinamarca e Alemanha têm se destacado no uso dessa tecnologia.
          </p>

          <h2 className="text-2xl mt-6 text-gray-900 text-center mb-2">Energia Solar</h2>
          <Image src={energiasolar} alt="Energia Eólica" className="mx-auto rounded-md"/>
          <p className="text-gray-600 mt-2 text-lg">
            A energia solar é gerada através da luz do sol, utilizando painéis fotovoltaicos para transformar essa luz em eletricidade. É uma das fontes de energia mais promissoras para um futuro sustentável, devido à sua abundância e baixo custo de manutenção.
          </p>
          <p className="text-gray-600 mt-2 text-lg">
            A energia solar pode ser utilizada em diversas escalas, desde pequenas instalações residenciais até grandes usinas solares. Ela também é uma ótima opção para regiões com alta incidência de luz solar, como o Brasil.
          </p>

          <h2 className="text-2xl mt-6 text-gray-900">Por que investir em Energia Limpa?</h2>
          <ul className="list-disc ml-6 mt-2 text-lg text-gray-600">
            <li>Redução das emissões de gases poluentes.</li>
            <li>Fontes renováveis e inesgotáveis.</li>
            <li>Desenvolvimento de novas tecnologias sustentáveis.</li>
            <li>Criação de empregos verdes.</li>
            <li>Contribuição para o combate às mudanças climáticas.</li>
          </ul>

          <p className="text-gray-600 mt-6 text-lg">
            Investir em energia limpa é investir no futuro do planeta. Além de ser uma solução eficiente e econômica, ela proporciona um mundo mais sustentável para as futuras gerações.
          </p>
        </section>
      </main>
    </div>
  );
}
