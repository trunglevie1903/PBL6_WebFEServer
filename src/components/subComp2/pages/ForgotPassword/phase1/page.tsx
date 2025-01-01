import React, { useEffect, useState } from "react";

import { ForgotPasswordPhase1Form } from "./form";
import { useAuth } from "../../../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { ForgotPasswordPhase1Notification } from "./notification";

export const ForgotPasswordPhase1Page: React.FC = () => {
  const [isSucceed, set_isSucceed] = useState<boolean>(false);
  const {checkToken, checkTokenValidity} = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    const process = async () => {
      if (await checkTokenValidity() === true) navigate('/');
    };
    process();
  }, []);
  
  return (
    <div style={{
      width: "100vw",
      height: "100vh",
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "flex-start",
      backgroundColor: "#f8f1a4",
      paddingTop: "10em",
    }}>
      {isSucceed ? <ForgotPasswordPhase1Notification /> : <ForgotPasswordPhase1Form setSucceed={set_isSucceed}/>}
      {/* <ForgotPasswordPhase1Notification /> */}
    </div>
  )
};