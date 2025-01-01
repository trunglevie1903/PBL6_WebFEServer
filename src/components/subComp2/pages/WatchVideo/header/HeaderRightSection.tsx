import React, {CSSProperties} from "react";

import { useAuth } from "../../../../../contexts/AuthContext";
import { SearchBox } from "./SearchBox";
import { AuthorizedOptions } from "./AuthorizedOptions";
import { UnauthorizedOptions } from "./UnauthorizedOptions";

export const HeaderRightSection: React.FC = () => {
  const {token} = useAuth();
  const styles: {[key: string]: CSSProperties} = {
    wrapper: {
      margin: "1rem 0",
      height: "auto",
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent:"center",
      alignItems: "center",
      gap: "2rem",
    }
  };
  return (
    <div style={styles.wrapper}>
      <SearchBox />
      {token === "1" ? <AuthorizedOptions /> : <UnauthorizedOptions />}
    </div>
  );
};