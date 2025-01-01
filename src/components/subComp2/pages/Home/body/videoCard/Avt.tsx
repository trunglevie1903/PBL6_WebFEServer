import React, {CSSProperties} from "react";

import parrot from "../../../../../../assets/parrot.jpg";

interface InputProp {
  img: string | null;
}

export const Avt: React.FC<InputProp> = ({img}) => {
  const source = img;

  const styles: {[key: string]: CSSProperties} = {
    wrapper: {
      width: "3rem",
      height: "100%",
      paddingTop: "1rem",
      paddingLeft: "0.5rem",
      paddingRight: "0.5rem",
      
    },
    img: {
      width: "2rem",
      height: "2rem",
      borderRadius: "2rem",
    }
  };
  return (
    <div 
      style={styles.wrapper}
    >
      <img src={source || parrot} alt="avt" style={styles.img}/>
    </div>
  );
};