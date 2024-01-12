import gql from "graphql-tag";

const EGT_STARTER_LINK_MUTATION = gql`
  mutation egtStarterLinkMutation($data: EGTStarterLinkInput!) {
    egtStarterLink(data: $data) {
      id
      category
    }
  }
`;

const GET_EGT_STARTER_LINK = gql`
  query egtStarterLink($id: ID, $starterLinkID: ID) {
    egtStarterLink(id: $id, starterLinkID: $starterLinkID) {
      id
      category
    }
  }
`;
