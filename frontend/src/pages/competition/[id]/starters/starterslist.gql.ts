import gql from "graphql-tag";

export const STARTER_LINKS = gql`
  query starterLinks($competitionID: ID!, $sex: String) {
    starterLinks(competitionID: $competitionID, sex: $sex) {
      id
      starter {
        id
        firstname
        lastname
        birthyear
        stvID
        sex
      }
      club {
        id
        name
        location
      }
    }
  }
`;

export const REMOVE_STARTER_LINK = gql`
  mutation removeStarterLink($id: ID!) {
    removeStarterLink(id: $id) {
      id
    }
  }
`;
