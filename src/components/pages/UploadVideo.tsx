import React from 'react';
import User_UploadVideoHeader from '../compos/User_UploadVideoPage/User_UploadVideo_Header';
import User_UploadVideoForm from '../compos/User_UploadVideoPage/User_UploadVideo_Form';

const User_UploadVideo_Page: React.FC = () => {
  return (
    <div>
      <User_UploadVideoHeader />
      <User_UploadVideoForm />
    </div>
  )
};

export default User_UploadVideo_Page;