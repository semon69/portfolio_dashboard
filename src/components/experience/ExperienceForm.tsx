import { useState } from "react";
import { FiSave } from "react-icons/fi";
import Button from "../ui/Button";
import Field, { inputClass } from "../ui/Field";
import { Card, PageHeader } from "../ui/Card";
import { experienceStart, isOngoing } from "../../utils/experience";
import type { ExperienceValues } from "./experienceFormValues";


type Props = {
  mode: "create" | "edit";
  value: ExperienceValues;
  onChange: (next: ExperienceValues) => void;
  onSubmit: () => void;
  saving: boolean;
};

const ExperienceForm = ({ mode, value, onChange, onSubmit, saving }: Props) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (key: keyof ExperienceValues, next: string) =>
    onChange({ ...value, [key]: next });

  // Ordering on the site is derived from this text, so warn early if it
  // can't be parsed rather than letting the role sort to the bottom.
  const parsed = experienceStart(value.timeSpan);
  const ongoing = isOngoing(value.timeSpan);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const next: Record<string, string> = {};
    if (!value.title.trim()) next.title = "A job title is required";
    if (!value.company.trim()) next.company = "A company name is required";
    if (!value.timeSpan.trim()) next.timeSpan = "A time span is required";
    if (!value.description.trim())
      next.description = "A description is required";
    setErrors(next);

    if (Object.keys(next).length === 0) onSubmit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <PageHeader
        title={mode === "create" ? "Add experience" : "Edit experience"}
        backTo="/manage-experience"
        backLabel="All experience"
        description="Roles are ordered automatically, with your current one first."
        actions={
          <Button type="submit" loading={saving}>
            <FiSave aria-hidden="true" />
            {mode === "create" ? "Add experience" : "Save changes"}
          </Button>
        }
      />

      <Card className="max-w-3xl space-y-5 p-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Job title" htmlFor="title" required error={errors.title}>
            <input
              id="title"
              className={inputClass}
              placeholder="Full Stack Developer"
              value={value.title}
              onChange={(e) => set("title", e.target.value)}
            />
          </Field>

          <Field
            label="Company"
            htmlFor="company"
            required
            error={errors.company}
          >
            <input
              id="company"
              className={inputClass}
              placeholder="Nebs IT Solutions LTD"
              value={value.company}
              onChange={(e) => set("company", e.target.value)}
            />
          </Field>
        </div>

        <Field
          label="Time span"
          htmlFor="timeSpan"
          required
          hint="Use a full month and year, e.g. “February 2026 – Present”."
          error={errors.timeSpan}
        >
          <input
            id="timeSpan"
            className={inputClass}
            placeholder="February 2026 – Present"
            value={value.timeSpan}
            onChange={(e) => set("timeSpan", e.target.value)}
          />

          {value.timeSpan.trim() && (
            <p
              className={`mt-2 text-xs ${
                parsed ? "text-muted" : "text-danger"
              }`}
            >
              {parsed
                ? `Starts ${new Date(parsed).toLocaleDateString(undefined, {
                    month: "long",
                    year: "numeric",
                  })}${ongoing ? " · marked as your current role" : ""}`
                : "Couldn't read a start date from this — the role will sort to the bottom of your timeline."}
            </p>
          )}
        </Field>

        <Field
          label="Description"
          htmlFor="description"
          required
          error={errors.description}
        >
          <textarea
            id="description"
            rows={8}
            className={`${inputClass} resize-y`}
            placeholder="What you owned, built and shipped in this role."
            value={value.description}
            onChange={(e) => set("description", e.target.value)}
          />
        </Field>
      </Card>
    </form>
  );
};

export default ExperienceForm;
