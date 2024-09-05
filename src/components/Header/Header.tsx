import React from 'react';
import styles from './Header.module.scss';
import Logo from '../../assets/logo.png'; 

const Header = () => {
  return (
    <header className={styles.header}>
      <img src={Logo} alt="Logo" className={styles.logo} />
    </header>
  );
};

export default Header;
