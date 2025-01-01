import axios from "axios";
import React, {CSSProperties, useState} from "react";
import { useAuth } from "../../../../../../contexts/AuthContext";

interface InputProp {
  videoId: string | null;
}

export const VideoMedia: React.FC<InputProp> = ({videoId}) => {
  const source = videoId ? `http://127.0.0.1:4000/video/get-video-stream/${videoId}` : undefined;
  const [isPlayed, setPlayed] = useState<boolean>(false);
  const {username} = useAuth();
  const handlePlayed = () => {
    console.log("handling play video event");
    setTimeout(() => {
      const process = async () => {
        if (!isPlayed && videoId !== null && videoId !== undefined && videoId.trim() !== "") {
          const response = await axios.post(`http://127.0.0.1:4000/video/add-watch/${videoId}`, {username});
          console.log(response.data.message);
          setPlayed(true);
        }
      };
      process();
    }, 5000);
  };
  const styles: {[key: string]: CSSProperties} = {
    vid: {
      aspectRatio: "16/9",
      width: "100%",
      objectFit: "contain",
      backgroundColor: "#000",
      borderRadius: "1em",
    },
  };
  return (
    <video style={styles.vid} controls onPlay={handlePlayed}>
      <source type='video/mp4' src={source}/>
      Your browser does not support the video tag
    </video>
  );
};