import React, { useEffect } from "react";

import { useAuth } from "../../../../../contexts/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { ForgotPasswordPhase2Form } from "./form";

export const ForgotPasswordPhase2Page: React.FC = () => {
  const {checkToken, checkTokenValidity} = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    const process = async () => {
      if (await checkTokenValidity() === true) navigate('/');
    };
    process();
  }, []);
  
  const {requestId} = useParams();

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
      <ForgotPasswordPhase2Form requestId={requestId} />
    </div>
  )
};