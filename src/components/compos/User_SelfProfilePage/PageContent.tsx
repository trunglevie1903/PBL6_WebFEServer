import React, {useState, useEffect, CSSProperties} from 'react';
import axios from 'axios';

import checkValidToken from '../../functions/checkValidToken';
import UpdateNameForm from './UpdateNameForm';
import UpdateDescriptionForm from './UpdateDescriptionForm';
import UpdateBannerImageForm from './UpdateBannerImageForm';
import UpdateAvatarImageForm from './UpdateAvatarImageForm';

// interface InputProp {
//   userId: string;
// }

const SelfProfilePageContent: React.FC = () => {
  const [state_userId, set_userId] = useState<string>("");
  const [state_name, set_name] = useState<string>("");
  const [state_description, set_description] = useState<string>("");
  const [state_bannerImage, set_bannerImage] = useState<string>("");
  const [state_avatarImage, set_avatarImage] = useState<string>("");
  
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const isValid = await checkValidToken();
        if (!isValid) throw new Error("You are not allowed to perform this action");

        const accessToken = localStorage.getItem('accessToken');
        const response = await axios.get("http://127.0.0.1:4000/user/self", {
          headers: { "Authorization": `Bearer ${accessToken}` },
        });

        const profile = response.data.profile;
        console.log("profile: ", profile);
        if (profile) {
          set_userId(profile.userId || "");
          set_name(profile.name || "");
          set_description(profile.description || "");
          set_bannerImage(profile.bannerImage || "");
          set_avatarImage(profile.avatarImage || "");
        }
      } catch (error) {
        alert(error instanceof Error ? error.message : error);
        window.location.href = "/";
      }
    };

    fetchUserProfile();
  }, []);

  const styles: {[key: string]: CSSProperties} = {
    wrapper: {
      width: "80%",
      margin: "0 auto",
      display: "flex",
      flexDirection: "column",
      gap: "20px",
      flex: 1, // Allow wrapper to take available space
    }
  }

  return (
    <div style={styles.wrapper}>
      <div style={{padding: "20px", display: "flex", flexDirection: "column", gap: "20px"}}>
        <h3>My Profile</h3>
        <div>
          {/* Component: UpdateBannerImageForm */}
          {state_bannerImage && <UpdateBannerImageForm bannerImage={state_bannerImage} />}
        </div>
        <div>
          {/* Component: UpdateAvatarImageForm */}
          {state_avatarImage && <UpdateAvatarImageForm avatarImage={state_avatarImage} />}
        </div>
        <div>
          {/* Component: UpdateNameForm */}
          {(state_name && state_name !== "" && <UpdateNameForm name={state_name} />)}
        </div>
        <div>
          {/* Component: UpdateDescriptionForm */}
          <UpdateDescriptionForm description={state_description} />
        </div>
      </div>
    </div>
  );
};

export default SelfProfilePageContent;