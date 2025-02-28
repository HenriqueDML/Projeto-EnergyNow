import Image from "next/image";
import logo from '../images/logo.png'

export default function Rodape(){
    return(
        <footer className="flex items-center justify-between bg-sky-200 p-2 px-4">
            <div className="text-lg">
                <h1>Arthur Tavares Arraes</h1>
                <h1>Henrique Francisco Garcia</h1>
                <h1>Willian Moreira Brito</h1>
            </div>
            <Image
            src={logo} alt="Logo" className="w-16"/>
        </footer>
    )
}