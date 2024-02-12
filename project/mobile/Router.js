import { useRoutes } from "react-router-native";
import Home from "./screens/Home";
import NotFound from "./screens/NotFound";
import Post from "./screens/Post";

export default function Router() {
  const Content = useRoutes([
    { path: "/", element: <Home /> },
    { path: "/post", element: <Post /> },
    { path: "*", element: <NotFound /> },
  ]);

  return Content;
}
