import { TypedDocumentNode } from "@apollo/client";

export type VariablesOf<T> = T extends TypedDocumentNode<infer _, infer VariablesType>
  ? VariablesType
  : never;

export type ResultOf<T> = T extends TypedDocumentNode<infer ResultType, infer _>
  ? ResultType
  : never;

export type ReturnType<T extends TypedDocumentNode<{ id: string }, any>> = {
  loading: boolean;
  data: ResultOf<T>[];
  refetch: () => void;
};