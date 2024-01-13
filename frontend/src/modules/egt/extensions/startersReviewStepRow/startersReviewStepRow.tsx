import { TableCell } from "@mui/material";
import { StartersReviewStepRowProps } from "../../../../pages/competition/[id]/starters/import/steps/startersReviewStepRow";
import { FormCategorySelect } from "../../components/form/FormCategorySelect";
import { FormTextInput } from "../../../../components/form/FormTextInput";

export function EGTStartersReviewStepRow(props: StartersReviewStepRowProps) {
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
        />
      </TableCell>
    </>
  );
}
