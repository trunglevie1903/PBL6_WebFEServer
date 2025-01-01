import React, {useState, CSSProperties} from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useAuth } from "../../../../../contexts/AuthContext";
import { faFileUpload, faUpload } from "@fortawesome/free-solid-svg-icons";

export const LinkToUpload: React.FC = () => {
  const [isHovering, set_IsHovering] = useState<boolean>(false);
  const setHovered = () => set_IsHovering(true);
  const setNotHovered = () => set_IsHovering(false);
  
  const navigate = useNavigate();
  const {checkToken, checkTokenValidity} = useAuth();
  const handleClick = () => {
    const process = async () => {
      if (await checkTokenValidity() === false) {
        alert("Please sign in");
      } else {
        navigate("/upload");
      }
    };
    process();
  };
  const styles: {[key: string]: CSSProperties} = {
    wrapper: {
      height: "3rem",
      width: "8rem",
      padding: "0.5rem",
      borderRadius: "0.5rem",
      border: isHovering ? "1px solid #000" : "1px solid transparent",
      backgroundColor: "#f8f1a4",
      transition: "all 0.3s ease",
      cursor: "pointer",
      color: "#222",
    },
    text: {
      height: "2rem",
      padding: "auto",
      fontSize: "1rem",
      fontWeight: "bold",
      textTransform: "capitalize",
      alignContent: "center",
      textAlign: "center",
      color: "#000"
    },
  };
  return (
    <div 
      style={styles.wrapper} 
      onMouseEnter={setHovered} 
      onMouseLeave={setNotHovered} 
      onClick={handleClick}
    >
      <p style={styles.text}>
        <FontAwesomeIcon icon={faUpload} />&nbsp;Upload
      </p>
    </div>
  );
};