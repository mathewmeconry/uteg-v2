import gql from "graphql-tag";

export const UPDATE_DIVISION_STATE = gql`
  mutation updateEgtDivisionState($data: UpdateEGTDivisionStateInput!) {
    updateEgtDivisionState(data: $data) {
      id
      state
      currentRound
    }
  }
`;
