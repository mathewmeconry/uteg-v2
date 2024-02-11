import gql from "graphql-tag";

export const GET_COMPETITIONS = gql`
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
