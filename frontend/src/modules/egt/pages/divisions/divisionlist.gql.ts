import gql from "graphql-tag";

const GET_DIVISIONS = gql`
  query egtDivisions($competitionID: ID!) {
    egtDivisions(filter: { competitionID: $competitionID }) {
      id
      ground
      state
      round
      currentRound
      totalRounds
      category
      sex
      number
    }
  }
`;

const REMOVE_DIVISION = gql`
  mutation removeEgtDivision($id: ID!) {
    removeEgtDivision(id: $id) {
      id
    }
  }
`