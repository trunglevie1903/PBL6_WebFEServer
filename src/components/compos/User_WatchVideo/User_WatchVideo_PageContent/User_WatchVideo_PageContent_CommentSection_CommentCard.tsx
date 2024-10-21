import React, {CSSProperties, MouseEventHandler, useEffect, useState} from "react";
import axios from "axios";

const getRandomInteger = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};
// With input commentId, fetch the data of the comment having index of commentId (comment's content and writer)
// With input userId of comment's writer, fetch the data of user profile: username and avatar image
// With input commentId, fetch the data of this comment's child comments: count and index list

interface InputProp {
  commentId: string;
  hasChildComments: boolean;
}

interface CommentInterface {
  commentId: string;
  userId: string;
  videoId: string;
  parentCommentId: string | null;
  content: string;
  createdAt: string;
}

const User_WatchVideo_PageContent_CommentSection_CommentCard: React.FC<InputProp> = ({commentId, hasChildComments}) => {
  const [isReplyFormShow, setReplyFormShow] = useState<boolean>(false);
  const [hasChild, setHasChild] = useState<boolean>(hasChildComments);
  const [isReplyCommentsShow, setReplyCommentsShow] = useState<boolean>(false);
  const [childCommentsList, setChildCommentList] = useState();

  // const [comment, setComment] = useState<CommentInterface>();
  const [username, setUsername] = useState<string>("User");
  const [avatarImageSource, setAvatarImageSource] = useState<string>("https://placehold.co/40");
  
  const [userId, setUserId] = useState("");
  const [videoId, setVideoId] = useState("");
  const [parentCommentId, setParentCommentId] = useState("");
  const [content, setContent] = useState("");
  const [createdAt, setCreatedAt] = useState(new Date().toLocaleString());

  // Request to get comment's data
  useEffect(() => {
    const fetchComment = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:4000/comments/get-comment-content/${commentId}`);
        if (axios.isAxiosError(response) || response.status !== 200) throw response;
        console.log('response data: ', response.data);
        if ('comment' in response.data) {
          const commentData: CommentInterface = response.data.comment;
          setUserId(commentData.userId);
          setVideoId(commentData.videoId);
          setParentCommentId(commentData.parentCommentId);
          setContent(commentData.content);
          setCreatedAt(commentData.createdAt);
        }
      } catch (error) {
        alert(`Error: ${error}`);
      }
    };
    fetchComment();
  }, [commentId]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setUsername("Username");
        setAvatarImageSource("https://placehold.co/40");
      } catch (error) {
        alert(`Error: ${error}`);
      } 
    };
    fetchUser();
  }, [userId]);

  const handleClickShowReplyForm: MouseEventHandler = (event) => {
    event.preventDefault();
    setReplyFormShow(!isReplyFormShow);
  };

  const handleClickShowReplyComments: MouseEventHandler = (event) => {
    event.preventDefault();
    setReplyCommentsShow(!isReplyCommentsShow);
  };

  const styles: {[key: string]: CSSProperties} = {
    commentCard: {
      display: "flex",
      marginBottom: "15px",
      gap: "10px",
    },
    commentAvatar: {
      // marginRight: "10px"
    },
    commentAvatar_image: {
      width: "40px",
      height: "40px",
      borderRadius: "50%",
    },
    commentContent: {
      flex: 1,
    },
    commentHeader: {
      display: "flex",
      alignItems: "center",
      marginBottom: "5px",
      gap: "15px"
    },
    commentUsername: {},
    commentTime: {
      color: "gray",
      fontSize: "12px",
    },
    commentText: {
      marginBottom: "10px"
    },
    commentAction: {
      position: "relative",
    },
    replyButton: {
      background: "none",
      border: "none",
      color: "blue",
      cursor: "pointer",
      padding: 0,
      fontSize: "14px",
    },
    replyForm: {
      display: isReplyFormShow ? "block" : "none",
      marginTop: "10px",
    },
    replyForm_textarea: {
      width: "100%",
      height: "60px",
      marginBottom: "5px",
      padding: "5px",
    },
    replyForm_button: {
      padding: "5px 10px",
      backgroundColor: "blue",
      color: "white",
      border: "none",
      cursor: "pointer",
    },
    showReplies: {
      display: hasChild ? "block" : "none",
      marginTop: "10px",
    },
    showReplies_button: {
      display: "block",
      background: "none",
      border: "none",
      color: "blue",
      cursor: "pointer",
      padding: 0,
      fontSize: "14px",
    },
    childComments: {
      display: isReplyCommentsShow ? "block" : "none",
      marginTop: "10px",
      paddingLeft: "20px",
    }
  };
  return (
    <>
      {/* <h3>Comments</h3> */}
      <div className="comment-card" style={styles.commentCard}>
        {/* <!-- Left part: Avatar --> */}
        <div className="comment-avatar" style={styles.commentAvatar}>
          <img alt="User Avatar" srcSet={avatarImageSource} style={styles.commentAvatar_image} />
        </div>
        
        {/* <!-- Right part: Text Content --> */}
        <div className="comment-content"  style={styles.commentContent}>
          {/* <!-- First row: Username and time --> */}
          <div className="comment-header" style={styles.commentHeader}>
            <strong className="comment-username" style={styles.commentUsername}>
              {/* {username} */}
              Username
            </strong>
            <span className="comment-time" style={styles.commentTime}>
              {createdAt}
              {/* Wrote at: 00/00/0000 00:00:00 */}
            </span>
          </div>

          {/* <!-- Second row: Comment text --> */}
          <div className="comment-text" style={styles.commentText}>
            {content}
            {/* Comment content */}
          </div>

          {/* <!-- Third row: Reply button --> */}
          <div className="comment-actions" style={styles.commentAction}>
            <button className="reply-btn" style={styles.replyButton} onClick={handleClickShowReplyForm}>Reply</button>
            <div className="reply-form" style={styles.replyForm}>
              <textarea placeholder="Write a reply..." style={styles.replyForm_textarea}></textarea>
              <button style={styles.replyForm_button}>Post Reply</button>
            </div>
          </div>

          {/* <!-- Fourth row: Show replies button --> */}
          <div className="show-replies" style={styles.showReplies}>
            <button className="show-replies-btn" style={styles.showReplies_button} onClick={handleClickShowReplyComments} >Show replies</button>
            <div className="child-comments" style={styles.childComments}>
              {/* <!-- Child comments will go here --> */}
            </div>
          </div>
        </div>
      </div>

    </>
  )
};

export default User_WatchVideo_PageContent_CommentSection_CommentCard;