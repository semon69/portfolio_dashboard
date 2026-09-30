/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useUpdateSkillMutation } from "../../redux/api/skillApi";
import { runMutation } from "../../utils/runMutation";
import SkillForm from "./SkillForm";
import { SkillValues, emptySkill } from "./skillFormValues";

const UpdateSkill = () => {
  const loaded: any = useLoaderData();
  const navigate = useNavigate();
  const [updateSkill, { isLoading }] = useUpdateSkillMutation();
  const [values, setValues] = useState<SkillValues>(emptySkill);

  useEffect(() => {
    const skill = loaded?.data;
    if (!skill) return;
    setValues({ name: skill.name ?? "", image: skill.image ?? "" });
  }, [loaded]);

  const handleSubmit = async () => {
    const ok = await runMutation(
      updateSkill({ id: loaded?.data?._id, data: values }),
      { success: "Skill updated" }
    );
    if (ok) navigate("/manage-skills");
  };

  return (
    <SkillForm
      mode="edit"
      value={values}
      onChange={setValues}
      onSubmit={handleSubmit}
      saving={isLoading}
    />
  );
};

export default UpdateSkill;
