import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import AddProject from "../components/project/AddProject";
import AddSkill from "../components/skill/AddSkill";
import AddExperience from "../components/experience/AddExperience";
import ManageExperience from "../components/experience/ManageExperience";
import ManageSkill from "../components/skill/ManageSkill";
import ManageProject from "../components/project/ManageProject";
import ManageBlog from "../components/Blog/ManageBlog";
import WriteBlogs from "../components/Blog/WriteBlogs";
import Dashboard from "../pages/Dashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/add-project",
        element: <AddProject />,
      },
      {
        path: "/manage-projects",
        element: <ManageProject />,
      },
      {
        path: "/add-skill",
        element: <AddSkill />,
      },
      {
        path: "/manage-skills",
        element: <ManageSkill />,
      },
      {
        path: "/add-experience",
        element: <AddExperience />,
      },
      {
        path: "/manage-experience",
        element: <ManageExperience />,
      },
      {
        path: "/write-blog",
        element: <WriteBlogs />,
      },
      {
        path: "/manage-blogs",
        element: <ManageBlog />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
