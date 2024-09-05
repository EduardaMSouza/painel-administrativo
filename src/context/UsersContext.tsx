import { createContext, useContext, useEffect, useState } from "react";
import User from '../utils/user';

interface UserContextType {
  users: User[]
}

export const UserContext = createContext<UserContextType | null>(null);

interface UsersProviderProps {
  children: React.ReactNode; 
}

export const UsersProvider : React.FC<UsersProviderProps> = ({ children }: UsersProviderProps) => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {

        const token = localStorage.getItem("@auth/token");

        if (!token) {
          return;
        }

        const response = await fetch(`${process.env.REACT_APP_HOST}/users`, {
          headers: {
            Authorization: `Bearer ${token}`
          }});

        const data: User[] = await response.json();

        setUsers(data);
        console.log(data)
      } catch (error) {

        console.log("Erro ao buscar os dados dos usuários", error);

      }
    }

    fetchData();
  }, []);

  return (
    <UserContext.Provider value={{ users }}>
      {children}
    </UserContext.Provider>
  );
};

export function useUserContext() {
  const context = useContext(UserContext);
  if (context === null) {
    throw new Error("useUserContext must be used within a UsersProvider");
  }
  return context;
}
