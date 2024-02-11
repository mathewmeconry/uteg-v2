import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation createUser($email: String!, $password: String!, $language: String!) {
    createUser(user: { email: $email, password: $password, language: $language }) {
      id
      language
    }
  }
`;
