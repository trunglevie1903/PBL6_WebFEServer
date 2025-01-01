import React, {CSSProperties, useState, MouseEventHandler} from "react";

interface InputProp {
  handleClick: MouseEventHandler;
}

export const CancelBtn: React.FC<InputProp> = ({handleClick}) => {
  const [isHovering, setHover] = useState<boolean>(false);
  const setHovered = () => setHover(true);
  const setUnHovered = () => setHover(false);
  const styles: {[key: string]: CSSProperties} = {
    btn: {
      height: "3rem",
      width: "6rem",
      padding: "1rem",
      borderRadius: "5rem",
      border: "none",
      backgroundColor: isHovering ? "#bbb" : "#ddd",
      transition: "all .3s ease"
    }
  };
  return (
    <button 
      style={styles.btn} 
      onMouseEnter={setHovered} 
      onMouseLeave={setUnHovered}
      onClick={handleClick}
    >
      Cancel
    </button>
  );
};