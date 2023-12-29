import gql from "graphql-tag";

const COMPETITION_NAME = gql`
    query competitionName($id: ID!) {
        competition(id: $id) {
            name
        }
    }
`