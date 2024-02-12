import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Post() {
  let { id } = useParams();
  const [postObject, setPostObject] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    axios.get(`http://192.168.2.7:3001/posts/byId/${id}`).then((res) => {
      setPostObject(res?.data);
    });
    axios.get(`http://192.168.2.7:3001/comments/${id}`).then((res) => {
      setComments(res?.data);
    });
  }, [id]);

  const addComment = () => {
    axios
      .post("http://192.168.2.7:3001/comments", {
        commentBody: newComment,
        PostId: id,
      })
      .then((res) => {
        const commentToAdd = { commentBody: newComment };
        setComments([...comments, commentToAdd]);
        setNewComment("");
      });
  };

  return (
    <div className="postPage">
      <div className="leftSide">
        <div className="post" id="individual">
          <div className="title">{postObject?.title}</div>
          <div className="body">{postObject?.postText}</div>
          <div className="footer">{postObject?.username}</div>
        </div>
      </div>
      <div className="rightSide">
        <div className="addCommentContainer">
          <input
            type="text"
            placeholder="Comment..."
            autoComplete="off"
            value={newComment}
            onChange={(e) => {
              setNewComment(e?.target?.value);
            }}
          />
          <button onClick={addComment}> Add Comment</button>
        </div>
        <div className="listOfComments">
          {comments.map((comment, key) => {
            return (
              <div className="comment" key={key}>
                {comment.commentBody}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Post;
