import React from "react";

import User_HomePage_Header from "../compos/User_HomePage/User_HomePage_Header";
import User_HomePage_ContentSection from "../compos/User_HomePage/User_HomePage_ContentSection";

const User_HomePage: React.FC = () => {
  return (
    <div style={{}}>
      <User_HomePage_Header />
      <User_HomePage_ContentSection />
      {/* <Guest_HomePage_ContentSection /> */}
    </div>
  );
};

export default User_HomePage;