/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query currentUser {\n    currentUser {\n      id\n      email\n      language\n    }\n  }\n": types.CurrentUserDocument,
    "\n  mutation updateUser($data: UpdateUserInput!) {\n    updateUser(data: $data) {\n      id\n      email\n      language\n    }\n  }\n": types.UpdateUserDocument,
    "\n  mutation createClub($input: CreateClubInput!) {\n    createClub(data: $input) {\n      id\n      name\n    }\n  }\n": types.CreateClubDocument,
    "\n  query clubs {\n    clubs {\n      id\n      name\n    }\n  }\n": types.ClubsDocument,
    "\n  mutation createStarter($input: CreateStarterInput!) {\n    createStarter(data: $input) {\n      id\n    }\n  }\n": types.CreateStarterDocument,
    "\n  mutation upsertStarterLink($input: CreateStarterLinkInput!) {\n    upsertStarterLink(data: $input) {\n      id\n      starter {\n        id\n      }\n    }\n  }\n": types.UpsertStarterLinkDocument,
    "\n  query startersAutocomplete($filter: StarterFilter!) {\n    starters(filter: $filter) {\n      id\n      firstname\n      lastname\n      birthyear\n      stvID\n      sex\n    }\n  }\n": types.StartersAutocompleteDocument,
    "\n  mutation updateStarter($id: ID!, $input: UpdateStarterInput!) {\n    updateStarter(id: $id, data: $input) {\n      id\n    }\n  }\n": types.UpdateStarterDocument,
    "\n  mutation updateStarterLink($id: ID!, $input: UpdateStarterLinkInput!) {\n    updateStarterLink(id: $id, data: $input) {\n      id\n    }\n  }\n": types.UpdateStarterLinkDocument,
    "\n  query starterLink($id: ID!) {\n    starterLink(id: $id) {\n        id\n        competition {\n            id\n        }\n        starter {\n            id\n            stvID\n            firstname\n            lastname\n            sex\n            birthyear\n        }\n        club {\n            id\n            name\n        }\n    }\n  }\n": types.StarterLinkDocument,
    "\n  query modules($competitionID: ID!) {\n    competition(id: $competitionID) {\n      id\n      modules\n    }\n  }\n": types.ModulesDocument,
    "\n    query currentI18NUser {\n        currentUser {\n            id\n            language\n        }\n    }\n": types.CurrentI18NUserDocument,
    "\n    query competitionName($id: ID!) {\n        competition(id: $id) {\n            id\n            name\n        }\n    }\n": types.CompetitionNameDocument,
    "\n  fragment DeviceGradingDivisionFragment on EGTDivision {\n    id\n    totalRounds\n    currentRound\n    state\n  }\n": types.DeviceGradingDivisionFragmentFragmentDoc,
    "\n  query EgtDeviceGrading($ids: [ID!]!, $round: Int!, $device: Int!) {\n    egtJudgingDevice(ids: $ids, round: $round, device: $device) {\n      device {\n        id\n        deviceNumber\n        inputs\n        aggregationMode\n        overrides {\n          category\n          inputs\n          aggregationMode\n        }\n      }\n      starterslist {\n        id\n      }\n      lineups {\n        id\n      }\n    }\n  }\n": types.EgtDeviceGradingDocument,
    "\n  mutation EgtAddGrades($grades: [GradeInput!]!) {\n    addGrades(grades: $grades) {\n      id\n      value\n      starterlink {\n        id\n      }\n    }\n  }\n": types.EgtAddGradesDocument,
    "\n  query EgtStarterGrades($starterlinkIds: [ID!]!, $device: Int!) {\n    starterGrades(starterlinkIds: $starterlinkIds, device: $device) {\n      id\n      value\n      starterlink {\n        id\n      }\n    }\n  }\n": types.EgtStarterGradesDocument,
    "\n  mutation advanceEgtDivisionsDevice($divisions: [ID!]!, $device: Int!, $round: Int!) {\n    advanceEgtDivisionsDevice(ids: $divisions, device: $device, round: $round) {\n      id\n      currentRound\n    }\n  }\n": types.AdvanceEgtDivisionsDeviceDocument,
    "\n  fragment RoundGradingSingle on EGTStarterLink {\n    id\n    isDeleted\n    starterlink {\n      id\n      starter {\n        id\n        firstname\n        lastname\n        sex\n      }\n      club {\n        id\n        name\n      }\n    }\n    category\n  }\n": types.RoundGradingSingleFragmentDoc,
    "\n  fragment RoundGradingTable on EGTStarterLink {\n    id\n    isDeleted\n    starterlink {\n      id\n      starter {\n        id\n        firstname\n        lastname\n        sex\n      }\n      club {\n        id\n        name\n      }\n    }\n    category\n  }\n": types.RoundGradingTableFragmentDoc,
    "\n  query egtLineup($id: ID!) {\n    egtLineup(id: $id) {\n      id\n      device {\n        id\n        deviceNumber\n      }\n      starterlinks {\n        id\n        starterlink {\n            id\n            starter {\n                id\n                firstname\n                lastname\n                birthyear\n            }\n            club {\n                id\n                name\n            }\n        }\n      }\n    }\n  }\n": types.EgtLineupDocument,
    "\n  mutation assignEgtLineup($data: EGTStarterLinkInput!) {\n    egtStarterLink(data: $data) {\n      id\n    }\n  }\n": types.AssignEgtLineupDocument,
    "\n  query EGTStarterRanking($competitionID: ID!, $sex: Sex!, $category: Int!) {\n    egtStarterRankings(\n      competitionID: $competitionID\n      sex: $sex\n      category: $category\n    ) {\n      rank\n      total\n      award\n      egtStarterlink {\n        id\n        starterlink {\n          id\n          starter {\n            id\n            firstname\n            lastname\n          }\n          club {\n            id\n            name\n          }\n        }\n      }\n      grades {\n        id\n        deviceNumber\n        value\n      }\n    }\n  }\n": types.EgtStarterRankingDocument,
    "\n  query egtCategorySettings($competitionID: ID!, $category: Int!, $sex: Sex!) {\n    egtCategorySettings(\n      competitionID: $competitionID\n      category: $category\n      sex: $sex\n    ) {\n      honourPrecentage\n    }\n  }\n": types.EgtCategorySettingsDocument,
    "\n  mutation updateEgtCategorySettings($competitionID: ID!, $data: EGTCategorySettingsInput!) {\n    egtCategorySettings(competitionID: $competitionID, data: $data) {\n      honourPrecentage      \n    }\n  }\n": types.UpdateEgtCategorySettingsDocument,
    "\n  query EgtRankingListCompetition($id: ID!) {\n    competition(id: $id) {\n      id\n      name\n      logo\n    }\n  }\n": types.EgtRankingListCompetitionDocument,
    "\n  query egtAssignToDivisionDialog($filter: EGTDivisionFilterInput!) {\n    egtDivisions(filter: $filter) {\n      id\n      number\n      ground\n    }\n  }\n": types.EgtAssignToDivisionDialogDocument,
    "\n  mutation egtAssignToDivisionDialogMutation($data: EGTStarterLinkInput!) {\n    egtStarterLink(data: $data) {\n      id\n      category\n      division {\n        id\n        number\n      }\n      lineup {\n        id\n      }\n      starterlink {\n        id\n        starter {\n          id\n          sex\n        }\n      }\n    }\n  }\n": types.EgtAssignToDivisionDialogMutationDocument,
    "\n  query competitionGrounds($id: ID!) {\n    competition(id: $id) {\n      id\n      grounds\n    }\n  }\n": types.CompetitionGroundsDocument,
    "\n  mutation createEgtDivision($data: CreateEGTDivisionInput!) {\n    createEgtDivision(data: $data) {\n      id\n    }\n  }\n": types.CreateEgtDivisionDocument,
    "\n  query EGTGradingListQuery($ids: [ID!]!, $round: Int!, $device: Int!) {\n    egtJudgingDevice(ids: $ids, round: $round, device: $device) {\n      starterslist {\n        id\n        category\n        isDeleted\n        starterlink {\n          id\n          starter {\n            id\n            firstname\n            lastname\n          }\n          club {\n            id\n            name\n          }\n        }\n      }\n    }\n  }\n": types.EgtGradingListQueryDocument,
    "\n  mutation updateEgtDivisionState($data: UpdateEGTDivisionStateInput!) {\n    updateEgtDivisionState(data: $data) {\n      id\n      state\n      currentRound\n    }\n  }\n": types.UpdateEgtDivisionStateDocument,
    "\n    query StartersReviewStepRowDivisions($filter: EGTDivisionFilterInput!) {\n        egtDivisions(filter: $filter) {\n            id\n            number\n        }\n    }\n": types.StartersReviewStepRowDivisionsDocument,
    "\n  mutation egtStarterLinkMutation(\n    $data: EGTStarterLinkInput!\n    $ignoreDivision: Boolean\n  ) {\n    egtStarterLink(data: $data, ignoreDivision: $ignoreDivision) {\n      id\n      category\n      division {\n        id\n        number\n      }\n    }\n  }\n": types.EgtStarterLinkMutationDocument,
    "\n  query egtStarterLink($id: ID, $starterLinkID: ID) {\n    egtStarterLink(id: $id, starterLinkID: $starterLinkID) {\n      id\n      category\n      division {\n        id\n      }\n    }\n  }\n": types.EgtStarterLinkDocument,
    "\n  query egtDivisionsUpdateStarterForm($filter: EGTDivisionFilterInput!) {\n    egtDivisions(filter: $filter) {\n      id\n      number\n      ground\n    }\n  }\n": types.EgtDivisionsUpdateStarterFormDocument,
    "\n    mutation createEgtSettings($competitionID: ID!, $data: EGTSettingsInput!) {\n        egtSettings(competitionID: $competitionID, data: $data) {\n            id\n        }\n    }\n": types.CreateEgtSettingsDocument,
    "\n  fragment useEGTDivision_PlaceholderFragment on EGTDivision {\n    id\n  }\n": types.UseEgtDivision_PlaceholderFragmentFragmentDoc,
    "\n  query useEGTDivisionQuery($filter: EGTDivisionFilterInput!) {\n    egtDivisions(filter: $filter) {\n      ...useEGTDivision_PlaceholderFragment\n    }\n  }\n": types.UseEgtDivisionQueryDocument,
    "\n  subscription useEGTDivisionSubscription($filter: EGTDivisionFilterInput!) {\n    egtDivision(filter: $filter) {\n      ...useEGTDivision_PlaceholderFragment\n    }\n  }\n": types.UseEgtDivisionSubscriptionDocument,
    "\n  fragment useEGTStarterLinks_PlaceholderFragment on EGTStarterLink {\n    id\n  }\n": types.UseEgtStarterLinks_PlaceholderFragmentFragmentDoc,
    "\n  query useEGTStarterLinksQuery(\n    $ids: [ID!]\n    $divisionIDs: [ID!]\n    $withDeleted: Boolean\n  ) {\n    egtStarterLinks(\n      ids: $ids\n      divisionIDs: $divisionIDs\n      withDeleted: $withDeleted\n    ) {\n      ...useEGTStarterLinks_PlaceholderFragment\n    }\n  }\n": types.UseEgtStarterLinksQueryDocument,
    "\n  subscription useEEGTStarterLinksSubscription(\n    $ids: [ID!]\n    $divisionIDs: [ID!]\n  ) {\n    egtStarterLinks(ids: $ids, divisionIDs: $divisionIDs) {\n      ...useEGTStarterLinks_PlaceholderFragment\n    }\n  }\n": types.UseEegtStarterLinksSubscriptionDocument,
    "\n  fragment EGTStarterListFragment on StarterLink {\n    egt {\n      id\n      category\n      division {\n        id\n        number\n      }\n      lineup {\n        id\n        device {\n          id\n          deviceNumber\n        }\n      }\n    }\n  }\n": types.EgtStarterListFragmentFragmentDoc,
    "\n    query egtDivisionGrading($id: ID!) {\n        egtDivision(id: $id) {\n            id\n            ground\n            totalRounds\n        }\n    }\n": types.EgtDivisionGradingDocument,
    "\n  query egtDivision($id: ID!) {\n    egtDivision(id: $id) {\n      id\n      category\n      ground\n      totalRounds\n      sex\n      number\n      lineups {\n        id\n        device {\n          id\n          deviceNumber\n        }\n      }\n    }\n  }\n": types.EgtDivisionDocument,
    "\n  query egtStarterLinkUnassigned($divisionID: ID!) {\n    egtStarterLinkUnassigned(divisionID: $divisionID) {\n      id\n      starterlink {\n        id\n        starter {\n          id\n          firstname\n          lastname\n          birthyear\n        }\n        club {\n          id\n          name\n        }\n      }\n    }\n  }\n": types.EgtStarterLinkUnassignedDocument,
    "\n  query egtDivisions($competitionID: ID!) {\n    egtDivisions(filter: { competitionID: $competitionID }) {\n      id\n      ground\n      state\n      currentRound\n      totalRounds\n      category\n      sex\n      number\n      totalStarters\n    }\n  }\n": types.EgtDivisionsDocument,
    "\n  mutation removeEgtDivision($id: ID!) {\n    removeEgtDivision(id: $id) {\n      id\n    }\n  }\n": types.RemoveEgtDivisionDocument,
    "\n  query egtDivisionsIds($filter: EGTDivisionFilterInput!) {\n    egtDivisions(filter: $filter) {\n      id\n    }\n  }\n": types.EgtDivisionsIdsDocument,
    "\n  query egtDivisionJudging($ids: [ID!]!, $round: Int!) {\n    egtJudgingDevices(ids: $ids, round: $round) {\n      device {\n        id\n        deviceNumber\n        inputs\n        aggregationMode\n        overrides {\n          category\n          inputs\n          aggregationMode\n        }\n      }\n      starterslist {\n        id\n        isDeleted\n        starterlink {\n          id\n          starter {\n            id\n            firstname\n            lastname\n          }\n          club {\n            id\n            name\n          }\n        }\n        category\n      }\n      round\n    }\n  }\n": types.EgtDivisionJudgingDocument,
    "\n  fragment DivisionListFragment on EGTDivision {\n    id\n    ground\n    state\n    currentRound\n    totalRounds\n    category\n    sex\n    number\n    totalStarters\n  }\n": types.DivisionListFragmentFragmentDoc,
    "\n  query EgtGradingGrounds($id: ID!) {\n    competition(id: $id) {\n      id\n      grounds\n    }\n  }\n": types.EgtGradingGroundsDocument,
    "\n  query EgtJudgesGrounds($id: ID!) {\n    competition(id: $id) {\n      id\n      grounds\n    }\n  }\n": types.EgtJudgesGroundsDocument,
    "\n  query EgtJudgesTokens(\n    $competitionID: ID!\n    $ground: Int!\n    $device: Int!\n    $create: Boolean\n  ) {\n    findJudgeToken(\n      competitionID: $competitionID\n      ground: $ground\n      device: $device\n      create: $create\n    ) {\n      id\n      device\n      token\n      ground\n    }\n  }\n": types.EgtJudgesTokensDocument,
    "\n  mutation EgtJudgesResetToken($id: ID!) {\n    resetJudgeToken(id: $id) {\n      id\n      token\n    }\n  }\n": types.EgtJudgesResetTokenDocument,
    "\n    query egtJudgingCompetition($id: ID!) {\n        competition(id: $id) {\n            id\n            name\n        }\n    }\n": types.EgtJudgingCompetitionDocument,
    "\n  query egtJudgingDivisionsIds($filter: EGTDivisionFilterInput!) {\n    egtDivisions(filter: $filter) {\n      id\n      totalRounds\n    }\n  }\n": types.EgtJudgingDivisionsIdsDocument,
    "\n  query EgtJudgingArray($ids: [ID!]!, $round: Int!, $device: Int!) {\n    egtJudgingDevice(ids: $ids, round: $round, device: $device) {\n      device {\n        id\n        deviceNumber\n        inputs\n        aggregationMode\n        overrides {\n          category\n          inputs\n          aggregationMode\n        }\n      }\n      starterslist {\n        id\n        starterlink {\n          id\n          starter {\n            id\n            firstname\n            lastname\n            sex\n          }\n        }\n        category\n      }\n      lineups {\n        id\n      }\n    }\n  }\n": types.EgtJudgingArrayDocument,
    "\n  query CompetitionDashboardStats($id: ID!) {\n    competition(id: $id) {\n      id\n      stats {\n        clubs\n        starters\n        grades\n      }\n    }\n  }\n": types.CompetitionDashboardStatsDocument,
    "\n  query competitionSettings($id: ID!) {\n    competition(id: $id) {\n      id\n      name\n      location\n      startDate\n      endDate\n      grounds\n      logo\n    }\n  }\n": types.CompetitionSettingsDocument,
    "\n  mutation competitionSettingsUpdate($id: ID!, $data: UpdateCompetitionInput!) {\n    updateCompetition(id: $id, data: $data) {\n      id\n      name\n      location\n      startDate\n      endDate\n      grounds\n    }\n  }\n": types.CompetitionSettingsUpdateDocument,
    "\n  mutation competitionSettingsLogoUpdate($id: ID!, $logo: Upload!) {\n    competitionLogo(id: $id, logo: $logo) {\n      id\n      logo\n    }\n  }\n": types.CompetitionSettingsLogoUpdateDocument,
    "\n  mutation removeStarterLink($id: ID!) {\n    removeStarterLink(id: $id) {\n      id\n    }\n  }\n": types.RemoveStarterLinkDocument,
    "\n  query starterLinks($competitionID: ID!, $sex: String) {\n    starterLinks(competitionID: $competitionID, sex: $sex) {\n      id\n      starter {\n        id\n        firstname\n        lastname\n        birthyear\n        stvID\n        sex\n      }\n      club {\n        id\n        name\n        location\n      }\n    }\n  }\n": types.StarterLinksDocument,
    "\n    mutation createCompetition($name: String!, $location: String!, $startDate: Timestamp!, $endDate: Timestamp!, $grounds: Int!, $modules: [String!]!) {\n        createCompetition(competition: {\n            name: $name,\n            location: $location,\n            startDate: $startDate,\n            endDate: $endDate,\n            grounds: $grounds,\n            modules: $modules\n        }) {\n            id\n        }\n    }\n": types.CreateCompetitionDocument,
    "\n  mutation createCompeitionLogo($id: ID!, $logo: Upload!) {\n    competitionLogo(id: $id, logo: $logo) {\n      id\n      logo\n    }\n  }\n": types.CreateCompeitionLogoDocument,
    "\n  query competitions {\n    competitions {\n      id\n      name\n      location\n      startDate\n      endDate\n    }\n  }\n": types.CompetitionsDocument,
    "\n  mutation createUser($email: String!, $password: String!, $language: String!) {\n    createUser(user: { email: $email, password: $password, language: $language }) {\n      id\n      language\n    }\n  }\n": types.CreateUserDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query currentUser {\n    currentUser {\n      id\n      email\n      language\n    }\n  }\n"): (typeof documents)["\n  query currentUser {\n    currentUser {\n      id\n      email\n      language\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updateUser($data: UpdateUserInput!) {\n    updateUser(data: $data) {\n      id\n      email\n      language\n    }\n  }\n"): (typeof documents)["\n  mutation updateUser($data: UpdateUserInput!) {\n    updateUser(data: $data) {\n      id\n      email\n      language\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createClub($input: CreateClubInput!) {\n    createClub(data: $input) {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  mutation createClub($input: CreateClubInput!) {\n    createClub(data: $input) {\n      id\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query clubs {\n    clubs {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  query clubs {\n    clubs {\n      id\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createStarter($input: CreateStarterInput!) {\n    createStarter(data: $input) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation createStarter($input: CreateStarterInput!) {\n    createStarter(data: $input) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation upsertStarterLink($input: CreateStarterLinkInput!) {\n    upsertStarterLink(data: $input) {\n      id\n      starter {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation upsertStarterLink($input: CreateStarterLinkInput!) {\n    upsertStarterLink(data: $input) {\n      id\n      starter {\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query startersAutocomplete($filter: StarterFilter!) {\n    starters(filter: $filter) {\n      id\n      firstname\n      lastname\n      birthyear\n      stvID\n      sex\n    }\n  }\n"): (typeof documents)["\n  query startersAutocomplete($filter: StarterFilter!) {\n    starters(filter: $filter) {\n      id\n      firstname\n      lastname\n      birthyear\n      stvID\n      sex\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updateStarter($id: ID!, $input: UpdateStarterInput!) {\n    updateStarter(id: $id, data: $input) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation updateStarter($id: ID!, $input: UpdateStarterInput!) {\n    updateStarter(id: $id, data: $input) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updateStarterLink($id: ID!, $input: UpdateStarterLinkInput!) {\n    updateStarterLink(id: $id, data: $input) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation updateStarterLink($id: ID!, $input: UpdateStarterLinkInput!) {\n    updateStarterLink(id: $id, data: $input) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query starterLink($id: ID!) {\n    starterLink(id: $id) {\n        id\n        competition {\n            id\n        }\n        starter {\n            id\n            stvID\n            firstname\n            lastname\n            sex\n            birthyear\n        }\n        club {\n            id\n            name\n        }\n    }\n  }\n"): (typeof documents)["\n  query starterLink($id: ID!) {\n    starterLink(id: $id) {\n        id\n        competition {\n            id\n        }\n        starter {\n            id\n            stvID\n            firstname\n            lastname\n            sex\n            birthyear\n        }\n        club {\n            id\n            name\n        }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query modules($competitionID: ID!) {\n    competition(id: $competitionID) {\n      id\n      modules\n    }\n  }\n"): (typeof documents)["\n  query modules($competitionID: ID!) {\n    competition(id: $competitionID) {\n      id\n      modules\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query currentI18NUser {\n        currentUser {\n            id\n            language\n        }\n    }\n"): (typeof documents)["\n    query currentI18NUser {\n        currentUser {\n            id\n            language\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query competitionName($id: ID!) {\n        competition(id: $id) {\n            id\n            name\n        }\n    }\n"): (typeof documents)["\n    query competitionName($id: ID!) {\n        competition(id: $id) {\n            id\n            name\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment DeviceGradingDivisionFragment on EGTDivision {\n    id\n    totalRounds\n    currentRound\n    state\n  }\n"): (typeof documents)["\n  fragment DeviceGradingDivisionFragment on EGTDivision {\n    id\n    totalRounds\n    currentRound\n    state\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query EgtDeviceGrading($ids: [ID!]!, $round: Int!, $device: Int!) {\n    egtJudgingDevice(ids: $ids, round: $round, device: $device) {\n      device {\n        id\n        deviceNumber\n        inputs\n        aggregationMode\n        overrides {\n          category\n          inputs\n          aggregationMode\n        }\n      }\n      starterslist {\n        id\n      }\n      lineups {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  query EgtDeviceGrading($ids: [ID!]!, $round: Int!, $device: Int!) {\n    egtJudgingDevice(ids: $ids, round: $round, device: $device) {\n      device {\n        id\n        deviceNumber\n        inputs\n        aggregationMode\n        overrides {\n          category\n          inputs\n          aggregationMode\n        }\n      }\n      starterslist {\n        id\n      }\n      lineups {\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation EgtAddGrades($grades: [GradeInput!]!) {\n    addGrades(grades: $grades) {\n      id\n      value\n      starterlink {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation EgtAddGrades($grades: [GradeInput!]!) {\n    addGrades(grades: $grades) {\n      id\n      value\n      starterlink {\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query EgtStarterGrades($starterlinkIds: [ID!]!, $device: Int!) {\n    starterGrades(starterlinkIds: $starterlinkIds, device: $device) {\n      id\n      value\n      starterlink {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  query EgtStarterGrades($starterlinkIds: [ID!]!, $device: Int!) {\n    starterGrades(starterlinkIds: $starterlinkIds, device: $device) {\n      id\n      value\n      starterlink {\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation advanceEgtDivisionsDevice($divisions: [ID!]!, $device: Int!, $round: Int!) {\n    advanceEgtDivisionsDevice(ids: $divisions, device: $device, round: $round) {\n      id\n      currentRound\n    }\n  }\n"): (typeof documents)["\n  mutation advanceEgtDivisionsDevice($divisions: [ID!]!, $device: Int!, $round: Int!) {\n    advanceEgtDivisionsDevice(ids: $divisions, device: $device, round: $round) {\n      id\n      currentRound\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment RoundGradingSingle on EGTStarterLink {\n    id\n    isDeleted\n    starterlink {\n      id\n      starter {\n        id\n        firstname\n        lastname\n        sex\n      }\n      club {\n        id\n        name\n      }\n    }\n    category\n  }\n"): (typeof documents)["\n  fragment RoundGradingSingle on EGTStarterLink {\n    id\n    isDeleted\n    starterlink {\n      id\n      starter {\n        id\n        firstname\n        lastname\n        sex\n      }\n      club {\n        id\n        name\n      }\n    }\n    category\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment RoundGradingTable on EGTStarterLink {\n    id\n    isDeleted\n    starterlink {\n      id\n      starter {\n        id\n        firstname\n        lastname\n        sex\n      }\n      club {\n        id\n        name\n      }\n    }\n    category\n  }\n"): (typeof documents)["\n  fragment RoundGradingTable on EGTStarterLink {\n    id\n    isDeleted\n    starterlink {\n      id\n      starter {\n        id\n        firstname\n        lastname\n        sex\n      }\n      club {\n        id\n        name\n      }\n    }\n    category\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query egtLineup($id: ID!) {\n    egtLineup(id: $id) {\n      id\n      device {\n        id\n        deviceNumber\n      }\n      starterlinks {\n        id\n        starterlink {\n            id\n            starter {\n                id\n                firstname\n                lastname\n                birthyear\n            }\n            club {\n                id\n                name\n            }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query egtLineup($id: ID!) {\n    egtLineup(id: $id) {\n      id\n      device {\n        id\n        deviceNumber\n      }\n      starterlinks {\n        id\n        starterlink {\n            id\n            starter {\n                id\n                firstname\n                lastname\n                birthyear\n            }\n            club {\n                id\n                name\n            }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation assignEgtLineup($data: EGTStarterLinkInput!) {\n    egtStarterLink(data: $data) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation assignEgtLineup($data: EGTStarterLinkInput!) {\n    egtStarterLink(data: $data) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query EGTStarterRanking($competitionID: ID!, $sex: Sex!, $category: Int!) {\n    egtStarterRankings(\n      competitionID: $competitionID\n      sex: $sex\n      category: $category\n    ) {\n      rank\n      total\n      award\n      egtStarterlink {\n        id\n        starterlink {\n          id\n          starter {\n            id\n            firstname\n            lastname\n          }\n          club {\n            id\n            name\n          }\n        }\n      }\n      grades {\n        id\n        deviceNumber\n        value\n      }\n    }\n  }\n"): (typeof documents)["\n  query EGTStarterRanking($competitionID: ID!, $sex: Sex!, $category: Int!) {\n    egtStarterRankings(\n      competitionID: $competitionID\n      sex: $sex\n      category: $category\n    ) {\n      rank\n      total\n      award\n      egtStarterlink {\n        id\n        starterlink {\n          id\n          starter {\n            id\n            firstname\n            lastname\n          }\n          club {\n            id\n            name\n          }\n        }\n      }\n      grades {\n        id\n        deviceNumber\n        value\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query egtCategorySettings($competitionID: ID!, $category: Int!, $sex: Sex!) {\n    egtCategorySettings(\n      competitionID: $competitionID\n      category: $category\n      sex: $sex\n    ) {\n      honourPrecentage\n    }\n  }\n"): (typeof documents)["\n  query egtCategorySettings($competitionID: ID!, $category: Int!, $sex: Sex!) {\n    egtCategorySettings(\n      competitionID: $competitionID\n      category: $category\n      sex: $sex\n    ) {\n      honourPrecentage\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updateEgtCategorySettings($competitionID: ID!, $data: EGTCategorySettingsInput!) {\n    egtCategorySettings(competitionID: $competitionID, data: $data) {\n      honourPrecentage      \n    }\n  }\n"): (typeof documents)["\n  mutation updateEgtCategorySettings($competitionID: ID!, $data: EGTCategorySettingsInput!) {\n    egtCategorySettings(competitionID: $competitionID, data: $data) {\n      honourPrecentage      \n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query EgtRankingListCompetition($id: ID!) {\n    competition(id: $id) {\n      id\n      name\n      logo\n    }\n  }\n"): (typeof documents)["\n  query EgtRankingListCompetition($id: ID!) {\n    competition(id: $id) {\n      id\n      name\n      logo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query egtAssignToDivisionDialog($filter: EGTDivisionFilterInput!) {\n    egtDivisions(filter: $filter) {\n      id\n      number\n      ground\n    }\n  }\n"): (typeof documents)["\n  query egtAssignToDivisionDialog($filter: EGTDivisionFilterInput!) {\n    egtDivisions(filter: $filter) {\n      id\n      number\n      ground\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation egtAssignToDivisionDialogMutation($data: EGTStarterLinkInput!) {\n    egtStarterLink(data: $data) {\n      id\n      category\n      division {\n        id\n        number\n      }\n      lineup {\n        id\n      }\n      starterlink {\n        id\n        starter {\n          id\n          sex\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation egtAssignToDivisionDialogMutation($data: EGTStarterLinkInput!) {\n    egtStarterLink(data: $data) {\n      id\n      category\n      division {\n        id\n        number\n      }\n      lineup {\n        id\n      }\n      starterlink {\n        id\n        starter {\n          id\n          sex\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query competitionGrounds($id: ID!) {\n    competition(id: $id) {\n      id\n      grounds\n    }\n  }\n"): (typeof documents)["\n  query competitionGrounds($id: ID!) {\n    competition(id: $id) {\n      id\n      grounds\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createEgtDivision($data: CreateEGTDivisionInput!) {\n    createEgtDivision(data: $data) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation createEgtDivision($data: CreateEGTDivisionInput!) {\n    createEgtDivision(data: $data) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query EGTGradingListQuery($ids: [ID!]!, $round: Int!, $device: Int!) {\n    egtJudgingDevice(ids: $ids, round: $round, device: $device) {\n      starterslist {\n        id\n        category\n        isDeleted\n        starterlink {\n          id\n          starter {\n            id\n            firstname\n            lastname\n          }\n          club {\n            id\n            name\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query EGTGradingListQuery($ids: [ID!]!, $round: Int!, $device: Int!) {\n    egtJudgingDevice(ids: $ids, round: $round, device: $device) {\n      starterslist {\n        id\n        category\n        isDeleted\n        starterlink {\n          id\n          starter {\n            id\n            firstname\n            lastname\n          }\n          club {\n            id\n            name\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updateEgtDivisionState($data: UpdateEGTDivisionStateInput!) {\n    updateEgtDivisionState(data: $data) {\n      id\n      state\n      currentRound\n    }\n  }\n"): (typeof documents)["\n  mutation updateEgtDivisionState($data: UpdateEGTDivisionStateInput!) {\n    updateEgtDivisionState(data: $data) {\n      id\n      state\n      currentRound\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query StartersReviewStepRowDivisions($filter: EGTDivisionFilterInput!) {\n        egtDivisions(filter: $filter) {\n            id\n            number\n        }\n    }\n"): (typeof documents)["\n    query StartersReviewStepRowDivisions($filter: EGTDivisionFilterInput!) {\n        egtDivisions(filter: $filter) {\n            id\n            number\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation egtStarterLinkMutation(\n    $data: EGTStarterLinkInput!\n    $ignoreDivision: Boolean\n  ) {\n    egtStarterLink(data: $data, ignoreDivision: $ignoreDivision) {\n      id\n      category\n      division {\n        id\n        number\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation egtStarterLinkMutation(\n    $data: EGTStarterLinkInput!\n    $ignoreDivision: Boolean\n  ) {\n    egtStarterLink(data: $data, ignoreDivision: $ignoreDivision) {\n      id\n      category\n      division {\n        id\n        number\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query egtStarterLink($id: ID, $starterLinkID: ID) {\n    egtStarterLink(id: $id, starterLinkID: $starterLinkID) {\n      id\n      category\n      division {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  query egtStarterLink($id: ID, $starterLinkID: ID) {\n    egtStarterLink(id: $id, starterLinkID: $starterLinkID) {\n      id\n      category\n      division {\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query egtDivisionsUpdateStarterForm($filter: EGTDivisionFilterInput!) {\n    egtDivisions(filter: $filter) {\n      id\n      number\n      ground\n    }\n  }\n"): (typeof documents)["\n  query egtDivisionsUpdateStarterForm($filter: EGTDivisionFilterInput!) {\n    egtDivisions(filter: $filter) {\n      id\n      number\n      ground\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation createEgtSettings($competitionID: ID!, $data: EGTSettingsInput!) {\n        egtSettings(competitionID: $competitionID, data: $data) {\n            id\n        }\n    }\n"): (typeof documents)["\n    mutation createEgtSettings($competitionID: ID!, $data: EGTSettingsInput!) {\n        egtSettings(competitionID: $competitionID, data: $data) {\n            id\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment useEGTDivision_PlaceholderFragment on EGTDivision {\n    id\n  }\n"): (typeof documents)["\n  fragment useEGTDivision_PlaceholderFragment on EGTDivision {\n    id\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query useEGTDivisionQuery($filter: EGTDivisionFilterInput!) {\n    egtDivisions(filter: $filter) {\n      ...useEGTDivision_PlaceholderFragment\n    }\n  }\n"): (typeof documents)["\n  query useEGTDivisionQuery($filter: EGTDivisionFilterInput!) {\n    egtDivisions(filter: $filter) {\n      ...useEGTDivision_PlaceholderFragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  subscription useEGTDivisionSubscription($filter: EGTDivisionFilterInput!) {\n    egtDivision(filter: $filter) {\n      ...useEGTDivision_PlaceholderFragment\n    }\n  }\n"): (typeof documents)["\n  subscription useEGTDivisionSubscription($filter: EGTDivisionFilterInput!) {\n    egtDivision(filter: $filter) {\n      ...useEGTDivision_PlaceholderFragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment useEGTStarterLinks_PlaceholderFragment on EGTStarterLink {\n    id\n  }\n"): (typeof documents)["\n  fragment useEGTStarterLinks_PlaceholderFragment on EGTStarterLink {\n    id\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query useEGTStarterLinksQuery(\n    $ids: [ID!]\n    $divisionIDs: [ID!]\n    $withDeleted: Boolean\n  ) {\n    egtStarterLinks(\n      ids: $ids\n      divisionIDs: $divisionIDs\n      withDeleted: $withDeleted\n    ) {\n      ...useEGTStarterLinks_PlaceholderFragment\n    }\n  }\n"): (typeof documents)["\n  query useEGTStarterLinksQuery(\n    $ids: [ID!]\n    $divisionIDs: [ID!]\n    $withDeleted: Boolean\n  ) {\n    egtStarterLinks(\n      ids: $ids\n      divisionIDs: $divisionIDs\n      withDeleted: $withDeleted\n    ) {\n      ...useEGTStarterLinks_PlaceholderFragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  subscription useEEGTStarterLinksSubscription(\n    $ids: [ID!]\n    $divisionIDs: [ID!]\n  ) {\n    egtStarterLinks(ids: $ids, divisionIDs: $divisionIDs) {\n      ...useEGTStarterLinks_PlaceholderFragment\n    }\n  }\n"): (typeof documents)["\n  subscription useEEGTStarterLinksSubscription(\n    $ids: [ID!]\n    $divisionIDs: [ID!]\n  ) {\n    egtStarterLinks(ids: $ids, divisionIDs: $divisionIDs) {\n      ...useEGTStarterLinks_PlaceholderFragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment EGTStarterListFragment on StarterLink {\n    egt {\n      id\n      category\n      division {\n        id\n        number\n      }\n      lineup {\n        id\n        device {\n          id\n          deviceNumber\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment EGTStarterListFragment on StarterLink {\n    egt {\n      id\n      category\n      division {\n        id\n        number\n      }\n      lineup {\n        id\n        device {\n          id\n          deviceNumber\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query egtDivisionGrading($id: ID!) {\n        egtDivision(id: $id) {\n            id\n            ground\n            totalRounds\n        }\n    }\n"): (typeof documents)["\n    query egtDivisionGrading($id: ID!) {\n        egtDivision(id: $id) {\n            id\n            ground\n            totalRounds\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query egtDivision($id: ID!) {\n    egtDivision(id: $id) {\n      id\n      category\n      ground\n      totalRounds\n      sex\n      number\n      lineups {\n        id\n        device {\n          id\n          deviceNumber\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query egtDivision($id: ID!) {\n    egtDivision(id: $id) {\n      id\n      category\n      ground\n      totalRounds\n      sex\n      number\n      lineups {\n        id\n        device {\n          id\n          deviceNumber\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query egtStarterLinkUnassigned($divisionID: ID!) {\n    egtStarterLinkUnassigned(divisionID: $divisionID) {\n      id\n      starterlink {\n        id\n        starter {\n          id\n          firstname\n          lastname\n          birthyear\n        }\n        club {\n          id\n          name\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query egtStarterLinkUnassigned($divisionID: ID!) {\n    egtStarterLinkUnassigned(divisionID: $divisionID) {\n      id\n      starterlink {\n        id\n        starter {\n          id\n          firstname\n          lastname\n          birthyear\n        }\n        club {\n          id\n          name\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query egtDivisions($competitionID: ID!) {\n    egtDivisions(filter: { competitionID: $competitionID }) {\n      id\n      ground\n      state\n      currentRound\n      totalRounds\n      category\n      sex\n      number\n      totalStarters\n    }\n  }\n"): (typeof documents)["\n  query egtDivisions($competitionID: ID!) {\n    egtDivisions(filter: { competitionID: $competitionID }) {\n      id\n      ground\n      state\n      currentRound\n      totalRounds\n      category\n      sex\n      number\n      totalStarters\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation removeEgtDivision($id: ID!) {\n    removeEgtDivision(id: $id) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation removeEgtDivision($id: ID!) {\n    removeEgtDivision(id: $id) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query egtDivisionsIds($filter: EGTDivisionFilterInput!) {\n    egtDivisions(filter: $filter) {\n      id\n    }\n  }\n"): (typeof documents)["\n  query egtDivisionsIds($filter: EGTDivisionFilterInput!) {\n    egtDivisions(filter: $filter) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query egtDivisionJudging($ids: [ID!]!, $round: Int!) {\n    egtJudgingDevices(ids: $ids, round: $round) {\n      device {\n        id\n        deviceNumber\n        inputs\n        aggregationMode\n        overrides {\n          category\n          inputs\n          aggregationMode\n        }\n      }\n      starterslist {\n        id\n        isDeleted\n        starterlink {\n          id\n          starter {\n            id\n            firstname\n            lastname\n          }\n          club {\n            id\n            name\n          }\n        }\n        category\n      }\n      round\n    }\n  }\n"): (typeof documents)["\n  query egtDivisionJudging($ids: [ID!]!, $round: Int!) {\n    egtJudgingDevices(ids: $ids, round: $round) {\n      device {\n        id\n        deviceNumber\n        inputs\n        aggregationMode\n        overrides {\n          category\n          inputs\n          aggregationMode\n        }\n      }\n      starterslist {\n        id\n        isDeleted\n        starterlink {\n          id\n          starter {\n            id\n            firstname\n            lastname\n          }\n          club {\n            id\n            name\n          }\n        }\n        category\n      }\n      round\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment DivisionListFragment on EGTDivision {\n    id\n    ground\n    state\n    currentRound\n    totalRounds\n    category\n    sex\n    number\n    totalStarters\n  }\n"): (typeof documents)["\n  fragment DivisionListFragment on EGTDivision {\n    id\n    ground\n    state\n    currentRound\n    totalRounds\n    category\n    sex\n    number\n    totalStarters\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query EgtGradingGrounds($id: ID!) {\n    competition(id: $id) {\n      id\n      grounds\n    }\n  }\n"): (typeof documents)["\n  query EgtGradingGrounds($id: ID!) {\n    competition(id: $id) {\n      id\n      grounds\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query EgtJudgesGrounds($id: ID!) {\n    competition(id: $id) {\n      id\n      grounds\n    }\n  }\n"): (typeof documents)["\n  query EgtJudgesGrounds($id: ID!) {\n    competition(id: $id) {\n      id\n      grounds\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query EgtJudgesTokens(\n    $competitionID: ID!\n    $ground: Int!\n    $device: Int!\n    $create: Boolean\n  ) {\n    findJudgeToken(\n      competitionID: $competitionID\n      ground: $ground\n      device: $device\n      create: $create\n    ) {\n      id\n      device\n      token\n      ground\n    }\n  }\n"): (typeof documents)["\n  query EgtJudgesTokens(\n    $competitionID: ID!\n    $ground: Int!\n    $device: Int!\n    $create: Boolean\n  ) {\n    findJudgeToken(\n      competitionID: $competitionID\n      ground: $ground\n      device: $device\n      create: $create\n    ) {\n      id\n      device\n      token\n      ground\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation EgtJudgesResetToken($id: ID!) {\n    resetJudgeToken(id: $id) {\n      id\n      token\n    }\n  }\n"): (typeof documents)["\n  mutation EgtJudgesResetToken($id: ID!) {\n    resetJudgeToken(id: $id) {\n      id\n      token\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query egtJudgingCompetition($id: ID!) {\n        competition(id: $id) {\n            id\n            name\n        }\n    }\n"): (typeof documents)["\n    query egtJudgingCompetition($id: ID!) {\n        competition(id: $id) {\n            id\n            name\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query egtJudgingDivisionsIds($filter: EGTDivisionFilterInput!) {\n    egtDivisions(filter: $filter) {\n      id\n      totalRounds\n    }\n  }\n"): (typeof documents)["\n  query egtJudgingDivisionsIds($filter: EGTDivisionFilterInput!) {\n    egtDivisions(filter: $filter) {\n      id\n      totalRounds\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query EgtJudgingArray($ids: [ID!]!, $round: Int!, $device: Int!) {\n    egtJudgingDevice(ids: $ids, round: $round, device: $device) {\n      device {\n        id\n        deviceNumber\n        inputs\n        aggregationMode\n        overrides {\n          category\n          inputs\n          aggregationMode\n        }\n      }\n      starterslist {\n        id\n        starterlink {\n          id\n          starter {\n            id\n            firstname\n            lastname\n            sex\n          }\n        }\n        category\n      }\n      lineups {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  query EgtJudgingArray($ids: [ID!]!, $round: Int!, $device: Int!) {\n    egtJudgingDevice(ids: $ids, round: $round, device: $device) {\n      device {\n        id\n        deviceNumber\n        inputs\n        aggregationMode\n        overrides {\n          category\n          inputs\n          aggregationMode\n        }\n      }\n      starterslist {\n        id\n        starterlink {\n          id\n          starter {\n            id\n            firstname\n            lastname\n            sex\n          }\n        }\n        category\n      }\n      lineups {\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query CompetitionDashboardStats($id: ID!) {\n    competition(id: $id) {\n      id\n      stats {\n        clubs\n        starters\n        grades\n      }\n    }\n  }\n"): (typeof documents)["\n  query CompetitionDashboardStats($id: ID!) {\n    competition(id: $id) {\n      id\n      stats {\n        clubs\n        starters\n        grades\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query competitionSettings($id: ID!) {\n    competition(id: $id) {\n      id\n      name\n      location\n      startDate\n      endDate\n      grounds\n      logo\n    }\n  }\n"): (typeof documents)["\n  query competitionSettings($id: ID!) {\n    competition(id: $id) {\n      id\n      name\n      location\n      startDate\n      endDate\n      grounds\n      logo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation competitionSettingsUpdate($id: ID!, $data: UpdateCompetitionInput!) {\n    updateCompetition(id: $id, data: $data) {\n      id\n      name\n      location\n      startDate\n      endDate\n      grounds\n    }\n  }\n"): (typeof documents)["\n  mutation competitionSettingsUpdate($id: ID!, $data: UpdateCompetitionInput!) {\n    updateCompetition(id: $id, data: $data) {\n      id\n      name\n      location\n      startDate\n      endDate\n      grounds\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation competitionSettingsLogoUpdate($id: ID!, $logo: Upload!) {\n    competitionLogo(id: $id, logo: $logo) {\n      id\n      logo\n    }\n  }\n"): (typeof documents)["\n  mutation competitionSettingsLogoUpdate($id: ID!, $logo: Upload!) {\n    competitionLogo(id: $id, logo: $logo) {\n      id\n      logo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation removeStarterLink($id: ID!) {\n    removeStarterLink(id: $id) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation removeStarterLink($id: ID!) {\n    removeStarterLink(id: $id) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query starterLinks($competitionID: ID!, $sex: String) {\n    starterLinks(competitionID: $competitionID, sex: $sex) {\n      id\n      starter {\n        id\n        firstname\n        lastname\n        birthyear\n        stvID\n        sex\n      }\n      club {\n        id\n        name\n        location\n      }\n    }\n  }\n"): (typeof documents)["\n  query starterLinks($competitionID: ID!, $sex: String) {\n    starterLinks(competitionID: $competitionID, sex: $sex) {\n      id\n      starter {\n        id\n        firstname\n        lastname\n        birthyear\n        stvID\n        sex\n      }\n      club {\n        id\n        name\n        location\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation createCompetition($name: String!, $location: String!, $startDate: Timestamp!, $endDate: Timestamp!, $grounds: Int!, $modules: [String!]!) {\n        createCompetition(competition: {\n            name: $name,\n            location: $location,\n            startDate: $startDate,\n            endDate: $endDate,\n            grounds: $grounds,\n            modules: $modules\n        }) {\n            id\n        }\n    }\n"): (typeof documents)["\n    mutation createCompetition($name: String!, $location: String!, $startDate: Timestamp!, $endDate: Timestamp!, $grounds: Int!, $modules: [String!]!) {\n        createCompetition(competition: {\n            name: $name,\n            location: $location,\n            startDate: $startDate,\n            endDate: $endDate,\n            grounds: $grounds,\n            modules: $modules\n        }) {\n            id\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createCompeitionLogo($id: ID!, $logo: Upload!) {\n    competitionLogo(id: $id, logo: $logo) {\n      id\n      logo\n    }\n  }\n"): (typeof documents)["\n  mutation createCompeitionLogo($id: ID!, $logo: Upload!) {\n    competitionLogo(id: $id, logo: $logo) {\n      id\n      logo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query competitions {\n    competitions {\n      id\n      name\n      location\n      startDate\n      endDate\n    }\n  }\n"): (typeof documents)["\n  query competitions {\n    competitions {\n      id\n      name\n      location\n      startDate\n      endDate\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createUser($email: String!, $password: String!, $language: String!) {\n    createUser(user: { email: $email, password: $password, language: $language }) {\n      id\n      language\n    }\n  }\n"): (typeof documents)["\n  mutation createUser($email: String!, $password: String!, $language: String!) {\n    createUser(user: { email: $email, password: $password, language: $language }) {\n      id\n      language\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;