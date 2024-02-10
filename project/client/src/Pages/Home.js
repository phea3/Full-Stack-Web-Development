import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [listOfPosts, setListOfPosts] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3001/posts").then((res) => {
      // console.log("respose", res?.data);
      setListOfPosts(res?.data);
    });
  }, []);
  return (
    <div>
      {listOfPosts.map((data, key) => (
        <div
          key={key}
          className="post"
          onClick={() => {
            navigate(`/post/${data?.id}`);
          }}
        >
          <div className="title">Title: {data?.title}</div>
          <div className="body">{data?.postText}</div>
          <div className="footer">Main character: {data?.username}</div>
        </div>
      ))}
    </div>
  );
}

export default Home;
