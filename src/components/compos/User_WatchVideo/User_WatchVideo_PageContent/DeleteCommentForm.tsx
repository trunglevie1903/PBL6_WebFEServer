import React, { FormEvent, MouseEventHandler } from "react";
import checkValidToken from "../../../functions/checkValidToken";
import axios from "axios";

interface InputProp {
  commentId: string;
  closeModal: MouseEventHandler
}

const DeleteCommentForm: React.FC<InputProp> = ({commentId, closeModal}) => {

  const onSubmitDeleteForm = (e: FormEvent) => {
    e.preventDefault();
    if (commentId !== "" && commentId !== null ) {
      try {
        const tryUpdateComment = async () => {
          if (await checkValidToken()) {
            const response = await axios.post(`http://127.0.0.1:4000/comment/delete/${commentId}`, {}, {
              headers: {
                "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
              }
            });
            console.log(response.data)
            if (response.data && response.data.message === "Comment is deleted") alert('Comment is deleted');
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
      <form onSubmit={onSubmitDeleteForm} style={styles.modal}>
        <h4 style={{padding: "5px"}}>Delete your comment?</h4>
        <div style={styles.buttonContainer}>
          <button type="button" onClick={closeModal} style={styles.cancelButton}>
            No
          </button>
          <button type="submit" style={styles.submitButton}>
            Yes
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

export default DeleteCommentForm;