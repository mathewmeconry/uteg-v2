import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  TextFieldProps,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { FieldValues, FormProvider, useForm, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  useUpsertStarterLinkMutation,
  useCreateStarterMutation,
  useStartersAutocompleteLazyQuery,
} from "../../__generated__/graphql";
import { SyntheticEvent, useMemo } from "react";
import { useParams } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import { FormTextInput } from "../../components/form/FormTextInput";
import { ApolloError } from "@apollo/client";
import {
  ClubInput,
  FormClubAutocomplete,
} from "../../components/form/FormClubAutocomplete";
import { FormSexSelect } from "../../components/form/FormSexSelect";

export type CreateStarterForm = {
  stvID?: string;
  firstname: string;
  lastname: string;
  club: ClubInput | string;
  sex: string;
  birthyear: string;
  starter: CreateStarterInput | string;
};

type CreateStarterInput = {
  stvID?: string;
  firstname: string;
  lastname: string;
  birthyear: number;
  sex: string;
  id: string;
};

export function CreateStarterDialog(props: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { id } = useParams();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { t } = useTranslation("common");
  const form = useForm<CreateStarterForm>({
    defaultValues: {
      stvID: "",
      firstname: "",
      lastname: "",
      club: "",
      sex: "",
      birthyear: "",
      starter: "",
    },
  });
  const [createStarterMutation] = useCreateStarterMutation();
  const [createStarterLinkMutation] = useUpsertStarterLinkMutation();
  const [
    queryStarters,
    { data: starters, loading: startersLoading },
  ] = useStartersAutocompleteLazyQuery();
  const starter = useWatch({ name: "starter", control: form.control });

  const starterOptions: CreateStarterInput[] = useMemo(() => {
    const options: CreateStarterInput[] = [];
    if (starters?.starters) {
      for (const starter of starters.starters) {
        options.push({
          id: starter.id,
          firstname: starter.firstname,
          lastname: starter.lastname,
          birthyear: starter.birthyear,
          stvID: starter.stvID as string,
          sex: starter.sex,
        });
      }
    }
    return options;
  }, [starters]);

  function handleCancel() {
    form.reset();
    props.onClose();
  }

  function renderStarterOption(
    props: React.HTMLAttributes<HTMLLIElement>,
    option: CreateStarterInput
  ): React.ReactNode {
    return (
      <Typography {...props}>
        {option.firstname} {option.lastname}
        <Typography variant="caption" sx={{ ml: 1 }}>
          {option.birthyear}
        </Typography>
        <Typography variant="caption" sx={{ ml: "auto", mr: 1 }}>
          {option.stvID}
        </Typography>
      </Typography>
    );
  }

  function renderStarterAutocompleteInput(
    name: keyof CreateStarterForm,
    required = true
  ) {
    return (params: TextFieldProps) => (
      <TextField
        {...params}
        label={t(name)}
        variant="standard"
        margin="normal"
        required={required}
        fullWidth
        onChange={(event) => {
          form.setValue(name, event.currentTarget.value);
          const filter: { [index: string]: string } = {};
          filter[name] = event.currentTarget.value;
          queryStarters({
            variables: {
              filter,
            },
          });
        }}
      />
    );
  }

  function onStarterAutocompleteChange(name: keyof CreateStarterForm) {
    return (
      _: SyntheticEvent<Element, Event>,
      value: string | CreateStarterInput | null
    ) => {
      if (value && typeof value !== "string") {
        form.setValue("starter", value);
        form.setValue("stvID", value.stvID);
        form.setValue("firstname", value.firstname);
        form.setValue("lastname", value.lastname);
        form.setValue("birthyear", value.birthyear.toString());
        form.setValue("sex", value.sex);
      } else {
        // @ts-expect-error
        if (form.getValues("starter")[name] !== value) {
          form.setValue("starter", "");
        }
        // @ts-expect-error
        form.setValue(name, value);
      }
    };
  }

  async function onSubmit(data: FieldValues) {
    let starterID: string | undefined = undefined;
    if (
      data.starter &&
      data.starter.birthyear == data.birthyear &&
      data.starter.sex == data.sex
    ) {
      starterID = data.starter.id;
    } else {
      try {
        const createStarterResponse = await createStarterMutation({
          variables: {
            input: {
              firstname: data.firstname,
              lastname: data.lastname,
              birthyear: parseInt(data.birthyear),
              stvID: data.stvID,
              sex: data.sex,
            },
          },
        });
        if (!createStarterResponse.data?.createStarter.id) {
          enqueueSnackbar(t("error"), { variant: "error" });
          return;
        }
        enqueueSnackbar(
          t("created", {
            name: data.firstname,
            type: t("starter", { count: 1 }),
          }),
          { variant: "success" }
        );
        starterID = createStarterResponse.data.createStarter.id;
      } catch (err) {
        if (err instanceof ApolloError && err.message) {
          enqueueSnackbar(t(`${err.message}`), { variant: "error" });
          return;
        }
      }
    }

    try {
      if (!starterID) {
        enqueueSnackbar(t("error"), { variant: "error" });
        return;
      }
      await createStarterLinkMutation({
        variables: {
          input: {
            starterID,
            competitionID: id || "",
            clubID: data.club.id,
          },
        },
      });
      enqueueSnackbar(t("linked", { name: data.firstname }), {
        variant: "success",
      });
      form.reset();
      props.onClose();
    } catch (err) {
      if (err instanceof ApolloError && err.message) {
        enqueueSnackbar(t(`${err.message}`), { variant: "error" });
      }
    }
  }

  return (
    <>
      <Dialog
        open={props.isOpen}
        onClose={props.onClose}
        fullScreen={fullScreen}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>{t("add", { name: t("starter") })}</DialogTitle>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogContent sx={{ mt: 2 }}>
              <Autocomplete
                disablePortal
                id="stvID"
                value={starter}
                {...form.register("stvID", { required: false })}
                onChange={onStarterAutocompleteChange("stvID")}
                filterOptions={(options: CreateStarterInput[]) => {
                  return options;
                }}
                loading={startersLoading}
                options={starterOptions}
                inputValue={form.getValues("stvID") || ""}
                freeSolo={true}
                renderInput={renderStarterAutocompleteInput("stvID", false)}
                getOptionLabel={(option) =>
                  typeof option !== "string" ? option.stvID || "" : ""
                }
                getOptionKey={(option) =>
                  typeof option !== "string" ? option.id : ""
                }
                renderOption={renderStarterOption}
              />
              <Autocomplete
                disablePortal
                id="firstname"
                value={starter}
                {...form.register("firstname", { required: false })}
                onChange={onStarterAutocompleteChange("firstname")}
                filterOptions={(options: CreateStarterInput[]) => {
                  return options;
                }}
                autoSelect={true}
                loading={startersLoading}
                options={starterOptions}
                inputValue={form.getValues("firstname") as string}
                freeSolo={true}
                renderInput={renderStarterAutocompleteInput("firstname")}
                getOptionLabel={(option) =>
                  typeof option !== "string" ? option.firstname : ""
                }
                getOptionKey={(option) =>
                  typeof option !== "string" ? option.id : ""
                }
                renderOption={renderStarterOption}
              />
              <Autocomplete
                disablePortal
                id="lastname"
                value={starter}
                {...form.register("lastname", { required: false })}
                onChange={onStarterAutocompleteChange("lastname")}
                filterOptions={(options: CreateStarterInput[]) => {
                  return options;
                }}
                loading={startersLoading}
                options={starterOptions}
                inputValue={form.getValues("lastname") as string}
                freeSolo={true}
                renderInput={renderStarterAutocompleteInput("lastname")}
                getOptionLabel={(option) =>
                  typeof option !== "string" ? option.lastname : ""
                }
                getOptionKey={(option) =>
                  typeof option !== "string" ? option.id : ""
                }
                renderOption={renderStarterOption}
              />
              <FormTextInput name="birthyear" rules={{ required: true }} />
              <FormSexSelect />
              <FormClubAutocomplete rules={{ required: true }} />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCancel}>{t("cancel")}</Button>
              <Button variant="contained" color="success" type="submit">
                {t("save")}
              </Button>
            </DialogActions>
          </form>
        </FormProvider>
      </Dialog>
    </>
  );
}
