import { gql } from "@apollo/client";

const GROUNDS = gql`
  query EgtGradingGrounds($id: ID!) {
    competition(id: $id) {
      id
      grounds
    }
  }
`;
