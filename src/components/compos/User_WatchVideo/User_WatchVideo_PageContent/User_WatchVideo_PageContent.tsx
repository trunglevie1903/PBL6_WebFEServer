import React, {CSSProperties, useEffect, useState} from "react";
import User_WatchVideo_PageContent_Video from "./User_WatchVideo_PageContent_Video";
import User_WatchVideo_PageContent_VideoDetail from "./User_WatchVideo_PageContent_VideoDetail";
import User_WatchVideo_PageContent_CommentSection from "./User_WatchVideo_PageContent_CommentSection";
import User_WatchVideo_PageContent_OtherVideo from "./User_WatchVideo_PageContent_OtherVideo";

interface VideoProp {
  videoId: string;
};

const User_WatchVideo_PageContent: React.FC<VideoProp> = ({videoId}) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const styles: {[key: string]: CSSProperties} = {
    pageContent: {
      display: "flex",
      flexDirection: windowWidth < 600 ? "column" : "row",
      padding: "20px 40px",
      gap: "20px",
    },
    leftColumn: {
      flex: 2,
    },
    rightColumn: {
      flex: 1
    },
  };

  return (
    <div className="pageContent" style={styles.pageContent}>
      <div className="leftColumn" style={styles.leftColumn}>
        <div className="video" style={{marginBottom: "20px"}}>
          <User_WatchVideo_PageContent_Video videoId={videoId} />
        </div>
        <div className="videoDetail" style={{marginBottom: "20px"}}>
          <User_WatchVideo_PageContent_VideoDetail videoId={videoId} />
        </div>
        <div className="commentSection">
          {/* <User_WatchVideo_PageContent_CommentSection videoId={videoId} /> */}
        </div>
      </div>
      <div className="rightColumn" style={styles.rightColumn}>
        <User_WatchVideo_PageContent_OtherVideo videoId={videoId} />
      </div>
    </div>
  );
};

export default User_WatchVideo_PageContent;