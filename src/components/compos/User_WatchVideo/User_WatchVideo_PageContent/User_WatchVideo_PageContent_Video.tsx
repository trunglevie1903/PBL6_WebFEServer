interface VideoProp {
  videoId: string;
};

const User_WatchVideo_PageContent_Video: React.FC<VideoProp> = ({videoId}) => {
  return (
    <video width={"100%"} height={480} 
    style={{objectFit: "contain", backgroundColor: "#000", borderRadius: "10px"}} 
    controls>
      <source src={`http://127.0.0.1:4000/video/get-video-stream/${videoId}`} type="video/mp4" />
      Your browser does not support the video tag
    </video>
  );
};

export default User_WatchVideo_PageContent_Video;