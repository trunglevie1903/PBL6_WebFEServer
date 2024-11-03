import React, { CSSProperties } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';

const formStyles: { [key: string]: CSSProperties } = {
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    padding: '20px',
    maxWidth: '400px',
    margin: 'auto',
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  formControl: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    flex: 2,
    height: "100%",
    alignContent: "center",
    fontSize: '1rem',
    color: '#333',
  },
  input: {
    flex: 3,
    padding: '10px',
    fontSize: '1rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
  },
  errorText: {
    color: 'red',
    fontSize: '0.875rem',
    marginTop: '4px',
  },
  submitButton: {
    padding: '12px',
    fontSize: '1rem',
    // color: '#fff',
    backgroundColor: '##ddd',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

interface ChangePasswordFormDataType {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

// Password validation regex patterns
const sqlInjectionPattern = /['"=;]|--/; // symbols typically used in SQL injections
const mediumPasswordPattern = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/; // at least 8 characters with letters and numbers
const strongPasswordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()]).{12,}$/; // 12+ characters with mixed types

const ChangePasswordForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
    // reset
  } = useForm<ChangePasswordFormDataType>();

  const newPassword = watch('newPassword');

  const onSubmit: SubmitHandler<ChangePasswordFormDataType> = async (data) => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await axios.post(
        'http://127.0.0.1:4000/user/change-password',
        { oldPassword: data.oldPassword, newPassword: data.newPassword },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );

      alert('Password changed successfully!');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      window.location.href = '/login';
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const message = error.response.data.message;

        // Error handling based on backend response
        switch (message) {
          case 'The old password is incorrect.':
            setError('oldPassword', { message: message });
            break;
          case 'New password does not meet the required criteria.':
            setError('newPassword', { message: message });
            break;
          case 'New password cannot be the same as the old password.':
            setError('newPassword', { message: message });
            break;
          case 'Invalid or expired token. Please log in again.':
            alert(message);
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            window.location.href = '/login';
            break;
          case 'User not found.':
            alert(message);
            window.location.href = '/';
            break;
          default:
            alert('An unexpected error occurred. Please try again later.');
            break;
        }
      } else {
        alert('An unexpected error occurred. Please try again later.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={formStyles.formContainer}>
      <div>
        <div style={formStyles.formControl}>
          <label style={formStyles.label}>Old Password</label>
          <input
            type="password"
            {...register('oldPassword', { required: 'Old password is required' })}
            style={formStyles.input}
          />
        </div>
        {errors.oldPassword && (
          <p style={formStyles.errorText}>{errors.oldPassword.message}</p>
        )}
      </div>

      <div>
        <div style={formStyles.formControl}>
          <label style={formStyles.label}>New Password</label>
          <input
            type="password"
            {...register('newPassword', {
              required: 'New password is required',
              validate: {
                // Minimum requirement: No SQL injection patterns and minimum length of 4
                minimum: (value) =>
                  !sqlInjectionPattern.test(value) && value.length >= 4 ||
                  'Password should be at least 4 characters and avoid SQL injection symbols',
                },
            })}
            style={formStyles.input}
          />
        </div>
        {errors.newPassword && (
          <p style={formStyles.errorText}>{errors.newPassword.message}</p>
        )}
      </div>

      <div>
        <div style={formStyles.formControl}>
          <label style={formStyles.label}>Confirm New Password</label>
          <input
            type="password"
            {...register('confirmNewPassword', {
              required: 'Please confirm your new password',
              validate: (value) =>
                value === newPassword || 'Passwords do not match',
            })}
            style={formStyles.input}
          />
        </div>
        {errors.confirmNewPassword && (
          <p style={formStyles.errorText}>{errors.confirmNewPassword.message}</p>
        )}
      </div>

      <button type="submit" style={formStyles.submitButton}>
        Change Password
      </button>
    </form>
  );
};

export default ChangePasswordForm;
