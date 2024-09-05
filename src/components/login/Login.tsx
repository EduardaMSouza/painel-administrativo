// import React from "react";
// import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Styles from "./Login.module.scss"

interface FormData {
  email: string;
  password: string;
}

export default function Login() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

 

  async function authenticate(formData: FormData) {
    try {
      const response = await fetch(`${process.env.REACT_APP_HOST}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      localStorage.setItem("@auth/token", data.token);
      
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
    <div className={Styles.container_login}>
      <form onSubmit={handleSubmit((data) => authenticate(data))}>
      <label htmlFor="email">Email:</label>
        <div className={Styles.container_individual}>
        <input
          type="email"
          {...register("email", {
            required: "O email é obrigatório",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Insira um email válido",
            },
          })}
        />
        {errors.email && <span>{errors.email.message}</span>}
        </div>
        <label htmlFor="password">Senha:</label>
          <div className={Styles.container_individual}>
          <input
           type="password"
           {...register("password", {
                required: "A senha é obrigatória",
                minLength: {
                value: 6,
                message: "A senha deve ter no mínimo 6 caracteres",
            },
              maxLength: {
                value: 20,
                message: "A senha deve ter no máximo 20 caracteres",
            },
          })}
        />
          {errors.password && <span>{errors.password.message}</span>}
        </div>
          
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Carregando..." : "Entrar"}
        </button>
      </form>
    </div>
    </>
    
  );
}
