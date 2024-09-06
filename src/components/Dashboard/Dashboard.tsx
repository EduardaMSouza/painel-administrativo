import { useEffect, useState } from "react";
import styles from './Dashboard.module.scss';
import User from "../../utils/user";
import { Pagination, Skeleton } from "@mui/material";
import UserCard from "../UserCard/UserCard";


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
  percentageChange: PercentageChange;
}

export default function Dashboard() {

  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);
  const [loading, setLoading] = useState(true); 
  const [percentage, setPercentage] = useState();

  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    setLoading(true); 
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

        console.log(response);

        const data: apiResponse = await response.json();
        setPagination(data.paginationInfo);
        setUsers(data.data);
        setLoading(false); 
        // setPercentage()
        console.log(response);
      } catch (error) {
        console.log("Erro ao buscar os dados dos usuários", error);
        setLoading(false);
      }
    }

    fetchData(page, 3);
  }, [page]);

  return (
    <section className={styles.dashboard}>
      <h1>Lista de Usuários</h1>
      <div className={styles.usersContainer}>
        {loading ? (
          Array.from(new Array(3)).map((_, index) => (
            <div key={index} className={styles.userCard}>
              <Skeleton variant="text" width={100} height={20} />
              <Skeleton variant="text" width={200} height={20} />
              <Skeleton variant="text" width={150} height={20} />
              <Skeleton variant="text" width={180} height={20} />
              <Skeleton variant="text" width={120} height={20} />
            </div>
          ))
        ) : (
          users.map((user) => (
            <UserCard key={user.id} user={user} />
          ))
        )}
      </div>
      {pagination && (
        <Pagination
          count={pagination.totalPages}
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
    </section>
  );
}
