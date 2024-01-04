import gql from "graphql-tag";

const ADD_CLUB = gql`
  mutation createClub($input: CreateClubInput!) {
    createClub(data: $input) {
      id
      name
    }
  }
`;
