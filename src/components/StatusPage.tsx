import React, { useState, useEffect } from "react";
import axios from 'axios';

const StatusPage: React.FC = () => {
  const [msg, setMsg] = useState("");
  const [btnText, setBtnText] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setMsg("accessToken is available");
      setBtnText("Delete accessToken");
    } else {
      setMsg("accessToken is unavailable");
      setBtnText("Add accessToken");
    }
  }, []);

  const handleBtnClick = async () => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      localStorage.removeItem("accessToken");
      setMsg("accessToken is unavailable");
      setBtnText("Add accessToken");
    } else {
      try {
        const response = await axios.post("http://127.0.0.1:4000/test");
        console.log("response: ", response);
        localStorage.setItem("accessToken", "dummy");
        setMsg("accessToken is available");
        setBtnText("Delete accessToken");
      } catch (error) {
        console.error("Error getting token: ", error);
      }
    }
  };

  return (
    <div>
      <p>{msg}</p>
      <button onClick={handleBtnClick}>{btnText}</button>
    </div>
  );
};

export default StatusPage;