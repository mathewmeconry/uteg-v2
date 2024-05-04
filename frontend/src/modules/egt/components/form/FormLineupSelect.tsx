import { FieldValues, RegisterOptions } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { graphql } from "../../../../__new_generated__";
import { useQuery } from "@apollo/client";
import { MenuItem, TextFieldProps } from "@mui/material";
import { FormTextInput } from "../../../../components/form/FormTextInput";

export type FormLineupSelectProps = {
  lineupField?: string;
  lineupOverride?: string;
  divisionId: string;
  fieldProps?: TextFieldProps;
  name?: string;
  label?: string;
  initialLoading?: boolean;
  rules:
    | Omit<
        RegisterOptions<FieldValues, any>,
        "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
      >
    | undefined;
};

const lineupQuery = graphql(`
  query EgtLineupSelect($divisionID: ID!) {
    egtDivision(id: $divisionID) {
      id
      lineups {
        id
        device {
          id
          deviceNumber
        }
      }
    }
  }
`);

export function FormLineupSelect(props: FormLineupSelectProps) {
  const { t } = useTranslation("egt");

  const { data: lineups, loading: lineupsLoading } = useQuery(lineupQuery, {
    variables: {
      divisionID: props.divisionId,
    },
  });

  return (
    <FormTextInput
      name={props.name || "lineup"}
      label={props.label || "device"}
      ns="egt"
      defaultValue=""
      rules={props.rules}
      initialLoading={
        props.initialLoading ||
        lineupsLoading ||
        lineups?.egtDivision?.lineups.length === 0
      }
      fieldProps={{
        select: true,
        ...props.fieldProps,
      }}
    >
      {lineups?.egtDivision?.lineups.map((lineup) => (
        <MenuItem key={lineup.id} value={lineup.id}>
          {t(`device_${lineup.device.deviceNumber}`, { ns: "egt" })}
        </MenuItem>
      ))}
    </FormTextInput>
  );
}
