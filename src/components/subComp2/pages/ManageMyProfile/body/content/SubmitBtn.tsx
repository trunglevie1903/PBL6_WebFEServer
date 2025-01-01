import React, { CSSProperties, useState } from "react";

export const SubmitBtn: React.FC = () => {
  const [isHovered, setHover] = useState<boolean>(false);
  const styles: {[key: string]: CSSProperties} = {
    btn: {
      width: "8em",
      padding: '0.5em 1em',
      cursor: "pointer",
      backgroundColor: isHovered ? "#2f2": "#2d2",
      transition: "all .3s ease",
      borderRadius: ".5em",
      border: "none",
    }
  };
  return (
    <button 
      style={styles.btn} 
      onMouseEnter={() => setHover(true)} 
      onMouseLeave={() => setHover(false)}
    >
      Submit
    </button>
  )
};