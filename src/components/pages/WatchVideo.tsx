import React from 'react';
import { useParams } from 'react-router-dom';

import User_WatchVideo_Header from '../compos/User_WatchVideo/User_WatchVideo_Header/User_WatchVideo_Header';
import User_WatchVideo_PageContent from '../compos/User_WatchVideo/User_WatchVideo_PageContent/User_WatchVideo_PageContent';

const WatchVideo: React.FC = () => {
  const {videoId} = useParams();

  return (
    <div>
      {/* <video width={640} height={360} style={{objectFit: "contain", backgroundColor: "#000"}} controls src={`http://127.0.0.1:4000/video/get-video-stream/${videoId}`}></video> */}
      <User_WatchVideo_Header />
      {videoId && <User_WatchVideo_PageContent videoId={videoId} />}
    </div>
  )
};

export default WatchVideo;