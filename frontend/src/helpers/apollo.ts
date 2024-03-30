import { ApolloClient, InMemoryCache } from "@apollo/client";
import { isTokenValid } from "./auth";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { RetryLink } from "@apollo/client/link/retry";

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

const splitLink = new RetryLink().split(
  (op) => {
    for (const variable of Object.values(op.variables)) {
      if (variable instanceof File) {
        return false;
      }
    }
    return true;
  },
  wsLink,
  // @ts-expect-error
  uploadLink
);

export const apolloClient = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});
