import axios from "axios";
import React, {CSSProperties, useEffect, useState} from "react";

interface InputProp {
  videoId: string | null;
};

export const VideoTitle: React.FC<InputProp> = ({videoId}) => {
  const [str, setStr] = useState<string>("");
  useEffect(() => {
    const process = async () => {
      if (videoId !== null && videoId !== undefined && videoId.trim() !== "") {
        try {
          const response = await axios.get(`http://127.0.0.1:4000/video/get-video-title/${videoId}`);
          if (response.data && response.data.message === "request succeed") {
            setStr(response.data.title);
          }
        } catch (error) {
          console.error(axios.isAxiosError(error) ? error.message : error);
        }
      }
    };
    process();
  }, [videoId]);
  const styles: {[key:string]: CSSProperties} = {
    text: {
      width: "100%",
      padding: "0.5em",
      fontSize: "1.5em",
      fontWeight: "bold",
    }
  }
  return (
    <p style={styles.text}>
      {str}
    </p>
  );
};