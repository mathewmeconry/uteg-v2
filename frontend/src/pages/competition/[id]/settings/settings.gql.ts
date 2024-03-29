import gql from "graphql-tag";

export const COMPEITION = gql`
  query competitionSettings($id: ID!) {
    competition(id: $id) {
      id
      name
      location
      startDate
      endDate
      grounds
      logo
    }
  }
`;

export const UPDATE_COMPETITION = gql`
  mutation competitionSettingsUpdate($id: ID!, $data: UpdateCompetitionInput!) {
    updateCompetition(id: $id, data: $data) {
      id
      name
      location
      startDate
      endDate
      grounds
    }
  }
`;

gql`
  mutation competitionSettingsLogoUpdate($id: ID!, $logo: Upload!) {
    competitionLogo(id: $id, logo: $logo) {
      id
      logo
    }
  }
`;
