import React, {useState, CSSProperties} from "react";

interface InputProp {
  str: string;
}

export const CommentText: React.FC<InputProp> = ({str}) => {
  const [isExpanded, setExpand] = useState<boolean>(false);
  const handleBtnClick = () => setExpand(!isExpanded);

  const styles: {[key: string]: CSSProperties} = {
    wrapper: {
      display: "flex",
      flexDirection: "column",
      flexWrap: "nowrap",
      width: "calc(100% - 3rem)",
      alignItems: "flex-start",
    },
    textExpanded: {
      width: "100%",
      padding: ".5rem",
      whiteSpace: "normal",
    },
    textShrunk: {
      width: "100%",
      padding: ".5rem",
      overflow: "hidden",
      textOverflow: "unset",
      display: "-webkit-box",
      WebkitLineClamp: 2,
      WebkitBoxOrient: "vertical",
      whiteSpace: "normal",
    },
    btn: {
      border: "none",
      padding: ".5rem",
      backgroundColor: "transparent",
      cursor: "pointer",
      color: "#444",
    },
  };
  return (
    <div style={styles.wrapper}>
      <p style={isExpanded ? styles.textExpanded : styles.textShrunk}>
        {str}
      </p>
      <button 
        style={styles.btn}
        onClick={handleBtnClick}
      >
        {isExpanded ? "Show less" : "Show more"}
      </button>
    </div>
  );
};