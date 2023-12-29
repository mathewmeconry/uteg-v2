import gql from "graphql-tag";

const CLUBS = gql`
  query clubs {
    clubs {
      id
      name
    }
  }
`;

const ADD_STARTER = gql`
  mutation createStarter($input: CreateStarterInput!) {
    createStarter(data: $input) {
      id
    }
  }
`;

const LINK_STARTER = gql`
  mutation createStarterLink($input: CreateStarterLinkInput!) {
    createStarterLink(data: $input) {
      id
    }
  }
`;


const STARTERS_AUTOCOMPLETE = gql`
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
`