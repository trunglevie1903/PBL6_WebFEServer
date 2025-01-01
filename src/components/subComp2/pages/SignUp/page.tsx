import React, { useEffect } from "react";
import { SignUpForm } from "./form";
import { useAuth } from "../../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export const SignUpPage: React.FC = () => {
  const navigate = useNavigate();
  const {checkToken, checkTokenValidity} = useAuth();
  useEffect(() => {
    const process = async () => {
      if (await checkTokenValidity() === true) {
        navigate("/");
      }
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
      <SignUpForm />
    </div>
  );
};