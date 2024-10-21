import React, { CSSProperties } from 'react';


const MainWrapper: React.FC = () => {
  return (
    <div style={styles.content}>
      <h1>Welcome to User Homepage</h1>
      <p>Content will go here...</p>
    </div>
  );
};

const styles: { [key: string]: CSSProperties } = {
  mainWrapper: {
    display: 'flex',
    height: 'calc(100vh - 66px)', // Adjust for header height
  },
  content: {
    flex: 1,
    padding: '20px',
    transition: 'margin-left 0.3s ease',
  },
};

export default MainWrapper;
