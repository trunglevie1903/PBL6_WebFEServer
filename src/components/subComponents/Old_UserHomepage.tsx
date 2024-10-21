import React, { useState, CSSProperties } from 'react';

import Header from './sub1/UserHomepage/Header';
import MainWrapper from './sub1/UserHomepage/MainWrapper';
import Sidebar from './sub1/UserHomepage/Sidebar';

const UserHomepage: React.FC = () => {
  
  const [isCollapsed, setIsCollapsed] = useState(true);

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

export default UserHomepage;
