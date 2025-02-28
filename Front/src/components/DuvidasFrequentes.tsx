"use client"
import { FaChevronDown } from 'react-icons/fa';
import { useState } from 'react';

export default function DuvidasFrequentes() {
    const duvidasFrequentes = [
        {
            id: 1,
            pergunta: "Como posso começar a usar a Energy Now?",
            resposta: "Para começar a usar a Energy Now, basta se cadastrar na plataforma e inserir seus dados de consumo de energia. O sistema calculará seu consumo atual e fornecerá orientações personalizadas para otimizar o uso de eletricidade e reduzir seus gastos."
        },
        {
            id: 2,
            pergunta: "A Energy Now ajuda a reduzir o consumo de energia sem comprometer o conforto?",
            resposta: "Sim! A plataforma oferece sugestões personalizadas para reduzir o consumo de energia de maneira eficiente, garantindo que o conforto e a qualidade de vida não sejam comprometidos. As dicas incluem ajustes simples no comportamento e no uso de equipamentos."
        },
        {
            id: 3,
            pergunta: "A Energy Now oferece suporte para a instalação de sistemas de energia renovável?",
            resposta: "Sim, a plataforma conecta você com empresas especializadas em soluções de energia renovável. Você pode consultar e até mesmo instalar dispositivos como painéis solares ou sistemas eólicos para tornar sua casa ou empresa mais sustentável."
        },
        {
            id: 4,
            pergunta: "Como o simulador de consumo de energia funciona?",
            resposta: "O simulador de consumo permite que você insira dados sobre seus dispositivos e horários de uso de energia. Com essas informações, o sistema estima seu consumo mensal e oferece recomendações para reduzir os gastos, com base em seu perfil de uso."
        },
        {
            id: 5,
            pergunta: "A Energy Now é fácil de usar, mesmo para quem não tem conhecimento técnico?",
            resposta: "Sim! A plataforma foi desenvolvida com uma interface simples e intuitiva, pensada para todos os tipos de usuários. Mesmo quem não tem conhecimentos técnicos em energia elétrica pode navegar facilmente e aproveitar os recursos disponíveis."
        }
    ];
    

    const [respostasVisiveis, setRespostasVisiveis] = useState(Array(duvidasFrequentes.length).fill(false));

    const aparecerResposta = (index: number) => {
        const novosEstados = [...respostasVisiveis];
        novosEstados[index] = !novosEstados[index];
        setRespostasVisiveis(novosEstados);
    };

    return (
        <section id="ajuda" className="bg-gray-100 p-5 text-center">
            <header className="text-lg md:text-2xl mb-3">Dúvidas Frequentes</header>
            {duvidasFrequentes.map((i, index) => (
                <div className="my-2 flex flex-col gap-2 p-2 px-6 w-11/12 md:w-3/4 mx-auto border-2 rounded-md border-sky-600 bg-white" key={i.id}>
                    <div className="flex items-center justify-between">
                        <h1 className="font-open-sans md:text-lg">{i.pergunta}</h1>
                        <button onClick={() => aparecerResposta(index)} className="ml-2 border-0">
                        <FaChevronDown
                                className={`transition-transform duration-300 ${respostasVisiveis[index] ? 'transform rotate-180' : ''}`}
                            />
                        </button>
                    </div>
                    {respostasVisiveis[index] && (
                        <h1 className="text-sm md:text-base">{i.resposta}</h1>
                    )}
                </div>
            ))}
        </section>
    );
}
