/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Link } from "react-router-dom";
import { FiEdit2, FiPlus, FiSearch, FiTrash2 } from "react-icons/fi";
import {
  useDeleteSkillMutation,
  useGetAllSkillsQuery,
} from "../../redux/api/skillApi";
import { runMutation } from "../../utils/runMutation";
import { PageHeader } from "../ui/Card";
import Button from "../ui/Button";
import ConfirmDialog from "../ui/ConfirmDialog";
import { EmptyState, ErrorState, TableSkeleton } from "../ui/States";
import { inputClass } from "../ui/Field";

const ManageSkill = () => {
  const { data, isLoading, isError } = useGetAllSkillsQuery({});
  const [deleteSkill, { isLoading: deleting }] = useDeleteSkillMutation();
  const [query, setQuery] = useState("");
  const [target, setTarget] = useState<any>(null);

  const skills = data?.data ?? [];
  const filtered = skills.filter((skill: any) =>
    (skill.name ?? "").toLowerCase().includes(query.trim().toLowerCase())
  );

  const confirmDelete = async () => {
    const ok = await runMutation(deleteSkill(target._id), {
      success: "Skill deleted",
    });
    if (ok) setTarget(null);
  };

  return (
    <div>
      <PageHeader
        title="Skills"
        description="The technology grid shown on your public site."
        actions={
          <Button to="/add-skill">
            <FiPlus aria-hidden="true" />
            Add skill
          </Button>
        }
      />

      {isLoading && <TableSkeleton rows={5} />}
      {!isLoading && isError && <ErrorState message="Couldn't load skills." />}

      {!isLoading && !isError && skills.length === 0 && (
        <EmptyState
          title="No skills yet"
          description="Add the tools you work with and they'll appear on your site."
          action={<Button to="/add-skill">Add a skill</Button>}
        />
      )}

      {!isLoading && !isError && skills.length > 0 && (
        <>
          <div className="relative mb-4 max-w-sm">
            <FiSearch
              aria-hidden="true"
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-faint"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search skills"
              aria-label="Search skills"
              className={`${inputClass} pl-10`}
            />
          </div>

          {filtered.length === 0 ? (
            <EmptyState title="No matches" description={`Nothing matched “${query}”.`} />
          ) : (
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((skill: any) => (
                <li
                  key={skill._id}
                  className="flex items-center gap-4 rounded-xl border border-line bg-surface p-4"
                >
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-lg border border-line bg-raised">
                    <img
                      src={skill.image}
                      alt=""
                      loading="lazy"
                      className="h-7 w-7 object-contain"
                    />
                  </span>

                  <p className="min-w-0 flex-1 truncate font-medium text-ink">
                    {skill.name}
                  </p>

                  <div className="flex shrink-0 gap-2">
                    <Link
                      to={`/update-skill/${skill._id}`}
                      aria-label={`Edit ${skill.name}`}
                      className="grid h-9 w-9 place-items-center rounded-lg border border-line text-muted transition-colors hover:border-accent hover:text-accent"
                    >
                      <FiEdit2 />
                    </Link>
                    <button
                      type="button"
                      onClick={() => setTarget(skill)}
                      aria-label={`Delete ${skill.name}`}
                      className="grid h-9 w-9 place-items-center rounded-lg border border-line text-muted transition-colors hover:border-danger hover:text-danger"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </>
      )}

      <ConfirmDialog
        open={Boolean(target)}
        title="Delete this skill?"
        description={`“${target?.name}” will be removed from your site. This can't be undone.`}
        loading={deleting}
        onConfirm={confirmDelete}
        onCancel={() => setTarget(null)}
      />
    </div>
  );
};

export default ManageSkill;
