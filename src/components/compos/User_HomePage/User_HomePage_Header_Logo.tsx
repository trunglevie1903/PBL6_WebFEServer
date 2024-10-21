import React, {CSSProperties} from 'react';

const User_HomePage_Header_Logo: React.FC = () => {
  const styles: {[key: string]: CSSProperties} = {
    logo: {
      textDecoration: "none",
      fontSize: "24px",
      fontWeight: "bold",
      color: "black"
    }
  }
  return (
    <a href="/" style={styles.logo}>Logo</a>
  )
};

export default User_HomePage_Header_Logo;