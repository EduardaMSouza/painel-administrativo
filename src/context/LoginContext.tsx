import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";

interface LoginContextType {
    login: boolean;
    setLogin: Dispatch<SetStateAction<boolean>>;
}

export const LoginContext = createContext<LoginContextType | null>(null);

interface LoginProviderProps {
    children: React.ReactNode;
}

export const LoginProvider: React.FC<LoginProviderProps> = ({ children }: LoginProviderProps) => {
    const [login, setLogin] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true); // Estado para verificar se a autenticação está carregando

    useEffect(() => {
        async function fetchData() {
            const token = localStorage.getItem("@auth/token");

            if (!token) {
                setLoading(false); // Termina o carregamento mesmo sem token
                return;
            }

            try {
                const response = await fetch(`${process.env.REACT_APP_HOST}/me`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    setLogin(true);
                } else {
                    setLogin(false);
                }
            } catch (error) {
                console.error('Erro ao validar o token:', error);
                setLogin(false);
            } finally {
                setLoading(false); // Termina o carregamento após a verificação
            }
        }

        fetchData();
    }, []); // Removemos `login` das dependências, pois só queremos que o efeito rode uma vez

    if (loading) {
        return <div>Carregando...</div>; // Você pode substituir isso com um componente de carregamento real
    }

    return (
        <LoginContext.Provider value={{ login, setLogin }}>
            {children}
        </LoginContext.Provider>
    );
};

export function useLoginContext() {
    const context = useContext(LoginContext);
    if (context === null) {
        throw new Error("useLoginContext deve estar dentro de um LoginProvider");
    }
    return context;
}
