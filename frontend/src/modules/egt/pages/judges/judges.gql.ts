import { gql } from "@apollo/client";

export const GROUNDS = gql`
  query EgtJudgesGrounds($id: ID!) {
    competition(id: $id) {
      id
      grounds
    }
  }
`;

export const TOKENS = gql`
  query EgtJudgesTokens(
    $competitionID: ID!
    $ground: Int!
    $device: Int!
    $create: Boolean
  ) {
    findJudgeToken(
      competitionID: $competitionID
      ground: $ground
      device: $device
      create: $create
    ) {
      id
      device
      token
      ground
    }
  }
`;


export const RESET_TOKEN = gql`
  mutation EgtJudgesResetToken($id: ID!) {
    resetJudgeToken(id: $id) {
      id
      token
    }
  }
`