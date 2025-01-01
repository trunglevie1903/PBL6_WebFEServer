import React, { CSSProperties } from "react";
import { VideoItem } from "./VideoItem";

interface InputProp {
  ids: string[];
}

export const VideoList: React.FC<InputProp> = ({ids}) => {
  const styles: {[key: string]: CSSProperties} = {
    wrapper: {
      width: "80%",
      alignSelf: "center",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "center",
    }
  };
  return (
    <div style={styles.wrapper}>
      <h5 style={{
        marginBottom: "1em",
        fontSize: "2em",
        padding: "1em",
      }}>Found videos</h5>
      <div style={{...styles.wrapper, borderTop: "1px solid #000", padding: "1em",}}>
        {ids.map((item, index) => <VideoItem videoId={item} key={index} />)}
      </div>
    </div>
  );
};