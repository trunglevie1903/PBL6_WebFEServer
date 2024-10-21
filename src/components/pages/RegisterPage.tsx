import React from 'react';
import { CSSProperties } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios';

interface RegisterData {
  name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const RegisterPage: React.FC = () => {
  const {
    register, handleSubmit, watch, formState: { errors }
  } = useForm<RegisterData>();

  const onSubmit: SubmitHandler<RegisterData> = async (data) => {
    try {
      // console.log("data: ", data);
      const response = await axios.post(
        "http://127.0.0.1:4000/user/register",
        data,
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      console.log(response, response.status);
      if (response.status !== 201) throw response;
      alert(`New account created! Redirecting to login...`);
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        alert(`Error: ${error.response?.data.message || error}`);
      } else {
        alert(`Error: ${error}`);
      }
    }
  };

  const password = watch("password");

  return (
    <div style={styles.container}>
      <div style={styles.registerBox}>
        <h2 style={styles.title}>Register</h2>

        <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
          <div style={styles.formGroup}>
            <label htmlFor="name" style={styles.formGroup_label}>Name</label>
            <input
              type="text"
              id="name"
              {...register("name", { required: true })}
              placeholder="Enter name"
              style={styles.formGroup_input}
            />
            {errors.name && <span style={styles.error}>Name is required</span>}
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="username" style={styles.formGroup_label}>Username</label>
            <input
              type="text"
              id="username"
              {...register("username", { required: true })}
              placeholder="Enter username"
              style={styles.formGroup_input}
            />
            {errors.username && <span style={styles.error}>Username is required</span>}
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="email" style={styles.formGroup_label}>Email</label>
            <input
              type="email"
              id="email"
              {...register("email", { required: true })}
              placeholder="Enter email"
              style={styles.formGroup_input}
            />
            {errors.email && <span style={styles.error}>Email is required</span>}
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="password" style={styles.formGroup_label}>Password</label>
            <input
              type="password"
              id="password"
              {...register("password", { required: true })}
              placeholder="Enter password"
              style={styles.formGroup_input}
            />
            {errors.password && <span style={styles.error}>Password is required</span>}
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="confirmPassword" style={styles.formGroup_label}>Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              {...register("confirmPassword", {
                required: true,
                validate: (value) =>
                  value === password || "Passwords do not match"
              })}
              placeholder="Confirm password"
              style={styles.formGroup_input}
            />
            {errors.confirmPassword && <span style={styles.error}>{errors.confirmPassword.message || "Confirmation is required"}</span>}
          </div>

          <button type="submit" style={styles.registerButton}>Register</button>
        </form>

        <p style={styles.loginSection}>
          Already have an account? <a href="/login" style={styles.a}>Login here</a>.
        </p>
      </div>
    </div>
  );
};

const styles: { [key: string]: CSSProperties } = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    width: "100vw",
    fontFamily: "Arial, sans-serif"
  },
  registerBox: {
    width: "360px",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "5px"
  },
  title: {
    textAlign: "center" as CSSProperties["textAlign"], // Cast to valid type
    marginBottom: "20px"
  },
  form: {
    display: "flex",
    flexDirection: "column" as CSSProperties["flexDirection"] // Cast to valid type
  },
  formGroup: {
    marginBottom: "15px"
  },
  formGroup_label: {
    display: "block",
    marginBottom: "5px",
  },
  formGroup_input: {
    width: "100%",
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "3px"
  },
  error: {
    color: "red",
    fontSize: "0.8em"
  },
  registerButton: {
    width: "100%",
    padding: "10px",
    border: "none",
    borderRadius: "3px",
    cursor: "pointer"
  },
  loginSection: {
    textAlign: "center" as CSSProperties["textAlign"],
    marginTop: "20px"
  },
  a: {
    textDecoration: "none",
    display: "block",
    marginTop: "5px"
  }
};

export default RegisterPage;