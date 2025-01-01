import React, { CSSProperties } from "react";

import parrot from "../../../../../../../assets/parrot.jpg";

interface InputProp {
  source: string | null;
}

export const ItemThumbnail: React.FC<InputProp> = ({source}) => {
  const styles: {[key: string]: CSSProperties} = {
    img: {
      backgroundColor: "#000",
      height: "100%",
      aspectRatio: "16/9",
      objectFit: "contain",
      border: "none"
    }
  };
  return (
    <img src={source || parrot} alt="thumb" style={styles.img}/>
  );
};