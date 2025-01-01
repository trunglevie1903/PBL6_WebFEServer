import React, { CSSProperties, useState } from "react";
import { NavbarItem } from "./NavbarItem";


interface InputProp {
  changeParentOption: (arg0: string) => void;
}

export const NavbarList: React.FC<InputProp> = ({changeParentOption}) => {
  const [activatedVal, setActiveVal] = useState<string>("my-profile");

  const handleChoseMyProfile = () => {
    setActiveVal("my-profile");
    changeParentOption("my-profile");
  };
  const handleChoseMyVideos = () => {
    setActiveVal("my-videos");
    changeParentOption("my-videos");
  };
  // const handleChoseWatchedVideos = () => {
  //   setActiveVal("watched-videos");
  //   changeParentOption("watched-videos");
  // };
  // const handleChoseLikedVideos = () => {
  //   setActiveVal("liked-videos");
  //   changeParentOption("liked-videos");
  // };

  const styles: {[key: string]: CSSProperties} = {
    wrapper: {
      width: "10%",
      minWidth: "8em",
      borderRight: "1px solid #000",
      display: "flex",
      flexDirection: "column",
      flexWrap: "nowrap",
      justifyContent: "flex-start",
      alignItems: "flex-start",
      gap: "0.5em",
    }
  };
  return (
    <div style={styles.wrapper}>
      <NavbarItem 
        str={"My Profile"} 
        optionVal={"my-profile"} 
        activatedVal={activatedVal}
        handleClick={handleChoseMyProfile}
      />
      <NavbarItem 
        str={"My Videos"} 
        optionVal={"my-videos"} 
        activatedVal={activatedVal}
        handleClick={handleChoseMyVideos}
      />
      {/* <NavbarOptionItem 
        str={"My Favorites"} 
        optionVal={"my-favorites"} 
        activatedVal={activatedVal}
        handleClick={handleChoseMyFavorites}
      /> */}
      {/* <NavbarItem 
        str={"Watched Videos"} 
        optionVal={"watched-videos"} 
        activatedVal={activatedVal}
        handleClick={handleChoseWatchedVideos}
      /> */}
      {/* <NavbarItem 
        str={"Liked Videos"} 
        optionVal={"liked-videos"} 
        activatedVal={activatedVal}
        handleClick={handleChoseLikedVideos}
      /> */}
      {/* <NavbarOptionItem 
        str={"Disliked Videos"} 
        optionVal={"disliked-videos"} 
        activatedVal={activatedVal}
        handleClick={handleChoseDislikedVideos}
      /> */}
    </div>
  );
};