import React, { useEffect } from "react";
import { SignInForm } from "./form";
import { useAuth } from "../../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export const SignInPage: React.FC = () => {
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
      alignItems: "center",
      backgroundColor: "#f8f1a4",
    }}>
      <SignInForm />
    </div>
  )
};