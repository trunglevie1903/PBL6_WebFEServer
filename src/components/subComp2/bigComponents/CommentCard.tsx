import React, { CSSProperties, MouseEventHandler, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import parrot from "../../../assets/parrot.jpg";

const randomComponentKey = (): number => Math.floor(Math.random() * 1000000000000);

interface CreatorUsernameProp {
  str: string;
}

export const CreatorUsername: React.FC<CreatorUsernameProp> = ({str}) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/user/abcxyz');
  };

  const styles: {[key: string]: CSSProperties} = {
    text: {
      height: "2rem",
      padding: "0.5rem",
      width: "100%",
      fontWeight: "bold",
    },
  };
  return (
    <p style={styles.text} onClick={handleClick}>
      @{str}&nbsp;A while ago
    </p>
  );
};


interface AvtProp {
  img: string | null;
}

export const Avt: React.FC<AvtProp> = ({img}) => {
  const source = img || parrot;

  const styles: {[key: string]: CSSProperties} = {
    wrapper: {
      width: "3rem",
      height: "100%",
      paddingTop: "0.5rem",
      paddingLeft: "0.5rem",
      paddingRight: "0.5rem",
      
    },
    img: {
      width: "2rem",
      height: "2rem",
      borderRadius: "2rem",
    }
  };
  return (
    <div 
      style={styles.wrapper}
    >
      <img src={source} alt="avt" style={styles.img}/>
    </div>
  );
};

interface CommentTextProp {
  str: string;
}

export const CommentText: React.FC<CommentTextProp> = ({str}) => {
  const [isExpanded, setExpand] = useState<boolean>(false);
  const handleBtnClick = () => setExpand(!isExpanded);

  const styles: {[key: string]: CSSProperties} = {
    wrapper: {
      display: "flex",
      flexDirection: "column",
      flexWrap: "nowrap",
      width: "calc(100% - 3rem)",
      alignItems: "flex-start",
    },
    textExpanded: {
      width: "100%",
      padding: "1rem",
      whiteSpace: "normal",
    },
    textShrunk: {
      width: "100%",
      padding: "1rem",
      overflow: "hidden",
      textOverflow: "unset",
      display: "-webkit-box",
      WebkitLineClamp: 2,
      WebkitBoxOrient: "vertical",
      whiteSpace: "normal",
    },
    btn: {
      border: "none",
      padding: "1rem",
      backgroundColor: "transparent",
      cursor: "pointer",
      color: "#444",
    },
  };
  return (
    <div style={styles.wrapper}>
      <p style={isExpanded ? styles.textExpanded : styles.textShrunk}>
        {str}
      </p>
      <button 
        style={styles.btn}
        onClick={handleBtnClick}
      >
        {isExpanded ? "Show less" : "Show more"}
      </button>
    </div>
  );
};

interface CancelBtnProp {
  handleClick: MouseEventHandler;
}

export const CancelBtn: React.FC<CancelBtnProp> = ({handleClick}) => {
  const [isHovering, setHover] = useState<boolean>(false);
  const setHovered = () => setHover(true);
  const setUnHovered = () => setHover(false);
  const styles: {[key: string]: CSSProperties} = {
    btn: {
      height: "3rem",
      width: "6rem",
      padding: "1rem",
      borderRadius: "5rem",
      border: "none",
      backgroundColor: isHovering ? "#bbb" : "#ddd",
      transition: "all .3s ease"
    }
  };
  return (
    <button 
      style={styles.btn} 
      onMouseEnter={setHovered} 
      onMouseLeave={setUnHovered}
      onClick={handleClick}
    >
      Cancel
    </button>
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
      <Avt img={null}/>
      <div style={styles.notAvtWrapper}>
        <input type="text" style={styles.input} value={reply} onChange={(e) => setReply(e.target.value)}/>
        <div style={styles.formActionWrapper}>
          <div style={styles.leftGroupWrapper}>
            &nbsp;
          </div>
          <div style={styles.rightGroupWrapper}>
            <CancelBtn handleClick={()=>{}} />
            <SubmitBtn handleClick={()=>{}} isDisabled={isSubmitDisabled} />        
          </div>
        </div>
      </div>
    </div>
  );
};


interface ShowMoreRepliesBtnProp {
  handleClick: MouseEventHandler;
  isRepliesShowed: boolean;
}

export const ShowMoreRepliesBtn: React.FC<ShowMoreRepliesBtnProp> = ({handleClick, isRepliesShowed}) => {
  const [isHovering, setHover] = useState<boolean>(false);
  const styles: {[key: string]: CSSProperties} = {
    btn: {
      border: "none",
      padding: "1rem",
      // width: "6rem",
      height: "3rem",
      cursor: "pointer",
      borderRadius: "1rem",
      backgroundColor: isHovering ? "#bbb" : "#ddd",
    },
  };
  return (
    <button
      onClick={handleClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={styles.btn}
    >
      {isRepliesShowed ? "Hide" : "Show"} replies
    </button>
  );
};

interface CommentActionProp {
  handleShowReplyForm: MouseEventHandler;
  handleShowReplies: MouseEventHandler;
  isRepliesShowed: boolean;
  hasChildReplies: boolean;
}

export const CommentAction: React.FC<CommentActionProp> = ({handleShowReplyForm, handleShowReplies, isRepliesShowed, hasChildReplies}) => {
  const styles: {[key: string]: CSSProperties} = {
    wrapper: {
      width: "100%",
      display: "inline-flex",
      flexDirection: "row",
      flexWrap: "nowrap",
      justifyContent: "flex-start",
      alignContent: "flex-start"
    },
    btn: {
      height: "3rem",
      width: "6rem",
      padding: "1rem",
      cursor: "pointer",
      border: "none",
      backgroundColor: "transparent",
    }
  };
  return (
    <div style={styles.wrapper}>
      {hasChildReplies && <ShowMoreRepliesBtn handleClick={handleShowReplies} isRepliesShowed={isRepliesShowed} />}
      <button style={styles.btn} onClick={handleShowReplyForm}>
        Reply
      </button>
    </div>
  );
};

interface ChildRepliesProp {
  commentIds: string[];
}

export const ChildReplies: React.FC<ChildRepliesProp> = ({commentIds}) => {
  const styles: {[key: string]: CSSProperties} = {
    wrapper: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      flexWrap: "nowrap",
      justifyContent: "flex-start",
      alignItems: "flex-start",
    }
  };
  return (
    <div style={styles.wrapper}>
      {
        commentIds.map((i) => <CommentCard key={randomComponentKey()} commentId={i}/>)
      }
    </div>
  );
};

const generateRandomCommentIds = (): string[] => {
  const itemCount: number = Math.floor(Math.random() * 2);
  return (itemCount ? ["abc"] : []);
}

interface CommentCardProp {
  commentId: string | null;
}

export const CommentCard: React.FC<CommentCardProp> = ({commentId}) => {
  const [showReplyForm, set_showReplyForm] = useState<boolean>(false);
  const handleClickShowReplyBtn = () => set_showReplyForm(!showReplyForm);
  const childCommentIds = useRef(generateRandomCommentIds());
  const [hasChildReplies, set_hasChildReplies] = useState<boolean>(false);
  const [showReplies, set_showReplies] = useState<boolean>(false);
  const handleClickShowReplies = () => set_showReplies(hasChildReplies && !showReplies);

  useEffect(() => {
    set_hasChildReplies(childCommentIds.current.length > 0);
  }, [childCommentIds]);

  const styles: {[key: string]: CSSProperties} = {
    wrapper: {
      width: "100%",
      display: "inline-flex",
      flexDirection: "row",
      flexWrap: "nowrap",
      justifyContent: "space-between",
      alignItems: "flex-start",
    },
    notAvtWrapper: {
      width: "calc(100% - 3rem)",
      display: "flex",
      flexDirection: "column",
      flexWrap: "nowrap",
      justifyContent: "center",
      alignItems: "flex-start",
    },
  };
  return (
    <div style={styles.wrapper}>
      <Avt img={null} />
      <div style={styles.notAvtWrapper}>
        <CommentText str={"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Unde deleniti dolores a ducimus, enim consectetur est id rerum optio reiciendis doloribus. Accusamus aspernatur iste, aperiam, architecto ipsam doloribus harum exercitationem perferendis unde aut quas tempora suscipit. Repellat similique fugit ducimus. Tempora, doloremque nostrum ipsa veritatis sapiente eveniet ullam adipisci quae? Eveniet dignissimos, reprehenderit dolore, rem, mollitia aperiam explicabo eum placeat dolorem modi architecto laboriosam! Temporibus, porro aut ipsam aspernatur neque consequatur dolores eum dolore explicabo expedita voluptate officiis nihil quibusdam amet pariatur obcaecati reprehenderit ipsa veniam accusantium placeat facilis! Cum consectetur architecto repudiandae molestiae doloremque eum! Autem totam adipisci doloribus."} />
        <CommentAction handleShowReplyForm={handleClickShowReplyBtn} hasChildReplies={hasChildReplies} isRepliesShowed={showReplies} handleShowReplies={handleClickShowReplies}/>
        {showReplyForm && <ReplyForm />}
        {hasChildReplies && showReplies && <ChildReplies commentIds={childCommentIds.current} />}
      </div>
    </div>
  );
};
