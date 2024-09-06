import { useEffect, useState } from "react";
import styles from './Dashboard.module.scss';
import User from "../../utils/user";
import { Pagination } from "@mui/material";

interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

interface PercentageChange {
  percentage: number;
  positive: boolean;
  lastIdUser: number;
}

interface apiResponse {
  data: User[];
  paginationInfo: PaginationInfo;
}

export default function Dashboard() {

  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null)

  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    setUsers([]);
  };
  useEffect(() => {
    async function fetchData(pages: number, pageSize: number) {
      try {

        const token = localStorage.getItem("@auth/token");

        if (!token) {
          return;
        }

        const response = await fetch(`${process.env.REACT_APP_HOST}/users?page=${pages}&limit=${pageSize}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        console.log(page)

        const data: apiResponse = await response.json();
        setPagination(data.paginationInfo)
        setUsers(data.data);
        console.log(data)
      } catch (error) {

        console.log("Erro ao buscar os dados dos usuários", error);
      }
    }

    fetchData(page, 3);
  }, [page]);

  return (
    <section className={styles.dashboard}>
      <h1>Lista de Usuários</h1>
      <div className={styles.usersContainer}>
        {users.map((user) => (
          <div key={user.id} className={styles.userCard}>
            <div className={styles.userField}>
              <strong>ID:</strong> {user.id}
            </div>
            <div className={styles.userField}>
              <strong>Nome:</strong> {user.name}
            </div>
            <div className={styles.userField}>
              <strong>Email:</strong> {user.email}
            </div>
            <div className={styles.userField}>
              <strong>Senha:</strong> {user.password}
            </div>
            {user.role && (
              <div className={styles.userField}>
                <strong>Função:</strong> {user.role}
              </div>
            )}
          </div>
        ))}
        {users && (
          <Pagination
            count={pagination?.totalPages}
            page={page}
            onChange={handleChange}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              gridColumn: "span 2",
            }}
          />
        )}
      </div>
    </section>
  );
}
