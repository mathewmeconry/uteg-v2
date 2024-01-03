import { useModulesQuery } from "../../__generated__/graphql";
import { IModule } from "../../modules/types";

export type ModuleRegistration = {
  name: string;
  class: IModule;
};

let registeredModules: ModuleRegistration[] = [];

export type UseModuleReturn = {
  loading: boolean;
  modules: IModule[];
};

export function useModules(competitionID: string): UseModuleReturn {
  const { data, loading } = useModulesQuery({
    variables: {
      competitionID,
    },
  });

  return {
    loading,
    modules: registeredModules
      .filter((module) => data?.competition.modules.includes(module.name))
      .map((module) => module.class),
  };
}

export function useRegisteredModules(): IModule[] {
  return registeredModules.map((module) => module.class);
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
