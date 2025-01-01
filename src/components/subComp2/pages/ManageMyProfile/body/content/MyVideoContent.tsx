import { useEffect, useState } from "react";
import { useAuth } from "../../../../../../contexts/AuthContext";
import axios from "axios";
import { MyVideoItem } from "./MyVideoItem";

export const MyVideosContent: React.FC = () => {
  const [ids, setIds] = useState([]);
  const {username} = useAuth();
  useEffect(() => {
    const process = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:4000/video/of-user/${username}`);
        if (response.data.message === "request succeed") {
          setIds(response.data.ids);
        }
      } catch (error) {
        console.error(error);
      }
    };
    process();
  }, []);
  return (
    <div style={{
      width: "90%",
      paddingLeft: "5%",
      paddingRight: "5%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "center",
    }}>
      {ids.map((item, index) => <MyVideoItem videoId={item} key={index}/>)}
    </div>
  );
};