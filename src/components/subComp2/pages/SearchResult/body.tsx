import axios from "axios";
import React, { CSSProperties, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { VideoList } from "./VideoList";

export const SearchResultBody: React.FC = () => {
  const {searchValue} = useParams();
  // const [userIds, setUserIds] = useState<string[]>([]);
  const [videoIds, setVideoIds] = useState<string[]>([]);
  useEffect(() => {
    // const findUser = async () => {
    //   try {
    //     const response = await axios.get(`http://127.0.0.1:4000/user/search/${searchValue}`);
    //     if (response.data && response.data.message === "request succeed") {
    //       setUserIds(response.data.ids);
    //     }
    //   } catch (error) {
    //     console.error(error);
    //   }
    // };
    // findUser();
    const findVideo = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:4000/video/search/${searchValue}`);
        if (response.data && response.data.message === "request succeed") {
          console.log(response.data);
          setVideoIds(response.data.ids);
        }
      } catch (error) {
        console.error(error);
      }
    };
    findVideo();
  }, [searchValue]);
  const styles: {[key: string]: CSSProperties} = {
    wrapper: {
      display: "flex",
      flexDirection: "column",
      flexWrap: "nowrap",
    }
  };
  return (
    <div style={styles.wrapper}>
      {/* <UserList ids={userIds} /> */}
      <VideoList ids={videoIds} />
    </div>
  );
};