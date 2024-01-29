import gql from "graphql-tag";

gql`
  query egtGradingDivisionsIds($filter: EGTDivisionFilterInput!) {
    egtDivisions(filter: $filter) {
      id
      totalRounds
    }
  }
`;
