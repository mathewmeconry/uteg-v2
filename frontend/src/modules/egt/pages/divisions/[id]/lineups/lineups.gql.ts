import gql from "graphql-tag";

export const GET_DIVISION = gql`
  query egtDivision($id: ID!) {
    egtDivision(id: $id) {
      id
      category
      ground
      currentRound
      totalRounds
      sex
      number
      lineups {
        id
        device
      }
    }
  }
`;

export const GET_UNASSIGNED_STARTERS = gql`
  query egtStarterLinkUnassigned($divisionID: ID!) {
    egtStarterLinkUnassigned(divisionID: $divisionID) {
      id
      starterlink {
        id
        starter {
          id
          firstname
          lastname
          birthyear
        }
        club {
          id
          name
        }
      }
    }
  }
`;
