import { gql } from "@apollo/client";

export const GROUNDS = gql`
  query EgtGradingGrounds($id: ID!) {
    competition(id: $id) {
      id
      grounds
    }
  }
`;
