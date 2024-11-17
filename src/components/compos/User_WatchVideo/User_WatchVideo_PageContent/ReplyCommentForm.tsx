import axios from "axios";
import React, { FormEvent, useState } from "react";
import checkValidToken from "../../../functions/checkValidToken";

interface InputProp {
  videoId: string;
  parentCommentId: string | null;
}

const ReplyCommentForm: React.FC<InputProp> = ({videoId, parentCommentId}) => {
  const [content, set_content] = useState<string>("");

  // handle submit form
  const onSubmitForm = (e: FormEvent) => {
    e.preventDefault();
    // validate data
    const requestCreateComment = async () => {
      const data = {
        videoId,
        parentCommentId,
        content
      };
      if (await checkValidToken()) {
        try {
          const accessToken = localStorage.getItem('accessToken');
          const response = await axios.post(`http://127.0.0.1:4000/comment/create`, data, {
            headers: {
              'Authorization': `Bearer ${accessToken}`
            }
          });
          if (response.data && response.data.comment) {
            alert("Comment created");
          }
        } catch (error) {
          console.error(error);
        }
      }
    };
    if (videoId && content) {
      requestCreateComment()
    }
  };

  return (
    <form onSubmit={onSubmitForm}  style={{padding: "5px"}}>
      <div style={{marginBottom: "5px"}}>
        <input style={{padding: "5px", width: "100%", borderRadius: "5px"}} type="text" placeholder="Write your comment here..." value={content} onChange={(e) => set_content(e.target.value)}/>
      </div>
      <button style={{padding: "5px"}} type="submit">Reply</button>
    </form>
  );
};

export default ReplyCommentForm;