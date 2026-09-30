/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useUpdateProjectMutation } from "../../redux/api/projectApi";
import { runMutation } from "../../utils/runMutation";
import ProjectForm from "./ProjectForm";
import { ProjectValues, emptyProject } from "./projectFormValues";

const UpdateProject = () => {
  const loaded: any = useLoaderData();
  const navigate = useNavigate();
  const [updateProject, { isLoading }] = useUpdateProjectMutation();
  const [values, setValues] = useState<ProjectValues>(emptyProject);

  useEffect(() => {
    const project = loaded?.data;
    if (!project) return;

    setValues({
      title: project.title ?? "",
      image: project.image ?? "",
      tech: project.tech ?? "",
      description: project.description ?? "",
      g_frontend: project.g_frontend ?? "",
      g_backend: project.g_backend ?? "",
      live_link: project.live_link ?? "",
    });
  }, [loaded]);

  const handleSubmit = async () => {
    const ok = await runMutation(
      updateProject({ id: loaded?.data?._id, data: values }),
      { success: "Project updated" }
    );
    if (ok) navigate("/manage-projects");
  };

  return (
    <ProjectForm
      mode="edit"
      value={values}
      onChange={setValues}
      onSubmit={handleSubmit}
      saving={isLoading}
    />
  );
};

export default UpdateProject;
