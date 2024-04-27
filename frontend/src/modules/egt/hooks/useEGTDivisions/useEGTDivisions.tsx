import { TypedDocumentNode, useQuery, useSubscription } from "@apollo/client";
import { useEffect, useMemo, useState } from "react";
import { graphql } from "../../../../__new_generated__/gql";
import { FragmentType } from "../../../../__new_generated__";
import { EgtDivisionStates } from "../../../../__new_generated__/graphql";
import {
  VariablesOf,
  ResultOf,
  ReturnType,
} from "../../../../types/typeExtractors";

graphql(`
  fragment useEGTDivision_PlaceholderFragment on EGTDivision {
    id
  }
`);

const QUERY = graphql(`
  query useEGTDivisionQuery($filter: EGTDivisionFilterInput!) {
    egtDivisions(filter: $filter) {
      ...useEGTDivision_PlaceholderFragment
    }
  }
`);

const SUBSCRIPTION = graphql(`
  subscription useEGTDivisionSubscription($filter: EGTDivisionFilterInput!) {
    egtDivision(filter: $filter) {
      ...useEGTDivision_PlaceholderFragment
    }
  }
`);

export default function useEGTDivisions<
  T extends TypedDocumentNode<{ id: string }, any>
>(fragment: T, variables?: VariablesOf<typeof QUERY>): ReturnType<T> {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ResultOf<T>[]>();

  const fragmentClone = useMemo(() => {
    const fragmentClone = {
      ...fragment.definitions[0],
    };
    if (fragmentClone.kind === "FragmentDefinition") {
      // @ts-expect-error Override frozen attribute to "fake" fragment
      fragmentClone.name.value = "useEGTDivision_PlaceholderFragment";
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
    egtDivisions: ResultOf<T>[];
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
    egtDivision: ResultOf<T>;
  }>(subscriptionClone, {
    variables: {
      filter: {
        ...variables?.filter,
        state: undefined,
      },
    },
    onError: (e) => {
      console.error(e);
    },
  });

  useEffect(() => {
    setLoading(queryLoading);
  }, [queryLoading]);

  useEffect(() => {
    setData(queryData?.egtDivisions);
  }, [queryData]);

  useEffect(() => {
    if (subscriptionData && subscriptionData.egtDivision) {
      let filterout = false;
      if (
        variables?.filter.state &&
        (subscriptionData.egtDivision as {
          id: string;
          state: EgtDivisionStates;
        }).state !== variables.filter.state
      ) {
        filterout = true;
      }
      const index =
        data?.findIndex((d) => d.id === subscriptionData.egtDivision.id) ?? -1;
      if (index > -1) {
        if (filterout) {
          setData((state) =>
            state?.filter((d) => d.id !== subscriptionData.egtDivision.id)
          );
        } else {
          setData((state) => {
            const cloned = [...state!];
            cloned[index] = subscriptionData.egtDivision;
            return cloned;
          });
        }
      } else {
        if (!filterout) {
          setData((state) => [...state!, subscriptionData.egtDivision]);
        }
      }
    }
  }, [subscriptionData]);

  return {
    loading,
    data: data as ResultOf<T>[],
    refetch,
  };
}
