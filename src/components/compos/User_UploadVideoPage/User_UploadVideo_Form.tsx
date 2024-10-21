import React, { CSSProperties, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import checkValidToken from "../../functions/checkValidToken";

interface UploadVideoData {
  title: string;
  description: string;
  privacyStatus: string;
  videoFile: FileList;
}

const User_UploadVideoForm: React.FC = () => {
  const [isSubmitButtonHovered, setSubmitButtonHovered] = useState(false);

  const {register, handleSubmit, formState: {errors}} = useForm<UploadVideoData>();

  const onSubmit: SubmitHandler<UploadVideoData> = async (data: UploadVideoData) => {
    // console.log('data: ', data);
    const uploadData = {...data, videoFile: data.videoFile[0]};
    console.log('true data: ', uploadData);
    checkValidToken().then(val => {
      if (!val) {
        alert("You are not allowed to perform this action, please log in");
        window.location.href = "/";
      }
      try {
        console.log('upload data: ', uploadData);
        const accessToken = localStorage.getItem('accessToken');
        axios.post(
          "http://127.0.0.1:4000/video/upload-video", uploadData,
          {
            headers: {
              "Authorization": `Bearer ${accessToken}`,
              "Content-Type": "multipart/form-data"
            }
          }
        ).then(response => {
          console.log('response data: ', response.data);
          alert(response.data.message);
        }).catch(error => {
          throw error;
        });
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) alert(`Error: ${error.response.data.message || error}`);
        else alert(`Error: ${error}`);
      }
    });
  };

  const validateVideoFile = (files: FileList) => {
    if (!files || files.length === 0) return "A file is required";
    const file = files[0];
    const videoTypes = ["video/mp4", "video/avi", "video/mkv", "video/webm"];
    return videoTypes.includes(file.type);
  };

  const styles: {[key: string]: CSSProperties} = {
    wrapper: {
      maxWidth: "600px",
      margin: "0 auto",
      backgroundColor: "#fff",
      padding: "20px",
      // borderRadius: "10px",
      // boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)"
    },
    formTitle: {
      textAlign: "center",
      marginBottom: "20px",
    },
    formGroup: {
      marginBottom: "20px",
    },
    formGroup_label: {
      display: "block",
      fontWeight: "bold",
      marginBottom: "5px",
    },
    formGroup_inputText: {
      width: "100%",
      padding: "10px",
      border: "1px solid #ccc",
      borderRadius: "5px",
      fontSize: "16px",
    },
    formGroup_Textarea: {
      width: "100%",
      padding: "10px",
      border: "1px solid #ccc",
      borderRadius: "5px",
      fontSize: "16px",
      resize: "vertical",
      rowGap: "5px",
    },
    formGroup_inputFile: {
      border: "none",
      padding: "10px",
    },
    formGroup_select: {
      width: "100%",
      padding: "10px",
      border: "1px solid #ccc",
      borderRadius: "5px",
      fontSize: "16px",
    },
    formGroup_submitButton: {
      padding: "10px 20px",
      border: "none",
      backgroundColor: isSubmitButtonHovered ? "#aaa" : "#999",
      color: "white",
      cursor: "pointer",
      borderRadius: "5px",
      fontSize: "16px",
    },
    error: {
      color: "red",
      fontSize: "0.8em"
    }
  };

  return (
    <div className="wrapper" style={styles.wrapper}>
      <h2 style={styles.formTitle}>Upload Video</h2>
      <form id="video-upload-form" onSubmit={handleSubmit(onSubmit)}>
        {/* Title */}
        <div className="form-group" style={styles.formGroup}>
          <label style={styles.formGroup_label} htmlFor="title">Video Title</label>
          <input type="text" style={styles.formGroup_inputText} id="title" placeholder="Enter video title" {...register("title", {required: true, validate: val => new RegExp(/^[a-zA-Z0-9~!@#$%^&*()?:,.]/).test(val) || "Invalid title"})} />
          {errors.title && <span style={styles.error}>{errors.title.message || "This field is required"}</span>}
        </div>
        {/* Description */}
        <div className="form-group" style={styles.formGroup}>
          <label style={styles.formGroup_label} htmlFor="description">Description</label>
          <textarea style={styles.formGroup_Textarea} id="description" rows={4} placeholder="Enter video description" {...register("description", {})} ></textarea>
          {errors.description && <span style={styles.error}>{errors.description.message || "Unexpected error"}</span>}
        </div>
        {/* Video File */}
        <div className="form-group" style={styles.formGroup}>
          <label style={styles.formGroup_label} htmlFor="video-file">Video File</label>
          <input style={styles.formGroup_inputFile} type="file" id="video-file" accept="video/*" {...register('videoFile', {required: true, validate: validateVideoFile})} />
          {errors.videoFile && <span style={styles.error}>{errors.videoFile.message || "This field is required"}</span>}
        </div>
        {/* Privacy Status */}
        <div className="form-group" style={styles.formGroup}>
          <label style={styles.formGroup_label} htmlFor="privacy-status">Privacy Status</label>
          <select style={styles.formGroup_select} id="privacy-status" {...register('privacyStatus', {required: true})} >
            <option value="public">Public</option>
            <option value="private">Private</option>
            <option value="Unlisted">Unlisted</option>
          </select>
        </div>
        {/* Submit Button */}
        <div className="form-group" style={styles.formGroup}>
          <button type="submit" style={styles.formGroup_submitButton} onMouseEnter={() => setSubmitButtonHovered(true)} onMouseLeave={() => setSubmitButtonHovered(false)}>Upload Video</button>
        </div>
      </form>
    </div>
  );
};

export default User_UploadVideoForm;