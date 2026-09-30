/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, useState } from "react";
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
import { DEFAULT_CATEGORY, categoryRank } from "../../config/skillCategories";

const ManageSkill = () => {
  const { data, isLoading, isError } = useGetAllSkillsQuery({});
  const [deleteSkill, { isLoading: deleting }] = useDeleteSkillMutation();
  const [query, setQuery] = useState("");
  const [target, setTarget] = useState<any>(null);

  const skills = useMemo(() => data?.data ?? [], [data]);

  const filtered = useMemo(
    () =>
      skills.filter((skill: any) =>
        `${skill.name} ${skill.category ?? ""}`
          .toLowerCase()
          .includes(query.trim().toLowerCase())
      ),
    [skills, query]
  );

  // Group, then order groups the same way the public site does.
  const groups = useMemo(() => {
    const byCategory = new Map<string, any[]>();

    filtered.forEach((skill: any) => {
      const category = skill.category?.trim() || DEFAULT_CATEGORY;
      if (!byCategory.has(category)) byCategory.set(category, []);
      byCategory.get(category)!.push(skill);
    });

    return [...byCategory.entries()].sort(
      ([a], [b]) => categoryRank(a) - categoryRank(b) || a.localeCompare(b)
    );
  }, [filtered]);

  const confirmDelete = async () => {
    const ok = await runMutation(deleteSkill(target._id), {
      success: "Skill deleted",
    });
    if (ok) setTarget(null);
  };

  const uncategorised = skills.filter((s: any) => !s.category?.trim()).length;

  return (
    <div>
      <PageHeader
        title="Skills"
        description="Grouped exactly as they appear on your public site."
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
          {uncategorised > 0 && (
            <p className="mb-4 rounded-lg border border-accent/30 bg-accent/5 px-4 py-3 text-sm text-muted">
              <strong className="font-medium text-ink">
                {uncategorised} skill{uncategorised === 1 ? "" : "s"}
              </strong>{" "}
              have no group yet and show under “Other” on your site. Edit each one
              to file it properly.
            </p>
          )}

          <div className="relative mb-5 max-w-sm">
            <FiSearch
              aria-hidden="true"
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-faint"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search skills or groups"
              aria-label="Search skills"
              className={`${inputClass} pl-10`}
            />
          </div>

          {groups.length === 0 ? (
            <EmptyState
              title="No matches"
              description={`Nothing matched “${query}”.`}
            />
          ) : (
            <div className="grid gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-2 xl:grid-cols-3">
              {groups.map(([category, items]) => (
                <section key={category} className="bg-surface p-5">
                  <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
                    {category}
                  </h2>

                  <ul className="mt-4 flex flex-wrap gap-2">
                    {items.map((skill: any) => (
                      <li key={skill._id}>
                        <span className="group inline-flex items-center gap-1 rounded-md border border-line bg-raised py-1 pl-2.5 pr-1 text-xs text-muted">
                          {skill.name}

                          <Link
                            to={`/update-skill/${skill._id}`}
                            aria-label={`Edit ${skill.name}`}
                            className="grid h-5 w-5 place-items-center rounded text-faint transition-colors hover:text-accent"
                          >
                            <FiEdit2 className="text-[0.7rem]" />
                          </Link>

                          <button
                            type="button"
                            onClick={() => setTarget(skill)}
                            aria-label={`Delete ${skill.name}`}
                            className="grid h-5 w-5 place-items-center rounded text-faint transition-colors hover:text-danger"
                          >
                            <FiTrash2 className="text-[0.7rem]" />
                          </button>
                        </span>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
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
