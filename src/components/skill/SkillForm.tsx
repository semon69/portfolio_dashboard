import { useState } from "react";
import { FiSave } from "react-icons/fi";
import Button from "../ui/Button";
import Field, { inputClass } from "../ui/Field";
import { Card, PageHeader } from "../ui/Card";
import { SKILL_CATEGORIES } from "../../config/skillCategories";
import type { SkillValues } from "./skillFormValues";

type Props = {
  mode: "create" | "edit";
  value: SkillValues;
  onChange: (next: SkillValues) => void;
  onSubmit: () => void;
  saving: boolean;
};

const SkillForm = ({ mode, value, onChange, onSubmit, saving }: Props) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const next: Record<string, string> = {};
    if (!value.name.trim()) next.name = "A name is required";
    if (!value.category.trim()) next.category = "Pick a group";
    setErrors(next);

    if (Object.keys(next).length === 0) onSubmit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <PageHeader
        title={mode === "create" ? "Add a skill" : "Edit skill"}
        backTo="/manage-skills"
        backLabel="All skills"
        description="Skills show as text chips, grouped by category, on your public site."
        actions={
          <Button type="submit" loading={saving}>
            <FiSave aria-hidden="true" />
            {mode === "create" ? "Add skill" : "Save changes"}
          </Button>
        }
      />

      <Card className="max-w-xl space-y-5 p-5">
        <Field label="Name" htmlFor="name" required error={errors.name}>
          <input
            id="name"
            className={inputClass}
            placeholder="TypeScript"
            value={value.name}
            onChange={(e) => onChange({ ...value, name: e.target.value })}
          />
        </Field>

        <Field
          label="Group"
          htmlFor="category"
          required
          hint="Decides which block it appears under."
          error={errors.category}
        >
          <select
            id="category"
            className={inputClass}
            value={value.category}
            onChange={(e) => onChange({ ...value, category: e.target.value })}
          >
            {SKILL_CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </Field>

        <div>
          <p className="mb-2 text-sm font-medium text-ink">Preview</p>
          <div className="rounded-xl border border-line bg-surface p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
              {value.category}
            </p>
            <span className="mt-4 inline-block rounded-md border border-line bg-raised px-2.5 py-1 text-xs text-muted">
              {value.name || "Skill name"}
            </span>
          </div>
        </div>
      </Card>
    </form>
  );
};

export default SkillForm;
