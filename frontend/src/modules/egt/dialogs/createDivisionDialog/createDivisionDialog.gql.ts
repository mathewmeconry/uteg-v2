import gql from "graphql-tag";

const GET_COMPETITION_GROUNDS = gql`
  query competitionGrounds($id: ID!) {
    competition(id: $id) {
      id
      grounds
    }
  }
`;

const CREATE_DIVISION = gql`
  mutation createEgtDivision($data: CreateEGTDivisionInput!) {
    createEgtDivision(data: $data) {
      id
    }
  }
`;
