import React, {} from "react";

import Guest_HomePage_Header from "../compos/Guest_HomePage/Guest_HomePage_Header";
import Guest_HomePage_ContentSection from "../compos/Guest_HomePage/Guest_HomePage_ContentSection";

const Guest_HomePage: React.FC = () => {
  return (
    <div>
      <Guest_HomePage_Header />
      <Guest_HomePage_ContentSection />
      {/* <Guest_HomePage_ContentSection /> */}
    </div>
  );
};

export default Guest_HomePage;