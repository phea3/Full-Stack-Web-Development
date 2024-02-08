import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [listOfPosts, setListOfPosts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/posts").then((res) => {
      // console.log("respose", res?.data);
      setListOfPosts(res?.data);
    });
  }, []);

  return (
    <div className="App">
      {listOfPosts.map((data, key) => (
        <div key={key}>
          <h2>Title: {data?.title}</h2>
          <p>Main character: {data?.username}</p>
          <p>{data?.postText}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
