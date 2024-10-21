import React, { CSSProperties, useState } from 'react';
import axios from 'axios';

interface HeaderProps {
  handleMenuToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ handleMenuToggle }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const [isLoading, setLoading] = useState(false);

  const handleLogout = async (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const accessToken = localStorage.getItem("accessToken");
      console.log("accessToken: ", accessToken);
      if (!accessToken) {
        alert("No token found, unable to log out");
        setLoading(false);
        return;
      }
      const response = await axios.post("http://127.0.0.1:4000/user/logout", {}, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      console.log("response: ", response);
      if (JSON.stringify(response.data) === "{}") {
        alert("Logged out successfully");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      } else if (response.data.message) {
        alert(`Error: ${response.data.message}`);
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        alert(`Error: ${err.response.data.message || "Logout failed"}`);
      } else {
        alert(`Error: ${(err instanceof Error) ? err.message : err}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.header}>
      {/* Left: Hamburger Menu */}
      <div style={styles.headerLeft}>
        <button style={styles.menuBtn} onClick={handleMenuToggle}>
          &#9776;
        </button>
        <a href="/" style={styles.logo}>
          Logo
        </a>
      </div>

      {/* Middle: Search Bar */}
      <div style={styles.headerMiddle}>
        <div style={styles.searchBox}>
          <input type="text" placeholder="Search..." style={styles.searchInput} />
          <button style={styles.searchBtn}>Search</button>
        </div>
      </div>

      {/* Right: Profile Icon with Dropdown */}
      <div style={styles.headerRight}>
        <div style={styles.profileContainer}>
          <button onClick={toggleDropdown} style={styles.profileButton}>
            {/* Profile Circle Icon */}
            <img src="https://via.placeholder.com/40" alt="Profile" style={styles.profileImage} />
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <ul style={styles.dropdownMenu}>
              <li style={styles.dropdownItem}><a style={styles.dropdownItemText} href={"/c/"+localStorage.getItem('userId')}>My Profile</a></li>
              {/* <li style={styles.dropdownItem}><a style={styles.dropdownItemText} href="#">Notifications</a></li> */}
              {/* <li style={styles.dropdownItem}><a style={styles.dropdownItemText} href="#">Help</a></li> */}
              {/* <li style={styles.dropdownItem}><a style={styles.dropdownItemText} href="#">Report</a></li> */}
              <li style={styles.dropdownItem}><a style={styles.dropdownItemText} href="" onClick={handleLogout}>{isLoading ? "Signing out..." : "Sign Out"}</a></li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

// Styles
const styles: { [key: string]: CSSProperties } = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px 30px',
    borderBottom: '1px solid #ddd',
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
  },
  menuBtn: {
    background: 'none',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
    marginRight: '15px',
  },
  logo: {
    textDecoration: 'none',
    fontSize: '24px',
    fontWeight: 'bold',
    color: 'black',
  },
  headerMiddle: {
    display: 'flex',
    justifyContent: 'center',
    flex: 1,
  },
  searchBox: {
    display: 'flex',
    alignItems: 'center',
    border: '1px solid #ddd',
    borderRadius: '50px',
    padding: '5px',
    width: '60%',
  },
  searchInput: {
    border: 'none',
    padding: '10px',
    borderRadius: '50px',
    width: '100%',
  },
  searchBtn: {
    backgroundColor: 'transparent',
    border: 'none',
    padding: '10px',
    cursor: 'pointer',
    borderRadius: '50px',
  },
  headerRight: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  profileContainer: {
    position: 'relative',
  },
  profileButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
  },
  profileImage: {
    borderRadius: '50%',
    width: '40px',
    height: '40px',
  },
  dropdownMenu: {
    position: 'absolute',
    right: 0,
    top: '50px',
    backgroundColor: '#fff',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    borderRadius: '5px',
    overflow: 'hidden',
    zIndex: 1000,
    listStyle: 'none',
    padding: 0,
    width: '200px',
  },
  dropdownItem: {
    padding: '10px 15px',
    borderBottom: '1px solid #ddd',
  },
  dropdownItemText: {
    textDecoration: 'none'
  }
};

export default Header;
