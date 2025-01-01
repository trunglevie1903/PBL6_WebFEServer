import React, { CSSProperties } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import axios from "axios";

interface LoginData {
  username: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const {register, handleSubmit, formState: { errors }} = useForm<LoginData>();

  const onSubmit: SubmitHandler<LoginData> = async (data: LoginData) => {
    try {
      // console.log("data: ", data);
      const response = await axios.post(
        "http://127.0.0.1:4000/user/login",
        data,
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      console.log("response data: ", response.data);
      if (response.status < 200 || response.status > 299) throw response;
      alert(`Login successfully! Going to dashboard ...`);
      
      const {accessToken, refreshToken} = response.data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        alert(`Error: ${error.response?.data.error || "Request failed"}`);
      } else {
        alert(`Error: ${error}`);
      }
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.loginBox}>
        <h2 style={styles.title}>Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
          <div style={styles.formGroup}>
            <label htmlFor="username" style={styles.formGroup_label}>Username</label>
            <input type="text" id="username" {...register("username", { required: true })} style={styles.formGroup_input} placeholder="Enter username" />
            {errors.username && <span style={styles.error}>{errors.username.message || "Username is required"}</span>}
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="password" style={styles.formGroup_label}>Password</label>
            <input type="password" id="password" {...register("password", { required: true })} style={styles.formGroup_input} placeholder="Enter password" />
            {errors.password && <span style={styles.error}>{errors.password.message || "Password is required"}</span>}
          </div>
          <button style={styles.loginButton}>Login</button>
        </form>
        <p style={styles.registerSection}>
          Don't have an account? <a href="/register" style={styles.a}>Register here</a>
        </p>
        <p style={styles.registerSection}>
          <a href="/forgot-password">
            Forgot password?
          </a>
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
  loginBox: {
    width: "360px",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "5px"
  },
  title: {
    textAlign: "center" as CSSProperties["textAlign"],
    marginBottom: "15px"
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
  loginButton: {
    width: "100%",
    padding: "10px",
    border: "none",
    borderRadius: "3px",
    cursor: "pointer"
  },
  registerSection: {
    textAlign: "center" as CSSProperties["textAlign"],
    marginTop: "20px"
  },
  a: {
    textDecoration: "none",
    display: "block",
    marginTop: "5px"
  }
};

export default LoginPage;