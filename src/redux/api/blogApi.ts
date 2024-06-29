import { baseApi } from "./baseApi";

const blogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addBlog: builder.mutation({
      query: (payload) => ({
        url: "/blog/add",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["blog"],
    }),
    getAllBlogs: builder.query({
      query: () => ({
        url: "/blog",
        method: "GET",
      }),
      providesTags: ["blog"],
    }),
    getSingleBlog: builder.query({
      query: (id) => ({
        url: `/blog/${id}`,
        method: "GET",
      }),
      providesTags: ["blog"],
    }),
    updateBlog: builder.mutation({
      query: (payload) => ({
        url: `/blog/${payload.id}`,
        method: "PATCH",
        body: payload.data,
      }),
      invalidatesTags: ["blog"],
    }),
    deleteBlog: builder.mutation({
      query: (id) => ({
        url: `/blog/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["blog"],
    }),
  }),
});

export const {
  useAddBlogMutation,
  useGetAllBlogsQuery,
  useGetSingleBlogQuery,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} = blogApi;
