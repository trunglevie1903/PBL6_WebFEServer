import React, { CSSProperties } from "react";
import { HomePageHeader } from "./header/header";
import { HomePageBody } from "./body/body";

export const HomePage: React.FC = () => {
  const styles: {[key: string]: CSSProperties} = {
    pageWrapper: {
      width: "100%",
      height: "100%",
      minHeight: "100vh",
      backgroundColor: "#f8f1a4",
    }
  };
  return (
    <div style={styles.pageWrapper}>
      <HomePageHeader/>
      <HomePageBody/>
    </div>
  );
};