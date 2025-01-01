import React, { CSSProperties } from "react";

interface InputProp {
  str: string | null;
}

export const Summary: React.FC<InputProp> = ({str}) => {
  const styles: {[key: string]: CSSProperties} = {
    wrapper: {
      width: "100%",
      padding: ".5em",
    }
  };
  return (
    <div style={styles.wraper}>
      <h5>Summary</h5>
      <hr style={{marginBottom: ".5em"}} />
      <p>
        {(str === null || str === undefined || str.trim() === "") ? "No summary found" : str}
      </p>
    </div>
  );
};