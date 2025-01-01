import React, {CSSProperties} from "react";
import { VideoTitle } from "./VideoTitle";
import { VideoBasicInformation } from "./VideoBasicInformation";
import { VideoMedia } from "./VideoMedia";

interface InputProp {
  videoId: string | null;
}

export const VideoCard: React.FC<InputProp> = ({videoId}) => {
  const styles: {[key: string]: CSSProperties} = {
    wrapper: {
      width: '100%',
      display: "flex",
      flexDirection: "column",
      flexWrap: "nowrap",
      justifyContent: "center",
      alignItems: "flex-start",
    }
  };
  return (
    <div style={styles.wrapper}>
      <VideoTitle videoId={videoId} />
      <VideoBasicInformation videoId={videoId} />
      <VideoMedia videoId={videoId} />
    </div>
  );
};