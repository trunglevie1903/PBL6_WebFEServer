import React, { useState, CSSProperties } from 'react';
import { useParams } from 'react-router-dom';

import Header from './sub1/UserChannel/Header';
import MainWrapper from './sub1/UserChannel/MainWrapper';
import Sidebar from './sub1/UserChannel/Sidebar';

const UserChannel: React.FC = () => {
  const { userId } = useParams();
  console.log('userId: ', userId);
  
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleMenuToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div>
      <Header handleMenuToggle={handleMenuToggle} />
      <div style={styles.mainWrapper}>
        <Sidebar isCollapsed={isCollapsed} />
        <MainWrapper userId={userId as string} />
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

export default UserChannel;
