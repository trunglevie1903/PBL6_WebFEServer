import React, { CSSProperties, useEffect, useState } from "react";
import { ReactSection } from "./leftSection/ReactSection";
import { MidSection } from "./midSection/MidSection";
import { OtherVideoSection } from "../../../bigComponents/WatchVideoSection";
import { OtherVideos } from "./rightSection/otherVideos/Section";
import { RightSection } from "./rightSection/RightSection";

interface InputProp {
  videoId: string | null;
}

export const WatchVideoPageBody: React.FC<InputProp> = ({videoId}) => {
  const [windowWidth, set_windowWidth] = useState<number>(window.innerWidth);
  useEffect(() => {
    const resizeFunc = () => {
      set_windowWidth(window.innerWidth);
    };
    window.addEventListener("resize", resizeFunc);
    return () => window.removeEventListener("resize", resizeFunc);
  }, [windowWidth]);

  const styles: {[key: string]: CSSProperties} = {
      wrapper: {
        width: "80%",
        alignSelf: "center",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignContent: "flex-start",
        gap: '2em',
      },
    };
    return (
      <div style={styles.wrapper}>
        <ReactSection videoId={videoId} />
        <MidSection videoId={videoId} />
        <RightSection videoId={videoId} />
      </div>
    );
};