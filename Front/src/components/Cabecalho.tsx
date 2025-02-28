'use client'

import { useContext, useState } from 'react'
import Link from 'next/link'
import { FiMenu, FiX } from 'react-icons/fi'
import { FaUser } from 'react-icons/fa'
import Image from 'next/image'
import logo from '../images/logo.png'
import { AuthContext } from '@/app/context'

export default function Cabecalho() {
  const { user } = useContext(AuthContext)
  const [menuAberto, setMenuAberto] = useState(false)

  const alternarMenu = () => setMenuAberto(!menuAberto)

  return (
    <header className="bg-sky-200 p-2">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/">
            <Image
              src={logo} alt="Logo" className="w-16 mx-auto" />
          </Link>

          {/* Navegação Desktop */}
          <nav className="hidden md:flex space-x-4 text-lg">
            <Link href="/calculadora">
              Calculadora
            </Link>
            {/* Condicional para Simulador */}
            <Link href={user?.email ? "/simulador" : "/registro"}>
              Simulador
            </Link>
            <Link href="/sobrenos">
              Sobre Nós
            </Link>
            {/* Condicional para Gerenciamento */}
            <Link href={user?.email ? "/gerenciamento" : "/registro"}>
              Gerenciamento
            </Link>
          </nav>

          {/* Botões de Autenticação ou Ícone de Perfil para Desktop */}
          <div className="hidden md:flex items-center space-x-2">
            {user?.email ? (
              <button className="p-2 rounded-full">
                <Link href="/perfil"><FaUser className="h-5 w-5" /></Link>
              </button>
            ) : (
              <>
                <button className="px-4 py-2 bg-green-500 text-white rounded">
                  <Link href="/login">Entrar</Link>
                </button>
                <button className="px-4 py-2 bg-green-500 text-white rounded">
                  <Link href="/registro">Registrar</Link>
                </button>
              </>
            )}
          </div>

          {/* Botão do Menu Mobile */}
          <button className="md:hidden p-2" onClick={alternarMenu}>
            {menuAberto ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
          </button>
        </div>

        {/* Navegação Mobile */}
        {menuAberto && (
          <div className="md:hidden">
            <nav className="flex flex-col text-center space-y-4 py-4">
              <Link href="/calculadora">
                Calculadora
              </Link>
              {/* Condicional para Simulador */}
              <Link href={user?.email ? "/simulador" : "/registro"}>
                Simulador
              </Link>
              <Link href="/sobrenos">
                Sobre Nós
              </Link>
              {/* Condicional para Gerenciamento */}
              <Link href={user?.email ? "/gerenciamento" : "/registro"}>
                Gerenciamento
              </Link>
              {user?.email ? (
                <button className="flex items-center px-4 py-2 mx-auto">
                  <Link href="/perfil"><FaUser className="h-5 w-5 mr-2" /></Link>
                </button>
              ) : (
                <>
                  <button className="w-full px-4 py-2 bg-green-500 text-white rounded">
                    <Link href="/login">Entrar</Link>
                  </button>
                  <button className="w-full px-4 py-2 bg-green-500 text-white rounded">
                    <Link href="/registro">Registrar</Link>
                  </button>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
