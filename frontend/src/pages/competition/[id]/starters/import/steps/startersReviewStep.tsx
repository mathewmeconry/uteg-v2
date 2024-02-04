import {
  IconButton,
  Paper,
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
import { useParams } from "react-router-dom";
import { useModules } from "../../../../../../hooks/useModules/useModules";
import React from "react";
import { TableVirtuoso } from "react-virtuoso";

export function StartersReviewStep() {
  const theme = useTheme();
  const { t } = useTranslation();
  const { id } = useParams();
  const modules = useModules(id || "");
  const { control: formControl } = useFormContext();
  const startersFieldArray = useFieldArray({
    control: formControl,
    name: "starters",
    rules: {
      minLength: 1,
      required: true,
    },
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

  const TableComponents = {
    Scroller: React.forwardRef((props, ref) => (
      <TableContainer component={Paper} {...props} ref={ref} />
    )),
    Table: (props) => (
      <Table {...props} style={{ borderCollapse: "separate" }} />
    ),
    TableHead: TableHead,
    TableRow: TableRow,
    TableBody: React.forwardRef((props, ref) => (
      <TableBody {...props} ref={ref} />
    )),
  };

  return (
    <TableVirtuoso
      style={{ height: 400, minWidth: 650  }}
      components={TableComponents}
      data={startersFieldArray.fields}
      useWindowScroll
      fixedHeaderContent={() => (
        <TableRow>
          <TableCell>{t("stvID")}</TableCell>
          <TableCell>{t("firstname")}</TableCell>
          <TableCell sx={{ width: theme.typography.fontSize }} padding="none">
            <IconButton onClick={() => swapAllFirstLastname()}>
              <SwapHorizIcon />
            </IconButton>
          </TableCell>
          <TableCell>{t("lastname")}</TableCell>
          <TableCell>{t("birthyear")}</TableCell>
          <TableCell>{t("sex")}</TableCell>
          {...modules.modules.map((module) => {
            if (module.extensions.startersReviewStepHeader) {
              return module.extensions.startersReviewStepHeader;
            }
          })}
          <TableCell></TableCell>
        </TableRow>
      )}
      itemContent={(index, starter) => (
          <StartersReviewStepRow
            key={starter.id}
            starter={(starter as any) as Starter}
            index={index}
            onRemove={startersFieldArray.remove}
          />
      )}
    />
  );
}
