import { CSSProperties, useEffect, useState } from "react";
import { MyProfileContent } from "./body/content/MyProfile";
import { NavbarList } from "./body/navbar/NavbarList";
import { useAuth } from "../../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { MyVideosContent } from "./body/content/MyVideoContent";


interface InputProp {
}

export const ManageMyProfileContent: React.FC<InputProp> = () => {
  const [activatedOption, setOption] = useState<string>("my-profile");
  const {checkTokenValidity} = useAuth();
  const nav = useNavigate();
  useEffect(() => {
    const process = async () => {
      if (await checkTokenValidity() === false) {
        alert("Please sign in");
        nav("/");
      }
    };
    process();
  }, []);

  const styles: {[key: string]: CSSProperties} = {
    wrapper: {
      width: "100%",
      paddingLeft: "10%",
      paddingRight: "10%",
      marginTop: "1em",
      display: "flex",
      flexDirection: "row",
      flexWrap: "nowrap",
      justifyContent: "space-between",
      alignContent: "flex-start",
      alignSelf: "center",
    },
  };
  return (
    <div style={styles.wrapper}>
      <NavbarList changeParentOption={setOption}/>
      {
        (activatedOption === "my-profile") &&
        <MyProfileContent />
      }
      {
        (activatedOption === "my-videos") &&
        <MyVideosContent />
      }
      {/* {
        (activatedOption === "watched-videos") &&
        <WatchedVideo />
      } */}
      {/* {
        (activatedOption === "liked-videos") &&
        <LikedVideo />
      } */}
    </div>
  );
};