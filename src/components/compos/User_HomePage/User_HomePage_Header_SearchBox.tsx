import React, {CSSProperties, useState} from "react";
import { useNavigate } from "react-router-dom";

const User_HomePage_Header_SearchBox: React.FC = () => {
  const [searchText, set_searchText] = useState<string>("");
  const navigate = useNavigate();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/search-result/${searchText}`);
  };

  const styles: {[key: string]:CSSProperties} = {
    input: {
      width: "100%",
      padding: "10px",
      border: "none",
      borderRadius: "50px",
    },
    button: {
      backgroundColor: "transparent",
      border: "none",
      borderRadius: "50px",
      padding: "10px",
      cursor: "pointer"
    },
    wrapper: {
      width: "60%",
      display: "flex",
      alignItems: "center" as CSSProperties["textAlign"],
      border: "1px solid #ddd",
      borderRadius: "50px",
      padding: "5px",
    }
  }
  return (
    <form onSubmit={onSubmit} style={styles.wrapper}>
      <input type="text" placeholder="Search..." style={styles.input} onChange={(e) => set_searchText(e.target.value)} />
      <button type="submit" style={styles.button}>Search</button>
    </form>
  );
};

export default User_HomePage_Header_SearchBox;