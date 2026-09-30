import { useState } from "react";
import { FiSave } from "react-icons/fi";
import Button from "../ui/Button";
import Field, { inputClass } from "../ui/Field";
import { Card, PageHeader } from "../ui/Card";
import type { ProjectValues } from "./projectFormValues";
import { resolveAssetUrl } from "../../config/site";


type Props = {
  mode: "create" | "edit";
  value: ProjectValues;
  onChange: (next: ProjectValues) => void;
  onSubmit: () => void;
  saving: boolean;
};

const ProjectForm = ({ mode, value, onChange, onSubmit, saving }: Props) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (key: keyof ProjectValues, next: string) =>
    onChange({ ...value, [key]: next });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const next: Record<string, string> = {};
    if (!value.title.trim()) next.title = "A title is required";
    if (!value.image.trim()) next.image = "A cover image URL is required";
    if (!value.tech.trim()) next.tech = "List at least one technology";
    if (!value.description.trim()) next.description = "A description is required";
    setErrors(next);

    if (Object.keys(next).length === 0) onSubmit();
  };

  const tags = value.tech
    .split(/[,/|]/)
    .map((t) => t.trim())
    .filter(Boolean);

  return (
    <form onSubmit={handleSubmit}>
      <PageHeader
        title={mode === "create" ? "Add a project" : "Edit project"}
        description="Links are optional — leave them empty for closed-source or internal work."
        actions={
          <Button type="submit" loading={saving}>
            <FiSave aria-hidden="true" />
            {mode === "create" ? "Add project" : "Save changes"}
          </Button>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_20rem] lg:items-start">
        <div className="space-y-5">
          <Card className="space-y-5 p-5">
            <Field label="Title" htmlFor="title" required error={errors.title}>
              <input
                id="title"
                className={inputClass}
                placeholder="Project name"
                value={value.title}
                onChange={(e) => set("title", e.target.value)}
              />
            </Field>

            <Field
              label="Technology used"
              htmlFor="tech"
              required
              hint="Separate with commas. These become the stack chips on your site."
              error={errors.tech}
            >
              <input
                id="tech"
                className={inputClass}
                placeholder="React, Node.js, PostgreSQL"
                value={value.tech}
                onChange={(e) => set("tech", e.target.value)}
              />
              {tags.length > 0 && (
                <ul className="mt-2.5 flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-md border border-line bg-raised px-2.5 py-1 text-xs text-muted"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              )}
            </Field>

            <Field
              label="Description"
              htmlFor="description"
              required
              hint="The first line or two shows on the project card."
              error={errors.description}
            >
              <textarea
                id="description"
                rows={8}
                className={`${inputClass} resize-y`}
                placeholder="What the project does, and what you built."
                value={value.description}
                onChange={(e) => set("description", e.target.value)}
              />
            </Field>
          </Card>
        </div>

        <div className="space-y-5">
          <Card className="p-5">
            <h2 className="mb-4 text-sm font-semibold text-ink">Cover image</h2>
            <Field label="Image URL" htmlFor="image" required error={errors.image}>
              <input
                id="image"
                type="text"
                className={inputClass}
                placeholder="/images/projects/cover.png"
                value={value.image}
                onChange={(e) => set("image", e.target.value)}
              />
            </Field>
            {value.image && (
              <div className="mt-3 overflow-hidden rounded-lg border border-line bg-raised">
                <img
                  src={resolveAssetUrl(value.image)}
                  alt="Cover preview"
                  className="aspect-[16/10] w-full object-cover"
                />
              </div>
            )}
          </Card>

          <Card className="space-y-4 p-5">
            <h2 className="text-sm font-semibold text-ink">Links</h2>

            <Field label="Live site" htmlFor="live_link">
              <input
                id="live_link"
                type="url"
                className={inputClass}
                placeholder="https://…"
                value={value.live_link}
                onChange={(e) => set("live_link", e.target.value)}
              />
            </Field>

            <Field label="Frontend repo" htmlFor="g_frontend">
              <input
                id="g_frontend"
                type="url"
                className={inputClass}
                placeholder="https://github.com/…"
                value={value.g_frontend}
                onChange={(e) => set("g_frontend", e.target.value)}
              />
            </Field>

            <Field label="Backend repo" htmlFor="g_backend">
              <input
                id="g_backend"
                type="url"
                className={inputClass}
                placeholder="https://github.com/…"
                value={value.g_backend}
                onChange={(e) => set("g_backend", e.target.value)}
              />
            </Field>
          </Card>
        </div>
      </div>
    </form>
  );
};

export default ProjectForm;
