import React, {CSSProperties} from "react";

import { SignInBtn } from "./SignInBtn";
import { SignUpBtn } from "./SignUpBtn";

export const UnauthenticatedReplyForm: React.FC = () => {
  const styles: {[key: string]: CSSProperties} = {
    wrapper: {
      height: "3em",
      padding: ".5em",
      display: "flex",
      flexDirection: "row",
      flexWrap: "nowrap",
      justifyContent: "space-between",
      alignItems: "center",
    },
    text: {
      width: "50%",
      height: "100%",
      padding: ".5em",
      alignSelf: "center",
      textAlign: "start",
    },
    buttons: {
      width: "50%",
      height: "100%",
      display: "inline-flex",
      flexDirection: "row",
      flexWrap: "nowrap",
      gap: '1em',
      alignItems: "center",
      justifyContent: "flex-end",
    }
  };
  return (
    <div style={styles.wrapper}>
      <p style={styles.text}>
        Sign in to leave a comment
      </p>
      <div style={styles.buttons}>
        <SignInBtn />
        <SignUpBtn />
      </div>
    </div>
  );
};