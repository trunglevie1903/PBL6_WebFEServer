import axios from "axios";
import React, { CSSProperties, useEffect, useRef, useState } from "react";
import { Summary } from "./Summary";
import { TranscriptModal } from "./TranscriptModal";

interface InputProp {
  videoId: string | null;
}

export const TranscriptAndSummary: React.FC<InputProp> = ({videoId}) => {
  const [transcripts, set_transcripts] = useState([]);
  const [summary, set_summary] = useState<string>("");
  const hasLoadedDataTranscript = useRef(false);
  const hasLoadedDataSummary = useRef(false);
  const [isModalShow, toggleShowModal] = useState<boolean>(false);

  useEffect(() => {
    const fetchTranscript = async () => {
      if (!hasLoadedDataTranscript.current && videoId !== null && videoId !== undefined && videoId.trim() !== "") {
        try {
          const response = await axios.get(`http://127.0.0.1:4000/video/video-transcript/${videoId}`);
          if (response.data && response.data.message === "request succeed") {
            if (Array.isArray(response.data.transcripts)) {
              // hasLoadedDataTranscript.current = true;
              set_transcripts(response.data.transcripts);
            }
          } else throw new Error("Error requesting data");
        } catch (error) {
          console.error(axios.isAxiosError(error) ? error.message : error);
        }
      }
    };
    const fetchSummary = async () => {
      if (!hasLoadedDataSummary.current && videoId !== null && videoId !== undefined && videoId.trim() !== "") {
        try {
          const response = await axios.get(`http://127.0.0.1:4000/video/video-summary/${videoId}`);
          if (response.data && response.data.message === "request succeed") {
            console.log("summary: ", response.data.summary);
            if (typeof response.data.summary === "string") {
              set_summary(response.data.summary);
            }
          } else throw new Error("Error requesting data");
        } catch (error) {
          console.error(axios.isAxiosError(error) ? error.message : error);
        }
      }
    };
    fetchTranscript();
    fetchSummary();
  }, [videoId]);
  const styles: {[key: string]: CSSProperties} = {
    wrapper: {
      display: "flex",
      flexDirection: "column",
      gap: "1em",
    }
  };
  return (
    <div style={styles.wrapper}>
      <div>
        <h5>Transcript</h5>
        <hr style={{marginBottom: ".5em"}} />
        {
          transcripts.length > 0 ? <p style={{cursor: "pointer", padding: ".5em"}} onClick={() => toggleShowModal(true)}>Click to show the transcript</p> : <p>No transcript found</p>
        }
        {isModalShow && <TranscriptModal transcripts={transcripts} handleClickClose={() => toggleShowModal(false)}/>}
      </div>
      <Summary str={summary}/>
    </div>
  )
};