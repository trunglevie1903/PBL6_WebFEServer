import React, { CSSProperties, useEffect, useState } from "react";
import { SectionItem } from "./Item";
import axios from "axios";

interface InputProp {
  videoId: string | null;
}

export const SectionList: React.FC<InputProp> = ({videoId}) => {
  const [videoIds, set_videoIds] = useState<string[]>([]);
  useEffect(() => {
    const process = async () => {
      if (videoId !== null && videoId !== undefined && videoId.trim() !== "") {
        try {
          const response = await axios.get(`http://127.0.0.1:4000/video/100-ids-different-from/${videoId}`)
          if (response.data && response.data.message === "request succeed") {
            // console.log(response.data);
            set_videoIds(response.data.ids);
          };
        } catch (error) {
          console.error(axios.isAxiosError(error) ? error.message : error);
        }
      }
    };
    process();
  }, [videoId]);

  const styles: {[key: string]: CSSProperties} = {
    wrapper: {
      width: "100%",
      overflowY: "scroll",
    }
  };
  return (
    <div style={styles.wrapper}>
      {videoIds.map((item, index) => <SectionItem videoId={item} key={index} />)}
    </div>
  );
};