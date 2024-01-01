import { memo } from "react";
import { Starter } from "../../../../../../__generated__/graphql";
import { TableRow, TableCell, IconButton, MenuItem } from "@mui/material";
import { ClearIcon } from "@mui/x-date-pickers";
import { FormTextInput } from "../../../../../../components/form/FormTextInput";
import { useFormContext } from "react-hook-form";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import { useTranslation } from "react-i18next";

type RowProps = {
  starter: Starter;
  index: number;
  onRemove: (index: number) => void;
};

function Row(props: RowProps) {
  const { t } = useTranslation();
  const form = useFormContext();

  function swapFirstLastname(index: number, update = true) {
    const starter = props.starter;
    const firstname = starter.firstname;
    starter.firstname = starter.lastname;
    starter.lastname = firstname;
    if (update) {
      form.setValue(`starters.${index}`, starter);
    }
    return starter;
  }

  return (
    <TableRow
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      key={props.starter.id}
    >
      <TableCell>
        <FormTextInput
          key="stvID"
          name={`starters.${props.index}.stvID`}
          fieldProps={{ size: "small", label: "", margin: "none" }}
          rules={{ required: false }}
        />
      </TableCell>
      <TableCell>
        <FormTextInput
          key="firstname"
          name={`starters.${props.index}.firstname`}
          fieldProps={{ size: "small", label: "", margin: "none" }}
          rules={{ required: true }}
        />
      </TableCell>
      <TableCell padding="none">
        <IconButton onClick={() => swapFirstLastname(props.index)}>
          <SwapHorizIcon />
        </IconButton>
      </TableCell>
      <TableCell>
        <FormTextInput
          key="lastname"
          name={`starters.${props.index}.lastname`}
          fieldProps={{ size: "small", label: "", margin: "none" }}
          rules={{ required: true }}
        />
      </TableCell>
      <TableCell>
        <FormTextInput
          key="birthyear"
          name={`starters.${props.index}.birthyear`}
          fieldProps={{ size: "small", label: "", type: "number" }}
          rules={{ required: true }}
        />
      </TableCell>
      <TableCell>
        <FormTextInput
          key="sex"
          name={`starters.${props.index}.sex`}
          fieldProps={{
            select: true,
            size: "small",
            label: "",
          }}
          rules={{ required: true }}
        >
          <MenuItem value="MALE">{t("Male")}</MenuItem>
          <MenuItem value="FEMALE">{t("Female")}</MenuItem>
        </FormTextInput>
      </TableCell>
      <TableCell>
        <IconButton onClick={() => props.onRemove(props.index)}>
          <ClearIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}

export const StartersReviewStepRow = memo<RowProps>(Row);
