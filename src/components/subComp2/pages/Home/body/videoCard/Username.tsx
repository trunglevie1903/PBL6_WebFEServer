import React, {CSSProperties} from "react";

interface CreatorUsernameProp {
  str: string;
}

export const  CreatorUsername: React.FC<CreatorUsernameProp> = ({str}) => {
  const username = str;
  const styles: {[key: string]: CSSProperties} = {
    text: {
      width: "100%",
      height: "1.5rem",
      padding: "0.25rem",
      alignSelf: "center",
      textAlign: "start",
      overflow: "hidden",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
    }
  };
  return (
    <p style={styles.text}>
      {username}
    </p>
  );
};