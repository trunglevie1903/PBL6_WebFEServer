import React, { CSSProperties, useEffect, useState } from "react";
import { useAuth } from "../../../../../../contexts/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface InputProp {
  videoId: string | null;
}

export const MyVideoItem: React.FC<InputProp> = ({videoId}) => {
  const [thumbnail, setThumbnail] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    const process = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:4000/video/thumbnail-and-title/${videoId}`);
        if (response.data.message === "request succeed") {
          setThumbnail(response.data.thumbnail);
          setTitle(response.data.title);
        }
      } catch (error) {
        console.error(error);
      }
    };
    process();
  }, []);
  const {checkTokenValidity} = useAuth();
  const navigate = useNavigate();
  const handleDelete = () => {
    const process = async () => {
      try {
        if (await checkTokenValidity() === false) {
          alert("Please sign in");
          navigate("/");
        }
        if (videoId !== null && videoId !== undefined && videoId.trim() !== "") {
          const response = await axios.post(`http://127.0.0.1:4000/video/delete-video/${videoId}`, {}, {});
          if (response.data.message === "request succeed") {
            alert("Video is deleted");
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
    process();
  };
  const styles: {[key: string]: CSSProperties} = {
    wrapper: {
      height: "9rem",
      width: '100%',
      overflow: "hidden",
      display: "flex",
      flexDirection: "row",
      flexWrap: "nowrap",
      gap: "1em",
    },
    img: {
      backgroundColor: "#000",
      height: "100%",
      aspectRatio: "16/9",
      objectFit: "contain",
      border: "none"
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
    <div style={styles.wrapper}>
      <img src={thumbnail} alt="thumb" style={styles.img}/>
      <p style={styles.text}>
        {title}
      </p>
      <div style={{display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
        <p style={{color: "red", padding: "1em", borderRadius: ".5em", cursor: "pointer"}} onClick={handleDelete}>Delete</p>
      </div>
    </div>
  );
};