import React, {CSSProperties} from "react";

interface InputProp {
  timestamp: string;
  text: string;
};

export const TranscriptItem: React.FC<InputProp> = ({timestamp, text}) => {
  const styles: {[key: string]: CSSProperties} = {
    wrapper: {
      padding: ".25em",
    }
  };
  return (
    <p style={styles.wrapper}>
      <strong>{timestamp}</strong>&nbsp;<span>{text}</span>
    </p>
  );
};