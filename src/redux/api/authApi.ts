import { baseApi } from "./baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/login",
        method: "POST",
        body: userInfo,
      }),
    }),
    registered: builder.mutation({
      query: (userInfo) => ({
        url: "/register",
        method: "POST",
        body: userInfo,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (payload) => ({
        url: "/forgot-password",
        method: "POST",
        body: payload,
      }),
    }),
    resetPassword: builder.mutation({
      query: ({ token, ...payload }) => ({
        url: "/reset-password",
        method: "POST",
        // the reset token comes from the emailed link, not from redux state,
        // so it has to be set on the request instead of by prepareHeaders
        headers: { authorization: `${token}` },
        body: payload,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisteredMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation
} = authApi;
