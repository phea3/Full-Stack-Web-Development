import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Post() {
  let { id } = useParams();
  const [postObject, setPostObject] = useState({});
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3001/posts/byId/${id}`).then((res) => {
      setPostObject(res?.data);
    });
    axios.get(`http://localhost:3001/comments/${id}`).then((res) => {
      setComments(res?.data);
    });
  }, [id]);

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
          <input type="text" placeholder="Comment..." autoComplete="off" />
          <button> Add Comment</button>
        </div>
        <div className="listOfComments">
          {comments.map((comment, key) => {
            return <div className="comment">{comment}</div>;
          })}
        </div>
      </div>
    </div>
  );
}

export default Post;
