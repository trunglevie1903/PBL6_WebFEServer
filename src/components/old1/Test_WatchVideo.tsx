import React, {  } from 'react';
// import VideoCard from './VideoCard'; // Assuming you have a VideoCard component

interface VideoCardProps  {
  title: string
}

const VideoCard: React.FC<VideoCardProps> = ({title}) => {
  return (
    <div>{title}</div>
  )
};

const VideoWatchPage = () => {
  // const commentsData: CommentType[] = [
  //   { commentId: 1, videoId: 123, userId: 1, parentCommentId: null, text: 'Great video!' },
  //   { commentId: 2, videoId: 123, userId: 2, parentCommentId: 1, text: 'Thanks for sharing!' },
  //   { commentId: 3, videoId: 123, userId: 3, parentCommentId: null, text: 'Very informative!' },
  //   { commentId: 4, videoId: 123, userId: 1, parentCommentId: 3, text: 'I learned a lot.' },
  // ];

  // const commentsTree = buildCommentTree(commentsData);

  return (
    <div className="video-watch-page" style={{ display: 'flex', padding: '20px 40px' }}>
      {/* Left column */}
      <div className="left-column" style={{ flex: 3, marginRight: '20px' }}>
        <div className="video-section">
          <video controls style={{ width: '100%', height: '480px' }}>
            <source src="/path-to-video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="video-details">
          <h1>Video Title</h1>
          <p>Video Description</p>
          <p>Creator: John Doe</p>
          <div className="video-transcripts-and-summary">
            <div>
              <h4>Transcript</h4>
              <p></p>
            </div>
            <div>
              <h4>Summary</h4>
              <p></p>
            </div>
          </div>
        </div> 
        {/* -------------------------- */}
        <div className="comments-section">
          <h3>Comments</h3>
          {/* {commentsTree.map(comment => (
            <Comment key={comment.commentId} comment={comment} />
          ))} */}
        </div>
        {/* --------------------------- */}
      </div>
      
      {/* Right column */}
      <div className="right-column" style={{ flex: 1 }}>
        <h3>Related Videos</h3>
        <div className="related-videos">
          {/* Render multiple <VideoCard /> components */}
          <VideoCard title="Related Video 1" />
          <VideoCard title="Related Video 2" />
          <VideoCard title="Related Video 3" />
          {/* Add more VideoCard components as needed */}
        </div>
      </div>
    </div>
  );
};

export default VideoWatchPage;

// interface CommentType {
//   commentId: number;
//   videoId: number;
//   userId: number;
//   parentCommentId: number | null;
//   text: string;
//   children?: CommentType[]; // To hold replies
// }

// interface CommentProps {
//   comment: CommentType;
// }

// const buildCommentTree = (comments: CommentType[]): CommentType[] => {
//   const commentMap = new Map<number, CommentType>();
//   const tree: CommentType[] = [];

//   comments.forEach(comment => {
//     commentMap.set(comment.commentId, { ...comment, children: [] });
//   });

//   commentMap.forEach(comment => {
//     if (comment.parentCommentId === null) {
//       tree.push(comment); // Top-level comment
//     } else {
//       const parent = commentMap.get(comment.parentCommentId);
//       if (parent) {
//         parent.children?.push(comment); // Add to parent's children
//       }
//     }
//   });

//   return tree;
// };

// const Comment: React.FC<CommentProps> = ({ comment }) => {
//   const [replyText, setReplyText] = useState<string>('');
//   const [showReplyInput, setShowReplyInput] = useState<boolean>(false);

//   const handleReply = () => {
//     // Add reply handling logic here
//     // E.g., update the parent comment's children
//     console.log('Reply:', replyText, 'to comment ID:', comment.commentId);
//     setReplyText('');
//     setShowReplyInput(false);
//   };

//   return (
//     <div style={{ marginLeft: comment.parentCommentId ? '20px' : '0', border: '1px solid #ccc', padding: '10px', borderRadius: '5px', marginBottom: '10px' }}>
//       <p>{comment.text}</p>
//       <button onClick={() => setShowReplyInput(!showReplyInput)}>Reply</button>
//       {showReplyInput && (
//         <div>
//           <textarea
//             value={replyText}
//             onChange={(e) => setReplyText(e.target.value)}
//             placeholder="Write a reply..."
//           />
//           <button onClick={handleReply}>Post Reply</button>
//         </div>
//       )}
//       {comment.children && comment.children.length > 0 && (
//         <div style={{ paddingLeft: '20px' }}>
//           {comment.children.map(childComment => (
//             <Comment key={childComment.commentId} comment={childComment} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };
