import React, { CSSProperties, useState } from "react";

interface InputProp {
  isActivated: boolean;
  defaultText: string;
  activatedText: string;
  handleActivate: () => void;
  handleDeactivate: () => void;
}

export const ReactBtn: React.FC<InputProp> = ({
  isActivated, defaultText, activatedText, handleActivate, handleDeactivate
}) => {
  const [isHovered, setHover] = useState<boolean>(false);
  const handleClick = () => {
    if (isActivated) handleDeactivate();
    else handleActivate();
  };
  const styles: {[key: string]: CSSProperties} = {
    wrapper: {
      width: "100%",
      padding: "1em",
      border: isHovered ? "1px solid #000" : "1px solid transparent",
      // border: "none",
      borderRadius: ".5em",
      // backgroundColor: isHovered ? "#" : "transparent",
      backgroundColor: "transparent",
      // fontSize: isHovered ? "1.5em" : "1em",
      cursor: "pointer",
      alignContent: "center",
      textAlign: "center",
      transition: "all .3s ease",
    }
  };
  return (
    <div 
      onClick={handleClick} style={styles.wrapper}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
    >
      {isActivated ? activatedText : defaultText}
    </div>
  );
};