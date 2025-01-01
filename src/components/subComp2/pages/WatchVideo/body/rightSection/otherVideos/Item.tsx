import { CSSProperties, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ItemThumbnail } from "./ItemThumbnail";
import { ItemTitle } from "./ItemTitle";
import axios from "axios";

interface InputProp {
  videoId: string | null;
}

export const SectionItem: React.FC<InputProp> = ({videoId}) => {
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
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/video/${videoId}`);
  };
  const styles: {[key: string]: CSSProperties} = {
    wrapper: {
      height: "3.5rem",
      width: '100%',
      marginBottom: "0.5em",
      overflow: "hidden",
      cursor: "pointer",
      display: "flex",
      flexDirection: "row",
      flexWrap: "nowrap",
    }
  };
  return (
    <div onClick={handleClick} style={styles.wrapper}>
      <ItemThumbnail source={thumbnail} />
      <ItemTitle str={title} />
    </div>
  );
};