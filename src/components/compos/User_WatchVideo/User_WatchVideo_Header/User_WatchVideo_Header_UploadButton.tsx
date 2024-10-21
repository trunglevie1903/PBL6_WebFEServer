import React, {CSSProperties, MouseEventHandler} from 'react';

import checkValidToken from '../../../functions/checkValidToken';

const User_WatchVideo_Header_UploadButton: React.FC = () => {
  // const [showModal, setShowModal] = useState(false);

  const handleButtonClick: MouseEventHandler = (event) => {
    event.preventDefault();
    checkValidToken().then(val => {
      if (val) window.location.href = "/upload-video";
      else alert("Please log in to use this feature");
    });
  };

  const styles: {[key: string]: CSSProperties} = {
    mainButton: {
      background: "none",
      padding: "10px 20px",
      border: "1px solid #ddd",
      borderRadius: "5px",
      textDecoration: "none",
      cursor: "pointer",
      color: "black"
    },
  };

  return (
    <>
      <button style={styles.mainButton} onClick={handleButtonClick}>Upload</button>
    </>
  );
};

export default User_WatchVideo_Header_UploadButton;