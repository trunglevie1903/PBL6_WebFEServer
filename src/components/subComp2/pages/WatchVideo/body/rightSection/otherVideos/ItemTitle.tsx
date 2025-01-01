import React, { CSSProperties } from "react";

interface InputProp {
  str: string | null;
};

export const ItemTitle: React.FC<InputProp> = ({str}) => {
  const styles: {[key: string]: CSSProperties} = {
    text: {
      height: "100%",
      fontWeight: "bold",
      overflow: "hidden",
      textOverflow: "ellipsis",
      display: "-webkit-box",
      WebkitLineClamp: 2,
      WebkitBoxOrient: "vertical",
      whiteSpace: "normal",
      padding: "0.5em",
      textAlign: "center",
    }
  };
  return (
    <p style={styles.text}>
      {str}
    </p>
  );
};