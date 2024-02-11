import gql from "graphql-tag";

export const CURRENT_I18N_USER = gql`
    query currentI18NUser {
        currentUser {
            id
            language
        }
    }
`