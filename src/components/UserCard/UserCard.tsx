import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button } from '@mui/material';
import styles from './user-card.module.scss';
import User from '../../utils/user';

interface Props {
    user: User;
}

const UserCard = ({ user }: Props) => {
    const navigate = useNavigate();

    const handleManageUser = () => {
        navigate(`/dashboard/users/${user.id}`);
    };

    return (
        <Card className={styles.userCard}>
            <div className={styles.userName}>
                {user.name}
                <button className={styles.moreButton} onClick={handleManageUser}>
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

            <Button variant="outlined" onClick={handleManageUser} fullWidth style={{ marginTop: 16 }}>
                Gerenciar Usuário
            </Button>
        </Card>
    );
};

export default UserCard;
