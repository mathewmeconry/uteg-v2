import { useModulesQuery } from "../../__generated__/graphql";
import { Module } from "../../modules/types";

export type ModuleRegistration = {
  name: string;
  hook: Module;
};

let registeredModules: ModuleRegistration[] = [];

export type UseModuleReturn = {
  loading: boolean;
  modules: Module[];
};

export function useModules(
  competitionID?: string,
  modules: string[] = []
): UseModuleReturn {
  if (!competitionID && !modules) {
    return {
      loading: false,
      modules: [],
    };
  }

  let hookLoading = false;
  if (competitionID) {
    const { data, loading } = useModulesQuery({
      variables: {
        competitionID,
      },
    });
    modules = data?.competition.modules || [];
    hookLoading = loading;
  }

  return {
    loading: hookLoading,
    modules: registeredModules
      .filter((module) => modules.includes(module.name))
      .map((module) => module.hook),
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
