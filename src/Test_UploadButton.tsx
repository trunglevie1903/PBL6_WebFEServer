import React, { useState, CSSProperties } from 'react';
import './App.css'; // Add custom styles for the modal

const Test_UploadButton = () => {
  const [showModal, setShowModal] = useState(false);

  const handleButtonClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleLogin = () => {
    alert('Log in clicked!');
    setShowModal(false); // Close modal after login
  };

  const styles: {[key: string]: CSSProperties} = {
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
  };

  return (
    <div className="App">
      <button onClick={handleButtonClick}>Open Modal</button>

      {showModal && (
        <div style={styles.modal} className="modal">
          <div style={styles.modalContent} className="modal-content">
            <h2>Choose an Action</h2>
            <button style={styles.button} onClick={handleLogin}>Log In</button>
            <button style={styles.button} onClick={handleCloseModal}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Test_UploadButton;
