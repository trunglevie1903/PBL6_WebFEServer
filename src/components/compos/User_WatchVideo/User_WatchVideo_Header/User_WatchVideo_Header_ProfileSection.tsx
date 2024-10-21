import React, {CSSProperties, MouseEventHandler, useState} from "react";
import axios from "axios";

import checkValidToken from "../../../functions/checkValidToken";

const User_WatchVideo_Header_ProfileSection: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  }

  const styles: {[key: string]: CSSProperties} = {
    wrapper: {
      position: "relative",
    },
    button: {
      background: "none",
      padding: "10px",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
    },
    dropdownMenu: {
      position: "absolute",
      right: 0,
      top: "50px",
      backgroundColor: "white",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
      borderRadius: "5px",
      overflow: "hidden",
      zIndex: 100,
      listStyle: "none",
      padding: 0,
      width: "150px",
    },
    dropdownItem: {
      padding: "10px 20px",
      borderBottom: "1px solid #ddd",
    },
    dropdownItemText: {
      textDecoration: "none",
    },
  };

  const [isLogOutDisabled, setLogOutDisabled] = useState(false);

  const SigningOut = async () => {
    try {
      checkValidToken().then(val => {
        if (!val) throw new Error("Authentication data is not found");
        alert("Logged out");
        setTimeout(() => {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          window.location.href = "/";
        }, 1000);
      });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response && error.response.data && error.response.data.message) {
        alert (`Error: ${error.response.data.message}`);
      } else alert(`Error: ${error}`);
      setTimeout(() => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = "/";
      }, 1000);
    }
  };

  const handleSignOut: MouseEventHandler = (event) => {
    event.preventDefault();
    if (!isLogOutDisabled) {
      setLogOutDisabled(true);
      SigningOut();
      setLogOutDisabled(false);
    }
  };

  return (
    <div style={styles.wrapper}>
      <button style={styles.button} onClick={toggleDropdown}>My Profile</button>
      {isDropdownOpen && (
        <ul style={styles.dropdownMenu}>
          <li style={styles.dropdownItem}>
            <a style={styles.dropdownItemText} href="/">Profile</a>
          </li>
          <li style={styles.dropdownItem}>
            <a style={styles.dropdownItemText} href="/" onClick={handleSignOut}>Sign out</a>
          </li>
        </ul>
      )}
    </div>
  );
};

export default User_WatchVideo_Header_ProfileSection;