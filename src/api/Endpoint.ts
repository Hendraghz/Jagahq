import { ApolloClient, InMemoryCache } from "@apollo/client";

const Endpoint = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql",
  cache: new InMemoryCache(),
});

export default Endpoint;
