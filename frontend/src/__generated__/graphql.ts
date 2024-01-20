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

export type CreateEgtDivisionInput = {
  category: Scalars['Int']['input'];
  competitionID: Scalars['ID']['input'];
  ground: Scalars['Int']['input'];
  sex: Sex;
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

export type EgtDivision = {
  __typename?: 'EGTDivision';
  category: Scalars['Int']['output'];
  currentRound: Scalars['Int']['output'];
  ground: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  lineups: Array<EgtLineup>;
  number: Scalars['Int']['output'];
  sex: Sex;
  starters: StarterLink;
  state: EgtDivisionStates;
  totalRounds: Scalars['Int']['output'];
};

export type EgtDivisionFilterInput = {
  category?: InputMaybe<Scalars['Int']['input']>;
  competitionID: Scalars['ID']['input'];
  sex?: InputMaybe<Sex>;
};

export type EgtDivisionStates =
  | 'ENDED'
  | 'PENDING'
  | 'RUNNING';

export type EgtLineup = {
  __typename?: 'EGTLineup';
  device: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  starterlinks: Array<EgtStarterLink>;
};

export type EgtStarterLink = {
  __typename?: 'EGTStarterLink';
  category?: Maybe<Scalars['Int']['output']>;
  division?: Maybe<EgtDivision>;
  id: Scalars['ID']['output'];
  lineup?: Maybe<EgtLineup>;
  starterlink: StarterLink;
};

export type EgtStarterLinkInput = {
  category?: InputMaybe<Scalars['Int']['input']>;
  divisionID?: InputMaybe<Scalars['ID']['input']>;
  divisionNumber?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  lineupID?: InputMaybe<Scalars['ID']['input']>;
  starterLinkID?: InputMaybe<Scalars['ID']['input']>;
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
  createEgtDivision: EgtDivision;
  createStarter: Starter;
  createStarterLink: StarterLink;
  createUser: User;
  egtStarterLink: EgtStarterLink;
  removeEgtDivision: EgtDivision;
  removeStarterLink: StarterLink;
  updateStarter: Starter;
  updateStarterLink: StarterLink;
};


export type MutationCreateClubArgs = {
  data: CreateClubInput;
};


export type MutationCreateCompetitionArgs = {
  competition: CreateCompetition;
};


export type MutationCreateEgtDivisionArgs = {
  data: CreateEgtDivisionInput;
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


export type MutationEgtStarterLinkArgs = {
  data: EgtStarterLinkInput;
};


export type MutationRemoveEgtDivisionArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveStarterLinkArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUpdateStarterArgs = {
  data: UpdateStarterInput;
  id: Scalars['ID']['input'];
};


export type MutationUpdateStarterLinkArgs = {
  data: UpdateStarterLinkInput;
  id: Scalars['ID']['input'];
};

export type Query = {
  __typename?: 'Query';
  clubs: Array<Club>;
  competition: Competition;
  competitions: Array<Competition>;
  egtDivision?: Maybe<EgtDivision>;
  egtDivisions: Array<EgtDivision>;
  egtLineup?: Maybe<EgtLineup>;
  egtStarterLink?: Maybe<EgtStarterLink>;
  egtStarterLinkUnassigned: Array<EgtStarterLink>;
  grades: Array<Grade>;
  starterLink?: Maybe<StarterLink>;
  starterLinks: Array<StarterLink>;
  starters: Array<Starter>;
  users: Array<User>;
};


export type QueryCompetitionArgs = {
  id: Scalars['ID']['input'];
};


export type QueryEgtDivisionArgs = {
  id: Scalars['ID']['input'];
};


export type QueryEgtDivisionsArgs = {
  filter: EgtDivisionFilterInput;
};


export type QueryEgtLineupArgs = {
  id: Scalars['ID']['input'];
};


export type QueryEgtStarterLinkArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  starterLinkID?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryEgtStarterLinkUnassignedArgs = {
  divisionID: Scalars['ID']['input'];
};


export type QueryStarterLinkArgs = {
  id: Scalars['ID']['input'];
};


export type QueryStarterLinksArgs = {
  competitionID: Scalars['ID']['input'];
  sex?: InputMaybe<Scalars['String']['input']>;
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
  competitionID?: InputMaybe<Scalars['ID']['input']>;
  firstname?: InputMaybe<Scalars['String']['input']>;
  lastname?: InputMaybe<Scalars['String']['input']>;
  sex?: InputMaybe<Sex>;
  stvID?: InputMaybe<Scalars['String']['input']>;
};

export type StarterLink = {
  __typename?: 'StarterLink';
  club: Club;
  competition: Competition;
  egt?: Maybe<EgtStarterLink>;
  id: Scalars['ID']['output'];
  starter: Starter;
};

export type UpdateStarterInput = {
  birthyear?: InputMaybe<Scalars['Int']['input']>;
  firstname?: InputMaybe<Scalars['String']['input']>;
  lastname?: InputMaybe<Scalars['String']['input']>;
  sex?: InputMaybe<Sex>;
  stvID?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateStarterLinkInput = {
  clubID: Scalars['ID']['input'];
  competitionID: Scalars['ID']['input'];
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


export type CreateStarterLinkMutation = { __typename?: 'Mutation', createStarterLink: { __typename?: 'StarterLink', id: string, starter: { __typename?: 'Starter', id: string } } };

export type StartersAutocompleteQueryVariables = Exact<{
  filter: StarterFilter;
}>;


export type StartersAutocompleteQuery = { __typename?: 'Query', starters: Array<{ __typename?: 'Starter', id: string, firstname: string, lastname: string, birthyear: number, stvID?: string | null, sex: Sex }> };

export type UpdateStarterMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: UpdateStarterInput;
}>;


export type UpdateStarterMutation = { __typename?: 'Mutation', updateStarter: { __typename?: 'Starter', id: string } };

export type UpdateStarterLinkMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: UpdateStarterLinkInput;
}>;


export type UpdateStarterLinkMutation = { __typename?: 'Mutation', updateStarterLink: { __typename?: 'StarterLink', id: string } };

export type StarterLinkQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type StarterLinkQuery = { __typename?: 'Query', starterLink?: { __typename?: 'StarterLink', id: string, competition: { __typename?: 'Competition', id: string }, starter: { __typename?: 'Starter', id: string, stvID?: string | null, firstname: string, lastname: string, sex: Sex, birthyear: number }, club: { __typename?: 'Club', id: string, name: string } } | null };

export type ModulesQueryVariables = Exact<{
  competitionID: Scalars['ID']['input'];
}>;


export type ModulesQuery = { __typename?: 'Query', competition: { __typename?: 'Competition', id: string, modules: Array<string> } };

export type CompetitionNameQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type CompetitionNameQuery = { __typename?: 'Query', competition: { __typename?: 'Competition', name: string } };

export type EgtLineupQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type EgtLineupQuery = { __typename?: 'Query', egtLineup?: { __typename?: 'EGTLineup', id: string, device: string, starterlinks: Array<{ __typename?: 'EGTStarterLink', id: string, starterlink: { __typename?: 'StarterLink', id: string, starter: { __typename?: 'Starter', id: string, firstname: string, lastname: string, birthyear: number }, club: { __typename?: 'Club', id: string, name: string } } }> } | null };

export type AssignEgtLineupMutationVariables = Exact<{
  data: EgtStarterLinkInput;
}>;


export type AssignEgtLineupMutation = { __typename?: 'Mutation', egtStarterLink: { __typename?: 'EGTStarterLink', id: string } };

export type CompetitionGroundsQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type CompetitionGroundsQuery = { __typename?: 'Query', competition: { __typename?: 'Competition', id: string, grounds: number } };

export type CreateEgtDivisionMutationVariables = Exact<{
  data: CreateEgtDivisionInput;
}>;


export type CreateEgtDivisionMutation = { __typename?: 'Mutation', createEgtDivision: { __typename?: 'EGTDivision', id: string } };

export type EgtStarterLinkMutationMutationVariables = Exact<{
  data: EgtStarterLinkInput;
}>;


export type EgtStarterLinkMutationMutation = { __typename?: 'Mutation', egtStarterLink: { __typename?: 'EGTStarterLink', id: string, category?: number | null } };

export type EgtStarterLinkQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']['input']>;
  starterLinkID?: InputMaybe<Scalars['ID']['input']>;
}>;


export type EgtStarterLinkQuery = { __typename?: 'Query', egtStarterLink?: { __typename?: 'EGTStarterLink', id: string, category?: number | null, division?: { __typename?: 'EGTDivision', id: string } | null } | null };

export type EgtDivisionsUpdateStarterFormQueryVariables = Exact<{
  filter: EgtDivisionFilterInput;
}>;


export type EgtDivisionsUpdateStarterFormQuery = { __typename?: 'Query', egtDivisions: Array<{ __typename?: 'EGTDivision', id: string, number: number, ground: number }> };

export type EgtDivisionQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type EgtDivisionQuery = { __typename?: 'Query', egtDivision?: { __typename?: 'EGTDivision', id: string, category: number, ground: number, currentRound: number, totalRounds: number, sex: Sex, number: number, lineups: Array<{ __typename?: 'EGTLineup', id: string, device: string }> } | null };

export type EgtStarterLinkUnassignedQueryVariables = Exact<{
  divisionID: Scalars['ID']['input'];
}>;


export type EgtStarterLinkUnassignedQuery = { __typename?: 'Query', egtStarterLinkUnassigned: Array<{ __typename?: 'EGTStarterLink', id: string, starterlink: { __typename?: 'StarterLink', id: string, starter: { __typename?: 'Starter', id: string, firstname: string, lastname: string, birthyear: number }, club: { __typename?: 'Club', id: string, name: string } } }> };

export type EgtDivisionsQueryVariables = Exact<{
  competitionID: Scalars['ID']['input'];
}>;


export type EgtDivisionsQuery = { __typename?: 'Query', egtDivisions: Array<{ __typename?: 'EGTDivision', id: string, ground: number, state: EgtDivisionStates, currentRound: number, totalRounds: number, category: number, sex: Sex, number: number }> };

export type RemoveEgtDivisionMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type RemoveEgtDivisionMutation = { __typename?: 'Mutation', removeEgtDivision: { __typename?: 'EGTDivision', id: string } };

export type StarterLinksQueryVariables = Exact<{
  competitionID: Scalars['ID']['input'];
  sex?: InputMaybe<Scalars['String']['input']>;
}>;


export type StarterLinksQuery = { __typename?: 'Query', starterLinks: Array<{ __typename?: 'StarterLink', id: string, starter: { __typename?: 'Starter', id: string, firstname: string, lastname: string, birthyear: number, stvID?: string | null, sex: Sex }, club: { __typename?: 'Club', id: string, name: string } }> };

export type RemoveStarterLinkMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type RemoveStarterLinkMutation = { __typename?: 'Mutation', removeStarterLink: { __typename?: 'StarterLink', id: string } };

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
    starter {
      id
    }
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
export const UpdateStarterDocument = gql`
    mutation updateStarter($id: ID!, $input: UpdateStarterInput!) {
  updateStarter(id: $id, data: $input) {
    id
  }
}
    `;
export type UpdateStarterMutationFn = Apollo.MutationFunction<UpdateStarterMutation, UpdateStarterMutationVariables>;

/**
 * __useUpdateStarterMutation__
 *
 * To run a mutation, you first call `useUpdateStarterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateStarterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateStarterMutation, { data, loading, error }] = useUpdateStarterMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateStarterMutation(baseOptions?: Apollo.MutationHookOptions<UpdateStarterMutation, UpdateStarterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateStarterMutation, UpdateStarterMutationVariables>(UpdateStarterDocument, options);
      }
export type UpdateStarterMutationHookResult = ReturnType<typeof useUpdateStarterMutation>;
export type UpdateStarterMutationResult = Apollo.MutationResult<UpdateStarterMutation>;
export type UpdateStarterMutationOptions = Apollo.BaseMutationOptions<UpdateStarterMutation, UpdateStarterMutationVariables>;
export const UpdateStarterLinkDocument = gql`
    mutation updateStarterLink($id: ID!, $input: UpdateStarterLinkInput!) {
  updateStarterLink(id: $id, data: $input) {
    id
  }
}
    `;
export type UpdateStarterLinkMutationFn = Apollo.MutationFunction<UpdateStarterLinkMutation, UpdateStarterLinkMutationVariables>;

/**
 * __useUpdateStarterLinkMutation__
 *
 * To run a mutation, you first call `useUpdateStarterLinkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateStarterLinkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateStarterLinkMutation, { data, loading, error }] = useUpdateStarterLinkMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateStarterLinkMutation(baseOptions?: Apollo.MutationHookOptions<UpdateStarterLinkMutation, UpdateStarterLinkMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateStarterLinkMutation, UpdateStarterLinkMutationVariables>(UpdateStarterLinkDocument, options);
      }
export type UpdateStarterLinkMutationHookResult = ReturnType<typeof useUpdateStarterLinkMutation>;
export type UpdateStarterLinkMutationResult = Apollo.MutationResult<UpdateStarterLinkMutation>;
export type UpdateStarterLinkMutationOptions = Apollo.BaseMutationOptions<UpdateStarterLinkMutation, UpdateStarterLinkMutationVariables>;
export const StarterLinkDocument = gql`
    query starterLink($id: ID!) {
  starterLink(id: $id) {
    id
    competition {
      id
    }
    starter {
      id
      stvID
      firstname
      lastname
      sex
      birthyear
    }
    club {
      id
      name
    }
  }
}
    `;

/**
 * __useStarterLinkQuery__
 *
 * To run a query within a React component, call `useStarterLinkQuery` and pass it any options that fit your needs.
 * When your component renders, `useStarterLinkQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStarterLinkQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useStarterLinkQuery(baseOptions: Apollo.QueryHookOptions<StarterLinkQuery, StarterLinkQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<StarterLinkQuery, StarterLinkQueryVariables>(StarterLinkDocument, options);
      }
export function useStarterLinkLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<StarterLinkQuery, StarterLinkQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<StarterLinkQuery, StarterLinkQueryVariables>(StarterLinkDocument, options);
        }
export function useStarterLinkSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<StarterLinkQuery, StarterLinkQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<StarterLinkQuery, StarterLinkQueryVariables>(StarterLinkDocument, options);
        }
export type StarterLinkQueryHookResult = ReturnType<typeof useStarterLinkQuery>;
export type StarterLinkLazyQueryHookResult = ReturnType<typeof useStarterLinkLazyQuery>;
export type StarterLinkSuspenseQueryHookResult = ReturnType<typeof useStarterLinkSuspenseQuery>;
export type StarterLinkQueryResult = Apollo.QueryResult<StarterLinkQuery, StarterLinkQueryVariables>;
export const ModulesDocument = gql`
    query modules($competitionID: ID!) {
  competition(id: $competitionID) {
    id
    modules
  }
}
    `;

/**
 * __useModulesQuery__
 *
 * To run a query within a React component, call `useModulesQuery` and pass it any options that fit your needs.
 * When your component renders, `useModulesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useModulesQuery({
 *   variables: {
 *      competitionID: // value for 'competitionID'
 *   },
 * });
 */
export function useModulesQuery(baseOptions: Apollo.QueryHookOptions<ModulesQuery, ModulesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ModulesQuery, ModulesQueryVariables>(ModulesDocument, options);
      }
export function useModulesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ModulesQuery, ModulesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ModulesQuery, ModulesQueryVariables>(ModulesDocument, options);
        }
export function useModulesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ModulesQuery, ModulesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ModulesQuery, ModulesQueryVariables>(ModulesDocument, options);
        }
export type ModulesQueryHookResult = ReturnType<typeof useModulesQuery>;
export type ModulesLazyQueryHookResult = ReturnType<typeof useModulesLazyQuery>;
export type ModulesSuspenseQueryHookResult = ReturnType<typeof useModulesSuspenseQuery>;
export type ModulesQueryResult = Apollo.QueryResult<ModulesQuery, ModulesQueryVariables>;
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
export const EgtLineupDocument = gql`
    query egtLineup($id: ID!) {
  egtLineup(id: $id) {
    id
    device
    starterlinks {
      id
      starterlink {
        id
        starter {
          id
          firstname
          lastname
          birthyear
        }
        club {
          id
          name
        }
      }
    }
  }
}
    `;

/**
 * __useEgtLineupQuery__
 *
 * To run a query within a React component, call `useEgtLineupQuery` and pass it any options that fit your needs.
 * When your component renders, `useEgtLineupQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEgtLineupQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useEgtLineupQuery(baseOptions: Apollo.QueryHookOptions<EgtLineupQuery, EgtLineupQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EgtLineupQuery, EgtLineupQueryVariables>(EgtLineupDocument, options);
      }
export function useEgtLineupLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EgtLineupQuery, EgtLineupQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EgtLineupQuery, EgtLineupQueryVariables>(EgtLineupDocument, options);
        }
export function useEgtLineupSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<EgtLineupQuery, EgtLineupQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<EgtLineupQuery, EgtLineupQueryVariables>(EgtLineupDocument, options);
        }
export type EgtLineupQueryHookResult = ReturnType<typeof useEgtLineupQuery>;
export type EgtLineupLazyQueryHookResult = ReturnType<typeof useEgtLineupLazyQuery>;
export type EgtLineupSuspenseQueryHookResult = ReturnType<typeof useEgtLineupSuspenseQuery>;
export type EgtLineupQueryResult = Apollo.QueryResult<EgtLineupQuery, EgtLineupQueryVariables>;
export const AssignEgtLineupDocument = gql`
    mutation assignEgtLineup($data: EGTStarterLinkInput!) {
  egtStarterLink(data: $data) {
    id
  }
}
    `;
export type AssignEgtLineupMutationFn = Apollo.MutationFunction<AssignEgtLineupMutation, AssignEgtLineupMutationVariables>;

/**
 * __useAssignEgtLineupMutation__
 *
 * To run a mutation, you first call `useAssignEgtLineupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAssignEgtLineupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [assignEgtLineupMutation, { data, loading, error }] = useAssignEgtLineupMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useAssignEgtLineupMutation(baseOptions?: Apollo.MutationHookOptions<AssignEgtLineupMutation, AssignEgtLineupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AssignEgtLineupMutation, AssignEgtLineupMutationVariables>(AssignEgtLineupDocument, options);
      }
export type AssignEgtLineupMutationHookResult = ReturnType<typeof useAssignEgtLineupMutation>;
export type AssignEgtLineupMutationResult = Apollo.MutationResult<AssignEgtLineupMutation>;
export type AssignEgtLineupMutationOptions = Apollo.BaseMutationOptions<AssignEgtLineupMutation, AssignEgtLineupMutationVariables>;
export const CompetitionGroundsDocument = gql`
    query competitionGrounds($id: ID!) {
  competition(id: $id) {
    id
    grounds
  }
}
    `;

/**
 * __useCompetitionGroundsQuery__
 *
 * To run a query within a React component, call `useCompetitionGroundsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCompetitionGroundsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCompetitionGroundsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCompetitionGroundsQuery(baseOptions: Apollo.QueryHookOptions<CompetitionGroundsQuery, CompetitionGroundsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CompetitionGroundsQuery, CompetitionGroundsQueryVariables>(CompetitionGroundsDocument, options);
      }
export function useCompetitionGroundsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CompetitionGroundsQuery, CompetitionGroundsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CompetitionGroundsQuery, CompetitionGroundsQueryVariables>(CompetitionGroundsDocument, options);
        }
export function useCompetitionGroundsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<CompetitionGroundsQuery, CompetitionGroundsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CompetitionGroundsQuery, CompetitionGroundsQueryVariables>(CompetitionGroundsDocument, options);
        }
export type CompetitionGroundsQueryHookResult = ReturnType<typeof useCompetitionGroundsQuery>;
export type CompetitionGroundsLazyQueryHookResult = ReturnType<typeof useCompetitionGroundsLazyQuery>;
export type CompetitionGroundsSuspenseQueryHookResult = ReturnType<typeof useCompetitionGroundsSuspenseQuery>;
export type CompetitionGroundsQueryResult = Apollo.QueryResult<CompetitionGroundsQuery, CompetitionGroundsQueryVariables>;
export const CreateEgtDivisionDocument = gql`
    mutation createEgtDivision($data: CreateEGTDivisionInput!) {
  createEgtDivision(data: $data) {
    id
  }
}
    `;
export type CreateEgtDivisionMutationFn = Apollo.MutationFunction<CreateEgtDivisionMutation, CreateEgtDivisionMutationVariables>;

/**
 * __useCreateEgtDivisionMutation__
 *
 * To run a mutation, you first call `useCreateEgtDivisionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateEgtDivisionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createEgtDivisionMutation, { data, loading, error }] = useCreateEgtDivisionMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateEgtDivisionMutation(baseOptions?: Apollo.MutationHookOptions<CreateEgtDivisionMutation, CreateEgtDivisionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateEgtDivisionMutation, CreateEgtDivisionMutationVariables>(CreateEgtDivisionDocument, options);
      }
export type CreateEgtDivisionMutationHookResult = ReturnType<typeof useCreateEgtDivisionMutation>;
export type CreateEgtDivisionMutationResult = Apollo.MutationResult<CreateEgtDivisionMutation>;
export type CreateEgtDivisionMutationOptions = Apollo.BaseMutationOptions<CreateEgtDivisionMutation, CreateEgtDivisionMutationVariables>;
export const EgtStarterLinkMutationDocument = gql`
    mutation egtStarterLinkMutation($data: EGTStarterLinkInput!) {
  egtStarterLink(data: $data) {
    id
    category
  }
}
    `;
export type EgtStarterLinkMutationMutationFn = Apollo.MutationFunction<EgtStarterLinkMutationMutation, EgtStarterLinkMutationMutationVariables>;

/**
 * __useEgtStarterLinkMutationMutation__
 *
 * To run a mutation, you first call `useEgtStarterLinkMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEgtStarterLinkMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [egtStarterLinkMutationMutation, { data, loading, error }] = useEgtStarterLinkMutationMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useEgtStarterLinkMutationMutation(baseOptions?: Apollo.MutationHookOptions<EgtStarterLinkMutationMutation, EgtStarterLinkMutationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EgtStarterLinkMutationMutation, EgtStarterLinkMutationMutationVariables>(EgtStarterLinkMutationDocument, options);
      }
export type EgtStarterLinkMutationMutationHookResult = ReturnType<typeof useEgtStarterLinkMutationMutation>;
export type EgtStarterLinkMutationMutationResult = Apollo.MutationResult<EgtStarterLinkMutationMutation>;
export type EgtStarterLinkMutationMutationOptions = Apollo.BaseMutationOptions<EgtStarterLinkMutationMutation, EgtStarterLinkMutationMutationVariables>;
export const EgtStarterLinkDocument = gql`
    query egtStarterLink($id: ID, $starterLinkID: ID) {
  egtStarterLink(id: $id, starterLinkID: $starterLinkID) {
    id
    category
    division {
      id
    }
  }
}
    `;

/**
 * __useEgtStarterLinkQuery__
 *
 * To run a query within a React component, call `useEgtStarterLinkQuery` and pass it any options that fit your needs.
 * When your component renders, `useEgtStarterLinkQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEgtStarterLinkQuery({
 *   variables: {
 *      id: // value for 'id'
 *      starterLinkID: // value for 'starterLinkID'
 *   },
 * });
 */
export function useEgtStarterLinkQuery(baseOptions?: Apollo.QueryHookOptions<EgtStarterLinkQuery, EgtStarterLinkQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EgtStarterLinkQuery, EgtStarterLinkQueryVariables>(EgtStarterLinkDocument, options);
      }
export function useEgtStarterLinkLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EgtStarterLinkQuery, EgtStarterLinkQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EgtStarterLinkQuery, EgtStarterLinkQueryVariables>(EgtStarterLinkDocument, options);
        }
export function useEgtStarterLinkSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<EgtStarterLinkQuery, EgtStarterLinkQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<EgtStarterLinkQuery, EgtStarterLinkQueryVariables>(EgtStarterLinkDocument, options);
        }
export type EgtStarterLinkQueryHookResult = ReturnType<typeof useEgtStarterLinkQuery>;
export type EgtStarterLinkLazyQueryHookResult = ReturnType<typeof useEgtStarterLinkLazyQuery>;
export type EgtStarterLinkSuspenseQueryHookResult = ReturnType<typeof useEgtStarterLinkSuspenseQuery>;
export type EgtStarterLinkQueryResult = Apollo.QueryResult<EgtStarterLinkQuery, EgtStarterLinkQueryVariables>;
export const EgtDivisionsUpdateStarterFormDocument = gql`
    query egtDivisionsUpdateStarterForm($filter: EGTDivisionFilterInput!) {
  egtDivisions(filter: $filter) {
    id
    number
    ground
  }
}
    `;

/**
 * __useEgtDivisionsUpdateStarterFormQuery__
 *
 * To run a query within a React component, call `useEgtDivisionsUpdateStarterFormQuery` and pass it any options that fit your needs.
 * When your component renders, `useEgtDivisionsUpdateStarterFormQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEgtDivisionsUpdateStarterFormQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useEgtDivisionsUpdateStarterFormQuery(baseOptions: Apollo.QueryHookOptions<EgtDivisionsUpdateStarterFormQuery, EgtDivisionsUpdateStarterFormQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EgtDivisionsUpdateStarterFormQuery, EgtDivisionsUpdateStarterFormQueryVariables>(EgtDivisionsUpdateStarterFormDocument, options);
      }
export function useEgtDivisionsUpdateStarterFormLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EgtDivisionsUpdateStarterFormQuery, EgtDivisionsUpdateStarterFormQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EgtDivisionsUpdateStarterFormQuery, EgtDivisionsUpdateStarterFormQueryVariables>(EgtDivisionsUpdateStarterFormDocument, options);
        }
export function useEgtDivisionsUpdateStarterFormSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<EgtDivisionsUpdateStarterFormQuery, EgtDivisionsUpdateStarterFormQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<EgtDivisionsUpdateStarterFormQuery, EgtDivisionsUpdateStarterFormQueryVariables>(EgtDivisionsUpdateStarterFormDocument, options);
        }
export type EgtDivisionsUpdateStarterFormQueryHookResult = ReturnType<typeof useEgtDivisionsUpdateStarterFormQuery>;
export type EgtDivisionsUpdateStarterFormLazyQueryHookResult = ReturnType<typeof useEgtDivisionsUpdateStarterFormLazyQuery>;
export type EgtDivisionsUpdateStarterFormSuspenseQueryHookResult = ReturnType<typeof useEgtDivisionsUpdateStarterFormSuspenseQuery>;
export type EgtDivisionsUpdateStarterFormQueryResult = Apollo.QueryResult<EgtDivisionsUpdateStarterFormQuery, EgtDivisionsUpdateStarterFormQueryVariables>;
export const EgtDivisionDocument = gql`
    query egtDivision($id: ID!) {
  egtDivision(id: $id) {
    id
    category
    ground
    currentRound
    totalRounds
    sex
    number
    lineups {
      id
      device
    }
  }
}
    `;

/**
 * __useEgtDivisionQuery__
 *
 * To run a query within a React component, call `useEgtDivisionQuery` and pass it any options that fit your needs.
 * When your component renders, `useEgtDivisionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEgtDivisionQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useEgtDivisionQuery(baseOptions: Apollo.QueryHookOptions<EgtDivisionQuery, EgtDivisionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EgtDivisionQuery, EgtDivisionQueryVariables>(EgtDivisionDocument, options);
      }
export function useEgtDivisionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EgtDivisionQuery, EgtDivisionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EgtDivisionQuery, EgtDivisionQueryVariables>(EgtDivisionDocument, options);
        }
export function useEgtDivisionSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<EgtDivisionQuery, EgtDivisionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<EgtDivisionQuery, EgtDivisionQueryVariables>(EgtDivisionDocument, options);
        }
export type EgtDivisionQueryHookResult = ReturnType<typeof useEgtDivisionQuery>;
export type EgtDivisionLazyQueryHookResult = ReturnType<typeof useEgtDivisionLazyQuery>;
export type EgtDivisionSuspenseQueryHookResult = ReturnType<typeof useEgtDivisionSuspenseQuery>;
export type EgtDivisionQueryResult = Apollo.QueryResult<EgtDivisionQuery, EgtDivisionQueryVariables>;
export const EgtStarterLinkUnassignedDocument = gql`
    query egtStarterLinkUnassigned($divisionID: ID!) {
  egtStarterLinkUnassigned(divisionID: $divisionID) {
    id
    starterlink {
      id
      starter {
        id
        firstname
        lastname
        birthyear
      }
      club {
        id
        name
      }
    }
  }
}
    `;

/**
 * __useEgtStarterLinkUnassignedQuery__
 *
 * To run a query within a React component, call `useEgtStarterLinkUnassignedQuery` and pass it any options that fit your needs.
 * When your component renders, `useEgtStarterLinkUnassignedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEgtStarterLinkUnassignedQuery({
 *   variables: {
 *      divisionID: // value for 'divisionID'
 *   },
 * });
 */
export function useEgtStarterLinkUnassignedQuery(baseOptions: Apollo.QueryHookOptions<EgtStarterLinkUnassignedQuery, EgtStarterLinkUnassignedQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EgtStarterLinkUnassignedQuery, EgtStarterLinkUnassignedQueryVariables>(EgtStarterLinkUnassignedDocument, options);
      }
export function useEgtStarterLinkUnassignedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EgtStarterLinkUnassignedQuery, EgtStarterLinkUnassignedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EgtStarterLinkUnassignedQuery, EgtStarterLinkUnassignedQueryVariables>(EgtStarterLinkUnassignedDocument, options);
        }
export function useEgtStarterLinkUnassignedSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<EgtStarterLinkUnassignedQuery, EgtStarterLinkUnassignedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<EgtStarterLinkUnassignedQuery, EgtStarterLinkUnassignedQueryVariables>(EgtStarterLinkUnassignedDocument, options);
        }
export type EgtStarterLinkUnassignedQueryHookResult = ReturnType<typeof useEgtStarterLinkUnassignedQuery>;
export type EgtStarterLinkUnassignedLazyQueryHookResult = ReturnType<typeof useEgtStarterLinkUnassignedLazyQuery>;
export type EgtStarterLinkUnassignedSuspenseQueryHookResult = ReturnType<typeof useEgtStarterLinkUnassignedSuspenseQuery>;
export type EgtStarterLinkUnassignedQueryResult = Apollo.QueryResult<EgtStarterLinkUnassignedQuery, EgtStarterLinkUnassignedQueryVariables>;
export const EgtDivisionsDocument = gql`
    query egtDivisions($competitionID: ID!) {
  egtDivisions(filter: {competitionID: $competitionID}) {
    id
    ground
    state
    currentRound
    totalRounds
    category
    sex
    number
  }
}
    `;

/**
 * __useEgtDivisionsQuery__
 *
 * To run a query within a React component, call `useEgtDivisionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useEgtDivisionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEgtDivisionsQuery({
 *   variables: {
 *      competitionID: // value for 'competitionID'
 *   },
 * });
 */
export function useEgtDivisionsQuery(baseOptions: Apollo.QueryHookOptions<EgtDivisionsQuery, EgtDivisionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EgtDivisionsQuery, EgtDivisionsQueryVariables>(EgtDivisionsDocument, options);
      }
export function useEgtDivisionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EgtDivisionsQuery, EgtDivisionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EgtDivisionsQuery, EgtDivisionsQueryVariables>(EgtDivisionsDocument, options);
        }
export function useEgtDivisionsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<EgtDivisionsQuery, EgtDivisionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<EgtDivisionsQuery, EgtDivisionsQueryVariables>(EgtDivisionsDocument, options);
        }
export type EgtDivisionsQueryHookResult = ReturnType<typeof useEgtDivisionsQuery>;
export type EgtDivisionsLazyQueryHookResult = ReturnType<typeof useEgtDivisionsLazyQuery>;
export type EgtDivisionsSuspenseQueryHookResult = ReturnType<typeof useEgtDivisionsSuspenseQuery>;
export type EgtDivisionsQueryResult = Apollo.QueryResult<EgtDivisionsQuery, EgtDivisionsQueryVariables>;
export const RemoveEgtDivisionDocument = gql`
    mutation removeEgtDivision($id: ID!) {
  removeEgtDivision(id: $id) {
    id
  }
}
    `;
export type RemoveEgtDivisionMutationFn = Apollo.MutationFunction<RemoveEgtDivisionMutation, RemoveEgtDivisionMutationVariables>;

/**
 * __useRemoveEgtDivisionMutation__
 *
 * To run a mutation, you first call `useRemoveEgtDivisionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveEgtDivisionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeEgtDivisionMutation, { data, loading, error }] = useRemoveEgtDivisionMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveEgtDivisionMutation(baseOptions?: Apollo.MutationHookOptions<RemoveEgtDivisionMutation, RemoveEgtDivisionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveEgtDivisionMutation, RemoveEgtDivisionMutationVariables>(RemoveEgtDivisionDocument, options);
      }
export type RemoveEgtDivisionMutationHookResult = ReturnType<typeof useRemoveEgtDivisionMutation>;
export type RemoveEgtDivisionMutationResult = Apollo.MutationResult<RemoveEgtDivisionMutation>;
export type RemoveEgtDivisionMutationOptions = Apollo.BaseMutationOptions<RemoveEgtDivisionMutation, RemoveEgtDivisionMutationVariables>;
export const StarterLinksDocument = gql`
    query starterLinks($competitionID: ID!, $sex: String) {
  starterLinks(competitionID: $competitionID, sex: $sex) {
    id
    starter {
      id
      firstname
      lastname
      birthyear
      stvID
      sex
    }
    club {
      id
      name
    }
  }
}
    `;

/**
 * __useStarterLinksQuery__
 *
 * To run a query within a React component, call `useStarterLinksQuery` and pass it any options that fit your needs.
 * When your component renders, `useStarterLinksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStarterLinksQuery({
 *   variables: {
 *      competitionID: // value for 'competitionID'
 *      sex: // value for 'sex'
 *   },
 * });
 */
export function useStarterLinksQuery(baseOptions: Apollo.QueryHookOptions<StarterLinksQuery, StarterLinksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<StarterLinksQuery, StarterLinksQueryVariables>(StarterLinksDocument, options);
      }
export function useStarterLinksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<StarterLinksQuery, StarterLinksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<StarterLinksQuery, StarterLinksQueryVariables>(StarterLinksDocument, options);
        }
export function useStarterLinksSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<StarterLinksQuery, StarterLinksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<StarterLinksQuery, StarterLinksQueryVariables>(StarterLinksDocument, options);
        }
export type StarterLinksQueryHookResult = ReturnType<typeof useStarterLinksQuery>;
export type StarterLinksLazyQueryHookResult = ReturnType<typeof useStarterLinksLazyQuery>;
export type StarterLinksSuspenseQueryHookResult = ReturnType<typeof useStarterLinksSuspenseQuery>;
export type StarterLinksQueryResult = Apollo.QueryResult<StarterLinksQuery, StarterLinksQueryVariables>;
export const RemoveStarterLinkDocument = gql`
    mutation removeStarterLink($id: ID!) {
  removeStarterLink(id: $id) {
    id
  }
}
    `;
export type RemoveStarterLinkMutationFn = Apollo.MutationFunction<RemoveStarterLinkMutation, RemoveStarterLinkMutationVariables>;

/**
 * __useRemoveStarterLinkMutation__
 *
 * To run a mutation, you first call `useRemoveStarterLinkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveStarterLinkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeStarterLinkMutation, { data, loading, error }] = useRemoveStarterLinkMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveStarterLinkMutation(baseOptions?: Apollo.MutationHookOptions<RemoveStarterLinkMutation, RemoveStarterLinkMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveStarterLinkMutation, RemoveStarterLinkMutationVariables>(RemoveStarterLinkDocument, options);
      }
export type RemoveStarterLinkMutationHookResult = ReturnType<typeof useRemoveStarterLinkMutation>;
export type RemoveStarterLinkMutationResult = Apollo.MutationResult<RemoveStarterLinkMutation>;
export type RemoveStarterLinkMutationOptions = Apollo.BaseMutationOptions<RemoveStarterLinkMutation, RemoveStarterLinkMutationVariables>;
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