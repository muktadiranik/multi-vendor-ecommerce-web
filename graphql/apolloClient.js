import { ApolloClient, InMemoryCache } from "@apollo/client";
import createUploadLink from "apollo-upload-client/public/createUploadLink.js";

const defaultOptions = {
  watchQuery: {
    fetchPolicy: "network-only",
    errorPolicy: "ignore",
  },
  query: {
    fetchPolicy: "network-only",
    errorPolicy: "all",
  },
};

const link = createUploadLink({
  uri: `${process.env.NEXT_PUBLIC_API_URI}/graphql`,
});

export const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  defaultOptions: defaultOptions,
});
