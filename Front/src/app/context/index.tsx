"use client"
import { createContext, useState, useEffect } from "react";

export type UserProps = {
    cep: string,
    cpf: string,
    email: string,
    senha: string,
    nome: string
}

type AuthContextProps = {
    user: UserProps | null,
    login: (credentials: { email: string, senha: string }) => Promise<void>,
    register: (userData: UserProps) => Promise<void>,
    logout: () => void,
    error: string | null
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<UserProps | null>(null);
    const [error, setError] = useState<string | null>(null);

    // Recuperar o user do localStorage quando o aplicativo for carregado
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser)); // Restaurar o user a partir do localStorage
        }
    }, []);

    const login = async (credentials: { email: string; senha: string }) => {
        setError(null);
    
        try {
            const loginResponse = await fetch('http://localhost:8080/usuarios/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentials),
            });
    
            if (!loginResponse.ok) {
                const errorMessage = await loginResponse.text();
                if (loginResponse.status === 400) {
                    setError('Credenciais inválidas. Verifique o email e a senha.');
                } else if (loginResponse.status === 401) {
                    setError('Credenciais inválidas. Verifique o email e a senha.');
                } else if (loginResponse.status === 403) {
                    setError('Acesso proibido. Entre em contato com o suporte.');
                } else if (loginResponse.status === 404) {
                    setError('Usuário não encontrado.');
                } else if (loginResponse.status === 500) {
                    setError('Erro no servidor. Tente novamente mais tarde.');
                } else {
                    setError(`Erro desconhecido: ${errorMessage}`);
                }
                return;
            }
    
            const userData = await loginResponse.json();
            const userFiltered: UserProps = {
                cep: userData.cep,
                cpf: userData.cpf,
                email: userData.email,
                senha: userData.senha,
                nome: userData.nome
            };
    
            setUser(userFiltered);

            // Armazenar o usuário no localStorage após o login
            localStorage.setItem('user', JSON.stringify(userFiltered));

        } catch (error) {
            setError('Erro de conexão. Verifique sua rede e tente novamente.');
            console.log(error)
        }
    };

    const register = async (userData: UserProps) => {
        setError(null);
        console.log(userData)
        try {
            const registerResponse = await fetch('http://localhost:8080/usuarios/cadastro', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
            });

            if (!registerResponse.ok) {
                const errorMessage = await registerResponse.text();
                if (registerResponse.status === 400) {
                    setError('Dados inválidos. Verifique as informações e tente novamente.');
                } else if (registerResponse.status === 409) {
                    setError('Usuário já cadastrado.');
                } else if (registerResponse.status === 500) {
                    setError('Erro no servidor. Tente novamente mais tarde.');
                } else {
                    setError(`Erro desconhecido: ${errorMessage}`);
                }
                return;
            }

            const newUser = await registerResponse.json();
            setUser(newUser);

            // Armazenar o usuário no localStorage após o registro
            localStorage.setItem('user', JSON.stringify(newUser));

        } catch (error) {
            setError('Erro de conexão. Verifique sua rede e tente novamente.');
            console.log(error)
        }
    };

    const logout = () => {
        setUser(null);
        setError(null);

        // Remover o usuário do localStorage ao fazer logout
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, error }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider, AuthContext };
