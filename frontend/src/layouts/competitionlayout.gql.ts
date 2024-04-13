import gql from "graphql-tag";

export const COMPETITION_NAME = gql`
    query competitionName($id: ID!) {
        competition(id: $id) {
            id
            name
        }
    }
`