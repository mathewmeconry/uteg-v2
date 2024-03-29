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
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useCreateClubMutation } from "../../__generated__/graphql";
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
  const { t } = useTranslation("common");
  const form = useForm({
    defaultValues: {
      name: "",
      location: "",
    },
    values: {
      name: props.name || "",
    },
  });
  const [createClub, { loading }] = useCreateClubMutation();

  function handleCancel() {
    form.reset();
    props.onClose();
  }

  async function onSubmit(data: FieldValues) {
    if (await form.trigger()) {
      try {
        const club = await createClub({
          variables: {
            input: {
              name: data.name,
              location: data.location,
            },
          },
        });
        enqueueSnackbar(t("created", { name: data.name }), {
          variant: "success",
        });
        form.reset();
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
      <DialogTitle>{t("add", {name: t("club")})}</DialogTitle>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <DialogContent>
            <FormTextInput name="name" rules={{ required: true }} />
            <FormTextInput name="location" rules={{ required: true }} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancel}>{t("cancel")}</Button>
            <Button variant="contained" color="success" type="submit">
              {loading && <CircularProgress size={24} />}
              {!loading && t("save")}
            </Button>
          </DialogActions>
        </form>
      </FormProvider>
    </Dialog>
  );
}
