import gql from "graphql-tag";

const GET_EGT_DIVISIONS = gql`
  query egtAssignToDivisionDialog($filter: EGTDivisionFilterInput!) {
    egtDivisions(filter: $filter) {
      id
      number
      ground
    }
  }
`;

const EGT_STARTER_LINK_MUTATION = gql`
  mutation egtAssignToDivisionDialogMutation($data: EGTStarterLinkInput!) {
    egtStarterLink(data: $data) {
      id
      category
      division {
        id
        number
      }
      lineup {
        id
      }
      starterlink {
        id
        starter {
          id
          sex
        }
      }
    }
  }
`;
