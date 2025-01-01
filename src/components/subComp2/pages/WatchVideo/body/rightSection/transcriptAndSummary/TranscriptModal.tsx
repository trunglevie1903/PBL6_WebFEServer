import React, { CSSProperties } from "react";
import { TranscriptItem } from "./TranscriptItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

interface InputProp {
  transcripts: TranscriptType[];
  handleClickClose: () => void;
}

interface TranscriptType {
  transcriptId: string;
  videoId: string;
  timestamp: string;
  text: string;
}

export const TranscriptModal: React.FC<InputProp> = ({transcripts, handleClickClose}) => {
  const styles: {[key: string]: CSSProperties} = {
    wrapper: {
      position: "absolute",
      padding: "2em",
      zIndex: 1000,
      backgroundColor: "#fff",
      width: "90vw",
      height: "80vh",
      overflow: "scroll",
      borderRadius: "2em",
      top:"50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    },
    contentWrapper: {
      display: "flex",
      flexDirection: "column",
      flexWrap: "nowrap"
    }
  };
  return (
    <div style={styles.wrapper}>
      <div style={{
        display: "flex", flexDirection: "row", justifyContent: "space-between", flexWrap: "nowrap"
      }}>
        <h5>Transcripts:</h5>
        <FontAwesomeIcon icon={faXmark} onClick={handleClickClose} style={{cursor: "pointer"}}/>
      </div>
      <hr />
      <div style={styles.contentWrapper}>
        {transcripts.map((item: TranscriptType) => <TranscriptItem timestamp={item.timestamp} text={item.text} />)}
      </div>
    </div>
  );
};