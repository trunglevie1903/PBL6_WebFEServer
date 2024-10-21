import React, {CSSProperties, MouseEventHandler, useState} from "react";

import checkValidToken from "../../functions/checkValidToken";

const User_HomePage_Header_UploadButton: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  const handleButtonClick: MouseEventHandler = (event) => {
    event.preventDefault();
    // setShowModal(true);
    // Check if the user is authenticated
    checkValidToken().then(val => {
      // If yes => redirect to upload video form
      if (val) window.location.href = "/upload-video";
      else {
        // If no => show an alert with message like "need to log in"
        alert("Please log in to use this feature");
      }
    });
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleLogin = () => {
    // alert('Log in clicked!');
    setShowModal(false); // Close modal after login
  };

  const styles: {[key: string]: CSSProperties} = {
    mainButton: {
      background: "none",
      padding: "10px 20px",
      border: "1px solid #ddd",
      borderRadius: "5px",
      textDecoration: "none",
      cursor: "pointer",
      color: "black",
    },
    modal: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 6, 0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    },
    modalContent: {
      backgroundColor: "white",
      padding: "20px",
      borderRadius: "5px",
      textAlign: "center"
    },
    button: {
      margin: "10px",
      padding: "10px 20px",
      border: "none",
      cursor: "pointer"
    }
  }
  return (
    <>
      <button style={styles.mainButton} onClick={handleButtonClick}>Upload</button>  
      {showModal && (
        <div style={styles.modal} className="modal">
          <div style={styles.modalContent} className="modal-content">
            <h2>Choose an Action</h2>
            <button style={styles.button} onClick={handleLogin}>Log In</button>
            <button style={styles.button} onClick={handleCloseModal}>Cancel</button>
          </div>
        </div>
      )}
    </>
  );
};

export default User_HomePage_Header_UploadButton;