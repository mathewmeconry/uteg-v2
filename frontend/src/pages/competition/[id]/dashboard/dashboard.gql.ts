import gql from "graphql-tag";

export const DASHBOARD_STATS = gql`
  query CompetitionDashboardStats($id: ID!) {
    competition(id: $id) {
      id
      stats {
        clubs
        starters
        grades
      }
    }
  }
`;
