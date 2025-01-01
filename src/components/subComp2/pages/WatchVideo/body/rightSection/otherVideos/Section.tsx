import React, {CSSProperties} from "react";
import { SectionHeader } from "./Header";
import { SectionList } from "./List";

interface InputProp {
  videoId: string | null;
}

export const OtherVideos: React.FC<InputProp> = ({videoId}) => {
  const styles: {[key: string]: CSSProperties} = {
    wrapper: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      flexWrap: "nowrap",
      borderRadius: "1em",
    }
  };
  return (
    <div style={styles.wrapper}>
      <SectionHeader />
      <SectionList videoId={videoId}/>
    </div>
  );
};
