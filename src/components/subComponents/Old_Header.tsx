import React, { CSSProperties } from 'react';

const Guest_HomePage_Header: React.FC = () => {
  return(
    <div style={styles.header}>
      <div style={styles.headerLeft}>
        <a href="/" style={styles.logo}>Logo</a>
      </div>
      <div style={styles.headerMiddle}>
        <div style={styles.searchBox}>
          <input type="text" placeholder='Search...' style={styles.searchInput} />
          <button style={styles.searchBtn}>Search</button>
        </div>
      </div>
      <div style={styles.headerRight}>
        <a href="/login" style={styles.signInBtn}>Sign In</a>
      </div>
    </div>
  )
};

const styles: { [key: string]: CSSProperties } = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 30px",
    borderBottom: "1px solid #ddd",
  },
  headerLeft: {
    display: "flex",
    alignItems: "center"
  },
  menuBtn: {
    background: "none",
    border: "none",
    fontSize: "24px",
    cursor: "pointer",
    marginRight: "15px"
  },
  logo: {
    textDecoration: "none",
    fontSize: "24px",
    fontWeight: "bold",
    color: "black"
  },
  headerMiddle: {
    display: "flex",
    justifyContent: "center",
    flex: 1
  },
  searchBox: {
    display: "flex",
    alignItems: "center",
    border: "1px solid #ddd",
    borderRadius: "50px",
    padding: "5px",
    width: "60%"
  },
  searchInput: {
    border: 'none',
    padding: '10px',
    borderRadius: '50px',
    width: '100%',
  },
  searchBtn: {
    backgroundColor: 'transparent',
    border: 'none',
    padding: '10px',
    cursor: 'pointer',
    borderRadius: '50px',
  },
  headerRight: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  signInBtn: {
    padding: '10px 20px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    textDecoration: 'none',
    cursor: 'pointer',
    color: 'black',
  }
}

export default Guest_HomePage_Header;