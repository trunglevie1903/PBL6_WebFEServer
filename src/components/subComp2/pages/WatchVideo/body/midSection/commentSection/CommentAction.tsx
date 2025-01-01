import React, {CSSProperties, MouseEventHandler} from "react";
import { ShowReplyBtn } from "./ShowReplyBtn";

interface CommentActionProp {
  handleShowReplyForm: MouseEventHandler;
  handleShowReplies: MouseEventHandler;
  isRepliesShowed: boolean;
  hasChildReplies: boolean;
}

export const CommentAction: React.FC<CommentActionProp> = ({handleShowReplyForm, handleShowReplies, isRepliesShowed, hasChildReplies}) => {
  const styles: {[key: string]: CSSProperties} = {
    wrapper: {
      width: "100%",
      display: "inline-flex",
      flexDirection: "row",
      flexWrap: "nowrap",
      justifyContent: "flex-start",
      alignContent: "flex-start"
    },
    btn: {
      height: "3rem",
      width: "6rem",
      padding: ".5rem",
      cursor: "pointer",
      border: "none",
      backgroundColor: "transparent",
    }
  };
  return (
    <div style={styles.wrapper}>
      {hasChildReplies && <ShowReplyBtn handleClick={handleShowReplies} isRepliesShowed={isRepliesShowed} />}
      <button style={styles.btn} onClick={handleShowReplyForm}>
        Reply
      </button>
    </div>
  );
};