import gql from "graphql-tag";

export const CLUBS = gql`
  query clubs {
    clubs {
      id
      name
    }
  }
`;

export const CREATE_STARTER = gql`
  mutation createStarter($input: CreateStarterInput!) {
    createStarter(data: $input) {
      id
    }
  }
`;

export const LINK_STARTER = gql`
  mutation createStarterLink($input: CreateStarterLinkInput!) {
    createStarterLink(data: $input) {
      id
      starter {
        id
      }
    }
  }
`;

export const STARTERS_AUTOCOMPLETE = gql`
  query startersAutocomplete($filter: StarterFilter!) {
    starters(filter: $filter) {
      id
      firstname
      lastname
      birthyear
      stvID
      sex
    }
  }
`;
