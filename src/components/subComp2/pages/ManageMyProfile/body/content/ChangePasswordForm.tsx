import { CSSProperties, FormEvent, useEffect, useState } from "react";
import { SubmitBtn } from "./SubmitBtn";
import { useAuth } from "../../../../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface InputProp {

}

export const ChangePasswordForm: React.FC<InputProp> = () => {
  const [oldPwd, setOldPwd] = useState<string>("");
  const [newPwd, setNewPwd] = useState<string>("");
  const [confirmNewPwd, setConfirmNewPwd] = useState<string>("");
  const [contentIsChanged, setContentChanged] = useState<boolean>(false);
  const [errorMessage, set_errorMessage] = useState<string>("");
  useEffect(() => {
    setContentChanged(true);
    set_errorMessage("");
    if (oldPwd === null || oldPwd === undefined || oldPwd === "") setContentChanged(false);
    if (newPwd === null || newPwd === undefined || newPwd === "") setContentChanged(false);
    if (confirmNewPwd === null || confirmNewPwd === undefined || confirmNewPwd === "") setContentChanged(false);
    if (confirmNewPwd !== newPwd) setContentChanged(false);
  }, [
    oldPwd, newPwd, confirmNewPwd
  ]);
  const {accessToken, checkTokenValidity, signOut} = useAuth();
  const nav = useNavigate();
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const process = async () => {
      try {
        if (await checkTokenValidity() === false) {
          alert("Please sign in");
          nav("/");
        }
        // const formData = new FormData();
        // formData.append("oldPassword", oldPwd);
        // formData.append("newPassword", newPwd);
        // console.log("form data: ", formData);
        const response = await axios.post(`http://127.0.0.1:4000/user/change-password`, {
          oldPassword: oldPwd,
          newPassword: newPwd
        }, {
          headers: {
            "Authorization" : `Bearer ${accessToken}`,
            // "Content-Type": "multipart/form-data",
          }
        });
        console.log(response.data);
        if (response.data && response.data.message === "request succeed") {
          alert("Password changed, please sign in again");
          signOut();
        }
      } catch (error) {
        console.error(error);
        set_errorMessage("Action failed");
      }
    };
    process();
  };

  const styles: {[key: string]: CSSProperties} = {
    formWrapper: {
      width: "50%",
      display: "flex",
      flexDirection: "column",
      gap: "0.5em",
    },
    label: {
      fontWeight: "bold",
    },
    formControlInput: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      flexWrap: "nowrap",
      justifyContent: "center",
      alignContent: "center",
    },
    formControlLabel: {
    },
    textInput: {
      width: "100%",
      padding: ".5em",
      outline: "none",
      border: "1px solid #444",
      borderRadius: ".5em",
    },
  };
  return (
    <form style={styles.formWrapper} onSubmit={handleSubmit}>
      <p style={styles.label}>
        Password
      </p>
      <p style={{color: "red"}}>{errorMessage}</p>
      <div style={styles.formControlWrapper}>
        <label style={styles.formControlLabel}>Old password</label>
        <input type="password" style={styles.textInput} onChange={(e) => setOldPwd(e.target.value)}/>
      </div>
      <div style={styles.formControlWrapper}>
        <label style={styles.formControlLabel}>New password</label>
        <input type="password" style={styles.textInput} onChange={(e) => setNewPwd(e.target.value)}/>
      </div>
      <div style={styles.formControlWrapper}>
        <label style={styles.formControlLabel}>Confirm password</label>
        <input type="password" style={styles.textInput} onChange={(e) => setConfirmNewPwd(e.target.value)}/>
      </div>
      {contentIsChanged && <SubmitBtn />}
    </form>
  );
};