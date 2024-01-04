import {
  createFilterOptions,
  Autocomplete,
  FilterOptionsState,
  TextField,
} from "@mui/material";
import { useState, useMemo } from "react";
import { useClubsLazyQuery } from "../../__generated__/graphql";
import { CreateClubDialog } from "../../dialogs/createClubDialog/createClubDialog";
import {
  FieldValues,
  RegisterOptions,
  useController,
  useFormContext,
} from "react-hook-form";
import { useTranslation } from "react-i18next";

export type ClubInput = {
  label: string;
  inputValue: string;
  id: string;
};

type FormClubAutocompleteProps = {
  rules:
    | Omit<
        RegisterOptions<FieldValues, any>,
        "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
      >
    | undefined;
};

export function FormClubAutocomplete(props: FormClubAutocompleteProps) {
  const { control: formControl, trigger: formTrigger } = useFormContext();
  const { t } = useTranslation();
  const [
    fetchClubs,
    { data: clubs, loading: clubsLoading, refetch: refetchClubs },
  ] = useClubsLazyQuery();
  const [openAddClubDialog, setOpenAddClubDialog] = useState(false);
  const [addClubDialogValue, setAddClubDialogValue] = useState("");
  const clubFilter = createFilterOptions<ClubInput>();
  const {
    field,
    fieldState: { invalid, isTouched, error },
    formState: formState,
  } = useController({
    name: "club",
    control: formControl,
    rules: props.rules,
  });

  const clubOptions: ClubInput[] = useMemo(() => {
    const options: ClubInput[] = [];
    if (clubs?.clubs) {
      for (const club of clubs.clubs) {
        options.push({
          label: club.name,
          inputValue: club.name,
          id: club.id,
        });
      }
    }
    return options;
  }, [clubs]);

  return (
    <>
      <Autocomplete
        disablePortal
        id="club"
        onBlur={field.onBlur}
        value={field.value}
        ref={field.ref}
        onChange={async (_, newValue) => {
          if (newValue) {
            if (newValue.id === "new") {
              setAddClubDialogValue(newValue.inputValue);
              setOpenAddClubDialog(true);
            } else {
              field.onChange(newValue);
              formTrigger("club");
            }
          }
        }}
        loading={clubsLoading}
        onOpen={() => {
          fetchClubs();
        }}
        filterOptions={(
          options: ClubInput[],
          params: FilterOptionsState<ClubInput>
        ) => {
          const filtered = clubFilter(options, params);

          if (params.inputValue !== "") {
            filtered.push({
              id: "new",
              label: `${t("Add")} "${params.inputValue}"`,
              inputValue: params.inputValue,
            });
          }

          return filtered;
        }}
        options={clubOptions}
        renderInput={(params) => (
          <TextField
            {...params}
            label={t("Club")}
            variant="standard"
            margin="normal"
            name="club"
            fullWidth
            error={invalid && (isTouched || formState.isSubmitted)}
            helperText={error?.message?.toString()}
          />
        )}
      />
      <CreateClubDialog
        isOpen={openAddClubDialog}
        onClose={async (club) => {
          if (club) {
            await refetchClubs();
            field.onChange({
              label: club?.name,
              id: club?.id,
              inputValue: club?.name,
            });
          }
          setOpenAddClubDialog(false);
        }}
        name={addClubDialogValue}
      />
    </>
  );
}
