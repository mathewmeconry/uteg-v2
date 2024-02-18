import gql from "graphql-tag";

export const DIVISION_QUERY = gql`
    query StartersReviewStepRowDivisions($filter: EGTDivisionFilterInput!) {
        egtDivisions(filter: $filter) {
            id
            number
        }
    }
`