import Image from 'next/image';
import arthur from '../../images/arthur.svg';
import willian from '../../images/willian.svg';
import henrique from '../../images/henrique.svg';
import github from '../../images/github.svg';
import linkedin from '../../images/linkedin.svg';

export default function SobreNos() {
    const participantes = [
        {
            nome: 'Arthur Arraes',
            github: 'https://github.com/arthurarraes',
            linkedin: 'https://www.linkedin.com/in/arthur-arraes/',
            imagem: arthur,
        },
        {
            nome: 'Willian Moreira',
            github: 'https://github.com/WillianMoreiraBFP',
            linkedin: 'https://www.linkedin.com/in/willian-moreira-443775247/',
            imagem: willian,
        },
        {
            nome: 'Henrique Garcia',
            github: 'https://www.linkedin.com/in/henrique-fgarcia/',
            imagem: henrique,
        },
    ];

    return (
        <main>
            <section className="my-16 mx-5">
                <header className="text-xl md:text-2xl text-center">Participantes</header>
                <a className="text-lg text-blue-600 block text-center my-4" href="https://github.com/arthurarraes/challenge-react" target="_blank" rel="noopener noreferrer">
                    Repositório
                </a>
                <div className="grid grid-cols-3 gap-10 mx-5">
                    {participantes.map((e) => (
                        <div className="flex flex-col items-center text-center" key={e.nome}>
                            <Image src={e.imagem} alt={e.nome} width={150} height={150} />
                            <h1 className="text-lg font-medium">{e.nome}</h1>
                            <h1 className="text-lg">1TDSPK</h1>
                            <div>
                              <a className="text-lg text-blue-600" href={e.github} target="_blank" rel="noopener noreferrer">
                                <Image src={github} alt="Github" width={16} height={16} className="inline" />
                            </a>
                            <a className="text-lg text-blue-600" href={e.linkedin} target="_blank" rel="noopener noreferrer">
                               <Image src={linkedin} alt="Linkedin" width={20} height={20} className="inline" />
                            </a>
                            </div>
                            
                        </div>
                    ))}
                </div>
            </section>
            <section className="my-16 mx-10 text-center bg-gray-100 p-2 rounded-sm">
                <header className="text-xl md:text-2xl">Sobre o Projeto</header>
                <p className="text-lg font-normal my-4 indent-5">
                A Energy Now é uma plataforma inovadora que visa transformar a maneira como consumimos energia, focando na gestão inteligente e sustentável do uso de eletricidade. Oferecendo uma solução prática e eficiente, a plataforma permite que residências e empresas monitorem seu consumo e adotem fontes de energia renovável, como solar e eólica.
                </p>
                <p className="text-lg font-normal my-4 indent-5">
                Com ferramentas como simuladores de consumo e orientações personalizadas, a Energy Now empodera seus usuários a reduzirem custos, aumentarem a eficiência energética e contribuírem para um futuro mais sustentável. Ao mesmo tempo, facilita o acesso a empresas de energia limpa, conectando consumidores a soluções que promovem um mercado de energia mais responsável.
                </p>
                {/* <figure className="my-5">
                    <Image className='mx-auto' src={projeto} alt="Sobre o projeto" width={500} height={300} />
                </figure> */}
            </section>
        </main>
    );
}

  