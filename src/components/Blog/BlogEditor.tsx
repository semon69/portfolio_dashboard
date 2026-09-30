import { useEffect, useMemo, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  FiAlertCircle,
  FiCheck,
  FiCode,
  FiEdit3,
  FiEye,
  FiImage,
  FiSave,
  FiTag,
  FiX,
} from "react-icons/fi";
import Button from "../ui/Button";
import Field, { inputClass } from "../ui/Field";
import { Card, PageHeader } from "../ui/Card";
import type { BlogFormValues } from "./blogFormValues";
import { isRelativeAsset, resolveAssetUrl } from "../../config/site";


// Only the formats the public site's .rich-text styles actually render.
const modules = {
  toolbar: [
    [{ header: [2, 3, false] }],
    ["bold", "italic", "underline", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image", "code-block"],
    ["clean"],
  ],
};

const stripHtml = (html: string) =>
  html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();

/**
 * Detects the usual mistake: pasting the host's viewer page rather than
 * the image file. imgbb serves pages from ibb.co and files from i.ibb.co,
 * so the bare host is the giveaway.
 */
const isViewerPage = (url: string) => {
  try {
    const { hostname } = new URL(url.trim());
    return /^(www\.)?(ibb\.co|imgur\.com|postimg\.cc|prnt\.sc)$/i.test(hostname);
  } catch {
    return false;
  }
};

type Props = {
  mode: "create" | "edit";
  value: BlogFormValues;
  onChange: (next: BlogFormValues) => void;
  onSubmit: () => void;
  saving: boolean;
};

const BlogEditor = ({ mode, value, onChange, onSubmit, saving }: Props) => {
  const [tagDraft, setTagDraft] = useState("");
  // "html" exposes the stored markup directly, which is how a draft
  // written elsewhere gets pasted in without Quill reformatting it.
  const [view, setView] = useState<"write" | "html" | "preview">("write");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [imageStatus, setImageStatus] = useState<"idle" | "ok" | "error">(
    "idle"
  );

  // A new URL hasn't been judged yet; clear the previous verdict.
  useEffect(() => setImageStatus("idle"), [value.image]);

  const set = <K extends keyof BlogFormValues>(
    key: K,
    next: BlogFormValues[K]
  ) => onChange({ ...value, [key]: next });

  const plain = useMemo(() => stripHtml(value.description), [value.description]);
  const words = plain ? plain.split(" ").length : 0;
  const readMinutes = Math.max(1, Math.round(words / 200));

  const addTag = () => {
    const tag = tagDraft.trim().replace(/,$/, "");
    if (!tag) return;
    if (value.tags.some((t) => t.toLowerCase() === tag.toLowerCase())) {
      setTagDraft("");
      return;
    }
    set("tags", [...value.tags, tag]);
    setTagDraft("");
  };

  const validate = () => {
    const next: Record<string, string> = {};
    if (!value.title.trim()) next.title = "A title is required";
    if (!value.image.trim()) next.image = "A cover image URL is required";
    if (!plain) next.description = "The post body can't be empty";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) onSubmit();
  };

  return (
    <div>
      <PageHeader
        title={mode === "create" ? "Write a post" : "Edit post"}
        description={
          mode === "create"
            ? "Drafts stay hidden on the public site until you publish them."
            : "Changes go live as soon as you save."
        }
        actions={
          <>
            <div
              role="tablist"
              aria-label="Editor view"
              className="flex rounded-lg border border-line p-1"
            >
              {(
                [
                  { key: "write", label: "Write", icon: FiEdit3 },
                  { key: "html", label: "HTML", icon: FiCode },
                  { key: "preview", label: "Preview", icon: FiEye },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  role="tab"
                  aria-selected={view === tab.key}
                  onClick={() => setView(tab.key)}
                  className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-colors ${
                    view === tab.key
                      ? "bg-accent-solid/15 text-accent"
                      : "text-muted hover:text-ink"
                  }`}
                >
                  <tab.icon aria-hidden="true" />
                  {tab.label}
                </button>
              ))}
            </div>
            <Button onClick={handleSubmit} loading={saving} type="button">
              <FiSave aria-hidden="true" />
              {mode === "create" ? "Publish" : "Save changes"}
            </Button>
          </>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_20rem] lg:items-start">
        {/* Main column */}
        <div className="space-y-5">
          <Card className="space-y-5 p-5">
            <Field
              label="Title"
              htmlFor="title"
              required
              error={errors.title}
            >
              <input
                id="title"
                type="text"
                placeholder="What is this post about?"
                className={`${inputClass} text-base font-medium`}
                value={value.title}
                onChange={(e) => set("title", e.target.value)}
              />
            </Field>

            <Field
              label="Excerpt"
              htmlFor="excerpt"
              hint={`Shown on post cards and link previews. ${value.excerpt.length}/200`}
            >
              <textarea
                id="excerpt"
                rows={2}
                maxLength={200}
                placeholder="One or two sentences summarising the post."
                className={`${inputClass} resize-y`}
                value={value.excerpt}
                onChange={(e) => set("excerpt", e.target.value)}
              />
            </Field>
          </Card>

          <Card className="p-5">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium text-ink">
                Body <span className="text-accent">*</span>
              </span>
              <span className="text-xs text-faint">
                {words} words · ~{readMinutes} min read
              </span>
            </div>

            {view === "preview" && (
              <div className="min-h-[22rem] rounded-lg border border-line bg-bg p-5">
                {plain ? (
                  <article
                    className="rich-text"
                    // Content is authored here by the site owner.
                    dangerouslySetInnerHTML={{ __html: value.description }}
                  />
                ) : (
                  <p className="text-sm text-faint">Nothing to preview yet.</p>
                )}
              </div>
            )}

            {view === "html" && (
              <>
                <textarea
                  aria-label="Post body as HTML"
                  spellCheck={false}
                  className={`${inputClass} min-h-[22rem] resize-y font-mono text-xs leading-relaxed`}
                  placeholder="<p>Paste or edit the post markup here…</p>"
                  value={value.description}
                  onChange={(e) => set("description", e.target.value)}
                />
                <p className="mt-2 text-xs text-faint">
                  Saved exactly as written. Switching back to Write hands it
                  to the editor, which may tidy up tags it doesn&rsquo;t
                  support.
                </p>
              </>
            )}

            {view === "write" && (
              <div className="editor">
                <ReactQuill
                  theme="snow"
                  modules={modules}
                  value={value.description}
                  onChange={(html) => set("description", html)}
                  placeholder="Write your post…"
                />
              </div>
            )}

            {errors.description && (
              <p role="alert" className="mt-2 text-xs text-danger">
                {errors.description}
              </p>
            )}
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          <Card className="p-5">
            <h2 className="mb-4 text-sm font-semibold text-ink">Visibility</h2>
            <label className="flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                checked={value.published}
                onChange={(e) => set("published", e.target.checked)}
                className="mt-0.5 h-4 w-4 shrink-0 accent-[rgb(var(--c-accent-solid))]"
              />
              <span>
                <span className="block text-sm font-medium text-ink">
                  Published
                </span>
                <span className="block text-xs text-muted">
                  {value.published
                    ? "Visible on the public site."
                    : "Saved as a draft, hidden from visitors."}
                </span>
              </span>
            </label>
          </Card>

          <Card className="p-5">
            <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold text-ink">
              <FiImage aria-hidden="true" />
              Cover image
            </h2>
            <Field
              label="Image"
              htmlFor="image"
              required
              hint="A path like /images/blog/cover.png, or a full URL for an image hosted elsewhere."
              error={errors.image}
            >
              {/* Deliberately type="text": type="url" rejects the
                  site-relative paths this field is meant to accept. */}
              <input
                id="image"
                type="text"
                placeholder="/images/blog/cover.png"
                className={inputClass}
                value={value.image}
                onChange={(e) => set("image", e.target.value)}
              />
            </Field>

            {value.image && (
              <div className="mt-3">
                <div
                  className={`overflow-hidden rounded-lg border bg-raised ${
                    imageStatus === "error" ? "border-danger/40" : "border-line"
                  }`}
                >
                  <img
                    // Keyed on the URL so switching links restarts the load
                    // rather than keeping the previous result.
                    key={resolveAssetUrl(value.image)}
                    src={resolveAssetUrl(value.image)}
                    alt="Cover preview"
                    className={`aspect-[16/10] w-full object-cover ${
                      imageStatus === "error" ? "hidden" : ""
                    }`}
                    onLoad={() => setImageStatus("ok")}
                    onError={() => setImageStatus("error")}
                  />

                  {imageStatus === "error" && (
                    <div className="grid aspect-[16/10] place-items-center px-4 text-center">
                      <FiAlertCircle
                        className="text-xl text-danger"
                        aria-hidden="true"
                      />
                    </div>
                  )}
                </div>

                {imageStatus === "ok" && (
                  <p className="mt-2 flex items-start gap-1.5 text-xs text-success">
                    <FiCheck className="mt-0.5 shrink-0" aria-hidden="true" />
                    <span>
                      Image loads correctly.
                      {isRelativeAsset(value.image) && (
                        <span className="text-muted">
                          {" "}
                          Stored as a relative path, so it follows the site to
                          any domain.
                        </span>
                      )}
                    </span>
                  </p>
                )}

                {imageStatus === "error" && (
                  <p role="alert" className="mt-2 text-xs text-danger">
                    {isViewerPage(value.image)
                      ? "That's the page the image sits on, not the image itself. On imgbb, open the upload and copy the “Direct link” — it starts with i. and ends in .jpg or .png."
                      : isRelativeAsset(value.image)
                        ? `Nothing found at ${resolveAssetUrl(value.image)}. Check the file exists in the site's public folder and has been deployed.`
                        : "This URL didn't load an image. Open it in a new tab: you should see only the picture, with no page around it."}
                  </p>
                )}
              </div>
            )}
          </Card>

          <Card className="p-5">
            <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold text-ink">
              <FiTag aria-hidden="true" />
              Tags
            </h2>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add a tag"
                className={inputClass}
                value={tagDraft}
                onChange={(e) => setTagDraft(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === ",") {
                    e.preventDefault();
                    addTag();
                  }
                }}
              />
              <Button type="button" variant="outline" onClick={addTag}>
                Add
              </Button>
            </div>

            {value.tags.length > 0 && (
              <ul className="mt-3 flex flex-wrap gap-2">
                {value.tags.map((tag) => (
                  <li key={tag}>
                    <span className="inline-flex items-center gap-1.5 rounded-md border border-line bg-raised px-2.5 py-1 text-xs text-muted">
                      {tag}
                      <button
                        type="button"
                        onClick={() =>
                          set(
                            "tags",
                            value.tags.filter((t) => t !== tag)
                          )
                        }
                        aria-label={`Remove tag ${tag}`}
                        className="text-faint transition-colors hover:text-danger"
                      >
                        <FiX />
                      </button>
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BlogEditor;
