import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from "./Cadastro.module.scss";
import { useNavigate, Link } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import { useLoginContext } from "../../context/LoginContext";

const schema = yup
  .object({
    name: yup.string().required("Nome é obrigatório"),
    email: yup.string().email("Email inválido").required("Email é obrigatório"),
    password: yup
      .string()
      .required("Senha é obrigatória")
      .min(6, "A senha deve ter pelo menos 6 caracteres"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "As senhas não coincidem")
      .required("Confirmação de senha é obrigatória"),
    role: yup.string().required("Função é obrigatória"), // Adicionando validação para role
  })
  .required();

interface FormInputs {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
}

export default function Cadastro() {
  const { login, setLogin } = useLoginContext();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormInputs>({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  const onSubmit = async (formData: FormInputs) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_HOST}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error);
      }

      localStorage.setItem("@auth/token", responseData);
      setLogin(true);
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.container_login}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
        <div className={styles.formGroup}>
          <TextField
            id="name"
            label="Nome"
            variant="outlined"
            fullWidth
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name ? errors.name.message : ""}
          />
        </div>

        <div className={styles.formGroup}>
          <TextField
            id="role"
            label="Função"
            variant="outlined"
            fullWidth
            {...register("role")}
            error={!!errors.role}
            helperText={errors.role ? errors.role.message : ""}
          />
        </div>

        <div className={styles.formGroup}>
          <TextField
            id="email"
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email ? errors.email.message : ""}
          />
        </div>

        <div className={styles.formGroup}>
          <TextField
            id="password"
            label="Senha"
            type="password"
            variant="outlined"
            fullWidth
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password ? errors.password.message : ""}
          />
        </div>

        <div className={styles.formGroup}>
          <TextField
            id="confirmPassword"
            label="Confirmar Senha"
            type="password"
            variant="outlined"
            fullWidth
            {...register("confirmPassword")}
            error={!!errors.confirmPassword}
            helperText={
              errors.confirmPassword ? errors.confirmPassword.message : ""
            }
          />
        </div>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={isSubmitting}
          className={styles.submitButton}
        >
          {isSubmitting ? "Carregando..." : "Cadastrar"}
        </Button>

        <div>
          <p>
            Já tem uma conta? <Link to="/">Faça login</Link>
          </p>
        </div>
      </form>
    </div>
  );
}
