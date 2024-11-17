import React, {MouseEventHandler, useEffect, useState} from "react";
import axios from "axios";
import checkValidToken from "../../../functions/checkValidToken";
import { jwtDecode, JwtPayload } from "jwt-decode";
import ReplyCommentForm from "./ReplyCommentForm";
import UpdateCommentForm from "./UpdateCommentForm";
import DeleteCommentForm from "./DeleteCommentForm";

interface InputProp {
  commentId: string;
}

const User_WatchVideo_PageContent_CommentSection_CommentCard: React.FC<InputProp> = ({commentId}) => {
  const [userId, set_userId] = useState<string>("");
  const [content, set_content] = useState<string>("");
  const [createdTime, set_createdTime] = useState<string>("");
  const [username, set_username] = useState<string>("");
  const [avatarSource, set_avatarSource] = useState<string>("");
  const [isParent, set_isParent] = useState<boolean>(false);
  const [toShowChildComment, set_toShowChildComment] = useState<boolean>(false);
  const [childCommentIds, set_childCommentIds] = useState<string[]>([]);
  const [isWrittenByClient, set_isWrittenByClient] = useState<boolean>(false);
  const [videoId, set_videoId] = useState<string>("");
  const [toShowReplyForm, set_toShowReplyForm] = useState<boolean>(false);
  const [isUpdateModalVisible, set_isUpdateModalVisible] = useState<boolean>(false);
  const [isDeleteModalVisible, set_isDeleteModalVisible] = useState<boolean>(false);

  // load comment information
  useEffect(() => {
    const fetchCommentData = async () => {
      try {
        if (commentId) {
          const response = await axios.get(`http://127.0.0.1:4000/comment/id/${commentId}`);
          if (response.data && response.data.comment) {
            set_userId(response.data.comment.userId);
            set_content(response.data.comment.content);
            set_createdTime(response.data.comment.createdTime);
            set_videoId(response.data.comment.videoId);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchCommentData();
  }, [commentId]);

  // load information of user who wrote this comment
  useEffect(() => {
    const fetchUserInfo = async () => {
      if (userId) {
        try {
          const response = await axios.get(`http://127.0.0.1:4000/user/profile-mini-card/${userId}`)
          if (response.data && response.data.profile) {
            set_username(response.data.profile.username);
            set_avatarSource(response.data.profile.avatarImage);
          }
        } catch (error) {
          console.error(error);
        }
      }
    };
    fetchUserInfo();
  }, [userId]);

  // check if this comment is a parent comment
  useEffect(() => {
    const checkIsParentComment = async () => {
      try {
        if (commentId) {
          const response = await axios.get(`http://127.0.0.1:4000/comment/is-parent/${commentId}`);
          if (response.data && response.data.message) {
            // console.log(response.data);
            // console.log(response.data.message === "Yes");
            set_isParent(response.data.message === "Yes");
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
    checkIsParentComment();
  }, [commentId]);

  // load child comments
  useEffect(() => {
    const findChildCommentIds = async () => {
      if (commentId && isParent) {
        try {
          const response = await axios.get(`http://127.0.0.1:4000/comment/find-child-comment/${commentId}`);
          if (response.data && response.data.ids) {
            set_childCommentIds(response.data.ids);
          }
        } catch (error) {
          console.error(error);
        }
      }
    };
    findChildCommentIds()
  }, [commentId, isParent]);

  // check is client wrote this comment, then show the update and delete button
  useEffect(() => {
    const checkIfClientWroteThisComment = async () => {
      if (username && await checkValidToken()) {
        try {
          const accessToken = localStorage.getItem('accessToken');
          if (accessToken) {
            const payload = jwtDecode(accessToken) as JwtPayload;
            if ("username" in payload && payload.username === username) {
              return set_isWrittenByClient(true);
            }
          }
        } catch (error) {
          console.error(error);
        }
      }
      set_isWrittenByClient(false);
    };
    checkIfClientWroteThisComment();
  }, [username]);

  // button to set if child comments is shown or not
  const onClickShowChildComment: MouseEventHandler = (e) => {
    e.preventDefault();
    // console.log(`Change show child comment to ${!toShowChildComment}`);
    set_toShowChildComment(!toShowChildComment);
  };

  // handle click on button to show update comment form
  const onClickUpdateComment: MouseEventHandler = (e) => {
    e.preventDefault();
    set_isUpdateModalVisible(true);
  };
  // handle click to close update comment modal
  const onClickCloseUpdateComment: MouseEventHandler = (e) => {
    e.preventDefault();
    set_isUpdateModalVisible(false);
  };

  // handle click on button to show update comment form
  const onClickDeleteCommentModal: MouseEventHandler = (e) => {
    e.preventDefault();
    set_isDeleteModalVisible(true);
  };
  // handle click to close update comment modal
  const onClickCloseDeleteCommentModal: MouseEventHandler = (e) => {
    e.preventDefault();
    set_isDeleteModalVisible(false);
  };

  // handle click on reply button
  const onClickReplyComment: MouseEventHandler = (e) => {
    e.preventDefault();
    set_toShowReplyForm(!toShowReplyForm);
  };
  
  return (
    <div style={{padding: "10px", display: "flex", flexDirection: "row", gap: "10px"}}>
      <div>
        <img style={{width: "40px", height: "40px", borderRadius: "50%"}} src={avatarSource} alt="avatar" />
      </div>
      <div style={{display: "flex", flexDirection: "column", width: "100%"}}>
        <p style={{padding: "5px"}}>
          <span style={{fontWeight: "bold"}}>{username}</span>&nbsp;<span style={{fontSize: "0.7em"}}>{createdTime}</span>
        </p>
        <p style={{padding: "5px"}}>{content}</p>
        <div style={{padding: "5px", display: "flex", flexDirection: "row", justifyContent: "flex-start", gap: "5px"}}>
          <button style={{padding: "5px"}} onClick={onClickReplyComment}>Reply</button>
          {
            isWrittenByClient && 
            <button style={{padding: "5px"}} onClick={onClickUpdateComment}>Update</button>
          }
          {
            isWrittenByClient && 
            <button style={{padding: "5px"}} onClick={onClickDeleteCommentModal}>Delete</button>
          }
        </div>
        {
          toShowReplyForm && 
          <ReplyCommentForm videoId={videoId} parentCommentId={commentId}/>
        }
        {
          isParent && 
          <div style={{padding: "5px"}}>
            <button style={{padding: "5px"}} onClick={onClickShowChildComment}>Show replies</button>
            {
              toShowChildComment && 
              <div style={{}}>
                {childCommentIds.map(item => <User_WatchVideo_PageContent_CommentSection_CommentCard key={item} commentId={item} />)}
              </div>
            }
          </div>
        }
      </div>
      {
        isUpdateModalVisible &&
        <UpdateCommentForm commentId={commentId} content={content} closeModal={onClickCloseUpdateComment}/>
      }{
        isDeleteModalVisible &&
        <DeleteCommentForm commentId={commentId} closeModal={onClickCloseDeleteCommentModal}/>
      }
    </div>
  )
};

export default User_WatchVideo_PageContent_CommentSection_CommentCard;