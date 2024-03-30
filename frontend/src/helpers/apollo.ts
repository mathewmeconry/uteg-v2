import { ApolloClient, InMemoryCache, split } from "@apollo/client";
import { isTokenValid } from "./auth";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";

const token = localStorage.getItem("token");
if (!isTokenValid()) {
  console.log("INVALID!");
}

const backend = import.meta.env.VITE_BACKEND_URI ?? document.location.origin;

const uploadLink = createUploadLink({
  uri: `${backend}/graphql`,
  headers: {
    "Apollo-Require-Preflight": "true",
    authorization: token ? `Bearer ${token}` : "",
  },
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: `${backend}/graphql`
      .replace("https://", "wss://")
      .replace("http://", "ws://"),
    connectionParams: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  })
);

const splitLink = split(
  (op) => {
    const definition = getMainDefinition(op.query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  // @ts-expect-error
  uploadLink
);

export const apolloClient = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});
