import { memo } from "react";
import { Starter } from "../../../../../../__generated__/graphql";
import {
  TableRow,
  TableCell,
  IconButton,
  MenuItem,
  Skeleton,
} from "@mui/material";
import { ClearIcon } from "@mui/x-date-pickers";
import { FormTextInput } from "../../../../../../components/form/FormTextInput";
import { useFormContext, useWatch } from "react-hook-form";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { useModules } from "../../../../../../hooks/useModules/useModules";

export type StartersReviewStepRowProps = {
  starter: Starter;
  index: number;
  onRemove: (index: number) => void;
};

function Row(props: StartersReviewStepRowProps) {
  const { t } = useTranslation();
  const { setValue, control } = useFormContext();
  const { id } = useParams();
  const modules = useModules(id || "");
  const starter = useWatch({ name: `starters.${props.index}`, control });

  if (modules.loading) {
    return <Skeleton variant="text" />;
  }

  function swapFirstLastname(index: number, update = true) {
    const starter = props.starter;
    const firstname = starter.firstname;
    starter.firstname = starter.lastname;
    starter.lastname = firstname;
    if (update) {
      setValue(`starters.${index}`, starter);
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
          <MenuItem value="MALE">{t("male")}</MenuItem>
          <MenuItem value="FEMALE">{t("female")}</MenuItem>
        </FormTextInput>
      </TableCell>
      {...modules.modules.map((module, index) => {
        if (module.extensions.startersReviewStepRow) {
          return (
            <module.extensions.startersReviewStepRow
              index={props.index}
              onRemove={props.onRemove}
              starter={starter}
              key={`${index}_${props.index}`}
            />
          );
        }
      })}
      <TableCell>
        <IconButton onClick={() => props.onRemove(props.index)}>
          <ClearIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}

export const StartersReviewStepRow = memo<StartersReviewStepRowProps>(Row);
