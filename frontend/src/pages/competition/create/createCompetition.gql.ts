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
