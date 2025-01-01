import React, {CSSProperties, FormEvent, MouseEventHandler, useEffect, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faCaretDown, faCaretLeft } from '@fortawesome/free-solid-svg-icons'

// const LogoAndName: React.FC = () => {
  // const styles: {[key: string]: CSSProperties} = {};
  // return ();
// };

import parrot from '../../assets/parrot.jpg';
import { AuthProvider, useAuth } from "../../../contexts/AuthContext";

export const LogoAndName: React.FC = () => {
  const styles: {[key: string]: CSSProperties} = {
    wrapper: {
      display: "inline-flex",
      flexDirection: "row",
      flexWrap: "nowrap",
      justifyContent: "center",
      alignItems: "center",
      gap: "0.5rem",
      cursor: "pointer",
      textDecoration: "none",
    },
    image: {
      width: "3rem",
      height: "3rem",
      borderRadius: "50%",
    },
    name: {
      width: "4rem",
      height: "3rem",
      alignContent: "center",
      textAlign: "center",
      fontSize: "1.5rem",
      fontWeight: "bold",
      padding: "auto",
      color: "#222",
    },
  };
  return (
    <Link to="/" style={styles.wrapper}>
      <img src={parrot} alt="logo" style={styles.image} />
      <p style={styles.name}>App</p>
    </Link>
  );
};

export const LinkToUpload: React.FC = () => {
  const [isHovering, set_IsHovering] = useState<boolean>(false);
  const setHovered = () => set_IsHovering(true);
  const setNotHovered = () => set_IsHovering(false);
  
  const navigate = useNavigate();
  const {checkToken} = useAuth();
  const handleClick = () => {
    // navigate('/upload');
    
    // soft check, if client is an authenticated user => navigate
    if (checkToken()) {
      navigate('/upload');
    } else {
      alert("Please sign in to use this feature. Consider reload to see changes.");
    }
  };
  const styles: {[key: string]: CSSProperties} = {
    wrapper: {
      height: "3rem",
      width: "8rem",
      padding: "0.5rem",
      borderRadius: "0.5rem",
      border: "1px solid #000",
      backgroundColor: isHovering ? "#bbb" : "#ddd",
      transition: "all 0.3s ease",
      cursor: "pointer",
      color: "#222",
    },
    text: {
      height: "2rem",
      padding: "auto",
      fontSize: "1rem",
      fontWeight: "bold",
      textTransform: "capitalize",
      alignContent: "center",
      textAlign: "center",
      color: "#000"
    },
  };
  return (
    <div 
      style={styles.wrapper} 
      onMouseEnter={setHovered} 
      onMouseLeave={setNotHovered} 
      onClick={handleClick}
    >
      <p style={styles.text}>Upload</p>
    </div>
  );
};

export const HeaderLeftSection: React.FC = () => {
  const styles: {[key: string]: CSSProperties} = {
    wrapper: {
      margin: window.innerWidth >= 768 ? "1rem 0" : "1rem auto",
      height: "3rem",
      display: "flex",
      flexDirection: "row",
      flexWrap: "nowrap",
      justifyContent: "center",
      alignItems: "center",
      gap: "2rem",
      // flex: window.innerWidth >= 768 ? "auto" : "1 auto",
      minWidth: 0,
    }
  };
  return (
    <div style={styles.wrapper}>
      <LogoAndName />
      <LinkToUpload />
    </div>
  );
};

export const SearchBox: React.FC = () => {
  const [isHovering, set_isHovering] = useState<boolean>(false);
  const setHovered = () => {
    set_isHovering(true);
  };
  const setNotHovered = () => {
    set_isHovering(false);
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
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
      <input type="text" style={styles.input}/>
      <button 
        style={styles.button} onMouseEnter={setHovered} 
        onMouseLeave={setNotHovered} type="submit">
        <FontAwesomeIcon icon={faMagnifyingGlass} style={styles.icon}/>
        {/* <img src={faMagnifyingGlass} alt="search_btn" style={styles.img} /> */}
      </button>
    </form>
  );
};

export const LinkToSignUp: React.FC = () => {
  const [isHovering, set_isHovering] = useState<boolean>(false);
  const setHovered = () => {
    set_isHovering(true);
  };
  const setNotHovered = () => {
    set_isHovering(false);
  }

  const {checkToken} = useAuth();
  const navigate = useNavigate();
  const handleClick = () => {
    // navigate("/register");

    // soft check, if client is not an authenticated user => navigate
    if (!checkToken()) {
      navigate('/login');
    } else {
      alert("You signed in already, please refresh to see the changes.");
    }
  };

  const styles: {[key: string]: CSSProperties} = {
    wrapper: {
      height: "3rem",
      width: "8rem",
      padding: "0.5rem",
      border: "1px solid #000",
      borderRadius: "5px",
      backgroundColor: isHovering ? "#bbb" : "#ddd",
      transition: "all 0.3s ease",
      cursor: "pointer",
    },
    text: {
      height: "2rem",
      fontSize: "1rem",
      alignContent: "center",
      textAlign: "center",
      textTransform: "capitalize",
      fontWeight: "bold",
    }
  };
  return (
    <div 
      style={styles.wrapper} onClick={handleClick}
      onMouseEnter={setHovered} onMouseLeave={setNotHovered}
    >
      <p style={styles.text}>Sign Up</p>
    </div>
  );
};

export const LinkToSignIn: React.FC = () => {
  const [isHovering, set_isHovering] = useState<boolean>(false);
  const setHovered = () => {
    set_isHovering(true);
  };
  const setNotHovered = () => {
    set_isHovering(false);
  }

  const {checkToken} = useAuth();
  const navigate = useNavigate();
  const handleClick = () => {
    // navigate("/login");

    // soft check, if client is not an authenticated user => navigate
    if (!checkToken()) {
      navigate('/login');
    } else {
      alert("You signed in already, please refresh to see the changes.");
    }
  };

  const styles: {[key: string]: CSSProperties} = {
    wrapper: {
      height: "3rem",
      width: "8rem",
      padding: "0.5rem",
      border: "1px solid #000",
      borderRadius: "5px",
      backgroundColor: isHovering ? "#bbb" : "#ddd",
      transition: "all 0.3s ease",
      cursor: "pointer",
    },
    text: {
      height: "2rem",
      fontSize: "1rem",
      alignContent: "center",
      textAlign: "center",
      textTransform: "capitalize",
      fontWeight: "bold",
    }
  };
  return (
    <div 
      style={styles.wrapper} onClick={handleClick}
      onMouseEnter={setHovered} onMouseLeave={setNotHovered}
    >
      <p style={styles.text}>Sign In</p>
    </div>
  );
};

export const UnauthorizedOptions: React.FC = () => {
  const styles: {[key: string]: CSSProperties} = {
    wrapper: {
      height: "3rem",
      display: "inline-flex",
      flexDirection: "row",
      flexWrap: "nowrap",
      gap: "0.25rem",
    },
  };
  return (
    <div style={styles.wrapper}>
      <LinkToSignUp />
      <LinkToSignIn />
    </div>
  );
};

interface DropdownLabelInputPropType {
  onClick: MouseEventHandler
}

export const DropdownLabel: React.FC<DropdownLabelInputPropType> = ({onClick}) => {
  const [isHovering, set_isHovering] = useState<boolean>(false);
  const setHovered = () => {
    set_isHovering(true);
  };
  const setNotHovered = () => {
    set_isHovering(false);
  };

  const styles: {[key: string]: CSSProperties} = {
    wrapper: {
      width: "10rem",
      height: "100%",
      color: isHovering ? "#666" : "#000",
      display: "inline-flex",
      flexDirection: "row",
      flexWrap: "nowrap",
      justifyContent: "center",
      alignContent: "center",
      alignItems: "center",
      gap: "0.5rem",
      cursor: "pointer",
      transition: "all 0.3s ease",
    },
    avt: {
      maxWidth: "2rem",
      maxHeight: "2rem",
      border: "none",
      borderRadius: "2rem",
    },
    text: {
      overflow: "hidden",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
    }
  };
  return (
    <span 
      style={styles.wrapper} onMouseEnter={setHovered}
      onMouseLeave={setNotHovered} onClick={onClick}
    >
      <img src={parrot} alt="avt" style={styles.avt}/>
      <p style={styles.text}>Lorem ipsum dolor sit amet.</p>
    </span>
  );
};

export const MyAccountOption: React.FC = () => {
  const [isHovering, set_isHovering] = useState<boolean>(false);
  const setHovered = () => {
    set_isHovering(true);
  };
  const setNotHovered = () => {
    set_isHovering(false);
  }

  const navigate = useNavigate();
  const {checkToken} = useAuth();
  const handleClick = () => {
    // navigate("/my-account");

    // soft check if client is an authenticated user
    if (checkToken()) {
      navigate('/account-info');
    } else {
      alert("Please sign in to use this feature. Consider reload to see changes.");
    }
  };

  const styles: {[key: string]: CSSProperties} = {
    wrapper: {
      height: "2rem",
      width: "9rem",
      border: "none",
      backgroundColor: isHovering ? "#ddd" : "#fff",
      transition: "all 0.3s ease",
      alignContent: "center",
      textAlign: "center",
      cursor: "pointer",
      textTransform: "capitalize",
    },
  };
  return (
    <p 
      style={styles.wrapper} onClick={handleClick}
      onMouseEnter={setHovered} onMouseLeave={setNotHovered}
    >
      My Account
    </p>
  );
};

export const SignOutOption: React.FC = () => {
  const [isHovering, set_isHovering] = useState<boolean>(false);
  const setHovered = () => {
    set_isHovering(true);
  };
  const setNotHovered = () => {
    set_isHovering(false);
  }

  const {signOut} = useAuth();
  const handleClick = () => {
    signOut();
  };

  const styles: {[key: string]: CSSProperties} = {
    wrapper: {
      height: "2rem",
      width: "9rem",
      border: "none",
      backgroundColor: isHovering ? "#ddd" : "#fff",
      transition: "all 0.3s ease",
      alignContent: "center",
      textAlign: "center",
      cursor: "pointer",
      textTransform: "capitalize",
    },
  };
  return (
    <p 
      style={styles.wrapper} onClick={handleClick}
      onMouseEnter={setHovered} onMouseLeave={setNotHovered}
    >
      Sign Out
    </p>
  );
};

export const AuthorizedOptions: React.FC = () => {
  const [isHovering, set_isHovering] = useState<boolean>(false);
  const setHovered = () => {
    set_isHovering(true);
    set_isClicked(true);
  };
  const setNotHovered = () => {
    set_isHovering(false);
    set_isClicked(false);
  }
  const [isClicked, set_isClicked] = useState<boolean>(false);
  const handleClickLabel = () => set_isClicked(!isClicked);

  const styles: {[key: string]: CSSProperties} = {
    wrapper: {
      position: "relative",
      display: "inline-block",
      width: "10rem",
      height: "3rem",
    },
    optionList: {
      position: "absolute",
      zIndex: 1000,
      display: (isHovering || isClicked) ? "block" : "none",
      overflow: "hidden",
      border: "1px solid #222",
      borderRadius: "5px",
      backgroundColor: "#fff",
    }
  };
  return (
    <div style={styles.wrapper} onMouseEnter={setHovered} onMouseLeave={setNotHovered}>
      <DropdownLabel onClick={handleClickLabel}/>
      <div style={styles.optionList}>
        <MyAccountOption />
        <SignOutOption />
      </div>
    </div>
  );
};


export const HeaderRightSection: React.FC = () => {
  const {token} = useAuth();
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
      {token === "1" ? <AuthorizedOptions /> : <UnauthorizedOptions />}
    </div>
  );
};

export const Header: React.FC = () => {
  const [windowWidth, set_windowWidth] = useState<number>(window.innerWidth);
  useEffect(() => {
    window.addEventListener("resize", () => {
      const w = window.innerWidth;
      set_windowWidth(w);
      console.log(windowWidth);
    });
  }, [windowWidth]);
  const styles: {[key: string]: CSSProperties} = {
    wrapper: {
      margin: "0 auto",
      maxWidth: "90%",
      height: "100%",
      display: "flex",
      flexDirection:"row",
      flexWrap: "wrap",
      justifyContent:"space-between",
      alignItems: "center",
      gap: "0.5rem",
      backgroundColor: "#f8f1e4",
    }
  };


  return (
    <header>
      <div style={styles.wrapper}>
        <HeaderLeftSection />
        <HeaderRightSection />
      </div>
    </header>
  )
};