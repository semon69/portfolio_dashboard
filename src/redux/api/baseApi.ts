import {
  BaseQueryApi,
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { API_BASE } from "../../config/api";

const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("authorization", `${token}`);
    }
    return headers;
  },
});

const baseQueryWithResult = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  // eslint-disable-next-line @typescript-eslint/ban-types
  extraOptions: {}
) => baseQuery(args, api, extraOptions);

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithResult,
  tagTypes: ["skill", "user", "experience", "blog", "project"],
  endpoints: () => ({}),
});
