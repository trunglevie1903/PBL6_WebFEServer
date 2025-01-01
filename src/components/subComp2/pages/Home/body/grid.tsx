import React, { useState, CSSProperties, useEffect } from "react";
import { DefaultVideoCard } from "./videoCard/VideoCard";

interface InputProp {
  videoIds: string[];
};

export const VideoCardGrid: React.FC<InputProp> = ({videoIds}) => {
  const [windowWidth, set_windowWidth] = useState<number>(window.innerWidth);
  useEffect(() => {
    const resizeFunc = () => {
      set_windowWidth(window.innerWidth);
    };
    window.addEventListener("resize", resizeFunc);
    return () => window.removeEventListener("resize", resizeFunc);
  }, [windowWidth]);

  const [gridTemplateColumns, set_gridTemplateColumns] = useState<string>("auto");
  useEffect(() => {
    let str: string = "auto";
    for (let i = 0; i < (windowWidth - 700)/350; ++i) str = str.concat(" auto");
    set_gridTemplateColumns(str);
  }, [windowWidth]);
  const styles: {[key: string]: CSSProperties} = {
    wrapper: {
      width: "100%",
      paddingLeft: "auto",
      paddingRight: "auto",
      marginTop: "3em",
      display: "grid",
      gridTemplateColumns: gridTemplateColumns,
      gap: "1.5em",
      justifyContent: "center",
    }
  };
  return (
    <div style={styles.wrapper}>
      {videoIds.map((item, index) => <DefaultVideoCard key={index} videoId={item}/>)}
    </div>
  );
};


  

  