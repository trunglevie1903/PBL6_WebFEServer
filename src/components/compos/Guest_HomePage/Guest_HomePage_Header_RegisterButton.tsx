import React, { CSSProperties, MouseEventHandler } from "react";

const Guest_HomePage_Header_RegisterButton: React.FC = () => {
  const handleClick: MouseEventHandler = (event) => {
    event.preventDefault();
    window.location.href = "/register";
  };

  const styles: {[key: string]: CSSProperties} = {
    button: {
      background: "none",
      padding: '10px 20px',
      border: '1px solid #ddd',
      borderRadius: '5px',
      textDecoration: 'none',
      cursor: 'pointer',
      color: 'black',
    }
  };
  return (
    <button style={styles.button} onClick={handleClick}>Sign up</button>
  );
};

export default Guest_HomePage_Header_RegisterButton;