import React from "react";
import { useAuth } from "../../contexts/AuthContext";

export const ChangeTempTokenPage: React.FC = () => {
  const {token, changeToken} = useAuth();

  return (
    <div>
      <button onClick={changeToken}>
        Token is {token === "1" ? "True" : "False"}
      </button>
    </div>
  );
};