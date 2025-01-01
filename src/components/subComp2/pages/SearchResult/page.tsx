import React, { CSSProperties } from "react";
import { HomePageHeader } from "../Home/header/header";
import { SearchResultBody } from "./body";

export const SearchResultPage: React.FC = () => {
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
      <SearchResultBody />
    </div>
  );
};