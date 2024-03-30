import { ApolloClient, InMemoryCache } from "@apollo/client";
import { isTokenValid } from "./auth";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";

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

const wsLink = new GraphQLWsLink(
  createClient({
    url: `${import.meta.env.VITE_BACKEND_URI || ""}/graphql`
      .replace("https://", "wss://")
      .replace("http://", "ws://"),
    connectionParams: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  })
);

export const apolloClient = new ApolloClient({
  // @ts-expect-error
  link: wsLink.concat(uploadLink),
  cache: new InMemoryCache(),
});
