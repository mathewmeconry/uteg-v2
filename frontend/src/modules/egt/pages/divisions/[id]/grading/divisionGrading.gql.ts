import gql from "graphql-tag";

gql`
    query egtDivisionGrading($id: ID!) {
        egtDivision(id: $id) {
            id
            ground
            totalRounds
        }
    }
`