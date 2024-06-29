import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import AddProject from "../components/project/AddProject";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/add-project",
        element: <AddProject />
      },
     
    ],
  },
  {
    path: "/login",
    element: <Login />,
  }
]);
