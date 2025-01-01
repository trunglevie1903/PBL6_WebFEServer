import axios from "axios";
import React, { CSSProperties, useEffect, useRef, useState } from "react";
import { ReactBtn } from "./ReactBtn";
import { ReactCount } from "./ReactCount";
import { useAuth } from "../../../../../../contexts/AuthContext";

interface InputProp {
  videoId: string | null | undefined;
}

export const ReactSection: React.FC<InputProp> = ({videoId}) => {
  const [reactCount, set_reactCount] = useState<number>(0);
  const [reactState, set_reactState] = useState<string>("");
  const hasLoadedData = useRef(false);
  const {checkToken, checkTokenValidity, accessToken} = useAuth();

  // request BE-API to get react count and user's react state
  useEffect(() => {
    const fetchData = async () => {
      if (!hasLoadedData.current && videoId !== null && videoId !== undefined && videoId.trim() !== "") {
        try {
          const response = await axios.get(`http://127.0.0.1:4000/video/react-count/${videoId}`);
          if (response.data && response.data.message === "request succeed") {
            if (typeof response.data.reactCount === "number") set_reactCount(response.data.reactCount);
          } else throw response;
          const response2 = await axios.get(`http://127.0.0.1:4000/video/react-state/${videoId}`, {
            headers: {
              "Authorization": `Bearer ${accessToken}`
            }
          });
          if (response2.data && response.data.message === "request succeed") {
            if (typeof response2.data.reactState === "string") set_reactState(response2.data.reactState);
            console.log("react state: ", response.data.reactState)
          } else throw response2;
          // hasLoadedData.current = true;
        } catch (error) {
          console.error(axios.isAxiosError(error) ? error.message : error);
          // alert(axios.isAxiosError(error) ? error.message : error);
        }
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!hasLoadedData.current && videoId !== null && videoId !== undefined && videoId.trim() !== "") {
        try {
          const response = await axios.get(`http://127.0.0.1:4000/video/react-count/${videoId}`);
          if (response.data && response.data.message === "request succeed") {
            if (typeof response.data.reactCount === "number") set_reactCount(response.data.reactCount);
          } else throw response;
        } catch (error) {
          console.error(axios.isAxiosError(error) ? error.message : error);
          // alert(axios.isAxiosError(error) ? error.message : error);
        }
      }
    };
    fetchData();
  }, [reactState, videoId]);

  const handleClickLike = () => {
    const process = async () => {
      try {
        if (await checkTokenValidity() === false) {
          alert("You need to sign in to perform this action");
          throw new Error("Unauthorized");
        }
        set_reactState("liked");
        const response = await axios.post(`http://127.0.0.1:4000/video/react-video/${videoId}`,
          {state: "liked"},
          {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${accessToken}`
            }
          }
        );
        if (response.data && response.data.message === "request succeed") {
          console.log(response.data.message);
        }
      } catch (error) {
        console.error(axios.isAxiosError(error) ? error.message : error);
      }
    };
    process();
  };
  const handleClickLiked = () => {
    const process = async () => {
      try {
        if (await checkTokenValidity() === false) {
          alert("You need to sign in to perform this action");
          throw new Error("Unauthorized");
        }
        set_reactState("");
        const response = await axios.post(`http://127.0.0.1:4000/video/remove-react-video${videoId}`,
          {},
          {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${accessToken}`
            }
          }
        );
        if (response.data && response.data.message === "request succeed") {
          console.log(response.data.message);
        }
      } catch (error) {
        console.error(axios.isAxiosError(error) ? error.message : error);
      }
    };
    process();
  };
  const handleClickDislike = () => {
    const process = async () => {
      try {
        if (await checkTokenValidity() === false) {
          alert("You need to sign in to perform this action");
          throw new Error("Unauthorized");
        }
        set_reactState("disliked");
        const response = await axios.post(`http://127.0.0.1:4000/video/react-video/${videoId}`,
          {state: "disliked"},
          {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${accessToken}`
            }
          }
        );
        if (response.data && response.data.message === "request succeed") {
          console.log(response.data.message);
        }
      } catch (error) {
        console.error(axios.isAxiosError(error) ? error.message : error);
      }
    };
    process();
  };
  const handleClickDisliked = () => {
    const process = async () => {
      try {
        if (await checkTokenValidity() === false) {
          alert("You need to sign in to perform this action");
          throw new Error("Unauthorized");
        }
        set_reactState("");
        const response = await axios.post(`http://127.0.0.1:4000/video/remove-react-video${videoId}`,
          {},
          {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${accessToken}`
            }
          }
        );
        if (response.data && response.data.message === "request succeed") {
          console.log(response.data.message);
        }
      } catch (error) {
        console.error(axios.isAxiosError(error) ? error.message : error);
      }
    };
    process();
  };
  const styles: {[key: string]: CSSProperties} = {
    wrapper: {
      width: "10%",
      maxWidth: "8em",
      // border: "2px solid #444",
      borderRadius: ".5em",
      marginTop: "1em",
      display: "flex",
      flexDirection: "column",
      flexWrap: "nowrap",
      justifyContent: "flex-start",
      alignItems: "center",
      paddingBottom: "0",
    }
  };
  return (
    <div style={styles.wrapper}>
      {/* Like button */}
      <ReactBtn
        isActivated={reactState === "liked"}
        activatedText={"Liked"}
        defaultText={"Like"}
        handleActivate={handleClickLike}
        handleDeactivate={handleClickLiked}
      />
      {/* Reacted Count */}
      <ReactCount count={reactCount} />
      {/* Dislike button */}
      <ReactBtn
        isActivated={reactState === "disliked"}
        activatedText={"Disliked"}
        defaultText={"Dislike"}
        handleActivate={handleClickDislike}
        handleDeactivate={handleClickDisliked}
      />
    </div>
  );
};