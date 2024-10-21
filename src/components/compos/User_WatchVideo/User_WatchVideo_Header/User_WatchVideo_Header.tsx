import React, {CSSProperties} from "react";

import User_WatchVideo_Header_Logo from "./User_WatchVideo_Header_Logo";
import User_WatchVideo_Header_UploadButton from "./User_WatchVideo_Header_UploadButton";
import User_WatchVideo_Header_SearchBox from "./User_WatchVideo_Header_SearchBox";
import User_WatchVideo_Header_ProfileSection from "./User_WatchVideo_Header_ProfileSection";

const User_WatchVideo_Header: React.FC = () => {
  const styles: {[key: string]: CSSProperties} = {
    wrapper: {
      display: "flex",
      justifyContent: "center",
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
      gap: "10px",
      flex: 1,
      zIndex: -1
    }, 
    headerRight: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "10px",
    }
  }
  return (
    <div>
      <div style={styles.wrapper}>
        <div style={styles.headerLeft}>
          <User_WatchVideo_Header_Logo />
          <User_WatchVideo_Header_UploadButton />
        </div>
        <div style={styles.headerMiddle}>
          <User_WatchVideo_Header_SearchBox />
        </div>
        <div style={styles.headerRight}>
          <User_WatchVideo_Header_ProfileSection />
        </div>
      </div>
    </div>
  );
};

export default User_WatchVideo_Header;