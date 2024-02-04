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
