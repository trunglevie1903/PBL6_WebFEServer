import React from 'react'; 

import GuestHomepage from './subComponents/Old_GuestHomepage';
import UserHomepage from './subComponents/Old_UserHomepage';

const HomePage: React.FC = () => {
  const token = localStorage.getItem('accessToken');

  return (
    <div>
      {token ? <UserHomepage /> : <GuestHomepage />}
    </div>
  );
};

export default HomePage;
