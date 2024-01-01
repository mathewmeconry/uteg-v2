import { Box, Button, LinearProgress, Typography } from "@mui/material";
import { useState } from "react";
import { useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  Starter,
  useCreateStarterLinkMutation,
  useCreateStarterMutation,
} from "../../../../../../__generated__/graphql";
import { useNavigate, useParams } from "react-router-dom";
import { ApolloError } from "@apollo/client";

type Failure = {
  step: "importing" | "linking";
  starter: Starter;
};

export function ImportStep() {
  const { t } = useTranslation();
  const { id: competitionID } = useParams();
  const [club, starters] = useWatch({ name: ["club", "starters"] });
  const [step, setStep] = useState<"importing" | "linking" | "done">();
  const [progress, setProgress] = useState(20);
  const [createStarterMutation] = useCreateStarterMutation();
  const [linkStarterMutation] = useCreateStarterLinkMutation();
  const progressPerStep = 100 / (starters.length * 2);
  const [failures, setFailures] = useState<Failure[]>([]);
  const navigate = useNavigate();

  async function onImportClick() {
    setStep("importing");
    await importStarters();
    console.log(starters);
    setStep("linking");
    await linkStarters();
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
          }
        })
      );
    }
    await Promise.all(promises);
  }

  async function linkStarter(starter: Starter): Promise<boolean> {
    if (!starter.id) {
      return false;
    }

    try {
      await linkStarterMutation({
        variables: {
          input: {
            clubID: club.id,
            starterID: starter.id,
            competitionID: competitionID || "",
          },
        },
      });
      return true;
    } catch (e) {
      if (e instanceof ApolloError) {
        return e.message === "Already Existing";
      }
    }
    return false;
  }

  async function importStarters() {
    const promises = [];
    for (const starter of starters) {
      promises.push(
        importStarter(starter).then((id) => {
          setProgress((oldProgress) => oldProgress + progressPerStep);
          if (!id) {
            setFailures((oldFailures) => [
              ...oldFailures,
              { step: "importing", starter: starter },
            ]);
          }
          starter.id = id;
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
        <Typography mt={3}>{t("starters")}</Typography>
        <Typography>{starters.length}</Typography>
        <Button
          variant="contained"
          color="success"
          sx={{ mt: 3 }}
          onClick={onImportClick}
        >
          {t("Import")}
        </Button>
      </>
    );
  }

  function renderProgressBar() {
    return (
      <>
        {step === "importing" && (
          <Typography>{t("Importing starters...")}</Typography>
        )}
        {step === "linking" && (
          <Typography>{t("Linking starters...")}</Typography>
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
          {t("Imported")}
        </Typography>
        {failures.length > 0 && (
          <Typography textAlign="center" variant="h6" mt={3}>
            {t("Failures")}
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
            {t('Go to Dashbaord')}
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
      {(step === "importing" || step === "linking") && renderProgressBar()}
      {step === "done" && renderDone()}
    </Box>
  );
}
