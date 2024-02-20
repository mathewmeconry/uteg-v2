import gql from "graphql-tag";

export const GET_DIVISIONS = gql`
  query egtDivisions($competitionID: ID!) {
    egtDivisions(filter: { competitionID: $competitionID }) {
      id
      ground
      state
      currentRound
      totalRounds
      category
      sex
      number
      totalStarters
    }
  }
`;

export const REMOVE_DIVISION = gql`
  mutation removeEgtDivision($id: ID!) {
    removeEgtDivision(id: $id) {
      id
    }
  }
`;

export const GET_COMPETITION_GROUNDS = gql`
  query competitionGrounds($id: ID!) {
    competition(id: $id) {
      id
      grounds
    }
  }
`;

export const GET_DIVISION_IDS = gql`
  query egtDivisionsIds($filter: EGTDivisionFilterInput!) {
    egtDivisions(filter: $filter) {
      id
    }
  }
`;

export const GET_JUDGING = gql`
  query egtDivisionJudging($ids: [ID!]!, $round: Int!) {
    egtJudgingDevices(ids: $ids, round: $round) {
      device {
        id
        deviceNumber
        inputs
        aggregationMode
        overrides {
          category
          inputs
          aggregationMode
        }
      }
      starterslist {
        id
        starterlink {
          id
          starter {
            id
            firstname
            lastname
          }
          club {
            id
            name
          }
        }
        category
      }
      round
    }
  }
`;
