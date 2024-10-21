import React, {CSSProperties, useEffect, useState} from "react";
import axios from "axios";

interface VideoProp {
  videoId: string;
};

const User_WatchVideo_PageContent_OtherVideo_VideoCard: React.FC<VideoProp> = ({videoId}) => {
  const [thumbnail, setThumbnail] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [isHovering, setHovering] = useState<boolean>(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`http://127.0.0.1:4000/video/${videoId}`);
      try {
        if (response.status !== 200) throw response;
        else {
          // console.log("response: ", response);
          if (response.data.thumbnail) setThumbnail(response.data.thumbnail);
          if (response.data.video.title) setTitle(response.data.video.title);
        }
      } catch (error) {
        alert(error);
      }
    };

    fetchData();

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const styles: {[key: string]: CSSProperties} = {
    wrapper: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "5px",
      marginBottom: "5px",
      border: isHovering ? "2px solid #ddd" : "2px solid transparent",
      borderRadius: "5px",
      cursor: isHovering ? "pointer" : "default",
      transition: "all 0.3s",
    },
    thumbnail: {
      flex: 3,
      height: "100px",
    },
    thumbnailImage: {
      width: "100%",
      height: "100%",
      margin: "0 auto",
      objectFit: "cover",
      borderRadius: "5px",
      boxSizing: "border-box",
    },
    title: {
      flex: 2,
      fontSize: "16px",
      display: windowWidth < 400 ? 'none' : 'block'
    }
  }

  const handleClickCard = () => {
    window.location.href = `/video/${videoId}`;
  };

  return (
    <div style={styles.wrapper} onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)} onClick={handleClickCard}>
      <div className="thumbnail" style={styles.thumbnail}>
        <img style={styles.thumbnailImage} src={thumbnail} alt="Thumbnail" />
      </div>
      <div style={styles.title} className="title">{title}</div>
    </div>
  );
};

export default User_WatchVideo_PageContent_OtherVideo_VideoCard;