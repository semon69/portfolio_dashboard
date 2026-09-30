/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FiEdit2,
  FiExternalLink,
  FiGithub,
  FiPlus,
  FiSearch,
  FiTrash2,
} from "react-icons/fi";
import {
  useDeleteProjectMutation,
  useGetAllProjectsQuery,
} from "../../redux/api/projectApi";
import { runMutation } from "../../utils/runMutation";
import { PageHeader } from "../ui/Card";
import Button from "../ui/Button";
import ConfirmDialog from "../ui/ConfirmDialog";
import { EmptyState, ErrorState, TableSkeleton } from "../ui/States";
import { inputClass } from "../ui/Field";

const ManageProject = () => {
  const { data, isLoading, isError } = useGetAllProjectsQuery({});
  const [deleteProject, { isLoading: deleting }] = useDeleteProjectMutation();
  const [query, setQuery] = useState("");
  const [target, setTarget] = useState<any>(null);

  const projects = data?.data ?? [];
  const filtered = projects.filter((project: any) =>
    `${project.title} ${project.tech}`
      .toLowerCase()
      .includes(query.trim().toLowerCase())
  );

  const confirmDelete = async () => {
    const ok = await runMutation(deleteProject(target._id), {
      success: "Project deleted",
    });
    if (ok) setTarget(null);
  };

  return (
    <div>
      <PageHeader
        title="Projects"
        description="The work shown on your portfolio."
        actions={
          <Button to="/add-project">
            <FiPlus aria-hidden="true" />
            Add project
          </Button>
        }
      />

      {isLoading && <TableSkeleton rows={4} />}
      {!isLoading && isError && <ErrorState message="Couldn't load projects." />}

      {!isLoading && !isError && projects.length === 0 && (
        <EmptyState
          title="No projects yet"
          description="Add your first project and it will appear on the public site."
          action={<Button to="/add-project">Add a project</Button>}
        />
      )}

      {!isLoading && !isError && projects.length > 0 && (
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
              placeholder="Search by title or stack"
              aria-label="Search projects"
              className={`${inputClass} pl-10`}
            />
          </div>

          {filtered.length === 0 ? (
            <EmptyState title="No matches" description={`Nothing matched “${query}”.`} />
          ) : (
            <ul className="space-y-px overflow-hidden rounded-xl border border-line bg-line">
              {filtered.map((project: any) => (
                <li
                  key={project._id}
                  className="flex flex-wrap items-center gap-4 bg-surface px-4 py-4 sm:px-5"
                >
                  {project.image && (
                    <img
                      src={project.image}
                      alt=""
                      loading="lazy"
                      className="h-12 w-16 shrink-0 rounded-md border border-line object-cover"
                    />
                  )}

                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium text-ink">
                      {project.title}
                    </p>
                    <p className="mt-1 truncate text-xs text-faint">
                      {project.tech || "No stack listed"}
                    </p>
                  </div>

                  <div className="flex shrink-0 items-center gap-1.5 text-faint">
                    {project.live_link && (
                      <a
                        href={project.live_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Open ${project.title} live site`}
                        className="grid h-9 w-9 place-items-center rounded-lg transition-colors hover:text-accent"
                      >
                        <FiExternalLink />
                      </a>
                    )}
                    {project.g_frontend && (
                      <a
                        href={project.g_frontend}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Open ${project.title} repository`}
                        className="grid h-9 w-9 place-items-center rounded-lg transition-colors hover:text-accent"
                      >
                        <FiGithub />
                      </a>
                    )}
                  </div>

                  <div className="flex shrink-0 gap-2">
                    <Link
                      to={`/update-project/${project._id}`}
                      aria-label={`Edit ${project.title}`}
                      className="grid h-9 w-9 place-items-center rounded-lg border border-line text-muted transition-colors hover:border-accent hover:text-accent"
                    >
                      <FiEdit2 />
                    </Link>
                    <button
                      type="button"
                      onClick={() => setTarget(project)}
                      aria-label={`Delete ${project.title}`}
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
        title="Delete this project?"
        description={`“${target?.title}” will be removed from your site permanently. This can't be undone.`}
        loading={deleting}
        onConfirm={confirmDelete}
        onCancel={() => setTarget(null)}
      />
    </div>
  );
};

export default ManageProject;
