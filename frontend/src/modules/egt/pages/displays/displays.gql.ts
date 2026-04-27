import { gql } from "@apollo/client";

export const TOKENS = gql`
  query EgtDisplaysTokens($competitionID: ID!) {
    displayTokens(competitionID: $competitionID) {
      id
      token
      ground
    }
  }
`;

export const CREATE_TOKEN = gql`
  mutation EgtDisplaysCreateToken($competitionID: ID!, $ground: Int!) {
    createDisplayToken(competitionID: $competitionID, ground: $ground) {
      id
      token
      ground
    }
  }
`;

export const RESET_TOKEN = gql`
  mutation EgtDisplaysResetToken($id: ID!) {
    displayToken(id: $id) {
      id
      token
    }
  }
`;

export const GROUNDS = gql`
  query EgtDisplaysGrounds($id: ID!) {
    competition(id: $id) {
      id
      grounds
    }
  }
`;

export const DELETE_TOKEN = gql`
  mutation EgtDisplaysDeleteToken($id: ID!) {
    deleteDisplayToken(id: $id)
  }
`;
