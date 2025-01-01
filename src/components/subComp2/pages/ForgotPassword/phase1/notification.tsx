import React from "react";
import { BackBtn } from "./backBtn";

export const ForgotPasswordPhase1Notification: React.FC = () => {
  return (
    <div style={{
      width: "60%",
      minWidth: "30em",
      border: "1px solid #666",
      borderRadius: ".5em",
      display: "flex",
      flexDirection: "column",
      flexWrap: "nowrap",
      gap: "2em",
      overflow: "hidden",
      boxShadow: '1em 1em 1em 1em #888888',
      backgroundColor: "#fff",
      padding: "2em",
    }}>
      <p>
        <span style={{color: "#2d2", fontWeight: "bold"}}>Request succeed.</span> We've sent you an email to continue the process. Keep going!!!
      </p>
      <BackBtn />
    </div>
  )
};