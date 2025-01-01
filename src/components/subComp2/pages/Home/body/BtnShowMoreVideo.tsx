import React, { CSSProperties, useState } from "react";

interface InputProp {
  handleClick: () => void;
}

export const ButtonShowMoreVideo: React.FC<InputProp> = ({handleClick}) => {
  const [isHovered, setHover] = useState<boolean>(false);
  const styles: {[key: string]: CSSProperties} = {
    btn: {
      width: "40%",
      minWidth: "10em",
      alignSelf: "center",
      backgroundColor: isHovered ? "#a47864" : "#c69a86",
      border: isHovered ? "1px solid #000" : "1px solid transparent",
      transition: "all .3s ease",
    }
  };
  return (
    <button 
      style={styles.btn}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={handleClick}
    >
      Show more videos
    </button>
  )
};