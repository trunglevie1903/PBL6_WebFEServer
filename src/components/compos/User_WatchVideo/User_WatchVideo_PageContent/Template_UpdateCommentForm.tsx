import React, { useState } from "react";

const UpdateCommentForm = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Toggle modal visibility
  const onClickUpdateComment: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setIsModalVisible(true); // Show modal
  };

  const closeModal = () => {
    setIsModalVisible(false); // Hide modal
  };

  return (
    <div>
      <button onClick={onClickUpdateComment}>Update Reply</button>

      {/* Modal */}
      {isModalVisible && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <h2>Update Reply</h2>
            {/* Placeholder for your form */}
            <form>
              <textarea placeholder="Edit your reply..." style={styles.textarea}></textarea>
              <div style={styles.buttonContainer}>
                <button type="button" onClick={closeModal} style={styles.cancelButton}>
                  Cancel
                </button>
                <button type="submit" style={styles.submitButton}>
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
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
    backgroundColor: "white",
    borderRadius: "8px",
    padding: "20px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    width: "400px",
    maxWidth: "90%",
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
  },
  submitButton: {
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default UpdateCommentForm;
