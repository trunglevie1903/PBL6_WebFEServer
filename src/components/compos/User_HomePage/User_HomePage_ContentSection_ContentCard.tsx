import React, {useState, useEffect, MouseEventHandler} from 'react';
import axios from 'axios';

interface ContentSection_Card_Props {
  videoId: string | null
}

const ContentSection_Card: React.FC<ContentSection_Card_Props> = ({videoId}) => {
  const [isMouseHovered, setMouseHover] = useState(false);

  // Inline styles for the card component
  const cardStyles: React.CSSProperties = {
    width: '100%',
    position: 'relative',
    border: '1px solid #ccc',
    borderRadius: '8px',
    overflow: "hidden",
    transform: `scale(${isMouseHovered ? "1.1" : "1"})`,
    transition: "transform 0.3s ease",
    boxShadow: isMouseHovered ? '0 8px 16px rgba(0, 0, 0, 0.2)' : 'none',
  };

  const imageBoxStyles: React.CSSProperties = {
    width: '100%',
    height: '200px',
    overflow: "hidden",
    display: 'flex',
    justifyContent: "center",
    alignItems: "center",
  };

  const imageStyles: React.CSSProperties = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  }

  const titleStyles: React.CSSProperties = {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Transparent background
    color: 'white',
    textAlign: 'center',
    padding: '10px',
    boxSizing: 'border-box',
  };

  const [imageSource, setImageSource] = useState("https://via.placeholder.com/150");
  const [title, setTitle] = useState("Video");

  const handleClick: MouseEventHandler = (event) => {
    event.preventDefault();
    window.location.href = `/video/${videoId}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `http://127.0.0.1:4000/video/visual-data/${videoId}`
      );
      if (response.status === 200 && response.data.returnData) {
        const {returnData} = response.data;
        setImageSource(returnData.thumbnail);
        setTitle(returnData.title);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={cardStyles} onClick={handleClick} onMouseEnter={() => setMouseHover(true)} onMouseLeave={() => setMouseHover(false)}>
      <div style={imageBoxStyles}>
        <img src={imageSource} alt={title} style={imageStyles} />
      </div>
      <div style={titleStyles}>
        {title}
      </div>
    </div>
  );
};

export default ContentSection_Card;