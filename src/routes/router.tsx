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
import UpdateSkill from "../components/skill/UpdateSkill";
import UpdateExperience from "../components/experience/UpdateExperience";
import UpdateProject from "../components/project/UpdateProject";
import UpdateBlog from "../components/Blog/UpdateBlog";

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
        path: "/update-project/:id",
        element: <UpdateProject />,
        loader: ({ params }) =>
          fetch(
            `https://portfolio-server-cyan.vercel.app/api/v1/project/${params.id}`
          ),
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
        path: "/update-skill/:id",
        element: <UpdateSkill />,
        loader: ({ params }) =>
          fetch(
            `https://portfolio-server-cyan.vercel.app/api/v1/skill/${params.id}`
          ),
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
        path: "/update-experience/:id",
        element: <UpdateExperience />,
        loader: ({ params }) =>
          fetch(
            `https://portfolio-server-cyan.vercel.app/api/v1/experience/${params.id}`
          ),
      },
      {
        path: "/write-blog",
        element: <WriteBlogs />,
      },
      {
        path: "/manage-blogs",
        element: <ManageBlog />,
      },
      {
        path: "/update-blog/:id",
        element: <UpdateBlog />,
        loader: ({ params }) =>
          fetch(
            `https://portfolio-server-cyan.vercel.app/api/v1/blog/${params.id}`
          ),
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
