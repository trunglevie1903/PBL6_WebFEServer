import React, { CSSProperties, useEffect } from "react";
import { useAuth } from "../../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import UploadVideoForm from "./form";

export const UploadVideoPage: React.FC = () => {
  const {checkToken, checkTokenValidity} = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    const process = async () => {
      if (await checkTokenValidity() === false) {
        alert("Please sign in");
        navigate("/sign-in");
      }
    };
    process();
  }, []);

  const styles: {[key: string]: CSSProperties} = {
    pageWrapper: {
      width: "100vw",
      height: "100vh",
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#f8f1a4",
    }
  };
  return (
    <div style={styles.pageWrapper}>
        <UploadVideoForm />
    </div>
  );
};