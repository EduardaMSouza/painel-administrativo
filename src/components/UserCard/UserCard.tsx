import React, { useState } from 'react';
import styles from './user-card.module.scss';
import { Card, Button, Dialog, DialogTitle, DialogActions, TextField, CircularProgress } from '@mui/material';
import User from '../../utils/user';

interface props {
  user: User;
}

const UserCard = ({ user }: props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editedUser, setEditedUser] = useState<User>(user);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openEditDialog = () => {
    setIsEditOpen(true);
  };

  const closeEditDialog = () => {
    setIsEditOpen(false);
  };

  const openDeleteConfirmDialog = () => {
    setIsDeleteConfirmOpen(true);
  };

  const closeDeleteConfirmDialog = () => {
    setIsDeleteConfirmOpen(false);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
  };

  const handleSaveEdit = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("@auth/token");

      if (!token) {
        return;
      }
      
      await fetch(`${process.env.REACT_APP_HOST}/users/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(editedUser)
      });


      alert("Usuário atualizado com sucesso");
      closeEditDialog();
      closeModal();
    } catch (error) {
      console.error("Erro ao atualizar o usuário", error);
      alert("Erro ao atualizar o usuário");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("@auth/token");

      if (!token) {
        return;
      }

      await fetch(`${process.env.REACT_APP_HOST}/users/${user.id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      alert("Usuário deletado com sucesso");
      closeDeleteConfirmDialog();
      closeModal();
    } catch (error) {
      console.error("Erro ao deletar o usuário", error);
      alert("Erro ao deletar o usuário");
    } finally {
      setLoading(false);
    }
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
            <Button variant="outlined" onClick={openEditDialog}>
              Editar usuário
            </Button>
            <Button variant="outlined" color="error" onClick={openDeleteConfirmDialog}>
              Deletar usuário
            </Button>
          </div>
        </div>
      )}

      <Dialog open={isEditOpen} onClose={closeEditDialog}>
        <DialogTitle>Editar Usuário</DialogTitle>
        <div style={{ padding: 16 }}>
          <TextField
            label="Nome"
            name="name"
            value={editedUser.name}
            onChange={handleEditChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            name="email"
            value={editedUser.email}
            onChange={handleEditChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Senha"
            name="password"
            type="password"
            value={editedUser.password}
            onChange={handleEditChange}
            fullWidth
            margin="normal"
          />
          {loading && <CircularProgress />}
        </div>
        <DialogActions>
          <Button onClick={closeEditDialog} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleSaveEdit} color="primary" disabled={loading}>
            Salvar
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={isDeleteConfirmOpen} onClose={closeDeleteConfirmDialog}>
        <DialogTitle>Tem certeza que deseja deletar este usuário?</DialogTitle>
        <DialogActions>
          <Button onClick={closeDeleteConfirmDialog} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleDeleteUser} color="error" disabled={loading}>
            Deletar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UserCard;