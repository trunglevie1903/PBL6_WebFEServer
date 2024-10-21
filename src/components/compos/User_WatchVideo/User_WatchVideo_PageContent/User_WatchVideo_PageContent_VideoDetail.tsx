import React, {useState, useEffect} from 'react';
import axios from 'axios';
import checkValidToken from '../../../functions/checkValidToken';

interface VideoProp {
  videoId: string;
};

interface Transcript {
  timestamp: number;
  text: string;
  transcriptId: string;
  videoId: string;
}

const User_WatchVideo_PageContent_VideoDetail: React.FC<VideoProp> = ({videoId}) => {
  const [title, setTitle] = useState<string>("");
  const [creatorName, setCreatorName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [creatorUserId, setCreatorUserId] = useState<string>("");
  const [transcript, setTranscript] = useState<Transcript[]>([]);
  const [summary, setSummary] = useState<string>("No summary");
  const [uploadDate, setUploadDate] = useState<Date>();
  const [avatarSource, setAvatarSource] = useState<string>("");
  const [likeStatus, setLikeStatus] = useState<string|null>(null);
  const [likeCount, setLikeCount] = useState<number>(0);
  const [dislikeCount, setDislikeCount] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await axios.get(`http://127.0.0.1:4000/video/get-video-detail/${videoId}`);
        if (axios.isAxiosError(response) || response.status !== 200) throw response;
        const {video} = response.data;
        if (!video) throw new Error("Video not found");
        // console.log("video: ", video);
        if (!video.title || !video.creatorUserId || !video.description || !video.uploadDate) throw new Error("Unexpected error when fetching video data");

        response = await axios.get(`http://127.0.0.1:4000/user/profile-mini-card/${video.creatorUserId}`);
        if (axios.isAxiosError(response) || response.status !== 200) throw response;
        const {profile} = response.data;
        // console.log('profile: ', profile);
        if (!profile.username) throw new Error("Unexpected error when fetching video creator's data");

        response = await axios.get(`http://127.0.0.1:4000/video/get-transcript/${videoId}`);
        if (axios.isAxiosError(response) || response.status !== 200) throw response;
        console.log(response.data);
        const {transcripts} = response.data;
        // if (!transcripts) throw new Error("Unexpected error when fetching transcript and summary");
        // console.log('transcript: ', transcripts);

        response = await axios.get(`http://127.0.0.1:4000/video/get-summary/${videoId}`);
        if (axios.isAxiosError(response) || response.status !== 200) throw response;
        console.log(response.data.summary.summary);
        const {summary} = response.data;
        if (!summary) throw new Error("Unexpected error when fetching transcript and summary");

        
        setTitle(video.title);
        setCreatorUserId(video.creatorUserId);
        setDescription(video.description);
        setUploadDate(video.uploadDate);
        setTranscript(transcripts);
        setSummary(summary.summary);
        setCreatorName(profile.username);
        setAvatarSource(profile.avatarImage || "https://via.placeholder.com/150");
      } catch (error) {
        if (axios.isAxiosError(error) && error.response && error.response.data && error.response.data.error) alert(`Error: ${error.response.data.error}`);
        else alert(`Error: ${error}`);
      }
    };

    fetchData();
  }, [videoId]);

  useEffect(() => {
    checkValidToken().then(async val => {
      if (!val) return;
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.get(`http://127.0.0.1:4000/rel-user-video/get-like-status/${videoId}`, {
        headers: {
          "Authorization": `Bearer ${accessToken}`
        }
      });
      if (axios.isAxiosError(response) || response.status !== 200) throw response;
      if ("status" in response.data) setLikeStatus(response.data.status)
      else setLikeStatus(null);
    });
  }, [videoId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:4000/rel-user-video/get-like-count/${videoId}`, {});
        if (axios.isAxiosError(response) || response.status !== 200) throw response;
        if ('likeCount' in response.data) setLikeCount(response.data.likeCount);
        else setLikeCount(0);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response && error.response.data.message) alert(`Error: ${error.response.data.message}`);
        else alert(`Error: ${error}`);
      }
    }
    fetchData();
  }, [videoId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:4000/rel-user-video/get-dislike-count/${videoId}`, {});
        if (axios.isAxiosError(response) || response.status !== 200) throw response;
        if ('dislikeCount' in response.data) setDislikeCount(response.data.dislikeCount);
        else setDislikeCount(0);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response && error.response.data.message) alert(`Error: ${error.response.data.message}`);
        else alert(`Error: ${error}`);
      }
    }
    fetchData();
  }, [videoId]);

  const handleClickLikeVideo = () => {
    checkValidToken().then(async val => {
      if (!val) return;
      try {
        if (likeStatus !== "liked") {
          setLikeStatus("liked");
          const data = {videoId, likeStatus: "liked"};
          const accessToken = localStorage.getItem("accessToken");
          const response = await axios.post(
            "http://127.0.0.1:4000/rel-user-video/update-like-status", data, {
              headers: {
                "Authorization" : `Bearer ${accessToken}`,
                "Content-Type" : "application/json"
              }
            }
          );
          if (axios.isAxiosError(response) || response.status !== 200) throw response;
        } else {
          setLikeStatus(null);
          const data = {videoId};
          const accessToken = localStorage.getItem("accessToken");
          const response = await axios.post(
            "http://127.0.0.1:4000/rel-user-video/delete-like-status", data, {
              headers: {
                "Authorization" : `Bearer ${accessToken}`,
                "Content-Type" : "application/json"
              }
            }
          );
          if (axios.isAxiosError(response) || response.status !== 200) throw response;
        }
      } catch (error) {
        if (axios.isAxiosError(error) && error.response && error.response.data && error.response.data.error) alert(`Error: ${error.response.data.error}`);
        else alert(`Error: ${error}`);
      }
    });
  };

  const handleClickDislikeVideo = () => {
    checkValidToken().then(async val => {
      if (!val) return;
      try {
        if (likeStatus !== "disliked") {
          setLikeStatus("disliked");
          const data = {videoId, likeStatus: "disliked"};
          const accessToken = localStorage.getItem("accessToken");
          const response = await axios.post(
            "http://127.0.0.1:4000/rel-user-video/update-like-status", data, {
              headers: {
                "Authorization" : `Bearer ${accessToken}`,
                "Content-Type" : "application/json"
              }
            }
          );
          if (axios.isAxiosError(response) || response.status !== 200) throw response;
          // setLikeStatus("disliked");
        } else {
          setLikeStatus(null);
          const data = {videoId};
          const accessToken = localStorage.getItem("accessToken");
          const response = await axios.post(
            "http://127.0.0.1:4000/rel-user-video/delete-like-status", data, {
              headers: {
                "Authorization" : `Bearer ${accessToken}`,
                "Content-Type" : "application/json"
              }
            }
          );
          if (axios.isAxiosError(response) || response.status !== 200) throw response;
        }
      } catch (error) {
        if (axios.isAxiosError(error) && error.response && error.response.data && error.response.data.error) alert(`Error: ${error.response.data.error}`);
        else alert(`Error: ${error}`);
      }
    });
  };

  const handleClickCreator = () => {
    alert(`Creator ID: ${creatorUserId}`);
  };

  const [isHoveringCreatorCard, setHoveringCreatorCard] = useState(false);

  return (
    <div style={{border: "1px solid #ddd", padding: "10px 20px"}}>
      <div style={{padding: "10px", marginBottom: "5px", borderBottom: "1px solid #ddd"}}>
        <h1>{title}</h1>
        {uploadDate && <p>Uploaded at {new Date(uploadDate).toLocaleDateString()}</p>}
      </div>
      <div style={{
        padding: "5px", width: "100%", display: "flex", flexDirection: "row", gap: "10px", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid transparent",
      }}>
        <div onClick={handleClickCreator} style={{
          flex: 3,
          padding: "5px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
          gap: "10px",
          borderRadius: "5px",
          border: isHoveringCreatorCard ? "2px solid #ddd" : "2px solid transparent",
          transition: "all 0.3s",
        }} onMouseEnter={() => setHoveringCreatorCard(true)} onMouseLeave={() => setHoveringCreatorCard(false)}>
          <img style={{width: "40px", height: "40px", border: "1px solid #ddd", borderRadius: "50px"}} src={avatarSource} alt="" />
          <p style={{}}>{creatorName}</p>
        </div>
        <div style={{flex: 7, display: "flex", flexDirection: "row", justifyContent: "flex-end", alignItems: "center", gap: "10px", padding: "5px"}}>
          <div style={{display: "flex", flexDirection: "row", gap: "5px"}}>
            <p>{likeCount}</p>
            <p style={{
              color: likeStatus === "liked" ? "white" : "black",
              backgroundColor: likeStatus === "liked" ? "black" : "transparent",
            }} onClick={handleClickLikeVideo}>{likeStatus === "liked" ? "Liked" : "Like"}</p>
          </div>
          <div style={{display: "flex", flexDirection: "row", gap: "5px"}}>
            <p>{dislikeCount}</p>
            <p style={{
              color: likeStatus === "disliked" ? "white" : "black",
              backgroundColor: likeStatus === "disliked" ? "black" : "transparent",
            }} onClick={handleClickDislikeVideo}>{likeStatus === "disliked" ? "Disliked" : "Dislike"}</p>
          </div>
        </div>
      </div>
      <div style={{
        padding: "10px", display: "flex", flexDirection: "column", gap: "10px"
      }}>
        <div>
          <p>{description}</p>
        </div>
        <div>
          <h4>Transcript</h4>
          {transcript.length == 0 ? "No transcript" : transcript.map((item) => (
            <p>
              <strong>{item.timestamp}</strong>&nbsp;<span>{item.text}</span>
            </p>
          ))}
        </div>
        <div>
          <h4>Summary</h4>
          <p>{summary}</p>
        </div>
      </div>
    </div>
  );
};

export default User_WatchVideo_PageContent_VideoDetail;