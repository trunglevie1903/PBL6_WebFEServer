import axios from "axios";
import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
import User_WatchVideo_PageContent_CommentSection_CommentCard from "./User_WatchVideo_PageContent_CommentSection_CommentCard";
import ReplyCommentForm from "./ReplyCommentForm";

interface InputProp {
  videoId: string;
}

const User_WatchVideo_PageContent_CommentSection: React.FC<InputProp> = ({videoId}) => {
  // const {videoId} = useParams();
  const [commentIds, set_commentIds] = useState<string[]>([]);

  useEffect(() => {
    const fetchCommentIds = async () => {
      try {
        if (videoId) {
          const response = await axios.get(`http://127.0.0.1:4000/comment/video/${videoId}`);
          console.log(response.data);
          if (response.data && response.data.ids) {
            set_commentIds(response.data.ids);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchCommentIds();
  }, [videoId]);

  return (
    <div style={{padding: "5px"}}>
      <h3>Comment</h3>
      <ReplyCommentForm videoId={videoId} parentCommentId={null} />
      <hr />
      {commentIds.map(item => <User_WatchVideo_PageContent_CommentSection_CommentCard key={item} commentId={item} />)}
    </div>
  );
};

export default User_WatchVideo_PageContent_CommentSection;