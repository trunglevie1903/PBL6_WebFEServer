import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import RegisterPage from "./components/pages/RegisterPage";
import LoginPage from "./components/pages/LoginPage";
import HomePage from "./components/pages/HomePage";
import Test_UploadButton from "./Test_UploadButton";
import User_UploadVideo_Page from "./components/pages/UploadVideo";
import WatchVideo from "./components/pages/WatchVideo";
import VideoWatchPage from "./components/pages/Test_WatchVideo";
import StatusPage from "./components/StatusPage";
import UserSelfProfile from "./components/pages/UserSelfProfile";
import UserProfilePage from "./components/pages/Guest_UserProfilePage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/status" element={<StatusPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/test" element={<Test_UploadButton />} />
        <Route path="/upload-video" element={<User_UploadVideo_Page />} />
        <Route path="/video/:videoId" element={<WatchVideo />}></Route>
        <Route path="/test-watch-video" element={<VideoWatchPage />}></Route>
        <Route path="/self" element={<UserSelfProfile />}></Route>
        <Route path="/user/:userId" element={<UserProfilePage />}></Route>
        {/* <Route path="/dummy" element={<Dummy />} /> */}
        {/* <Route path="/customize_profile" element={<CustomizeProfilePage />} /> */}
        {/* <Route path="/c/:userId" element={<UserChannel />} /> */}
        {/* <Route path="" element={} /> */}
      </Routes>
    </Router>
  );
};

export default App;