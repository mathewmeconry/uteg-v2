import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation createUser($email: String!, $password: String!) {
    createUser(user: { email: $email, password: $password }) {
      id
    }
  }
`;
