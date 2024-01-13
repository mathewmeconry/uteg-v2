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
import {
  Sex,
  useCompetitionGroundsQuery,
  useCreateEgtDivisionMutation,
} from "../../../../__generated__/graphql";
import { useTranslation } from "react-i18next";
import { FormProvider, useForm } from "react-hook-form";
import { FormTextInput } from "../../../../components/form/FormTextInput";
import { FormCategorySelect } from "../../components/form/FormCategorySelect";
import { FormSexSelect } from "../../../../components/form/FormSexSelect";
import { useParams } from "react-router-dom";
import { ApolloError } from "@apollo/client";
import { enqueueSnackbar } from "notistack";

type CreateDivisionForm = {
  category: number;
  sex: Sex;
  ground: number;
};

export function CreateDivisionDialog(props: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { id } = useParams();

  const { data: competitionData, loading } = useCompetitionGroundsQuery({
    variables: {
      id: id || "",
    },
  });
  const [createDivisionMutation] = useCreateEgtDivisionMutation();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { t } = useTranslation();
  const form = useForm<CreateDivisionForm>({
    defaultValues: {
      category: "",
      sex: "",
      ground: "",
    },
    mode: "onChange",
  });

  async function onSubmit(data: CreateDivisionForm) {
    if (await form.trigger()) {
      try {
        await createDivisionMutation({
          variables: {
            data: {
              category: parseInt(data.category.toString()),
              competitionID: id || "",
              ground: parseInt(data.ground.toString()),
              sex: data.sex,
            },
          },
        });
        enqueueSnackbar(t("Division created"), { variant: "success" });
        form.reset();
        props.onClose();
      } catch (e) {
        if (e instanceof ApolloError) {
          enqueueSnackbar(t(e.message), { variant: "error" });
        }
      }
    }
  }

  function handleCancel() {
    form.reset();
    props.onClose();
  }

  return (
    <Dialog open={props.isOpen} fullScreen={fullScreen} maxWidth="sm" fullWidth>
      <DialogTitle>{t("Add Division")}</DialogTitle>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <DialogContent>
            <FormCategorySelect rules={{ required: true }} />
            <FormSexSelect />
            <FormTextInput
              name="ground"
              rules={{
                required: true,
                min: 1,
                max: competitionData?.competition.grounds,
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancel}>{t("Cancel")}</Button>
            <Button variant="contained" color="success" type="submit">
              {loading && <CircularProgress size={24} />}
              {!loading && t("Save")}
            </Button>
          </DialogActions>
        </form>
      </FormProvider>
    </Dialog>
  );
}
