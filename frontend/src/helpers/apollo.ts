import { ApolloClient, InMemoryCache } from "@apollo/client";
import { isTokenValid } from "./auth";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";

const token = localStorage.getItem("token");
if (!isTokenValid()) {
  console.log("INVALID!");
}

const uploadLink = createUploadLink({
  uri: `${import.meta.env.VITE_BACKEND_URI || ""}/graphql`,
  headers: {
    "Apollo-Require-Preflight": "true",
    authorization: token ? `Bearer ${token}` : "",
  },
});

export const apolloClient = new ApolloClient({
  // @ts-expect-error
  link: uploadLink,
  cache: new InMemoryCache(),
});
