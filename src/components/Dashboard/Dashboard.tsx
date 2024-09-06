import { useEffect, useState } from "react";
import styles from './Dashboard.module.scss';
import User from "../../utils/user";
import { Pagination, Skeleton, Card, TextField } from "@mui/material";
import UserCard from "../UserCard/UserCard";
import stylesCard from "../UserCard/user-card.module.scss"

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
  const [filter, setFilter] = useState(''); 

  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    setLoading(true); 
    setUsers([]);
  };

  const fetchData = async (pages: number, pageSize: number) => {
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

      const data: apiResponse = await response.json();
      setPagination(data.paginationInfo);
      setUsers(data.data);
      setLoading(false); 
    } catch (error) {
      console.log("Erro ao buscar os dados dos usuários", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(page, 12);
  }, [page]);

  const refreshUsers = () => {
    fetchData(page, 12);
  };


  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <section className={styles.dashboard}>
      <h1>Lista de Usuários</h1>
      
      <TextField
        label="Filtrar por nome"
        variant="outlined"
        value={filter}
        onChange={(e) => setFilter(e.target.value)} 
        fullWidth
        margin="normal"
      />

      <Card
          sx={{
            padding: "20px",
            margin: "20px 0",
            backgroundColor: "#f5f5f5",
            borderRadius: "10px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            fontSize: "18px",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
  Número de usuários: {pagination?.totalItems}
</Card>
      <div className={styles.usersContainer}>
        {loading ? (
          Array.from(new Array(3)).map((_, index) => (
            <div key={index} className={stylesCard.userCard}>
              <Skeleton variant="text" width={120} height={30} style={{ marginBottom: '10px' }} />
              <Skeleton variant="text" width={80} height={20} style={{ marginBottom: '5px' }} />
              <Skeleton variant="text" width={200} height={20} style={{ marginBottom: '5px' }} />
              <Skeleton variant="text" width={180} height={20} style={{ marginBottom: '5px' }} />
              <Skeleton variant="text" width={100} height={20} />
            </div>
          ))
        ) : (
          filteredUsers.map((user) => (
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
