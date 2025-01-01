import React, { useState, CSSProperties, useEffect } from "react";
import { VideoCardGrid } from "./grid";
import axios from "axios";
import { ButtonShowMoreVideo } from "./BtnShowMoreVideo";

export const HomePageBody: React.FC = () => {
  // const _videoIds: MutableRefObject<string[]> = useRef([]);
  const [_videoIds, set_videoIds] = useState<string[]>([]);
  const [offset, set_offset] = useState<number>(0);
  const [hasMoreVideo, set_hasMoreVideo] = useState<boolean>(false);

  const handleClickShowMoreVideo = () => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:4000/video/latest-100-offset-${offset}`);
        if (response.data && response.data.message === "request succeed") {
          const videoIds = response.data.videoIds;
          if (Array.isArray(videoIds)) {
            if (videoIds.length === 0 || (videoIds.length > 0 && videoIds.every(item => typeof item === 'string'))) {
              set_videoIds(_videoIds.concat(videoIds));
              set_offset(_videoIds.length);
              // _videoIds.current.concat(videoIds);
              // set_offset(_videoIds.current.length);
            }
          }
          if (typeof response.data.hasMoreVideo === "boolean" && response.data.hasMoreVideo === true) {
            set_hasMoreVideo(true);
          } else set_hasMoreVideo(false);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:4000/video/latest-100-offset-0');
        // console.log("Homepage body: ", response.data);
        if (response.data && response.data.message === "request succeed") {
          const videoIds = response.data.videoIds;
          if (Array.isArray(videoIds)) {
            if (videoIds.length === 0 || (videoIds.length > 0 && videoIds.every(item => typeof item === 'string'))) {
              set_videoIds(videoIds);
              set_offset(_videoIds.length);
            }
          }
          if (typeof response.data.hasMoreVideo === "boolean" && response.data.hasMoreVideo === true) {
            set_hasMoreVideo(true);
          } else set_hasMoreVideo(false);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  console.log("video ids: ", _videoIds);

  const styles: {[key: string] : CSSProperties} = {
    bodyWrapper: {
      width: '100%',
      display: "flex",
      flexDirection: "column",
      flexWrap: "nowrap",
    }
  };
  return (
    <div style={styles.bodyWrapper}>
      {/* <VideoCardGrid videoIds={_videoIds.current} /> */}
      <VideoCardGrid videoIds={_videoIds} />
      {hasMoreVideo && <ButtonShowMoreVideo handleClick={handleClickShowMoreVideo} />}
    </div>
  );
};