import axios from "axios";
import React, {CSSProperties, useEffect, useRef} from "react";

const shortenCount = (input: number): string => {
  if (typeof input !== "number" || !Number.isInteger(input)) {
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
}
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

interface InputProp {
  videoId: string | null;
}

export const WatchCountAndUploadSince: React.FC<InputProp> = ({videoId}) => {
  const watchCount = useRef(0);
  const uploadTime = useRef(new Date());
  const watchCountStr = useRef("");
  const uploadDifferences = useRef("");
  const hasLoadedData = useRef(false);

  useEffect(() => {
    const process = async () => {
      if (!hasLoadedData.current && videoId !== null && videoId !== undefined && videoId.trim() !== "") {
        const response = await axios.get(`http://127.0.0.1:4000/video/watch-count-and-upload-time/${videoId}`);
        if (response.data && response.data.message === "request succeed") {
          if (typeof response.data.watchCount === "number") watchCount.current = response.data.watchCount;
          if (typeof response.data.uploadTime === "string" && Date.parse(response.data.uploadTime)) uploadTime.current = new Date(response.data.uploadTime);
          hasLoadedData.current = true;
        }
      }
      watchCountStr.current = shortenCount(watchCount.current);
      uploadDifferences.current = generateTimeDifferencesStr(uploadTime.current);
    };
    process();
  }, [videoId]);

  const styles: {[key: string]: CSSProperties} = {
    text: {
      width: "100%",
      height: "2em",
      padding: "0.5em 0.25em",
      alignSelf: "center",
      textAlign: "start",
    }
  };
  return (
    <p style={styles.text}>
      {watchCountStr.current}&nbsp;&middot;&nbsp;{uploadDifferences.current}
    </p>
  );
};