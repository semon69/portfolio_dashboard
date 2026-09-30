/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Link } from "react-router-dom";
import { FiEdit2, FiPlus, FiTrash2 } from "react-icons/fi";
import {
  useDeleteExperienceMutation,
  useGetAllExperienceQuery,
} from "../../redux/api/experienceApi";
import { runMutation } from "../../utils/runMutation";
import { PageHeader } from "../ui/Card";
import Button from "../ui/Button";
import ConfirmDialog from "../ui/ConfirmDialog";
import { EmptyState, ErrorState, TableSkeleton } from "../ui/States";
import { sortExperience, isOngoing } from "../../utils/experience";

const ManageExperience = () => {
  const { data, isLoading, isError } = useGetAllExperienceQuery({});
  const [deleteExperience, { isLoading: deleting }] =
    useDeleteExperienceMutation();
  const [target, setTarget] = useState<any>(null);

  // Same ordering the public site uses, so what you see here matches.
  const roles = sortExperience(data?.data ?? []);

  const confirmDelete = async () => {
    const ok = await runMutation(deleteExperience(target._id), {
      success: "Experience deleted",
    });
    if (ok) setTarget(null);
  };

  return (
    <div>
      <PageHeader
        title="Experience"
        description="Your work history, current role first."
        actions={
          <Button to="/add-experience">
            <FiPlus aria-hidden="true" />
            Add experience
          </Button>
        }
      />

      {isLoading && <TableSkeleton rows={3} />}
      {!isLoading && isError && (
        <ErrorState message="Couldn't load experience." />
      )}

      {!isLoading && !isError && roles.length === 0 && (
        <EmptyState
          title="No experience yet"
          description="Add a role and it will appear on your public timeline."
          action={<Button to="/add-experience">Add experience</Button>}
        />
      )}

      {!isLoading && !isError && roles.length > 0 && (
        <ul className="space-y-px overflow-hidden rounded-xl border border-line bg-line">
          {roles.map((role: any) => (
            <li key={role._id} className="bg-surface px-4 py-4 sm:px-5">
              <div className="flex flex-wrap items-start gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-medium text-ink">{role.title}</p>
                    {isOngoing(role.timeSpan) && (
                      <span className="rounded-full border border-accent/40 bg-accent/10 px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wider text-accent">
                        Current
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-accent">{role.company}</p>
                  <p className="mt-1 font-mono text-xs text-faint">
                    {role.timeSpan}
                  </p>
                  {role.description && (
                    <p className="mt-3 line-clamp-2 text-sm text-muted">
                      {role.description}
                    </p>
                  )}
                </div>

                <div className="flex shrink-0 gap-2">
                  <Link
                    to={`/update-experience/${role._id}`}
                    aria-label={`Edit ${role.title}`}
                    className="grid h-9 w-9 place-items-center rounded-lg border border-line text-muted transition-colors hover:border-accent hover:text-accent"
                  >
                    <FiEdit2 />
                  </Link>
                  <button
                    type="button"
                    onClick={() => setTarget(role)}
                    aria-label={`Delete ${role.title}`}
                    className="grid h-9 w-9 place-items-center rounded-lg border border-line text-muted transition-colors hover:border-danger hover:text-danger"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      <ConfirmDialog
        open={Boolean(target)}
        title="Delete this role?"
        description={`“${target?.title}” at ${target?.company} will be removed. This can't be undone.`}
        loading={deleting}
        onConfirm={confirmDelete}
        onCancel={() => setTarget(null)}
      />
    </div>
  );
};

export default ManageExperience;
