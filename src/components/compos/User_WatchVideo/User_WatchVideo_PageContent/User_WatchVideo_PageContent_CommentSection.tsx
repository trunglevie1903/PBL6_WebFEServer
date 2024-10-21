import React, { CSSProperties, useEffect, useState } from "react";
import User_WatchVideo_PageContent_CommentSection_CommentCard from "./User_WatchVideo_PageContent_CommentSection_CommentCard";
import axios from "axios";
import User_WatchVideo_PageContent_CommentSection_DirectReplyForm from "./User_WatchVideo_PageContent_CommentSection_DirectReplyForm";

interface VideoProp {
  videoId: string;
};

interface DirectCommentObject {
  commentId: string;
  hasChildComment: boolean;
}

// const defaultList: DirectCommentObject[] = [
//   {commentId: "1", hasChildComment: false},
//   {commentId: "2", hasChildComment: false},
//   {commentId: "3", hasChildComment: false},
//   {commentId: "4", hasChildComment: false},
// ];

const User_WatchVideo_PageContent_CommentSection: React.FC<VideoProp> = ({videoId}) => {
  const [comments, setComments] = useState<DirectCommentObject[]>([]);
  // Send requests to BE to get the id of all direct comments.
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:4000/comments/get-direct-comment/${videoId}`);
        if (axios.isAxiosError(response) || response.status !== 200) throw response;
        console.log('direct comments data: ', response.data);
        // Do something with the response data
        if ("list" in response.data) {
          setComments(response.data.list);
        }
        // setCommentIds([1, 2, 3, 4]);
      } catch (error) {
        alert(`Error: ${error}`);
      }
    };
    fetchData();
  }, [videoId]);
  // console.log(videoId);

  const styles: {[key: string]: CSSProperties} = {
    wrapper: {
      padding: "10px",
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      justifyContent: "flex-start",
      // alignItems: "center",
    },
    header: {

    },
    
  };

  return (
    <div style={styles.wrapper}>
      <h2>Comments</h2>
      <User_WatchVideo_PageContent_CommentSection_DirectReplyForm videoId={videoId} />
      {comments.map((item) => <User_WatchVideo_PageContent_CommentSection_CommentCard key={item.commentId} commentId={item.commentId} hasChildComment={item.hasChildComment}/>)}
    </div>
  );
};

export default User_WatchVideo_PageContent_CommentSection;