import { createContext, useContext, useEffect, useState } from "react";

interface LoginContextType {
    login: boolean;
}

export const LoginContext = createContext<LoginContextType | null>(null);

interface loginProviderProps {
    children: React.ReactNode;
}

export const LoginProvider: React.FC<loginProviderProps> = ({ children }: loginProviderProps) => {
    const [login, setLogin] = useState<boolean>(false);

    useEffect(() => {
        async function fetchData() {


            const token = localStorage.getItem("@auth/token");

            if (!token) {
                return;
            }

            await fetch(`${process.env.REACT_APP_HOST}/me`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((data) => {
                if(data.ok) {
                setLogin(true)
            }else{
                setLogin(false)
            }}).catch(() => setLogin(false));
        }

        fetchData();
    }, [login]);

    return (
        <LoginContext.Provider value={{ login }}>
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
