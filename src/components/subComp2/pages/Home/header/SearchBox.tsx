import React, {useState, CSSProperties, FormEvent} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons/faMagnifyingGlass";
import { useNavigate } from "react-router-dom";

export const SearchBox: React.FC = () => {
  const [isHovering, set_isHovering] = useState<boolean>(false);
  const setHovered = () => {
    set_isHovering(true);
  };
  const setNotHovered = () => {
    set_isHovering(false);
  }
  
  const [searchValue, setSearchValue] = useState<string>("");
  const nav = useNavigate();
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (searchValue.trim() !== "") nav(`/search-result/${searchValue}`);
  };
  
  const styles: {[key: string]: CSSProperties} = {
    wrapper: {
      maxWidth: "25rem",
      // height: "calc(3rem - 2px)",
      height: "3rem",
      border: "1px solid #333",
      borderRadius: "5px",
      padding: "0 auto 0 0",
      backgroundColor: "#fff",
      display: "inline-flex",
      flexDirection: "row",
      flexWrap: "nowrap",
      justifyContent: "center",
      alignItems: "center",
      gap: "0.25rem",
    },
    input: {
      width: "20rem",
      height: "100%",
      margin: "0 0 0 5px",
      color: "#000",
      borderRadius: "5px 0 0 5px",
      border: "none",
      outline: "none",
    },
    button: {
      width: "5rem",
      height: "100%",
      background: isHovering ? "#bbb": "#ddd",
      borderRadius: "0 5px 5px 0",
      border: "none",
      transition: "all 0.3s ease",
      padding: "auto",
      alignContent: "center",
      textAlign: "center",
      cursor: "pointer",
    },
    img: {
      maxWidth: "2rem",
      maxHeight: "2rem",
      border: "none",
      borderRadius: "0 5px 5px 0",
    },
    icon: {
      fontSize: "1.5rem",
    }
  };
  return (
    <form style={styles.wrapper} onSubmit={handleSubmit}>
      <input type="text" style={styles.input} value={searchValue} onChange={(e) => setSearchValue(e.target.value)}/>
      <button
        style={styles.button} onMouseEnter={setHovered} 
        onMouseLeave={setNotHovered} type="submit">
        <FontAwesomeIcon icon={faMagnifyingGlass} style={styles.icon}/>
        {/* <img src={faMagnifyingGlass} alt="search_btn" style={styles.img} /> */}
      </button>
    </form>
  );
};