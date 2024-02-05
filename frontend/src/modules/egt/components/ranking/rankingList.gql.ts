import gql from "graphql-tag";

const STARTER_RANKING = gql`
  query EGTStarterRanking($competitionID: ID!, $sex: Sex!, $category: Int!) {
    egtStarterRankings(
      competitionID: $competitionID
      sex: $sex
      category: $category
    ) {
      rank
      total
      award
      egtStarterlink {
        id
        starterlink {
          id
          starter {
            id
            firstname
            lastname
          }
          club {
            id
            name
          }
        }
      }
      grades {
        id
        deviceNumber
        value
      }
    }
  }
`;

const GET_EGT_CATEGORY_SETTINGS = gql`
  query egtCategorySettings($competitionID: ID!, $category: Int!, $sex: Sex!) {
    egtCategorySettings(
      competitionID: $competitionID
      category: $category
      sex: $sex
    ) {
      honourPrecentage
    }
  }
`;

const UPDATE_EGT_CATEGORY_SETTINGS = gql`
  mutation updateEgtCategorySettings($competitionID: ID!, $data: EGTCategorySettingsInput!) {
    egtCategorySettings(competitionID: $competitionID, data: $data) {
      honourPrecentage      
    }
  }
`;
