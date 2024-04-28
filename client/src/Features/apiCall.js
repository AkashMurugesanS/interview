import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";




export function getaccessToken() {
  return localStorage.getItem("interview");
}


export const ApiSlice = createApi({
  reducerPath: "ApiSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/",
    prepareHeaders: (headers, { getState }) => {
      const token = getaccessToken();
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  tagTypes: [
    "roleName",
    "users",
    "posts",
    "widthdraw",
    "cashback",
    "dashboardd",
    "combo",
    "combo2",
    "booking",
    "supportTicketVendor",
    "supportTicketvendoringleView",
    "withdraw",
  ],

  endpoints: (builder) => ({
    loginApi: builder.mutation({
      query: (values) => ({
        url: "api/auth/signin",
        method: "POST",
        body: values,
      }),
      transformResponse: (response) => {
        return response;
      },
      transformErrorResponse: (response, meta, args) => ({
        status: response.status,
        message: response.data.message,
      }),
    }),
    signupApi: builder.mutation({
      query: (values) => ({
        url: "api/auth/signup",
        method: "POST",
        body: values,
      }),
      transformResponse: (response) => {
        return response;
      },
      transformErrorResponse: (response, meta, args) => ({
        status: response.status,
        message: response.data.message,
      }),
    }),
    createPropertyApi: builder.mutation({
      query: (values) => ({
        url: "api/listing/create",
        method: "POST",
        body: values,
      }),
      transformResponse: (response) => {
        return response;
      },
      transformErrorResponse: (response, meta, args) => ({
        status: response.status,
        message: response.data.message,
      }),      invalidatesTags:["withdraw"]

    }),

    deletePropertyApi: builder.mutation({
      query: (values) => ({
        url: `api/listing/delete/${values}`,
        method: "DELETE",
        // body: values,
      }),
      transformResponse: (response) => {
        return response;
      },
      transformErrorResponse: (response, meta, args) => ({
        status: response.status,
        message: response.data.message,
      }),
      invalidatesTags:["withdraw"]
    }),

    getallProperty: builder.query({
      query: (query) => ({
        url: `api/listing/getall`,
        method: "GET",
      }),
      transformResponse: (response) => {
        return response;
      },
      transformErrorResponse: (response, meta, args) => ({
        status: response.status,
        message: response?.data?.message,
      }),
      providesTags: ["withdraw"],
    }),
  
  }),
});

export const {
  useLoginApiMutation,
  useSignupApiMutation,
  useCreatePropertyApiMutation,
  useGetallPropertyQuery,
  useDeletePropertyApiMutation
} = ApiSlice;

// http://localhost:3000/api/listing/delete/:id