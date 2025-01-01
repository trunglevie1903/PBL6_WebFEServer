import React, { CSSProperties, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';

interface ForgotPasswordData {
  username: string;
  email: string;
}

const ForgotPasswordPage: React.FC = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ForgotPasswordData>();
  const [message, setMessage] = useState<string | null>(null);

  const onSubmit: SubmitHandler<ForgotPasswordData> = async (data) => {
    setMessage(null);
    try {
      const response = await axios.post('http://127.0.0.1:4000/user/forgot-password', data);
      setMessage(response.data.message || "Password reset instructions sent to your email.");
    } catch (error) {
      setMessage("Error: Could not send reset instructions.");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
        <div style={styles.formGroup}>
          <label>Username</label>
          <input
            type="text"
            {...register("username", { required: "Username is required" })}
            style={styles.input}
          />
          {errors.username && <span style={styles.error}>{errors.username.message}</span>}
        </div>
        
        <div style={styles.formGroup}>
          <label>Email</label>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            style={styles.input}
          />
          {errors.email && <span style={styles.error}>{errors.email.message}</span>}
        </div>

        <button type="submit" style={styles.button} disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : "Request Reset"}
        </button>
        
        {message && <p style={styles.message}>{message}</p>}
      </form>
    </div>
  );
};

const styles: {[key: string]: CSSProperties} = {
  container: { maxWidth: '400px', margin: 'auto', padding: '1rem' },
  form: { display: 'flex', flexDirection: 'column', gap: '1rem' },
  formGroup: { display: 'flex', flexDirection: 'column' },
  input: { padding: '0.5rem', fontSize: '1rem' },
  button: { padding: '0.5rem', fontSize: '1rem', cursor: 'pointer' },
  error: { color: 'red', fontSize: '0.8rem' },
  message: { marginTop: '1rem', color: 'green' },
};

export default ForgotPasswordPage;
