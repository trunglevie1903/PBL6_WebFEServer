import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import TestComponentPage from "./components/pages2/TestComponentPage";
import { AuthProvider } from "./contexts/AuthContext";
import { SignUpPage } from "./components/subComp2/pages/SignUp/page";
import { SignInPage } from "./components/subComp2/pages/SignIn/page";
import { ForgotPasswordPhase1Page } from "./components/subComp2/pages/ForgotPassword/phase1/page";
import { ForgotPasswordPhase2Page } from "./components/subComp2/pages/ForgotPassword/phase2/page";
import { HomePage } from "./components/subComp2/pages/Home/page";
import { UploadVideoPage } from "./components/subComp2/pages/UploadVideo/page";
import { WatchVideoPage } from "./components/subComp2/pages/WatchVideo/page";
import { ManageMyProfile } from "./components/subComp2/pages/ManageMyProfile/page";
import { SearchResultPage } from "./components/subComp2/pages/SearchResult/page";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/test-component" element={<TestComponentPage />} />
        <Route path="/sign-up" element={<AuthProvider><SignUpPage /></AuthProvider>} />
        <Route path="/sign-in" element={<AuthProvider><SignInPage /></AuthProvider>} />
        <Route path="/forgot-password" element={<AuthProvider><ForgotPasswordPhase1Page /></AuthProvider>} />
        <Route path="/reset-password" element={<AuthProvider><ForgotPasswordPhase2Page /></AuthProvider>} />
        <Route path="/upload" element={<AuthProvider><UploadVideoPage /></AuthProvider>} />
        <Route path="/video/:videoId" element={<AuthProvider><WatchVideoPage /></AuthProvider>} />
        <Route path="/my-account" element={<AuthProvider><ManageMyProfile /></AuthProvider>} />
        <Route path="/search-result/:searchValue" element={<AuthProvider><SearchResultPage /></AuthProvider>} />
        <Route path="/" element={<AuthProvider><HomePage /></AuthProvider>} />
      </Routes>
    </Router>
  );
};

export default App;