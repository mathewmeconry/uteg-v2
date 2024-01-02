import { gql } from "@apollo/client";

const UPDATE_STARTER = gql`
  mutation updateStarter($id: ID!, $input: UpdateStarterInput!) {
    updateStarter(id: $id, data: $input) {
      id
    }
  }
`;

const UPDATE_STARTER_LINK = gql`
  mutation updateStarterLink($id: ID!, $input: UpdateStarterLinkInput!) {
    updateStarterLink(id: $id, data: $input) {
      id
    }
  }
`;

const GET_STARTER_LINK = gql`
  query starterLink($id: ID!) {
    starterLink(id: $id) {
        id
        competition {
            id
        }
        starter {
            id
            stvID
            firstname
            lastname
            sex
            birthyear
        }
        club {
            id
            name
        }
    }
  }
`