import React, {useState, useRef, useEffect, CSSProperties} from "react";
import { useNavigate } from "react-router-dom";

import parrot from "../../../../../../assets/parrot.jpg";
import { Thumbnail } from "./Thumbnail";
import { Avt } from "./Avt";
import { CreatorUsername } from "./Username";
import { VideoWatchCountAndUploadSince } from "./WatchCountAndUploadSince";
import { Title } from "./Title";
import axios from "axios";

interface InputProp {
  videoId: string | null;
}

export const DefaultVideoCard: React.FC<InputProp> = ({videoId}) => {
  const [isHovering, set_isHovering] = useState<boolean>(false);
  const setHovered = () => set_isHovering(true);
  const setNotHovered = () => set_isHovering(false);
  const generateRandomWatchCount = (input: number | null): number => {
    if (typeof input === "number") return input;
    else return (Math.floor(Math.random()*(1000000000000 - 0) + 0));
  };
  const shortenCount = (input: number): string => {
    console.log(input, typeof input);
    if (typeof input !== "number") {
      throw new TypeError("Input must be an integer number.");
    }
    const thresholds = [
      { value: 1e15, suffix: "P" }, // 1 quadrillion (Peta)
      { value: 1e12, suffix: "T" }, // 1 trillion (Tera)
      { value: 1e9, suffix: "B" },  // 1 billion
      { value: 1e6, suffix: "M" },  // 1 million
      { value: 1e3, suffix: "K" },  // 1 thousand
    ];
    if (input >= 1e15) {
      return ">1P views";
    }
    for (const threshold of thresholds) {
      if (input >= threshold.value) {
        return (input / threshold.value).toFixed(1).replace(/\.0$/, "") + threshold.suffix + " views";
      }
    }
    // If the number is less than 1000, return it as-is
    return input.toString() + (input !== 1 ? " views" : " view");
  };
  const generateRandomDate = (input: Date | null) => {
    if (input instanceof Date) {
      // If the input is a Date, return it directly
      return input;
    } else if (input === null) {
      // If the input is null, generate a random date
      const start = new Date(2023, 0, 1).getTime(); // Start from Unix epoch
      const end = new Date().getTime(); // Current time
      const randomTimestamp = Math.floor(Math.random() * (end - start)) + start;
      return new Date(randomTimestamp);
    } else {
      // throw new TypeError("Input must be a Date or null");
      return new Date();
    }
  };
  const generateTimeDifferencesStr = (inputDate: Date): string => {
    if (!(inputDate instanceof Date)) {
      throw new TypeError("Input must be a Date object.");
    }
  
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - inputDate.getTime()) / 1000); // Time difference in seconds
    // console.log(diffInSeconds);
    
    if (diffInSeconds < 0) {
      return "In the future";
    }
    const timeUnits = [
      {value: 1, suffix: "second"},
      {value: 60, suffix: "minute"},
      {value: 3600, suffix: "hour"},
      {value: 86400, suffix: "day"},
      {value: 86400*7, suffix: "week"},
      {value: 86400*30, suffix: "month"},
      {value: 86400*365, suffix: "year"},
    ];
    for (let i = timeUnits.length - 1; i >= 0; --i) {
      const {value, suffix} = timeUnits[i];
      if (diffInSeconds >= value) {
        const count = Math.floor(diffInSeconds / value);
        return `${count} ${suffix}${count === 1 ? '' : 's'} ago`;
      }
    }
    return ('Just now');
  };
  const [thumbnail, set_thumbnail] = useState<string>("");
  const [avt, set_avt] = useState<string>("");
  const [title, set_title] = useState<string>("");
  const [username, set_username] = useState<string>("");
  const watchCount = useRef<number>(generateRandomWatchCount(null));
  const uploadTime = useRef<Date>(generateRandomDate(null));
  useEffect(() => {
    if (videoId !== null && videoId !== undefined && videoId.trim() !== "") {
      // request BE-API to get data
      const fetchThumbnailAndTitle = async () => {
        const response = await axios.get(`http://127.0.0.1:4000/video/thumbnail-and-title/${videoId}`);
        if (response.data && response.data.message === "request succeed") {
          set_thumbnail(response.data.thumbnail);
          set_title(response.data.title);
        }
      };
      fetchThumbnailAndTitle();
    }
  }, [videoId]);
  useEffect(() => {
    if (videoId !== null && videoId !== undefined && videoId.trim() !== "") {
      const fetchWatchCountAndUploadTime = async () => {
        const response = await axios.get(`http://127.0.0.1:4000/video/watch-count-and-upload-time/${videoId}`);
        if (response.data && response.data.message === "request succeed") {
          console.log(response.data.watchCount);
          watchCount.current = parseInt(response.data.watchCount);
          uploadTime.current = new Date(response.data.uploadTime);
        }
      };
      fetchWatchCountAndUploadTime();
    };
  }, [videoId]);
  useEffect(() => {
    if (videoId !== null && videoId !== undefined && videoId.trim() !== "") {
      const fetchCreatorUsername = async () => {
        const response = await axios.get(`http://127.0.0.1:4000/video/get-creator-username/${videoId}`);
        if (response.data && response.data.message === "request succeed") {
          console.log("username: ", response.data.username);
          set_username(response.data.username);
        }
      };
      fetchCreatorUsername();
    }
  }, [videoId]);
  useEffect(() => {
    const fetchWatchCountAndUploadTime = async () => {
      if (username !== null && username !== undefined && username.trim() !== "") {
        const response = await axios.get(`http://127.0.0.1:4000/user/${username}/avatar`);
          if (response.data && response.data.avatar === "request succeed") {
            set_avt(response.data.avatar);
          }
      };
    };
    fetchWatchCountAndUploadTime();
  }, [username]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:4000/user/${username}/avatar`);
        if (response.data && response.data.message === "request succeed") {
          if (typeof response.data.avatar === "string") {
            set_avt(response.data.avatar);
          };
        } else throw response;
      } catch (error) {
        console.error(axios.isAxiosError(error) ? error.message : error);
      };
    };
    fetchData();
  }, [username]);

  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/video/${videoId}`);
  };
  
  const styles: {[key: string]: CSSProperties} = {
    wrapper: {
      width: "320px",
      border: isHovering ? "1px solid #000" : "1px solid transparent",
      borderRadius: "5px",
      transition: "all 0.3s ease",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      flexWrap: "nowrap",
      cursor: "pointer",
    },
    vidDetailWrapper: {
      width: "100%",
      overflow: "hidden",
      display: "inline-flex",
      flexDirection: "row",
      flexWrap: "nowrap",
      justifyContent: "center",
      alignItems: "start",
    },
    textsWrapper: {
      width: "calc(100% - 3rem)",
      display: "flex",
      flexDirection: "column",
      flexWrap: "nowrap",
      justifyContent: "center",
      alignItems: "flex-start",
    }
  };
  return (
    <div
      style={styles.wrapper}
      onMouseEnter={setHovered}
      onMouseLeave={setNotHovered}
      onClick={handleClick}
    >
      <Thumbnail img={thumbnail || parrot} />
      <div style={styles.vidDetailWrapper}>
        <Avt img={avt || parrot} />
        <div style={styles.textsWrapper}>
          <Title str={title} />
          <CreatorUsername str={username} />
          <VideoWatchCountAndUploadSince 
            watchCountStr={shortenCount(watchCount.current)} 
            uploadSince={generateTimeDifferencesStr(uploadTime.current)} 
          />
        </div>
      </div>
    </div>
  );
};