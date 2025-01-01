import React, { CSSProperties, MouseEventHandler, useEffect, useRef, useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';

import test_audio from "../../../assets/test_audio.mp4";
import parrot from "../../../assets/parrot.jpg";
import { generateRandomDate, generateRandomWatchCount, generateTimeDifferencesStr, shortenCount } from './DefaultVideoCard';
import { CommentCard } from './CommentCard';
import { useAuth } from '../../../contexts/AuthContext';

const randomComponentKey = (): number => Math.floor(Math.random() * 1000000000000);

interface VideoReactButtonProp {
  status: boolean;
  inactiveStr: string | JSX.Element;
  activeStr: string | JSX.Element;
  handleAddReactFunction: () => void;
  handleRemoveReactFunction: () => void;
}

export const VideoReactButton: React.FC<VideoReactButtonProp> = ({
  status, inactiveStr, activeStr, handleAddReactFunction, handleRemoveReactFunction
}) => {
  const handleClick = () => {
    // if status is active before click => remove react status
    if (status) handleRemoveReactFunction();
    else handleAddReactFunction();
  };
  const styles: {[key: string]: CSSProperties} = {
    wrapper: {
      width: "100%",
      padding: "0.5em",
      // border: "1px solid #000",
      // borderRadius: "5px",
      backgroundColor: "transparent",
      cursor: "pointer",
      alignContent: "center",
      textAlign: "center",
    }
  };
  return (
    <div onClick={handleClick} style={styles.wrapper}>
      {status ? activeStr : inactiveStr}
    </div>
  );
};

interface ReactCountProp {
  count: number;
}

export const ReactCount: React.FC<ReactCountProp> = ({count}) => {
  const styles: {[key: string]: CSSProperties} = {
    wrapper: {
      width: "100%",
      // border: "1px solid #000",
      // borderRadius: "5px",
      backgroundColor: "transparent",
      alignContent: "center",
      textAlign: "center",
      padding: "0.5em",
      cursor: "default"
    }
  };
  return (
    <p style={styles.wrapper}>
      {count}
    </p>
  );
};

interface VideoReactSectionProp {
  videoId: string;
}

export const VideoReactSection: React.FC<VideoReactSectionProp> = ({videoId}) => {
  const [reactState, set_reactState] = useState<string>("");
  // request BE-API for react state on load
  useEffect(() => {
    set_reactState("");
  }, []);

  const reactCount = useRef(0);
  // request BE-API for react count on load
  useEffect(() => {
    reactCount.current = 0;
  }, []);
  // handle action "click like button" when "liked"
  const handleAddLike = () => {
    set_reactState("liked");
  };
  // handle action "click like button" when "not liked"
  const handleRemoveLike = () => {
    set_reactState("");
  };
  // handle action "click dislike button" when "disliked"
  const handleAddDislike = () => {
    set_reactState("disliked");
  };
  // handle action "click dislike button" when "not disliked"
  const handleRemoveDislike = () => {
    set_reactState("");
  };
  const styles: {[key: string]: CSSProperties} = {
    wrapper: {
      // width: "10%",
      width: "10%",
      padding: "auto",
      marginTop: "10em",
      display: "flex",
      flexDirection: "column",
      flexWrap: "nowrap",
      justifyContent: "center",
      alignItems: "flex-start",
    }
  };
  return (
    <div style={styles.wrapper}>
      {/* Like button */}
      <VideoReactButton
        status={reactState === "liked"}
        activeStr={"Liked"}
        inactiveStr={"Like"}
        handleAddReactFunction={handleAddLike}
        handleRemoveReactFunction={handleRemoveLike}
      />
      {/* Reacted Count */}
      <ReactCount count={reactCount.current} />
      {/* Dislike button */}
      <VideoReactButton
        status={reactState === "disliked"}
        activeStr={"Disliked"}
        inactiveStr={"Dislike"}
        handleAddReactFunction={handleAddDislike}
        handleRemoveReactFunction={handleRemoveDislike}
      />
    </div>
  );
};

interface VideoMediaCardProp {
  videoId: string | null;
}

export const VideoMediaCard: React.FC<VideoMediaCardProp> = ({videoId}) => {
  const source = videoId ? `http://127.0.0.1:4000/video/get-video-stream/${videoId}` : test_audio;
  const styles: {[key: string]: CSSProperties} = {
    vid: {
      aspectRatio: "16/9",
      width: "100%",
      objectFit: "contain",
      backgroundColor: "#000",
      borderRadius: "1em",
    },
  };
  return (
    <video style={styles.vid} controls>
      <source type='video/mp4' src={source}/>
      Your browser does not support the video tag
    </video>
  );
};

interface VideoTitleProp {
  str: string
};

export const VideoTitle: React.FC<VideoTitleProp> =({str}) => {
  const styles: {[key:string]: CSSProperties} = {
    text: {
      width: "100%",
      padding: "0.5em 0.25em",
      fontSize: "1.5em",
      fontWeight: "bold",
    }
  }
  return (
    <p style={styles.text}>
      {str}
    </p>
  )
};

interface AvtProp {
  img: string | null;
}

export const Avt: React.FC<AvtProp> = ({img}) => {
  const source = img || parrot;
  
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/user/abcxyz');
  };

  const styles: {[key: string]: CSSProperties} = {
    wrapper: {
      width: "4em",
      height: "100%",
      paddingTop: "1em",
      paddingLeft: "0.5em",
      paddingRight: "0.5em",
      cursor: "pointer",
    },
    img: {
      width: "3em",
      height: "3em",
      borderRadius: "5em",
    }
  };
  return (
    <div 
      style={styles.wrapper}
      onClick={handleClick}
    >
      <img src={source} alt="avt" style={styles.img}/>
    </div>
  );
};

interface UsernameProp {
  str: string;
}

export const Username: React.FC<UsernameProp> = ({str}) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/user/abcxyz');
  };

  const styles: {[key: string]: CSSProperties} = {
    text: {
      height: "2em",
      padding: "0.5em",
      width: "100%",
      fontWeight: "bold",
      cursor: "pointer",
    },
  };
  return (
    <p style={styles.text} onClick={handleClick}>
      @{str}
    </p>
  );
};

interface VideoWatchCountAndUploadTimeProp {
  watchCountStr: string;
  uploadSince: string;
}

export const VideoWatchCountAndUploadSince: React.FC<VideoWatchCountAndUploadTimeProp> = ({watchCountStr, uploadSince}) => {
  const styles: {[key: string]: CSSProperties} = {
    text: {
      width: "100%",
      height: "2em",
      padding: "0.5em 0.25em",
      alignSelf: "center",
      textAlign: "start",
    }
  };
  return (
    <p style={styles.text}>
      {watchCountStr}&nbsp;&middot;&nbsp;{uploadSince}
    </p>
  );
};

interface VideoBasicInformationProp {

}

export const VideoBasicInformation: React.FC<VideoBasicInformationProp> = () => {
  const styles: {[key: string]: CSSProperties} = {
    wrapper: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "nowrap",
      justifyContent: "flex-start",
      alignItems: "center"
    },
    notAvtWrapper: {
      display: "flex",
      flexDirection: "column",
      flexWrap: "nowrap",
      justifyContent: "flex-start",
      alignItems: "flex-start",
    },
  };
  return (
    <div style={styles.wrapper}>
      <Avt img={null} />
      <div style={styles.notAvtWrapper}>
        <Username str={"Username"} />
        <VideoWatchCountAndUploadSince 
          watchCountStr={shortenCount(generateRandomWatchCount(null))}
          uploadSince={generateTimeDifferencesStr(generateRandomDate(null))}
        />
      </div>
    </div>
  );
};

interface VideoCardProp {

}

export const VideoCard: React.FC<VideoCardProp> = () => {
  const styles: {[key: string]: CSSProperties} = {
    wrapper: {
      width: '100%',
      display: "flex",
      flexDirection: "column",
      flexWrap: "nowrap",
      justifyContent: "center",
      alignItems: "flex-start",
      gap: "1em",
    }
  };
  return (
    <div style={styles.wrapper}>
      <VideoTitle str={"Title"} />
      <VideoBasicInformation />
      <VideoMediaCard videoId={null} />
    </div>
  );
};

export const OtherVideoSectionHeader: React.FC = () => {
  const styles: {[key: string]: CSSProperties} = {
    wrapper: {
      width: "100%",
      marginBottom: ".5em",
    },
    text: {
      padding: "0.75em",
      fontWeight: "bold",
    },
  };
  return (
    <div style={styles.wrapper}>
      <p style={styles.text}>Other videos</p>
      <hr></hr>
    </div>
  );
};

interface SectionItemThumbnailProp {
  source: string | null;
}

export const SectionItemThumbnail: React.FC<SectionItemThumbnailProp> = ({source}) => {
  const styles: {[key: string]: CSSProperties} = {
    img: {
      backgroundColor: "#000",
      height: "100%",
      aspectRatio: "16/9",
      objectFit: "contain",
      border: "none",
    }
  };
  return (
    <img src={source || parrot} alt={"thumb"} style={styles.img}/>
  );
};

interface SectionItemTitleProp {
  str: string;
}

export const SectionItemTitle: React.FC<SectionItemTitleProp> = ({str}) => {
  const styles: {[key: string]: CSSProperties} = {
    text: {
      height: "100%",
      fontWeight: "bold",
      overflow: "hidden",
      textOverflow: "ellipsis",
      display: "-webkit-box",
      WebkitLineClamp: 2,
      WebkitBoxOrient: "vertical",
      whiteSpace: "normal",
      padding: "0.5em",
      textAlign: "center",
    }
  };
  return (
    <p style={styles.text}>
      {str}
    </p>
  );
};

interface OtherVideoSectionItemProp {
  videoId: string | null;
}

export const OtherVideoSectionItem: React.FC<OtherVideoSectionItemProp> = ({videoId}) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/video/abcxyz");
  };
  const styles: {[key: string]: CSSProperties} = {
    wrapper: {
      height: "3.5rem",
      width: '100%',
      marginBottom: "0.5em",
      overflow: "hidden",
      cursor: "pointer",
      display: "flex",
      flexDirection: "row",
      flexWrap: "nowrap",
    }
  };
  return (
    <div onClick={handleClick} style={styles.wrapper}>
      <SectionItemThumbnail source={null} />
      <SectionItemTitle str={"Title"} />
    </div>
  );
};

interface OtherVideoSectionListProp {
  videoIds: string[];
}

export const OtherVideoSectionList: React.FC<OtherVideoSectionListProp> = ({videoIds}) => {
  videoIds = ["", "", "", "", ""];
  const styles: {[key: string]: CSSProperties} = {
    wrapper: {
      width: "100%",
      height: "12rem",
      overflowY: "scroll",
    }
  };
  return (
    <div style={styles.wrapper}>
      {videoIds.map((item, index) => <OtherVideoSectionItem videoId={item} key={index} />)}
    </div>
  );
};

interface OtherVideoSectionProp {
  videoId: string | null;
}

export const OtherVideoSection: React.FC<OtherVideoSectionProp> = ({videoId}) => {
  const videoIds: React.MutableRefObject<string[]> = useRef([]);

  useEffect(() => {
    videoIds.current = ["", "", "", "", ""];
  }, []);
  const styles: {[key: string]: CSSProperties} = {
    wrapper: {
      width: "30%",
      display: "flex",
      flexDirection: "column",
      flexWrap: "nowrap",
      borderRadius: "1em",
    }
  };
  return (
    <div style={styles.wrapper}>
      <OtherVideoSectionHeader />
      <OtherVideoSectionList videoIds={videoIds.current} />
    </div>
  );
};

interface MidSectionProp {};

export const MidSection: React.FC<MidSectionProp> = () => {
  const styles: {[key: string]: CSSProperties} = {
    wrapper: {
      width: "60%",
      display: "flex",
      flexDirection: "column",
      flexWrap: "nowrap",
      gap: "1em",
    }
  };
  return (
    <div style={styles.wrapper}>
      <VideoCard />
      <DirectReplyForm videoId={null} />
      <CommentSection commentIds={[]}/>
    </div>
  );
};

interface WatchVideoSectionProp {

}

export const WatchVideoSection: React.FC<WatchVideoSectionProp> = () => {
  const [windowWidth, set_windowWidth] = useState<number>(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      set_windowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const styles: {[key: string]: CSSProperties} = {
    wrapper: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "flex-start",
      gap: '2em',
    },
  };
  return (
    <div style={styles.wrapper}>
      <VideoReactSection videoId={""} />
      <MidSection />
      <OtherVideoSection videoId={null} />
    </div>
  );
};

const SignInButton: React.FC = () => {
  const navigate = useNavigate();
  const handleClick = () => navigate('/sign-in');
  const [isHovered, setHover] = useState<boolean>(false);
  const styles: {[key: string]: CSSProperties} = {
    btn: {
      width: "8em",
      height: "2.5em",
      padding: ".5em",
      border: "none",
      borderRadius: ".25em",
      cursor: "pointer",
      backgroundColor: isHovered ? "#bbb" : "transparent",
      transition: "all .3s ease",
    },
  };
  return (
    <button style={styles.btn} onClick={handleClick}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
    >
      Sign In
    </button>
  );
};

const SignUpButton: React.FC = () => {
  const navigate = useNavigate();
  const handleClick = () => navigate("/sign-up");
  const [isHovered, setHover] = useState<boolean>(false);
  const styles: {[key: string]: CSSProperties} = {
    btn: {
      width: "8em",
      height: "2.5em",
      padding: ".5em",
      border: "none",
      borderRadius: ".25em",
      cursor: "pointer",
      backgroundColor: isHovered ? "#2d2" : "#2a2",
      transition: "all .3s ease",
    },
  };
  return (
    <button style={styles.btn} onClick={handleClick}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
    >
      Sign Up
    </button>
  );
};

export const DirectReplyFormUnauthenticated: React.FC = () => {
  const styles: {[key: string]: CSSProperties} = {
    wrapper: {
      height: "3em",
      padding: ".5em",
      display: "flex",
      flexDirection: "row",
      flexWrap: "nowrap",
      justifyContent: "space-between",
      alignItems: "center",
    },
    text: {
      width: "50%",
      height: "100%",
      padding: ".5em",
      alignSelf: "center",
      textAlign: "start",
    },
    buttons: {
      width: "50%",
      height: "100%",
      display: "inline-flex",
      flexDirection: "row",
      flexWrap: "nowrap",
      gap: '1em',
      alignItems: "center",
      justifyContent: "flex-end",
    }
  };
  return (
    <div style={styles.wrapper}>
      <p style={styles.text}>
        Sign in to leave a comment
      </p>
      <div style={styles.buttons}>
        <SignInButton />
        <SignUpButton />
      </div>
    </div>
  );
};


interface SubmitBtnProp {
  handleClick: MouseEventHandler;
  isDisabled: boolean;
}

export const SubmitBtn: React.FC<SubmitBtnProp> = ({
  handleClick, isDisabled
}) => {
  const [isHovering, setHover] = useState<boolean>(false);
  const setHovered = () => setHover(true);
  const setUnHovered = () => setHover(false);
  const styles: {[key: string]: CSSProperties} = {
    btn: {
      backgroundColor: isDisabled ? "#ddd" : isHovering ? "#AFA" : "#0f0",
      transition: "all .3s ease",
      height: "3rem",
      width: "6rem",
      padding: "1rem",
      borderRadius: "5rem",
      border: "none",
    },
  };
  return (
    <button
      disabled={isDisabled}
      style={styles.btn}
      onMouseEnter={setHovered}
      onMouseLeave={setUnHovered}
      onClick={handleClick}
    >
      Submit
    </button>
  );
  
};


export const ReplyForm: React.FC = () => {
  const [reply, setReply] = useState<string>("");
  const [isSubmitDisabled, setSubmitDisabled] = useState<boolean>(true);
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
      <Avt img={null}/>
      <div style={styles.notAvtWrapper}>
        <input type="text" style={styles.input} value={reply} onChange={(e) => setReply(e.target.value)}/>
        <div style={styles.formActionWrapper}>
          <div style={styles.leftGroupWrapper}>
            &nbsp;
          </div>
          <div style={styles.rightGroupWrapper}>
            <SubmitBtn handleClick={()=>{}} isDisabled={isSubmitDisabled} />        
          </div>
        </div>
      </div>
    </div>
  );
};

interface DirectReplyFormProp {
  videoId: string | null;
}

export const DirectReplyForm: React.FC<DirectReplyFormProp> = ({videoId}) => {
  const {checkToken} = useAuth();
  const styles: {[key: string]: CSSProperties} = {
    wrapper: {
      width: "100%",
      borderRadius: ".5em",
      border: "1px solid #000",
    }
  };

  return (
    <div style={styles.wrapper}>
      {checkToken() ? (<ReplyForm />) : (<DirectReplyFormUnauthenticated />)}
    </div> 
  );
};

const CommentSectionHeader: React.FC = () => {
  const styles: {[key: string]: CSSProperties} = {
    wrapper: {
      width: "100%",
      marginBottom: "1em",
    },
    text: {
      textTransform: "uppercase",
      fontWeight: "bold",
      // paddingLeft: "1em",
      fontSize: "1.5em",
    }
  };
  return (
    <div style={styles.wrapper}>
      <p style={styles.text}>
        Comments
      </p>
      <hr />
    </div>
  );
};

interface CommentSectionProp {
  commentIds: string[];
}

export const CommentSection: React.FC<CommentSectionProp> = ({commentIds}) => {
  const ids = useRef(commentIds);
  useEffect(() => {
    ids.current = ["", "", "", "", ""];
  }, []);

  const styles: {[key: string]: CSSProperties} = {
    wrapper: {
      display: "flex",
      flexDirection: "column",
      flexWrap: 'nowrap',
    }
  };
  return (
    <div>
      <CommentSectionHeader />
      <div style={styles.wrapper}>
        {ids.current.map(item => <CommentCard commentId={item} />)}
      </div>
    </div>
  );
};