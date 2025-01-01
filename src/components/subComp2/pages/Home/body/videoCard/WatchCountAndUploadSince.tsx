import React, {CSSProperties} from "react";

interface InputProp {
  watchCountStr: string;
  uploadSince: string;
}

export const VideoWatchCountAndUploadSince: React.FC<InputProp> = ({watchCountStr, uploadSince}) => {
  const styles: {[key: string]: CSSProperties} = {
    text: {
      width: "100%",
      height: "2rem",
      padding: "0.5rem 0.25rem",
      overflow: "hidden",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
      alignSelf: "center",
      textAlign: "start",
    }
  };
  return (
    <p style={styles.text}>
      {watchCountStr}&nbsp;&middot;&nbsp;{uploadSince}
    </p>
  );
};