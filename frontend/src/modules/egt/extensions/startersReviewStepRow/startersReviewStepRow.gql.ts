import gql from "graphql-tag";

const DIVISION_QUERY = gql`
    query StartersReviewStepRowDivisions($filter: EGTDivisionFilterInput!) {
        egtDivisions(filter: $filter) {
            id
            number
        }
    }
`