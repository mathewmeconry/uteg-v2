import { Divider, Paper, Typography } from "@mui/material";
import { Box, SxProps } from "@mui/system";
import React, { PropsWithChildren } from "react";

export function PaperExtended(
  props: { title: string; actions?: React.ReactElement[], sx?: SxProps } & PropsWithChildren 
) {
  return (
    <Paper sx={{ padding: 2, ...props.sx }}>
      <Typography variant="h4">
        {props.title}
        <Box sx={{ float: "right", display: "inline" }}>
          {props.actions || []}
        </Box>
      </Typography>
      <Divider sx={{ mb: 2 }} />
      {props.children}
    </Paper>
  );
}
