import React, {useState, CSSProperties} from "react";
import { useNavigate } from "react-router-dom";

export const SignInBtn: React.FC = () => {
  const navigate = useNavigate();
  const handleClick = () => navigate('/sign-in');
  const [isHovered, setHover] = useState<boolean>(false);
  const styles: {[key: string]: CSSProperties} = {
    btn: {
      width: "8em",
      height: "2.5em",
      padding: ".5em",
      border: "none",
      borderRadius: ".25em",
      cursor: "pointer",
      backgroundColor: isHovered ? "#bbb" : "transparent",
      transition: "all .3s ease",
    },
  };
  return (
    <button style={styles.btn} onClick={handleClick}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
    >
      Sign In
    </button>
  );
};