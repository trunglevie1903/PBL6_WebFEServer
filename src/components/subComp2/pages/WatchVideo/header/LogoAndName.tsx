import React, {CSSProperties} from "react";
import { Link } from "react-router-dom";

import parrot from '../../../../../assets/parrot.jpg';

export const LogoAndName: React.FC = () => {
  const styles: {[key: string]: CSSProperties} = {
    wrapper: {
      display: "inline-flex",
      flexDirection: "row",
      flexWrap: "nowrap",
      justifyContent: "center",
      alignItems: "center",
      gap: "0.5rem",
      cursor: "pointer",
      textDecoration: "none",
    },
    image: {
      width: "3rem",
      height: "3rem",
      borderRadius: "50%",
    },
    name: {
      width: "4rem",
      height: "3rem",
      alignContent: "center",
      textAlign: "center",
      fontSize: "1.5rem",
      fontWeight: "bold",
      padding: "auto",
      color: "#222",
    },
  };
  return (
    <Link to="/" style={styles.wrapper}>
      <img src={parrot} alt="logo" style={styles.image} />
      <p style={styles.name}>App</p>
    </Link>
  );
};