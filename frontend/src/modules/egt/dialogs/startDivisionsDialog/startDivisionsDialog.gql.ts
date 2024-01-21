import gql from "graphql-tag";

const UPDATE_DIVISION_STATE = gql`
  mutation updateEgtDivisionState($data: UpdateEGTDivisionStateInput!) {
    updateEgtDivisionState(data: $data) {
      id
      state
      currentRound
    }
  }
`;
