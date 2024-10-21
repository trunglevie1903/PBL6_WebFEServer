import React, {useEffect, useState} from "react";
import axios from "axios";
import User_WatchVideo_PageContent_OtherVideo_VideoCard from "./User_WatchVideo_PageContent_OtherVideo_VideoCard";

interface VideoProp {
  videoId: string;
};

const User_WatchVideo_PageContent_OtherVideo: React.FC<VideoProp> = ({videoId}) => {
  const [ids, setIds] = useState<string[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`http://127.0.0.1:4000/video/get-10-other-videos/${videoId}`);
      try {
        if (response.status !== 200) throw response;
        else {
          const _ids: string[] = response.data;
          // console.log('ids: ', _ids);
          setIds(_ids);
        }
      } catch (error) {
        alert(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <h3 style={{marginBottom: "10px"}}>Other videos</h3>
      <div>
        {ids.map(id => <User_WatchVideo_PageContent_OtherVideo_VideoCard videoId={id} key={id} />)}
      </div>
    </>
  );
};

export default User_WatchVideo_PageContent_OtherVideo;