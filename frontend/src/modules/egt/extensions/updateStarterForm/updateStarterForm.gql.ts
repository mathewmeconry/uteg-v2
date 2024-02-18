import gql from "graphql-tag";

export const EGT_STARTER_LINK_MUTATION = gql`
  mutation egtStarterLinkMutation(
    $data: EGTStarterLinkInput!
    $ignoreDivision: Boolean
  ) {
    egtStarterLink(data: $data, ignoreDivision: $ignoreDivision) {
      id
      category
      division {
        id
        number
      }
    }
  }
`;

export const GET_EGT_STARTER_LINK = gql`
  query egtStarterLink($id: ID, $starterLinkID: ID) {
    egtStarterLink(id: $id, starterLinkID: $starterLinkID) {
      id
      category
      division {
        id
      }
    }
  }
`;

export const GET_EGT_DIVISIONS = gql`
  query egtDivisionsUpdateStarterForm($filter: EGTDivisionFilterInput!) {
    egtDivisions(filter: $filter) {
      id
      number
      ground
    }
  }
`;
