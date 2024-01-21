import { Divider, LinearProgress } from "@mui/material";
import { ModuleExtensions } from "../modules/types";
import { useModules } from "../hooks/useModules/useModules";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

export type ModuleExtensionProps = {
  competitionId: string;
  extensionName: keyof ModuleExtensions;
};

export function ModuleExtensions(props: ModuleExtensionProps) {
  const modules = useModules(props.competitionId);
  const { t } = useTranslation("common");

  const components = useMemo(() => {
    if (modules.loading) {
      return [];
    }

    return modules.modules.map((module) => {
      if (module.extensions[props.extensionName]) {
        return (
          <>
            <Divider>{t(module.name, { ns: module.name })}</Divider>
            {module.extensions[props.extensionName]}
          </>
        );
      }
    });
  }, [modules.modules]);

  if (modules.loading) {
    return <LinearProgress />;
  }

  return <>{...components}</>;
}
