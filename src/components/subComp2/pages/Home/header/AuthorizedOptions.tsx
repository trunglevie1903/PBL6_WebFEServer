import React, {useState, CSSProperties} from "react";

import { DropdownLabel } from "./DropdownLabel";
import { MyAccountOption } from "./OptionMyAccount";
import { SignOutOption } from "./OptionSignOut";

export const AuthorizedOptions: React.FC = () => {
  const [isHovering, set_isHovering] = useState<boolean>(false);
  const setHovered = () => {
    set_isHovering(true);
    set_isClicked(true);
  };
  const setNotHovered = () => {
    set_isHovering(false);
    set_isClicked(false);
  }
  const [isClicked, set_isClicked] = useState<boolean>(false);
  const handleClickLabel = () => set_isClicked(!isClicked);

  const styles: {[key: string]: CSSProperties} = {
    wrapper: {
      position: "relative",
      display: "inline-block",
      width: "10rem",
      height: "3rem",
    },
    optionList: {
      position: "absolute",
      zIndex: 1000,
      display: (isHovering || isClicked) ? "block" : "none",
      overflow: "hidden",
      border: "1px solid #222",
      borderRadius: "5px",
      backgroundColor: "#fff",
    }
  };
  return (
    <div style={styles.wrapper} onMouseEnter={setHovered} onMouseLeave={setNotHovered}>
      <DropdownLabel onClick={handleClickLabel}/>
      <div style={styles.optionList}>
        <MyAccountOption />
        <SignOutOption />
      </div>
    </div>
  );
};