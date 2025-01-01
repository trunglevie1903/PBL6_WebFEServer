import React from "react";
import { useAuth } from "../../contexts/AuthContext";

const ExampleHome = () => {
  const {token} = useAuth();
  return (
    <div>
      <span>{token === "1" ? "User" : "Guest"}</span>
    </div>
  )
};

export default ExampleHome;