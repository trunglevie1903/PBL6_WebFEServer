import React, { CSSProperties } from "react";

const Guest_HomePage_Header_UploadButton: React.FC = () => {
  const styles: {[key: string]: CSSProperties} = {
    button: {
      background: "none", 
      padding: '10px 20px',
      border: '1px solid #ddd',
      borderRadius: '5px',
      textDecoration: 'none',
      cursor: 'pointer',
      color: 'black'
    }
  };
  return (
    <button style={styles.button}>Upload</button>
  );
};

export default Guest_HomePage_Header_UploadButton;