import React, {CSSProperties, useState, MouseEventHandler} from "react";

interface InputProp {
  handleClick: MouseEventHandler;
  isRepliesShowed: boolean;
}

export const ShowReplyBtn: React.FC<InputProp> = ({handleClick, isRepliesShowed}) => {
  const [isHovering, setHover] = useState<boolean>(false);
  const styles: {[key: string]: CSSProperties} = {
    btn: {
      border: "none",
      padding: "1rem",
      height: "3rem",
      cursor: "pointer",
      // borderRadius: "1rem",
      // backgroundColor: isHovering ? "#bbb" : "#ddd",
      backgroundColor: "transparent"
    },
  };
  return (
    <button
      onClick={handleClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={styles.btn}
    >
      {isRepliesShowed ? "Hide" : "Show"} replies
    </button>
  );
};