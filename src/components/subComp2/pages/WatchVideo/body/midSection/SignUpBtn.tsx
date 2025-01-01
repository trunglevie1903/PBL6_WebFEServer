import React, {useState, CSSProperties} from "react";
import { useNavigate } from "react-router-dom";

export const SignUpBtn: React.FC = () => {
  const navigate = useNavigate();
  const handleClick = () => navigate("/sign-up");
  const [isHovered, setHover] = useState<boolean>(false);
  const styles: {[key: string]: CSSProperties} = {
    btn: {
      width: "8em",
      height: "2.5em",
      padding: ".5em",
      border: "none",
      borderRadius: ".25em",
      cursor: "pointer",
      backgroundColor: isHovered ? "#2d2" : "#2a2",
      transition: "all .3s ease",
    },
  };
  return (
    <button style={styles.btn} onClick={handleClick}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
    >
      Sign Up
    </button>
  );
};