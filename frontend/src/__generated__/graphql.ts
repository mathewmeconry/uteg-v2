import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** `Date` type as integer. Type represents date and time as number of milliseconds from start of UNIX epoch. */
  Timestamp: { input: any; output: any; }
};

export type Club = {
  __typename?: 'Club';
  id: Scalars['ID']['output'];
  location: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type Competition = {
  __typename?: 'Competition';
  endDate: Scalars['Timestamp']['output'];
  grounds: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  location: Scalars['String']['output'];
  modules: Array<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  startDate: Scalars['Timestamp']['output'];
};

export type CreateClubInput = {
  location: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type CreateCompetition = {
  endDate: Scalars['Timestamp']['input'];
  grounds?: Scalars['Int']['input'];
  location: Scalars['String']['input'];
  modules?: Array<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  startDate: Scalars['Timestamp']['input'];
};

export type CreateStarterInput = {
  birthyear: Scalars['Int']['input'];
  firstname: Scalars['String']['input'];
  lastname: Scalars['String']['input'];
  sex: Sex;
  stvID?: InputMaybe<Scalars['String']['input']>;
};

export type CreateStarterLinkInput = {
  clubID: Scalars['ID']['input'];
  competitionID: Scalars['ID']['input'];
  starterID: Scalars['ID']['input'];
};

export type CreateUserInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Grade = {
  __typename?: 'Grade';
  id: Scalars['ID']['output'];
  starter: StarterLink;
  value: Scalars['Float']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createClub: Club;
  createCompetition: Competition;
  createStarter: Starter;
  createStarterLink: StarterLink;
  createUser: User;
};


export type MutationCreateClubArgs = {
  data: CreateClubInput;
};


export type MutationCreateCompetitionArgs = {
  competition: CreateCompetition;
};


export type MutationCreateStarterArgs = {
  data: CreateStarterInput;
};


export type MutationCreateStarterLinkArgs = {
  data: CreateStarterLinkInput;
};


export type MutationCreateUserArgs = {
  user: CreateUserInput;
};

export type Query = {
  __typename?: 'Query';
  clubs: Array<Club>;
  competition: Competition;
  competitions: Array<Competition>;
  grades: Array<Grade>;
  starterLink?: Maybe<StarterLink>;
  starters: Array<Starter>;
  users: Array<User>;
};


export type QueryCompetitionArgs = {
  id: Scalars['ID']['input'];
};


export type QueryStarterLinkArgs = {
  id: Scalars['Int']['input'];
};


export type QueryStartersArgs = {
  filter: StarterFilter;
};

export type Roles =
  | 'ADMIN'
  | 'JUDGE'
  | 'STARTER'
  | 'VIEWER';

export type Sex =
  | 'FEMALE'
  | 'MALE';

export type Starter = {
  __typename?: 'Starter';
  birthyear: Scalars['Int']['output'];
  firstname: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  lastname: Scalars['String']['output'];
  sex: Sex;
  starterLinks: Array<StarterLink>;
  stvID?: Maybe<Scalars['String']['output']>;
};

export type StarterFilter = {
  category?: InputMaybe<Scalars['Int']['input']>;
  competitionID?: InputMaybe<Scalars['ID']['input']>;
  firstname?: InputMaybe<Scalars['String']['input']>;
  lastname?: InputMaybe<Scalars['String']['input']>;
  sex?: InputMaybe<Sex>;
  stvID?: InputMaybe<Scalars['String']['input']>;
};

export type StarterLink = {
  __typename?: 'StarterLink';
  id: Scalars['ID']['output'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  globalRole: Roles;
  id: Scalars['ID']['output'];
};

export type CreateClubMutationVariables = Exact<{
  input: CreateClubInput;
}>;


export type CreateClubMutation = { __typename?: 'Mutation', createClub: { __typename?: 'Club', id: string, name: string } };

export type ClubsQueryVariables = Exact<{ [key: string]: never; }>;


export type ClubsQuery = { __typename?: 'Query', clubs: Array<{ __typename?: 'Club', id: string, name: string }> };

export type CreateStarterMutationVariables = Exact<{
  input: CreateStarterInput;
}>;


export type CreateStarterMutation = { __typename?: 'Mutation', createStarter: { __typename?: 'Starter', id: string } };

export type CreateStarterLinkMutationVariables = Exact<{
  input: CreateStarterLinkInput;
}>;


export type CreateStarterLinkMutation = { __typename?: 'Mutation', createStarterLink: { __typename?: 'StarterLink', id: string } };

export type StartersAutocompleteQueryVariables = Exact<{
  filter: StarterFilter;
}>;


export type StartersAutocompleteQuery = { __typename?: 'Query', starters: Array<{ __typename?: 'Starter', id: string, firstname: string, lastname: string, birthyear: number, stvID?: string | null, sex: Sex }> };

export type CompetitionNameQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type CompetitionNameQuery = { __typename?: 'Query', competition: { __typename?: 'Competition', name: string } };

export type StartersQueryVariables = Exact<{
  filter: StarterFilter;
}>;


export type StartersQuery = { __typename?: 'Query', starters: Array<{ __typename?: 'Starter', id: string, firstname: string, lastname: string, birthyear: number, stvID?: string | null }> };

export type CreateCompetitionMutationVariables = Exact<{
  name: Scalars['String']['input'];
  location: Scalars['String']['input'];
  startDate: Scalars['Timestamp']['input'];
  endDate: Scalars['Timestamp']['input'];
  grounds: Scalars['Int']['input'];
  modules: Array<Scalars['String']['input']> | Scalars['String']['input'];
}>;


export type CreateCompetitionMutation = { __typename?: 'Mutation', createCompetition: { __typename?: 'Competition', id: string } };

export type CompetitionsQueryVariables = Exact<{ [key: string]: never; }>;


export type CompetitionsQuery = { __typename?: 'Query', competitions: Array<{ __typename?: 'Competition', id: string, name: string, location: string, startDate: any, endDate: any }> };

export type CreateUserMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', id: string } };


export const CreateClubDocument = gql`
    mutation createClub($input: CreateClubInput!) {
  createClub(data: $input) {
    id
    name
  }
}
    `;
export type CreateClubMutationFn = Apollo.MutationFunction<CreateClubMutation, CreateClubMutationVariables>;

/**
 * __useCreateClubMutation__
 *
 * To run a mutation, you first call `useCreateClubMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateClubMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createClubMutation, { data, loading, error }] = useCreateClubMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateClubMutation(baseOptions?: Apollo.MutationHookOptions<CreateClubMutation, CreateClubMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateClubMutation, CreateClubMutationVariables>(CreateClubDocument, options);
      }
export type CreateClubMutationHookResult = ReturnType<typeof useCreateClubMutation>;
export type CreateClubMutationResult = Apollo.MutationResult<CreateClubMutation>;
export type CreateClubMutationOptions = Apollo.BaseMutationOptions<CreateClubMutation, CreateClubMutationVariables>;
export const ClubsDocument = gql`
    query clubs {
  clubs {
    id
    name
  }
}
    `;

/**
 * __useClubsQuery__
 *
 * To run a query within a React component, call `useClubsQuery` and pass it any options that fit your needs.
 * When your component renders, `useClubsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useClubsQuery({
 *   variables: {
 *   },
 * });
 */
export function useClubsQuery(baseOptions?: Apollo.QueryHookOptions<ClubsQuery, ClubsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ClubsQuery, ClubsQueryVariables>(ClubsDocument, options);
      }
export function useClubsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ClubsQuery, ClubsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ClubsQuery, ClubsQueryVariables>(ClubsDocument, options);
        }
export function useClubsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ClubsQuery, ClubsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ClubsQuery, ClubsQueryVariables>(ClubsDocument, options);
        }
export type ClubsQueryHookResult = ReturnType<typeof useClubsQuery>;
export type ClubsLazyQueryHookResult = ReturnType<typeof useClubsLazyQuery>;
export type ClubsSuspenseQueryHookResult = ReturnType<typeof useClubsSuspenseQuery>;
export type ClubsQueryResult = Apollo.QueryResult<ClubsQuery, ClubsQueryVariables>;
export const CreateStarterDocument = gql`
    mutation createStarter($input: CreateStarterInput!) {
  createStarter(data: $input) {
    id
  }
}
    `;
export type CreateStarterMutationFn = Apollo.MutationFunction<CreateStarterMutation, CreateStarterMutationVariables>;

/**
 * __useCreateStarterMutation__
 *
 * To run a mutation, you first call `useCreateStarterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateStarterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createStarterMutation, { data, loading, error }] = useCreateStarterMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateStarterMutation(baseOptions?: Apollo.MutationHookOptions<CreateStarterMutation, CreateStarterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateStarterMutation, CreateStarterMutationVariables>(CreateStarterDocument, options);
      }
export type CreateStarterMutationHookResult = ReturnType<typeof useCreateStarterMutation>;
export type CreateStarterMutationResult = Apollo.MutationResult<CreateStarterMutation>;
export type CreateStarterMutationOptions = Apollo.BaseMutationOptions<CreateStarterMutation, CreateStarterMutationVariables>;
export const CreateStarterLinkDocument = gql`
    mutation createStarterLink($input: CreateStarterLinkInput!) {
  createStarterLink(data: $input) {
    id
  }
}
    `;
export type CreateStarterLinkMutationFn = Apollo.MutationFunction<CreateStarterLinkMutation, CreateStarterLinkMutationVariables>;

/**
 * __useCreateStarterLinkMutation__
 *
 * To run a mutation, you first call `useCreateStarterLinkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateStarterLinkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createStarterLinkMutation, { data, loading, error }] = useCreateStarterLinkMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateStarterLinkMutation(baseOptions?: Apollo.MutationHookOptions<CreateStarterLinkMutation, CreateStarterLinkMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateStarterLinkMutation, CreateStarterLinkMutationVariables>(CreateStarterLinkDocument, options);
      }
export type CreateStarterLinkMutationHookResult = ReturnType<typeof useCreateStarterLinkMutation>;
export type CreateStarterLinkMutationResult = Apollo.MutationResult<CreateStarterLinkMutation>;
export type CreateStarterLinkMutationOptions = Apollo.BaseMutationOptions<CreateStarterLinkMutation, CreateStarterLinkMutationVariables>;
export const StartersAutocompleteDocument = gql`
    query startersAutocomplete($filter: StarterFilter!) {
  starters(filter: $filter) {
    id
    firstname
    lastname
    birthyear
    stvID
    sex
  }
}
    `;

/**
 * __useStartersAutocompleteQuery__
 *
 * To run a query within a React component, call `useStartersAutocompleteQuery` and pass it any options that fit your needs.
 * When your component renders, `useStartersAutocompleteQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStartersAutocompleteQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useStartersAutocompleteQuery(baseOptions: Apollo.QueryHookOptions<StartersAutocompleteQuery, StartersAutocompleteQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<StartersAutocompleteQuery, StartersAutocompleteQueryVariables>(StartersAutocompleteDocument, options);
      }
export function useStartersAutocompleteLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<StartersAutocompleteQuery, StartersAutocompleteQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<StartersAutocompleteQuery, StartersAutocompleteQueryVariables>(StartersAutocompleteDocument, options);
        }
export function useStartersAutocompleteSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<StartersAutocompleteQuery, StartersAutocompleteQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<StartersAutocompleteQuery, StartersAutocompleteQueryVariables>(StartersAutocompleteDocument, options);
        }
export type StartersAutocompleteQueryHookResult = ReturnType<typeof useStartersAutocompleteQuery>;
export type StartersAutocompleteLazyQueryHookResult = ReturnType<typeof useStartersAutocompleteLazyQuery>;
export type StartersAutocompleteSuspenseQueryHookResult = ReturnType<typeof useStartersAutocompleteSuspenseQuery>;
export type StartersAutocompleteQueryResult = Apollo.QueryResult<StartersAutocompleteQuery, StartersAutocompleteQueryVariables>;
export const CompetitionNameDocument = gql`
    query competitionName($id: ID!) {
  competition(id: $id) {
    name
  }
}
    `;

/**
 * __useCompetitionNameQuery__
 *
 * To run a query within a React component, call `useCompetitionNameQuery` and pass it any options that fit your needs.
 * When your component renders, `useCompetitionNameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCompetitionNameQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCompetitionNameQuery(baseOptions: Apollo.QueryHookOptions<CompetitionNameQuery, CompetitionNameQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CompetitionNameQuery, CompetitionNameQueryVariables>(CompetitionNameDocument, options);
      }
export function useCompetitionNameLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CompetitionNameQuery, CompetitionNameQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CompetitionNameQuery, CompetitionNameQueryVariables>(CompetitionNameDocument, options);
        }
export function useCompetitionNameSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<CompetitionNameQuery, CompetitionNameQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CompetitionNameQuery, CompetitionNameQueryVariables>(CompetitionNameDocument, options);
        }
export type CompetitionNameQueryHookResult = ReturnType<typeof useCompetitionNameQuery>;
export type CompetitionNameLazyQueryHookResult = ReturnType<typeof useCompetitionNameLazyQuery>;
export type CompetitionNameSuspenseQueryHookResult = ReturnType<typeof useCompetitionNameSuspenseQuery>;
export type CompetitionNameQueryResult = Apollo.QueryResult<CompetitionNameQuery, CompetitionNameQueryVariables>;
export const StartersDocument = gql`
    query starters($filter: StarterFilter!) {
  starters(filter: $filter) {
    id
    firstname
    lastname
    birthyear
    stvID
  }
}
    `;

/**
 * __useStartersQuery__
 *
 * To run a query within a React component, call `useStartersQuery` and pass it any options that fit your needs.
 * When your component renders, `useStartersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStartersQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useStartersQuery(baseOptions: Apollo.QueryHookOptions<StartersQuery, StartersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<StartersQuery, StartersQueryVariables>(StartersDocument, options);
      }
export function useStartersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<StartersQuery, StartersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<StartersQuery, StartersQueryVariables>(StartersDocument, options);
        }
export function useStartersSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<StartersQuery, StartersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<StartersQuery, StartersQueryVariables>(StartersDocument, options);
        }
export type StartersQueryHookResult = ReturnType<typeof useStartersQuery>;
export type StartersLazyQueryHookResult = ReturnType<typeof useStartersLazyQuery>;
export type StartersSuspenseQueryHookResult = ReturnType<typeof useStartersSuspenseQuery>;
export type StartersQueryResult = Apollo.QueryResult<StartersQuery, StartersQueryVariables>;
export const CreateCompetitionDocument = gql`
    mutation createCompetition($name: String!, $location: String!, $startDate: Timestamp!, $endDate: Timestamp!, $grounds: Int!, $modules: [String!]!) {
  createCompetition(
    competition: {name: $name, location: $location, startDate: $startDate, endDate: $endDate, grounds: $grounds, modules: $modules}
  ) {
    id
  }
}
    `;
export type CreateCompetitionMutationFn = Apollo.MutationFunction<CreateCompetitionMutation, CreateCompetitionMutationVariables>;

/**
 * __useCreateCompetitionMutation__
 *
 * To run a mutation, you first call `useCreateCompetitionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCompetitionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCompetitionMutation, { data, loading, error }] = useCreateCompetitionMutation({
 *   variables: {
 *      name: // value for 'name'
 *      location: // value for 'location'
 *      startDate: // value for 'startDate'
 *      endDate: // value for 'endDate'
 *      grounds: // value for 'grounds'
 *      modules: // value for 'modules'
 *   },
 * });
 */
export function useCreateCompetitionMutation(baseOptions?: Apollo.MutationHookOptions<CreateCompetitionMutation, CreateCompetitionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCompetitionMutation, CreateCompetitionMutationVariables>(CreateCompetitionDocument, options);
      }
export type CreateCompetitionMutationHookResult = ReturnType<typeof useCreateCompetitionMutation>;
export type CreateCompetitionMutationResult = Apollo.MutationResult<CreateCompetitionMutation>;
export type CreateCompetitionMutationOptions = Apollo.BaseMutationOptions<CreateCompetitionMutation, CreateCompetitionMutationVariables>;
export const CompetitionsDocument = gql`
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

/**
 * __useCompetitionsQuery__
 *
 * To run a query within a React component, call `useCompetitionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCompetitionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCompetitionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useCompetitionsQuery(baseOptions?: Apollo.QueryHookOptions<CompetitionsQuery, CompetitionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CompetitionsQuery, CompetitionsQueryVariables>(CompetitionsDocument, options);
      }
export function useCompetitionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CompetitionsQuery, CompetitionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CompetitionsQuery, CompetitionsQueryVariables>(CompetitionsDocument, options);
        }
export function useCompetitionsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<CompetitionsQuery, CompetitionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CompetitionsQuery, CompetitionsQueryVariables>(CompetitionsDocument, options);
        }
export type CompetitionsQueryHookResult = ReturnType<typeof useCompetitionsQuery>;
export type CompetitionsLazyQueryHookResult = ReturnType<typeof useCompetitionsLazyQuery>;
export type CompetitionsSuspenseQueryHookResult = ReturnType<typeof useCompetitionsSuspenseQuery>;
export type CompetitionsQueryResult = Apollo.QueryResult<CompetitionsQuery, CompetitionsQueryVariables>;
export const CreateUserDocument = gql`
    mutation createUser($email: String!, $password: String!) {
  createUser(user: {email: $email, password: $password}) {
    id
  }
}
    `;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;