import React, { CSSProperties, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';


interface LoginFormData {
  username: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 800);
  const navigate = useNavigate();
  const handleResize = () => {
    setIsMobile(window.innerWidth < 800);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const [formData, setFormData] = useState<LoginFormData>({
    username: '',
    password: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Submit form data
    navigate("/");
  };

  const styles: {[key: string]: CSSProperties} = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      minWidth: "400px",
      backgroundColor: '#5f5f5f', // Page background
    },
    wrapper: {
      display: 'flex',
      width: '80%',
      height: '80vh',
      backgroundColor: '#444', // Darker background color for the big wrapper
      borderRadius: '10px',
    },
    leftWrapper: {
      flex: 1,
      padding: '30px',
      color: '#fff',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    rightWrapper: {
      flex: 1,
      padding: '30px',
      color: '#fff',
      display: isMobile ? 'none' : 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      width: '100px',
      height: '100px',
      borderRadius: '50%',
      marginBottom: '20px',
    },
    header: {
      fontSize: '24px',
      fontWeight: 'bold',
      marginBottom: '5px',
    },
    subHeader: {
      fontSize: '12px',
      marginBottom: '20px',
      textAlign: 'center',
    },
    input: {
      width: '80%',
      padding: '7px',
      marginBottom: '15px',
      border: '1px solid #fff',
      borderRadius: '4px',
      fontSize: '12px',
      backgroundColor: '#333',
      color: '#fff',
    },
    link: {
      color: '#fff',
      textDecoration: 'none',
      marginBottom: '15px',
      textAlign: 'center',
      fontSize: "12px",
    },
    button: {
      backgroundColor: '#7013e4',
      width: "60%",
      color: '#fff',
      padding: '7px 10px',
      border: '1px solid #7013e4',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '14px',
    },
    welcomeText: {
      fontSize: '32px',
      fontWeight: 'bold',
      marginBottom: '20px',
      textAlign: 'center',
    },
    image: {
      width: '100%',
      height: 'auto',
      borderRadius: '8px',
    },
    linkLine: {
      width: "80%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      gap: "10px",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.wrapper}>
        {/* Left Sub Wrapper */}
        <div style={styles.leftWrapper}>
          <form style={styles.form} onSubmit={handleSubmit}>
            {/* <img onClick={() => {navigate('/')}} src={logo} alt="Avatar" style={styles.avatar} /> */}
            <h2 style={styles.header}>Sign In</h2>
            <p style={styles.subHeader}>Enter your information to continue</p>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleInputChange}
              style={styles.input}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              style={styles.input}
            />
            <div style={styles.linkLine}>
              <Link 
                to="/forgot-password" 
                style={styles.link} 
                onMouseEnter={(e) => (e.currentTarget.style.textDecoration = 'underline')} 
                onMouseLeave={(e) => (e.currentTarget.style.textDecoration = 'none')}>
                Forgot Password?
              </Link>
              <Link 
                to="/register" 
                style={styles.link} 
                onMouseEnter={(e) => (e.currentTarget.style.textDecoration = 'underline')} 
                onMouseLeave={(e) => (e.currentTarget.style.textDecoration = 'none')}
              >
                Don't have an account? Create one
              </Link>
            </div>
            <button type="submit" style={styles.button} onClick={handleSubmit}>
              Submit
            </button>
          </form>
        </div>
        {/* Right Sub Wrapper */}
        <div style={styles.rightWrapper}>
          <p style={styles.welcomeText}>Welcome to Persean</p>
          <img
            src="https://via.placeholder.com/400x250"
            alt="Video"
            style={styles.image}
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
