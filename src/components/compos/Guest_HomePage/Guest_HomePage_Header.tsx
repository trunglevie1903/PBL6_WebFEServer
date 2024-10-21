import React, { CSSProperties } from "react";
import Guest_HomePage_Header_UploadButton from "./Guest_HomePage_Header_UploadButton";
import Guest_HomePage_Header_Logo from "./Guest_HomePage_Header_Logo";
import Guest_HomePage_Header_SearchBox from "./Guest_HomePage_Header_SearchBox";
import Guest_HomePage_Header_RegisterButton from "./Guest_HomePage_Header_RegisterButton";
import Guest_HomePage_Header_LoginButton from "./Guest_HomePage_Header_LoginButton";

const Guest_Homepage_Header: React.FC = () => {

  const styles: {[key: string]: CSSProperties} = {
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "10px 20px",
      borderBottom: "1px solid #ddd",
    },
    headerLeft: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "10px"
    },
    headerLeft_logo: {
      textDecoration: "none",
      fontSize: "24px",
      fontWeight: "bold",
      color: "black"
    },
    headerLeft_button: {
      padding: '10px 20px',
      border: '1px solid #ddd',
      borderRadius: '5px',
      textDecoration: 'none',
      cursor: 'pointer',
      color: 'black',
    },
    headerMiddle: {
      display: "flex",
      justifyContent: "center",
      flex: 1
    },
    headerMiddle_box: {
      display: "flex",
      alignItems: "center",
      border: "1px solid #ddd",
      borderRadius: "50px",
      padding: "5px",
      width: "60%"
    },
    headerMiddle_input: {
      border: 'none',
      padding: '10px',
      borderRadius: '50px',
      width: '100%',
    },
    headerMiddle_button: {
      backgroundColor: 'transparent',
      border: 'none',
      padding: '10px',
      cursor: 'pointer',
      borderRadius: '50px',
    },
    headerRight: {
      display: "flex",
      justifyContent: "center", 
      alignItems: "center",
      gap: "10px"
    },
    headerRight_button: {
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
    <div style={styles.header}>
      <div style={styles.headerLeft}>
        {/* <a href="/" style={styles.headerLeft_logo}>Logo</a> */}
        {/* <button style={styles.headerLeft_button}>Upload</button> */}
        <Guest_HomePage_Header_Logo />
        <Guest_HomePage_Header_UploadButton />
      </div>
      <div style={styles.headerMiddle}>
        {/* <div style={styles.headerMiddle_box}> */}
          {/* <input type="text" placeholder='Search...'  style={styles.headerMiddle_input}/> */}
          {/* <button style={styles.headerMiddle_button}>Search</button> */}
        {/* </div> */}
        <Guest_HomePage_Header_SearchBox />
      </div>
      <div style={styles.headerRight}>
        {/* <a href="/login">Sign In</a> */}
        {/* <button style={styles.headerRight_button}>Sign up</button>
        <button style={styles.headerRight_button}>Log in</button> */}
        <Guest_HomePage_Header_RegisterButton />
        <Guest_HomePage_Header_LoginButton />
      </div>
    </div>
  );
};

export default Guest_Homepage_Header;