import React, {useState, CSSProperties, MouseEventHandler} from "react";

import parrot from "../../../../../assets/parrot.jpg";

interface InputProp {
  onClick: MouseEventHandler
}

export const DropdownLabel: React.FC<InputProp> = ({onClick}) => {
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
      <img src={parrot} alt="avt" style={styles.avt}/>
      <p style={styles.text}>Lorem ipsum dolor sit amet.</p>
    </span>
  );
};