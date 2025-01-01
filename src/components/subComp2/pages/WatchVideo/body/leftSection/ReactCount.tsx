import React, {CSSProperties} from "react";

interface ReactCountProp {
  count: number;
}

export const ReactCount: React.FC<ReactCountProp> = ({count}) => {
  const styles: {[key: string]: CSSProperties} = {
    wrapper: {
      width: "100%",
      backgroundColor: "transparent",
      alignContent: "center",
      textAlign: "center",
      padding: "1em",
      fontSize: "1.5em",
      fontWeight: "bold",
      cursor: "default"
    }
  };
  return (
    <p style={styles.wrapper}>
      {count}
    </p>
  );
};