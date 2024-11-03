import React, { useEffect, useState } from "react";

import User_HomePage_Header from "../compos/User_HomePage/User_HomePage_Header";
import SelfProfilePageContent from "../compos/User_SelfProfilePage/PageContent";
import ChangePasswordForm from "./User_ChangePasswordPage";
import checkValidToken from "../functions/checkValidToken";
interface NavbarProps {
  activeOption: string;
  onOptionChange: (option: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeOption, onOptionChange }) => {
  const options = ["Profile", "Change Password"];

  const buttonStyles: { [key: string]: React.CSSProperties } = {
    base: {
      padding: "10px 20px",
      margin: "5px 0",
      border: "none",
      borderRadius: "5px",
      backgroundColor: "#f0f0f0",
      cursor: "pointer",
      transition: "background-color 0.3s",
      width: "100%",
      textAlign: "left",
    },
    hovered: {
      backgroundColor: "#d0d0d0",
    },
    active: {
      backgroundColor: "#b0c4de", // Light steel blue color for active
      fontWeight: "bold",
    },
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {options.map((option) => (
        <button
          key={option}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = buttonStyles.hovered.backgroundColor)}
          onMouseLeave={(e) => {
            if (option !== activeOption) {
              e.currentTarget.style.backgroundColor = buttonStyles.base.backgroundColor;
            }
          }}
          onClick={() => onOptionChange(option)}
          style={{
            ...buttonStyles.base,
            ...(option === activeOption ? buttonStyles.active : {}),
          }}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

const UserSelfProfile: React.FC = () => {
  const [activeOption, setActiveOption] = useState("Profile");

  useEffect(() => {
    const preloadFunction = async () => {
      try {
        const val = await checkValidToken();
        if (!val) throw new Error("Token not found");
      } catch (error) {
        alert("You are not allowed to access this page");
        console.error(error);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = "/";
      }
    };
    preloadFunction();
  }, []);

  // Function to render the content based on the active option
  const renderContent = () => {
    switch (activeOption) {
      case "Profile":
        return <SelfProfilePageContent />;
      case "Change Password":
        return <ChangePasswordForm />;
      default:
        return null;
    }
  };

  return (
    <div style={styles.pageContainer}>
      {/* Header */}
      <User_HomePage_Header />

      {/* Main Content */}
      <div style={styles.contentContainer}>
        {/* Navbar */}
        <div style={styles.navbar}> {/* Fixed width for the navbar */}
          <Navbar activeOption={activeOption} onOptionChange={setActiveOption} />
        </div>

        {/* Dynamic Content */}
        <div style={styles.dynamicContent}>
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  pageContainer: {
    display: "flex",
    flexDirection: "column",
    padding: 0,
  },
  contentContainer: {
    display: "flex",
    marginTop: "20px",
    padding: 0,
  },
  navbar: {
    width: "200px", // Fixed width for the navbar
    display: "flex",
    flexDirection: "column",
    paddingRight: "10px",
    borderRight: "1px solid #ddd", // Optional: Add border to the right
    flexShrink: 0, // Prevent the navbar from shrinking
  },
  navButton: {
    padding: "10px",
    marginBottom: "5px",
    backgroundColor: "#ccc",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    textAlign: "left",
    width: "100%", // Ensure buttons take the full width of the navbar
    boxSizing: "border-box", // Include padding in width calculation
  },
  dynamicContent: {
    flex: 1,
    paddingLeft: "20px",
    borderLeft: "1px solid #ddd",
  },
};

export default UserSelfProfile;