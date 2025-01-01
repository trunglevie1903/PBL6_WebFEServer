import React, { CSSProperties, FormEvent, useState } from "react";
import { SubmitBtn } from "./submitBtn";
import axios, { AxiosProgressEvent } from "axios";
import { BackBtn } from "./backBtn";
import { useAuth } from "../../../../contexts/AuthContext";

const UploadVideoForm: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [uploadStatus, setUploadStatus] = useState<string>("");
  const [videoTitle, setVideoTitle] = useState<string>("");
  const [isWaitingResponse, set_isWaitingResponse] = useState<boolean>(false);
  const [errorMessage, set_errorMessage] = useState<string>("");
  const [isUploadFailed, set_isUploadFailed] = useState<boolean>(false);
  const {checkTokenValidity, accessToken} = useAuth();
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);
    setUploadProgress(0); // Reset progress
    setUploadStatus(""); // Reset status
  };

  const handleFileUpload = (e: FormEvent) => {
    e.preventDefault();
    const fetchRequest = async () => {
      set_isWaitingResponse(true);
      set_isUploadFailed(true);
      set_errorMessage("");
      setUploadStatus("");
      // validate form data
      if (!selectedFile) {
        set_errorMessage("Please select a video file first");
        return;
      };
      if (!videoTitle.trim()) {
        set_errorMessage("Please enter the video's title");
        return;
      };
      // prepare form data
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("title", videoTitle);
      // send the request
      try {
        if (!await checkTokenValidity()) throw new Error("Unauthorized");
        const response = await axios.post("http://127.0.0.1:4000/video/upload-video", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${accessToken}`
          },
          onUploadProgress: (progressEvent: AxiosProgressEvent) => {
            if (progressEvent.total) {
              const progress = Math.round(progressEvent.loaded / progressEvent.total) * 100;
              setUploadProgress(progress);
            }
          }
        });
        console.log("Authorized");
        if (response.data && response.data.message === "request succeed") {
          setUploadStatus("Upload succeed");
          set_isUploadFailed(false);
        } else {
          setUploadStatus("Upload failed, please try again");
          set_isUploadFailed(true);
        }
      } catch (error) {
        setUploadStatus(`Upload failed: ${axios.isAxiosError(error) ? error.message : error}`);
        set_isUploadFailed(true);
      }

      setTimeout(() => set_isWaitingResponse(false), 3000);
      // set_isWaitingResponse(false);
    };
    fetchRequest();
  };

  const styles: {[key: string]: CSSProperties} = {
    fileInput: {
      display: "none",
    },
    labelFileInput: {
      // padding: "1em 1.6em",
      // display: "inline-block",
      alignSelf: "center",
      cursor: "pointer",
      width: "80%",
      height: "10em",
      display: "grid",
      placeItems: "center",
      background: "linear-gradient(#fff 0 0) padding-box, linear-gradient(to bottom, #4fc3f7, #ff512f) border-box",
      color: "#a47864 ",
      border: "2px dashed #fff",
      borderRadius: "1em",
      fontSize: "2em",
    },
    textInput: {
      minWidth: "25em",
      width: "75%",
      padding: "1em",
      alignSelf: "center",
      outline: "none",
      borderRadius: ".5em",
      border: "1px solid #888888"
    },
    formWrapper: {
      width: "60%",
      minWidth: "30em",
      border: "2px solid #666",
      borderRadius: ".5em",
      display: "flex",
      flexDirection: "column",
      flexWrap: "nowrap",
      gap: "2em",
      overflow: "hidden",
      boxShadow: '1em 1em 1em 1em #888888',
      backgroundColor: "#fff",
      padding: "2em",
      alignSelf: "center",
    },
    formHeader: {
      fontSize: "2em",
      fontWeight: "bold",
      textAlign: "center",
    },
    statusMessage: {
      color: isUploadFailed ? "#f22" : "#4f4",
      textAlign: "center",
    },
    errorMessage: {
      color: "red",
      textAlign: "center",
    },
    selectedFileName: {
      display: "-webkit-box",
      WebkitLineClamp: 3,
      WebkitBoxOrient: "vertical",
      textOverflow: "ellipsis",
      whiteSpace: "normal",
      overflow: "hidden",
      padding: "1em",
    },
    buttonWrapper: { 
      minWidth: "25em",
      width: "75%",
      display: "inline-flex",
      flexDirection: "row",
      flexWrap: "nowrap",
      justifyContent: "space-between",
      alignItems: "center",
      alignSelf: "center",
    }
  };

  return (
    <form style={styles.formWrapper} onSubmit={handleFileUpload}>
      <p style={styles.formHeader}>
        Upload your video
      </p>
      <input required type="file" id="file-input" onChange={handleFileChange} style={styles.fileInput}/>
      <label htmlFor="file-input" style={styles.labelFileInput}>
        Choose video
      </label>
      {selectedFile ? <p style={styles.selectedFileName}>Selected file: ({selectedFile.name})</p> : <p style={{...styles.selectedFileName, textAlign: "center"}}>No file was selected</p>}
      <input
        type="text"
        placeholder="Enter video title"
        style={styles.textInput}
        onChange={(e) => setVideoTitle(e.target.value)}
        value={videoTitle}
        required
      />
      <div style={styles.buttonWrapper}>
        <BackBtn />
        <SubmitBtn isWaitingResponse={isWaitingResponse} />
      </div>
      <div>
        {
          uploadProgress > 0 &&
          <div style={{
            height: "20px",
            width: "100%",
            backgroundColor: "#e0e0e0",
            borderRadius: "5px",
            overflow: "hidden",
            marginBottom: "10px",
          }}>
            <div style={{
                height: "100%",
                width: `${uploadProgress}%`,
                backgroundColor: "#76c7c0",
                textAlign: "center",
                color: "white",
                lineHeight: "20px",
              }}>
              {uploadProgress}%
            </div>
          </div>
        }
        {uploadStatus && <p style={styles.statusMessage}>{uploadStatus}</p>}
        {errorMessage && <p style={styles.errorMessage}>{errorMessage}</p>}
      </div>
    </form>
  );
};

export default UploadVideoForm;
