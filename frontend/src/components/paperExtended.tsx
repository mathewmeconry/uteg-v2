import { Divider, Paper, Typography } from "@mui/material";
import { Box, SxProps } from "@mui/system";
import React, { PropsWithChildren } from "react";

export type PaperExtendedProps = {
  title: string;
  actions?: React.ReactElement[];
  sx?: SxProps;
  titleSuffix?: string;
};

export function PaperExtended(props: PaperExtendedProps & PropsWithChildren) {
  return (
    <Paper sx={{ padding: 2, ...props.sx }}>
      <Typography variant="h4">
        {props.title}
        {props.titleSuffix && (
          <Box sx={{ float: "right", display: "inline" }}>
            <Typography variant="caption">{props.titleSuffix}</Typography>
          </Box>
        )}
        <Box sx={{ float: "right", display: "inline" }}>
          {props.actions || []}
        </Box>
      </Typography>
      <Divider sx={{ mb: 2 }} />
      {props.children}
    </Paper>
  );
}
