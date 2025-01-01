import React, {useState, CSSProperties} from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../../../../contexts/AuthContext";

export const MyAccountOption: React.FC = () => {
  const [isHovering, set_isHovering] = useState<boolean>(false);
  const setHovered = () => {
    set_isHovering(true);
  };
  const setNotHovered = () => {
    set_isHovering(false);
  }

  const navigate = useNavigate();
  const {checkToken, checkTokenValidity} = useAuth();
  const handleClick = () => {
    // navigate("/my-account");

    // soft check if client is an authenticated user
    const process = async () => {
      if (await checkTokenValidity() === false) {
        alert("Please sign in");
      } else {
        navigate("/my-account");
      }
    };
    process();
  };

  const styles: {[key: string]: CSSProperties} = {
    wrapper: {
      height: "2rem",
      width: "9rem",
      border: "none",
      backgroundColor: isHovering ? "#ddd" : "#fff",
      transition: "all 0.3s ease",
      alignContent: "center",
      textAlign: "center",
      textTransform: "capitalize",
      cursor: "not-allowed",
    },
  };
  return (
    <p 
      style={styles.wrapper} onClick={handleClick}
      onMouseEnter={setHovered} onMouseLeave={setNotHovered}
    >
      My Account
    </p>
  );
};