import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAddProjectMutation } from "../../redux/api/projectApi";
import { runMutation } from "../../utils/runMutation";
import ProjectForm from "./ProjectForm";
import { ProjectValues, emptyProject } from "./projectFormValues";

const AddProject = () => {
  const [values, setValues] = useState<ProjectValues>(emptyProject);
  const [addProject, { isLoading }] = useAddProjectMutation();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const ok = await runMutation(addProject(values), {
      success: "Project added",
    });
    if (ok) {
      setValues(emptyProject);
      navigate("/manage-projects");
    }
  };

  return (
    <ProjectForm
      mode="create"
      value={values}
      onChange={setValues}
      onSubmit={handleSubmit}
      saving={isLoading}
    />
  );
};

export default AddProject;
