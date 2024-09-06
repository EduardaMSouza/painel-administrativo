import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, CircularProgress, Dialog, DialogTitle, DialogActions, Box, Typography } from '@mui/material';
import { Bounce, toast } from 'react-toastify';
import User from '../../utils/user'; 

const UserManagePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(false);
    const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
    
    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem("@auth/token");

                if (!token) return;

                const response = await fetch(`${process.env.REACT_APP_HOST}/users/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const userData = await response.json();
                    setUser(userData);
                } else {
                    throw new Error('Failed to fetch user');
                }
            } catch (error) {
                console.error("Erro ao carregar o usuário", error);
                toast.error("Erro ao carregar o usuário", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                });
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [id]);

    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (user) {
            setUser({ ...user, [e.target.name]: e.target.value });
        }
    };

    const handleSaveEdit = async () => {
        if (!user) return;
        setLoading(true);
        try {
            const token = localStorage.getItem("@auth/token");

            if (!token) return;

            const response = await fetch(`${process.env.REACT_APP_HOST}/users/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(user)
            });

            if (response.ok) {
                toast.success('Usuário atualizado com sucesso', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                });
                navigate('/users'); 
            } else {
                throw new Error('Failed to update user');
            }
        } catch (error) {
            console.error("Erro ao atualizar o usuário", error);
            toast.error("Erro ao atualizar o usuário", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteUser = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem("@auth/token");

            if (!token) return;

            const response = await fetch(`${process.env.REACT_APP_HOST}/users/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.ok) {
                toast.success('Usuário deletado com sucesso', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                });
                navigate('/dashboard'); 
            } else {
                throw new Error('Failed to delete user');
            }
        } catch (error) {
            console.error("Erro ao deletar o usuário", error);
            toast.error("Erro ao deletar o usuário", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        } finally {
            setLoading(false);
        }
    };

    const openDeleteConfirmDialog = () => {
        setIsDeleteConfirmOpen(true);
    };

    const closeDeleteConfirmDialog = () => {
        setIsDeleteConfirmOpen(false);
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (!user) {
        return (
            <Box sx={{ textAlign: 'center', mt: 4 }}>
                <Typography variant="h6" color="textSecondary">
                    Usuário não encontrado
                </Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ padding: 4, maxWidth: 600, margin: '0 auto', minHeight: "calc(100vh - 156px)", alignItems: "center", justifyContent: "center", display: "flex", flexDirection: "column" }}>
            <Typography variant="h4" gutterBottom>
                Gerenciar Usuário
            </Typography>
            <TextField
                label="Nome"
                name="name"
                value={user.name}
                onChange={handleEditChange}
                fullWidth
                margin="normal"
                variant="outlined"
            />
            <TextField
                label="Email"
                name="email"
                value={user.email}
                onChange={handleEditChange}
                fullWidth
                margin="normal"
                variant="outlined"
            />
            <Box sx={{ mt: 2 }}>
                <Button variant="contained" color="primary" onClick={handleSaveEdit} disabled={loading}>
                    Salvar Alterações
                </Button>
                <Button variant="contained" color="error" onClick={openDeleteConfirmDialog} sx={{ ml: 2 }} disabled={loading}>
                    Deletar Usuário
                </Button>
            </Box>

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
        </Box>
    );
};

export default UserManagePage;
