import DuvidasFrequentes from "@/components/DuvidasFrequentes";
import Image from "next/image";
import Link from "next/link";
import energiasolar from "../images/energia-solar.jpg"
import energiaeolica from "../images/energia-eolica.jpg"

export default function Home() {
  return (
    <main>
      <section className="bg-[url('../images/hero.jpg')] h-60 md:h-96 text-center text-white flex items-center justify-center">
      <div className="">
        <h1 className="text-xl md:text-4xl my-4 md:my-9">Calculadora de Watts</h1>
        <button className="border border-white rounded-md px-4 md:px-7 py-1 md:text-xl"><Link href="/calculadora">INICIAR</Link></button>
      </div>
      </section>
      <DuvidasFrequentes/>
      <section className="text-center my-3">
        <Link href="/energialimpa">
        <div>
          <h1 className="text-lg md:text-2xl text-green-700">Energia Solar</h1>
          <p>A energia solar é gerada a partir da luz e calor do sol.</p>
          <Image src={energiasolar} className="h-44 md:h-96 w-full pt-3" alt="Foto Energia Solar"/>
        </div>
        <div>
          <h1 className="text-lg md:text-2xl text-green-700 pt-3">Energia Eólica</h1>
          <p>A energia eólica gera eletricidade usando turbinas.</p>
          <Image src={energiaeolica} className="h-44 md:h-96 w-full pt-3" alt="Foto Energia Eólica"/>
        </div>
        </Link>
        
      </section>
    </main>
  );
}
