import { Box, Button, LinearProgress, Typography } from "@mui/material";
import { useMemo, useState } from "react";
import { useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  Starter,
  StarterLink,
  useUpsertStarterLinkMutation,
  useCreateStarterMutation,
} from "../../../../../../__generated__/graphql";
import { useNavigate, useParams } from "react-router-dom";
import { ApolloError } from "@apollo/client";
import { useModules } from "../../../../../../hooks/useModules/useModules";
import { getModulesHandlers } from "../../../../../../modules";
import { ImportStartersHandler } from "../../../../../../modules/types";

export type ImportFailure = {
  step: string;
  starter: Starter;
};

export function ImportStep() {
  const { t } = useTranslation();
  const { id: competitionID } = useParams();
  const [club, starters] = useWatch({ name: ["club", "starters"] });
  const [step, setStep] = useState<
    "importing" | "linking" | "processingModules" | "done"
  >();
  const [progress, setProgress] = useState(20);
  const [createStarterMutation] = useCreateStarterMutation();
  const [linkStarterMutation] = useUpsertStarterLinkMutation();
  const modules = useModules(competitionID || "");
  const moduleImportHandlers = useMemo(() => {
    return getModulesHandlers<ImportStartersHandler>(
      modules.modules,
      "importStarters"
    );
  }, [modules.modules]);

  const progressPerStep = useMemo(
    () => 100 / (starters.length * (moduleImportHandlers.length + 2)),
    [starters, moduleImportHandlers]
  );

  const [failures, setFailures] = useState<ImportFailure[]>([]);
  const navigate = useNavigate();

  async function onImportClick() {
    setStep("importing");
    await importStarters();
    setStep("linking");
    const starterLinks = await linkStarters();
    setStep("processingModules");
    await Promise.all(
      moduleImportHandlers.map((handler) => {
        if (handler) {
          return handler(
            starters,
            starterLinks
              .map((result) => result && result.link)
              .filter((link) => link) as StarterLink[],
            setProgress,
            setFailures
          );
        }
      })
    );
    setStep("done");
  }

  async function linkStarters() {
    const promises = [];
    for (const starter of starters) {
      promises.push(
        linkStarter(starter).then((result) => {
          setProgress((oldProgress) => oldProgress + progressPerStep);
          if (!result) {
            setFailures((oldFailures) => [
              ...oldFailures,
              { step: "linking", starter: starter },
            ]);
          } else {
            return result;
          }
        })
      );
    }
    return Promise.all(promises);
  }

  async function linkStarter(
    starter: Starter
  ): Promise<{ state: boolean; link?: Partial<StarterLink> }> {
    if (!starter.id) {
      return { state: false };
    }

    try {
      const result = await linkStarterMutation({
        variables: {
          input: {
            clubID: club.id,
            starterID: starter.id,
            competitionID: competitionID || "",
          },
        },
      });
      if (!result.data?.upsertStarterLink) {
        return { state: false };
      }

      return {
        state: true,
        link: result.data?.upsertStarterLink as StarterLink,
      };
    } catch (e) {
      if (e instanceof ApolloError) {
        return { state: false };
      }
    }
    return { state: false };
  }

  async function importStarters() {
    const promises = [];
    for (const starter of starters) {
      promises.push(
        importStarter(starter)
          .then((id) => {
            setProgress((oldProgress) => oldProgress + progressPerStep);
            if (!id) {
              setFailures((oldFailures) => [
                ...oldFailures,
                { step: "importing", starter: starter },
              ]);
            }
            starter.id = id;
          })
          .catch((_) => {
            setFailures((oldFailures) => [
              ...oldFailures,
              { step: "importing", starter: starter },
            ]);
          })
      );
    }
    await Promise.all(promises);
  }

  async function importStarter(starter: Starter): Promise<string | undefined> {
    try {
      const result = await createStarterMutation({
        variables: {
          input: {
            stvID: starter.stvID,
            firstname: starter.firstname,
            lastname: starter.lastname,
            birthyear: starter.birthyear,
            sex: starter.sex,
          },
        },
      });
      return result.data?.createStarter.id;
    } catch (e) {}
    return;
  }

  function renderConfirmation() {
    return (
      <>
        <Typography textAlign="center">{t("club")}</Typography>
        <Typography textAlign="center">{club.label}</Typography>
        <Typography mt={3}>{t("starters", { count: 2 })}</Typography>
        <Typography>{starters.length}</Typography>
        <Button
          variant="contained"
          color="success"
          sx={{ mt: 3 }}
          onClick={onImportClick}
        >
          {t("import")}
        </Button>
      </>
    );
  }

  function renderProgressBar() {
    return (
      <>
        {step === "importing" && (
          <Typography>
            {t("importing", { name: t("starter", { count: 2 }) })}
          </Typography>
        )}
        {step === "linking" && (
          <Typography>
            {t("linking", { name: t("starter", { count: 2 }) })}
          </Typography>
        )}
        {step === "processingModules" && (
          <Typography>
            {t("processingModules", { name: t("starter", { count: 2 }) })}
          </Typography>
        )}
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{ width: 0.25, mt: 2 }}
        />
      </>
    );
  }

  function renderDone() {
    return (
      <>
        <Typography textAlign="center" variant="h2">
          {t("imported")}
        </Typography>
        {failures.length > 0 && (
          <Typography textAlign="center" variant="h6" mt={3}>
            {t("failure", { count: failures.length })}
          </Typography>
        )}
        {failures.map((failure) => (
          <Typography>
            {t(failure.step)} {failure.starter.firstname}{" "}
            {failure.starter.lastname}
          </Typography>
        ))}
        <Button
          variant="contained"
          color="success"
          onClick={() => navigate(`/competition/${competitionID}/dashboard`)}
          sx={{ mt: 2 }}
        >
          {t("go_to", { name: t("dashboard") })}
        </Button>
        <Button variant="outlined" onClick={() => navigate(0)} sx={{ mt: 2 }}>
          {t("start_over")}
        </Button>
      </>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: 250,
        flexDirection: "column",
      }}
    >
      {!step && renderConfirmation()}
      {(step === "importing" ||
        step === "linking" ||
        step === "processingModules") &&
        renderProgressBar()}
      {step === "done" && renderDone()}
    </Box>
  );
}
