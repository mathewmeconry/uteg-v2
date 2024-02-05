import { useWatch } from "react-hook-form";
import { useModules } from "../../../../hooks/useModules/useModules";
import { CircularProgress, Divider, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

export function ModulesSettings() {
  const moduleSelection = useWatch({ name: "setup.modules" });
  const modules = useModules(
    undefined,
    Object.keys(moduleSelection ?? {}).filter(
      (module) => moduleSelection[module]
    )
  );
  const { t } = useTranslation();

  if (modules.loading) {
    return <CircularProgress />;
  }

  return modules.modules.map((module, index) => {
    if (module.extensions.settings) {
      return (
        <>
          <Typography variant="h5">
            {t(module.name, { ns: module.name })}
          </Typography>
          <module.extensions.settings competitionCreation />
          {index !== modules.modules.length - 1 && (
            <Divider sx={{ mt: 2, mb: 2 }} />
          )}
        </>
      );
    }
  });
}
