import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import styles from './Cadastro.module.scss';
import { useNavigate, Link } from 'react-router-dom';

const schema = yup.object({
  name: yup.string().required('Nome é obrigatório'),
  email: yup.string().email('Email inválido').required('Email é obrigatório'),
  password: yup.string().required('Senha é obrigatória').min(6, 'A senha deve ter pelo menos 6 caracteres'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password')], 'As senhas não coincidem')
    .required('Confirmação de senha é obrigatória'),
}).required();

interface FormInputs {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function Cadastro() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>({
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

      localStorage.setItem("@auth/token", responseData.token);
      navigate("/");
      
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.container_login}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Nome</label>
          <input id="name" type="text" {...register('name')} />
          {errors.name && <p className={styles.error}>{errors.name.message}</p>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" {...register('email')} />
          {errors.email && <p className={styles.error}>{errors.email.message}</p>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="password">Senha</label>
          <input id="password" type="password" {...register('password')} />
          {errors.password && <p className={styles.error}>{errors.password.message}</p>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="confirmPassword">Confirmar Senha</label>
          <input
            id="confirmPassword"
            type="password"
            {...register('confirmPassword')}
          />
          {errors.confirmPassword && <p className={styles.error}>{errors.confirmPassword.message}</p>}
        </div>

        <button type="submit" className={styles.submitButton}>Cadastrar</button>
        <div>
        <p>Já tem uma conta? <Link to="/">Faça login</Link></p>
      </div>
      </form>

      
    </div>
  );
}
