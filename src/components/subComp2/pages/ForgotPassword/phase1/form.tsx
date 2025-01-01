import React, { CSSProperties, FormEvent, useState } from 'react';
import { SubmitBtn } from './submitBtn';
import axios from 'axios';
import { BackBtn } from './backBtn';

interface InputProp {
  setSucceed: (arg0: boolean) => void;
}

export const ForgotPasswordPhase1Form: React.FC<InputProp> = ({setSucceed}) => {
  // form error message
  const [errorMessage, set_errorMessage] = useState<string>("");
  // function: check if input string is not null, undefined or an empty string
  const isNotEmptyString = (str: string | null | undefined): boolean => {
    return str !== null && str !== undefined && str !== "" && str.trim() !== "";
  }
  // function: validate form data
  const validateFormData = () => {
    if (!isNotEmptyString(username)) throw new Error("Username cannot be empty");
    if (!isNotEmptyString(email)) throw new Error("Password cannot be empty");
    const pattern = /[{};'",./?\\]/;
    if (pattern.test(username)) throw new Error("Invalid character in username");
    return true;
  };
  // form field
  const [username, set_username] = useState<string>("");
  const [email, set_email] = useState<string>("");
  
  const [isWaitingResponse, set_isWaitingResponse] = useState<boolean>(false);
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
        // send request to BE-API
        const response = await axios.post("http://127.0.0.1:4000/user/forgot-password",
          {username, email},
          {
            headers: {
              "Content-Type": "application/json"
            }
          }
        );
        console.log('response: ', response);
        if (response.data && response.data.message === "request succeed") {
          setSucceed(true);
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
      <p style={styles.formHeader}>Request to reset password</p>
      <p style={styles.formDescription}>Type your username and email to proceed</p>
      {
        isNotEmptyString(errorMessage) && <p style={styles.errorMessage}>{errorMessage}</p>
      }
      <input type="text" placeholder="Username"  style={styles.textInput}
        onChange={(e) => set_username(e.target.value)} value={username} required
      />
      <input type="email" placeholder="Your email"  style={styles.textInput}
        onChange={(e) => set_email(e.target.value)} value={email} required
      />
      <div style={styles.buttonWrapper}>
        <BackBtn />
        <SubmitBtn isWaitingResponse={isWaitingResponse}/>
      </div>
    </form>
  )
};