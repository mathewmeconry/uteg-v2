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
      <Grid
        container
        spacing={2}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Grid item xs={4}>
          <Typography variant="h4">{props.title}</Typography>
        </Grid>
        <Grid item xs={4}>
          {props.titleSuffix && (
            <Typography variant="h6" textAlign={"center"}>
              {props.titleSuffix}
            </Typography>
          )}
        </Grid>
        <Grid container xs={4} item alignSelf={"center"} justifyContent={'flex-end'}>
          {props.actions || []}
        </Grid>
      </Grid>
      <Divider sx={{ mb: 2 }} />
      {props.children}
    </Paper>
  );
}
