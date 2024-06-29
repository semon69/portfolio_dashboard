import { baseApi } from "./baseApi";

const projectApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addProject: builder.mutation({
      query: (payload) => ({
        url: "/project/add",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["project"],
    }),
    getAllProjects: builder.query({
      query: () => ({
        url: "/project",
        method: "GET",
      }),
      providesTags: ["project"],
    }),
    getSingleProject: builder.query({
      query: (id) => ({
        url: `/skill/${id}`,
        method: "GET",
      }),
      providesTags: ["project"],
    }),

    deleteProject: builder.mutation({
      query: (id) => ({
        url: `/project/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["project"],
    }),
    updateProject: builder.mutation({
      query: (payload) => ({
        url: `/project/${payload.id}`,
        method: "PATCH",
        body: payload.data,
      }),
      invalidatesTags: ["project"],
    }),
  }),
});

export const {
  useAddProjectMutation,
  useGetAllProjectsQuery,
  useGetSingleProjectQuery,
  useDeleteProjectMutation,
  useUpdateProjectMutation,
} = projectApi;
