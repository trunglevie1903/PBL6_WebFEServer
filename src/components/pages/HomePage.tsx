import React, { useState, useEffect } from 'react';

import checkValidToken from '../functions/checkValidToken';
import Guest_HomePage from './Guest_HomePage';
import User_HomePage from './User_HomePage';

const HomePage: React.FC = () => {
  const [direction, setDirection] = useState("");
  
  useEffect(() => {
    // console.log('useEffect triggered');
    // Check accessToken and refreshToken in localStorage

    checkValidToken().then((val) => setDirection(val ? "user" : "guest"));
  }, []);

  return (
    <div>
      {direction === "guest" ? <Guest_HomePage /> : direction === "user" ? <User_HomePage /> : <></>}
    </div>
  );
};

export default HomePage;