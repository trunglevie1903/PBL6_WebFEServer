import React, {CSSProperties} from "react";
import { CommentCard } from "./CommentCard";

interface InputProp {
  commentIds: string[];
}

export const ChildReplyList: React.FC<InputProp> = ({commentIds}) => {
  const styles: {[key: string]: CSSProperties} = {
    wrapper: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      flexWrap: "nowrap",
      justifyContent: "flex-start",
      alignItems: "flex-start",
    }
  };
  return (
    <div style={styles.wrapper}>
      {
        commentIds.map((i, index) => <CommentCard key={index} commentId={i}/>)
      }
    </div>
  );
};