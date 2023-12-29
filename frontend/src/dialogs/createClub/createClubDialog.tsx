import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { FieldValues, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useCreateClubMutation } from "../../__generated__/graphql";
import { useEffect } from "react";

export function CreateClubDialog(props: {
  isOpen: boolean;
  onClose: (data?: { id: string; name: string }) => void;
  name?: string;
}) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { t } = useTranslation();
  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors: formErrors, isValid: formIsValid },
  } = useForm();
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
      const club = await createClub({
        variables: {
          input: {
            name: data.name,
            location: data.location,
          },
        },
      });
      reset();
      props.onClose(club.data?.createClub);
    }
  }

  return (
    <Dialog open={props.isOpen} fullScreen={fullScreen} maxWidth="sm" fullWidth>
      <DialogTitle>{t("Add Club")}</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <TextField
            id="name"
            label={t("Name")}
            required={true}
            variant="standard"
            margin="normal"
            fullWidth
            {...register("name", { required: true })}
            error={!!formErrors.name}
            helperText={formErrors.name?.message?.toString()}
          />
          <TextField
            id="location"
            label={t("Location")}
            required={true}
            variant="standard"
            margin="normal"
            fullWidth
            {...register("location", { required: true })}
            error={!!formErrors.location}
            helperText={formErrors.location?.message?.toString()}
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
