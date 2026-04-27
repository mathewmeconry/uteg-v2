import { gql } from "@apollo/client";

export const TOKEN = gql`
  query EgtDisplayToken($id: ID!) {
    displayToken(id: $id) {
      id
      token
      ground
      competition {
        id
      }
    }
  }
`;

export const COMPETITION = gql`
  query EgtDisplayCompetition($id: ID!) {
    competition(id: $id) {
      id
      name
    }
  }
`;

export const DIVISION_DATA = gql`
  query EgtDisplayDivisionData($ids: [ID!]!, $round: Int!) {
    egtJudgingDevices(ids: $ids, round: $round) {
      device {
        id
        deviceNumber
      }
      starterslist {
        id
        category
        starterlink {
          id
          club {
            id
            name
          }
          starter {
            id
            firstname
            lastname
          }
          grades {
            id
            deviceNumber
            value
          }
        }
      }
    }
  }
`;

export const SUBSCRIPTION = gql`
  subscription EgtDisplayGradesSubscription($filter: GradeFilterInput!) {
    grade(filter: $filter) {
      id
      value
      deviceNumber
      starterlink {
        id
      }
    }
  }
`;
