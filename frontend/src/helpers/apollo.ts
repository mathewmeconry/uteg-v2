import {
  ApolloClient,
  InMemoryCache,
  operationName,
  split,
} from "@apollo/client";
import { isTokenValid } from "./auth";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";

function getToken() {
  const token = localStorage.getItem("token");
  if (token && isTokenValid()) {
    return `Bearer ${token}`;
  }
  return "";
}

const backend = import.meta.env.VITE_BACKEND_URI ?? document.location.origin;

const uploadLink = createUploadLink({
  uri: `${backend}/graphql`,
  headers: {
    "Apollo-Require-Preflight": "true",
  },
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: `${backend}/graphql`
      .replace("https://", "wss://")
      .replace("http://", "ws://"),
  })
);

const splitLink = split(
  (op) => {
    const definition = getMainDefinition(op.query);
    op.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        Authorization: getToken(),
      },
    }));
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
