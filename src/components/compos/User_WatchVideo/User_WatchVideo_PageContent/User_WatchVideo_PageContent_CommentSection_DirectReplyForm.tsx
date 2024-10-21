import React, { CSSProperties, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from 'axios';
import checkValidToken from "../../../functions/checkValidToken";

interface VideoProp {
  videoId: string;
};

interface ReplyData {
  content: string;
  parentCommentId: string | null;
  videoId: string;
}

const User_WatchVideo_PageContent_CommentSection_DirectReplyForm: React.FC<VideoProp> = ({videoId}) => {
  const {register, handleSubmit, formState: {errors}} = useForm<ReplyData>();

  // Handle submit form
  // 1. Prepare input data
  // 2. Send request to BE
  // 3. Show UI based on response (succeed or not)
  const onSubmit: SubmitHandler<ReplyData> = async (data) => {
    try {
      checkValidToken().then(val => {
        if (val) {
          console.log('reply data: ', data);
          const createReply = async () => {
            const response = await axios.post(`http://127.0.0.1:4000/comments/create-comment`,
              data,
              {headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
              }}
            );
            console.log(`create reply response: `, response);
            if (axios.isAxiosError(response) || response.status !== 201) throw response;
            alert("Reply is successfully created! Reload the page to see");
          };
          createReply();
        } else {
          alert("Not logged in");
        }
      });
    } catch (error) {
      alert(`Error: ${error}`);
    }
  };

  const styles: {[key: string]: CSSProperties} = {
    directReplyForm: {

    },
    directReplyForm_textarea: {
      width: "100%",
      height: "60px",
      marginBottom: "5px",
      padding: "5px",
      border: "1px solid #ddd",
      borderRadius: "5px",
    },
    directReplyForm_button: {
      padding: "5px 10px",
      backgroundColor: "#aaa",
      color: "black",
      border: "none",
      cursor: "pointer",
      borderRadius: "5px",
    }
  };

  return (
    <div className="comment-actions">
      <div className="reply-form" style={styles.directReplyForm}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div style={{paddingBottom: "10px"}}>
            <textarea placeholder="Write a reply..." style={styles.directReplyForm_textarea} {...register('content', {required: true})}></textarea>
            {errors.content && <span style={{color: "red", fontSize: "12px"}}>{errors.content.message || "Content must not be empty"}</span>}
          </div>
          <input type="hidden" {...register("parentCommentId", {value: null})} />
          <input type="hidden" {...register("videoId", {value: videoId})} />
          <div>
            <button style={styles.directReplyForm_button}>Post Reply</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default User_WatchVideo_PageContent_CommentSection_DirectReplyForm;