import React, {useState, CSSProperties, useEffect} from "react";

import { Avt } from "./Avt";
import { SubmitBtn } from "./SubmitBtn";
import { useAuth } from "../../../../../../contexts/AuthContext";
import axios from "axios";

interface InputProp {
  videoId: string | null;
}

export const AuthenticatedReplyForm: React.FC<InputProp> = ({videoId}) => {
  const [reply, setReply] = useState<string>("");
  const [isSubmitDisabled, setSubmitDisabled] = useState<boolean>(true);
  useEffect(() => {
    setSubmitDisabled(reply === "" || reply === undefined || reply === null);
  }, [reply]);
  const {username, accessToken, checkToken, checkTokenValidity} = useAuth();

  const handleSubmit = () => {
    const process = async () => {
      try {
        if (videoId === null || videoId === undefined || videoId.trim() === "") {
          throw new Error("Invalid video key");
        }
        if (await checkTokenValidity() === false) {
          alert("You need to sign in to perform this action");
          throw new Error("Unauthorized");
        }
        setSubmitDisabled(true);
        const response = await axios.post(`http://127.0.0.1:4000/comment/reply-video`, {
          videoId, reply, parentCommentId: null,
        }, {
          headers: {
            "Authorization": `Bearer ${accessToken}`,
            "Content-Type": "application/json"
          }
        });
        if (response.data && response.data.message === "request succeed") {
          alert("We received your comment. Reload to see changes");
        } else throw new Error("Request failed");
        setSubmitDisabled(false);
      } catch (error) {
        console.error(axios.isAxiosError(error) ? error.message : error);
        setSubmitDisabled(false);
      }
    };
    process();
  };

  const styles: {[key: string]: CSSProperties} = {
    wrapper: {
      width: "100%",
      display: "inline-flex",
      flexDirection: "row",
      flexWrap: "nowrap",
      justifyContent: "space-between",
      alignItems: "flex-start"
    },
    notAvtWrapper: {
      width: "calc(100% - 4rem)",
      padding: "0.5rem",
      display: "flex",
      flexDirection: "column",
      flexWrap: "nowrap",
      justifyContent: 'center',
      alignItems: "flex-start",
    },
    input: {
      borderRadius: "0.25rem",
      border: "none",
      borderBottom: "1px solid #000",
      width: "100%",
      padding: "1rem",
      outline: "none",
    },
    formActionWrapper: {
      width: "100%",
      height: "3.5rem",
      display: "inline-flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignContent: "center",
      padding: "0.25rem",
    },
    leftGroupWrapper: {
      height: "100%",
      width: "3rem",
    },
    rightGroupWrapper: {
      height: "3rem",
      display: "inline-flex",
      flexDirection: "row",
      gap: "0.5rem",
      justifyContent: 'flex-end',
      alignContent: "center",
    },
    submitBtn: {
      height: "2rem",
      padding: "0.5rem"
    },
  };
  return (
    <div style={styles.wrapper}>
      <Avt _username={username}/>
      <div style={styles.notAvtWrapper}>
        <input type="text" style={styles.input} value={reply} onChange={(e) => setReply(e.target.value)}/>
        <div style={styles.formActionWrapper}>
          <div style={styles.leftGroupWrapper}>
            &nbsp;
          </div>
          <div style={styles.rightGroupWrapper}>
            <SubmitBtn handleClick={handleSubmit} isDisabled={isSubmitDisabled} />        
          </div>
        </div>
      </div>
    </div>
  );
};