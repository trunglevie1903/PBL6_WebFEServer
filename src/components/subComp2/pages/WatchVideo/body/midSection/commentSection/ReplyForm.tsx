import React, {useState, useEffect, CSSProperties} from "react";
import { CancelBtn } from "./CancelBtn";
import { SubmitBtn } from "./SubmitBtn";
import { Avt } from "./Avt";
import { useAuth } from "../../../../../../../contexts/AuthContext";
import axios from "axios";

interface InputProp {
  videoId: string | null;
  parentCommentId: string | null;
}

const isValidStringValue = (str: string | null) => (str !== null && str !== undefined && str.trim() !== "");

export const ReplyForm: React.FC<InputProp> = ({videoId, parentCommentId}) => {
  const [reply, setReply] = useState<string>("");
  const [isSubmitDisabled, setSubmitDisabled] = useState<boolean>(true);
  const {username, checkToken, checkTokenValidity, accessToken} = useAuth();
  const handleSubmit = () => {
    const process = async () => {
      if (await checkTokenValidity() && isValidStringValue(videoId) && isValidStringValue(reply)) {
        try {
          console.log(videoId, reply, parentCommentId);
          const response = await axios.post(`http://127.0.0.1:4000/comment/add-comment`, {
            videoId, reply, parentCommentId
          }, {
            headers: {
              "Authorization": `Bearer ${accessToken}`
            }
          });
          if (response.data && response.data.message === "request succeed") {
            alert('comment posted');
          } else throw response;
        } catch (error) {
          console.error(axios.isAxiosError(error) ? error.message : error);
        }
      }
    };
    process();
  };
  useEffect(() => {
    setSubmitDisabled(reply === "" || reply === undefined || reply === null);
  }, [reply])

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
      width: "calc(100% - 3rem)",
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
      height: "2.5rem",
      display: "inline-flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignContent: "center",
      padding: "0.25rem",
    },
    leftGroupWrapper: {
      height: "100%",
      width: "2rem",
    },
    rightGroupWrapper: {
      height: "2rem",
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
        <input type="text" style={styles.input} required value={reply} onChange={(e) => setReply(e.target.value)}/>
        <div style={styles.formActionWrapper}>
          <div style={styles.leftGroupWrapper}>
            &nbsp;
          </div>
          <div style={styles.rightGroupWrapper}>
            <CancelBtn handleClick={() => setReply("")} />
            <SubmitBtn handleClick={handleSubmit} isDisabled={isSubmitDisabled} />        
          </div>
        </div>
      </div>
    </div>
  );
};