import React, {useRef, useEffect, CSSProperties, MutableRefObject, useState} from "react";
import { CommentCard } from "./CommentCard";
import axios from "axios";

interface InputProp {
  videoId: string | null;
}

export const CommentSection: React.FC<InputProp> = ({videoId}) => {
  const [commentIds, set_commentIds] = useState<string[]>([]);
  const hasLoadedData = useRef(false);
  // useEffect(() => {
  //   commentIds.current = ["", "", "", "", ""];
  // }, []);
  useEffect(() => {
    const process = async () => {
      try {
        if (!hasLoadedData.current && videoId !== null && videoId !== undefined && videoId.trim() !== "") {
          const response = await axios.get(`http://127.0.0.1:4000/comment/get-direct-comment-ids/${videoId}`);
          if (response.data && response.data.message === "request succeed") {
            console.log("comment ids: ", response.data.ids);
            set_commentIds(response.data.ids);
            hasLoadedData.current = true;
          }
        } else throw new Error("Invalid videoId");
      } catch (error) {
        console.error(axios.isAxiosError(error) ? error.message : error);
      }
    };
    process();
  }, [videoId]);

  const styles: {[key: string]: CSSProperties} = {
    wrapper: {
      display: "flex",
      flexDirection: "column",
      flexWrap: 'nowrap',
    },
    headerWrapper: {
      width: "100%",
      marginBottom: "1em",
    },
    text: {
      textTransform: "uppercase",
      fontWeight: "bold",
      // paddingLeft: "1em",
      fontSize: "1.5em",
    }
  };
  return (
    <div>
      <div style={styles.headerWrapper}>
      <p style={styles.text}>
        Comments
      </p>
      <hr />
    </div>
      <div style={styles.wrapper}>
        {commentIds.map((item, index) => <CommentCard key={index} commentId={item} videoId={videoId}/>)}
      </div>
    </div>
  );
};