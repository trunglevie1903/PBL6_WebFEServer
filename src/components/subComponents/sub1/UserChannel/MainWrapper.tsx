import React, { useState, CSSProperties, useEffect } from 'react';
import axios from 'axios';

interface PropInterface {
  userId: string;
}

const MainWrapper: React.FC<PropInterface> = ({ userId }) => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [activeTab, setActiveTab] = useState('playlists');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:4000/user/id/${userId}`
        );
        // console.log('response: ', response);
        if (response.data) {
          setName(response.data.name);
          setUsername(response.data.username);
          setDescription(response.data.description);
          if (!description) setDescription("");
        }
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          alert(`Error: ${error.response?.data.message || error}`);
        } else {
          alert(`Error: ${error}`);
        }
      }
    };
    fetchData();
  }, [userId]);

  const handleClickPlaylist = () => {
    setActiveTab('playlists');
  };

  const handleClickPost = () => {
    setActiveTab('posts');
  };

  return (
      

    <div style={{...styles.content}}>
      {/* <h1>Welcome to User Homepage</h1>
      <p>Content will go here...</p> */}
      <div style={styles.container} className="container">
        <div style={styles.channelHeader} className="channel-header">
        <div style={styles.banner} className="banner"></div>
          <div style={styles.quickProfile} className="quick-profile">
            <div style={styles.quickProfile_avatar} className="avatar"></div>
            <div style={styles.quickProfile_userInfo} className="user-info">
              <h1 style={styles.userInfo_h1}>{name}</h1>
              <div style={styles.userInfo_username} className="username">@{username}</div>
              <p style={styles.userInfo_bonusInfo} className="channel-link-text">
                {description.length > 20 ? (description.substring(0, 20)+"...") : description}&nbsp;<strong>More</strong>
              </p>
            </div>
          </div>
          <div style={styles.channelActions} className="channel-actions">
            <button style={styles.channelActions_button}>Customize profile</button>
            <button style={styles.channelActions_button}>Manage videos</button>
          </div>
        </div>
        <div style={styles.channelContent} className="channel-content">
          <div style={styles.contentMenu} className="content-menu">
            <div onClick={handleClickPlaylist} style={styles.contentMenu_option} className="active" id="playlistTab">Playlists</div>
            <div onClick={handleClickPost} style={styles.contentMenu_option} id="postTab">Posts</div>
            <div style={styles.horizontalLine} className="horizontal-line"></div>
          </div>
          <div style={{ display: activeTab === "playlists" ? "block" : "none" }} className="playlist-section active-section" id="playlistSection">
            <h4>My playlists</h4>
          </div>
          <div style={{ display: activeTab === "posts" ? "block" : "none" }} className="posts-section" id="postSection">
            <div style={styles.postSection_postForm} className="post-form">
              <textarea style={styles.postForm_textArea} rows={1} placeholder="Write your post here..."></textarea>
              <button style={styles.postForm_button}>Create Post</button>
            </div>
            <table></table>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles: { [key: string]: CSSProperties } = {
  mainWrapper: {
    display: 'flex',
    height: 'calc(100vh - 66px)', // Adjust for header height
  },
  content: {
    flex: 1,
    padding: '20px',
    transition: 'margin-left 0.3s ease',
  },
  content_h1: {
    marginBottom: "20px"
  },
  content_p: {
    fontSize: "18px"
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "20px"
  },
  channelHeader: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    paddingBottom: "20px",
    borderBottom: "1px solid #ddd"
  },
  quickProfile: {
    display: "flex",
    alignItems: "center" as CSSProperties["textAlign"]
  },
  quickProfile_avatar: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    backgroundColor: "#ccc",
  },
  banner: {
    width: "100%",
    height: "150px",
    borderRadius: "10px",
    backgroundColor: "#ccc"
  },
  quickProfile_userInfo: {
    marginLeft: "20px"
  },
  userInfo_h1: {
    fontSize: "24px"
  },
  userInfo_username: {
    fontSize: "18px",
    color: "#666"
  },
  userInfo_bonusInfo: {
    color: "#555",
    cursor: "pointer",
    marginTop: "10px"
  },
  channelActions: {
    display: "flex",
    gap: "20px",
    marginTop: "10px"
  },
  channelActions_button: {
    padding: "10px 15px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    backgroundColor: "#f7f7f7",
    cursor: "pointer"
  },
  channelContent: {
    marginTop: "20px"
  },
  contentMenu: {
    display: "flex",
    gap: "20px",
    marginBottom: "10px",
    position: "relative"
  },
  contentMenu_option: {
    paddingBottom: "10px",
    cursor: "pointer",
    position: "relative"
  },
  horizontalLine: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    borderBottom: "1px solid #ccc"
  },
  postSection_postForm: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    padding: "10px",
    marginTop: "5px",
    marginBottom: "20px",
    borderRadius: "5px",
    border: "1px solid #ddd"
  },
  postForm_textArea: {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    width: "100%"
  },
  postForm_button: {
    width: "100px",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    backgroundColor: "#f7f7f7",
    cursor: "pointer"
  }
};

export default MainWrapper;
