import { CSSProperties, FormEvent, useEffect, useState } from "react";
import { SubmitBtn } from "./SubmitBtn";
import { useAuth } from "../../../../../../contexts/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";


interface InputProp {

};

export const ChangeAvtForm: React.FC<InputProp> = () => {
  const [source, setSource] = useState<string>("");
  const [contentIsChanged, setIsChanged] = useState<boolean>(false);

  const {checkTokenValidity, accessToken, username} = useAuth();
  useEffect(() => {
    const process = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:4000/user/${username}/avatar`);
        if (response.data && response.data.message === "request succeed") {
          setSource(response.data.avatar);
        }
      } catch (error) {
        console.error(error);
      }
    };
    process();
  }, [username]);

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSource(reader.result as string);
        setIsChanged(true);
      };
      reader.readAsDataURL(file);
    }
  };
  const nav = useNavigate();
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const process = async () => {
      try {
        if (await checkTokenValidity() === false) {
          alert("Please sign in");
          nav("/");
        }
        const response = await axios.post(`http://127.0.0.1:4000/user/change-avatar`, {
          avatarImage: source
        }, {
          headers: {
            "Authorization": `Bearer ${accessToken}`
          }
        });
        console.log("response data: ", response.data);
        if (response.data && response.data.message === "request succeed") {
          alert("Avatar is updated, please refresh to see changes");
        }
      } catch (error) {
        console.error(error);
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
    formControlWrapper: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "nowrap",
      justifyContent: "space-between",
      alignItems: "flex-start",
      gap: ".5em",
    },
    img: {
      backgroundColor: "#000",
      height: "10em",
      aspectRatio: "16/9",
      borderRadius: "0.5em",
      overflow: "hidden",
      objectFit: "contain",
    },
    fileInput: {},
  };
  return (
    <form style={styles.formWrapper} onSubmit={handleSubmit}>
      <p style={styles.label}>
        Avatar
      </p>
      <div style={styles.formControlWrapper}>
        <img src={source} alt="avt" style={styles.img}/>
        <input type="file" name="avt" style={styles.fileInput} onChange={handleChangeFile}/>
      </div>
      {
        contentIsChanged && <SubmitBtn />
      }
    </form>
  );
};