/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Link } from "react-router-dom";
import { FiEdit2, FiPlus, FiSearch, FiTrash2 } from "react-icons/fi";
import {
  useDeleteBlogMutation,
  useGetAllBlogsQuery,
} from "../../redux/api/blogApi";
import { runMutation } from "../../utils/runMutation";
import { PageHeader } from "../ui/Card";
import Button from "../ui/Button";
import ConfirmDialog from "../ui/ConfirmDialog";
import { EmptyState, ErrorState, TableSkeleton } from "../ui/States";
import { inputClass } from "../ui/Field";

const formatDate = (value?: string) => {
  if (!value) return "—";
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? "—"
    : date.toLocaleDateString(undefined, {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
};

const ManageBlog = () => {
  const { data, isLoading, isError } = useGetAllBlogsQuery({});
  const [deleteBlog, { isLoading: deleting }] = useDeleteBlogMutation();
  const [query, setQuery] = useState("");
  const [target, setTarget] = useState<any>(null);

  const posts = data?.data ?? [];
  const filtered = posts.filter((post: any) =>
    `${post.title} ${(post.tags ?? []).join(" ")}`
      .toLowerCase()
      .includes(query.trim().toLowerCase())
  );

  const confirmDelete = async () => {
    const ok = await runMutation(deleteBlog(target._id), {
      success: "Post deleted",
    });
    if (ok) setTarget(null);
  };

  return (
    <div>
      <PageHeader
        title="Blog posts"
        description="Everything you've written, newest first."
        actions={
          <Button to="/write-blog">
            <FiPlus aria-hidden="true" />
            Write post
          </Button>
        }
      />

      {isLoading && <TableSkeleton rows={4} />}
      {!isLoading && isError && <ErrorState message="Couldn't load posts." />}

      {!isLoading && !isError && posts.length === 0 && (
        <EmptyState
          title="No posts yet"
          description="Write your first post and it will appear on the public site."
          action={<Button to="/write-blog">Write a post</Button>}
        />
      )}

      {!isLoading && !isError && posts.length > 0 && (
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
              placeholder="Search by title or tag"
              aria-label="Search posts"
              className={`${inputClass} pl-10`}
            />
          </div>

          {filtered.length === 0 ? (
            <EmptyState
              title="No matches"
              description={`Nothing matched “${query}”.`}
            />
          ) : (
            <ul className="space-y-px overflow-hidden rounded-xl border border-line bg-line">
              {filtered.map((post: any) => (
                <li
                  key={post._id}
                  className="flex flex-wrap items-center gap-4 bg-surface px-4 py-4 sm:px-5"
                >
                  {post.image && (
                    <img
                      src={post.image}
                      alt=""
                      loading="lazy"
                      className="h-12 w-16 shrink-0 rounded-md border border-line object-cover"
                    />
                  )}

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="truncate font-medium text-ink">
                        {post.title}
                      </p>
                      {post.published === false && (
                        <span className="rounded-full border border-line bg-raised px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wider text-faint">
                          Draft
                        </span>
                      )}
                    </div>

                    <p className="mt-1 text-xs text-faint">
                      {formatDate(post.createdAt)}
                      {post.tags?.length > 0 && ` · ${post.tags.join(", ")}`}
                    </p>
                  </div>

                  <div className="flex shrink-0 gap-2">
                    <Link
                      to={`/update-blog/${post._id}`}
                      aria-label={`Edit ${post.title}`}
                      className="grid h-9 w-9 place-items-center rounded-lg border border-line text-muted transition-colors hover:border-accent hover:text-accent"
                    >
                      <FiEdit2 />
                    </Link>
                    <button
                      type="button"
                      onClick={() => setTarget(post)}
                      aria-label={`Delete ${post.title}`}
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
        title="Delete this post?"
        description={`“${target?.title}” will be removed from your site permanently. This can't be undone.`}
        loading={deleting}
        onConfirm={confirmDelete}
        onCancel={() => setTarget(null)}
      />
    </div>
  );
};

export default ManageBlog;
