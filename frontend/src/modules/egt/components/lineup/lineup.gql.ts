import { gql } from "@apollo/client";

export const GET_LINEUP = gql`
  query egtLineup($id: ID!) {
    egtLineup(id: $id) {
      id
      device
      starterlinks {
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
  }
`;

export const ASSIGN_TO_LINEUP = gql`
  mutation assignEgtLineup($data: EGTStarterLinkInput!) {
    egtStarterLink(data: $data) {
      id
    }
  }
`