import React, { CSSProperties, useState } from 'react';
import Header from './subComponents/sub1/CustomizeProfile/Header';
import MainWrapper from './subComponents/sub1/CustomizeProfile/MainWrapper';
import Sidebar from './subComponents/sub1/CustomizeProfile/Sidebar';

const CustomizeProfilePage: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleMenuToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div>
      <Header handleMenuToggle={handleMenuToggle} />
      <div style={styles.mainWrapper} className="mainWrapper">
        <Sidebar isCollapsed={isCollapsed}/>
        <MainWrapper  />
      </div>
    </div>
  );
};

const styles: {[key: string]: CSSProperties} = {
  mainWrapper: {
    display: 'flex',
    height: 'calc(100vh - 66px)', // Adjust for header height
  }
}

export default CustomizeProfilePage;