import React, {CSSProperties, useEffect, useRef, useState} from "react";
import { Avt } from "./Avt";
import { CreatorUsername } from "./CreatorUsername";
import { WatchCountAndUploadSince } from "./WatchCountAndUploadSince";
import axios from "axios";

interface InputProp {
  videoId: string | null;
}

export const VideoBasicInformation: React.FC<InputProp> = ({
  videoId
}) => {
  const [username, setUsername] = useState<string>("");
  const hasLoadedData = useRef(false);
  useEffect(() => {
    const process = async () => {
      if (!hasLoadedData.current && videoId !== null && videoId.trim() !== "") {
        try {
          const response = await axios.get(`http://127.0.0.1:4000/video/get-creator-username/${videoId}`);
          if (response.data && response.data.message === "request succeed") {
            if (typeof response.data.username === "string") setUsername(response.data.username);
          }
        } catch (error) {
          console.error(error);
        }
      }
    };
    process();
  }, [videoId]);
  const styles: {[key: string]: CSSProperties} = {
    wrapper: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "nowrap",
      justifyContent: "flex-start",
      alignItems: "center"
    },
    notAvtWrapper: {
      display: "flex",
      flexDirection: "column",
      flexWrap: "nowrap",
      justifyContent: "flex-start",
      alignItems: "flex-start",
    },
  };
  return (
    <div style={styles.wrapper}>
      <Avt _username={username} />
      <div style={styles.notAvtWrapper}>
        <CreatorUsername str={username} />
        <WatchCountAndUploadSince videoId={videoId} />
      </div>
    </div>
  );
};