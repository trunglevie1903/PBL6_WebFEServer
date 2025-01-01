import React, { CSSProperties } from "react";
import { WatchVideoPageHeader } from "./header/header";
import { useNavigate, useParams } from "react-router-dom";
import { WatchVideoPageBody } from "./body/body";
import { HomePageHeader } from "../Home/header/header";


export const WatchVideoPage: React.FC = () => {
  const returnUsableVideoId = (str: string | undefined) => {
    if (str === undefined || str === null || (typeof str === "string" && str.trim() === "")) return null;
    return str;
  }
  const {videoId} = useParams();
  const usableVideoId = returnUsableVideoId(videoId);

  const styles: {[key: string]: CSSProperties} = {
    pageWrapper: {
      width: "100%",
      height: "100%",
      minHeight: "100vh",
      backgroundColor: "#f8f1a4",
      display: "flex",
      flexDirection: "column",
      flexWrap: "nowrap",
      justifyContent: 'flex-start',
      alignItems: "center",
    }
  };
  return (
    <div style={styles.pageWrapper}>
      {/* <WatchVideoPageHeader/> */}
      <HomePageHeader />
      <WatchVideoPageBody videoId={usableVideoId} />
    </div>
  );
};