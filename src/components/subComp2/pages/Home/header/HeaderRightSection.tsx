import React, {CSSProperties, useEffect, useState} from "react";

import { useAuth } from "../../../../../contexts/AuthContext";
import { SearchBox } from "./SearchBox";
import { AuthorizedOptions } from "./AuthorizedOptions";
import { UnauthorizedOptions } from "./UnauthorizedOptions";

export const HeaderRightSection: React.FC = () => {
  const [isAuthenticated, setAuthenticated] = useState<boolean>(false);
  const {checkTokenValidity} = useAuth();
  useEffect(() => {
    const process = async () => {
      setAuthenticated(await checkTokenValidity());
    };
    process();
  }, []);
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
      {isAuthenticated ? <AuthorizedOptions /> : <UnauthorizedOptions />}
    </div>
  );
};