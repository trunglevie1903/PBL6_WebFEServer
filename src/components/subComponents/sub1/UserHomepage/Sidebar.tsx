import React, { CSSProperties } from 'react';

interface SidebarProps {
  isCollapsed: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed }) => {
  return (
    <div style={{ ...styles.sidebar, width: isCollapsed ? '70px' : '250px' }}>
      <ul style={styles.sidebarList}>
        <li style={styles.sidebarItem}>
          <a href="#" style={styles.sidebarLink}>
            <span style={styles.icon}>🏠</span>
            {!isCollapsed && <span style={styles.text}>Home</span>}
          </a>
        </li>
        <li style={styles.sidebarItem}>
          <a href="#" style={styles.sidebarLink}>
            <span style={styles.icon}>🔥</span>
            {!isCollapsed && <span style={styles.text}>Trending</span>}
          </a>
        </li>
        <li style={styles.sidebarItem}>
          <a href="#" style={styles.sidebarLink}>
            <span style={styles.icon}>📺</span>
            {!isCollapsed && <span style={styles.text}>Subscriptions</span>}
          </a>
        </li>
        <li style={styles.sidebarItem}>
          <a href="#" style={styles.sidebarLink}>
            <span style={styles.icon}>📚</span>
            {!isCollapsed && <span style={styles.text}>Library</span>}
          </a>
        </li>
      </ul>
    </div>
  );
};

const styles = {
  sidebar: {
    backgroundColor: '#f4f4f4',
    height: '100%',
    transition: 'width 0.3s ease',
    overflowX: 'hidden' as CSSProperties["overflowX"],
  },
  sidebarList: {
    listStyle: 'none',
    padding: 0,
  },
  sidebarItem: {
    padding: '15px',
    display: 'flex',
    alignItems: 'center',
  },
  sidebarLink: {
    textDecoration: 'none',
    color: 'black',
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    marginRight: '15px',
    fontSize: '20px',
  },
  text: {},
};

export default Sidebar;
