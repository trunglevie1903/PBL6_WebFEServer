import React, { CSSProperties, FormEvent, useEffect, useRef, useState } from 'react';

import parrot from "../../../assets/parrot.jpg"
import { useNavigate } from 'react-router-dom';

interface NavbarOptionItemProp {
  str: string;
  optionVal: string;
  activatedVal: string;
  handleClick: () => void;
}

export const NavbarOptionItem: React.FC<NavbarOptionItemProp> = ({
  str, optionVal, activatedVal, handleClick
}) => {
  const [isActivated, setActivate] = useState<boolean>(false);
  useEffect(() => {
    setActivate(optionVal === activatedVal);
  }, [
    optionVal, activatedVal
  ]);
  const styles: {[key: string]: CSSProperties} = {
    text: {
      width: "100%",
      padding: "1em",
      alignSelf: "center",
      textAlign: "center",
      backgroundColor: isActivated ? "#bbb" : "transparent",
      transition: "all .3s ease",
      cursor: "pointer",
    }
  };
  return (
    <p style={styles.text} onClick={handleClick}>
      {str}
    </p>
  );
};

interface NavbarOptionListProp {
  changeParentOption: (arg0: string) => void;
}

export const NavbarOptionList: React.FC<NavbarOptionListProp> = ({changeParentOption}) => {
  const [activatedVal, setActiveVal] = useState<string>("my-profile");

  const handleChoseMyProfile = () => {
    setActiveVal("my-profile");
    changeParentOption("my-profile");
  };
  const handleChoseMyVideos = () => {
    setActiveVal("my-videos");
    changeParentOption("my-videos");
  };
  // const handleChoseMyFavorites = () => {
  //   setActiveVal("my-favorites");
  //   changeParentOption("my-favorites");
  // };
  const handleChoseWatchedVideos = () => {
    setActiveVal("watched-videos");
    changeParentOption("watched-videos");
  };
  const handleChoseLikedVideos = () => {
    setActiveVal("liked-videos");
    changeParentOption("liked-videos");
  };
  // const handleChoseDislikedVideos = () => {
  //   setActiveVal("disliked-videos");
  //   changeParentOption("disliked-videos");
  // };

  const styles: {[key: string]: CSSProperties} = {
    wrapper: {
      width: "10%",
      minWidth: "8em",
      borderRight: "1px solid #000",
      display: "flex",
      flexDirection: "column",
      flexWrap: "nowrap",
      justifyContent: "flex-start",
      alignItems: "flex-start",
      gap: "0.5em",
    }
  };
  return (
    <div style={styles.wrapper}>
      <NavbarOptionItem 
        str={"My Profile"} 
        optionVal={"my-profile"} 
        activatedVal={activatedVal}
        handleClick={handleChoseMyProfile}
      />
      <NavbarOptionItem 
        str={"My Videos"} 
        optionVal={"my-videos"} 
        activatedVal={activatedVal}
        handleClick={handleChoseMyVideos}
      />
      {/* <NavbarOptionItem 
        str={"My Favorites"} 
        optionVal={"my-favorites"} 
        activatedVal={activatedVal}
        handleClick={handleChoseMyFavorites}
      /> */}
      <NavbarOptionItem 
        str={"Watched Videos"} 
        optionVal={"watched-videos"} 
        activatedVal={activatedVal}
        handleClick={handleChoseWatchedVideos}
      />
      <NavbarOptionItem 
        str={"Liked Videos"} 
        optionVal={"liked-videos"} 
        activatedVal={activatedVal}
        handleClick={handleChoseLikedVideos}
      />
      {/* <NavbarOptionItem 
        str={"Disliked Videos"} 
        optionVal={"disliked-videos"} 
        activatedVal={activatedVal}
        handleClick={handleChoseDislikedVideos}
      /> */}
    </div>
  );
};

interface SubmitBtnProp {
}

export const SubmitBtn: React.FC<SubmitBtnProp> = () => {
  const [isHovered, setHover] = useState<boolean>(false);
  const styles: {[key: string]: CSSProperties} = {
    btn: {
      width: "8em",
      padding: '0.5em 1em',
      cursor: "pointer",
      backgroundColor: isHovered ? "#2f2": "#2d2",
      transition: "all .3s ease",
      borderRadius: ".5em",
      border: "none",
    }
  };
  return (
    <button 
      style={styles.btn} 
      onMouseEnter={() => setHover(true)} 
      onMouseLeave={() => setHover(false)}
    >
      Submit
    </button>
  )
};

interface ChangeAvtFormProp {

};

export const ChangeAvtForm: React.FC<ChangeAvtFormProp> = () => {
  const [source, setSource] = useState<string>("");
  const [contentIsChanged, setIsChanged] = useState<boolean>(false);

  useEffect(() => {
    setSource(parrot);
  }, []);

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
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const process = async () => {};
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

interface ChangeUsernameFormProp {

};

export const ChangeUsernameForm: React.FC<ChangeUsernameFormProp> = () => {
  const [value, setValue] = useState<string>("");
  const defaultValue = useRef("");
  const [contentIsChanged, setContentChanged] = useState<boolean>(false);
  useEffect(() => {
    const str = "Username"
    setValue(str);
    defaultValue.current = str;
  }, []);

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const str = e.target.value;
    if (str) {
      setValue(str);
      setContentChanged(str !== defaultValue.current);
    }
  };
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const process = async () => {};
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
        Username
      </p>
      <input type="text" style={styles.textInput} value={value} onChange={handleChangeValue}/>
      {
        contentIsChanged && <SubmitBtn />
      }
    </form>
  );
};

interface ChangePasswordFormProp {

}

export const ChangePasswordForm: React.FC<ChangePasswordFormProp> = () => {
  const [oldPwd, setOldPwd] = useState<string>("");
  const [newPwd, setNewPwd] = useState<string>("");
  const [confirmNewPwd, setConfirmNewPwd] = useState<string>("");
  const [contentIsChanged, setContentChanged] = useState<boolean>(false);
  useEffect(() => {
    setContentChanged(true);
    if (oldPwd === null || oldPwd === undefined || oldPwd === "") setContentChanged(false);
    if (newPwd === null || newPwd === undefined || newPwd === "") setContentChanged(false);
    if (confirmNewPwd === null || confirmNewPwd === undefined || confirmNewPwd === "") setContentChanged(false);
  }, [
    oldPwd, newPwd, confirmNewPwd
  ]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const process = async () => {};
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

interface MyProfileContentProp {};

export const MyProfileContent: React.FC<MyProfileContentProp> = () => {
  const styles: {[key: string]: CSSProperties} = {
    wrapper: {
      width: "calc(max(90%, 100% - 10em))",
      paddingLeft: "1em",
      display: "flex",
      flexDirection: "column",
      flexWrap: "nowrap",
      justifyContent: "flex-start",
      alignItems: "flex-start",
      gap: "1em",
    },
    header: {
      fontSize: "1.5em",
      fontWeight: "bold",
      textDecoration: "underline"
    },
  };
  return (
    <div style={styles.wrapper}>
      <p style={styles.header}>
        My Profile
      </p>
      <ChangeAvtForm />
      <ChangeUsernameForm />
      <ChangePasswordForm />
    </div>
  );
};

interface UploadVideoBtnProp {
  handleClick: () => void;
}

export const UploadVideoBtn: React.FC<UploadVideoBtnProp> = ({handleClick}) => {
  const [isHovered, setHover] = useState<boolean>(false);
  const styles: {[key: string]: CSSProperties} = {
    btn: {
      border: isHovered ? "1px solid #000" : "1px solid transparent",
      transition: "all .3s ease",
      cursor: "pointer",
      backgroundColor: "transparent",
      outline: "none",
      padding: "0.5em",
      width: "7em",
      borderRadius: ".5em",
    }
  };
  return (
    <button style={styles.btn} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} onClick={handleClick}>
      Upload
    </button>
  );
};

interface MyVideosContentBodyNavbarItemProp {
  str: string;
  optionVal: string;
  activeVal: string;
  handleClick: () => void;
}

export const MyVideosContentBodyNavbarItem: React.FC<MyVideosContentBodyNavbarItemProp> = ({
  str, optionVal, activeVal, handleClick
}) => {
  const [isActive, setActive] = useState<boolean>(false);
  useEffect(() => {
    setActive(optionVal === activeVal);
  }, [
    optionVal, activeVal
  ]);


  const styles: {[key: string]: CSSProperties} = {
    text: {
      width: "10em",
      padding: ".5em",
      alignSelf: "center",
      textAlign: "center",
      backgroundColor: isActive ? "#ddd" : "transparent",
      transition: "all .3s ease",
      cursor: "pointer",
      border: "1px solid #000",
      borderRadius: ".5em",
    }
  };
  return (
    <p style={styles.text} onClick={handleClick}>
      {str}
    </p>
  );
};

interface MyVideosContentBodyNavbarListProp {
  activeOption: string;
  setOption: (arg0: string) => void;
}

export const MyVideosContentBodyNavbarList: React.FC<MyVideosContentBodyNavbarListProp> = ({activeOption, setOption}) => {
  const [activeVal, setActiveVal] = useState<string>(activeOption);
  const handleChooseStatistic = () => {
    setOption("statistic");
    setActiveVal("statistic");
  }
  const handleChooseList = () => {
    setOption("list");
    setActiveVal("list");
  };
  const styles: {[key: string]: CSSProperties} = {
    wrapper: {
      width: "50%",
      display: "flex",
      flexDirection: "row",
      flexWrap: "nowrap",
      justifyContent: "flex-start",
      alignItems: "flex-start",
      gap: ".5em"
    }
  };
  return (
    <div style={styles.wrapper}>
      <MyVideosContentBodyNavbarItem
        str={"Statistic"}
        optionVal={"statistic"}
        activeVal={activeVal}
        handleClick={handleChooseStatistic}
      />
      <MyVideosContentBodyNavbarItem
        str={"List"}
        optionVal={"list"}
        activeVal={activeVal}
        handleClick={handleChooseList}
      />
    </div>
  );
};

interface TotalVideosCardProp {
  count: number;
  lastWeekCount: number;
}

export const TotalVideosCard: React.FC<TotalVideosCardProp> = ({count, lastWeekCount}) => {
  const styles: {[key: string]: CSSProperties} = {
    wrapper: {
      width: "30%",
      display: "flex",
      flexDirection: "column",
      flexWrap: "nowrap",
      gap: ".25em",
      justifyContent: "center",
      alignItems: "flex-start",
    },
    header: {
      width: "100%",
      fontSize: "1.25em",
      fontWeight: "bold",
      padding: ".5em",
      alignSelf: "center",
      textAlign: "center",
    },
    text: {
      width: "100%",
      padding: ".25em",
      alignSelf: "center",
      textAlign: "center",
    },
  };
  return (
    <div style={styles.wrapper}>
      <p style={styles.header}>
        Video count
      </p>
      <p style={styles.text}>
        {count} in total
      </p>
      <p style={styles.text}>
        <span style={{color: "#0f0"}}>+{lastWeekCount}</span> last week
      </p>
    </div>
  );
};


interface TotalViewsCardProp {
  count: number;
  lastWeekCount: number;
}

export const TotalViewsCard: React.FC<TotalViewsCardProp> = ({count, lastWeekCount}) => {
  const styles: {[key: string]: CSSProperties} = {
    wrapper: {
      width: "30%",
      display: "flex",
      flexDirection: "column",
      flexWrap: "nowrap",
      gap: ".25em",
      justifyContent: "center",
      alignItems: "flex-start",
    },
    header: {
      width: "100%",
      fontSize: "1.25em",
      fontWeight: "bold",
      padding: ".5em",
      alignSelf: "center",
      textAlign: "center",
    },
    text: {
      width: "100%",
      padding: ".25em",
      alignSelf: "center",
      textAlign: "center",
    },
  };
  return (
    <div style={styles.wrapper}>
      <p style={styles.header}>
        View count
      </p>
      <p style={styles.text}>
        {count} in total
      </p>
      <p style={styles.text}>
        <span style={{color: "#0f0"}}>+{lastWeekCount}</span> last week
      </p>
    </div>
  );
};


interface TotalLikesCardProp {
  count: number;
  lastWeekCount: number;
}

export const TotalLikesCard: React.FC<TotalLikesCardProp> = ({count, lastWeekCount}) => {
  const styles: {[key: string]: CSSProperties} = {
    wrapper: {
      width: "30%",
      display: "flex",
      flexDirection: "column",
      flexWrap: "nowrap",
      gap: ".25em",
      justifyContent: "center",
      alignItems: "flex-start",
    },
    header: {
      width: "100%",
      fontSize: "1.25em",
      fontWeight: "bold",
      padding: ".5em",
      alignSelf: "center",
      textAlign: "center",
    },
    text: {
      width: "100%",
      padding: ".25em",
      alignSelf: "center",
      textAlign: "center",
    },
  };
  return (
    <div style={styles.wrapper}>
      <p style={styles.header}>
        Like count
      </p>
      <p style={styles.text}>
        {count} in total
      </p>
      <p style={styles.text}>
        <span style={{color: "#0f0"}}>+{lastWeekCount}</span> last week
      </p>
    </div>
  );
};

export const MyVideosContentStatistic: React.FC = () => {
  const styles: {[key: string]: CSSProperties} = {
    wrapper: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      flexWrap: "nowrap",
      justifyContent: 'space-between',
      alignItems: "center",
    }
  };
  return (
    <div style={styles.wrapper}>
      <TotalVideosCard count={0} lastWeekCount={0} />
      <TotalViewsCard count={0} lastWeekCount={0} />
      <TotalLikesCard count={0} lastWeekCount={0} />
    </div>
  );
};

export const ListHeader: React.FC = () => {
  const styles: {[key: string]: CSSProperties} = {
    row: {
      height: "4.5em",
      backgroundColor: "#a47864",
    }
  };
  return (
    <tr style={styles.row}>
      <th>
        <span style={{padding: ".5em"}}>
          Thumbnail
        </span>
      </th>
      <th>
        <span style={{padding: ".5em"}}>
          Title
        </span>
      </th>
      <th>
        <span style={{padding: ".5em"}}>
          Views
        </span>
      </th>
      <th>
        <span style={{padding: ".5em"}}>
          Likes
        </span>
      </th>
      <th>
        <span style={{padding: ".5em"}}>
          Actions
        </span>
      </th>
    </tr>
  );
};

interface UpdateBtnProp {
  handleClick: () => void;
}

export const UpdateBtn: React.FC<UpdateBtnProp> = ({handleClick}) => {
  const [isHovered, setHover] = useState<boolean>(false);
  const styles: {[key: string]: CSSProperties} = {
    btn: {
      padding: ".5em .25em",
      backgroundColor: isHovered ? "#c49078" : "transparent",
      border: isHovered ? "1px solid #444" : "1px solid transparent",
      transition: "all .3s ease",
      borderRadius: ".25em",
      cursor: "pointer",
    }
  };
  return (
    <button onClick={handleClick} style={styles.btn} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      Update
    </button>
  );
};

interface DeleteBtnProp {
  handleClick: () => void;
}

export const DeleteBtn: React.FC<DeleteBtnProp> = ({handleClick}) => {
  const [isHovered, setHover] = useState<boolean>(false);
  const styles: {[key: string]: CSSProperties} = {
    btn: {
      padding: ".5em .25em",
      backgroundColor: isHovered ? "#f44" : "transparent",
      border: isHovered ? "1px solid #444" : "1px solid transparent",
      transition: "all .3s ease",
      borderRadius: ".25em",
      cursor: "pointer",
    }
  };
  return (
    <button style={styles.btn} onClick={handleClick} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      Delete
    </button>
  );
};

export const ListItem: React.FC = () => {
  const source = parrot;
  const title = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima praesentium quam repellendus. Ut laborum aliquam, saepe dolorem ipsum et dolor.";
  const views = "123K";
  const likes = "1.1K";

  const styles: {[key: string]: CSSProperties} = {
    row: {
      height: "4.5em",
    }
  };
  return (
    <tr style={styles.row}>
      <td style={{width: "10%"}}>
        <img src={parrot} alt="" style={{height: "4.5em", aspectRatio: "16/9", objectFit: "contain", backgroundColor: "#000"}}/>
      </td>
      <td style={{padding: ".5em", width: "50%"}}>
        <p style={{
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          whiteSpace: "normal",
          textOverflow: "ellipsis",
        }}>
          {title}
        </p>
      </td>
      <td style={{padding: ".5em"}}>
        <p style={{textAlign: "center"}}>
          {views}
        </p>
      </td>
      <td style={{padding: ".5em"}}>
        <p style={{textAlign: "center"}}>
          {likes}
        </p>
      </td>
      <td style={{
        padding: ".5em",
        display: "flex",
        flexDirection: "column",
        gap: ".5em",
      }}>
        <UpdateBtn handleClick={() => {}}/>
        <DeleteBtn handleClick={() => {}}/>
      </td>
    </tr>
  );
};

export const MyVideosContentList: React.FC = () => {
  const styles: {[key: string]: CSSProperties} = {
    wrapper: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      flexWrap: "nowrap",
    },
  };
  return (
    <div style={styles.wrapper}>
      <table style={{width: "100%", height: "100%"}}>
        <ListHeader />
        <ListItem />
      </table>
    </div>
  );
};

export const MyVideosContentBody: React.FC = () => {
  const [activeOption, setOption] = useState<string>("statistic");

  const styles: {[key: string]: CSSProperties} = {
    wrapper: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      flexWrap: "nowrap",
      justifyContent: "flex-start",
      alignItems: "flex-start",
      gap: "1em",
    }
  };
  return (
    <div style={styles.wrapper}>
      <MyVideosContentBodyNavbarList activeOption={activeOption} setOption={setOption} />
      {(activeOption === "statistic") && <MyVideosContentStatistic />}
      {(activeOption === "list") && <MyVideosContentList />}
    </div>
  );
};

interface MyVideosContentProp {

};

export const MyVideosContent: React.FC<MyVideosContentProp> = () => {
  const handleOpenUpload = () => {};
  const styles: {[key: string]: CSSProperties} = {
    wrapper: {
      width: "100%",
      paddingLeft: "1em",
      paddingRight: "1em",
      display: "flex",
      flexDirection: "column",
      flexWrap: "nowrap",
      justifyContent: "flex-start",
      alignItems: "flex-start",
      gap: "1em",
    },
    headerWrapper: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      flexWrap: "nowrap",
      justifyContent: "space-between",
      alignItems: "center",
    },
    headerText: {
      fontSize: "1.5em",
      fontWeight: "bold",
      textDecoration: "underline"
    },
  };
  return (
    <div style={styles.wrapper}>
      <div style={styles.headerWrapper}>
        <p style={styles.headerText}>
          My Videos
        </p>
        <UploadVideoBtn handleClick={handleOpenUpload}/>
      </div>
      <MyVideosContentBody />
    </div>
  );
};

interface WatchedVideosItemProp {};

export const WatchedVideosItem: React.FC<WatchedVideosItemProp> = () => {
  const source = parrot;
  const title = "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Blanditiis unde deleniti aperiam temporibus voluptatem dolor, maiores doloribus. Fuga, modi nostrum.";

  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/video/abcxyz");
  };
  const styles: {[key: string]: CSSProperties} = {
    wrapper: {
      width: "100%",
      height: "9em",
      display: "inline-flex",
      flexDirection: "row",
      flexWrap: "nowrap",
      gap: ".5em",
      cursor: "pointer",
    },
    img: {
      height: "9em",
      aspectRatio: "16/9",
      backgroundColor: "#000",
      objectFit: "contain",
    },
    title: {
      height: "100%",
      textOverflow: "ellipsis",
      display: "-webkit-box",
      WebkitLineClamp: 2,
      WebkitBoxOrient: "vertical",
      whiteSpace: "normal",
      alignContent: "center",
      fontSize: "1.25em",
      fontWeight: "bold",
    }
  };
  return (
    <div style={styles.wrapper} onClick={handleClick}>
      <img src={source} alt="thumb" style={styles.img}/>
      <p style={styles.title}>
        {title}
      </p>
    </div>
  );
};

interface WatchedVideosProp {};

export const WatchedVideo: React.FC<WatchedVideosProp> = () => {
  const styles: {[key: string]: CSSProperties} = {
    wrapper: {
      paddingLeft: "1em",
      width: "90%",
      display: "flex",
      flexDirection: "column",
    },
    header: {
      height: "2.5em",
      fontWeight: "bold",
      fontSize: "1.5em",
      padding: ".5em",
    },
    notTitleWrapper: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      gap: "1em",
    }
  };
  return (
    <div style={styles.wrapper}>
      <p style={styles.header}>
        Watched videos
      </p>
      <div style={styles.notTitleWrapper}>
        <WatchedVideosItem />
        <WatchedVideosItem />
      </div>
    </div>
  );
};


interface LikedVideosItemProp {};

export const LikedVideosItem: React.FC<LikedVideosItemProp> = () => {
  const source = parrot;
  const title = "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Blanditiis unde deleniti aperiam temporibus voluptatem dolor, maiores doloribus. Fuga, modi nostrum.";

  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/video/abcxyz");
  };
  const styles: {[key: string]: CSSProperties} = {
    wrapper: {
      width: "100%",
      height: "9em",
      display: "inline-flex",
      flexDirection: "row",
      flexWrap: "nowrap",
      gap: ".5em",
      cursor: "pointer",
    },
    img: {
      height: "9em",
      aspectRatio: "16/9",
      backgroundColor: "#000",
      objectFit: "contain",
    },
    title: {
      height: "100%",
      textOverflow: "ellipsis",
      display: "-webkit-box",
      WebkitLineClamp: 2,
      WebkitBoxOrient: "vertical",
      whiteSpace: "normal",
      alignContent: "center",
      fontSize: "1.25em",
      fontWeight: "bold",
    }
  };
  return (
    <div style={styles.wrapper} onClick={handleClick}>
      <img src={source} alt="thumb" style={styles.img}/>
      <p style={styles.title}>
        {title}
      </p>
    </div>
  );
};

interface LikedVideosProp {};

export const LikedVideo: React.FC<LikedVideosProp> = () => {
  const styles: {[key: string]: CSSProperties} = {
    wrapper: {
      paddingLeft: "1em",
      width: "90%",
      display: "flex",
      flexDirection: "column",
    },
    header: {
      height: "2.5em",
      fontWeight: "bold",
      fontSize: "1.5em",
      padding: ".5em",
    },
    notTitleWrapper: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      gap: "1em",
    }
  };
  return (
    <div style={styles.wrapper}>
      <p style={styles.header}>
        Liked videos
      </p>
      <div style={styles.notTitleWrapper}>
        <LikedVideosItem />
        <LikedVideosItem />
      </div>
    </div>
  );
};

interface ManageMyProfileProp {
  username: string | null;
}

export const ManageMyProfile: React.FC<ManageMyProfileProp> = ({username}) => {
  const [activatedOption, setOption] = useState<string>("my-profile");
  const styles: {[key: string]: CSSProperties} = {
    wrapper: {
      width: "100%",
      marginTop: "1em",
      display: "flex",
      flexDirection: "row",
      flexWrap: "nowrap",
      justifyContent: "space-between",
      alignContent: "flex-start",
    },
  };
  return (
    <div style={styles.wrapper}>
      <NavbarOptionList changeParentOption={setOption}/>
      {
        (activatedOption === "my-profile") &&
        <MyProfileContent />
      }
      {
        (activatedOption === "my-videos") &&
        <MyVideosContent />
      }
      {
        (activatedOption === "watched-videos") &&
        <WatchedVideo />
      }
      {
        (activatedOption === "liked-videos") &&
        <LikedVideo />
      }
    </div>
  );
};