import { useState } from "react";
import { FiSave } from "react-icons/fi";
import Button from "../ui/Button";
import Field, { inputClass } from "../ui/Field";
import { Card, PageHeader } from "../ui/Card";
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
    if (!value.image.trim()) next.image = "An icon URL is required";
    setErrors(next);

    if (Object.keys(next).length === 0) onSubmit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <PageHeader
        title={mode === "create" ? "Add a skill" : "Edit skill"}
        description="Skills appear as a grid of icons on your public site."
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
          label="Icon URL"
          htmlFor="image"
          required
          hint="A square, transparent PNG or SVG works best."
          error={errors.image}
        >
          <input
            id="image"
            type="url"
            className={inputClass}
            placeholder="https://i.ibb.co/…"
            value={value.image}
            onChange={(e) => onChange({ ...value, image: e.target.value })}
          />
        </Field>

        {value.image && (
          <div>
            <p className="mb-2 text-sm font-medium text-ink">Preview</p>
            <div className="flex w-fit flex-col items-center gap-3 rounded-xl border border-line bg-surface px-6 py-5">
              <img
                src={value.image}
                alt=""
                className="h-12 w-12 object-contain"
              />
              <span className="text-sm text-muted">
                {value.name || "Skill name"}
              </span>
            </div>
          </div>
        )}
      </Card>
    </form>
  );
};

export default SkillForm;
