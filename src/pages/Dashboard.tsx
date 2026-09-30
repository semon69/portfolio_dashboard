/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
import {
  FiArrowUpRight,
  FiBookOpen,
  FiBriefcase,
  FiCpu,
  FiEdit3,
  FiFolder,
  FiPlus,
} from "react-icons/fi";
import { useGetAllProjectsQuery } from "../redux/api/projectApi";
import { useGetAllSkillsQuery } from "../redux/api/skillApi";
import { useGetAllExperienceQuery } from "../redux/api/experienceApi";
import { useGetAllBlogsQuery } from "../redux/api/blogApi";
import { PageHeader } from "../components/ui/Card";
import { Skeleton } from "../components/ui/States";
import Button from "../components/ui/Button";

const StatCard = ({
  label,
  count,
  loading,
  to,
  icon: Icon,
}: {
  label: string;
  count?: number;
  loading: boolean;
  to: string;
  icon: any;
}) => (
  <Link
    to={to}
    className="group rounded-xl border border-line bg-surface p-5 transition-all hover:-translate-y-0.5 hover:border-accent/40"
  >
    <div className="flex items-start justify-between">
      <span className="grid h-10 w-10 place-items-center rounded-lg border border-line bg-raised text-accent">
        <Icon aria-hidden="true" />
      </span>
      <FiArrowUpRight
        aria-hidden="true"
        className="text-faint transition-colors group-hover:text-accent"
      />
    </div>
    {loading ? (
      <Skeleton className="mt-5 h-8 w-12" />
    ) : (
      <p className="mt-4 font-display text-3xl font-semibold">{count ?? 0}</p>
    )}
    <p className="mt-1 text-sm text-muted">{label}</p>
  </Link>
);

const Dashboard = () => {
  const projects = useGetAllProjectsQuery({});
  const skills = useGetAllSkillsQuery({});
  const experience = useGetAllExperienceQuery({});
  const blogs = useGetAllBlogsQuery({});

  const recentPosts = (blogs.data?.data ?? []).slice(0, 5);

  const stats = [
    {
      label: "Projects",
      count: projects.data?.data?.length,
      loading: projects.isLoading,
      to: "/manage-projects",
      icon: FiFolder,
    },
    {
      label: "Skills",
      count: skills.data?.data?.length,
      loading: skills.isLoading,
      to: "/manage-skills",
      icon: FiCpu,
    },
    {
      label: "Experience",
      count: experience.data?.data?.length,
      loading: experience.isLoading,
      to: "/manage-experience",
      icon: FiBriefcase,
    },
    {
      label: "Blog posts",
      count: blogs.data?.data?.length,
      loading: blogs.isLoading,
      to: "/manage-blogs",
      icon: FiBookOpen,
    },
  ];

  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="Everything on your portfolio, at a glance."
        actions={
          <>
            <Button to="/add-project" variant="outline">
              <FiPlus aria-hidden="true" />
              New project
            </Button>
            <Button to="/write-blog">
              <FiEdit3 aria-hidden="true" />
              Write post
            </Button>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      <section className="mt-10">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Recent posts</h2>
          <Link
            to="/manage-blogs"
            className="text-sm text-muted transition-colors hover:text-accent"
          >
            View all
          </Link>
        </div>

        <div className="overflow-hidden rounded-xl border border-line">
          {blogs.isLoading && (
            <div className="space-y-px bg-line">
              {[0, 1, 2].map((i) => (
                <div key={i} className="bg-surface px-5 py-4">
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          )}

          {!blogs.isLoading && recentPosts.length === 0 && (
            <p className="bg-surface px-5 py-10 text-center text-sm text-muted">
              No posts yet.{" "}
              <Link to="/write-blog" className="text-accent hover:underline">
                Write your first one
              </Link>
              .
            </p>
          )}

          {!blogs.isLoading && recentPosts.length > 0 && (
            <ul className="divide-y divide-line">
              {recentPosts.map((post: any) => (
                <li key={post._id} className="bg-surface">
                  <Link
                    to={`/update-blog/${post._id}`}
                    className="flex items-center gap-4 px-5 py-4 transition-colors hover:bg-raised"
                  >
                    {post.image && (
                      <img
                        src={post.image}
                        alt=""
                        loading="lazy"
                        className="h-10 w-14 shrink-0 rounded-md border border-line object-cover"
                      />
                    )}
                    <span className="min-w-0 flex-1 truncate text-sm font-medium text-ink">
                      {post.title}
                    </span>
                    {post.published === false && (
                      <span className="shrink-0 rounded-full border border-line bg-raised px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wider text-faint">
                        Draft
                      </span>
                    )}
                    <FiArrowUpRight
                      aria-hidden="true"
                      className="shrink-0 text-faint"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
