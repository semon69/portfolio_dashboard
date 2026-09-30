/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useUpdateExperienceMutation } from "../../redux/api/experienceApi";
import { runMutation } from "../../utils/runMutation";
import ExperienceForm from "./ExperienceForm";
import {
  ExperienceValues,
  emptyExperience,
} from "./experienceFormValues";

const UpdateExperience = () => {
  const loaded: any = useLoaderData();
  const navigate = useNavigate();
  const [updateExperience, { isLoading }] = useUpdateExperienceMutation();
  const [values, setValues] = useState<ExperienceValues>(emptyExperience);

  useEffect(() => {
    const role = loaded?.data;
    if (!role) return;

    setValues({
      title: role.title ?? "",
      company: role.company ?? "",
      timeSpan: role.timeSpan ?? "",
      description: role.description ?? "",
    });
  }, [loaded]);

  const handleSubmit = async () => {
    const ok = await runMutation(
      updateExperience({ id: loaded?.data?._id, data: values }),
      { success: "Experience updated" }
    );
    if (ok) navigate("/manage-experience");
  };

  return (
    <ExperienceForm
      mode="edit"
      value={values}
      onChange={setValues}
      onSubmit={handleSubmit}
      saving={isLoading}
    />
  );
};

export default UpdateExperience;
