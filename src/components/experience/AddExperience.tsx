import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAddExperienceMutation } from "../../redux/api/experienceApi";
import { runMutation } from "../../utils/runMutation";
import ExperienceForm from "./ExperienceForm";
import {
  ExperienceValues,
  emptyExperience,
} from "./experienceFormValues";

const AddExperience = () => {
  const [values, setValues] = useState<ExperienceValues>(emptyExperience);
  const [addExperience, { isLoading }] = useAddExperienceMutation();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const ok = await runMutation(addExperience(values), {
      success: "Experience added",
    });
    if (ok) {
      setValues(emptyExperience);
      navigate("/manage-experience");
    }
  };

  return (
    <ExperienceForm
      mode="create"
      value={values}
      onChange={setValues}
      onSubmit={handleSubmit}
      saving={isLoading}
    />
  );
};

export default AddExperience;
