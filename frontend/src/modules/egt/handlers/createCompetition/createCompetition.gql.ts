import gql from "graphql-tag";

export const CREATE_EGT_SETTINGS = gql`
    mutation createEgtSettings($competitionID: ID!, $data: EGTSettingsInput!) {
        egtSettings(competitionID: $competitionID, data: $data) {
            id
        }
    }
`