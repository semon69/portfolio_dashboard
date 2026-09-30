// Single source of truth for the API origin, so the base URL isn't
// repeated across route loaders and the RTK Query base.
export const API_BASE =
  import.meta.env.VITE_API_URL ??
  "https://portfolio-backend-eta-plum.vercel.app/api/v1";

export const endpoints = {
  project: (id: string) => `${API_BASE}/project/${id}`,
  skill: (id: string) => `${API_BASE}/skill/${id}`,
  experience: (id: string) => `${API_BASE}/experience/${id}`,
  blog: (id: string) => `${API_BASE}/blog/${id}`,
};
