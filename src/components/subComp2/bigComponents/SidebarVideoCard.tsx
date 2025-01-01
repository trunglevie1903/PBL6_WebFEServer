import React, {CSSProperties, useState, useEffect, useRef} from 'react';
import { useNavigate } from 'react-router-dom';

import parrot from '../../assets/parrot.jpg';

const generateRandomWatchCount = (input: number | null): number => {
  if (typeof input === "number") return input;
  else return (Math.floor(Math.random()*(1000000000000 - 0) + 0));
};

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
  return input.toString() + (input !== 1 ? "views" : "view");
}

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

interface ThumbnailProp {
  source: string;
}

export const Thumbnail: React.FC<ThumbnailProp> = ({source}) => {
  const styles: {[key: string]: CSSProperties} = {
    img: {
      flex: 1,
      height: "7.5rem",
      aspectRatio: "16/9",
      objectFit: "contain",
    }
  };
  return (
    <img src={source} alt="thumb" style={styles.img}/>
  );
};

interface TitleProp {
  str: string;
}

export const Title: React.FC<TitleProp> = ({str}) => {
  const styles: {[key: string]: CSSProperties} = {
    text: {
      height: "4rem",
      minWidth: "rem",
      width: "100%",
      padding: "0.5rem 0.25rem",
      fontSize: "1.25rem",
      fontWeight: "bold",
      overflow: "hidden",
      textOverflow: "ellipsis",
      display: "-webkit-box",
      WebkitLineClamp: 2,
      WebkitBoxOrient: "vertical",
      whiteSpace: "normal",
    }
  };
  return (
    <p style={styles.text}>
      {str}
    </p>
  );
};

interface CreatorUsernameProp {
  str: string;
}

export const CreatorUsername: React.FC<CreatorUsernameProp> = ({str}) => {
  const username = str;
  const styles: {[key: string]: CSSProperties} = {
    text: {
      width: "100%",
      height: "1.5rem",
      padding: "0.25rem",
      alignSelf: "center",
      textAlign: "start",
      overflow: "hidden",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
    }
  };
  return (
    <p style={styles.text}>
      {username}
    </p>
  );
};

interface VideoWatchCountAndUploadTimeProp {
  watchCountStr: string;
  uploadSince: string;
}

export const VideoWatchCountAndUploadSince: React.FC<VideoWatchCountAndUploadTimeProp> = ({watchCountStr, uploadSince}) => {
  const styles: {[key: string]: CSSProperties} = {
    text: {
      width: "100%",
      height: "2rem",
      padding: "0.5rem 0.25rem",
      overflow: "hidden",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
      alignSelf: "center",
      textAlign: "start",
    }
  };
  return (
    <p style={styles.text}>
      {watchCountStr}&nbsp;&middot;&nbsp;{uploadSince}
    </p>
  );
};

interface SidebarVideoCardProp {
  videoId: string | null;
}

export const SidebarVideoCard: React.FC<SidebarVideoCardProp> = ({videoId}) => {
  const [isHovering, set_isHovering] = useState<boolean>(false);

  const thumbnail = useRef<string>(parrot);
  const title = useRef<string>("Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda, cumque eum!");
  const username = useRef<string>("Username");
  const watchCount = useRef<number>(generateRandomWatchCount(null));
  const uploadTime = useRef<Date>(generateRandomDate(null));
  const hasLoadedData = useRef(false);
  useEffect(() => {
    if (!hasLoadedData.current) {
      hasLoadedData.current = true;
      // request BE-API to get data

      // post-processing
    }
  }, []);

  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/video/abcxyz');
  };

  const styles: {[key: string]: CSSProperties} = {
    wrapper: {
      width: "40%",
      minWidth: "32rem",
      minHeight: "calc(7.5rem + 2px)",
      border: isHovering ? "1px solid #000" : "1px solid transparent",
      transition: "all .3s ease",
      borderRadius: "5px",
      overflow: "hidden",
      display: "inline-flex",
      flexDirection: "row",
      flexWrap: "nowrap",
      justifyContent: "flex-start",
      alignItems: "center",
      cursor: "pointer",
    },
    textsWrapper: {
      // width: "60%",
      flex: 2,
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
      onMouseEnter={() => set_isHovering(true)}
      onMouseLeave={() => set_isHovering(false)}
      onClick={handleClick}
    >
      <Thumbnail source={thumbnail.current} />
      <div style={styles.textsWrapper}>
        <Title str={title.current} />
        <CreatorUsername str={username.current} />
        <VideoWatchCountAndUploadSince 
          watchCountStr={shortenCount(watchCount.current)}
          uploadSince={generateTimeDifferencesStr(uploadTime.current)}
        />      
      </div>
    </div>
  );
}