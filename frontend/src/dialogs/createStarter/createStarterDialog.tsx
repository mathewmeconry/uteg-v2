import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
  TextFieldProps,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { FieldValues, useForm, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  useCreateStarterLinkMutation,
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

type StarterInput = {
  stvID: string;
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
  const { t } = useTranslation();
  const {
    control: formControl,
    register,
    handleSubmit,
    getValues,
    setValue,
    reset,
    formState: { errors: formErrors },
  } = useForm<{
    stvID?: string;
    firstname: string;
    lastname: string;
    club: ClubInput | string;
    sex: string;
    birthyear: string;
    starter: StarterInput | string;
  }>({
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
  const [createStarter] = useCreateStarterMutation();
  const [createStarterLink] = useCreateStarterLinkMutation();
  const [
    queryStarters,
    { data: starters, loading: startersLoading },
  ] = useStartersAutocompleteLazyQuery();
  const starter = useWatch({ name: "starter", control: formControl });

  const starterOptions: StarterInput[] = useMemo(() => {
    const options: StarterInput[] = [];
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
    reset();
    props.onClose();
  }

  function renderStarterOption(
    props: React.HTMLAttributes<HTMLLIElement>,
    option: StarterInput
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
    name:
      | "stvID"
      | "firstname"
      | "lastname"
      | "club"
      | "sex"
      | "birthyear"
      | "starter"
      | "club.id"
      | "club.label"
      | "club.inputValue"
      | "starter.id"
      | "starter.stvID"
      | "starter.firstname"
      | "starter.lastname"
      | "starter.sex"
      | "starter.birthyear",
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
          setValue(name, event.currentTarget.value);
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

  function onStarterAutocompleteChange(
    name:
      | "stvID"
      | "firstname"
      | "lastname"
      | "club"
      | "sex"
      | "birthyear"
      | "starter"
      | "club.id"
      | "club.label"
      | "club.inputValue"
      | "starter.id"
      | "starter.stvID"
      | "starter.firstname"
      | "starter.lastname"
      | "starter.sex"
      | "starter.birthyear"
  ) {
    return (
      _: SyntheticEvent<Element, Event>,
      value: string | StarterInput | null
    ) => {
      if (value && typeof value !== "string") {
        setValue("starter", value);
        setValue("stvID", value.stvID);
        setValue("firstname", value.firstname);
        setValue("lastname", value.lastname);
        setValue("birthyear", value.birthyear.toString());
        setValue("sex", value.sex);
      } else {
        // @ts-ignore Ignoring here because name is only used by the starter value inputs
        if (getValues("starter")[name] !== value) {
          setValue("starter", "");
        }
        setValue(name, value);
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
        const createStarterResponse = await createStarter({
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
          enqueueSnackbar(t("Ooops"), { variant: "error" });
          return;
        }
        enqueueSnackbar(t("Starter created"), { variant: "success" });
        starterID = createStarterResponse.data.createStarter.id;
      } catch (err) {
        if (err instanceof ApolloError && err.message) {
          enqueueSnackbar(t(`Starter ${err.message}`), { variant: "error" });
          return;
        }
      }
    }

    try {
      if (!starterID) {
        enqueueSnackbar(t("Ooops"), { variant: "error" });
        return;
      }
      await createStarterLink({
        variables: {
          input: {
            starterID,
            competitionID: id || "",
            clubID: data.club.id,
          },
        },
      });
      enqueueSnackbar(t("Starter linked"), { variant: "success" });
      reset();
      props.onClose();
    } catch (err) {
      if (err instanceof ApolloError && err.message) {
        enqueueSnackbar(t(`Link ${err.message}`), { variant: "error" });
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
        <DialogTitle>{t("Add Starter")}</DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent sx={{ mt: 2 }}>
            <Autocomplete
              disablePortal
              id="stvID"
              value={starter}
              {...register("stvID", { required: false })}
              onChange={onStarterAutocompleteChange("stvID")}
              filterOptions={(options: StarterInput[]) => {
                return options;
              }}
              loading={startersLoading}
              options={starterOptions}
              inputValue={getValues("stvID") || ""}
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
              {...register("firstname", { required: false })}
              onChange={onStarterAutocompleteChange("firstname")}
              filterOptions={(options: StarterInput[]) => {
                return options;
              }}
              autoSelect={true}
              loading={startersLoading}
              options={starterOptions}
              inputValue={getValues("firstname") as string}
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
              {...register("lastname", { required: false })}
              onChange={onStarterAutocompleteChange("lastname")}
              filterOptions={(options: StarterInput[]) => {
                return options;
              }}
              loading={startersLoading}
              options={starterOptions}
              inputValue={getValues("lastname") as string}
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
            <FormTextInput
              name="sex"
              rules={{ required: true }}
              fieldProps={{ select: true }}
            >
              <MenuItem value="MALE">{t("Male")}</MenuItem>
              <MenuItem value="FEMALE">{t("Female")}</MenuItem>
            </FormTextInput>
            <FormClubAutocomplete rules={{ required: true }} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancel}>{t("Cancel")}</Button>
            <Button variant="contained" color="success" type="submit">
              {t("Save")}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
