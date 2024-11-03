import React, { CSSProperties, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';

interface ResetPasswordData {
  token: string;
  newPassword: string;
  username: string;
}

const ResetPasswordPage: React.FC = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ResetPasswordData>();
  const [message, setMessage] = useState<string | null>(null);

  const onSubmit: SubmitHandler<ResetPasswordData> = async (data) => {
    setMessage(null);
    try {
      const response = await axios.post('http://127.0.0.1:4000/user/reset-password', data);
      setMessage("Password has been reset successfully. You can now log in with your new password.");
    } catch (error) {
      setMessage("Error: Could not reset password. Please check your token or try again later.");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
        <div style={styles.formGroup}>
          <label>Token</label>
          <input
            type="text"
            {...register("token", { required: "Reset token is required" })}
            style={styles.input}
          />
          {errors.token && <span style={styles.error}>{errors.token.message}</span>}
        </div>

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
          <label>New Password</label>
          <input
            type="password"
            {...register("newPassword", { required: "New password is required" })}
            style={styles.input}
          />
          {errors.newPassword && <span style={styles.error}>{errors.newPassword.message}</span>}
        </div>

        <button type="submit" style={styles.button} disabled={isSubmitting}>
          {isSubmitting ? "Resetting..." : "Reset Password"}
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

export default ResetPasswordPage;
