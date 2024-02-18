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
        }
    }
`

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
`