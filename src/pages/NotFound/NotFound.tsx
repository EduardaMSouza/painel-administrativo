import { Link } from "react-router-dom";
import styles from './NotFound.module.scss'; 

function NotFound(): JSX.Element {
  return (
    <div className={styles.notFound}>
      <h1>Página não encontrada</h1>
      <p>Ops! A página que você está procurando não existe.</p>
      <Link to="/" className={styles.linkButton}>
        Voltar para o login
      </Link>
    </div>
  );
}

export default NotFound;
