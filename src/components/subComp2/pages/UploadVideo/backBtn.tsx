import React, { CSSProperties, useState } from "react";
import { useNavigate } from "react-router-dom";

export const BackBtn: React.FC = () => {
  const [isHovered, setHover] = useState<boolean>(false);
  const navigate = useNavigate();

  const styles: {[key: string]: CSSProperties} = {
    btn: {
      width: "40%",
      minWidth: "7em",
      border: "1px solid #888888",
      borderRadius: ".5em",
      padding: "1em",
      backgroundColor: isHovered ? "#f22" : "#f88",
      fontWeight: "bold",
      transition: "all .3s ease",
      color: "#000",
      cursor: "pointer",
    }
  };
  return (
    <button 
      style={styles.btn} 
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => navigate('/')}
    >
      Back to home
    </button>
  );
};