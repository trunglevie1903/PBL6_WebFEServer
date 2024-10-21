import React, {CSSProperties} from "react";
import User_HomePage_Header_Logo from "./User_HomePage_Header_Logo";
import User_HomePage_Header_UploadButton from "./User_HomePage_Header_UploadButton";
import User_HomePage_Header_SearchBox from "./User_HomePage_Header_SearchBox";
import User_HomePage_ProfileSection from "./User_HomePage_ProfileSection";

const User_HomePage_Header: React.FC = () => {
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
      flex: 1
    },
    headerRight: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "10px",
      zIndex: 100,
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.headerLeft}>
        <User_HomePage_Header_Logo />
        <User_HomePage_Header_UploadButton />
      </div>
      <div style={styles.headerMiddle}>
        <User_HomePage_Header_SearchBox />
      </div>
      <div style={styles.headerRight}>
        <User_HomePage_ProfileSection />
      </div>
    </div>
  )
};

export default User_HomePage_Header;