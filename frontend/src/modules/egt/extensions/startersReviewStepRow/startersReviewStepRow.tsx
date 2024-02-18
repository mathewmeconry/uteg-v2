import { TableCell } from "@mui/material";
import { StartersReviewStepRowProps } from "../../../../pages/competition/[id]/starters/import/steps/startersReviewStepRow";
import { FormCategorySelect } from "../../components/form/FormCategorySelect";
import { FormTextInput } from "../../../../components/form/FormTextInput";
import { useStartersReviewStepRowDivisionsQuery } from "../../../../__generated__/graphql";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

export function EGTStartersReviewStepRow(props: StartersReviewStepRowProps) {
  const { id } = useParams();
  const {
    data: divisionData,
    loading: divisionLoading,
  } = useStartersReviewStepRowDivisionsQuery({
    variables: {
      filter: {
        competitionID: id!,
        sex: props.starter.sex,
        // @ts-expect-error typings is wrong with extensions
        category: props.starter.egt.category,
      },
    },
  });
  const { setError } = useFormContext();
  const { t } = useTranslation(["common", "egt"]);

  useEffect(() => {
    if (
      divisionData?.egtDivisions.findIndex(
        // @ts-expect-error typings is wrong with extensions
        (division) => division.number === props.starter.egt.divisionNumber
        // @ts-expect-error typings is wrong with extensions
      ) === -1 && props.starter.egt.divisionNumber
    ) {
      setError(`starters.${props.index}.egt.divisionNumber`, {
        message: t("not_found_typed", { name: t("division", { ns: "egt" }) }),
      });
    }
  }, [divisionData, props.starter]);

  return (
    <>
      <TableCell>
        <FormCategorySelect
          name={`starters.${props.index}.egt.category`}
          rules={{ required: false }}
          fieldProps={{
            select: true,
            size: "small",
            label: "",
          }}
          sexOverride={props.starter.sex}
          initialLoading={divisionLoading}
        />
      </TableCell>
      <TableCell>
        <FormTextInput
          name={`starters.${props.index}.egt.divisionNumber`}
          fieldProps={{
            size: "small",
            label: "",
          }}
          rules={{ required: false }}
          initialLoading={divisionLoading}
        />
      </TableCell>
    </>
  );
}
