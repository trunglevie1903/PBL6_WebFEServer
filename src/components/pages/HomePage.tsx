import React, { useState, useEffect } from 'react';

import checkValidToken from '../functions/checkValidToken';
import Guest_HomePage from './Guest_HomePage';
import User_HomePage from './User_HomePage';
import authenticateAdminUser from '../functions/authenticateAdminUser';
import AdminHomePage from './Admin_HomePage';

const HomePage: React.FC = () => {
  const [direction, setDirection] = useState("");
  
  useEffect(() => {
    const preloadFunction = async () => {
      try {
        const val = await checkValidToken();
        if (!val) throw new Error("Unauthenticated");
        const isAdminUser = await authenticateAdminUser();
        setDirection(isAdminUser ? "admin" : "user");
      } catch (error) {
        console.error(error);
        setDirection("guest");
      };
    };

    preloadFunction();
  }, [direction]);

  return (
    <div>
      {direction === "admin" ? <AdminHomePage /> : direction === "user" ? <User_HomePage /> : direction === "guest" ? <Guest_HomePage /> : <></>}
    </div>
  );
};

export default HomePage;