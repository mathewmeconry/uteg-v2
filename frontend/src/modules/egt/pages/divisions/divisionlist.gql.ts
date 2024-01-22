import gql from "graphql-tag";

const GET_DIVISIONS = gql`
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
    }
  }
`;

const REMOVE_DIVISION = gql`
  mutation removeEgtDivision($id: ID!) {
    removeEgtDivision(id: $id) {
      id
    }
  }
`;

const GET_COMPETITION_GROUNDS = gql`
  query competitionGrounds($id: ID!) {
    competition(id: $id) {
      id
      grounds
    }
  }
`;

const GET_DIVISION_IDS = gql`
  query egtDivisionsIds($filter: EGTDivisionFilterInput!) {
    egtDivisions(filter: $filter) {
      id
    }
  }
`;

const GET_JUDGING = gql`
  query egtDivisionJudging($ids: [ID!]!, $round: Int!) {
    egtDivisionJudging(ids: $ids, round: $round) {
      devices {
        device
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
  }
`;

const GET_DEVICES = gql`
  query egtDevicesJudging($competitionID: ID!) {
    egtDevices(competitionID: $competitionID) {
      id
      device
      inputs
      aggregationMode
      overrides {
        category
        inputs
        aggregationMode
      }
    }
  }
`;
