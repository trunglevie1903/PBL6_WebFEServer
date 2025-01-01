import React, {useState, CSSProperties} from "react";

import { useAuth } from "../../../../../contexts/AuthContext";

export const SignOutOption: React.FC = () => {
  const [isHovering, set_isHovering] = useState<boolean>(false);
  const setHovered = () => {
    set_isHovering(true);
  };
  const setNotHovered = () => {
    set_isHovering(false);
  }

  const {signOut} = useAuth();
    const handleClick = () => {
      signOut();
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
      cursor: "pointer",
      textTransform: "capitalize",
    },
  };
  return (
    <p 
      style={styles.wrapper} onClick={handleClick}
      onMouseEnter={setHovered} onMouseLeave={setNotHovered}
    >
      Sign Out
    </p>
  );
};