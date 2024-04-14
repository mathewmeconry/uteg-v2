import gql from "graphql-tag";

export const GET_DEVICE_GRADING = gql`
  query EgtDeviceGrading($ids: [ID!]!, $round: Int!, $device: Int!) {
    egtJudgingDevice(ids: $ids, round: $round, device: $device) {
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
      }
      lineups {
        id
        currentRound
      }
    }
  }
`;

export const ADD_GRADES = gql`
  mutation EgtAddGrades($grades: [GradeInput!]!) {
    addGrades(grades: $grades) {
      id
      value
      starterlink {
        id
      }
    }
  }
`;

export const STARTER_GRADES = gql`
  query EgtStarterGrades($starterlinkIds: [ID!]!, $device: Int!) {
    starterGrades(starterlinkIds: $starterlinkIds, device: $device) {
      id
      value
      starterlink {
        id
      }
    }
  }
`;

export const ADVANCE_LINEUPS = gql`
  mutation egtAdvanceLineups($ids: [ID!]!, $round: Int!, $override: Boolean) {
    egtLineupAdvanceRounds(ids: $ids, round: $round, override: $override) {
      id
      currentRound
    }
  }
`;
