import React, { CSSProperties } from "react";
import { OtherVideos } from "./otherVideos/Section";
import { TranscriptAndSummary } from "./transcriptAndSummary/TranscriptAndSummary";

interface InputProp {
  videoId: string | null;
}

export const RightSection: React.FC<InputProp> = ({videoId}) => {
  const styles: {[key: string]: CSSProperties} = {
    wrapper: {
      width: "30%",
      display: "flex",
      flexDirection: "column",
      flexWrap: 'nowrap',
      gap: "2em",
    }
  };
  return (
    <div style={styles.wrapper}>
      <OtherVideos videoId={videoId} />
      <TranscriptAndSummary videoId={videoId} />
    </div>
  );
};