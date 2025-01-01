import React, {CSSProperties, useState, MouseEventHandler} from "react";

interface SubmitBtnProp {
  handleClick: MouseEventHandler;
  isDisabled: boolean;
}

export const SubmitBtn: React.FC<SubmitBtnProp> = ({
  handleClick, isDisabled
}) => {
  const [isHovering, setHover] = useState<boolean>(false);
  const setHovered = () => setHover(true);
  const setUnHovered = () => setHover(false);
  const styles: {[key: string]: CSSProperties} = {
    btn: {
      backgroundColor: isDisabled ? "#ddd" : isHovering ? "#AFA" : "#0f0",
      transition: "all .3s ease",
      height: "3rem",
      width: "6rem",
      padding: ".5em",
      borderRadius: "5rem",
      border: "none",
    },
  };
  return (
    <button
      disabled={isDisabled}
      style={styles.btn}
      onMouseEnter={setHovered}
      onMouseLeave={setUnHovered}
      onClick={handleClick}
    >
      Submit
    </button>
  );
};