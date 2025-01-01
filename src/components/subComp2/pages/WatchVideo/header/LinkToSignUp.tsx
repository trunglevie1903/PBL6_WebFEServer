import React, {useState, CSSProperties} from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../../contexts/AuthContext";

export const LinkToSignUp: React.FC = () => {
  const [isHovering, set_isHovering] = useState<boolean>(false);
  const setHovered = () => {
    set_isHovering(true);
  };
  const setNotHovered = () => {
    set_isHovering(false);
  }

  const {checkToken} = useAuth();
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/sign-up');
  };

  const styles: {[key: string]: CSSProperties} = {
    wrapper: {
      height: "3rem",
      width: "8rem",
      padding: "0.5rem",
      border: isHovering ? "1px solid #000": "1px solid transparent",
      borderRadius: "5px",
      backgroundColor: "#5f5",
      transition: "all 0.3s ease",
      cursor: "pointer",
    },
    text: {
      height: "2rem",
      fontSize: "1rem",
      alignContent: "center",
      textAlign: "center",
      textTransform: "capitalize",
      fontWeight: "bold",
    }
  };
  return (
    <div 
      style={styles.wrapper} onClick={handleClick}
      onMouseEnter={setHovered} onMouseLeave={setNotHovered}
    >
      <p style={styles.text}>Sign Up</p>
    </div>
  );
};