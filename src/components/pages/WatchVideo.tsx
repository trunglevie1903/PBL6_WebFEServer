import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import User_WatchVideo_PageContent from '../compos/User_WatchVideo/User_WatchVideo_PageContent/User_WatchVideo_PageContent';
import checkValidToken from '../functions/checkValidToken';
import User_HomePage_Header from '../compos/User_HomePage/User_HomePage_Header';
import Guest_HomePage_Header from '../subComponents/Old_Header';

const WatchVideo: React.FC = () => {
  const {videoId} = useParams();
  const [isAuthenticated, set_isAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const checkIfAuthenticated = async () => {
      set_isAuthenticated(await checkValidToken());
    };
    checkIfAuthenticated();
  }, []);

  return (
    <div>
      {/* <video width={640} height={360} style={{objectFit: "contain", backgroundColor: "#000"}} controls src={`http://127.0.0.1:4000/video/get-video-stream/${videoId}`}></video> */}
      {isAuthenticated ? <User_HomePage_Header /> : <Guest_HomePage_Header />}
      {videoId && <User_WatchVideo_PageContent videoId={videoId} />}
    </div>
  )
};

export default WatchVideo;