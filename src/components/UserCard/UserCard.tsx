import React, { useState } from 'react';
import styles from './user-card.module.scss';
import { Card } from '@mui/material';
import User from '../../utils/user'; 

interface props{
    user: User;
}

const UserCard = ({ user }: props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Card className={styles.userCard}>
        <div className={styles.userName}>
          {user.name}
          <button className={styles.moreButton} onClick={openModal}>
            ...
          </button>
        </div>
        <div className={styles.userField}>
          <strong>ID:</strong> <span>{user.id}</span>
        </div>
        <div className={styles.userField}>
          <strong>Email:</strong> <span>{user.email}</span>
        </div>
        <div className={styles.userField}>
          <strong>Senha:</strong> <span>******</span> 
        </div>
        {user.role && (
          <div className={styles.userField}>
            <strong>Função:</strong> <span>{user.role}</span>
          </div>
        )}
      </Card>

      {isModalOpen && (
  <div className={styles.modalOverlay} onClick={closeModal}>
    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
      <p>Editar usuário</p>
      <p>Deletar usuário</p>
    </div>
  </div>
)}

    </>
  );
};

export default UserCard;
