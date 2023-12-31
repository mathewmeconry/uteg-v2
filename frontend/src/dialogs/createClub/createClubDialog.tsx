import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { FieldValues, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useCreateClubMutation } from "../../__generated__/graphql";
import { useEffect } from "react";
import { FormTextInput } from "../../components/form/FormTextInput";
import { ApolloError } from "@apollo/client";
import { enqueueSnackbar } from "notistack";

export function CreateClubDialog(props: {
  isOpen: boolean;
  onClose: (data?: { id: string; name: string }) => void;
  name?: string;
}) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { t } = useTranslation();
  const {
    setValue,
    handleSubmit,
    reset,
    formState: { isValid: formIsValid },
    control: formControl,
  } = useForm({
    defaultValues: {
      name: "",
      location: "",
    },
  });
  const [createClub, { loading }] = useCreateClubMutation();

  useEffect(() => {
    if (props.name) {
      setValue("name", props.name);
    }
  }, [props.name]);

  function handleCancel() {
    reset();
    props.onClose();
  }

  async function onSubmit(data: FieldValues) {
    if (formIsValid) {
      try {
        const club = await createClub({
          variables: {
            input: {
              name: data.name,
              location: data.location,
            },
          },
        });
        enqueueSnackbar(t("Club created"), { variant: "success" });
        reset();
        props.onClose(club.data?.createClub);
      } catch (e) {
        if (e instanceof ApolloError) {
          enqueueSnackbar(t(e.message), { variant: "error" });
        }
      }
    }
  }

  return (
    <Dialog open={props.isOpen} fullScreen={fullScreen} maxWidth="sm" fullWidth>
      <DialogTitle>{t("Add Club")}</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <FormTextInput
            name="name"
            rules={{ required: true }}
            control={formControl}
          />
          <FormTextInput
            name="location"
            rules={{ required: true }}
            control={formControl}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>{t("Cancel")}</Button>
          <Button variant="contained" color="success" type="submit">
            {loading && <CircularProgress />}
            {!loading && t("Save")}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
