import React from 'react';
import styles from './Header.module.scss';
import Logo from '../../assets/logo.png'; 
import { useNavigate } from "react-router-dom";
import { TbLogout } from "react-icons/tb";
import { useLoginContext } from '../../context/LoginContext';

const Header = () => {
  const navigate = useNavigate();

  const {login, setLogin} = useLoginContext();


  const handleLogout = () => {
    localStorage.removeItem("@auth/token");
    setLogin(false);
    navigate("/");
  };

  return (
    <header className={styles.header}>
      <img src={Logo} alt="Logo" className={styles.logo} />

      {login && (
        <div>
          <button
            onClick={handleLogout}
            data-qa="logout"
            aria-label="Botão sair"
          >
            Sair <TbLogout className={styles.logout} />
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
