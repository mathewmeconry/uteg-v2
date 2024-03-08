import { Divider, Grid, Paper, Typography } from "@mui/material";
import { SxProps } from "@mui/system";
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
      <Grid container spacing={2} justifyContent={"space-between"}>
        <Grid item xs="auto">
          <Typography variant="h4">{props.title}</Typography>
        </Grid>
        <Grid
          item
          container
          xs={12}
          md={3}
          justifyContent={"space-between"}
          alignItems={"flex-end"}
        >
          <Grid item xs="auto">
            {props.titleSuffix && (
              <Typography variant="caption">{props.titleSuffix}</Typography>
            )}
          </Grid>

          <Grid item xs="auto">
            {props.actions || []}
          </Grid>
        </Grid>
      </Grid>
      <Divider sx={{ mb: 2 }} />
      {props.children}
    </Paper>
  );
}
