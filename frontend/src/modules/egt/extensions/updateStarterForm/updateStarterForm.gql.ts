import gql from "graphql-tag";

const EGT_STARTER_LINK_MUTATION = gql`
  mutation egtStarterLinkMutation($data: EGTStarterLinkInput!) {
    egtStarterLink(data: $data) {
      id
      category
      division {
        id
        number
      }
    }
  }
`;

const GET_EGT_STARTER_LINK = gql`
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

const GET_EGT_DIVISIONS = gql`
  query egtDivisionsUpdateStarterForm($filter: EGTDivisionFilterInput!) {
    egtDivisions(filter: $filter) {
        id
        number
        ground
    }
  }
`