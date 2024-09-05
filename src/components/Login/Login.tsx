import React from "react";
import { useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface FormData {
  email: string;
  password: string;
}

export function Login() {
  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = useForm<FormData>();

  const navigate = useNavigate();

  async function authenticate(formData: FormData) {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error);
        throw new Error(data.error);
      }

      localStorage.setItem("@auth/token", data.token);
      navigate("/area-logada");
    } catch (error) {
      console.error(error);
    }
  }

 
  return(
    <>
        <div>
            <form action="">
                <label htmlFor="email">Email:</label>
                <input type="email"> </input>
            
            </form>
        </div>

    
    
    </>

  );

 
}