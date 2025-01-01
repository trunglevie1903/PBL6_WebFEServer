import React, {CSSProperties} from "react";
import { LogoAndName } from "./LogoAndName";
import { LinkToUpload } from "./LinkToUpload";

export const HeaderLeftSection: React.FC = () => {
  const styles: {[key: string]: CSSProperties} = {
    wrapper: {
      margin: window.innerWidth >= 768 ? "1rem 0" : "1rem auto",
      height: "3rem",
      display: "flex",
      flexDirection: "row",
      flexWrap: "nowrap",
      justifyContent: "center",
      alignItems: "center",
      gap: "2rem",
      // flex: window.innerWidth >= 768 ? "auto" : "1 auto",
      minWidth: 0,
    }
  };
  return (
    <div style={styles.wrapper}>
      <LogoAndName />
      <LinkToUpload />
    </div>
  );
};