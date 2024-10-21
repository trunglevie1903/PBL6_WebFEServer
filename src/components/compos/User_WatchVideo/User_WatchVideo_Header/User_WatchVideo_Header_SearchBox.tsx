import React, {CSSProperties} from "react";

const User_WatchVideo_Header_SearchBox: React.FC = () => {
  const styles: {[key: string]: CSSProperties} = {
    input: {
      width: "100%",
      padding: "10px",
      border: "none",
      borderRadius: "50px",
    },
    button: {
      backgroundColor: "transparent",
      border: "none",
      borderRadius: "50px",
      padding: "10px",
      cursor: "pointer",
    },
    wrapper: {
      width: "60%",
      display: "flex",
      alignItems: "center",
      border: "1px solid #ddd",
      borderRadius: "50px",
      padding: "5px",
    }
  };

  return (
    <div style={styles.wrapper}>
      <input type="text" placeholder="Search..." style={styles.input}/>
      <button style={styles.button}>Search</button>
    </div>
  );
};

export default User_WatchVideo_Header_SearchBox;