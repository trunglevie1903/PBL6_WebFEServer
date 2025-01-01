import axios from "axios";
import React, { CSSProperties, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface InputProp {
  videoId: string | null;
}

export const VideoItem: React.FC<InputProp> = ({videoId}) => {
  const [thumbnail, setThumbnail] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  useEffect(() => {
    const process = async () => {
      if (videoId !== null && videoId !== undefined && videoId.trim() !== "") {
        try {
          const response = await axios.get(`http://127.0.0.1:4000/video/thumbnail-and-title/${videoId}`);
          if (response.data && response.data.message === "request succeed") {
            setThumbnail(response.data.thumbnail);
            setTitle(response.data.title);
          } else throw new Error("Error requesting data");
        } catch (error) {
          console.error(axios.isAxiosError(error) ? error.message : error);
        }
      };
    };
    process();
  }, [videoId]);

  const nav = useNavigate();
  const handleClick = () => {
    nav("/video/"+videoId);
  };
  const styles: {[key: string]: CSSProperties} = {
    img: {
      backgroundColor: "#000",
      height: "100%",
      aspectRatio: "16/9",
      objectFit: "contain",
      border: "none"
    },
    wrapper: {
      height: "9rem",
      width: '100%',
      overflow: "hidden",
      cursor: "pointer",
      display: "flex",
      flexDirection: "row",
      flexWrap: "nowrap",
      gap: "1em",
    },
    text: {
      height: "100%",
      fontWeight: "bold",
      overflow: "hidden",
      textOverflow: "ellipsis",
      display: "-webkit-box",
      WebkitLineClamp: 2,
      WebkitBoxOrient: "vertical",
      whiteSpace: "normal",
      padding: "1em",
      fontSize: "1.25em",
      textAlign: "start",
    }
  };
  
  return (
    <div onClick={handleClick} style={styles.wrapper}>
      <img src={thumbnail} alt="thumb" style={styles.img}/>
      <p style={styles.text}>
        {title}
      </p>
    </div>
  );
};