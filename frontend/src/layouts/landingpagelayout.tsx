import { Box, Grid } from "@mui/material";
import { PropsWithChildren } from "react";

export function LandingPageLayout(props: PropsWithChildren) {
  return (
    <Grid container spacing={2} sx={{ height: "100%" }}>
      <Grid xs={4}></Grid>
      <Grid xs={4}>
        <Box sx={{ height: "100%", display: 'flex' }}>{props.children}</Box>
      </Grid>
    </Grid>
  );
}
