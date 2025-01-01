import React from "react";

import parrot from "../../../../../../assets/parrot.jpg";

interface ThumbnailProp {
  img: string | null;
}

export const Thumbnail: React.FC<ThumbnailProp> = ({img}) => {

  return (
    <img src={img || parrot} alt="thumbnail" style={{
      width: "320px",
      height: "180px",
      backgroundColor: "#fafafa",
      objectFit: "contain",
    }}/>
  );
};