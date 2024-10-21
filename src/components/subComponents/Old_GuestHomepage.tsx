import React, { useState, CSSProperties } from 'react';

import Header from './sub1/GuestHomepage/Header';
import MainWrapper from './sub1/GuestHomepage/MainWrapper';
import Sidebar from './sub1/GuestHomepage/Sidebar';

const GuestHomepage: React.FC = () => {
  
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleMenuToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div>
      <Header handleMenuToggle={handleMenuToggle} />
      <div style={styles.mainWrapper}>
        <Sidebar isCollapsed={isCollapsed} />
        <MainWrapper />
      </div>
    </div>
  );
};
const styles: { [key: string]: CSSProperties } = {
  mainWrapper: {
    display: 'flex',
    height: 'calc(100vh - 66px)', // Adjust for header height
  }
}

export default GuestHomepage;
