/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** `Date` type as integer. Type represents date and time as number of milliseconds from start of UNIX epoch. */
  Timestamp: { input: any; output: any; }
  /** Upload files */
  Upload: { input: any; output: any; }
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
  logo?: Maybe<Scalars['String']['output']>;
  modules: Array<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  startDate: Scalars['Timestamp']['output'];
  stats: CompetitionStats;
};

export type CompetitionStats = {
  __typename?: 'CompetitionStats';
  clubs: Scalars['Int']['output'];
  grades: Scalars['Int']['output'];
  starters: Scalars['Int']['output'];
};

export type CreateClubInput = {
  location: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type CreateCompetitionInput = {
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
  language: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type EgtCategorySettings = {
  __typename?: 'EGTCategorySettings';
  category: Scalars['Int']['output'];
  coverPage?: Maybe<Scalars['String']['output']>;
  honourPrecentage: Scalars['Int']['output'];
  sex: Sex;
};

export type EgtCategorySettingsInput = {
  category: Scalars['Int']['input'];
  coverPage?: InputMaybe<Scalars['String']['input']>;
  honourPrecentage: Scalars['Int']['input'];
  sex: Sex;
};

export type EgtDevice = {
  __typename?: 'EGTDevice';
  aggregationMode: EgtDeviceAggregationMode;
  deviceNumber: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  inputs: Scalars['Int']['output'];
  overrides: Array<EgtDeviceOverride>;
};

export enum EgtDeviceAggregationMode {
  Avg = 'AVG',
  Max = 'MAX',
  Min = 'MIN',
  None = 'NONE'
}

export type EgtDeviceOverride = {
  __typename?: 'EGTDeviceOverride';
  aggregationMode: EgtDeviceAggregationMode;
  category: Scalars['Int']['output'];
  inputs: Scalars['Int']['output'];
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
  totalStarters: Scalars['Int']['output'];
};

export type EgtDivisionFilterInput = {
  category?: InputMaybe<Scalars['Int']['input']>;
  competitionID: Scalars['ID']['input'];
  ground?: InputMaybe<Scalars['Int']['input']>;
  ids?: InputMaybe<Array<Scalars['ID']['input']>>;
  sex?: InputMaybe<Sex>;
  state?: InputMaybe<EgtDivisionStates>;
};

export enum EgtDivisionStates {
  Ended = 'ENDED',
  Pending = 'PENDING',
  Running = 'RUNNING'
}

export type EgtJudgingDevice = {
  __typename?: 'EGTJudgingDevice';
  device: EgtDevice;
  lineups: Array<EgtLineup>;
  round: Scalars['Int']['output'];
  starterslist: Array<EgtStarterLink>;
};

export type EgtLineup = {
  __typename?: 'EGTLineup';
  currentRound: Scalars['Int']['output'];
  device: EgtDevice;
  id: Scalars['ID']['output'];
  starterlinks: Array<EgtStarterLink>;
};

export type EgtSettings = {
  __typename?: 'EGTSettings';
  categorySettings: Array<EgtCategorySettings>;
  id: Scalars['ID']['output'];
};

export type EgtSettingsInput = {
  categorySettings: Array<EgtCategorySettingsInput>;
  id?: InputMaybe<Scalars['ID']['input']>;
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

export type EgtStarterRanking = {
  __typename?: 'EGTStarterRanking';
  award: Scalars['String']['output'];
  egtStarterlink: EgtStarterLink;
  grades: Array<Grade>;
  rank: Scalars['Int']['output'];
  total: Scalars['Float']['output'];
};

export type Grade = {
  __typename?: 'Grade';
  deviceNumber: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  starterlink: StarterLink;
  value: Scalars['Float']['output'];
};

export type GradeInput = {
  deviceNumber: Scalars['Int']['input'];
  module: Scalars['String']['input'];
  starterlinkId: Scalars['ID']['input'];
  value: Scalars['Float']['input'];
};

export type Judgetoken = {
  __typename?: 'Judgetoken';
  device: Scalars['Int']['output'];
  ground: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  token: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addGrades: Array<Grade>;
  competitionLogo: Competition;
  createClub: Club;
  createCompetition: Competition;
  createEgtDivision: EgtDivision;
  createStarter: Starter;
  createStarterLink: StarterLink;
  createUser: User;
  egtCategorySettings: EgtCategorySettings;
  egtLineupAdvanceRound: EgtLineup;
  egtLineupAdvanceRounds: Array<EgtLineup>;
  egtSettings: EgtSettings;
  egtStarterLink: EgtStarterLink;
  removeEgtDivision: EgtDivision;
  removeStarterLink: StarterLink;
  resetJudgeToken: Judgetoken;
  updateCompetition: Competition;
  updateEgtDivisionState: EgtDivision;
  updateStarter: Starter;
  updateStarterLink: StarterLink;
  updateUser: User;
  upsertStarterLink: StarterLink;
};


export type MutationAddGradesArgs = {
  grades: Array<GradeInput>;
};


export type MutationCompetitionLogoArgs = {
  id: Scalars['ID']['input'];
  logo: Scalars['Upload']['input'];
};


export type MutationCreateClubArgs = {
  data: CreateClubInput;
};


export type MutationCreateCompetitionArgs = {
  competition: CreateCompetitionInput;
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


export type MutationEgtCategorySettingsArgs = {
  competitionID: Scalars['ID']['input'];
  data: EgtCategorySettingsInput;
};


export type MutationEgtLineupAdvanceRoundArgs = {
  id: Scalars['ID']['input'];
  override?: InputMaybe<Scalars['Boolean']['input']>;
  round: Scalars['Int']['input'];
};


export type MutationEgtLineupAdvanceRoundsArgs = {
  ids: Array<Scalars['ID']['input']>;
  override?: InputMaybe<Scalars['Boolean']['input']>;
  round: Scalars['Int']['input'];
};


export type MutationEgtSettingsArgs = {
  competitionID?: InputMaybe<Scalars['ID']['input']>;
  data: EgtSettingsInput;
};


export type MutationEgtStarterLinkArgs = {
  data: EgtStarterLinkInput;
  ignoreDivision?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationRemoveEgtDivisionArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveStarterLinkArgs = {
  id: Scalars['ID']['input'];
};


export type MutationResetJudgeTokenArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUpdateCompetitionArgs = {
  data: UpdateCompetitionInput;
  id: Scalars['ID']['input'];
};


export type MutationUpdateEgtDivisionStateArgs = {
  data: UpdateEgtDivisionStateInput;
};


export type MutationUpdateStarterArgs = {
  data: UpdateStarterInput;
  id: Scalars['ID']['input'];
};


export type MutationUpdateStarterLinkArgs = {
  data: UpdateStarterLinkInput;
  id: Scalars['ID']['input'];
};


export type MutationUpdateUserArgs = {
  data: UpdateUserInput;
};


export type MutationUpsertStarterLinkArgs = {
  data: CreateStarterLinkInput;
};

export type Query = {
  __typename?: 'Query';
  clubs: Array<Club>;
  competition: Competition;
  competitions: Array<Competition>;
  currentUser?: Maybe<User>;
  egtCategorySettings: EgtCategorySettings;
  egtDevices: Array<EgtDevice>;
  egtDivision?: Maybe<EgtDivision>;
  egtDivisions: Array<EgtDivision>;
  egtJudgingDevice: EgtJudgingDevice;
  egtJudgingDevices: Array<EgtJudgingDevice>;
  egtLineup?: Maybe<EgtLineup>;
  egtSettings: EgtSettings;
  egtStarterLink?: Maybe<EgtStarterLink>;
  egtStarterLinkUnassigned: Array<EgtStarterLink>;
  egtStarterRankings: Array<EgtStarterRanking>;
  findJudgeToken?: Maybe<Judgetoken>;
  grades: Array<Grade>;
  judgeToken: Judgetoken;
  starterGrades: Array<Grade>;
  starterLink?: Maybe<StarterLink>;
  starterLinks: Array<StarterLink>;
  starters: Array<Starter>;
  users: Array<User>;
};


export type QueryCompetitionArgs = {
  id: Scalars['ID']['input'];
};


export type QueryEgtCategorySettingsArgs = {
  category: Scalars['Int']['input'];
  competitionID: Scalars['ID']['input'];
  sex: Sex;
};


export type QueryEgtDevicesArgs = {
  competitionID: Scalars['ID']['input'];
};


export type QueryEgtDivisionArgs = {
  id: Scalars['ID']['input'];
};


export type QueryEgtDivisionsArgs = {
  filter: EgtDivisionFilterInput;
};


export type QueryEgtJudgingDeviceArgs = {
  device: Scalars['Int']['input'];
  ids: Array<Scalars['ID']['input']>;
  round: Scalars['Int']['input'];
};


export type QueryEgtJudgingDevicesArgs = {
  ids: Array<Scalars['ID']['input']>;
  round: Scalars['Int']['input'];
};


export type QueryEgtLineupArgs = {
  id: Scalars['ID']['input'];
};


export type QueryEgtSettingsArgs = {
  competitionID: Scalars['ID']['input'];
};


export type QueryEgtStarterLinkArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  starterLinkID?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryEgtStarterLinkUnassignedArgs = {
  divisionID: Scalars['ID']['input'];
};


export type QueryEgtStarterRankingsArgs = {
  category: Scalars['Int']['input'];
  competitionID: Scalars['ID']['input'];
  sex: Sex;
};


export type QueryFindJudgeTokenArgs = {
  competitionID: Scalars['ID']['input'];
  create?: Scalars['Boolean']['input'];
  device: Scalars['Int']['input'];
  ground: Scalars['Int']['input'];
};


export type QueryJudgeTokenArgs = {
  id: Scalars['Int']['input'];
};


export type QueryStarterGradesArgs = {
  device?: InputMaybe<Scalars['Int']['input']>;
  starterlinkIds: Array<Scalars['ID']['input']>;
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

export enum Roles {
  Admin = 'ADMIN',
  Judge = 'JUDGE',
  Starter = 'STARTER',
  Viewer = 'VIEWER'
}

export enum Sex {
  Female = 'FEMALE',
  Male = 'MALE'
}

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

export type Subscription = {
  __typename?: 'Subscription';
  egtDivision: EgtDivision;
};


export type SubscriptionEgtDivisionArgs = {
  filter: EgtDivisionFilterInput;
};

export type UpdateCompetitionInput = {
  deleteLogo?: Scalars['Boolean']['input'];
  endDate?: InputMaybe<Scalars['Timestamp']['input']>;
  grounds?: InputMaybe<Scalars['Int']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  modules?: InputMaybe<Array<Scalars['String']['input']>>;
  name?: InputMaybe<Scalars['String']['input']>;
  startDate?: InputMaybe<Scalars['Timestamp']['input']>;
};

export type UpdateEgtDivisionStateInput = {
  currentRound: Scalars['Int']['input'];
  id: Scalars['ID']['input'];
  state: EgtDivisionStates;
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

export type UpdateUserInput = {
  email: Scalars['String']['input'];
  id: Scalars['ID']['input'];
  language: Scalars['String']['input'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  globalRole: Roles;
  id: Scalars['ID']['output'];
  language: Scalars['String']['output'];
};

export type DeviceGradingDivisionFragmentFragment = { __typename?: 'EGTDivision', id: string, totalRounds: number, currentRound: number, state: EgtDivisionStates } & { ' $fragmentName'?: 'DeviceGradingDivisionFragmentFragment' };

export type UseEgtDivision_PlaceholderFragmentFragment = { __typename?: 'EGTDivision', id: string } & { ' $fragmentName'?: 'UseEgtDivision_PlaceholderFragmentFragment' };

export type UseEgtDivisionQueryQueryVariables = Exact<{
  filter: EgtDivisionFilterInput;
}>;


export type UseEgtDivisionQueryQuery = { __typename?: 'Query', egtDivisions: Array<(
    { __typename?: 'EGTDivision' }
    & { ' $fragmentRefs'?: { 'UseEgtDivision_PlaceholderFragmentFragment': UseEgtDivision_PlaceholderFragmentFragment } }
  )> };

export type UseEgtDivisionSubscriptionSubscriptionVariables = Exact<{
  filter: EgtDivisionFilterInput;
}>;


export type UseEgtDivisionSubscriptionSubscription = { __typename?: 'Subscription', egtDivision: (
    { __typename?: 'EGTDivision' }
    & { ' $fragmentRefs'?: { 'UseEgtDivision_PlaceholderFragmentFragment': UseEgtDivision_PlaceholderFragmentFragment } }
  ) };

export type DivisionListFragmentFragment = { __typename?: 'EGTDivision', id: string, ground: number, state: EgtDivisionStates, currentRound: number, totalRounds: number, category: number, sex: Sex, number: number, totalStarters: number } & { ' $fragmentName'?: 'DivisionListFragmentFragment' };

export const DeviceGradingDivisionFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"DeviceGradingDivisionFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EGTDivision"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"totalRounds"}},{"kind":"Field","name":{"kind":"Name","value":"currentRound"}},{"kind":"Field","name":{"kind":"Name","value":"state"}}]}}]} as unknown as DocumentNode<DeviceGradingDivisionFragmentFragment, unknown>;
export const UseEgtDivision_PlaceholderFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"useEGTDivision_PlaceholderFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EGTDivision"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]} as unknown as DocumentNode<UseEgtDivision_PlaceholderFragmentFragment, unknown>;
export const DivisionListFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"DivisionListFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EGTDivision"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ground"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"currentRound"}},{"kind":"Field","name":{"kind":"Name","value":"totalRounds"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"sex"}},{"kind":"Field","name":{"kind":"Name","value":"number"}},{"kind":"Field","name":{"kind":"Name","value":"totalStarters"}}]}}]} as unknown as DocumentNode<DivisionListFragmentFragment, unknown>;
export const UseEgtDivisionQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"useEGTDivisionQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EGTDivisionFilterInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"egtDivisions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"useEGTDivision_PlaceholderFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"useEGTDivision_PlaceholderFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EGTDivision"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]} as unknown as DocumentNode<UseEgtDivisionQueryQuery, UseEgtDivisionQueryQueryVariables>;
export const UseEgtDivisionSubscriptionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"useEGTDivisionSubscription"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EGTDivisionFilterInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"egtDivision"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"useEGTDivision_PlaceholderFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"useEGTDivision_PlaceholderFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EGTDivision"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]} as unknown as DocumentNode<UseEgtDivisionSubscriptionSubscription, UseEgtDivisionSubscriptionSubscriptionVariables>;