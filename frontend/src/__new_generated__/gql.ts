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
    "\n  fragment DeviceGradingDivisionFragment on EGTDivision {\n    id\n    totalRounds\n    currentRound\n    state\n  }\n": types.DeviceGradingDivisionFragmentFragmentDoc,
    "\n  fragment useEGTDivision_PlaceholderFragment on EGTDivision {\n    id\n  }\n": types.UseEgtDivision_PlaceholderFragmentFragmentDoc,
    "\n  query useEGTDivisionQuery($filter: EGTDivisionFilterInput!) {\n    egtDivisions(filter: $filter) {\n      ...useEGTDivision_PlaceholderFragment\n    }\n  }\n": types.UseEgtDivisionQueryDocument,
    "\n  subscription useEGTDivisionSubscription($filter: EGTDivisionFilterInput!) {\n    egtDivision(filter: $filter) {\n      ...useEGTDivision_PlaceholderFragment\n    }\n  }\n": types.UseEgtDivisionSubscriptionDocument,
    "\n  fragment DivisionListFragment on EGTDivision {\n    id\n    ground\n    state\n    currentRound\n    totalRounds\n    category\n    sex\n    number\n    totalStarters\n  }\n": types.DivisionListFragmentFragmentDoc,
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
export function graphql(source: "\n  fragment DeviceGradingDivisionFragment on EGTDivision {\n    id\n    totalRounds\n    currentRound\n    state\n  }\n"): (typeof documents)["\n  fragment DeviceGradingDivisionFragment on EGTDivision {\n    id\n    totalRounds\n    currentRound\n    state\n  }\n"];
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
export function graphql(source: "\n  fragment DivisionListFragment on EGTDivision {\n    id\n    ground\n    state\n    currentRound\n    totalRounds\n    category\n    sex\n    number\n    totalStarters\n  }\n"): (typeof documents)["\n  fragment DivisionListFragment on EGTDivision {\n    id\n    ground\n    state\n    currentRound\n    totalRounds\n    category\n    sex\n    number\n    totalStarters\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;