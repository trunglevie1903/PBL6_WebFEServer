import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Guest_Homepage_Header from '../compos/Guest_HomePage/Guest_HomePage_Header';
import User_HomePage_Header from '../compos/User_HomePage/User_HomePage_Header';
import checkValidToken from '../functions/checkValidToken';

interface UserProfileData {
  userId: string;
  username: string;
  name: string;
  description: string;
  bannerImage: string;
  avatarImage: string;
}

interface VideoData {
  videoId: string;
  title: string;
  thumbnail: string;
}

const styles: { [key: string]: React.CSSProperties } = {
  userProfilePage: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    padding: '20px',
  },
  userInfoSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  userBanner: {
    width: '100%',
    maxHeight: '250px',
    objectFit: 'cover',
  },
  userInfoBox: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '-50px',
    backgroundColor: '#fff',
    borderRadius: '10px',
    padding: '15px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
    width: '80%',
  },
  userAvatar: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    objectFit: 'cover',
    marginRight: '20px',
  },
  userTextInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
  },
  userVideosSection: {
    display: 'flex',
    flexDirection: 'column',
  },
  videoOptions: {
    display: 'flex',
    gap: '15px',
    marginBottom: '20px',
  },
  videoOptionButton: {
    padding: '8px 12px',
    border: 'none',
    cursor: 'pointer',
    backgroundColor: '#e0e0e0',
    borderRadius: '5px',
    fontWeight: 'bold',
  },
  videoOptionButtonActive: {
    backgroundColor: '#1976d2',
    color: 'white',
  },
  videoOptionButtonDisabled: {
    cursor: 'not-allowed',
    opacity: 0.6,
  },
  videosGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
  },
  videoCard: {
    width: '200px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    textAlign: 'center',
    textDecoration: 'none',
  },
  videoThumbnail: {
    width: '100%',
    height: '120px',
    objectFit: 'cover',
    borderRadius: '5px',
  },
  videoTitle: {
    margin: 0,
    fontWeight: 'bold',
  },
};

const UserProfilePage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [isUserAuthenticated, setIsUserAuthenticated] = useState<boolean | null>(null);
  const [profile, setProfile] = useState<UserProfileData | null>(null);
  const [videoList, setVideoList] = useState<string[]>([]);
  const [videoCards, setVideoCards] = useState<VideoData[]>([]);
  const [activeTab, setActiveTab] = useState<'latest' | 'popular' | 'oldest'>('latest');

  useEffect(() => {
    const checkAuthentication = async () => {
      const isValid = await checkValidToken();
      setIsUserAuthenticated(isValid);
    };
    checkAuthentication();
  }, []);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const profileResponse = await axios.get(`http://127.0.0.1:4000/user/key/${userId}`);
        // console.log("profile: ", profileResponse.data.profile);
        setProfile(profileResponse.data.profile);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    const fetchUserVideos = async (tab: 'latest' | 'popular' | 'oldest') => {
      try {
        const routeMap = {
          latest: `http://127.0.0.1:4000/video/of-user/${userId}`,
          popular: `http://127.0.0.1:4000/video/popular-of-user/${userId}`,
          oldest: `http://127.0.0.1:4000/video/oldest-of-user/${userId}`
        };
        const listResponse = await axios.get(routeMap[tab]);
        setVideoList(listResponse.data);
      } catch (error) {
        console.error(`Error fetching ${tab} videos list:`, error);
      }
    };

    fetchUserProfile();
    fetchUserVideos(activeTab);
  }, [userId, activeTab]);

  useEffect(() => {
    const fetchVideoCards = async () => {
      try {
        const cardPromises = videoList.map(videoId =>
          axios.get(`http://127.0.0.1:4000/video/visual-data/${videoId}`).then(response => response.data.returnData)
        );
        const cards = await Promise.all(cardPromises);
        setVideoCards(cards);
      } catch (error) {
        console.error("Error fetching video cards:", error);
      }
    };

    if (videoList.length > 0) {
      fetchVideoCards();
    }
  }, [videoList]);

  if (isUserAuthenticated === null) return <p>Loading...</p>;
  if (!profile) return <p>Loading profile...</p>;

  return (
    <div>
      {isUserAuthenticated ? <User_HomePage_Header /> : <Guest_Homepage_Header />}
      <div style={styles.userProfilePage}>
        {/* User Info Section */}
        <div style={styles.userInfoSection}>
          <img src={profile.bannerImage} alt="User banner" style={styles.userBanner} />
          <div style={styles.userInfoBox}>
            <img src={profile.avatarImage} alt="User avatar" style={styles.userAvatar} />
            <div style={styles.userTextInfo}>
              <h2>{profile.name}</h2>
              <p>@{profile.username}</p>
              <p>{profile.description}</p>
            </div>
          </div>
        </div>

        {/* User's Video Section */}
        <div style={styles.userVideosSection}>
          <div style={styles.videoOptions}>
            <button
              style={{
                ...styles.videoOptionButton,
                ...(activeTab === 'latest' ? styles.videoOptionButtonActive : {})
              }}
              onClick={() => setActiveTab('latest')}
            >
              Latest
            </button>
            <button
              style={{
                ...styles.videoOptionButton,
                ...(activeTab === 'popular' ? styles.videoOptionButtonActive : styles.videoOptionButtonDisabled)
              }}
              onClick={() => setActiveTab('popular')}
              disabled
            >
              Popular
            </button>
            <button
              style={{
                ...styles.videoOptionButton,
                ...(activeTab === 'oldest' ? styles.videoOptionButtonActive : styles.videoOptionButtonDisabled)
              }}
              onClick={() => setActiveTab('oldest')}
              disabled
            >
              Oldest
            </button>
          </div>

          <div style={styles.videosGrid}>
            {videoCards.map((video) => (
              <Link key={video.videoId} to={`/video/${video.videoId}`} style={styles.videoCard}>
                <img src={video.thumbnail} alt={`${video.title} thumbnail`} style={styles.videoThumbnail} />
                <p style={styles.videoTitle}>{video.title}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
