import React, {useState, CSSProperties, MouseEventHandler, useEffect} from "react";

import { useAuth } from "../../../../../contexts/AuthContext";
import axios from "axios";

interface InputProp {
  onClick: MouseEventHandler
}

export const DropdownLabel: React.FC<InputProp> = ({onClick}) => {
  const [avt, set_avt] = useState<string>("");
  const {username} = useAuth();
  useEffect(() => {
    const process = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:4000/user/${username}/avatar`);
        if (response.data && response.data.message === "request succeed") {
          set_avt(response.data.avatar);
        }
      } catch (error) {
        console.error(error);
      }
    };
    process();
  }, []);
  
  const [isHovering, set_isHovering] = useState<boolean>(false);
  const setHovered = () => {
    set_isHovering(true);
  };
  const setNotHovered = () => {
    set_isHovering(false);
  };

  const styles: {[key: string]: CSSProperties} = {
    wrapper: {
      width: "10rem",
      height: "100%",
      color: isHovering ? "#666" : "#000",
      display: "inline-flex",
      flexDirection: "row",
      flexWrap: "nowrap",
      justifyContent: "center",
      alignContent: "center",
      alignItems: "center",
      gap: "0.5rem",
      cursor: "pointer",
      transition: "all 0.3s ease",
    },
    avt: {
      maxWidth: "2rem",
      maxHeight: "2rem",
      border: "none",
      borderRadius: "2rem",
    },
    text: {
      overflow: "hidden",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
    }
  };
  return (
    <span 
      style={styles.wrapper} onMouseEnter={setHovered}
      onMouseLeave={setNotHovered} onClick={onClick}
    >
      <img src={avt} alt="avt" style={styles.avt}/>
      <p style={styles.text}>{username || "My account"}</p>
    </span>
  );
};