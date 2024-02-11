import gql from "graphql-tag";

export const GET_COMPETITION_GROUNDS = gql`
  query competitionGrounds($id: ID!) {
    competition(id: $id) {
      id
      grounds
    }
  }
`;

export const CREATE_DIVISION = gql`
  mutation createEgtDivision($data: CreateEGTDivisionInput!) {
    createEgtDivision(data: $data) {
      id
    }
  }
`;
