import React, {CSSProperties} from "react";
import { VideoCard } from "./VideoCard";
import { UserReplyForm } from "./UserReplyForm";
import { CommentSection } from "./commentSection/CommentSection";

interface InputProp {
  videoId: string | null;
}

export const MidSection: React.FC<InputProp> = ({videoId}) => {
  const styles: {[key: string]: CSSProperties} = {
    wrapper: {
      width: "60%",
      display: "flex",
      flexDirection: "column",
      flexWrap: "nowrap",
      gap: "1em",
    }
  };
  return (
    <div style={styles.wrapper}>
      <VideoCard videoId={videoId}/>
      <UserReplyForm videoId={videoId} />
      <CommentSection videoId={videoId} />
    </div>
  );
};