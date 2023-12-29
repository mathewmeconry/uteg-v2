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
  stvID?: InputMaybe<Scalars['String']['input']>;
};

export type CreateUserInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Grade = {
  __typename?: 'Grade';
  id: Scalars['ID']['output'];
  starter: Starter2Competition;
  value: Scalars['Float']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createCompetition: Competition;
  createStarter: Starter;
  createUser: User;
};


export type MutationCreateCompetitionArgs = {
  competition: CreateCompetition;
};


export type MutationCreateStarterArgs = {
  starter: CreateStarterInput;
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
  starter2competition?: Maybe<Starter2Competition>;
  starters: Array<Starter>;
  users: Array<User>;
};


export type QueryCompetitionArgs = {
  id: Scalars['ID']['input'];
};


export type QueryStarter2competitionArgs = {
  id: Scalars['Int']['input'];
};

export type Roles =
  | 'ADMIN'
  | 'JUDGE'
  | 'STARTER'
  | 'VIEWER';

export type Starter = {
  __typename?: 'Starter';
  birthyear: Scalars['Int']['output'];
  firstname: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  lastname: Scalars['String']['output'];
  stvID?: Maybe<Scalars['String']['output']>;
};

export type Starter2Competition = {
  __typename?: 'Starter2Competition';
  category?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  globalRole: Roles;
  id: Scalars['ID']['output'];
};

export type CompetitionNameQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type CompetitionNameQuery = { __typename?: 'Query', competition: { __typename?: 'Competition', name: string } };

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