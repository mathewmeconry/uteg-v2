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

export function useModules(competitionID: string): UseModuleReturn {
  if (!competitionID) {
    return {
      loading: false,
      modules: [],
    };
  }

  const { data, loading } = useModulesQuery({
    variables: {
      competitionID,
    },
  });

  return {
    loading,
    modules: registeredModules
      .filter((module) => data?.competition.modules.includes(module.name))
      .map((module) => module.module),
  };
}

export function useRegisteredModules(): Module[] {
  return registeredModules.map((module) => module.module);
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
