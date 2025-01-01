import React, {CSSProperties} from "react";

import { LinkToSignIn } from "./LinkToSignIn";
import { LinkToSignUp } from "./LinkToSignUp";

export const UnauthorizedOptions: React.FC = () => {
  const styles: {[key: string]: CSSProperties} = {
    wrapper: {
      height: "3rem",
      display: "inline-flex",
      flexDirection: "row",
      flexWrap: "nowrap",
      gap: "0.25rem",
    },
  };
  return (
    <div style={styles.wrapper}>
      <LinkToSignUp />
      <LinkToSignIn />
    </div>
  );
};