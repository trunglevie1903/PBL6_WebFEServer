import React, {CSSProperties, useEffect, useRef, useState} from "react";
import { useNavigate } from "react-router-dom";

import parrot from '../../../../../../../assets/parrot.jpg';
import axios from "axios";
import { useAuth } from "../../../../../../../contexts/AuthContext";

interface AvtProp {
  _username: string | null;
}

export const Avt: React.FC<AvtProp> = ({_username}) => {
  const [source, setSource] = useState<string>("");
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (typeof _username !== "string" || _username.trim() === "") throw new Error("Invalid username");
        const response = await axios.get(`http://127.0.0.1:4000/user/${_username}/avatar`);
        if (response.data && response.data.message === "request succeed") {
          setSource(response.data.avatar);
          setUsername(_username);
        } else throw response;
      } catch (error) {
        console.error(axios.isAxiosError(error) ? error.message : error);
      };
    };
    fetchData();
  }, [_username]);
  
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/user/${username}`);
  };

  const styles: {[key: string]: CSSProperties} = {
    wrapper: {
      width: "4em",
      height: "100%",
      padding: ".5em",
      cursor: "pointer",
    },
    img: {
      width: "3em",
      height: "3em",
      borderRadius: "5em",
    }
  };
  return (
    <div 
      style={styles.wrapper}
      onClick={handleClick}
    >
      <img src={source} alt="source" style={styles.img}/>
    </div>
  );
};