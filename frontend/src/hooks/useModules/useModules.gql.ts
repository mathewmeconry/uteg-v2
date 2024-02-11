import { gql } from "@apollo/client";

export const GET_MODULES = gql`
    query modules($competitionID: ID!) {
        competition(id: $competitionID) {
            id
            modules
        }
    }
`