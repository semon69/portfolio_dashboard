import { DEFAULT_CATEGORY } from "../../config/skillCategories";

export type SkillValues = {
  name: string;
  category: string;
};

export const emptySkill: SkillValues = {
  name: "",
  category: DEFAULT_CATEGORY,
};
