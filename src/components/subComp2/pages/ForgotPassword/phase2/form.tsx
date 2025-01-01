import axios from 'axios';
import React, { CSSProperties, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SubmitBtn } from './submitBtn';

interface InputProp {
  requestId: string | null | undefined;
}

export const ForgotPasswordPhase2Form: React.FC<InputProp> = ({requestId}) => {
  // function: check if input string is not null, undefined or an empty string
  const isNotEmptyString = (str: string | null | undefined): boolean => {
    return str !== null && str !== undefined && str !== "" && str.trim() !== "";
  }
  const nav = useNavigate();
  const [isWaitingResponse, set_isWaitingResponse] = useState<boolean>(false);
  const [errorMessage, set_errorMessage] = useState<string>("");
  const [username, set_username] = useState<string>("");
  const [token, set_token] = useState<string>("");
  const [newPwd, set_newPwd] = useState<string>("");
  
  if (isNotEmptyString(requestId)) {
    alert("Your request is expired");
    nav('/');
  }
  // function: validate form data
  const validateFormData = () => {
    if (!isNotEmptyString(username)) throw new Error("Username cannot be empty");
    if (!isNotEmptyString(token)) throw new Error("Token cannot be empty");
    if (!isNotEmptyString(newPwd)) throw new Error("New password cannot be empty");
    const pattern = /[{};'",./?\\]/;
    if (pattern.test(username)) throw new Error("Invalid character in field username");
    if (pattern.test(token)) throw new Error("Invalid character in field token");
    if (pattern.test(newPwd)) throw new Error("Invalid character in field new password");
    return true;
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log('form is submitted');
    const process = async () => {
      set_isWaitingResponse(true);
      set_errorMessage("");
      try {
        console.log('processing');
        // validate form data
        const validateResult = validateFormData();
        if (!validateResult) throw new Error("Unknown error while validating form data");
        console.log(username, token, newPwd);
        // send request to BE-API
        const response = await axios.post(`http://127.0.0.1:4000/user/reset-password`,
          {username, token, newPassword: newPwd},
          {
            headers: {
              "Content-Type": "application/json"
            }
          }
        );
        console.log('response: ', response);
        if (response.data && response.data.message === "request succeed") {
          alert("Request succeed. Redirecting you to sign in page.");
          nav('/sign-in');
        }
        else {
          console.error(response);
          throw new Error(response.data.message || response.data);
        }
      } catch (error) {
        console.error(error);
        set_errorMessage(error instanceof Error ? error.message : "Error");
      };

      // setTimeout(() => set_isWaitingResponse(false), 3000);
      set_isWaitingResponse(false);
    };
    process();
  };
  const styles: {[key: string]: CSSProperties} = {
    formWrapper: {
      width: "60%",
      minWidth: "30em",
      border: "1px solid #666",
      borderRadius: ".5em",
      display: "flex",
      flexDirection: "column",
      flexWrap: "nowrap",
      gap: "2em",
      overflow: "hidden",
      boxShadow: '1em 1em 1em 1em #888888',
      backgroundColor: "#fff",
      padding: "2em",
    },
    formHeader: {
      fontSize: "2em",
      fontWeight: "bold",
      textAlign: "center",
    },
    formDescription: {
      fontSize: "1.2em",
      textAlign: "center",
      color: "#a47864",
    },
    textInput: {
      minWidth: "25em",
      width: "75%",
      padding: "1em",
      alignSelf: "center",
      outline: "none",
      borderRadius: ".5em",
      border: "1px solid #888888"
    },
    otherActionWrapper: {
      minWidth: "25em",
      width: "75%",
      alignSelf: "center",
      display: "inline-flex",
      flexDirection: "row",
      flexWrap: "nowrap",
      justifyContent: "space-between",
      alignItems: "center",
      paddingTop: "1em",
      paddingBottom: "1em"
    },
    anchor: {
      color: "#000",
      // textDecoration: "none",
    },
    buttonWrapper: {
      minWidth: "25em",
      width: "75%",
      display: "inline-flex",
      flexDirection: "row",
      flexWrap: "nowrap",
      justifyContent: "center",
      alignItems: "center",
      alignSelf: "center",
    },
    errorMessage: {
      color: "red",
      padding: "1em",
      fontWeight: "bold",
      textAlign: "center",
    }
  };
  return (
    <form style={styles.formWrapper} onSubmit={onSubmit}>
      <p style={styles.formHeader}>Reset your password</p>
      <p style={styles.formDescription}>Type these information to complete the process</p>
      {
        isNotEmptyString(errorMessage) && <p style={styles.errorMessage}>{errorMessage}</p>
      }
      <input type="text" placeholder="Username" style={styles.textInput}
        onChange={(e) => set_username(e.target.value)} value={username} required
      />
      <input type="text" placeholder="Your received token" style={styles.textInput}
        onChange={(e) => set_token(e.target.value)} value={token} required
      />
      <input type="password" placeholder="Your new password" style={styles.textInput}
        onChange={(e) => set_newPwd(e.target.value)} value={newPwd} required
      />
      <div style={styles.buttonWrapper}>
        <SubmitBtn isWaitingResponse={isWaitingResponse}/>
      </div>
    </form>
  )
};