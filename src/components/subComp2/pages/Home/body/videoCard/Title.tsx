import React, {CSSProperties} from "react";
interface TitleProp {
  str: string;
}

export const Title: React.FC<TitleProp> = ({str}) => {
  const styles: {[key:string]: CSSProperties} = {
    text: {
      height: "4rem",
      minWidth: "5rem",
      width: "100%",
      padding: "0.5rem 0.25rem",
      fontSize: "1.25rem",
      fontWeight: "bold",
      overflow: "hidden",
      textOverflow: "ellipsis",
      display: "-webkit-box",
      WebkitLineClamp: 2,
      WebkitBoxOrient: "vertical",
      whiteSpace: "normal",
    }
  }
  return (
    <p style={styles.text}>
      {str}
    </p>
  )
};