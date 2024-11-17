import React, { FormEvent, MouseEventHandler, useState } from "react";
import checkValidToken from "../../../functions/checkValidToken";
import axios from "axios";

interface InputProp {
  commentId: string;
  content: string;
  closeModal: MouseEventHandler
}

const UpdateCommentForm: React.FC<InputProp> = ({commentId, content, closeModal}) => {
  const [newContent, set_newContent] = useState<string>(content);

  const onSubmitUpdateForm = (e: FormEvent) => {
    e.preventDefault();
    if (commentId !== "" && commentId !== null && newContent !== "" && newContent !== null) {
      try {
        const tryUpdateComment = async () => {
          const data = {newContent};
          if (await checkValidToken()) {
            const response = await axios.post(`http://127.0.0.1:4000/comment/update/${commentId}`, data, {
              headers: {
                "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
              }
            });
            if (response.data && response.data.newComment) alert('Comment is updated');
          }
        };
        tryUpdateComment();
      } catch (error) {
        console.error(error);
        alert(error);
      }
    }
  };

  return (
    <div style={styles.overlay}>
      <form onSubmit={onSubmitUpdateForm} style={styles.modal}>
        <h4>Change your comment</h4>
        <div style={{padding: "5px"}}>
          <input style={{width: "100%", padding: "5px", borderRadius: "5px"}} type="text" value={newContent} onChange={(e) => set_newContent(e.target.value)} />
        </div>
        <div style={styles.buttonContainer}>
          <button type="button" onClick={closeModal} style={styles.cancelButton}>
            Close
          </button>
          <button type="submit" style={styles.submitButton}>
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed" as const,
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modal: {
    position: "relative" as const,
    backgroundColor: "white",
    borderRadius: "8px",
    padding: "20px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    width: "400px",
    maxWidth: "90%",
    zIndex: 1000,
  },
  textarea: {
    width: "100%",
    height: "80px",
    padding: "10px",
    margin: "10px 0",
    border: "1px solid #ccc",
    borderRadius: "4px",
    resize: "none" as const,
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "10px",
    zIndex: 1000,
  },
  cancelButton: {
    backgroundColor: "#f44336",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "4px",
    cursor: "pointer",
    zIndex: 1000,
  },
  submitButton: {
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "4px",
    cursor: "pointer",
    zIndex: 1000,
  },
};

export default UpdateCommentForm;