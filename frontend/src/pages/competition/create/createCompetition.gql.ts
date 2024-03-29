import gql from "graphql-tag";

export const CREATE_COMPETITION = gql`
    mutation createCompetition($name: String!, $location: String!, $startDate: Timestamp!, $endDate: Timestamp!, $grounds: Int!, $modules: [String!]!) {
        createCompetition(competition: {
            name: $name,
            location: $location,
            startDate: $startDate,
            endDate: $endDate,
            grounds: $grounds,
            modules: $modules
        }) {
            id
        }
    }
`;

gql`
  mutation createCompeitionLogo($id: ID!, $logo: Upload!) {
    competitionLogo(id: $id, logo: $logo) {
      id
      logo
    }
  }
`;