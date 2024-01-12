import {
  ClubInput,
  FormClubAutocomplete,
} from "../../components/form/FormClubAutocomplete";
import { useTranslation } from "react-i18next";
import { FormProvider, useForm } from "react-hook-form";
import {
  Sex,
  useStarterLinkLazyQuery,
  useUpdateStarterLinkMutation,
  useUpdateStarterMutation,
} from "../../__generated__/graphql";
import { useEffect } from "react";
import {
  useMediaQuery,
  Dialog,
  useTheme,
  DialogContent,
  DialogTitle,
  MenuItem,
  Button,
  DialogActions,
} from "@mui/material";
import { FormTextInput } from "../../components/form/FormTextInput";
import { enqueueSnackbar } from "notistack";
import { ApolloError } from "@apollo/client";
import { useParams } from "react-router-dom";
import { ModuleExtensions } from "../../components/moduleExtension";

export type UpdateStarterDialogProps = {
  linkID: string;
  isOpen: boolean;
  onClose: () => void;
};

export type UpdateStarterForm = {
  id: string;
  stvID?: string | null;
  firstname: string;
  lastname: string;
  club: ClubInput | string;
  sex: Sex;
  birthyear: number | string;
};

export function UpdateStarterDialog(props: UpdateStarterDialogProps) {
  const { t } = useTranslation();
  const { id } = useParams();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [updateStarterMutation] = useUpdateStarterMutation();
  const [updateStarterLinkMutation] = useUpdateStarterLinkMutation();
  const [fetchStarterLink, { data: starterLinkData }] = useStarterLinkLazyQuery(
    {
      variables: {
        id: props.linkID,
      },
    }
  );
  const form = useForm<UpdateStarterForm>({
    defaultValues: {
      id: props.linkID,
      stvID: "",
      firstname: "",
      lastname: "",
      club: "",
      sex: "MALE",
      birthyear: "",
    },
    mode: "onChange",
    shouldFocusError: true,
    resetOptions: {
      keepTouched: false,
    },
  });

  useEffect(() => {
    if (props.linkID) {
      fetchStarterLink();
    }
  }, [props.linkID]);

  useEffect(() => {
    if (starterLinkData?.starterLink) {
      form.setValue("id", props.linkID);
      form.setValue("stvID", starterLinkData.starterLink.starter.stvID);
      form.setValue("firstname", starterLinkData.starterLink.starter.firstname);
      form.setValue("lastname", starterLinkData.starterLink.starter.lastname);
      form.setValue("birthyear", starterLinkData.starterLink.starter.birthyear);
      form.setValue("sex", starterLinkData.starterLink.starter.sex);
      form.setValue("club", {
        id: starterLinkData.starterLink.club.id,
        inputValue: starterLinkData.starterLink.club.name,
        label: starterLinkData.starterLink.club.name,
      });
    }
  }, [starterLinkData?.starterLink, props.isOpen]);

  function handleCancel() {
    form.reset();
    props.onClose();
  }

  async function onSubmit(data: UpdateStarterForm) {
    if (
      !starterLinkData?.starterLink?.starter.id ||
      !starterLinkData.starterLink.id ||
      !starterLinkData.starterLink.competition.id
    ) {
      enqueueSnackbar(t("Ooops"), { variant: "error" });
      return;
    }

    if (isStarterTouched()) {
      try {
        await updateStarterMutation({
          variables: {
            id: starterLinkData.starterLink.starter.id,
            input: {
              stvID: data.stvID,
              firstname: data.firstname,
              lastname: data.lastname,
              birthyear: parseInt(data.birthyear.toString()),
              sex: data.sex,
            },
          }
        });
        enqueueSnackbar(t("Starter updated"), { variant: "success" });
      } catch (e) {
        if (e instanceof ApolloError) {
          enqueueSnackbar(t(e.message), { variant: "error" });
        }
        console.error(e);
        return;
      }
    }

    if (form.formState.touchedFields.club && typeof data.club !== "string") {
      try {
        await updateStarterLinkMutation({
          variables: {
            id: starterLinkData.starterLink.id,
            input: {
              clubID: data.club.id,
              competitionID: starterLinkData.starterLink.competition.id,
            },
          },
        });
        enqueueSnackbar(t("Starter Link updated"), { variant: "success" });
      } catch (e) {
        if (e instanceof ApolloError) {
          enqueueSnackbar(t(e.message), { variant: "error" });
        }
        console.error(e);
        return;
      }
    }

    await form.reset();
    props.onClose();
  }

  function isStarterTouched() {
    return (
      form.formState.touchedFields.stvID ||
      form.formState.touchedFields.firstname ||
      form.formState.touchedFields.lastname ||
      form.formState.touchedFields.birthyear ||
      form.formState.touchedFields.sex
    );
  }

  return (
    <Dialog
      open={props.isOpen}
      onClose={props.onClose}
      fullScreen={fullScreen}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>{t("Update Starter")}</DialogTitle>

      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <DialogContent sx={{ mt: 2 }}>
            <FormTextInput name="stvID" rules={{ required: false }} />
            <FormTextInput name="firstname" rules={{ required: true }} />
            <FormTextInput name="lastname" rules={{ required: true }} />
            <FormTextInput
              name="birthyear"
              fieldProps={{ type: "number" }}
              rules={{ required: true }}
            />
            <FormTextInput
              name="sex"
              fieldProps={{ select: true }}
              rules={{ required: true }}
            >
              <MenuItem value="MALE">{t("Male")}</MenuItem>
              <MenuItem value="FEMALE">{t("Female")}</MenuItem>
            </FormTextInput>
            <FormClubAutocomplete rules={{ required: true }} />
            <ModuleExtensions
              extensionName="updateStarterForm"
              competitionId={id || ""}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancel}>{t("Cancel")}</Button>
            <Button variant="contained" color="success" type="submit">
              {t("Save")}
            </Button>
          </DialogActions>
        </form>
      </FormProvider>
    </Dialog>
  );
}
