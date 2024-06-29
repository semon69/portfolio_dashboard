import { baseApi } from "./baseApi";

const skillApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addSkill: builder.mutation({
      query: (payload) => ({
        url: "/skill/add",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["skill"]
    }),
    getAllSkills: builder.query({
      query: () => ({
        url: "/skill",
        method: "GET",
      }),
      providesTags: ['skill']
    }),
    getSingleSkill: builder.query({
      query: (id) => ({
        url: `/skill/${id}`,
        method: "GET",
      }),
      providesTags: ['skill']
    }),
    updateSkill: builder.mutation({
      query: (payload) => ({
        url: `/skill/${payload.id}`,
        method: "PATCH",
        body: payload.data,
      }),
      invalidatesTags: ["skill"]
    }),
    deleteSkill: builder.mutation({
      query: (id) => ({
        url: `/skill/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["skill"]
    }),
  }),
});

export const {
  useAddSkillMutation,
  useGetAllSkillsQuery,
  useGetSingleSkillQuery,
  useDeleteSkillMutation,
  useUpdateSkillMutation,
} = skillApi;
