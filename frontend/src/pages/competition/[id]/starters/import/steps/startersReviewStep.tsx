import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useTheme,
} from "@mui/material";
import { useFieldArray, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import { Starter } from "../../../../../../__generated__/graphql";
import { StartersReviewStepRow } from "./startersReviewStepRow";

export function StartersReviewStep() {
  const theme = useTheme();
  const { t } = useTranslation();
  const { control: formControl } = useFormContext();
  const startersFieldArray = useFieldArray({
    control: formControl,
    name: "starters",
    rules: {
      minLength: 1,
      required: true
    }
  });

  function swapFirstLastname(index: number, update = true) {
    const starter: Starter = (startersFieldArray.fields[
      index
    ] as any) as Starter;
    const firstname = starter.firstname;
    starter.firstname = starter.lastname;
    starter.lastname = firstname;
    if (update) {
      startersFieldArray.update(index, starter as any);
    }
    return starter;
  }

  function swapAllFirstLastname() {
    const starters = startersFieldArray.fields.map((_, index) =>
      swapFirstLastname(index, false)
    );
    startersFieldArray.replace(starters as any[]);
  }

  return (
    <TableContainer>
      <Table
        stickyHeader
        sx={{ minWidth: 650 }}
        size="small"
        aria-label="a dense table"
      >
        <TableHead>
          <TableRow>
            <TableCell>{t("stvID")}</TableCell>
            <TableCell>{t("firstname")}</TableCell>
            <TableCell
              sx={{ width: theme.typography.fontSize }}
              padding="none"
            >
              <IconButton onClick={() => swapAllFirstLastname()}>
                <SwapHorizIcon />
              </IconButton>
            </TableCell>
            <TableCell>{t("lastname")}</TableCell>
            <TableCell>{t("birthyear")}</TableCell>
            <TableCell>{t("sex")}</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {startersFieldArray.fields.map((starter, index: number) => (
            <StartersReviewStepRow
              key={starter.id}
              starter={(starter as any) as Starter}
              index={index}
              onRemove={startersFieldArray.remove}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
