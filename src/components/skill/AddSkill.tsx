import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAddSkillMutation } from "../../redux/api/skillApi";
import { runMutation } from "../../utils/runMutation";
import SkillForm from "./SkillForm";
import { SkillValues, emptySkill } from "./skillFormValues";

const AddSkill = () => {
  const [values, setValues] = useState<SkillValues>(emptySkill);
  const [addSkill, { isLoading }] = useAddSkillMutation();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const ok = await runMutation(addSkill(values), { success: "Skill added" });
    if (ok) {
      setValues(emptySkill);
      navigate("/manage-skills");
    }
  };

  return (
    <SkillForm
      mode="create"
      value={values}
      onChange={setValues}
      onSubmit={handleSubmit}
      saving={isLoading}
    />
  );
};

export default AddSkill;
