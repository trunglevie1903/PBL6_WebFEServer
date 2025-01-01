import React, { CSSProperties, useState } from "react";

interface InputProp {
  // handleClick: () => void;
  isWaitingResponse: boolean;
}

export const SubmitBtn: React.FC<InputProp> = ({isWaitingResponse}) => {
  const [isHovered, setHover] = useState<boolean>(false);

  const styles: {[key: string]: CSSProperties} = {
    btn: {
      width: "40%",
      minWidth: "7em",
      border: "1px solid #888888",
      borderRadius: ".5em",
      padding: "1em",
      backgroundColor: isWaitingResponse ? "#bbb" : isHovered ? "#4f4" : "transparent",
      fontWeight: "bold",
      transition: "all .3s ease",
      color: "#000",
      cursor: isWaitingResponse ? "not-allowed" : "pointer",
      alignSelf: "center",
    }
  };
  return (
    <button 
      style={styles.btn} 
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      type="submit"
      disabled={isWaitingResponse}
    >
      {isWaitingResponse ? "Uploading" : "Upload"}
    </button>
  );
};