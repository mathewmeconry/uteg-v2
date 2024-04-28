import { useEffect, useState } from "react";
import { Module } from "../../modules/types";
import { graphql } from "../../__new_generated__/gql";
import { useLazyQuery } from "@apollo/client";

export type ModuleRegistration = {
  name: string;
  hook: Module;
};

let registeredModules: ModuleRegistration[] = [];

export type UseModuleReturn = {
  loading: boolean;
  modules: Module[];
};

const ModulesQuery = graphql(`
  query modules($competitionID: ID!) {
    competition(id: $competitionID) {
      id
      modules
    }
  }
`);

export function useModules(
  competitionID?: string,
  modules: string[] = []
): UseModuleReturn {
  const [modulesState, setModulesState] = useState<Module[]>([]);
  const [modulesQuery, { loading: queryLoading }] = useLazyQuery(ModulesQuery);
  const [firstLoad, setFirstLoad] = useState(true);
  const [cachedCompetitionId, setCachedCompetitionId] = useState<string>();

  useEffect(() => {
    if (competitionID !== cachedCompetitionId) {
      setCachedCompetitionId(competitionID);
    }
  }, [competitionID]);

  useEffect(() => {
    if (modules.length > 0) {
      setModulesState(
        registeredModules
          .filter((module) => modules.includes(module.name))
          .map((module) => module.hook)
      );
      setFirstLoad(false);
    }
  }, [modules]);

  useEffect(() => {
    let active = true;
    load();
    return () => {
      active = false;
    };

    async function load() {
      if (cachedCompetitionId) {
        const queryResult = await modulesQuery({
          variables: {
            competitionID: cachedCompetitionId,
          },
          fetchPolicy: 'cache-first'
        });
        if (!active) {
          return;
        }
        if (queryResult.data && queryResult.data.competition) {
          setModulesState(
            registeredModules
              .filter((module) =>
                queryResult.data?.competition.modules.includes(module.name)
              )
              .map((module) => module.hook)
          );
        }
        setFirstLoad(false);
      }
    }
  }, [cachedCompetitionId]);

  return {
    loading: queryLoading || firstLoad,
    modules: modulesState,
  };
}

export function useRegisteredModules(): Module[] {
  return registeredModules.map((module) => module.hook);
}

export function registerModule(registration: ModuleRegistration) {
  if (registeredModules.find((module) => module.name === registerModule.name)) {
    return;
  }

  registeredModules.push(registration);
}

export function unregisterModule(name: string) {
  registeredModules = registeredModules.filter(
    (module) => module.name !== name
  );
}
