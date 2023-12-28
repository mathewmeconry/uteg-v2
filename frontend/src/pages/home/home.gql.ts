import gql from "graphql-tag";

const GET_COMPETITIONS = gql`
  query competitions {
    competitions {
      id
      name
      location
      startDate
      endDate
    }
  }
`;
