import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { isTokenValid } from "./auth";

const httpLink = createHttpLink({
  uri: `${import.meta.env.VITE_BACKEND_URI || ""}/graphql`,
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return {
      headers: {},
    };
  }

  if (!isTokenValid()) {
    console.log("INVALID!");
  }

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
