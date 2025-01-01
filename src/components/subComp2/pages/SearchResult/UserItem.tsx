import axios from "axios";
import React, { CSSProperties, useEffect, useState } from "react";

interface InputProp {
  userId: string | null;
}

export const UserItem: React.FC<InputProp> = ({userId}) => {
  const [avt, setAvt] = useState<string>("");
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    const process = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:4000/user/avatar-and-username/${userId}`);
        if (response.data.message === "request succeed") {
          setAvt(response.data.avatar);
          setUsername(response.data.username);
        }
      } catch (error) {
        console.error(error);
      }
    };
    process();
  }, []);
  const styles: {[key: string]: CSSProperties} = {
    wrapper: {
      width: "100%",
      height: "9em",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      overflow: "hidden",
    },
    avt: {
      height: "100%",
      aspectRatio: "16/9",
      objectFit: "contain",
    },
    text: {
      textAlign: "start",
      alignItems: "center",
    }
  };
  return (
    <div style={styles.wrapper}>
      <img src={avt} alt="" style={styles.avt}/>
      <p style={styles.text}>{username}</p>
    </div>
  );
};