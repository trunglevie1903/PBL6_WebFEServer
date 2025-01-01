import { CSSProperties, useEffect, useState } from "react";


interface InputProp {
  str: string;
  optionVal: string;
  activatedVal: string;
  handleClick: () => void;
}

export const NavbarItem: React.FC<InputProp> = ({
  str, optionVal, activatedVal, handleClick
}) => {
  const [isActivated, setActivate] = useState<boolean>(false);
  useEffect(() => {
    setActivate(optionVal === activatedVal);
  }, [
    optionVal, activatedVal
  ]);
  const styles: {[key: string]: CSSProperties} = {
    text: {
      width: "100%",
      padding: "1em",
      alignSelf: "center",
      textAlign: "center",
      backgroundColor: isActivated ? "#bbb" : "transparent",
      transition: "all .3s ease",
      cursor: "pointer",
    }
  };
  return (
    <p style={styles.text} onClick={handleClick}>
      {str}
    </p>
  );
};