
import { FaInstagram, FaYoutube, FaWhatsapp } from 'react-icons/fa'; 
import styles from './Footer.module.scss';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.icons}>
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
          <FaInstagram className={styles.icon} />
        </a>
        <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
          <FaYoutube className={styles.icon} />
        </a>
        <a href="https://www.whatsapp.com" target="_blank" rel="noopener noreferrer">
          <FaWhatsapp className={styles.icon} />
        </a>
      </div>
    </footer>
  );
}
