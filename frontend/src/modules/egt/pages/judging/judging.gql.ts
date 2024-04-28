import gql from "graphql-tag";

export const COMPETITION = gql`
    query egtJudgingCompetition($id: ID!) {
        competition(id: $id) {
            id
            name
        }
    }
`

gql`
  query egtJudgingDivisionsIds($filter: EGTDivisionFilterInput!) {
    egtDivisions(filter: $filter) {
      id
      totalRounds
    }
  }
`;


export const GET_DEVICE_GRADING = gql`
  query EgtJudgingArray($ids: [ID!]!, $round: Int!, $device: Int!) {
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
        starterlink {
          id
          starter {
            id
            firstname
            lastname
            sex
          }
        }
        category
      }
      lineups {
        id
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
