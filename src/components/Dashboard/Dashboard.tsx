import { useUserContext } from "../../context/UsersContext";
import styles from './Dashboard.module.scss'; 

export default function Dashboard() {
  const { users } = useUserContext(); 
  console.log(users);
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
      </div>
    </section>
  );
}
