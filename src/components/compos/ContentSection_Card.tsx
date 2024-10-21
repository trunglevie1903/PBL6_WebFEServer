import React from 'react';

interface ContentSection_Card_Props {
  title: string;
  imageUrl: string;
}

const ContentSection_Card: React.FC<ContentSection_Card_Props> = ({ title, imageUrl }) => {
  // Inline styles for the card component
  const cardStyles: React.CSSProperties = {
    position: 'relative',
    border: '1px solid #ccc',
    borderRadius: '8px',
    overflow: 'hidden',
    width: '100%', // Ensure the card takes full width of the column
  };

  const imageBoxStyles: React.CSSProperties = {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
  };

  const imageStyles: React.CSSProperties = {
    width: "100%",
    height: "auto",
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

  return (
    <div style={cardStyles}>
      <div style={imageBoxStyles}>
        <img src={imageUrl} alt={title} style={imageStyles} />
      </div>
      <div style={titleStyles}>{title}</div>
    </div>
  );
};

export default ContentSection_Card;
