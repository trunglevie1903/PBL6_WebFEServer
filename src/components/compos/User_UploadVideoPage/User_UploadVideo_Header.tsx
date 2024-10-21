import React, {CSSProperties} from "react";

const User_UploadVideoHeader: React.FC = () => {
  const styles: {[key: string]: CSSProperties} = {
    wrapper: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "10px",
      padding: "10px 20px",
      borderBottom: "1px solid #ddd",
    },
    headerLeft: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "10px",
    },
    headerMiddle: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flex: 1,
      zIndex: -1
    },
    headerRight: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "10px"
    },
    logo: {
      textDecoration: "none",
      fontSize: "24px",
      fontWeight: "bold",
      color: "black"
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.headerLeft}>
      <a href="/" style={styles.logo}>Logo</a>
      </div>
    </div>
  )
};

export default User_UploadVideoHeader;