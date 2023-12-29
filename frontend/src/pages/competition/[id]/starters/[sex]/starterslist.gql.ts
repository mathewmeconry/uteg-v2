import gql from "graphql-tag";

const STARTERS = gql`
  query starters($filter: StarterFilter!) {
    starters(filter: $filter) {
      id
      firstname
      lastname
      starter2competitions {
        category
      }
      birthyear,
      stvID
    }
  }
`;
