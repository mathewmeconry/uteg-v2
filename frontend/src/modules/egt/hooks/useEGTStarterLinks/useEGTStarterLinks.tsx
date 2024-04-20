import { TypedDocumentNode, useQuery, useSubscription } from "@apollo/client";
import { graphql } from "../../../../__new_generated__/gql";
import { useEffect, useMemo, useState } from "react";
import { FragmentType } from "../../../../__new_generated__";

type VariablesOf<T> = T extends TypedDocumentNode<infer _, infer VariablesType>
  ? VariablesType
  : never;

type ResultOf<T> = T extends TypedDocumentNode<infer ResultType, infer _>
  ? ResultType
  : never;

type ReturnType<T extends TypedDocumentNode<{ id: string }, any>> = {
  loading: boolean;
  data: ResultOf<T>[];
  refetch: () => void;
};

graphql(`
  fragment useEGTStarterLinks_PlaceholderFragment on EGTStarterLink {
    id
  }
`);

const QUERY = graphql(`
  query useEGTStarterLinksQuery($ids: [ID!], $divisionIDs: [ID!], $withDeleted: Boolean) {
    egtStarterLinks(ids: $ids, divisionIDs: $divisionIDs, withDeleted: $withDeleted) {
      ...useEGTStarterLinks_PlaceholderFragment
    }
  }
`);

const SUBSCRIPTION = graphql(`
  subscription useEEGTStarterLinksSubscription($ids: [ID!], $divisionIDs: [ID!]) {
    egtStarterLinks(ids: $ids, divisionIDs: $divisionIDs) {
      ...useEGTStarterLinks_PlaceholderFragment
    }
  }
`);

export default function useEGTStarterLinks<
  T extends TypedDocumentNode<{ id: string }, any>
>(fragment: T, variables?: VariablesOf<typeof QUERY>): ReturnType<T> {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ResultOf<T>[]>([]);

  const fragmentClone = useMemo(() => {
    const fragmentClone = {
      ...fragment.definitions[0],
    };
    if (fragmentClone.kind === "FragmentDefinition") {
      // @ts-expect-error Override frozen attribute to "fake" fragment
      fragmentClone.name.value = "useEGTStarterLinks_PlaceholderFragment";
    }
    return (fragmentClone as any) as typeof fragment;
  }, [fragment]);

  const queryClone = useMemo(() => {
    const clone = {
      ...QUERY,
      definitions: [QUERY.definitions[0], fragmentClone],
    };

    return clone as TypedDocumentNode<FragmentType<T>, VariablesOf<T>>;
  }, [fragmentClone]);

  const { loading: queryLoading, data: queryData, refetch } = useQuery<{
    egtStarterLinks: ResultOf<T>[];
  }>(queryClone, {
    variables,
    fetchPolicy: "network-only",
  });

  const subscriptionClone = useMemo(() => {
    const clone = {
      ...SUBSCRIPTION,
      definitions: [SUBSCRIPTION.definitions[0], fragmentClone],
    };
    return clone as TypedDocumentNode<FragmentType<T>, VariablesOf<T>>;
  }, [fragmentClone]);

  const { data: subscriptionData } = useSubscription<{
    egtStarterLinks: ResultOf<T>;
  }>(subscriptionClone, {
    variables,
    shouldResubscribe: true,
    onError: (e) => {
      console.error(e);
    },
  });

  useEffect(() => {
    setLoading(queryLoading);
  }, [queryLoading]);

  useEffect(() => {
    setData(queryData?.egtStarterLinks ?? []);
  }, [queryData]);

  useEffect(() => {
    if (subscriptionData?.egtStarterLinks) {
      setData((data) => {
        const index = data?.findIndex(
          (d) => d.id === subscriptionData.egtStarterLinks.id
        );
        if (index > -1) {
          const cloned = [...data!];
          cloned[index] = subscriptionData.egtStarterLinks;
          return cloned;
        }
        return [...data!, subscriptionData.egtStarterLinks];
      });
    }
  }, [subscriptionData]);

  return {
    loading,
    data: data ?? [],
    refetch,
  };
}
