import { baseApi } from "./baseApi";

const experienceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addExperience: builder.mutation({
      query: (payload) => ({
        url: "/experience/add",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["experience"],
    }),
    getAllExperience: builder.query({
      query: () => ({
        url: "/experience",
        method: "GET",
      }),
      providesTags: ["experience"],
    }),
    getSingleExperience: builder.query({
      query: (id) => ({
        url: `/experience/${id}`,
        method: "GET",
      }),
      providesTags: ["experience"],
    }),

    deleteExperience: builder.mutation({
      query: (id) => ({
        url: `/experience/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["experience"],
    }),
    updateExperience: builder.mutation({
      query: (payload) => ({
        url: `/experience/${payload.id}`,
        method: "PATCH",
        body: payload.data,
      }),
      invalidatesTags: ["experience"],
    }),
  }),
});

export const {
  useAddExperienceMutation,
  useGetAllExperienceQuery,
  useGetSingleExperienceQuery,
  useDeleteExperienceMutation,
  useUpdateExperienceMutation,
} = experienceApi;
