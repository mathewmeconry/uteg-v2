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
  currentDeviceRound: Array<Scalars['Int']['output']>;
  currentRound: Scalars['Int']['output'];
  ground: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  lastStateTransition?: Maybe<Scalars['Timestamp']['output']>;
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
  isDeleted: Scalars['Boolean']['output'];
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
  advanceEgtDivisionDevice: EgtDivision;
  advanceEgtDivisionsDevice: EgtDivision;
  competitionLogo: Competition;
  createClub: Club;
  createCompetition: Competition;
  createEgtDivision: EgtDivision;
  createStarter: Starter;
  createStarterLink: StarterLink;
  createUser: User;
  egtCategorySettings: EgtCategorySettings;
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


export type MutationAdvanceEgtDivisionDeviceArgs = {
  device: Scalars['Int']['input'];
  id: Scalars['ID']['input'];
};


export type MutationAdvanceEgtDivisionsDeviceArgs = {
  device: Scalars['Int']['input'];
  ids: Array<Scalars['ID']['input']>;
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
  egtStarterLinks: Array<EgtStarterLink>;
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


export type QueryEgtStarterLinksArgs = {
  divisionIDs?: InputMaybe<Array<Scalars['ID']['input']>>;
  ids?: InputMaybe<Array<Scalars['ID']['input']>>;
  withDeleted?: InputMaybe<Scalars['Boolean']['input']>;
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
  isDeleted: Scalars['Boolean']['output'];
  starter: Starter;
};

export type Subscription = {
  __typename?: 'Subscription';
  egtDivision: EgtDivision;
  egtStarterLinks: EgtStarterLink;
};


export type SubscriptionEgtDivisionArgs = {
  filter: EgtDivisionFilterInput;
};


export type SubscriptionEgtStarterLinksArgs = {
  divisionIDs?: InputMaybe<Array<Scalars['ID']['input']>>;
  ids?: InputMaybe<Array<Scalars['ID']['input']>>;
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

export type CurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = { __typename?: 'Query', currentUser?: { __typename?: 'User', id: string, email: string, language: string } | null };

export type UpdateUserMutationVariables = Exact<{
  data: UpdateUserInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', id: string, email: string, language: string } };

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

export type UpsertStarterLinkMutationVariables = Exact<{
  input: CreateStarterLinkInput;
}>;


export type UpsertStarterLinkMutation = { __typename?: 'Mutation', upsertStarterLink: { __typename?: 'StarterLink', id: string, starter: { __typename?: 'Starter', id: string } } };

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

export type CurrentI18NUserQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentI18NUserQuery = { __typename?: 'Query', currentUser?: { __typename?: 'User', id: string, language: string } | null };

export type CompetitionNameQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type CompetitionNameQuery = { __typename?: 'Query', competition: { __typename?: 'Competition', id: string, name: string } };

export type DeviceGradingDivisionFragmentFragment = { __typename?: 'EGTDivision', id: string, totalRounds: number, currentRound: number, state: EgtDivisionStates } & { ' $fragmentName'?: 'DeviceGradingDivisionFragmentFragment' };

export type EgtDeviceGradingQueryVariables = Exact<{
  ids: Array<Scalars['ID']['input']> | Scalars['ID']['input'];
  round: Scalars['Int']['input'];
  device: Scalars['Int']['input'];
}>;


export type EgtDeviceGradingQuery = { __typename?: 'Query', egtJudgingDevice: { __typename?: 'EGTJudgingDevice', device: { __typename?: 'EGTDevice', id: string, deviceNumber: number, inputs: number, aggregationMode: EgtDeviceAggregationMode, overrides: Array<{ __typename?: 'EGTDeviceOverride', category: number, inputs: number, aggregationMode: EgtDeviceAggregationMode }> }, starterslist: Array<{ __typename?: 'EGTStarterLink', id: string }>, lineups: Array<{ __typename?: 'EGTLineup', id: string }> } };

export type EgtAddGradesMutationVariables = Exact<{
  grades: Array<GradeInput> | GradeInput;
}>;


export type EgtAddGradesMutation = { __typename?: 'Mutation', addGrades: Array<{ __typename?: 'Grade', id: string, value: number, starterlink: { __typename?: 'StarterLink', id: string } }> };

export type EgtStarterGradesQueryVariables = Exact<{
  starterlinkIds: Array<Scalars['ID']['input']> | Scalars['ID']['input'];
  device: Scalars['Int']['input'];
}>;


export type EgtStarterGradesQuery = { __typename?: 'Query', starterGrades: Array<{ __typename?: 'Grade', id: string, value: number, starterlink: { __typename?: 'StarterLink', id: string } }> };

export type AdvanceEgtDivisionsDeviceMutationVariables = Exact<{
  divisions: Array<Scalars['ID']['input']> | Scalars['ID']['input'];
  device: Scalars['Int']['input'];
}>;


export type AdvanceEgtDivisionsDeviceMutation = { __typename?: 'Mutation', advanceEgtDivisionsDevice: { __typename?: 'EGTDivision', id: string, currentRound: number } };

export type RoundGradingSingleFragment = { __typename?: 'EGTStarterLink', id: string, isDeleted: boolean, category?: number | null, starterlink: { __typename?: 'StarterLink', id: string, starter: { __typename?: 'Starter', id: string, firstname: string, lastname: string, sex: Sex }, club: { __typename?: 'Club', id: string, name: string } } } & { ' $fragmentName'?: 'RoundGradingSingleFragment' };

export type RoundGradingTableFragment = { __typename?: 'EGTStarterLink', id: string, isDeleted: boolean, category?: number | null, starterlink: { __typename?: 'StarterLink', id: string, starter: { __typename?: 'Starter', id: string, firstname: string, lastname: string, sex: Sex }, club: { __typename?: 'Club', id: string, name: string } } } & { ' $fragmentName'?: 'RoundGradingTableFragment' };

export type EgtLineupQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type EgtLineupQuery = { __typename?: 'Query', egtLineup?: { __typename?: 'EGTLineup', id: string, device: { __typename?: 'EGTDevice', id: string, deviceNumber: number }, starterlinks: Array<{ __typename?: 'EGTStarterLink', id: string, starterlink: { __typename?: 'StarterLink', id: string, starter: { __typename?: 'Starter', id: string, firstname: string, lastname: string, birthyear: number }, club: { __typename?: 'Club', id: string, name: string } } }> } | null };

export type AssignEgtLineupMutationVariables = Exact<{
  data: EgtStarterLinkInput;
}>;


export type AssignEgtLineupMutation = { __typename?: 'Mutation', egtStarterLink: { __typename?: 'EGTStarterLink', id: string } };

export type EgtStarterRankingQueryVariables = Exact<{
  competitionID: Scalars['ID']['input'];
  sex: Sex;
  category: Scalars['Int']['input'];
}>;


export type EgtStarterRankingQuery = { __typename?: 'Query', egtStarterRankings: Array<{ __typename?: 'EGTStarterRanking', rank: number, total: number, award: string, egtStarterlink: { __typename?: 'EGTStarterLink', id: string, starterlink: { __typename?: 'StarterLink', id: string, starter: { __typename?: 'Starter', id: string, firstname: string, lastname: string }, club: { __typename?: 'Club', id: string, name: string } } }, grades: Array<{ __typename?: 'Grade', id: string, deviceNumber: number, value: number }> }> };

export type EgtCategorySettingsQueryVariables = Exact<{
  competitionID: Scalars['ID']['input'];
  category: Scalars['Int']['input'];
  sex: Sex;
}>;


export type EgtCategorySettingsQuery = { __typename?: 'Query', egtCategorySettings: { __typename?: 'EGTCategorySettings', honourPrecentage: number } };

export type UpdateEgtCategorySettingsMutationVariables = Exact<{
  competitionID: Scalars['ID']['input'];
  data: EgtCategorySettingsInput;
}>;


export type UpdateEgtCategorySettingsMutation = { __typename?: 'Mutation', egtCategorySettings: { __typename?: 'EGTCategorySettings', honourPrecentage: number } };

export type EgtRankingListCompetitionQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type EgtRankingListCompetitionQuery = { __typename?: 'Query', competition: { __typename?: 'Competition', id: string, name: string, logo?: string | null } };

export type EgtAssignToDivisionDialogQueryVariables = Exact<{
  filter: EgtDivisionFilterInput;
}>;


export type EgtAssignToDivisionDialogQuery = { __typename?: 'Query', egtDivisions: Array<{ __typename?: 'EGTDivision', id: string, number: number, ground: number }> };

export type EgtAssignToDivisionDialogMutationMutationVariables = Exact<{
  data: EgtStarterLinkInput;
}>;


export type EgtAssignToDivisionDialogMutationMutation = { __typename?: 'Mutation', egtStarterLink: { __typename?: 'EGTStarterLink', id: string, category?: number | null, division?: { __typename?: 'EGTDivision', id: string, number: number } | null, lineup?: { __typename?: 'EGTLineup', id: string } | null, starterlink: { __typename?: 'StarterLink', id: string, starter: { __typename?: 'Starter', id: string, sex: Sex } } } };

export type CompetitionGroundsQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type CompetitionGroundsQuery = { __typename?: 'Query', competition: { __typename?: 'Competition', id: string, grounds: number } };

export type CreateEgtDivisionMutationVariables = Exact<{
  data: CreateEgtDivisionInput;
}>;


export type CreateEgtDivisionMutation = { __typename?: 'Mutation', createEgtDivision: { __typename?: 'EGTDivision', id: string } };

export type EgtGradingListQueryQueryVariables = Exact<{
  ids: Array<Scalars['ID']['input']> | Scalars['ID']['input'];
  round: Scalars['Int']['input'];
  device: Scalars['Int']['input'];
}>;


export type EgtGradingListQueryQuery = { __typename?: 'Query', egtJudgingDevice: { __typename?: 'EGTJudgingDevice', starterslist: Array<{ __typename?: 'EGTStarterLink', id: string, category?: number | null, isDeleted: boolean, starterlink: { __typename?: 'StarterLink', id: string, starter: { __typename?: 'Starter', id: string, firstname: string, lastname: string } } }> } };

export type UpdateEgtDivisionStateMutationVariables = Exact<{
  data: UpdateEgtDivisionStateInput;
}>;


export type UpdateEgtDivisionStateMutation = { __typename?: 'Mutation', updateEgtDivisionState: { __typename?: 'EGTDivision', id: string, state: EgtDivisionStates, currentRound: number } };

export type StartersReviewStepRowDivisionsQueryVariables = Exact<{
  filter: EgtDivisionFilterInput;
}>;


export type StartersReviewStepRowDivisionsQuery = { __typename?: 'Query', egtDivisions: Array<{ __typename?: 'EGTDivision', id: string, number: number }> };

export type EgtStarterLinkMutationMutationVariables = Exact<{
  data: EgtStarterLinkInput;
  ignoreDivision?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type EgtStarterLinkMutationMutation = { __typename?: 'Mutation', egtStarterLink: { __typename?: 'EGTStarterLink', id: string, category?: number | null, division?: { __typename?: 'EGTDivision', id: string, number: number } | null } };

export type EgtStarterLinkQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']['input']>;
  starterLinkID?: InputMaybe<Scalars['ID']['input']>;
}>;


export type EgtStarterLinkQuery = { __typename?: 'Query', egtStarterLink?: { __typename?: 'EGTStarterLink', id: string, category?: number | null, division?: { __typename?: 'EGTDivision', id: string } | null } | null };

export type EgtDivisionsUpdateStarterFormQueryVariables = Exact<{
  filter: EgtDivisionFilterInput;
}>;


export type EgtDivisionsUpdateStarterFormQuery = { __typename?: 'Query', egtDivisions: Array<{ __typename?: 'EGTDivision', id: string, number: number, ground: number }> };

export type CreateEgtSettingsMutationVariables = Exact<{
  competitionID: Scalars['ID']['input'];
  data: EgtSettingsInput;
}>;


export type CreateEgtSettingsMutation = { __typename?: 'Mutation', egtSettings: { __typename?: 'EGTSettings', id: string } };

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

export type UseEgtStarterLinks_PlaceholderFragmentFragment = { __typename?: 'EGTStarterLink', id: string } & { ' $fragmentName'?: 'UseEgtStarterLinks_PlaceholderFragmentFragment' };

export type UseEgtStarterLinksQueryQueryVariables = Exact<{
  ids?: InputMaybe<Array<Scalars['ID']['input']> | Scalars['ID']['input']>;
  divisionIDs?: InputMaybe<Array<Scalars['ID']['input']> | Scalars['ID']['input']>;
  withDeleted?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type UseEgtStarterLinksQueryQuery = { __typename?: 'Query', egtStarterLinks: Array<(
    { __typename?: 'EGTStarterLink' }
    & { ' $fragmentRefs'?: { 'UseEgtStarterLinks_PlaceholderFragmentFragment': UseEgtStarterLinks_PlaceholderFragmentFragment } }
  )> };

export type UseEegtStarterLinksSubscriptionSubscriptionVariables = Exact<{
  ids?: InputMaybe<Array<Scalars['ID']['input']> | Scalars['ID']['input']>;
  divisionIDs?: InputMaybe<Array<Scalars['ID']['input']> | Scalars['ID']['input']>;
}>;


export type UseEegtStarterLinksSubscriptionSubscription = { __typename?: 'Subscription', egtStarterLinks: (
    { __typename?: 'EGTStarterLink' }
    & { ' $fragmentRefs'?: { 'UseEgtStarterLinks_PlaceholderFragmentFragment': UseEgtStarterLinks_PlaceholderFragmentFragment } }
  ) };

export type EgtStarterListFragmentFragment = { __typename?: 'StarterLink', egt?: { __typename?: 'EGTStarterLink', id: string, category?: number | null, division?: { __typename?: 'EGTDivision', id: string, number: number } | null, lineup?: { __typename?: 'EGTLineup', id: string, device: { __typename?: 'EGTDevice', id: string, deviceNumber: number } } | null } | null } & { ' $fragmentName'?: 'EgtStarterListFragmentFragment' };

export type EgtDivisionGradingQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type EgtDivisionGradingQuery = { __typename?: 'Query', egtDivision?: { __typename?: 'EGTDivision', id: string, ground: number, totalRounds: number } | null };

export type EgtDivisionQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type EgtDivisionQuery = { __typename?: 'Query', egtDivision?: { __typename?: 'EGTDivision', id: string, category: number, ground: number, currentRound: number, totalRounds: number, sex: Sex, number: number, lineups: Array<{ __typename?: 'EGTLineup', id: string, device: { __typename?: 'EGTDevice', id: string, deviceNumber: number } }> } | null };

export type EgtStarterLinkUnassignedQueryVariables = Exact<{
  divisionID: Scalars['ID']['input'];
}>;


export type EgtStarterLinkUnassignedQuery = { __typename?: 'Query', egtStarterLinkUnassigned: Array<{ __typename?: 'EGTStarterLink', id: string, starterlink: { __typename?: 'StarterLink', id: string, starter: { __typename?: 'Starter', id: string, firstname: string, lastname: string, birthyear: number }, club: { __typename?: 'Club', id: string, name: string } } }> };

export type EgtDivisionsQueryVariables = Exact<{
  competitionID: Scalars['ID']['input'];
}>;


export type EgtDivisionsQuery = { __typename?: 'Query', egtDivisions: Array<{ __typename?: 'EGTDivision', id: string, ground: number, state: EgtDivisionStates, currentRound: number, totalRounds: number, category: number, sex: Sex, number: number, totalStarters: number }> };

export type RemoveEgtDivisionMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type RemoveEgtDivisionMutation = { __typename?: 'Mutation', removeEgtDivision: { __typename?: 'EGTDivision', id: string } };

export type EgtDivisionsIdsQueryVariables = Exact<{
  filter: EgtDivisionFilterInput;
}>;


export type EgtDivisionsIdsQuery = { __typename?: 'Query', egtDivisions: Array<{ __typename?: 'EGTDivision', id: string }> };

export type EgtDivisionJudgingQueryVariables = Exact<{
  ids: Array<Scalars['ID']['input']> | Scalars['ID']['input'];
  round: Scalars['Int']['input'];
}>;


export type EgtDivisionJudgingQuery = { __typename?: 'Query', egtJudgingDevices: Array<{ __typename?: 'EGTJudgingDevice', round: number, device: { __typename?: 'EGTDevice', id: string, deviceNumber: number, inputs: number, aggregationMode: EgtDeviceAggregationMode, overrides: Array<{ __typename?: 'EGTDeviceOverride', category: number, inputs: number, aggregationMode: EgtDeviceAggregationMode }> }, starterslist: Array<{ __typename?: 'EGTStarterLink', id: string, isDeleted: boolean, category?: number | null, starterlink: { __typename?: 'StarterLink', id: string, starter: { __typename?: 'Starter', id: string, firstname: string, lastname: string }, club: { __typename?: 'Club', id: string, name: string } } }> }> };

export type DivisionListFragmentFragment = { __typename?: 'EGTDivision', id: string, ground: number, state: EgtDivisionStates, currentRound: number, totalRounds: number, category: number, sex: Sex, number: number, totalStarters: number } & { ' $fragmentName'?: 'DivisionListFragmentFragment' };

export type EgtGradingGroundsQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type EgtGradingGroundsQuery = { __typename?: 'Query', competition: { __typename?: 'Competition', id: string, grounds: number } };

export type EgtJudgesGroundsQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type EgtJudgesGroundsQuery = { __typename?: 'Query', competition: { __typename?: 'Competition', id: string, grounds: number } };

export type EgtJudgesTokensQueryVariables = Exact<{
  competitionID: Scalars['ID']['input'];
  ground: Scalars['Int']['input'];
  device: Scalars['Int']['input'];
  create?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type EgtJudgesTokensQuery = { __typename?: 'Query', findJudgeToken?: { __typename?: 'Judgetoken', id: string, device: number, token: string, ground: number } | null };

export type EgtJudgesResetTokenMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type EgtJudgesResetTokenMutation = { __typename?: 'Mutation', resetJudgeToken: { __typename?: 'Judgetoken', id: string, token: string } };

export type EgtJudgingCompetitionQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type EgtJudgingCompetitionQuery = { __typename?: 'Query', competition: { __typename?: 'Competition', id: string, name: string } };

export type EgtJudgingDivisionsIdsQueryVariables = Exact<{
  filter: EgtDivisionFilterInput;
}>;


export type EgtJudgingDivisionsIdsQuery = { __typename?: 'Query', egtDivisions: Array<{ __typename?: 'EGTDivision', id: string, totalRounds: number }> };

export type EgtJudgingArrayQueryVariables = Exact<{
  ids: Array<Scalars['ID']['input']> | Scalars['ID']['input'];
  round: Scalars['Int']['input'];
  device: Scalars['Int']['input'];
}>;


export type EgtJudgingArrayQuery = { __typename?: 'Query', egtJudgingDevice: { __typename?: 'EGTJudgingDevice', device: { __typename?: 'EGTDevice', id: string, deviceNumber: number, inputs: number, aggregationMode: EgtDeviceAggregationMode, overrides: Array<{ __typename?: 'EGTDeviceOverride', category: number, inputs: number, aggregationMode: EgtDeviceAggregationMode }> }, starterslist: Array<{ __typename?: 'EGTStarterLink', id: string, category?: number | null, starterlink: { __typename?: 'StarterLink', id: string, starter: { __typename?: 'Starter', id: string, firstname: string, lastname: string, sex: Sex } } }>, lineups: Array<{ __typename?: 'EGTLineup', id: string }> } };

export type CompetitionDashboardStatsQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type CompetitionDashboardStatsQuery = { __typename?: 'Query', competition: { __typename?: 'Competition', id: string, stats: { __typename?: 'CompetitionStats', clubs: number, starters: number, grades: number } } };

export type CompetitionSettingsQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type CompetitionSettingsQuery = { __typename?: 'Query', competition: { __typename?: 'Competition', id: string, name: string, location: string, startDate: any, endDate: any, grounds: number, logo?: string | null } };

export type CompetitionSettingsUpdateMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  data: UpdateCompetitionInput;
}>;


export type CompetitionSettingsUpdateMutation = { __typename?: 'Mutation', updateCompetition: { __typename?: 'Competition', id: string, name: string, location: string, startDate: any, endDate: any, grounds: number } };

export type CompetitionSettingsLogoUpdateMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  logo: Scalars['Upload']['input'];
}>;


export type CompetitionSettingsLogoUpdateMutation = { __typename?: 'Mutation', competitionLogo: { __typename?: 'Competition', id: string, logo?: string | null } };

export type RemoveStarterLinkMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type RemoveStarterLinkMutation = { __typename?: 'Mutation', removeStarterLink: { __typename?: 'StarterLink', id: string } };

export type StarterLinksQueryVariables = Exact<{
  competitionID: Scalars['ID']['input'];
  sex?: InputMaybe<Scalars['String']['input']>;
}>;


export type StarterLinksQuery = { __typename?: 'Query', starterLinks: Array<{ __typename?: 'StarterLink', id: string, starter: { __typename?: 'Starter', id: string, firstname: string, lastname: string, birthyear: number, stvID?: string | null, sex: Sex }, club: { __typename?: 'Club', id: string, name: string, location: string } }> };

export type CreateCompetitionMutationVariables = Exact<{
  name: Scalars['String']['input'];
  location: Scalars['String']['input'];
  startDate: Scalars['Timestamp']['input'];
  endDate: Scalars['Timestamp']['input'];
  grounds: Scalars['Int']['input'];
  modules: Array<Scalars['String']['input']> | Scalars['String']['input'];
}>;


export type CreateCompetitionMutation = { __typename?: 'Mutation', createCompetition: { __typename?: 'Competition', id: string } };

export type CreateCompeitionLogoMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  logo: Scalars['Upload']['input'];
}>;


export type CreateCompeitionLogoMutation = { __typename?: 'Mutation', competitionLogo: { __typename?: 'Competition', id: string, logo?: string | null } };

export type CompetitionsQueryVariables = Exact<{ [key: string]: never; }>;


export type CompetitionsQuery = { __typename?: 'Query', competitions: Array<{ __typename?: 'Competition', id: string, name: string, location: string, startDate: any, endDate: any }> };

export type CreateUserMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  language: Scalars['String']['input'];
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', id: string, language: string } };

export const DeviceGradingDivisionFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"DeviceGradingDivisionFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EGTDivision"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"totalRounds"}},{"kind":"Field","name":{"kind":"Name","value":"currentRound"}},{"kind":"Field","name":{"kind":"Name","value":"state"}}]}}]} as unknown as DocumentNode<DeviceGradingDivisionFragmentFragment, unknown>;
export const RoundGradingSingleFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"RoundGradingSingle"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EGTStarterLink"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isDeleted"}},{"kind":"Field","name":{"kind":"Name","value":"starterlink"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"starter"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstname"}},{"kind":"Field","name":{"kind":"Name","value":"lastname"}},{"kind":"Field","name":{"kind":"Name","value":"sex"}}]}},{"kind":"Field","name":{"kind":"Name","value":"club"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"category"}}]}}]} as unknown as DocumentNode<RoundGradingSingleFragment, unknown>;
export const RoundGradingTableFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"RoundGradingTable"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EGTStarterLink"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isDeleted"}},{"kind":"Field","name":{"kind":"Name","value":"starterlink"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"starter"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstname"}},{"kind":"Field","name":{"kind":"Name","value":"lastname"}},{"kind":"Field","name":{"kind":"Name","value":"sex"}}]}},{"kind":"Field","name":{"kind":"Name","value":"club"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"category"}}]}}]} as unknown as DocumentNode<RoundGradingTableFragment, unknown>;
export const UseEgtDivision_PlaceholderFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"useEGTDivision_PlaceholderFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EGTDivision"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]} as unknown as DocumentNode<UseEgtDivision_PlaceholderFragmentFragment, unknown>;
export const UseEgtStarterLinks_PlaceholderFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"useEGTStarterLinks_PlaceholderFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EGTStarterLink"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]} as unknown as DocumentNode<UseEgtStarterLinks_PlaceholderFragmentFragment, unknown>;
export const EgtStarterListFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EGTStarterListFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"StarterLink"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"egt"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"division"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"number"}}]}},{"kind":"Field","name":{"kind":"Name","value":"lineup"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"device"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"deviceNumber"}}]}}]}}]}}]}}]} as unknown as DocumentNode<EgtStarterListFragmentFragment, unknown>;
export const DivisionListFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"DivisionListFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EGTDivision"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ground"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"currentRound"}},{"kind":"Field","name":{"kind":"Name","value":"totalRounds"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"sex"}},{"kind":"Field","name":{"kind":"Name","value":"number"}},{"kind":"Field","name":{"kind":"Name","value":"totalStarters"}}]}}]} as unknown as DocumentNode<DivisionListFragmentFragment, unknown>;
export const CurrentUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"currentUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"language"}}]}}]}}]} as unknown as DocumentNode<CurrentUserQuery, CurrentUserQueryVariables>;
export const UpdateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"language"}}]}}]}}]} as unknown as DocumentNode<UpdateUserMutation, UpdateUserMutationVariables>;
export const CreateClubDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createClub"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateClubInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createClub"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<CreateClubMutation, CreateClubMutationVariables>;
export const ClubsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"clubs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"clubs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<ClubsQuery, ClubsQueryVariables>;
export const CreateStarterDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createStarter"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateStarterInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createStarter"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateStarterMutation, CreateStarterMutationVariables>;
export const UpsertStarterLinkDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"upsertStarterLink"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateStarterLinkInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"upsertStarterLink"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"starter"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<UpsertStarterLinkMutation, UpsertStarterLinkMutationVariables>;
export const StartersAutocompleteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"startersAutocomplete"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"StarterFilter"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"starters"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstname"}},{"kind":"Field","name":{"kind":"Name","value":"lastname"}},{"kind":"Field","name":{"kind":"Name","value":"birthyear"}},{"kind":"Field","name":{"kind":"Name","value":"stvID"}},{"kind":"Field","name":{"kind":"Name","value":"sex"}}]}}]}}]} as unknown as DocumentNode<StartersAutocompleteQuery, StartersAutocompleteQueryVariables>;
export const UpdateStarterDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateStarter"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateStarterInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateStarter"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateStarterMutation, UpdateStarterMutationVariables>;
export const UpdateStarterLinkDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateStarterLink"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateStarterLinkInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateStarterLink"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateStarterLinkMutation, UpdateStarterLinkMutationVariables>;
export const StarterLinkDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"starterLink"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"starterLink"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"competition"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"starter"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"stvID"}},{"kind":"Field","name":{"kind":"Name","value":"firstname"}},{"kind":"Field","name":{"kind":"Name","value":"lastname"}},{"kind":"Field","name":{"kind":"Name","value":"sex"}},{"kind":"Field","name":{"kind":"Name","value":"birthyear"}}]}},{"kind":"Field","name":{"kind":"Name","value":"club"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<StarterLinkQuery, StarterLinkQueryVariables>;
export const ModulesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"modules"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"competitionID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"competition"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"competitionID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"modules"}}]}}]}}]} as unknown as DocumentNode<ModulesQuery, ModulesQueryVariables>;
export const CurrentI18NUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"currentI18NUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"language"}}]}}]}}]} as unknown as DocumentNode<CurrentI18NUserQuery, CurrentI18NUserQueryVariables>;
export const CompetitionNameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"competitionName"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"competition"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<CompetitionNameQuery, CompetitionNameQueryVariables>;
export const EgtDeviceGradingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"EgtDeviceGrading"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ids"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"round"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"device"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"egtJudgingDevice"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ids"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ids"}}},{"kind":"Argument","name":{"kind":"Name","value":"round"},"value":{"kind":"Variable","name":{"kind":"Name","value":"round"}}},{"kind":"Argument","name":{"kind":"Name","value":"device"},"value":{"kind":"Variable","name":{"kind":"Name","value":"device"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"device"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"deviceNumber"}},{"kind":"Field","name":{"kind":"Name","value":"inputs"}},{"kind":"Field","name":{"kind":"Name","value":"aggregationMode"}},{"kind":"Field","name":{"kind":"Name","value":"overrides"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"inputs"}},{"kind":"Field","name":{"kind":"Name","value":"aggregationMode"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"starterslist"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"lineups"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<EgtDeviceGradingQuery, EgtDeviceGradingQueryVariables>;
export const EgtAddGradesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"EgtAddGrades"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"grades"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GradeInput"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addGrades"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"grades"},"value":{"kind":"Variable","name":{"kind":"Name","value":"grades"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"starterlink"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<EgtAddGradesMutation, EgtAddGradesMutationVariables>;
export const EgtStarterGradesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"EgtStarterGrades"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"starterlinkIds"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"device"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"starterGrades"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"starterlinkIds"},"value":{"kind":"Variable","name":{"kind":"Name","value":"starterlinkIds"}}},{"kind":"Argument","name":{"kind":"Name","value":"device"},"value":{"kind":"Variable","name":{"kind":"Name","value":"device"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"starterlink"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<EgtStarterGradesQuery, EgtStarterGradesQueryVariables>;
export const AdvanceEgtDivisionsDeviceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"advanceEgtDivisionsDevice"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"divisions"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"device"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"advanceEgtDivisionsDevice"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ids"},"value":{"kind":"Variable","name":{"kind":"Name","value":"divisions"}}},{"kind":"Argument","name":{"kind":"Name","value":"device"},"value":{"kind":"Variable","name":{"kind":"Name","value":"device"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"currentRound"}}]}}]}}]} as unknown as DocumentNode<AdvanceEgtDivisionsDeviceMutation, AdvanceEgtDivisionsDeviceMutationVariables>;
export const EgtLineupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"egtLineup"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"egtLineup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"device"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"deviceNumber"}}]}},{"kind":"Field","name":{"kind":"Name","value":"starterlinks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"starterlink"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"starter"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstname"}},{"kind":"Field","name":{"kind":"Name","value":"lastname"}},{"kind":"Field","name":{"kind":"Name","value":"birthyear"}}]}},{"kind":"Field","name":{"kind":"Name","value":"club"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<EgtLineupQuery, EgtLineupQueryVariables>;
export const AssignEgtLineupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"assignEgtLineup"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EGTStarterLinkInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"egtStarterLink"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<AssignEgtLineupMutation, AssignEgtLineupMutationVariables>;
export const EgtStarterRankingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"EGTStarterRanking"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"competitionID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sex"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Sex"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"category"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"egtStarterRankings"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"competitionID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"competitionID"}}},{"kind":"Argument","name":{"kind":"Name","value":"sex"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sex"}}},{"kind":"Argument","name":{"kind":"Name","value":"category"},"value":{"kind":"Variable","name":{"kind":"Name","value":"category"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rank"}},{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"award"}},{"kind":"Field","name":{"kind":"Name","value":"egtStarterlink"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"starterlink"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"starter"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstname"}},{"kind":"Field","name":{"kind":"Name","value":"lastname"}}]}},{"kind":"Field","name":{"kind":"Name","value":"club"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"grades"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"deviceNumber"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}}]}}]} as unknown as DocumentNode<EgtStarterRankingQuery, EgtStarterRankingQueryVariables>;
export const EgtCategorySettingsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"egtCategorySettings"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"competitionID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"category"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sex"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Sex"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"egtCategorySettings"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"competitionID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"competitionID"}}},{"kind":"Argument","name":{"kind":"Name","value":"category"},"value":{"kind":"Variable","name":{"kind":"Name","value":"category"}}},{"kind":"Argument","name":{"kind":"Name","value":"sex"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sex"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"honourPrecentage"}}]}}]}}]} as unknown as DocumentNode<EgtCategorySettingsQuery, EgtCategorySettingsQueryVariables>;
export const UpdateEgtCategorySettingsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateEgtCategorySettings"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"competitionID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EGTCategorySettingsInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"egtCategorySettings"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"competitionID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"competitionID"}}},{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"honourPrecentage"}}]}}]}}]} as unknown as DocumentNode<UpdateEgtCategorySettingsMutation, UpdateEgtCategorySettingsMutationVariables>;
export const EgtRankingListCompetitionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"EgtRankingListCompetition"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"competition"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"logo"}}]}}]}}]} as unknown as DocumentNode<EgtRankingListCompetitionQuery, EgtRankingListCompetitionQueryVariables>;
export const EgtAssignToDivisionDialogDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"egtAssignToDivisionDialog"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EGTDivisionFilterInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"egtDivisions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"number"}},{"kind":"Field","name":{"kind":"Name","value":"ground"}}]}}]}}]} as unknown as DocumentNode<EgtAssignToDivisionDialogQuery, EgtAssignToDivisionDialogQueryVariables>;
export const EgtAssignToDivisionDialogMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"egtAssignToDivisionDialogMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EGTStarterLinkInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"egtStarterLink"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"division"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"number"}}]}},{"kind":"Field","name":{"kind":"Name","value":"lineup"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"starterlink"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"starter"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"sex"}}]}}]}}]}}]}}]} as unknown as DocumentNode<EgtAssignToDivisionDialogMutationMutation, EgtAssignToDivisionDialogMutationMutationVariables>;
export const CompetitionGroundsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"competitionGrounds"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"competition"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"grounds"}}]}}]}}]} as unknown as DocumentNode<CompetitionGroundsQuery, CompetitionGroundsQueryVariables>;
export const CreateEgtDivisionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createEgtDivision"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateEGTDivisionInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createEgtDivision"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateEgtDivisionMutation, CreateEgtDivisionMutationVariables>;
export const EgtGradingListQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"EGTGradingListQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ids"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"round"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"device"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"egtJudgingDevice"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ids"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ids"}}},{"kind":"Argument","name":{"kind":"Name","value":"round"},"value":{"kind":"Variable","name":{"kind":"Name","value":"round"}}},{"kind":"Argument","name":{"kind":"Name","value":"device"},"value":{"kind":"Variable","name":{"kind":"Name","value":"device"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"starterslist"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"isDeleted"}},{"kind":"Field","name":{"kind":"Name","value":"starterlink"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"starter"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstname"}},{"kind":"Field","name":{"kind":"Name","value":"lastname"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<EgtGradingListQueryQuery, EgtGradingListQueryQueryVariables>;
export const UpdateEgtDivisionStateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateEgtDivisionState"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateEGTDivisionStateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateEgtDivisionState"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"currentRound"}}]}}]}}]} as unknown as DocumentNode<UpdateEgtDivisionStateMutation, UpdateEgtDivisionStateMutationVariables>;
export const StartersReviewStepRowDivisionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"StartersReviewStepRowDivisions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EGTDivisionFilterInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"egtDivisions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"number"}}]}}]}}]} as unknown as DocumentNode<StartersReviewStepRowDivisionsQuery, StartersReviewStepRowDivisionsQueryVariables>;
export const EgtStarterLinkMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"egtStarterLinkMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EGTStarterLinkInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ignoreDivision"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"egtStarterLink"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}},{"kind":"Argument","name":{"kind":"Name","value":"ignoreDivision"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ignoreDivision"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"division"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"number"}}]}}]}}]}}]} as unknown as DocumentNode<EgtStarterLinkMutationMutation, EgtStarterLinkMutationMutationVariables>;
export const EgtStarterLinkDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"egtStarterLink"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"starterLinkID"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"egtStarterLink"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"starterLinkID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"starterLinkID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"division"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<EgtStarterLinkQuery, EgtStarterLinkQueryVariables>;
export const EgtDivisionsUpdateStarterFormDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"egtDivisionsUpdateStarterForm"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EGTDivisionFilterInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"egtDivisions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"number"}},{"kind":"Field","name":{"kind":"Name","value":"ground"}}]}}]}}]} as unknown as DocumentNode<EgtDivisionsUpdateStarterFormQuery, EgtDivisionsUpdateStarterFormQueryVariables>;
export const CreateEgtSettingsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createEgtSettings"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"competitionID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EGTSettingsInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"egtSettings"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"competitionID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"competitionID"}}},{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateEgtSettingsMutation, CreateEgtSettingsMutationVariables>;
export const UseEgtDivisionQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"useEGTDivisionQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EGTDivisionFilterInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"egtDivisions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"useEGTDivision_PlaceholderFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"useEGTDivision_PlaceholderFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EGTDivision"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]} as unknown as DocumentNode<UseEgtDivisionQueryQuery, UseEgtDivisionQueryQueryVariables>;
export const UseEgtDivisionSubscriptionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"useEGTDivisionSubscription"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EGTDivisionFilterInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"egtDivision"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"useEGTDivision_PlaceholderFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"useEGTDivision_PlaceholderFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EGTDivision"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]} as unknown as DocumentNode<UseEgtDivisionSubscriptionSubscription, UseEgtDivisionSubscriptionSubscriptionVariables>;
export const UseEgtStarterLinksQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"useEGTStarterLinksQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ids"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"divisionIDs"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"withDeleted"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"egtStarterLinks"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ids"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ids"}}},{"kind":"Argument","name":{"kind":"Name","value":"divisionIDs"},"value":{"kind":"Variable","name":{"kind":"Name","value":"divisionIDs"}}},{"kind":"Argument","name":{"kind":"Name","value":"withDeleted"},"value":{"kind":"Variable","name":{"kind":"Name","value":"withDeleted"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"useEGTStarterLinks_PlaceholderFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"useEGTStarterLinks_PlaceholderFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EGTStarterLink"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]} as unknown as DocumentNode<UseEgtStarterLinksQueryQuery, UseEgtStarterLinksQueryQueryVariables>;
export const UseEegtStarterLinksSubscriptionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"useEEGTStarterLinksSubscription"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ids"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"divisionIDs"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"egtStarterLinks"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ids"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ids"}}},{"kind":"Argument","name":{"kind":"Name","value":"divisionIDs"},"value":{"kind":"Variable","name":{"kind":"Name","value":"divisionIDs"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"useEGTStarterLinks_PlaceholderFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"useEGTStarterLinks_PlaceholderFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EGTStarterLink"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]} as unknown as DocumentNode<UseEegtStarterLinksSubscriptionSubscription, UseEegtStarterLinksSubscriptionSubscriptionVariables>;
export const EgtDivisionGradingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"egtDivisionGrading"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"egtDivision"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ground"}},{"kind":"Field","name":{"kind":"Name","value":"totalRounds"}}]}}]}}]} as unknown as DocumentNode<EgtDivisionGradingQuery, EgtDivisionGradingQueryVariables>;
export const EgtDivisionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"egtDivision"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"egtDivision"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"ground"}},{"kind":"Field","name":{"kind":"Name","value":"currentRound"}},{"kind":"Field","name":{"kind":"Name","value":"totalRounds"}},{"kind":"Field","name":{"kind":"Name","value":"sex"}},{"kind":"Field","name":{"kind":"Name","value":"number"}},{"kind":"Field","name":{"kind":"Name","value":"lineups"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"device"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"deviceNumber"}}]}}]}}]}}]}}]} as unknown as DocumentNode<EgtDivisionQuery, EgtDivisionQueryVariables>;
export const EgtStarterLinkUnassignedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"egtStarterLinkUnassigned"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"divisionID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"egtStarterLinkUnassigned"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"divisionID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"divisionID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"starterlink"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"starter"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstname"}},{"kind":"Field","name":{"kind":"Name","value":"lastname"}},{"kind":"Field","name":{"kind":"Name","value":"birthyear"}}]}},{"kind":"Field","name":{"kind":"Name","value":"club"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]} as unknown as DocumentNode<EgtStarterLinkUnassignedQuery, EgtStarterLinkUnassignedQueryVariables>;
export const EgtDivisionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"egtDivisions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"competitionID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"egtDivisions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"competitionID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"competitionID"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ground"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"currentRound"}},{"kind":"Field","name":{"kind":"Name","value":"totalRounds"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"sex"}},{"kind":"Field","name":{"kind":"Name","value":"number"}},{"kind":"Field","name":{"kind":"Name","value":"totalStarters"}}]}}]}}]} as unknown as DocumentNode<EgtDivisionsQuery, EgtDivisionsQueryVariables>;
export const RemoveEgtDivisionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"removeEgtDivision"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeEgtDivision"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<RemoveEgtDivisionMutation, RemoveEgtDivisionMutationVariables>;
export const EgtDivisionsIdsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"egtDivisionsIds"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EGTDivisionFilterInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"egtDivisions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<EgtDivisionsIdsQuery, EgtDivisionsIdsQueryVariables>;
export const EgtDivisionJudgingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"egtDivisionJudging"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ids"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"round"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"egtJudgingDevices"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ids"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ids"}}},{"kind":"Argument","name":{"kind":"Name","value":"round"},"value":{"kind":"Variable","name":{"kind":"Name","value":"round"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"device"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"deviceNumber"}},{"kind":"Field","name":{"kind":"Name","value":"inputs"}},{"kind":"Field","name":{"kind":"Name","value":"aggregationMode"}},{"kind":"Field","name":{"kind":"Name","value":"overrides"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"inputs"}},{"kind":"Field","name":{"kind":"Name","value":"aggregationMode"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"starterslist"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isDeleted"}},{"kind":"Field","name":{"kind":"Name","value":"starterlink"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"starter"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstname"}},{"kind":"Field","name":{"kind":"Name","value":"lastname"}}]}},{"kind":"Field","name":{"kind":"Name","value":"club"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"category"}}]}},{"kind":"Field","name":{"kind":"Name","value":"round"}}]}}]}}]} as unknown as DocumentNode<EgtDivisionJudgingQuery, EgtDivisionJudgingQueryVariables>;
export const EgtGradingGroundsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"EgtGradingGrounds"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"competition"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"grounds"}}]}}]}}]} as unknown as DocumentNode<EgtGradingGroundsQuery, EgtGradingGroundsQueryVariables>;
export const EgtJudgesGroundsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"EgtJudgesGrounds"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"competition"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"grounds"}}]}}]}}]} as unknown as DocumentNode<EgtJudgesGroundsQuery, EgtJudgesGroundsQueryVariables>;
export const EgtJudgesTokensDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"EgtJudgesTokens"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"competitionID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ground"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"device"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"create"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findJudgeToken"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"competitionID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"competitionID"}}},{"kind":"Argument","name":{"kind":"Name","value":"ground"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ground"}}},{"kind":"Argument","name":{"kind":"Name","value":"device"},"value":{"kind":"Variable","name":{"kind":"Name","value":"device"}}},{"kind":"Argument","name":{"kind":"Name","value":"create"},"value":{"kind":"Variable","name":{"kind":"Name","value":"create"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"device"}},{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"ground"}}]}}]}}]} as unknown as DocumentNode<EgtJudgesTokensQuery, EgtJudgesTokensQueryVariables>;
export const EgtJudgesResetTokenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"EgtJudgesResetToken"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resetJudgeToken"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"token"}}]}}]}}]} as unknown as DocumentNode<EgtJudgesResetTokenMutation, EgtJudgesResetTokenMutationVariables>;
export const EgtJudgingCompetitionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"egtJudgingCompetition"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"competition"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<EgtJudgingCompetitionQuery, EgtJudgingCompetitionQueryVariables>;
export const EgtJudgingDivisionsIdsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"egtJudgingDivisionsIds"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EGTDivisionFilterInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"egtDivisions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"totalRounds"}}]}}]}}]} as unknown as DocumentNode<EgtJudgingDivisionsIdsQuery, EgtJudgingDivisionsIdsQueryVariables>;
export const EgtJudgingArrayDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"EgtJudgingArray"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ids"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"round"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"device"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"egtJudgingDevice"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ids"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ids"}}},{"kind":"Argument","name":{"kind":"Name","value":"round"},"value":{"kind":"Variable","name":{"kind":"Name","value":"round"}}},{"kind":"Argument","name":{"kind":"Name","value":"device"},"value":{"kind":"Variable","name":{"kind":"Name","value":"device"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"device"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"deviceNumber"}},{"kind":"Field","name":{"kind":"Name","value":"inputs"}},{"kind":"Field","name":{"kind":"Name","value":"aggregationMode"}},{"kind":"Field","name":{"kind":"Name","value":"overrides"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"inputs"}},{"kind":"Field","name":{"kind":"Name","value":"aggregationMode"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"starterslist"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"starterlink"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"starter"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstname"}},{"kind":"Field","name":{"kind":"Name","value":"lastname"}},{"kind":"Field","name":{"kind":"Name","value":"sex"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"category"}}]}},{"kind":"Field","name":{"kind":"Name","value":"lineups"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<EgtJudgingArrayQuery, EgtJudgingArrayQueryVariables>;
export const CompetitionDashboardStatsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CompetitionDashboardStats"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"competition"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"stats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"clubs"}},{"kind":"Field","name":{"kind":"Name","value":"starters"}},{"kind":"Field","name":{"kind":"Name","value":"grades"}}]}}]}}]}}]} as unknown as DocumentNode<CompetitionDashboardStatsQuery, CompetitionDashboardStatsQueryVariables>;
export const CompetitionSettingsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"competitionSettings"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"competition"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"grounds"}},{"kind":"Field","name":{"kind":"Name","value":"logo"}}]}}]}}]} as unknown as DocumentNode<CompetitionSettingsQuery, CompetitionSettingsQueryVariables>;
export const CompetitionSettingsUpdateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"competitionSettingsUpdate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateCompetitionInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateCompetition"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"grounds"}}]}}]}}]} as unknown as DocumentNode<CompetitionSettingsUpdateMutation, CompetitionSettingsUpdateMutationVariables>;
export const CompetitionSettingsLogoUpdateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"competitionSettingsLogoUpdate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"logo"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Upload"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"competitionLogo"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"logo"},"value":{"kind":"Variable","name":{"kind":"Name","value":"logo"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"logo"}}]}}]}}]} as unknown as DocumentNode<CompetitionSettingsLogoUpdateMutation, CompetitionSettingsLogoUpdateMutationVariables>;
export const RemoveStarterLinkDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"removeStarterLink"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeStarterLink"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<RemoveStarterLinkMutation, RemoveStarterLinkMutationVariables>;
export const StarterLinksDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"starterLinks"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"competitionID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sex"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"starterLinks"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"competitionID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"competitionID"}}},{"kind":"Argument","name":{"kind":"Name","value":"sex"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sex"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"starter"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstname"}},{"kind":"Field","name":{"kind":"Name","value":"lastname"}},{"kind":"Field","name":{"kind":"Name","value":"birthyear"}},{"kind":"Field","name":{"kind":"Name","value":"stvID"}},{"kind":"Field","name":{"kind":"Name","value":"sex"}}]}},{"kind":"Field","name":{"kind":"Name","value":"club"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"location"}}]}}]}}]}}]} as unknown as DocumentNode<StarterLinksQuery, StarterLinksQueryVariables>;
export const CreateCompetitionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createCompetition"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"location"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"startDate"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Timestamp"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"endDate"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Timestamp"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"grounds"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"modules"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createCompetition"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"competition"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"location"},"value":{"kind":"Variable","name":{"kind":"Name","value":"location"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"startDate"},"value":{"kind":"Variable","name":{"kind":"Name","value":"startDate"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"endDate"},"value":{"kind":"Variable","name":{"kind":"Name","value":"endDate"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"grounds"},"value":{"kind":"Variable","name":{"kind":"Name","value":"grounds"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"modules"},"value":{"kind":"Variable","name":{"kind":"Name","value":"modules"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateCompetitionMutation, CreateCompetitionMutationVariables>;
export const CreateCompeitionLogoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createCompeitionLogo"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"logo"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Upload"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"competitionLogo"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"logo"},"value":{"kind":"Variable","name":{"kind":"Name","value":"logo"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"logo"}}]}}]}}]} as unknown as DocumentNode<CreateCompeitionLogoMutation, CreateCompeitionLogoMutationVariables>;
export const CompetitionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"competitions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"competitions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}}]}}]}}]} as unknown as DocumentNode<CompetitionsQuery, CompetitionsQueryVariables>;
export const CreateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"language"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"user"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"language"},"value":{"kind":"Variable","name":{"kind":"Name","value":"language"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"language"}}]}}]}}]} as unknown as DocumentNode<CreateUserMutation, CreateUserMutationVariables>;