import gql from "graphql-tag";

export const ADD_CLUB = gql`
  mutation createClub($input: CreateClubInput!) {
    createClub(data: $input) {
      id
      name
    }
  }
`;
