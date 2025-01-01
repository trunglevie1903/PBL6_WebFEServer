import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import checkValidToken from '../functions/checkValidToken';
import User_HomePage_Header from '../compos/User_HomePage/User_HomePage_Header';
import Guest_HomePage_Header from '../subComponents/Old_Header';

interface UserCardInputProp {
  userId: string;
}

const UserCard: React.FC<UserCardInputProp> = ({userId}) => {
  const [imageData, set_imageData] = useState<string>("");
  const [username, set_username] = useState<string>("");
  const [name, set_name] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("");
        if (response.data && response.data.user) {
          if (response.data.user.username) set_username(response.data.user.username);
          if (response.data.user.name) set_name(response.data.user.name);
          if (response.data.user.imageData) set_imageData(response.data.user.imageData);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [userId]);
  return (
    <div>
      <div>
        <img src={imageData} alt="Avatar" />
      </div>
      <div>
        <h5>{name}</h5>
        <p>{username}</p>
      </div>
    </div>
  );
};

interface SearchUserResultInputProp {
  userIds: string[];
}

const SearchUserResult: React.FC<SearchUserResultInputProp> = ({userIds}) => {
  if (userIds && userIds.length > 0) return (
    <div>
      {userIds.map((item) => <UserCard key={item} userId={item} />)}
      <hr />
    </div>
  );
  else return (<></>);
};

interface InputProp {
  searchText: string
}

interface VideoCardInputProp {
  videoId: string;
}

const VideoCard: React.FC<VideoCardInputProp> = ({videoId}) => {
  const [thumbnail, set_thumbnail] = useState<string>("");
  const [title, set_title] = useState<string>("");
  const [description, set_description] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:4000/video/visual-data/${videoId}`);
        console.log('video data: ', response.data);
        if (response.data && response.data.returnData) {
          if (response.data.returnData.thumbnail) set_thumbnail(response.data.returnData.thumbnail);
          if (response.data.returnData.title) set_title(response.data.returnData.title);
          if (response.data.returnData.description) set_description(response.data.returnData.description);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [videoId]);

  return (
    <div>
      <div>
        <img src={thumbnail} width={640} height={360} alt="Video" />
      </div>
      <div>
        <h5>{title}</h5>
        <p>{description}</p>
      </div>
    </div>
  );
};

interface SearchVideoResultInputProp {
  videoIds: string[];
}

const SearchVideoResult: React.FC<SearchVideoResultInputProp> = ({videoIds}) => {
  if (videoIds && videoIds.length > 0) return(
    <div>
      {videoIds.map(item => <VideoCard key={item} videoId={item} />)}
      <hr />
    </div>
  );
  else return (<></>);
};

const SearchResult_Page: React.FC<InputProp> = () => {
  // const location = useLocation();
  // const {searchText} = location.state || "";
  const {searchText} = useParams();

  const [userIds, set_userIds] = useState([]);
  const [videoIds, set_videoIds] = useState([]);
  const [isAuthenticated, set_isAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const checkIfAuthenticated = async () => {
      set_isAuthenticated(await checkValidToken());
    };
    checkIfAuthenticated();
  }, []);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:4000/user/search/${searchText}`, {
          headers: {
            'Content-Type': "application/json"
          }
        });
        console.log("users: ", response.data);
        if (response.data) {
          if (response.data.userIds) set_userIds(response.data.userIds);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [searchText]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:4000/video/search/${searchText}`, {
          headers: {
            'Content-Type': "application/json"
          }
        });
        console.log("videos: ", response.data);
        if (response.data) {
          if (response.data.videoIds) set_videoIds(response.data.videoIds);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [searchText]);

  return (
    <div>
      <div>
        {isAuthenticated ? <User_HomePage_Header /> : <Guest_HomePage_Header />}
      </div>
      <div>
        {userIds.length > 0 && <SearchUserResult userIds={userIds} />}
        {videoIds.length > 0 && <SearchVideoResult videoIds={videoIds} />}
      </div>
    </div>
  );
};

export default SearchResult_Page;