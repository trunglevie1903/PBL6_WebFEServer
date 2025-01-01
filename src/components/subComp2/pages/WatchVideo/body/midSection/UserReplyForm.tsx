import React, {CSSProperties, useEffect, useState} from "react";

import { useAuth } from "../../../../../../contexts/AuthContext";
import { AuthenticatedReplyForm } from "./AuthenticatedReplyForm";
import { UnauthenticatedReplyForm } from "./UnauthenticatedReplyForm";

interface InputProp {
  videoId: string | null;
}

export const UserReplyForm: React.FC<InputProp> = ({videoId}) => {
  const {checkToken, checkTokenValidity} = useAuth();
  const [isAuthenticated, setAuthenticated] = useState<boolean>(false);
  useEffect(() => {
    const process = async () => {
      const result = await checkTokenValidity()
      setAuthenticated(result);
    };
    process();
  }, []);
  const styles: {[key: string]: CSSProperties} = {
    wrapper: {
      width: "100%",
      borderRadius: ".5em",
      border: "1px solid #000",
    }
  };

  return (
    <div style={styles.wrapper}>
      {isAuthenticated ? (<AuthenticatedReplyForm videoId={videoId} />) : (<UnauthenticatedReplyForm />)}
    </div> 
  );
};
