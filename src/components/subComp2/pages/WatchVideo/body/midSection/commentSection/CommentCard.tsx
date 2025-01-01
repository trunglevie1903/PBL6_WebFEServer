import axios from "axios";
import React, { CSSProperties, useEffect, useRef, useState } from "react";
import { Avt } from "./Avt";
import { CommentText } from "./CommentText";
import { CommentAction } from "./CommentAction";
import { ReplyForm } from "./ReplyForm";
import { ChildReplyList } from "./ChildReplyList";
import { useAuth } from "../../../../../../../contexts/AuthContext";

interface InputProp {
  commentId: string | null;
  videoId: string | null;
}

const generateRandomCommentIds = (): string[] => {
  const itemCount: number = Math.floor(Math.random() * 2);
  return (itemCount ? ["abc"] : []);
}

export const CommentCard: React.FC<InputProp> = ({commentId, videoId}) => {
  console.log("comment card loading");
  const [showReplyForm, set_showReplyForm] = useState<boolean>(false);
  const {checkTokenValidity} = useAuth();
  const handleClickShowReplyBtn = () => {
    const process = async () => {
      if (await checkTokenValidity()) set_showReplyForm(!showReplyForm);
      else alert("Please sign in");
    };
    process();
  };
  const [childCommentIds, set_childCommentIds] = useState<string[]>(generateRandomCommentIds());
  const [hasChildReplies, set_hasChildReplies] = useState<boolean>(false);
  const [showReplies, set_showReplies] = useState<boolean>(false);
  const handleClickShowReplies = () => set_showReplies(hasChildReplies && !showReplies);

  const [creatorUsername, set_creatorUsername] = useState<string>("");
  const [commentText, set_commentText] = useState<string>("");
  const [parentCommentId, set_parentCommentId] = useState<string | null>("");

  useEffect(() => {
    const fetchCommentCreatorUsernameAndText = async () => {
      if (commentId !== null && commentId !== undefined && commentId.trim() !== "") {
        try {
          const response = await axios.get(`http://127.0.0.1:4000/comment/content-data/${commentId}`);
          if (response.data && response.data.message === "request succeed") {
            if (typeof response.data.creatorUsername === "string") set_creatorUsername(response.data.creatorUsername);
            if (typeof response.data.commentText === "string") set_commentText(response.data.commentText);
            set_parentCommentId(response.data.parentCommentId);
            console.log(parentCommentId);
          } else throw response;
        } catch (error) {
          console.error(axios.isAxiosError(error) ? error.message : error);
        }
      } else throw new Error("Invalid input data field");
    };
    fetchCommentCreatorUsernameAndText();
  }, [commentId, videoId]);
  useEffect(() => {
    const fetchChildReplies = async () => {
      if (commentId !== null && commentId !== undefined && commentId.trim() !== "") {
        try {
          const response = await axios.get(`http://127.0.0.1:4000/comment/child-comments/${commentId}`);
          if (response.data && response.data.message === "request succeed") {
            if (Array.isArray(response.data.ids)) {
              set_hasChildReplies(response.data.ids.length > 0);
              set_childCommentIds(response.data.ids);
            }
          } else throw response;
        } catch (error) {
          console.error(axios.isAxiosError(error) ? error.message : error);
        }
      }
    };
    fetchChildReplies();
    // set_hasChildReplies(childCommentIds.current.length > 0);
  }, [commentId]);

  const styles: {[key: string]: CSSProperties} = {
    wrapper: {
      width: "100%",
      display: "inline-flex",
      flexDirection: "row",
      flexWrap: "nowrap",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: "1em",
    },
    notAvtWrapper: {
      width: "calc(100% - 3rem)",
      display: "flex",
      flexDirection: "column",
      flexWrap: "nowrap",
      justifyContent: "center",
      alignItems: "flex-start",
    },
  };
  return (
    <div style={styles.wrapper}>
      <Avt _username={creatorUsername} />
      <div style={styles.notAvtWrapper}>
        <CommentText str={commentText || ""} />
        <CommentAction handleShowReplyForm={handleClickShowReplyBtn} hasChildReplies={hasChildReplies} isRepliesShowed={showReplies} handleShowReplies={handleClickShowReplies}/>
        {showReplyForm && <ReplyForm videoId={videoId} parentCommentId={commentId} />}
        {hasChildReplies && showReplies && <ChildReplyList commentIds={childCommentIds} />}
      </div>
    </div>
  );
};