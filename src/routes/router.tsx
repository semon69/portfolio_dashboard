import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import Dashboard from "../pages/Dashboard";
import NotFound from "../pages/NotFound";
import AddProject from "../components/project/AddProject";
import ManageProject from "../components/project/ManageProject";
import UpdateProject from "../components/project/UpdateProject";
import AddSkill from "../components/skill/AddSkill";
import ManageSkill from "../components/skill/ManageSkill";
import UpdateSkill from "../components/skill/UpdateSkill";
import AddExperience from "../components/experience/AddExperience";
import ManageExperience from "../components/experience/ManageExperience";
import UpdateExperience from "../components/experience/UpdateExperience";
import ManageBlog from "../components/Blog/ManageBlog";
import WriteBlogs from "../components/Blog/WriteBlogs";
import UpdateBlog from "../components/Blog/UpdateBlog";
import { endpoints } from "../config/api";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Dashboard /> },

      { path: "add-project", element: <AddProject /> },
      { path: "manage-projects", element: <ManageProject /> },
      {
        path: "update-project/:id",
        element: <UpdateProject />,
        errorElement: <NotFound />,
        loader: ({ params }) => fetch(endpoints.project(params.id!)),
      },

      { path: "add-skill", element: <AddSkill /> },
      { path: "manage-skills", element: <ManageSkill /> },
      {
        path: "update-skill/:id",
        element: <UpdateSkill />,
        errorElement: <NotFound />,
        loader: ({ params }) => fetch(endpoints.skill(params.id!)),
      },

      { path: "add-experience", element: <AddExperience /> },
      { path: "manage-experience", element: <ManageExperience /> },
      {
        path: "update-experience/:id",
        element: <UpdateExperience />,
        errorElement: <NotFound />,
        loader: ({ params }) => fetch(endpoints.experience(params.id!)),
      },

      { path: "write-blog", element: <WriteBlogs /> },
      { path: "manage-blogs", element: <ManageBlog /> },
      {
        path: "update-blog/:id",
        element: <UpdateBlog />,
        errorElement: <NotFound />,
        loader: ({ params }) => fetch(endpoints.blog(params.id!)),
      },

      { path: "*", element: <NotFound /> },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/forgot-password", element: <ForgotPassword /> },
  { path: "/reset-password", element: <ResetPassword /> },
]);
