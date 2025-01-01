import React, {CSSProperties} from "react";
import { useNavigate } from "react-router-dom";

interface InputProp {
  str: string | null;
}

export const CreatorUsername: React.FC<InputProp> = ({str}) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/user/${str}`);
  };

  const styles: {[key: string]: CSSProperties} = {
    text: {
      height: "2em",
      padding: "0.5em",
      width: "100%",
      fontWeight: "bold",
      cursor: "pointer",
    },
  };
  return (
    <p style={styles.text} onClick={handleClick}>
      {str ? `@${str}` : ""}
    </p>
  );
};